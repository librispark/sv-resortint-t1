/* 
 * spaModel.js
 * Spa Model for RSWebJS
 */

define( ['rsweblib','app/ModelClass','underscore'], function( rs, ModelClass, _ ){
    return window.app.models.spaModel = $.extend({}, ModelClass, {

            app: app,
            
            module: 'spa',
            
            dataModel: {
                'spaLocations' : {
                    source: {'soap':'FetchSpaLocations', ns:'s'},
                    parameters: [{name:'WebFolioId', model:'system.createSession.WebFolioId'}],
                    returnData: [{name:'SpaLocation', array: true, key:"LocationId"}],
                    fetchOnce: true,
                    persistData: false,
                    persistSelection: true
                },
                'spaServices' : {
                    source: {'soap':'FetchSpaServices','ns':'s'},
                    parameters: [
                        {name:'Location',model:'spa.spaLocations.LocationId'},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'}],
                    returnData: [{name:'SpaService', array: true, key:"SpaItemId"}],
                    fetchOnce: true,
                    persistData: false,
                    persistSelection: true
                },
                'spaClasses' : {
                    source: {'soap':'FetchSpaClasses','ns':'s'},
                    parameters: [
                        {name:'Location',model:'spa.spaLocations.LocationId'},
                        {name:'StartDate', userinput:true},
                        {name:'EndDate', userinput:true},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                    ],
                    returnData: [{name:'DailySpaClasses', array: true, key:"DailySpaClasses"}],
                    fetchOnce: true,
                    persistData: false,
                    persistSelection: false
                },
                'spaClassesByCategory' : {
                    source: {model:'spa.spaClasses',mapper:
                        function(thisModel,sourceModelName,parameters){
                            var sourceModel = this.parseModelString(sourceModelName),
                                sourcePrimaryProperties = sourceModel.model.returnData[0],
                                thisPrimaryProperties = thisModel.returnData[0],
                                retval = [],
                                spaclass = $.firstOrOnly(sourceModel.model.data[this.makeStandardName(sourceModel.model,parameters)][sourcePrimaryProperties.name]).SpaClass;

                            return _.map(
                                _.groupBy(
                                    $.isArray(spaclass) ? spaclass : [spaclass],
                                    "ItemCategory"
                                ),
                                function(v,k,l){ return {name:k,value:v} }
                            )
                        }},
                    parameters: [{name:'Location',model:'spa.spaLocations.LocationId'},
                        {name:'StartDate', userinput:true},
                        {name:'EndDate', userinput:true},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'}],
                    returnData: [{name:'SpaCategory', array:true, key:"Category"}],
                    fetchOnce: true,
                    persistData: false,
                    persistSelection: false
                },
                'spaClassesFlat' : {
                    source: {model:'spa.spaClasses',mapper:
                        function(thisModel,sourceModelName,parameters){
                            //this mapper is multi-day safe
                            var sourceModel = this.parseModelString(sourceModelName),
                                sourcePrimaryProperties = sourceModel.model.returnData[0],
                                thisPrimaryProperties = thisModel.returnData[0],
                                retval = {};
                            retval[thisPrimaryProperties.name] = [];
                            _.each(sourceModel.model.data[this.makeStandardName(sourceModel.model,parameters)][sourcePrimaryProperties.name], function(v,k,l){
                                _.each($.isArray(v.SpaClass) ? v.SpaClass : [v.SpaClass], function(v2,k2,l2){
                                    retval[thisPrimaryProperties.name].push(v2);
                                })

                            });
                            return retval;
                        }},
                    parameters: [{name:'Location',model:'spa.spaLocations.LocationId'},
                        {name:'StartDate', userinput:true},
                        {name:'EndDate', userinput:true},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'}],
                    returnData: [{name:'SpaClass', array:true, key:"SpaClassId"}],
                    fetchOnce: true,
                    persistData: false,
                    persistSelection: false
                },
                'spaServicesByCategory' : {
                    source: {model:'spa.spaServices',mapper:
                        function(thisModel,sourceModelName,parameters){
                            // TODO: this mapper is NOT multi-day safe
                            var sourceModel = this.parseModelString(sourceModelName),
                                sourcePrimaryProperties = sourceModel.model.returnData[0],
                                thisPrimaryProperties = thisModel.returnData[0],
                                retval = [];

                            return _.map( _.groupBy(
                                sourceModel.model.data[this.makeStandardName(sourceModel.model,parameters)][sourcePrimaryProperties.name],
                                "ItemCategory" ), function(v,k,l){
                                    return {name:k,value:v}
                                })
                        }},
                    parameters: [{name:'Location', model:'spa.spaLocations.LocationId'}],
                    returnData: [{name:'SpaCategory', array:true, key:"name"}],
                    fetchOnce: true,
                    persistData: false,
                    persistSelection: false
                },
                'spaStaff' : {
                    source: {'soap':'FetchSpaStaff', 'ns':'s'},
                    parameters: [
                        {name:'SpaItemId', model:'spa.spaServices.SpaItemId'},
                        {name:'Gender', userinput:true, optional:true},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'}],
                    returnData: [{name:'SpaStaff', array: true, key:"SpaStaffId"}],
                    fetchOnce: true,
                    persistData: false,
                    persistSelection: true
                },
                'spaAvailability' : {
                    source: {'soap':'FetchSpaAvailability', 'ns':'s' },
                    parameters: [
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'SpaItemId', model:'spa.spaServices.SpaItemId'},
                        {name:'StartDateTime', userinput:true},
                        {name:'CustomerId', model:'system.createSession.DefaultCustomerId'},
                        {name:'SpaLocationId', model:'spa.spaLocations.LocationId'},
                        {name:'SpaStaffId', model:'spa.spaStaff.SpaStaffId', optional:true},
                        {name:'Gender', userinput:true, optional:true}
                    ],
                    returnData: [{name:'SpaAvailability', array:true, key:'AvailabilityId'}],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: false
                },
                'spaBooking' : {
                    source: {'soap':'CreateSpaBooking', 'ns':'s' },
                    parameters: [
                        {name:'SessionId', model:'system.createSession.SessionId'},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'CustomerId', userinput:true},
                        {name:'SpaItemId', model:'spa.spaServices.SpaItemId'},
                        {name:'StartDateTime', model:'spa.spaAvailability.StartDateTime'},
                        {name:'SpaLocationId', model:'spa.spaLocations.LocationId'},
                        {name:'SpaStaffId', model:'spa.spaAvailability.SpaStaffId', optional:true},
                        {name:'StaffRequested', optional:true},
                        {name:'Gender', userinput:true, optional:true},
                        {name:'GuestName', userinput:true, optional:true}
                    ],
                    returnData: [
                        {name:'SpaFolioId', key:'SpaFolioId'},
                        {name:'SpaFolioItemId', key:'SpaFolioItemId'}
                    ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: false
                },
                'updateSpaFolioItemCustomer' : {
                    source: {'soap':'UpdateSpaFolioItemCustomer', 'ns':'s' },
                    parameters: [
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'CustomerId', userinput:true}
                    ],
                    returnData: [
                        {name:'Result', array: true, key:"ErrorId"}
                    ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: false
                },
                'classBooking' : {
                    source: {'soap':'CreateClassBooking', 'ns':'s' },
                    parameters: [
                        {name:'SessionId', model:'system.createSession.SessionId'},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'CustomerId', userinput:true},
                        {name:'ProgramId', userinput:true},
                        {name:'GuestName', userinput:true, optional:true}
                    ],
                    returnData: [
                        {name:'SpaFolioItem', array:true, key:'SpaFolioItemId'},
                        {name:'Result', array:true, key:'value'}
                    ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: false
                },
                'spaCustomerConflictingBookings' : {
                    source: {'soap':'FetchSpaCustomerConflictingBookings', 'ns':'s' },
                    parameters: [
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'CustomerId', userinput:true},
                        {name:'SpaItemId', userinput:true},
                        {name:'StartDateTime', userinput:true}
                    ],
                    returnData: [
                        {name:'Result', array: true, key:"ErrorId"},
                        {name:'SpaBooking', array:true, key:'StartTime'}
                    ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: false
                }
                ,
                'spaClassComponents' : {
                    source: {'soap':'FetchSpaClassComponents', 'ns':'s' },
                    parameters: [
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'ProgramId', userinput:true}
                    ],
                    returnData: [
                        {name:'ProgramId', key:"ProgramId"},
                        {name:'SpaClassComponent', array:true, key:'SpaClassId'}
                    ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: false
                }


            }
//                    if (staffGenderOrId == 'M' || staffGenderOrId == 'F') {
//                        parametersFetchSpaAvailability.push(new rs.SOAPParam("Gender").val(staffGenderOrId));
//                    } else if (staffGenderOrId) {
//                        parametersFetchSpaAvailability.push(new rs.SOAPParam("SpaStaffId").val(staffGenderOrId));
//                    }
        })
});
