/*
 * golfModel.js
 * Golf Model for RSWebJS
 */

define( ['rsweblib','app/ModelClass','underscore'], function( rs, ModelClass, _ ){
    return window.app.models.golfModel = $.extend({}, ModelClass, {

        app: app,

        module: 'golf',
        dataModel: {
            'golfLocations' : {
                source: {'soap':'FetchGolfLocations', ns:'g'},
                parameters: [
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [{name:'GolfLocation', array: true, key:"LocationId"}],
                fetchOnce: true,
                persistData: false,
                persistSelection: true
            },
            'golfCourses' : {
                source: {'soap':'FetchGolfCourses', ns:'g'},
                parameters: [
                    {name:'LocationId', model:'golf.golfLocations.LocationId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [{name:'GolfCourse', array: true, key:"CourseId"}],
                fetchOnce: true,
                persistData: false,
                persistSelection: true
            },
            'golfTeeTimes' : {
                source: {'soap':'FetchGolfTeeTimes', ns:'g'},
                parameters: [
                    {name:'CourseId', model:'golf.golfCourses.CourseId'},
                    {name:'Players', userinput:true},
                    {name:'StartDateTime', userinput:true},
                    {name:'EndDateTime', userinput:true},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [{name:'GolfTeeTimes', array: true, key:"GolfTeeTimes"}],
                fetchOnce: false,
                persistData: false,
                persistSelection: true
            },
            'golfRates' : {
                source: {'soap':'FetchGolfRates', ns:'g'},
                parameters: [
                    {name:'CourseId', model:'golf.golfCourses.CourseId'},
                    {name:'CustomerId', userinput:true},
                    {name:'Date', userinput:true},
                    {name:'TeeTime', userinput:true},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [
                    {name:'Result', key:"Result"},
                    {name:'Price', key:"Price"},
                    {name:'PriceWithSurcharge', key:"PriceWithSurcharge"},
                    {name:'ItemName', key:"ItemName"},
                    {name:'ItemId', key:"ItemId"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'bookTeeTime' : {
                source: {'soap':'CreateGolfBooking', ns:'g'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'TeeTime', userinput:true},
                    {name:'CourseId', userinput:true},
                    {name:'Players', userinput:true},
                    {name:'CustomerId', model:'system.createSession.CustomerId'},
                    {name:'ItemId', userinput:true},
                    {name:'Price', userinput:true},
                    {name:'LocationId', userinput:true},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [
                    {name:'GolfBookingId', key:"GolfBookingId"},
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: true
            }
        }
    })
});
