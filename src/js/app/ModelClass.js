/*
 * ModelClass.js
 * Model Prototype
 */

define( ['rsweblib','underscore'], function( rs, _ ){
    return {
            makeStandardName: function(model, givenParameters) {

                // model.returnData[0].name+'/'+self.makeStandardName(model,parameters)

                var useParameters = this.gatherParameters(model.parameters,givenParameters),
                    availableParameters = model.parameters,
                    keys = _(availableParameters).pluck('name').sort(),
                    values = [];
                for (i=0;i<keys.length;i++) {
                    keys[i] != "WebFolioId" && values.push(useParameters[keys[i]])
                }
                return model.returnData[0].name+'/'+values.join('-')
            },

            parseModelString: function(modelString, parameters) {
                var segments = modelString.split('.'),
                    selected = app.models[segments[0]+'Model'].getSelectedValue(segments[1], segments[2], parameters);
                return {
                    module: app.models[segments[0]+'Model'],
                    modelName: segments[1],
                    model: app.models[segments[0]+'Model'].dataModel[segments[1]],
                    value: selected
                }
            },

            primaryProperties: function(modelName) {
                var model = typeof(modelName) == "string" ? this.dataModel[modelName] : modelName,
                    returnDataKeys = _.keys(model.returnData),
                    primaryReturnDataKey = primaryReturnDataValue = undefined;

                if (returnDataKeys.length > 1 ) {
                    _.each(model.returnData,function(v,k,l){
                        if (v['primary']) {
                            primarySeries = k;
                            primaryProperties = v;
                        }
                    })
                } else {
                    primarySeries = returnDataKeys[0];
                    primaryProperties = model.returnData[returnDataKeys[0]];
                }
                primaryProperties.name = primarySeries;
                return primaryProperties;
            },

            getSelectedItem: function(modelName, parameters, key) {
                var model = typeof(modelName) == "string" ? this.dataModel[modelName] : modelName,
                    key = key || model.returnData[0].key,
                    primaryData = _.find(model.returnData,function(v){
                        return v.key == key
                    }),
                    useParameters = this.gatherParameters(model.parameters,parameters)
                if (primaryData['array']) {
                   // if (!model.data)
                    return !model.data ? undefined : _.find(model.data[this.makeStandardName(model,useParameters)][primaryData.name], function(v){
                        function drill(obj,key) {
                            var keybits = key.split(".");
                            if (keybits.length>1) {
                                return drill(obj[keybits[0]], keybits.slice(1).join("."));
                            } else {
                                return obj[keybits[0]];
                            }
                        }
                        return drill(v,primaryData.key) == model.selectedValue
                    });
                    //model.data[primarySeries][primaryProperties.key]
                } else {
                    return primaryData == model.returnData[0]
                                            ? model.selectedValue
                                            : model.data
                                                ? model.data[this.makeStandardName(model,useParameters)]
                                                : undefined; // [primaryData.name]; // [primaryData.key];
                }
            },

            getSelectedValue: function(modelName,key,parameters) {
                if (!this.dataModel.hasOwnProperty(modelName)) {
                    return undefined;
                }
                var model = typeof(modelName) == "string" ? this.dataModel[modelName] : modelName,
                    primaryData = model.returnData[0],
                    key = key || primaryData.key;

                if (key == primaryData.key) {
                    return model['selectedValue'];
                } else /*if (!primaryData.array) {
                    console.log
                    return model['selectedValue']
                } else */ {
                    var retval = this.getSelectedItem(modelName,parameters,key)
                    return retval ? retval[key] : undefined
                }
            },

            gatherParameters: function(requiredParameters, parameters) {
                // gather parameters
                var self = this,
                    availableParameters = {},
                    useParameters = {},
                    // set missing parameters to those that our source model requires
                    missingParameters = _.filter(requiredParameters,function(v){
                        if(v['value']) {
                            availableParameters[v.name] = v.value;
                            useParameters[v.name] = v.value;
                        }
                        return !v.optional && !v['value'];
                    });
                // first we take the parameters that we were explicitly passed,
                // and cross them off our missing list
                if (missingParameters.length!=undefined) {
                    _.each(parameters, function(v,k,l){
                        missingParameters = _.filter(missingParameters,function(v2){
                            if (v2.name==k) {
                                availableParameters[v2.name] = v;
                            }
                            return v2.name!=k
                        });
                        //  /(?:\.?(\w+)(?:\[(\d+)\])?)+/g.exec(k)
                        var segments = k.split('.'),
                            trimmedK = "",
                            trimmed = [];
                        _.each(segments, function(v3,k3,l3){
                            var childName = /(\w+)(?:\[(\d+)\])?/.exec(v3);
                            trimmed.push(childName[1] || "");
                        })
                        trimmedK = trimmed.join('.');
                        _.each(requiredParameters,function(v2,k2,l2){
                            if (v2.name==trimmedK) {
                                useParameters[k] = v;
                            }
                        })
                    })
                }
                // if there are unsatisfied parameter dependencies, let's see if the other
                // other models have them available
                if (missingParameters.length) {
                    _.each(missingParameters, function(v,k,l){
                        // TODO: parseModelString will return the value of the *default* returnData
                        // element. augment this to loop through *all* returnData's and be able to
                        // pull any of their values for auto-completion
                        if (v.userinput && !v.model) {
                            throw Error("required user input parameter "+ v.name +" not provided");
                        }
                        foreignModel = self.parseModelString(v.model, parameters);
                        if(foreignModel.value) {
                            missingParameters = _.filter(missingParameters,function(v2){
                                if (v2.model==v.model) {
                                    availableParameters[v2.name] = foreignModel.value;
                                }
                                return v2.model!=v.model
                            });
                            _.each(requiredParameters,function(v2,k2,l2){
                                if (v2.model==v.model) {
                                    useParameters[v2.name] = foreignModel.value;
                                }
                            })
                        }
                    });
                }
                // sorry, not all dependencies are met, we give up now :(
                if (missingParameters.length) {
                    var retval = new Error('could not find parameters');
                    retval.missingParameters = missingParameters;
                    return retval;
                } else {
                    return useParameters;
                }
            },

            getData: function(modelName, parameters) {
                if (!this.dataModel.hasOwnProperty(modelName)) {
                    console.log(this.module + ' does not have a model ' + modelName )
                    return undefined;
                }
                var self = this,
                    model = this.dataModel[modelName],
                    parameters = parameters || {},
                    dfd = $.Deferred();
                model.data = model.data || {};
                // do we already have our data? or...
                if (model.fetchOnce && model.data[this.makeStandardName(model,parameters)]) {
                    dfd.resolve(model.data[this.makeStandardName(model,parameters)]);
                // do we need to resolve dependencies and get the data?
                } else if (model.source['model']) {
                    // when source==model then we're copying data from an existing model to this one
                    var sourceModel = this.parseModelString(model.source.model,parameters),
                        useParameters = this.gatherParameters(sourceModel.model.parameters, parameters);
                    // sorry, not all dependencies are met, we give up now :(
                    if (useParameters.constructor.name=="Error") {
                        dfd.reject( {Result:{Text:"Can't load "+sourceModel.modelName+" without knowing "+ _.pluck(useParameters.data,"name").join(", ")}});
                        console.log(useParameters,new Error("Missing parameters for unpopulated source model ("+model.source.model+") of model "+modelName+".") );
                    } else if (!sourceModel.model.data || !sourceModel.model.data[this.makeStandardName(sourceModel.model,useParameters)]) {
                        console.log('getting data from submodel' + sourceModel.modelName, useParameters);// finally, get that data

                        sourceModel.module.getData(sourceModel.modelName, useParameters)
                            .done(function(r){
                                model.data[self.makeStandardName(model,parameters)]
                                    = model.source.mapper.call(self, model, model.source.model, useParameters);
                                console.log('model:',model,'parameters',parameters,'makestandardname' ,self.makeStandardName(model,parameters),'data',model.data[self.makeStandardName(model,parameters)]);
                                if (model.persistData) {
                                    app.datac(self.makeStandardName(model,parameters),
                                        model.data[self.makeStandardName(model,parameters)]
                                    )
                                }
                                dfd.resolve(model.data[self.makeStandardName(model,parameters)]);
                            })
                            .fail( function(r) {
                                model.faildata = r
                                dfd.reject(r);
                                console.log(new Error("Unable to populate source model ("+model.source.model+") of model "+modelName+"."));
                            });
                    } else {
                        model.data[self.makeStandardName(model,parameters)]
                            = model.source.mapper.call(self, model, model.source.model, useParameters);
                        console.log('model:',model,'parameters',parameters,'makestandardname' ,self.makeStandardName(model,parameters),'data',model.data[self.makeStandardName(model,parameters)]);
                        if (model.persistData) {
                            app.datac(self.makeStandardName(model,parameters),
                                model.data[self.makeStandardName(model,parameters)]
                            )
                        }
                        dfd.resolve(model.data[self.makeStandardName(model,parameters)]);
                    }
                } else if (model.source['soap']) {
                    // when source==soap then we're calling the server for our data
                    var soapParameters = [];
                    parameters = this.gatherParameters(model.parameters, parameters);
                    // sorry, not all dependencies are met, we give up now :(
                    if (parameters.constructor.name=="Error") {
                        dfd.reject( {Result:{Text:"Missing parameters for SOAP request ("+model.source.soap+") of model "+modelName+"."}});
                        console.log(parameters, new Error("Missing parameters for SOAP request ("+model.source.soap+") of model "+modelName+".") );
                    } else {
                        var paramKeys = _.keys(parameters).sort(),
                            key = undefined;
                        for (var i = 0; i < paramKeys.length; i++)  {
                            key = paramKeys[i];
                            function drill(obj,_key) {
                                var keybits = _key.split("."),
                                    childName = keybits[0],
                                    childNameArr = /(\w+)(?:\[(\d+)\])?(?::([\w=;]+))?/.exec(childName),
                                    attrStr = childNameArr[3] || undefined,
                                    attrs = [],
                                    nthChild = +childNameArr[2] || 0,
                                    childName = childNameArr[1];
                                if (attrStr) {
                                    var attrPairs = attrStr.split(';');
                                    _.each(attrPairs, function(v){
                                        attrs.push( v.split('=') );
                                    })
                                }
                                // find child of obj with name in keybits[0]
                                // if not found, create object
                                // then, drill with obj and sliced keybits
                                // console.log('nthChild',nthChild,_key,childNameArr,childName,keybits[0],obj);
                                var foundChild = undefined;
                                for( child in obj ){
                                    if( obj.hasOwnProperty(child)) {
                                        if (obj[child].name==childName) {
                                            // at this point we have found a child that matches the desired name
                                            // if the child had an array index included in its name, "Phone[1]",
                                            // then we wait until we have seen that many children with this name,
                                            // thus reached the [nth] child. the index is zero-based.
                                        ////// Edit:
                                        //     rather than blindly counting down children (since the order children
                                        //     are iterated by for() is undefined) we assign the index number
                                        //     explicitly down below and compare it here. This should always target
                                        //     the same object, regardles of order.
                                                // console.log('nthChild??',nthChild,child);
                                            if ((nthChild>0 && obj[child]._nthChild==nthChild) || nthChild==0) {
                                            // if (nthChild>0) {
                                            //     nthChild--;
                                                // console.log('nthChild--  found');
                                            // } else {
                                        //
                                        ////////////
                                                foundChild = child; // this is the index of the child with the desired name
                                                // in obj. obj is the children array of its parent,
                                                // or the outermost container array
                                            }
                                        }
                                    }
                                }
                                // below foundChild is used as the array index number of the target child
                                // in the obj array
                                if (keybits.length>1) {
                                    if (foundChild===undefined){
                                        // so if we are newly setting the obj, then we assign its index number,
                                        // as inferred from the array size result from push()
                                        var newSOAPParam = new rs.SOAPParam(childName).val("");
                                        _.each(attrs, function(v){
                                            newSOAPParam.attr( v[0], v[1] );
                                        })
                                        newSOAPParam._nthChild = nthChild;
                                        foundChild = obj.push( newSOAPParam ) - 1;
                                    }
                                    drill(obj[foundChild].children, keybits.slice(1).join("."));
                                } else {
                                    // the else case is for when there are no more dots in the key name, so we have
                                    // recursed deep enough, and now it is time to set the value. if we have not
                                    // recursed yet at all, which means that we have a top-level array-indexed child
                                    // name, we simply add the child by name. We assume that the parameters passed
                                    // are well-formed and passed to us in the correct order -- we perhaps blithely ignore
                                    // the index number since values set in the top level can't be referenced again anyhow
                                    // we forgo being able to explicitly order the same-name elements in the top level array
                                    var newSOAPParam = new rs.SOAPParam(childName).val( parameters[key] );
                                    _.each(attrs, function(v){
                                        newSOAPParam.attr( v[0], v[1] );
                                    })
                                    obj.push( newSOAPParam );
                                }
                            }
                            //console.log('drilling for oil',soapParameters,key);
                            drill(soapParameters,key);
                            // very hacky way to clear the timeout warning, it shouldn't live here but be called from
                            // each controller that makes a model call konwn to pass (and thus update) the WebFoliId
                            if (key =="WebFolioId") {
                                app.views.splashView.event.fire('clearTimeoutWarning');
                            }
                        }
                        console.log( 'calling soap model', model.source.ns, model.source.soap, soapParameters )
                        rs.SOAP(model.source.ns, model.source.soap, soapParameters, app.customization.SOAPUrl)
                            .done( function(r) {
        // when returnData[].array is true, ensure data is an array even when source soap returns it as a bare item
        // is $.isArray(data) ? data : [data]
                                var r_part;
                                model.data[self.makeStandardName(model,parameters)] = { rawData: r };
                                for (var i=0; i<model.returnData.length;i++) {
                                    if (r_part = r[model.returnData[i].name]) {
                                        console.log( 'setting model.data[',
                                            self.makeStandardName(model,parameters),
                                            '=self.makeStandardName(',
                                            model,
                                            ',',
                                            parameters,
                                            ')][',
                                            model.returnData[i].name,
                                            ']  to (',
                                            model.returnData[i].array,
                                            ' && ',
                                            !$.isArray(r_part),
                                            ') ? ',
                                            [r_part],
                                            ' : ',
                                            r_part,
                                            ' )' );
                                        model.data[self.makeStandardName(model,parameters)][model.returnData[i].name]
                                            = (model.returnData[i].array && !$.isArray(r_part)) ? [r_part] : r_part
                                    }
                                }
                                if (model.returnData.length==0 || r[model.returnData[0].name]) {
                                    //model.data[self.makeStandardName(model,parameters)] = r
                                    if (model.persistData) {
                                        app.datac(self.makeStandardName(model,parameters), r)
                                    }
                                    dfd.resolve(model.data[self.makeStandardName(model,parameters)]);
                                } else {
                                    dfd.reject(r);
                                }
                            })
                            .fail( function(r) {
                                if (r.Result &&
                                    (r.Result.ErrorId==1001 || r.Result.ErrorId==1002 || r.Result.ErrorId==1003 )
                                    ) {
                                    $.cookie('sessionid',null); //app.datac('SessionId',null);
                                    // console.log(r);
//                                    app.dispatcher.dispatch('summary','clear',['force']);
                                    app.views.splashView
                                        ? app.views.splashView.event.fire('folioTimedOut')
                                        : alert('Sorry, but your session has expired. You will need to start over. Please press your browser\'s Reload button after closing this message.');
                                    app.data.active = false;
                                } /*else if (r.Result &&
                                    (/ *r.Result.ErrorId==1004 ||* / r.Result.ErrorId==1005)
                                    ) {
                                    // console.log('reload!',r);
                                    alert('Sorry, an unknown error has occurred. You will need to start over.');
                                    app.dispatcher.redirect('','',[]);
                                    //window.location.reload(false);
                                } */ /* else  if (r.Result &&
                                    (r.Result.ErrorId==1006)
                                    ) {
                                    console.log(r);
                                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                        title:app.localization.paymentProcessing.err.folioUnpaid,
                                        message:''
                                    });
                                    app.dispatcher.redirect('summary','',[]);
                                    //window.location.reload(false);
                                } else */ /* if (r.Result &&
                                    (r.Result.ErrorId==1007)
                                    ) {
                                    console.log(r);
                                    alert('Sorry, you need to log in to continue.');
                                    app.dispatcher.redirect('profile','login',[]);
                                    window.location.reload(false);
                                } */ else {
                                    model.faildata = r
                                    dfd.reject( r );
                                    //throw Error("Unable to complete SOAP request ("+model.source.soap+") of model "+modelName+".")
                                }
                            });
                    }

                } else {
                    dfd.reject({Result:{Text:"Incomplete model definition for "+modelName+"."}});
                    throw new Error("Incomplete model definition for "+modelName+".")
                }
                return dfd.promise();
            },

            setSelected: function(modelName, parameters, value, returnDataName) {
                var model = this.dataModel[modelName],
                    // TODO: add handling of multiple returnData elements, by searching for the
                    // one with name == returnDataName, instead of just using [0]
                    name = model.returnData[0].name,
                    key = model.returnData[0].key,
                    array = model.returnData[0]['array'],
                    parameters = this.gatherParameters(model.parameters,parameters) || {},
                    datakey = this.makeStandardName(model,parameters);
                console.log('selecting value '+value+' in model '+modelName+ ' with parameters',parameters);
                if (array) {
//                    if (model.data && model.data[datakey] &&_.any(model.data[datakey],function(v){
//                        return v[key]==value
//                    })) {
                        if (model.persistSelection) {
                            app.datac('selected/'+this.module+'/'+modelName+'/'+datakey,value)
                        }
                        return model.selectedValue = value;
//                    } else {
//                        throw new Error("Unable to set selected value for key "+key+" to "+value+" in model "+modelName+".")
//                    }
                } else {
                    if (model.persistSelection) {
                        app.datac('selected/'+this.module+'/'+modelName+'/'+datakey,value)
                    }
                    return model.selectedValue = value
                }


            }


    }
});
