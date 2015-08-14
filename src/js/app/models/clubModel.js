/*
 * clubModel.js
 * Club Model for RSWebJS
 */
define(['rsweblib', 'app/ModelClass', 'underscore'], function(rs, ModelClass, _) {
    return window.app.models.clubModel = $.extend({}, ModelClass, {
        app: app,
        module: 'club',
        dataModel: {
            'fetchAccounts': {
                source: {'soap': 'FetchClubAccounts', ns: 'b'},
                parameters: [
                    {name: 'CustomerId', userinput: true},
                    {name: 'CustomerGUID', userinput: true}
                ],
                returnData: [{name: 'Account', array: true, key: "AccountId"}],
                fetchOnce: true,
                persistData: false,
                persistSelection: true
            },
            'fetchClubBillings': {
                source: {'soap': 'FetchClubBillings', ns: 'b'},
                parameters: [
                    {name: 'CustomerId', userinput: true},
                    {name: 'CustomerGUID', userinput: true},
                    {name: 'AccountId', userinput: true}
                ],
                returnData: [{name: 'BillingPeriod', array: true, key: "BillDate"}],
                fetchOnce: true,
                persistData: false,
                persistSelection: true
            },
            'fetchClubStatement': {
                source: {'soap': 'FetchClubStatement', ns: 'b'},
                parameters: [
                    {name: 'CustomerId', userinput: true},
                    {name: 'CustomerGUID', userinput: true},
                    {name: 'AccountId', userinput: true},
                    {name: 'BillDate', userinput: true}
                ],
                returnData: [{name: 'Account', array: true, key: "AccountId"}],
                fetchOnce: true,
                persistData: false,
                persistSelection: true
            }
        }
    });
});
