/*
 * retailModel.js
 * GC Model for RSWebJS
 */

define( ['rsweblib','app/ModelClass','underscore'], function( rs, ModelClass, _ ){
    return window.app.models.retailModel = $.extend({}, ModelClass, {

        app: app,

        module: 'retail',
        dataModel: {
            'giftCertificates' : {
                source: {'soap':'FetchGiftCertificates', ns:'r'},
                parameters: [],
                returnData: [{name:'GiftCertificate', array: true, key:"ItemId"}],
                fetchOnce: true,
                persistData: false,
                persistSelection: false
            },
            'purchaseGC' : {
                source: {'soap':'PurchaseGiftCertificate', ns:'r'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'CustomerId', userinput:true},
                    {name:'ItemId', userinput:true},
                    {name:'IssueToName', userinput:true},
                    {name:'Message', userinput:true, optional:true},
                    {name:'Method', userinput:true, optional:true},
                    {name:'Layout', userinput:true, optional:true},
                    {name:'EmailAddress', userinput:true, optional:true},
                    {name:'MailToAddress.Address1', userinput:true, optional:true},
                    {name:'MailToAddress.Address2', userinput:true, optional:true},
                    {name:'MailToAddress.City', userinput:true, optional:true},
                    {name:'MailToAddress.StateProv', userinput:true, optional:true},
                    {name:'MailToAddress.Country', userinput:true, optional:true},
                    {name:'MailToAddress.PostCode', userinput:true, optional:true},
                    {name:'ExpressShipping', userinput:true, optional:true}
                ],
                returnData: [
                    {name:'CertificateId', key:"CertificateId"},
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            }
        }
    })
});
