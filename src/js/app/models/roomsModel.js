/*
 * systemModel.js
 * System Model for RSWebJS
 */

define([ 'rsweblib', 'app/ModelClass', 'underscore'], function( rs, ModelClass, _) {
    return window.app.models.roomsModel = $.extend({}, ModelClass, {

        app:app,
        module:'rooms',
        dataModel:{
            'pmsVenues':{
                source:{'soap':'FetchPMSVenues', ns:'p'},
                parameters:[
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData:[
                    {name:'Venue', array:true, key:"VenueId"}
                ],
                fetchOnce:true,
                persistData:false,
                persistSelection:true
            },
            'pmsLastQuery':{
                source:{},
                parameters:[
                    /*{name:'ArrivalDate', userinput:true},
                    {name:'DepartureDate', userinput:true},
                    {name:'Adults', userinput:true},
                    {name:'Children', userinput:true, optional:true},
                    {name:'Youth', userinput:true, optional:true},
                    {name:'Infants', userinput:true, optional:true},
                    {name:'Venue', model:'rooms.pmsVenues.VenueId'}*/
                ],
                returnData:[
                    {name:'PMSRateType', array:true, key:"PMSLastQuery"}
                ],
                fetchOnce:true,
                persistData:false,
                persistSelection:false
            },
            'pmsRateCalendar':{
                source:{'soap':'FetchPMSVenueAvailability', ns:'p'},
                parameters:[
                    {name:'StartDate', userinput:true},
                    {name:'EndDate', userinput:true},
                    {name:'Venue', model:'rooms.pmsVenues.VenueId', optional:true},
                ],
                returnData:[
                    {name:'VenueDailyAvailability', array:true, key:"Date"},
                    {name:'Venue', key:"Venue"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:true
            },
            'pmsVenueCalendar':{
                source:{'soap':'FetchPMSVenueCalendar', ns:'p'},
                parameters:[
                    {name:'StartDate', userinput:true},
                    {name:'EndDate', userinput:true},
                    {name:'Language', userinput:true, optional:true},
                    {name:'Venue', model:'rooms.pmsVenues.VenueId', optional:true},
                ],
                returnData:[
                    {name:'BarRateAvailability', array:true, key:"Date"},
                    {name:'BarRateType', key:"BarRateType"},
                    {name:'BarRoomType', key:"BarRoomType"},
                    {name:'Venue', key:"Venue"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:true
            },
            'pmsRoomTypeDetails':{
                source:{'soap':'FetchPMSRoomTypeDetails', ns:'p'},
                parameters:[
                    {name:'PMSRoomType', userinput:true},
                ],
                returnData:[
                    {name:'PMSRoomTypeDetails', key:"PMSRoomType"}
                ],
                fetchOnce:true,
                persistData:false,
                persistSelection:true
            },
            'pmsRateDetails':{
                source:{'soap':'FetchPMSRateDetails', ns:'p'},
                parameters:[
                    {name:'PMSRate', userinput:true},
                ],
                returnData:[
                    {name:'PMSRateDetails', key:"PMSRate"}
                ],
                fetchOnce:true,
                persistData:false,
                persistSelection:true
            },
            'pmsRates':{
                source:{'soap':'FetchPMSRates', ns:'p'},
                parameters:[
                    {name:'ArrivalDate', userinput:true},
                    {name:'DepartureDate', userinput:true},
                    {name:'Adults', userinput:true},
                    {name:'Children', userinput:true, optional:true},
                    {name:'Youth', userinput:true, optional:true},
                    {name:'Infants', userinput:true, optional:true},
                    {name:'Venue', model:'rooms.pmsVenues.VenueId', optional:true},
                    {name:'PromoCode', userinput:true, optional:true},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData:[
                    {name:'PMSRateType', array:true, key:"PMSRateTypeId"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:false
            },
            'pmsRoomTypes':{
                source:{'soap':'FetchPMSRoomTypes', ns:'p'},
                parameters:[
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'PMSRateType', model:'rooms.pmsRates.PMSRateTypeId'},
                    {name:'ArrivalDate',  model:'rooms.pmsLastQuery.ArrivalDate'},
                    {name:'DepartureDate',  model:'rooms.pmsLastQuery.DepartureDate'},
                    {name:'Adults',  model:'rooms.pmsLastQuery.Adults'},
                    {name:'Children',  model:'rooms.pmsLastQuery.Children'},
                    {name:'Youth',  model:'rooms.pmsLastQuery.Youth'},
                    {name:'Infants',  model:'rooms.pmsLastQuery.Infants'},
                    {name:'Venue', model:'rooms.pmsVenues.VenueId'}
                ],
                returnData:[
                    {name:'PMSRate', array:true, key:"PMSRoomType.PMSRoomTypeId"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:false
            },
            'pmsRooms':{
                source:{'soap':'FetchPMSRooms', ns:'p'},
                parameters:[
                    {name:'RoomType', model:'rooms.pmsRoomTypes.PMSRoomType'},
                    {name:'ArrivalDate',  model:'rooms.pmsLastQuery.ArrivalDate'},
                    {name:'DepartureDate',  model:'rooms.pmsLastQuery.DepartureDate'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData:[
                    {name:'PMSRoom', array:true, key:"PMSRoomNumber"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:true
            },
            'pmsBookRoom':{
                source:{'soap':'CreatePMSBooking', ns:'p'},
                parameters:[
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'PMSRoomType', userinput:true},
                    {name:'RoomNumber', userinput:true, optional:true},
                    {name:'CustomerId', model:'system.createSession.DefaultCustomerId'},
                    {name:'PMSRateType', userinput:true},
                    {name:'ArrivalDate',  userinput:true},
                    {name:'DepartureDate',  userinput:true},
                    {name:'Adults',  userinput:true},
                    {name:'Children',  userinput:true},
                    {name:'Youth', userinput:true},
                    {name:'Infants',  userinput:true}
                ],
                returnData:[
                    {name:'PMSFolioId', array:true, key:"PMSFolioId"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:false
            },
            'addSpecialService':{
                source:{'soap':'AddPMSSpecialService', ns:'p'},
                parameters:[
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'PMSFolioId', userinput:true},
                    {name:'PMSSpecialServiceName',  userinput:true},
                    {name:'PMSSpecialServiceQty',  userinput:true},
                    {name:'PMSSpecialServiceDate',  userinput:true, optional:true},
                    {name:'PMSSpecialServiceNote',  userinput:true, optional:true}
                ],
                returnData:[
                    {name:'PMSFolioSpecialServiceId', key:"PMSFolioSpecialServiceId"},
                    {name:'PMSFolioSpecialServicePrice', key:"PMSFolioSpecialServicePrice"},
                    {name:'PMSFolioSpecialServiceSurcharges', key:"PMSFolioSpecialServiceSurcharges"},
                    {name:'PMSFolioSpecialServiceTotal', key:"PMSFolioSpecialServiceTotal"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:false
            },
            'removeSpecialService':{
                source:{'soap':'RemovePMSSpecialService', ns:'p'},
                parameters:[
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'PMSFolioId', userinput:true},
                    {name:'PMSFolioSpecialServiceId',  userinput:true}
                ],
                returnData:[
                    {name:'Result', key:"value"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:false
            }
        }
    })
});
