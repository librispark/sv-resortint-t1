/* 
 * skiModel.js
 * Ski Model for RSWebJS
 */

define( ['rsweblib','app/ModelClass','underscore'], function( rs, ModelClass, _ ){
    return window.app.models.skiModel = $.extend({}, ModelClass, {

            app: app,
            
            module: 'ski',
            
            dataModel: {
                'skiLocations' : {
                    source: {'soap':'FetchSkiLocations', 'ns':'k'},
                    parameters: [{name:'WebFolioId', model:'system.createSession.WebFolioId'}],
                    returnData: [{name:'SkiLocation', array: true, key:"LocationId"}],
                    fetchOnce: true,
                    persistData: false,
                    persistSelection: true
                },
                'skiLiftTickets' : {
                    source: {'soap':'FetchSkiLiftTickets','ns':'k'},
                    parameters: [
                        {name:'Location',model:'ski.skiLocations.LocationId'},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'CustomerId', userinput:true, optional:true},
                        {name:'StartDate', userinput:true, optional:true}
                        ],
                    returnData: [
                        {name:'Result', key:"value"},
                        {name:'LiftTickets', key:"SkiItemId"},
                        {name:'PromoLiftTickets', key:"SkiItemId"}
                        ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: true
                },
                'skiPasses' : {
                    source: {'soap':'FetchSkiPasses','ns':'k'},
                    parameters: [
                        {name:'Location',model:'ski.skiLocations.LocationId'},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'CustomerId', userinput:true, optional:true},
                        {name:'StartDate', userinput:true, optional:true}
                        ],
                    returnData: [
                        {name:'Result', key:"value"},
                        {name:'Passes', key:"Pass.SkiItemId"},
                        {name:'PromoPasses', key:"PromoPass.SkiItemId"}
                        ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: true
                },
                'purchaseSkiLiftTicket' : {
                    source: {'soap':'PurchaseSkiLiftTicket', 'ns':'k' },
                    parameters: [
                        {name:'SessionId', model:'system.createSession.SessionId'},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'CustomerId', userinput:true, optional:true},
                        {name:'SkiItemId', model:'ski.skiLiftTickets.SkiItemId'},
                        {name:'StartDate', userinput:true, optional:true},
                        {name:'Qty', userinput:true}
                    ],
                    returnData: [
                        {name:'SkiFolioId', key:'SkiFolioId'},
                        {name:'SkiFolioItemId', key:'SkiFolioItemId'}
                    ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: false
                },
                'purchaseSkiPass' : {
                    source: {'soap':'PurchaseSkiPass', 'ns':'k' },
                    parameters: [
                        {name:'SessionId', model:'system.createSession.SessionId'},
                        {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                        {name:'CustomerId', userinput:true, optional:true},
                        {name:'SkiItemId', model:'ski.skiPasses.Pass.SkiItemId'},
                        {name:'StartDate', userinput:true, optional:true}
                    ],
                    returnData: [
                        {name:'SkiFolioId', key:'SkiFolioId'},
                        {name:'SkiFolioItemId', key:'SkiFolioItemId'}
                    ],
                    fetchOnce: false,
                    persistData: false,
                    persistSelection: false
                }                
            }
        })
});
