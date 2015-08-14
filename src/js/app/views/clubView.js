/*
 * views/clubView.js
 * Club View
 */
define([
    'lib/event',
    'app/views/commonViewHelper',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/breadcrumbs',
    'hbs!app/views/templates/content',
    'hbs!app/views/templates/clubAccountList',
    'hbs!app/views/templates/clubAccount',
    'hbs!app/views/templates/clubStatementTable',
    'bootstrap'
], function(Event, commonViewHelper, navbarTpl, breadcrumbsTpl, contentTpl, clubAccountList, clubAccount, clubStatementTable) {
    var clubView = {
        app: app,
        event: $.extend({}, Event),
        module: "club",
        render: function(template, data, breadcrumbs) {

        }
    };
    var setBreadCrumb = function(crumbText, crumbLink) {
//        app.data.breadCrumbs = app.data.breadCrumbs || {};
//        app.data.breadCrumbs.golf = app.data.breadCrumbs.golf || [];
//        var spliceCrumbsAt = -1,
//                existingCrumb = $.grep(app.data.breadCrumbs.golf, function(crumb, index) {
//            if (crumb.name == crumbText) {
//                spliceCrumbsAt = index;
//                return true;
//            }
//            return false;
//        }),
//                currentCrumb = {name: crumbText, url: crumbLink};
//
//        app.data.breadCrumbs.golf = existingCrumb.length ?
//                $.merge(app.data.breadCrumbs.golf.slice(0, spliceCrumbsAt), [currentCrumb]) :
//                $.merge(app.data.breadCrumbs.golf, [currentCrumb]);
//
//        for (var i = 0; i < app.data.breadCrumbs.golf.length; i++) {
//            app.data.breadCrumbs.golf[i].last = i == (app.data.breadCrumbs.golf.length - 1);
//        }
    };

    clubView.event.listen('indexAction', clubView, function(e, params) {
        var service = {name: app.localization.club.accounts};
        $('#main').html(contentTpl({
            Localization: app.localization,
            services: app.data.serviceTypes,
            bannerMessage: '',
            siteName: app.localization.siteName,
            backLink: Customization.serverURL,
            service: service
        }));

        $('#content').html(clubAccountList({
            Localization: app.localization,
            clubAccounts: params.Account
        }));

        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs': [
                {name: app.localization.club.myAccounts, last: 1}
            ]
        }));

        commonViewHelper.updateNavBar(service, app.language, !!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance, {})]);
        commonViewHelper.showMessages();
    });

    clubView.event.listen('accountAction', clubView, function(e, params) {
        var service = {name: app.localization.club.accounts};
        $('#main').html(contentTpl({
            Localization: app.localization,
            services: app.data.serviceTypes,
            bannerMessage: '',
            siteName: app.localization.siteName,
            backLink: Customization.serverURL,
            service: service
        }));

        var memberships = [];

        //preparing account data
        for (var key in $.wrapArray(params.accountResponse.Memberships.Membership)) {
            if ($.wrapArray(params.accountResponse.Memberships.Membership)[key].Status !== "EXPIRED") {
                memberships.push($.wrapArray(params.accountResponse.Memberships.Membership)[key]);
            }
        }

        //preparing billing data
        params.clubBillingsResponse.BillingPeriod = $.wrapArray(params.clubBillingsResponse.BillingPeriod)
        if ( params.clubStatementsResponse.Account[0] && params.clubStatementsResponse.Account[0].BillingPeriods && params.clubStatementsResponse.Account[0].BillingPeriods.BillingPeriod ) {
            params.clubBillingsResponse.BillingPeriod.push(params.clubStatementsResponse.Account[0].BillingPeriods.BillingPeriod)
        }
        $.each(params.clubBillingsResponse.BillingPeriod, function() {
            this.PeriodStartDateYearMonth = Date.parse(this.PeriodStartDate.substr(0,10)).toString(app.localization.CultureInfo.formatPatterns.yearMonth);
            this.PeriodStartDateShortDate = Date.parse(this.PeriodStartDate.substr(0,10)).toString(app.localization.CultureInfo.formatPatterns.shortDate);
            this.BillDateYearMonth = Date.parse(this.BillDate.substr(0,10)).toString(app.localization.CultureInfo.formatPatterns.yearMonth);
            this.BillDateShortDate = Date.parse(this.BillDate.substr(0,10)).toString(app.localization.CultureInfo.formatPatterns.shortDate);
        });

        var viewData = {
            Localization: app.localization,
            accountData: params.accountResponse,
            accountMemberships: memberships,
            billings: $.wrapArray(params.clubBillingsResponse.BillingPeriod),
            accountStatement: params.clubStatementsResponse.Account[0]
        };


        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs': [
                {name: app.localization.club.myAccounts, url: '#/membership'},
                {name: viewData.accountData.AccountClass + ' ' + app.localization.club.membership, last: 1}
            ]
        }))

        $('#content').html(clubAccount(viewData));

        $('.statement-table').click(function(e) {
            e.preventDefault();

            var billDate = $(this).data('bill-date');

            if ($(this).data('fetched')) {
                $('#collapse-' + billDate).collapse('toggle');
            } else {
                app.dispatcher.dispatch('membership', 'statement', [$(this).data('account-id'), billDate]);
            }
        });

        commonViewHelper.updateNavBar(service, app.language, !!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance, {})]);
        commonViewHelper.showMessages();
    });

    clubView.event.listen('statementAction', clubView, function(e, params) {
        if (params.error) {
            $('#statement-table-' + params.billDate).html(app.localization.club.fetchTransactionsFail);
        } else {
            var postingItems;

            if (params.statementsResponse.Account[0].FolioItems.FolioItem) {
                params.statementsResponse.Account[0].FolioItems.FolioItem = $.wrapArray(params.statementsResponse.Account[0].FolioItems.FolioItem);
                //preparing charges data
                $.each(params.statementsResponse.Account[0].FolioItems.FolioItem, function() {
                    this.DateMonthDay = Date.parse(this.Date.substr(0,10)).toString(app.localization.CultureInfo.formatPatterns.monthDay);

                    if (this.ChargeDetails && this.ChargeDetails.PostingItem) {
                        this.ChargeDetails.PostingItem = $.wrapArray(this.ChargeDetails.PostingItem);

                        $.each(this.ChargeDetails.PostingItem, function() {
                            this.Item.DateMonthDay = this.Item.Date&&Date.parse(this.Item.Date.substr(0,10)).toString(app.localization.CultureInfo.formatPatterns.monthDay)||"";
                        });
                    }

                });
            }

            if (params.statementsResponse.Account[0].FolioPayments.FolioPayment) {
                params.statementsResponse.Account[0].FolioPayments.FolioPayment = $.wrapArray(params.statementsResponse.Account[0].FolioPayments.FolioPayment);
                //preparing payment data
                $.each(params.statementsResponse.Account[0].FolioPayments.FolioPayment, function() {
                    this.DateMonthDay = Date.parse(this.Date.substr(0,10)).toString(app.localization.CultureInfo.formatPatterns.monthDay);
                });
            }

            var viewData = {
                Localization: app.localization,
                charges: params.statementsResponse.Account[0].FolioItems.FolioItem,
                minimums: params.statementsResponse.Account[0].Minimums.Minimum,
                payments: params.statementsResponse.Account[0].FolioPayments.FolioPayment
            };

            $('#statement-table-' + params.billDate).html(clubStatementTable(viewData));




        }

        $('.transaction-details').on('show hide', function(e) {
            if (!$(this).is(e.target)) {
                return;
            }
            if ($(this).parents('.statement-body').data('collapse')) {
                $(this).parents('.statement-body').collapse('reset');
            }
            $('#icon-' + $(this).data('folio-id')).toggleClass('icon-chevron-right icon-chevron-down', 200);
        });

        $('#toggle-' + params.billDate).data('fetched', true);
        $('#collapse-' + params.billDate).collapse();
    });

    return window.app.views.clubView = clubView;
});
