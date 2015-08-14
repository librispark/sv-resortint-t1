define( ['jquery','rsweblib','jquery_xml2json','date'], function( $, rs ){


/*
    Singleton SOAP Client Licence:
    Applies to SOAPClient, SOAPRequest, SOAPObject classes only
    SOAPClient modified by Andy Zarzycki (andy@zarzycki.ca) to return data
    processed by $.xml2json (http://www.fyneworks.com/jquery/xml-to-json/)
    instead of $.xmlToJSON (http://www.terracoder.com/index.php/xml-objectifier/xml-objectifier-examples)

        This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var SOAPClient = (function() {
    var httpHeaders = {
        'Cache-control': "no-cache"
    };
    var _tId = null;
    var _self = {
        Proxy: "",
        SOAPServer: "",
        ContentType: "text/xml",
        CharSet: "utf-8",
        ResponseXML: null,
        ResponseText: "",
        Status: 0,
        ContentLength: 0,
        Timeout: 0,
        SetHTTPHeader: function(name, value){
            var re = /^[\w]{1,20}$/;
            if((typeof(name) === "string") && re.test(name)) {
                httpHeaders[name] = value;
            }
        },
        Namespace: function(name, uri) {
            return {
                "name":name,
                "uri":uri
            };
        },
        SendRequest: function(soapReq, callback) {
            if(!!SOAPClient.Proxy) {
                SOAPClient.ResponseText = "";
                SOAPClient.ResponseXML = null;
                SOAPClient.Status = 0;

                var content = unescape(encodeURIComponent(soapReq.toString()));
                SOAPClient.ContentLength = content.length;

                function getResponse(xData) {
                    if(!!_tId) {
                        clearTimeout(_tId);
                    }
                    SOAPClient.Status = xhrReq.status;
                    SOAPClient.ResponseText = xhrReq.responseText;
                    SOAPClient.ResponseXML = xhrReq.responseXML;
                    if(typeof(callback) === "function") {
                        var jsOut = $.xml2json(xData);
                        callback(jsOut);
                    }
                }
                var xhrReq = $.ajax({
                    type: "POST",
                    url: SOAPClient.Proxy,
                    dataType: "xml",
                    xhrFields: { withCredentials: true },
                    processData: false,
                    data: content,
                    success: getResponse,
                    contentType: SOAPClient.ContentType + ";charset=" + SOAPClient.CharSet,
                    beforeSend: function(req) {
                        req.setRequestHeader("Method", "POST");
                        //                                                req.setRequestHeader("Content-Length", SOAPClient.ContentLength);
                        req.setRequestHeader("SOAPServer", SOAPClient.SOAPServer);
                        req.setRequestHeader("SOAPAction", soapReq.Action);
                        if(!!httpHeaders) {
                            var hh = null, ch = null;
                            for(hh in httpHeaders) {
                                if (!httpHeaders.hasOwnProperty || httpHeaders.hasOwnProperty(hh)) {
                                    ch = httpHeaders[hh];
                                    req.setRequestHeader(hh, ch.value);
                                }
                            }
                        }
                    }
                });
            }
        },
        ToXML: function(soapObj) {
            var out = [];
            var isNSObj=false;
            try {
                if(!!soapObj&&typeof(soapObj)==="object"&&soapObj.typeOf==="SOAPObject") {
                    //Namespaces
                    if(!!soapObj.ns) {
                        if(typeof(soapObj.ns)==="object") {
                            isNSObj=true;
                            out.push("<"+soapObj.ns.name+":"+soapObj.name);
                            out.push(" xmlns:"+soapObj.ns.name+"=\""+soapObj.ns.uri+"\"");
                        } else  {
                            out.push("<"+soapObj.name);
                            out.push(" xmlns=\""+soapObj.ns+"\"");
                        }
                    } else {
                        out.push("<"+soapObj.name);
                    }
                    //Node Attributes
                    if(soapObj.attributes.length > 0) {
                        var cAttr;
                        var aLen=soapObj.attributes.length-1;
                        do {
                            cAttr=soapObj.attributes[aLen];
                            if(isNSObj) {
                                out.push(" "+soapObj.ns.name+":"+cAttr.name+"=\""+cAttr.value+"\"");
                            } else {
                                out.push(" "+cAttr.name+"=\""+cAttr.value+"\"");
                            }
                        } while(aLen--);
                    }
                    out.push(">");
                    //Node children
                    if(soapObj.hasChildren()) {
                        var cPos, cObj;
                        for(cPos in soapObj.children){
                            cObj = soapObj.children[cPos];
                            if(typeof(cObj)==="object"){
                                out.push(SOAPClient.ToXML(cObj));
                            }
                        }
                    }
                    //Node Value
                    if(!!soapObj.value){
                        out.push(soapObj.value);
                    }
                    //Close Tag
                    if(isNSObj){
                        out.push("</"+soapObj.ns.name+":"+soapObj.name+">");
                    }
                    else {
                        out.push("</"+soapObj.name+">");
                    }
                    return out.join("");
                }
            } catch(e){
                alert("Unable to process SOAPObject! Object must be an instance of SOAPObject");
            }
        }
    };
    return _self;
})();
//Soap request - this is what being sent using SOAPClient.SendRequest
var SOAPRequest=function(action, soapObj) {
    this.Action=action;
    var nss=[];
    var headers=[];
    var bodies=(!!soapObj)?[soapObj]:[];
    this.addNamespace=function(ns, uri){
        nss.push(new SOAPClient.Namespace(ns, uri));
    };
    this.addHeader=function(soapObj){
        headers.push(soapObj);
    };
    this.addBody=function(soapObj){
        bodies.push(soapObj);
    };
    this.toString=function() {
        var soapEnv = new SOAPObject("soapenv:Envelope");
        soapEnv.attr("xmlns:soapenv","http://schemas.xmlsoap.org/soap/envelope/");
        //Add Namespace(s)
        if(nss.length>0){
            var tNs, tNo;
            for(tNs in nss){
                if(!nss.hasOwnProperty || nss.hasOwnProperty(tNs)){
                    tNo=nss[tNs];
                    if(typeof(tNo)==="object"){
                        soapEnv.attr("xmlns:"+tNo.name, tNo.uri);
                    }
                }
            }
        }
        //Add Header(s)
        if(headers.length>0) {
            var soapHeader = soapEnv.appendChild(new SOAPObject("soapenv:Header"));
            var tHdr;
            for(tHdr in headers){
                if(!headers.hasOwnProperty || headers.hasOwnProperty(tHdr)){
                    soapHeader.appendChild(headers[tHdr]);
                }
            }
        }
        //Add Body(s)
        if(bodies.length>0) {
            var soapBody = soapEnv.appendChild(new SOAPObject("soapenv:Body"));
            var tBdy;
            for(tBdy in bodies){
                if(!bodies.hasOwnProperty || bodies.hasOwnProperty(tBdy)){
                    soapBody.appendChild(bodies[tBdy]);
                }
            }
        }
        return '<?xml version="1.0" encoding="UTF-8" ?>\n' + soapEnv.toString();
    };
};

//Soap Object - Used to build body envelope and other structures
var SOAPObject = function(name) {
    this.typeOf="SOAPObject";
    this.ns=null;
    this.name=name;
    this.attributes=[];
    this.children=[];
    this.value=null;
    this.attr=function(name, value){
        this.attributes.push({
            "name":name,
            "value":value
        });
        return this;
    };
    this.appendChild=function(obj){
        this.children.push(obj);
        return obj;
    };
    this.hasChildren=function(){
        return (this.children.length > 0)?true:false;
    };
    this.val=function(v){

        if(arguments.length<1){
            return this.value;
        }else{
            this.value=v;
            return this;
        }
    };
    this.toString=function(){
        return SOAPClient.ToXML(this);
    };
};

/*
    END Singleton SOAP Client
*/

/* ResortSuite WebService SOAP wrapper as a Deferred - 0.0.1 - 2012-04-23
 * Based on sample code for Singleton SOAP Client
 * Copyright (c) 2012 Andy Zarzycki; Licensed GPL v3 */
    var rsSOAP = function ( ns, funcName, val, proxy ) {
    SOAPClient.Proxy = proxy || "/wso2wsas/services/RSWS.RSWSSOAP"; //Specify web-service address or a proxy file
//    SOAPClient.Proxy = "/ws/RSINT/RSINT.asp"; //Specify web-service address or a proxy file
//    SOAPClient.Proxy = "/ws/rsws/RSWS200901.asp"; //Specify web-service address or a proxy file
//    SOAPClient.Proxy = "http://192.168.0.121/wso2wsas/services/RSWS.RSWSSOAP"; //Specify web-service address or a proxy file
    var htmlEscape = function(str) {
        return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
    var soapBody = new SOAPObject(ns+":"+funcName+"Request");	//Create a new request object
    if (val!=null) {
        if ($.isArray(val)) {
            for(var i=0; i<val.length; i++) {
                if(!!val[i]&&typeof(val[i])==="object"&&val[i].typeOf==="SOAPObject") {
                    val[i].value = htmlEscape(val[i].value);
                    soapBody.appendChild(val[i]);
                }
            }
        } else {
            soapBody.val(val);
        }
    }

    var sr = new SOAPRequest(funcName, soapBody); //Request is ready to be sent
    sr.addNamespace('b','http://www.resortsuite.com/RSWS/v1/Club/Types');
    sr.addNamespace('c','http://www.resortsuite.com/RSWS/v1/Customer/Types');
    sr.addNamespace('s','http://www.resortsuite.com/RSWS/v1/Spa/Types');
    sr.addNamespace('k','http://www.resortsuite.com/RSWS/v1/Ski/Types');
    sr.addNamespace('f','http://www.resortsuite.com/RSWS/v1/Folio/Types');
    sr.addNamespace('p','http://www.resortsuite.com/RSWS/v1/PMS/Types');
    sr.addNamespace('g','http://www.resortsuite.com/RSWS/v1/Golf/Types');
    sr.addNamespace('r','http://www.resortsuite.com/RSWS/v1/Retail/Types');

    var responder = $.Deferred();

    //Lets send it
    SOAPClient.SendRequest(sr, function(r) {
        function firstElementWithKeyFragment( object, keyFragment) {
            for (key in object) {
                if(key.indexOf(keyFragment)!==-1) {
                    return object[key];
                }
            }
        }
        var body = r.Body || firstElementWithKeyFragment(r,":Body");

        if (funcName === 'FetchClubStatements') {
            funcName = 'FetchClubStatement';
        }

        var response = body[funcName+"Response"] || firstElementWithKeyFragment(body,":"+funcName+"Response");
        if(response.Result.value == "SUCCESS") {
            responder.resolve( response );
        } else {
            responder.reject( response );
        }
    });

    return responder.promise();
}


    $.wait = function(time) {
        return $.Deferred(function(dfd) {
            setTimeout(dfd.resolve, time);
        }).promise();
    }
    $.repeat = function(time) {
            repeater = $.Deferred(function(dfd) {
                dfd.intervalId = setInterval(dfd.notify, time);
            })
            repeaterPromise = repeater.promise();
            repeaterPromise.intervalId = repeater.intervalId;
            return repeaterPromise;
        }

    $.firstOrOnly = function(obj){
        return $.isArray(obj) ? obj[0] : obj;
    }
    $.wrapArray = function(obj){
        return $.isArray(obj) ? obj : [obj];
    }
    $.first = function(obj){
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                return {name:key,value:obj[key]}
            }
        }
        return undefined;
    }

    function RSDateToString(value,formatStr) {
        var formatStr = typeof formatStr == "string" ? formatStr : "dddd, MMMM d, yyyy";
        return Date.parse(value.substr(0,10) + " " + value.substr(10,2) + ":" + value.substr(12,2)).toString(formatStr)
        // "2012-06-09000000"
    }


    function  lpad(num, size) {
        var z = "000000000000000000000000000000",
            s = num+"",
            m = "",
            d = s.indexOf("."),
            l = s.length,
            targetsize = d==-1? size : size+l-d;
        if (+num < 0) {
            s = s.substr(1);
            m = "-";
        }
        return m+z.substr(0,targetsize-l)+s;
    }

    return {SOAP: rsSOAP, SOAPParam: SOAPObject, DateToString: RSDateToString, lpad:lpad}
});
