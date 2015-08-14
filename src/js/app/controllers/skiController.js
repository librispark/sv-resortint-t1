/*
 * controllers/skiController.js
 * Ski Controller
 */

define([
    'app/ControllerClass',
    'app/models/skiModel',
    'app/views/skiView'], function (ControllerClass, SkiModel, SkiView) {
    return window.app.controllers.skiController = $.extend({}, ControllerClass, {
        app:app,
        module:'ski',

        actions:{
            'show':['skiBookingSelected'],
            'liftTickets':['skiLiftTicketsSelected'],
            'purchase':['purchaseSkiItem','purchaseSkiLiftTicket'],
            'purchasePass':['purchaseSkiItem','purchaseSkiPass']
        },
        init:function () {
            console.log('initializing ski controller');
            app.data.messages = app.data.messages || [];
        },

        skiBookingSelected:function () {
            var self = this;
            $.when(
                app.models.skiModel.getData('skiLocations', {}),
                (app.customization.hideOtherPropertyIfItemsInCart && app.models.systemModel.validatePMSBeforeSpa())
            )
                .done(function (r_sl, r_pbs) {

                    if (!!r_sl.SkiLocation) {

                        var skiLocations = r_sl.SkiLocation;
                        if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.propertyIdsInCart.length > 0)) {
                            skiLocations = _.filter(skiLocations,function(x){
                                return _.any(app.data.propertyIdsInCart, function(y){ return y==x.PropertyId })
                            })
                            if (skiLocations.length==0) {
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                    title: app.localization.ski.err.noLocationsAtProperty,
                                    message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                                });
                                app.dispatcher.redirect('summary','',[]);
                                return;
                            }
                        }

                        if (skiLocations.length > 1) {
                            app.views.skiView.event.fire('requestSkiLocationSelection', [skiLocations]);
                        } else {
                            var skiLocationId = $.firstOrOnly(skiLocations).LocationId;
                            //app.models.skiModel.setSelected('skiLocations', {}, skiLocationId);
                            self.skiLiftTicketsSelected('Location'+skiLocationId);
                            // app.dispatcher.replace('ski','location',[skiLocationId]);
                        }
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.ski.err.noLocation/*,
                            message:"(" + r_ss.Result.Text + ")"*/
                        });
                        app.dispatcher.redirect('');
                    }
                })
                .fail(function (r_sl) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                        title:app.localization.ski.err.noLocation
                    });
                    app.dispatcher.redirect('');
                });
        },

        skiLiftTicketsSelected:function (showitem, date, selectedRecipient) {
            if (showitem && showitem.substr(0, 8) == "Location") {
                var showitemParts = showitem.split('|');
                app.models.skiModel.setSelected('skiLocations', {}, showitemParts[0].substr(8));
                showitem = showitemParts[1];
            }
            var self = this,
                location = undefined,
                loadProfileData = false,
                params = {};

            if (app.data.userLoggedIn) {
                loadProfileData = true;
                params = {
                        CustomerId: app.data.CustomerId,
                        CustomerGUID: app.data.CustomerGUID
                    },
                    dfd = $.Deferred();
                app.models.userModel.getData('fetchGroupMembers', params ).always(function(x){
                    dfd.resolve(x);
                })
            }


            app.models.skiModel.getData('skiLocations', {}).done(function(r_sl){
                location = app.models.skiModel.getSelectedItem('skiLocations', {});
                if (!location) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.ski.err.noLocation,
                        message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.redirect('ski','',[]);
                    return;
                }
                params.CustomerId= selectedRecipient || app.data.CustomerId || app.data.DefaultCustomerId;

                if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
                    date=Date.today().add(app.customization.skiBooking.allowBookingToday ? 0 : 1).days().toString('yyyy-MM-dd');
                }
                if(date) {
                    params.StartDate=date.substr(0,10)+'000000';
                }
                var profileParams = {
                        CustomerId: app.data.CustomerId,
                        CustomerGUID: app.data.CustomerGUID
                    }

                $.when(
                    $.promiseFilter( app.models.skiModel.getData('skiLiftTickets', params),
                        function(succeeded,arguments){
                            if (succeeded) return true;
                            if (arguments[0] && arguments[0].Result && arguments[0].Result.ErrorId) {
                                return (arguments[0].Result.ErrorId == '715')||(arguments[0].Result.ErrorId == '999')
                            } else {
                                return false;
                            }
                        }),
                    $.promiseFilter( app.models.skiModel.getData('skiPasses', params),
                        function(succeeded,arguments){
                            if (succeeded) return true;
                            if (arguments[0] && arguments[0].Result && arguments[0].Result.ErrorId) {
                                return arguments[0].Result.ErrorId == '999'
                            } else {
                                return false;
                            }
                        }),
                    (app.customization.hideOtherPropertyIfItemsInCart && app.models.systemModel.validatePMSBeforeSpa()),
                    (loadProfileData && app.models.userModel.getData('fetchCustomerProfile', profileParams )),
                    (loadProfileData && dfd.promise())
                )
                    .done(function (r_slt, r_sp, r_pbs, r_fcp, r_fgm) {
                        var skiLocations = r_sl.SkiLocation;
                        if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.propertyIdsInCart.length > 0)) {
                            skiLocations = _.filter(skiLocations,function(x){
                                return _.any(app.data.propertyIdsInCart, function(y){ return y==x.PropertyId })
                            })
                            if (skiLocations.length==0) {
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                    title:app.localization.ski.err.noLocationsAtProperty,
                                    message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                                });
                                app.dispatcher.redirect('summary','',[]);
                                return;
                            } else if (!_.any(skiLocations,function(x){return x.LocationId == location.LocationId})) {
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                    title:app.localization.ski.err.mismatchedProperty,
                                    message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                                });
                                app.dispatcher.redirect('summary','',[]);
                                return;
                            }
                        }
                        showitem = showitem || // $.firstOrOnly($.first(r_slt).value.value).SkiItemId;
                                   ( $.isArray(r_slt) && $.isArray($.first(r_slt).value) &&
                                        r_slt.length==1 && $.first(r_slt).value.length==1
                                        ? $.firstOrOnly($.first(r_slt).value.value).SkiItemId : "" );
                        var user = {},
                            group = [];
                        if (loadProfileData) {
                            user = r_fcp && r_fcp.Customer
                                    ? ($.isArray(r_fcp.Customer) ? r_fcp.Customer[0] : r_fcp.Customer)
                                    : {};
                            group = r_fgm && r_fgm.GroupMember
                                    ? ($.isArray(r_fgm.GroupMember) ? r_fgm.GroupMember : [r_fgm.GroupMember] )
                                    : []
                        }
                        if (
                            (r_slt.LiftTickets && r_slt.LiftTickets.LiftTicket)
                            ||(r_slt.PromoLiftTickets && r_slt.PromoLiftTickets.LiftTicket)
                            ||(r_sp.Passes && r_sp.Passes.Pass)
                            ||(r_sp.PromoPasses && r_sp.PromoPasses.Pass)
                        ) {
                            if (r_slt.LiftTickets && r_slt.LiftTickets.LiftTicket) {
                                r_slt.LiftTickets.LiftTicket = $.wrapArray(r_slt.LiftTickets.LiftTicket);
                            }
                            if (r_slt.PromoLiftTickets && r_slt.PromoLiftTickets.LiftTicket) {
                                r_slt.PromoLiftTickets.LiftTicket = $.wrapArray(r_slt.PromoLiftTickets.LiftTicket);
                            }
                            if (r_sp.Passes && r_sp.Passes.Pass) {
                                r_slt.Passes = {Pass : $.wrapArray(r_sp.Passes.Pass)};
                            }
                            if (r_sp.PromoPasses && r_sp.PromoPasses.Pass) {
                                r_slt.PromoPasses = {Pass : $.wrapArray(r_sp.PromoPasses.Pass)};
                            }
                            app.views.skiView.event.fire('requestSkiLiftTicketSelection', [ r_slt, showitem, location, date, selectedRecipient, user, group ]);
                        } else {
                            var message = app.localization.ski.err.noAvailableItems;
                            if (r_slt.Result && r_slt.Result.ErrorId == '715') {
                                var closeDates = /Location closed ([\d-]+) and will reopen ([\d-]+)/.exec(r_slt.Result.Text);
                                if (closeDates) {
                                    var closeBeginDate = Date.parseExact(closeDates[1], "yyyy-MM-ddHHmmss"),
                                        closeEndDate = Date.parseExact(closeDates[2], "yyyy-MM-ddHHmmss");
                                    message = _.template(app.localization.ski.err.locationClosed)({
                                        closeBeginDate: closeBeginDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                                        closeEndDate: closeEndDate.toString(app.localization.CultureInfo.formatPatterns.longDate)
                                    })
                                } else {
                                    message = app.localization.ski.err.locationClosedNoDate;
                                }
                            }

                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:message /*,
                                message:"(" + r_slt.Result.Text + ")"*/
                            });
                            app.views.skiView.event.fire('requestSkiLiftTicketSelection', [ r_slt, showitem, location, date, selectedRecipient, user, group ]);
                        }

                    })
                    .fail(function (r_slt) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.ski.err.noService /*,
                            message:"(" + r_slt.Result.Text + ")"*/
                        });
                        app.dispatcher.redirect('ski');
                    });
            })
        },


        purchaseSkiItem:function (itemtype, itemId, date, customerId) {
            if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
                app.dispatcher.replace('ski', 'liftTickets', [itemId])
                return;
            }
            date = date.substr(0,10);
            var params = {
                SkiItemId: itemId,
                StartDate: date + "000000",
                Qty: 1
            };
            if ( customerId || app.data.CustomerId ) {
                params.CustomerId =  customerId || app.data.CustomerId;
            }
            app.models.skiModel.getData(itemtype, params)
                .done(function (r_pslt) {
                    console.log('r_pslt', r_pslt)
                    app.data.messages.push({ type:'alert', 'class':'alert-success', actions:[],
                        title:app.localization.ski.successfullBookingMessage,
                        message:app.localization.ski.customerCustomTextFooter
                    });
                    //app.models.systemModel.getData('folioBalance', {}).always(function () {
                        app.dispatcher.replace('summary', 'show', []);
                    //});
                })
                .fail(function (r_pslt) {
                    var message = app.localization.ski.err.createBookingFailed;
                    if (r_pslt.Result && r_pslt.Result.ErrorId == '711') {
                        message  = app.localization.ski.err.createBookingFailedLimitExceeded;
                    }
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                        title:message,
                        message:'' // "(" + r_pslt.Result.Text + ")"
                    });
                    app.dispatcher.replace('ski', 'liftTickets', [itemId, date, customerId])
                })
        }

    })
});
