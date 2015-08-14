/*
 * controllers/clubController.js
 * Club Controller
 */
define([
    'app/ControllerClass',
    'app/models/clubModel',
    'app/views/clubView'], function(controllerClass, clubModel, clubView) {
    return window.app.controllers.clubController = $.extend({}, controllerClass, {
        app: app,
        module: 'club',
        actions: {
            'show': ['indexAction'],
            'account': ['accountAction'],
            'statement': ['statementAction']
        },
        init: function() {
            console.log('initializing club controller');
            app.data.messages = app.data.messages || [];
            this._init.call(this);
        },
        Test: function() {
            app.views.clubView.event.fire('test');
        },
        indexAction: function() {
            //making sure user is logged in
            if (!app.data.userLoggedIn) {
                app.dispatcher.redirect('profile', 'login', ['next', 'membership']);
            } else {
                $.when(
                    clubModel.getData('fetchAccounts', {'CustomerId': app.data.CustomerId, 'CustomerGUID': app.data.CustomerGUID}),
                    app.data.WebFolioId ? app.models.systemModel.getData('folioBalance', {}) : null
                    )
                        .done(function(userAccounts) {
                    if (userAccounts.Account.length == 1) {
                        //redirecting to show the account in details since user has only 1
                        app.dispatcher.redirect('membership', 'account', [userAccounts.Account[0].AccountId]);
                        return;
                    }

                    clubView.event.fire('indexAction', userAccounts);
                }).fail(function() {
                    app.data.messages.push({type: 'alert', 'class': 'alert-error', actions: [],
                        title: app.localization.club.fetchAccountsFail,
                        message: ''
                    });
                    app.dispatcher.replace('', '', []);
                });
            }
        },
        accountAction: function(accountId) {
            //making sure user is logged in
            if (!app.data.userLoggedIn) {
                app.dispatcher.redirect('profile', 'login', ['next', 'membership', 'account', accountId]);
            } else {
                //user is logged in, preparing request params
                var accountsRequestParams = {
                    CustomerId: app.data.CustomerId,
                    CustomerGUID: app.data.CustomerGUID,
                };

                var clubBillingsRequestParams = $.extend({}, {AccountId: accountId}, accountsRequestParams);

                var clubStatementsRequestParams = $.extend({}, {BillDate: 'CURRENT'}, clubBillingsRequestParams);

                $.when(clubModel.getData('fetchAccounts', accountsRequestParams),
                        clubModel.getData('fetchClubBillings', clubBillingsRequestParams),
                        clubModel.getData('fetchClubStatement', clubStatementsRequestParams),
                        app.data.WebFolioId ? app.models.systemModel.getData('folioBalance', {}) : null
                        )
                        .done(function(accountsResponse, clubBillingsResponse, clubStatementsResponse) {

                    //passing only current account details to the view
                    for (var i = 0; i < accountsResponse.Account.length; i++) {
                        if (accountId == accountsResponse.Account[i].AccountId) {
                            break;
                        }
                    }

                    app.models.clubModel.dataModel.fetchClubStatement.data = app.models.clubModel.dataModel.fetchClubStatement.data || {};
                    try {
                        app.models.clubModel.dataModel.fetchClubStatement.data[
                            app.models.clubModel.makeStandardName(
                                app.models.clubModel.dataModel.fetchClubStatement,
                                $.extend(clubBillingsRequestParams,{BillDate:clubStatementsResponse.Account[0].BillingPeriods.BillingPeriod.BillDate})
                            )
                        ] = clubStatementsResponse;
                    } catch (e) {

                    }

                    clubView.event.fire('accountAction', {
                        accountResponse: accountsResponse.Account[i],
                        clubBillingsResponse: clubBillingsResponse,
                        clubStatementsResponse: clubStatementsResponse
                    });
                }).fail(function() {
                    app.data.messages.push({type: 'alert', 'class': 'alert-error', actions: [],
                        title: app.localization.club.fetchStatementsFail,
                        message: ''
                    });
                    app.dispatcher.replace('', '', []);
                });
            }
        },
        statementAction: function(accountId, billDate) {
            var soapRequestParams = {
                CustomerId: app.data.CustomerId,
                CustomerGUID: app.data.CustomerGUID,
                BillDate: billDate,
                AccountId: accountId
            };

            $.when(clubModel.getData('fetchClubStatement', soapRequestParams),
                    app.data.WebFolioId ? app.models.systemModel.getData('folioBalance', {}) : null)
                    .done(function(statementsResponse) {
                clubView.event.fire('statementAction', {
                    billDate: billDate,
                    statementsResponse: statementsResponse
                });
            }).fail(function() {
                clubView.event.fire('statementAction', {billDate: billDate,error: true});
            });
        }
    });
});
