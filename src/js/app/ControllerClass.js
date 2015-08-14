/* 
 * Controller.js
 * Controller Prototype
 */

define( ['underscore','jquery','date'], function(_,$){
    if (!$.promiseFilter) {
        $.promiseFilter = function( promise, filterCallback ) {
            var dfd = $.Deferred();
            promise.then(function(){
                if (filterCallback.apply(this,[true,arguments])) {
                    dfd.resolve.apply(this,arguments);
                } else {
                    dfd.reject.apply(this,arguments);
                }
            },function(){
                if (filterCallback.apply(this,[false,arguments])) {
                    dfd.resolve.apply(this,arguments);
                } else {
                    dfd.reject.apply(this,arguments);
                }
            })
            return dfd.promise();
        }
    }
    return {
            initialized : false,
            
            // required by the dispatcher: actions, init, performAction
            actions: {
                'show': ['defaultControllerAction']
            },
            _init: function() {
                var self = this;
                this.initialized = true;
                console.log('called _init from '+this.module,app);
                _.each(app.data, function(v,k,l){
                    var selectedValue = [];
                    if (selectedValue = /selected\/([^/]+)\/([^/]+)\//.exec(k) ) {
                        if (selectedValue[1] == self.module) {
                            console.log('restoring selected value for '+k);
                            app.models[selectedValue[1]+'Model'].dataModel[selectedValue[2]].selectedValue = v;
                        }
                    }
                })
            },
            performAction: function(action){
                if (this.actions.hasOwnProperty(action)) {
                    var functionName = this.actions[action].slice(0,1),
                        functionArgs = $.merge(this.actions[action].slice(1),[].slice.call(arguments,1));
                    this[functionName].apply(this, functionArgs);
                } else {
                    console.log('i dont have action ' + action)
                }
            },

            defaultControllerAction : function () {
                console.log('defaultControllerAction', this);
            }
    }
});