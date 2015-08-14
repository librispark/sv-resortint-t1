define(['Handlebars','date'], function ( Handlebars ){
    function RSDateToString(value,formatStr) {
        if (!value) return "";
        value = String(value);
        var formatStr = typeof formatStr == "string"
            ? formatStr == "D" ? window.Date.CultureInfo.formatPatterns.longDate : formatStr
            : window.Date.CultureInfo.formatPatterns.longDate; //"dddd, MMMM d, yyyy";
        var theDate;
        var offset = value.length > 10 ? 10 : 0;
        if (!offset && value.indexOf("-")!==-1) {
            theDate = Date.parse(value,"yyyy-MM-dd");
        } else {
            theDate = Date.parseExact((offset?value.substr(0,offset+0) + " ": "") + value.substr(offset+0,2) + ":" + value.substr(offset+2,2), (offset?"yyyy-MM-dd HH:mm":"HH:mm"))
        }
        return theDate ? theDate.toString(formatStr) : "";
        // "2012-06-09000000"
    }


    Handlebars.registerHelper( 'RSDateToString', RSDateToString );
    return RSDateToString;
});

