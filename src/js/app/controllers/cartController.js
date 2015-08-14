/*
 * controllers/cartController.js
 * Cart Controller
 */

define([
    'app/ControllerClass',
    'app/models/systemModel',
    'app/views/cartView',
    'underscore'
], function( ControllerClass, CartModel, CartView, _) {
    return window.app.controllers.cartController = $.extend({}, ControllerClass, {
        app:app,
        module:'cart',

        actions:{
            'show':['cartShow'],
            'history':['bookingHistory'],
            'clear':['cartClear'],
            'cancel':['removeItem'],
            'serviceItem':['cartItemSelected'],
            'serviceStaffList':['cartServiceStaffListRequested'],
            'class':['cartClassSelected'],
            'debuganalytics':['debuganalytics'],
            'checkout':['checkout'],
            'ccPayment':['cartCCFormShow'],
            'ccPayResume':['continueCC'],
            'ccPaySubmit':['cartCCFormDo'],
            'cartCheckout':['cartCheckOut'],
            'ppPayment':['cartPPInit'],
            'ppReturn':['cartPPFinalize'],
            'ypPayment':['cartYPInit'],
            'ypSubmit':['cartYPSubmit'],
            'ypReturn':['cartYPFinalize'],
            'i4gPayment':['cartI4GInit'],
            'i4gReturn':['cartI4GFinalize'],
            'setOverride':['setPMSRestrictionOverride'],
            'refundGC':['refundGC'],
            'redeemGC':['redeemGC'],
            'redeemGCApply':['redeemGCApply']

        },
        init:function () {
            console.log('initializing cart controller');
            app.data.messages = app.data.messages || [];
            this.initialized = true;
        },

        cartShow:function () {
            $.when(
                app.models.systemModel.getData('folioBookings', {}),
                app.models.systemModel.getData('folioBalance', {}),
                app.customization.features.pmsBooking && app.models.roomsModel.getData('pmsVenues', {})
            )
                .done(function (r_fb,r_fbal,r_pv) {
                    var deferreds = [app.models.systemModel.validatePMSBeforeSpa()];
                    if (r_fb.WebFolioItem) {
                        $.each(r_fb.WebFolioItem, function(i,webFolioItem) {
                            if (webFolioItem.Category=="Hotel") {
                                r_fb.WebFolioItem[i].pmsVenue = _.find(r_pv.Venue, function(x){
                                    return x.VenueName == webFolioItem.Location
                                });
                                var semaphore_ss = $.Deferred();
                                deferreds.push(semaphore_ss);
                                app.models.systemModel.getData('specialServices', {
                                    PMSFolioId : webFolioItem.FolioId
                                }).done(function(r_ss){
                                    r_ss.PMSSpecialService
                                        && (
                                            r_fb.WebFolioItem[i].specialServicesAvailable = r_ss.PMSSpecialService
                                            )
                                    semaphore_ss.resolve();
                                }).fail(function(){
                                    semaphore_ss.resolve();
                                });
                                var semaphore_pfss = $.Deferred();
                                deferreds.push(semaphore_pfss);
                                app.models.systemModel.getData('folioSpecialServices', {
                                    PMSFolioId : webFolioItem.FolioId
                                }).done(function(r_pfss){
                                    r_pfss.PMSBookingDetails
                                        && r_pfss.PMSBookingDetails
                                        && r_pfss.PMSBookingDetails.PMSFolioSpecialService
                                        && (
                                            r_fb.WebFolioItem[i].specialServices = (
                                                $.isArray(r_pfss.PMSBookingDetails.PMSFolioSpecialService )
                                                    ? r_pfss.PMSBookingDetails.PMSFolioSpecialService
                                                    : [r_pfss.PMSBookingDetails.PMSFolioSpecialService ]
                                                )
                                            );
                                    semaphore_pfss.resolve();
                                }).fail(function(){
                                    semaphore_pfss.resolve();
                                })

                            }

                        });
/*
Amount: "6.66"
CardholderName: "GC Balance: 30.34"
GiftCertId: "10303"
ResponseCode: "A"
WebFolioId: "20575"
WebFolioPaymentId: "3315"


GCBalance: "9.34"
GCRedeemedAmount: "21.00"
GiftCertId: "10303"

*/
                        if (app.data.redeemedGCs && app.data.redeemedGCs[app.data.WebFolioId]) {
                            var semaphore_pymts = $.Deferred();
                            deferreds.push(semaphore_pymts);
                            app.data.redeemedGCs[app.data.WebFolioId] = _(app.data.redeemedGCs[app.data.WebFolioId]).filter( function(value) {
                              return !!value
                            })
                            app.models.systemModel.getData('webFolioPayments', {}).done(function(r_wfp){
                                // app.data.redeemedGCs[app.data.WebFolioId] = [];
                                r_wfp.WebFolioPayments
                                    && r_wfp.WebFolioPayments.WebFolioPayment
                                    && _($.wrapArray(r_wfp.WebFolioPayments.WebFolioPayment)).each( function( value, key, list ) {
                                        if (value.GiftCertId) {
                                            var gcData = _(app.data.redeemedGCs[app.data.WebFolioId]).find( function(gc) {
                                                  return value && gc && (value.GiftCertId == gc.GiftCertId)
                                                });
                                            gcData
                                                && $.extend( gcData, value )
                                                || app.data.redeemedGCs[app.data.WebFolioId].push( $.extend(
                                                    {
                                                        GCRedeemedAmount:  value.Amount,
                                                        GCBalance: $.type(value.CardholderName)=='string' ? value.CardholderName.split(/: /)[1] : ''
                                                    }, value ) );
                                            // app.data.redeemedGCs[value.WebFolioId].push(value)
                                        }
                                    })
                                semaphore_pymts.resolve();
                            }).fail(function(){
                                semaphore_pymts.resolve();
                            })
                        }
                    }
                    $.when.apply(this,deferreds).always(function(r_pbs){
                        if (r_pbs) {
                            app.data.messages.push({ type:'alert', 'class':'alert-info', actions:[],
                                title:app.localization.spaBooking.pmsbeforespa.notice,
                                message:_.reduce(app.data.spaMissing,function(m,x){
                                    return m
                                        + app.localization.spaBooking.pmsbeforespa.needReservation + " " + x.property + " "
                                        + app.localization.spaBooking.pmsbeforespa.on + " "
                                        + Date.parse(x.date).toString(app.localization.CultureInfo.formatPatterns.longDate) + ". "
                                }, "")
                            });
                            if ((app.data.userLoggedIn&&app.data.spaPropertyIdsInCart) || app.data.pmsBookingFuture) {
                                app.data.messages.push({ type:'alert', 'class':'alert-notice', actions:[],
                                                title: app.localization.spaBooking.pmsbeforespa.acknowledgeTitle,
                                                message: app.localization.spaBooking.pmsbeforespa.acknowledgeIntro,
                                                footer: app.localization.spaBooking.pmsbeforespa.acknowledgeIntroFooter,
                                                actions: [{ text : app.localization.spaBooking.pmsbeforespa.acknowledgeText,
                                                            loading : app.localization.spaBooking.pmsbeforespa.acknowledgeButton,
                                                            label : app.localization.spaBooking.pmsbeforespa.acknowledgeButton,
                                                            url : "#/summary/setOverride" }]
                                            });
                            }
                        } else if (app.data.overridePMSRestriction) {
                            app.data.messages.push({ type:'alert', 'class':'alert-info', actions:[],
                                title:app.localization.spaBooking.pmsbeforespa.noticeOverridden,
                                message:''
                            });
                        }
                        app.views.cartView.event.fire('showCartContents', [$.extend(true,{},r_fb),arguments]);
                    })



                }).fail(function (r_sl) {
                    alert('Unable to retrieve booking summary.');
                    app.dispatcher.redirect('');
                    // window.location.reload(false);
                });
        },

        bookingHistory:function () {
            $.when(
                app.models.systemModel.validatePMSBeforeSpa()
            )
                .done(function () {
                    app.views.cartView.event.fire('showBookingHistory', []);
                });
        },

        redeemGC:function () {
            if (!app.data.userLoggedIn) {
                app.dispatcher.redirect('profile','login',['next','summary','redeemGC']);
            } else {
                app.views.cartView.event.fire('showRedeemGCForm', []);
            }
        },

        redeemGCApply:function (gcNumber, gcRefNumber, gcType) {
            if (!app.data.userLoggedIn) {
                app.dispatcher.redirect('profile','login',['next','summary','redeemGC']);
            } else {
                // TODO add sanity check for input values here
                if (!gcNumber || !_.contains(['CARD','CERT'],gcType)) {
                    app.dispatcher.redirect('summary', 'redeemGC');
                    return
                }
                $.when(app.models.systemModel.getData('redeemGC', {
                    GCNumber: gcNumber,
                    GCType: gcType,
                    GCRefNumber: gcRefNumber
                }))
                    .done(function (r_rgc) {
                        // semi-persistent storage
                        r_rgc.rawData = undefined;
                        app.data.redeemedGCs = app.data.redeemedGCs || {};
                        app.data.redeemedGCs[app.data.WebFolioId] = app.data.redeemedGCs[app.data.WebFolioId] || [];
                        app.data.redeemedGCs[app.data.WebFolioId].push(r_rgc);
                        app.datal('redeemedGCs',app.data.redeemedGCs);
                        app.data.messages.push({ type:'alert', 'class':'alert-success', actions:[],
                                    title:app.localization.paymentProcessing.gcRedeemedSuccess,
                                    message:''
                                });
                        app.dispatcher.redirect('summary');
                    })
                    .fail(function (r_rgc) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.paymentProcessing.gcRedeemedFailure,
                                    message:r_rgc.Result.Text
                                });
                        app.dispatcher.redirect('summary', 'redeemGC');
                    });

            }
        },

        refundGC:function (gcNumber,skipNavigation) {
            if (!app.data.userLoggedIn) {
                app.dispatcher.redirect('profile','login',['next','summary']);
            } else {
                // TODO add sanity check for input values here
                if (!gcNumber) {
                    app.dispatcher.redirect('summary', '');
                    return
                }
                return $.when(app.models.systemModel.getData('refundGC', {
                    GiftCertId: gcNumber
                }))
                    .done(function (r_rgc) {
                        // semi-persistent storage
                        r_rgc.rawData = undefined;
                        app.data.redeemedGCs = app.data.redeemedGCs || {};
                        app.data.redeemedGCs[app.data.WebFolioId] = app.data.redeemedGCs[app.data.WebFolioId] || [];
                        _(app.data.redeemedGCs[app.data.WebFolioId]).each( function( value, key ) {
                          if (value.GiftCertId == gcNumber) {
                            delete app.data.redeemedGCs[app.data.WebFolioId][key];
                          }
                        })
                        if (app.data.redeemedGCs[app.data.WebFolioId].length==0) {
                            app.data.redeemedGCs[app.data.WebFolioId] = null;
                        }
                        app.datal('redeemedGCs',app.data.redeemedGCs);
                        !skipNavigation && app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.paymentProcessing.gcRefundedSuccess,
                                message:''
                            });
                        !skipNavigation && app.dispatcher.redirect('summary');
                    })
                    .fail(function (r_rgc) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.paymentProcessing.gcRefundedFailure,
                                    message:r_rgc.Result.Text
                                });
                        !skipNavigation && app.dispatcher.redirect('summary');
                    });

            }
        },

        cartCCFormShow:function () {
            if (!app.data.userLoggedIn) {
                app.dispatcher.redirect('profile','login',['next','summary','ccPayment']);
            } else {

                $.when(app.models.systemModel.getData('folioBalance', {}))
                    .done(function (r_fb) {
                        app.views.cartView.event.fire('showCCPaymentForm', [r_fb]);
                    })
                    .fail(function (r_fb) {
                        alert('Unable to retrieve cart balance.');
                        app.dispatcher.redirect('');
                        window.location.reload(false);
                    });
            }
        },

        cotinueCC:function () {

            if (app.data.nextLogin) {
                this.cartCCFormShow (app.data.nextLogin.ccnum, app.data.nextLogin.cctype, app.data.nextLogin.ccexmon, app.data.nextLogin.ccexyear, app.data.nextLogin.cccvv, app.data.nextLogin.ccfname, app.data.nextLogin.cclname, app.data.nextLogin.ccaddress1, app.data.nextLogin.ccaddress2, app.data.nextLogin.cccity, app.data.nextLogin.ccstate, app.data.nextLogin.cczip, app.data.nextLogin.cccountry)
                app.data.nextLogin = {}
            } else {
                app.dispatcher.redirect('summary','',[]);
            }
        },

        cartCCFormDo:function (ccnum, cctype, ccexmon, ccexyear, cccvv, ccfname, cclname, ccaddress1, ccaddress2, cccity, ccstate, cczip, cccountry) {
            var cardholder = ccfname + ' ' + cclname,
                expiary = ccexmon + ccexyear.substr(2);
            if (!app.data.CustomerId || !app.data.userLoggedIn) {
                app.data.nextLogin = { ccnum:ccnum, cctype:cctype, ccexmon:ccexmon, ccexyear:ccexyear, cccvv:cccvv, ccfname:ccfname, cclname:cclname, ccaddress1:ccaddress1, ccaddress2:ccaddress2, cccity:cccity, ccstate:ccstate, cczip:cczip, cccountry:cccountry };
                app.dispatcher.redirect('profile','login',['next','ccPayResume']);
            } else {
                app.data.nextLogin = {};
                var checkoutDfd = $.Deferred();
                app.controllers.cartController.prepBeforeDoCheckout(checkoutDfd.promise()).always(function(prepSuccess){
                    $.when(app.models.systemModel.getData('processCCPayment', {
                            CardType:cctype,
                            CardHolder:cardholder,
                            ExpiryDate:expiary,
                            CVV2:cccvv,
                            PostalCode:cczip,
                            CardNumber:ccnum,
                            Address:ccaddress1,
                            Address2:ccaddress2,
                            City:cccity,
                            CustomerId: app.data.CustomerId,
                            Country:cccountry,
                            StateProv:ccstate,
                            FName:ccfname,
                            LName:cclname}))
                        .done(function (r_fb) {
                            ccnum = cctype = ccexmon = ccexyear = cccvv = undefined;
                            var newdata = [];
                            app.data.receipt = r_fb.Receipt ? r_fb.Receipt : false;
                            for (var key in app.models.systemModel.dataModel.processCCPayment.data) {
                                if (app.models.systemModel.dataModel.processCCPayment.data.hasOwnProperty(key)) {
                                    newdata.push(app.models.systemModel.dataModel.processCCPayment.data[key]);
                                    app.models.systemModel.dataModel.processCCPayment.data[key] = undefined;
                                }
                            }
                            app.models.systemModel.dataModel.processCCPayment.data = newdata;
                            newdata = undefined;
                            console.log('payment success',app.models.systemModel.dataModel.processCCPayment.data);
                            //r.Result.ErrorId
                            if (prepSuccess) {
                                checkoutDfd.resolve();
                                app.dispatcher.dispatch('summary','cartCheckout',["1"])
                                console.log('pay success',r_fb);
                            }
                        })
                        .fail(function (r_fb) {
                            var message = r_fb.Receipt ? app.localization.paymentProcessing.receiptHeader + r_fb.Receipt + app.localization.paymentProcessing.receiptFooter
                                                        : r_fb.Result.Text
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.paymentProcessing.err.paymentFailed,
                                message: message
                            });
                            app.views.cartView.event.fire('updateMessages', [r_fb]);
                        });
                });
            }
        },

        debuganalytics: function(){
            $.when(
                !app.models.systemModel.dataModel.folioBookings.data
                    ? app.models.systemModel.getData('folioBookings', {})
                    : app.models.systemModel.dataModel.folioBookings.data[
                        app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBookings,{})
                      ],
                !app.models.systemModel.dataModel.folioBalance.data
                    ? app.models.systemModel.getData('folioBalance', {})
                    : app.models.systemModel.dataModel.folioBalance.data[
                        app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})
                      ],
                app.models.userModel.getData('fetchCustomerProfile',{CustomerId: app.data.CustomerId, CustomerGUID: app.data.CustomerGUID})

            ).done(function(r_fb,r_bal,customer){
                app.views.cartView.event.fire('showAnalytics', [r_fb, r_bal, customer]);
            })
        },

        prepBeforeDoCheckout: function(doCheckoutPromise) {
            var dfd = $.Deferred();
            app.models.systemModel.validatePMSBeforeSpa().done(function(r_pbs){
                // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('validatePMSBeforeSpa.done: '+JSON.stringify(r_pbs)+')')+"]]>"});
                if (r_pbs) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.spaBooking.pmsbeforespa.errorMotice,
                                    message:''
                                });
                    app.dispatcher.replace('summary','',[]);
                    dfd.reject(false);
                    return;
                }

                if (!app.data.CustomerId || !app.data.userLoggedIn) {
                    app.dispatcher.redirect('profile','login',['next','summary','checkout']);
                    dfd.reject(false);
                // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent("redirect('profile','login',['next','summary','checkout']);")+"]]>"});
                } else {
                    if (app.customization.googleAnalytics) {
                        $.when(
                            !app.models.systemModel.dataModel.folioBookings.data
                                ? app.models.systemModel.getData('folioBookings', {})
                                : app.models.systemModel.dataModel.folioBookings.data[
                                    app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBookings,{})
                                  ],
                            !app.models.systemModel.dataModel.folioBalance.data
                                ? app.models.systemModel.getData('folioBalance', {})
                                : app.models.systemModel.dataModel.folioBalance.data[
                                    app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})
                                  ],
                          app.models.userModel.getData('fetchCustomerProfile',{CustomerId: app.data.CustomerId, CustomerGUID: app.data.CustomerGUID})

                        ).done(function(r_fb,r_bal,customer){
                            dfd.resolve(true);
                            app.dispatcher.replace('summary','checkoutComplete',[])
                            doCheckoutPromise.then(function(){
                                app.views.cartView.event.fire('showAnalytics', [r_fb, r_bal, customer]);
                            })
                        }).fail(function(){
                            dfd.resolve(true); // yes resolve because the calling party shouldn't abort its payment completion just because analytics failed
                            app.dispatcher.replace('summary','checkoutComplete',[])
                        })
                    } else {
                        dfd.resolve(true);
                    }
                }
            })
            .fail(function(){
                dfd.resolve(true);
            });
            return dfd.promise();
        },

        cartCheckOut: function(nostop) {
            // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('called cartCheckout('+JSON.stringify(nostop)+')')+"]]>"});

            // app.models.systemModel.validatePMSBeforeSpa().done(function(r_pbs){
            //     // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('validatePMSBeforeSpa.done: '+JSON.stringify(r_pbs)+')')+"]]>"});
            //     if (r_pbs) {
            //         app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
            //                         title:app.localization.spaBooking.pmsbeforespa.errorMotice,
            //                         message:''
            //                     });
            //         app.dispatcher.replace('summary','',[]);
            //         return;
            //     }

            //     if (!app.data.CustomerId || !app.data.userLoggedIn) {
            //         app.dispatcher.redirect('profile','login',['next','summary','checkout']);
            //     // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent("redirect('profile','login',['next','summary','checkout']);")+"]]>"});
            //     } else {
            //         app.dispatcher.replace('summary','checkoutComplete',[])
            //         if (app.customization.googleAnalytics) {
            //             $.when(
            //                 !app.models.systemModel.dataModel.folioBookings.data
            //                     ? app.models.systemModel.getData('folioBookings', {})
            //                     : app.models.systemModel.dataModel.folioBookings.data[
            //                         app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBookings,{})
            //                       ],
            //                 !app.models.systemModel.dataModel.folioBalance.data
            //                     ? app.models.systemModel.getData('folioBalance', {})
            //                     : app.models.systemModel.dataModel.folioBalance.data[
            //                         app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})
            //                       ],
            //               app.models.userModel.getData('fetchCustomerProfile',{CustomerId: app.data.CustomerId, CustomerGUID: app.data.CustomerGUID})

            //             ).done(function(r_fb,r_bal,customer){
            //                 app.views.cartView.event.fire('showAnalytics', [r_fb, r_bal, customer]);
            //             })
            //         }
                    $.when(app.models.systemModel.getData('checkoutFolio',{}))
                        .done( function(r_cf){
                            // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('checkoutFolio.done: '+JSON.stringify(r_cf)+')')+"]]>"});

                            $.when(app.models.systemModel.getData('emailWebFolioReceipt',{}))
                                .done( function(r_ewf){
                                    // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('emailWebFolioReceipt.done: '+JSON.stringify(r_ewf)+')')+"]]>"});
                                    if (app.customization.exactTarget.viewReceipt === true) {
                                        $.when(app.models.systemModel.getData('getWebFolioReceipt',{}))
                                            .done(function (r_gwf){
                                                // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('getWebFolioReceipt.done: '+JSON.stringify(r_gwf)+')')+"]]>"});
                                                // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('fire:showCCPaymentResult')+"]]>"});
                                                app.views.cartView.event.fire('showCCPaymentResult', [r_gwf, true]);
                                            })
                                            .fail(function (r_gwf) {
                                                // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('getWebFolioReceipt.fail: '+JSON.stringify(r_gwf)+')')+"]]>"});
                                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                                    title:app.localization.paymentProcessing.err.successButNoEmail,
                                                    message:r_gwf.Result.Text
                                                });
                                                // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('fire:showCCPaymentResult')+"]]>"});
                                                app.views.cartView.event.fire('showCCPaymentResult', [r_gwf, true]);
                                            });
                                    } else {
                                        // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('fire:showCCPaymentResult')+"]]>"});
                                        app.views.cartView.event.fire('showCCPaymentResult', [r_ewf]);
                                    }
                                    app.models.systemModel.monitorSystemState(1);
                                })
                                .fail(function (r_fb) {
                                    // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('emailWebFolioReceipt.done: '+JSON.stringify(r_fb)+')')+"]]>"});
                                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                        title:app.localization.paymentProcessing.err.successButNoEmail,
                                        message:r_fb.Result.Text
                                    });
                                    app.views.cartView.event.fire('showCCPaymentResult', [r_fb]);
                                });
                        })
                        .fail(function (r_fb) {
                            // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('checkoutFolio.fail: '+JSON.stringify(r_fb)+')')+"]]>"});
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.paymentProcessing.err.successButNoCheckoutFolio,
                                message:r_fb.Result.Text
                            });
                            app.views.cartView.event.fire('updateMessages', [r_fb]);
                        });
            //     }
            // });
        },

        cartClear:function (force) {
            var self=this,
                deferreds = [];
            $.when(app.models.systemModel.getData('folioBookings', {}))
                .done(function (r_fb) {
                    app.data.redeemedGCs = app.data.redeemedGCs || {};
                    app.data.redeemedGCs[app.data.WebFolioId] = app.data.redeemedGCs[app.data.WebFolioId] || [];
                    _.each(app.data.redeemedGCs[app.data.WebFolioId],function(v,k,l){
                        if (v.GiftCertId) {
                            var semaphore_rgc = $.Deferred();
                            deferreds.push(semaphore_rgc);
                            app.controllers.cartController.refundGC(v.GiftCertId,true)
                                .always(function(){
                                    semaphore_rgc.resolve();
                                });
                        }
                    })

                    _.each(r_fb.WebFolioItem,function(v,k,l){
                        var semaphore_ri = $.Deferred();
                        deferreds.push(semaphore_ri);

                        self.removeItem(v.Category, v.FolioId, v.FolioItemId, true)
                            .always(function(){
                                semaphore_ri.resolve();
                            });
                    })

                    deferreds.push(app.models.systemModel.getData('folioBalance', {}))

                    $.when.apply(this,deferreds).always(function(){
                            console.log('all cleared');
                            app.dispatcher.redirect('summary');
                        })
                })
                .fail(function (r_sl) {
                    makeNewSession()
                });



            function makeNewSession() {
                if(app.data.alreadyCleared) {
                    force=true;
                }
                app.models.systemModel.getData('createSession', {})
                    .done(function (r_cs) {
                        $.cookie('sessionid', r_cs.SessionId, {expires :Date.now().add(+app.customization.defaultSessionTimeout).minutes()} );
                        app.data.SessionId = r_cs.SessionId;
                        app.datac('userLoggedIn', false);
                        app.datac('WebFolioId', r_cs.WebFolioId);
                        app.datac('DefaultCustomerId', r_cs.DefaultCustomerId);
                        app.datac('CustomerId', undefined);
                        app.datac('CustomerEmail', undefined)
                        app.datac('overridePMSRestriction', undefined);
                        app.models.systemModel.setSelected('createSession', {}, r_cs.WebFolioId);
                        app.models.systemModel.getData('folioBalance', {}).always(function(){
                            app.data.alreadyCleared = true;
                            if (force) {
                                $.cookie('data', null);
                                app.dispatcher.redirect('');
                                window.location.reload(false);
                            } else {
                                app.dispatcher.redirect('summary');
                            }
                        })
                    })
                    .fail(function () {
                        app.data.userLoggedIn = false;
                        app.data.CustomerId = undefined;
                        app.data.CustomerEmail = undefined;
                        app.data.FirstName = undefined;
                        app.data.LastName = undefined;
                        app.data.WebFolioId = undefined;
                        app.data.SessionId = undefined;
                        $.cookie('sessionid', null);

                        app.dispatcher.redirect('');
                        window.location.reload(false);
                    })
            }
        },

        removeItem:function (type, folioId, folioItemId, automatic, doRefundAllGCs, doRefundPromoActivatingItem) {
            var deferreds = [];
            automatic = automatic || false;
            if (app.data.redeemedGCs && _.any(app.data.redeemedGCs[app.data.WebFolioId],function(x) { return x && x.GCRedeemedAmount > 0 })) {
                if (doRefundAllGCs == 1) {
                    _.each(app.data.redeemedGCs[app.data.WebFolioId],function(v,k,l){
                        if (v.GiftCertId) {
                            var semaphore_rgc = $.Deferred();
                            deferreds.push(semaphore_rgc);
                            app.controllers.cartController.refundGC(v.GiftCertId,true)
                                .always(function(){
                                    semaphore_rgc.resolve();
                                });
                        }
                    })
                } else {
                    removeButtonText = _.template(app.localization.paymentProcessing.gcRedeemAutoRemoveButton)({type:type,Localization:app.localization,Customization:app.customization});
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.paymentProcessing.gcRedeemAutoRemoveTitle,
                                    message:app.localization.paymentProcessing.gcRedeemAutoRemoveDescription,
                                    actions: [{ text : '',
                                                loading : removeButtonText,
                                                label : removeButtonText,
                                                url : "#/summary/cancel/" + type +"/"+ folioId +"/"+ folioItemId +"/"+ (automatic||'') +"/1"}]
                                });
                    // app.data.messages.push({ type:'alert', 'class':'alert-notice', actions:[],
                    //                 title: app.localization.spaBooking.pmsbeforespa.acknowledgeTitle,
                    //                 message: app.localization.spaBooking.pmsbeforespa.acknowledgeIntro,
                    //                 actions: [{ text : app.localization.spaBooking.pmsbeforespa.acknowledgeText,
                    //                             loading : app.localization.spaBooking.pmsbeforespa.acknowledgeButton,
                    //                             label : app.localization.spaBooking.pmsbeforespa.acknowledgeButton,
                    //                             url : "#/summary/checkout/override" }]
                    //             });
                    if (automatic) {
                        return $.Deferred(function(dfd){dfd.reject()});
                    } else {
                        app.dispatcher.replace('summary','',[]);
                        return;
                    }
                }

            }
            var dfd = $.Deferred()
            return $.when(
                    ( !app.models.systemModel.dataModel.folioBookings.data
                        ? app.models.systemModel.getData('folioBookings', {})
                        : app.models.systemModel.dataModel.folioBookings.data[
                            app.models.roomsModel.makeStandardName(app.models.systemModel.dataModel.folioBookings,{})
                          ]
                    )
                )
                .then(function(r_fb){
                    var skiAction = "cancelSkiLiftTicket",
                        folioItem = _.find(r_fb && r_fb.WebFolioItem || [], function(webFolioItem) {
                        return webFolioItem && webFolioItem.Category == type && webFolioItem.FolioId == folioId && webFolioItem.FolioItemId == folioItemId
                    })
                    if (folioItem && type=="Ski" && folioItem.ItemClass=="A") {
                        skiAction = "cancelSkiPass"
                    }
                    if (folioItem && type=="Ski" && folioItem.ActivatesPromo=="Y" && doRefundPromoActivatingItem != '1') {
                        removeButtonText = _.template(app.localization.bookingSummary.confirmRemoveSkiActivatesPromoTitle)({type:type,title:folioItem.Details,Localization:app.localization,Customization:app.customization});
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                        title:removeButtonText,
                                        message:app.localization.bookingSummary.confirmRemoveSkiActivatesPromo,
                                        actions: [{ text : '',
                                                    loading : app.localization.bookingSummary.confirmRemoveSkiActivatesPromoButton,
                                                    label : app.localization.bookingSummary.confirmRemoveSkiActivatesPromoButton,
                                                    url : "#/summary/cancel/" + type +"/"+ folioId +"/"+ folioItemId +"/"+ (automatic||'') +"/" + doRefundAllGCs + '/1' }]
                                    });
                        // app.data.messages.push({ type:'alert', 'class':'alert-notice', actions:[],
                        //                 title: app.localization.spaBooking.pmsbeforespa.acknowledgeTitle,
                        //                 message: app.localization.spaBooking.pmsbeforespa.acknowledgeIntro,
                        //                 actions: [{ text : app.localization.spaBooking.pmsbeforespa.acknowledgeText,
                        //                             loading : app.localization.spaBooking.pmsbeforespa.acknowledgeButton,
                        //                             label : app.localization.spaBooking.pmsbeforespa.acknowledgeButton,
                        //                             url : "#/summary/checkout/override" }]
                        //             });
                        if (automatic) {
                            return $.Deferred(function(dfd){dfd.reject()});
                        } else {
                            app.dispatcher.replace('summary','',[]);
                            return;
                        }
                    }
                    deferreds.push(
                                (type == "Hotel") ? app.models.systemModel.getData('cancelPMSBooking', {PMSFolioId:folioId}) :
                                (type == "Spa") ? app.models.systemModel.getData('cancelSpaService', {SpaFolioItemId:folioItemId, SpaFolioId:folioId}) :
                                (type == "Ski") ? app.models.systemModel.getData(skiAction, {SkiFolioItemId:folioItemId, SkiFolioId:folioId}) :
                                (type == "Golf") ? app.models.systemModel.getData('cancelGolfBooking', {GolfFolioItemId:folioItemId}) :
                                (type == "Retail") ? app.models.systemModel.getData('cancelRetailItem', {RetFolioItemId:folioItemId, RetFolioId:folioId}) :
                                $.Deferred(function(dfd){dfd.reject()})
                    );
                    var when = $.when.apply(this,deferreds)
                    when.done(function (r_cs) {
                            app.models.systemModel.getData('folioBalance', {});
                            automatic || app.dispatcher.redirect('summary','show',[]);
                        })
                        .fail(function () {
                            alert(app.localization.bookingSummary.clearCartFail)
                            automatic || app.dispatcher.redirect('summary','show',[]);
                            automatic || window.location.reload(false);
                        });

                    if (automatic) {
                        return when
                    }
                })

        },

        cartPPInit: function () {
            app.models.systemModel.validatePMSBeforeSpa().done(function(r_pbs){
                if (r_pbs) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.spaBooking.pmsbeforespa.errorMotice,
                                    message:''
                                });
                    app.dispatcher.replace('summary','',[]);
                    return;
                }
                if (!app.customization.paypal.enabled) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.paymentProcessing.PPNotConfigured,
                                    message:''
                                });
                    app.dispatcher.replace('summary','show',[]);
                    return;
                }
                if (!app.data.userLoggedIn) {
                    app.dispatcher.replace('profile','login',['next','summary','ppPayment']);
                } else {

                    $.when(app.models.systemModel.getData('setupPPPayment', { CustomerId: app.data.CustomerId, Language: {'en-us':'US','fr-ca':'FR','es-sp':'ES'}[app.language] }))
                        .done(function (r_fb) {
                            if (!!r_fb.Token) {
                                app.views.cartView.event.fire('showPPProgressIndicator');
                                location.href = app.customization.paypal.url + r_fb.Token;
                            }
                        })
                        .fail(function (r_fb) {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                            title:app.localization.paymentProcessing.PPPreError,
                                            message:''
                                        });
                            app.dispatcher.replace('summary','show',[]);
                        });
                }
            });
        },

        cartPPFinalize: function (token, PayerID) {
            if (PayerID=="") {
                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.paymentProcessing.PPCanceled,
                                message:''
                            });
                app.dispatcher.replace('summary','show',[]);
                return;
            }
            app.views.cartView.event.fire('processingPPPayment');
            var checkoutDfd = $.Deferred();
            app.controllers.cartController.prepBeforeDoCheckout(checkoutDfd.promise()).always(function(prepSuccess){
                $.when(app.models.systemModel.getData('doPPPayment', {
                    CustomerId: app.data.CustomerId,
                    Token: token,
                    PayerID: PayerID
                }))
                    .done(function (r_fb) {
                        if (prepSuccess) {
                            checkoutDfd.resolve();
                            app.views.cartView.event.fire('showCCPaymentResult', [r_fb]);
                            app.views.cartView.event.fire('showPPProgressIndicator', [app.localization.paymentProcessing.PPPostRedirect]);
                            app.dispatcher.dispatch('summary','cartCheckout',["1"]);
                        }
                    })
                    .fail(function (r_fb) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                        title:app.localization.paymentProcessing.PPPostError,
                                        message:''
                                    });
                        app.dispatcher.replace('summary','show',[]);
                    });
            });
        },

        cartYPInit: function (mid, mtr,digest,currency,forwardURL,successURL,failURL) {
            if (!app.customization.yespay.enabled) {
                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.paymentProcessing.PPNotConfigured,
                                message:''
                            });
                app.dispatcher.replace('summary','show',[]);
                return;
            }
            if (!app.data.userLoggedIn) {
                app.dispatcher.replace('profile','login',['next','summary','ypPayment']);
            } else {
                app.models.systemModel.getData('folioBookings', {})
                    .done(function(r_fb){
                        app.views.cartView.event.fire('redirectYP', [mid,mtr,digest,currency,forwardURL,successURL,failURL,app.models.systemModel.getSelectedValue('folioBalance', 'FolioBalance', {WebFolioId:app.data.WebFolioId, SessionId:app.data.SessionId}),r_fb]);
                    })
            }

        },

        cartI4GInit: function (forwardURL) {
            if (!app.customization.i4go.enabled) {
                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.paymentProcessing.PPNotConfigured,
                                message:''
                            });
                app.dispatcher.replace('summary','show',[]);
                return;
            }
            if (!app.data.userLoggedIn) {
                app.dispatcher.replace('profile','login',['next','summary','i4gPayment']);
            } else {
                app.views.cartView.event.fire('redirectI4G', [forwardURL]);
            }

        },

        cartYPFinalize: function (PGTR,AUTHID,authCode,message,amount,result,digest,CVVResponse,AVSResponse,postcodeResponse,MTR, subscriptionRef) {
           if (PGTR=="cancel") {
               app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                               title:app.localization.paymentProcessing.PPCanceled,
                               message:''
                           });
               app.dispatcher.replace('summary','show',[]);
               // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('PGTR=="cancel"')+"]]>"});
               return;
           }
            app.views.cartView.event.fire('processingPPPayment');
            var params = {
                WebFolioId: app.data.WebFolioId,
                SessionId: app.data.SessionId,
                YPMTR: MTR,
                YPAUTHID: AUTHID,
                YPauthCode: authCode,
                YPmessage: message,
                YPamount: amount,
                YPresult: result,
                YPdigest: digest,
                YPCVVResponse: CVVResponse,
                YPAVSResponse: AVSResponse,
                YPpostcodeResponse: postcodeResponse,
                YPsubscriptionRef: subscriptionRef
            };
            if (PGTR) {
                params.YPPGTR = PGTR;
            }
            // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('params: '+JSON.stringify(params))+"]]>"});
            if (!_.any(app.localization.paymentMessages.yespay.successCodes, function(x){return x==result})) {
                var paymentMessage = _.find(app.localization.paymentMessages.yespay.reponseCodeMessages, function(x){
                    return _.any(x.applicableCodes, function(y){return y==result});
                }) || { message: app.localization.paymentMessages.yespay.defaultFailMessage };
                paymentMessage.message = _.template(paymentMessage.message)({params:params,Localization:app.localization,Customization:app.customization});
                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:paymentMessage.message,
                                    message:''
                                });
                app.dispatcher.replace('summary','show',[]);
                // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent(paymentMessage.message)+"]]>"});
                return;
            }
            var checkoutDfd = $.Deferred();
            app.controllers.cartController.prepBeforeDoCheckout(checkoutDfd.promise()).always(function(prepSuccess){
                $.when(app.models.systemModel.getData('doCheckout', params))
                    .done(function (r_fb) {
                        if (prepSuccess) {
                            checkoutDfd.resolve();
                            // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('doCheckout.done: ' + JSON.stringify(r_fb))+"]]>"});
                            app.views.cartView.event.fire('showCCPaymentResult', [r_fb]);
                            app.views.cartView.event.fire('showPPProgressIndicator', [app.localization.paymentProcessing.PPPostRedirect]);
                            app.dispatcher.dispatch('summary','cartCheckout',["1"]);
                        }
                    })
                    .fail(function (r_fb) {
                        // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent('doCheckout.fail :' + JSON.stringify(r_fb))+"]]>"});
                        if(r_fb.Result&&r_fb.Result.ErrorId) {
                            var paymentMessage = _.find(app.localization.paymentMessages.yespay.reponseCodeMessages, function(x){
                                return _.any(x.applicableCodes, function(y){return y==r_fb.Result.ErrorId});
                            }) || { message: app.localization.paymentMessages.yespay.defaultFailMessage };
                            params.YPresult = r_fb.Result.ErrorId;
                            paymentMessage.message = _.template(paymentMessage.message)({params:params,Localization:app.localization,Customization:app.customization});
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                                title:paymentMessage.message,
                                                message:''
                                            });
                        } else {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                                title:app.localization.paymentProcessing.PPPostError,
                                                message:''
                                            });
                        }
                        app.dispatcher.replace('summary','show',[]);
                        // app.models.systemModel.getData('debugfolio',{Debug: "<![CDATA["+encodeURIComponent(paymentMessage.message)+"]]>"});
                    });
            })
        },
        cartI4GFinalize: function (response, uniqueid, cardtype, expmonth, expyear, responsecode) {
            if (response!="SUCCESS") {
                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.paymentProcessing.PPPostError,
                                message:''
                            });
                app.dispatcher.replace('summary','show',[]);
                return;
            }
            app.views.cartView.event.fire('processingPPPayment');
            var checkoutDfd = $.Deferred();
            app.controllers.cartController.prepBeforeDoCheckout(checkoutDfd.promise()).always(function(prepSuccess){
                $.when(app.models.systemModel.getData('doCheckout', {
                    WebFolioId: app.data.WebFolioId,
                    SessionId: app.data.SessionId,
                    i4GoToken: uniqueid,
                    i4GoCardType: cardtype,
                    i4GoExpiryMonth: expmonth,
                    i4GoExpiryYear: expyear,
                    i4GoResponse: response,
                    i4GoResponseCode: responsecode
                }))
                    .done(function (r_fb) {
                        if (prepSuccess) {
                            checkoutDfd.resolve();
                            app.views.cartView.event.fire('showCCPaymentResult', [r_fb]);
                            app.views.cartView.event.fire('showPPProgressIndicator', [app.localization.paymentProcessing.PPPostRedirect]);
                            app.dispatcher.dispatch('summary','cartCheckout',["1"]);
                        }
                    })
                    .fail(function (r_fb) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                        title:app.localization.paymentProcessing.PPPostError,
                                        message:''
                                    });
                        app.dispatcher.replace('summary','show',[]);
                    });
            });
        },
        cartYPSubmit: function (ccfname, cclname, ccaddress1, ccaddress2, cccity, ccstate, cczip, cccountry) {
            app.views.cartView.event.fire('showYPProgressIndicator');
            $.when(app.models.systemModel.getData('setupYPPayment', {
                CustomerId: app.data.CustomerId,
                WebFolioId: app.data.WebFolioId
            }))
                    .done(function (r_fb) {
                        if (!!r_fb.RedirectURL) {
                            app.views.cartView.event.fire('redirectYP', [r_fb, ccfname, cclname, ccaddress1, ccaddress2, cccity, ccstate, cczip, cccountry]);
                        } else {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                            title:app.localization.paymentProcessing.PPPreError,
                                            message:'(1)'
                                        });
                            app.dispatcher.replace('summary','ypPayment',[]);
                        }
                    })
                    .fail(function (r_fb) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                        title:app.localization.paymentProcessing.PPPreError,
                                        message:'(2)'
                                    });
                        app.dispatcher.replace('summary','ypPayment',[]);
                    });

        },

        checkout: function (extra) {
            app.models.systemModel.validatePMSBeforeSpa().done(function(r_pbs){

                if (app.customization.payment.requireExplicitTermsAccept && !app.data.termsAccepted) {
                        app.views.cartView.event.fire('showTermsModal', []);
                    return;
                }
                if (!app.data.userLoggedIn) {
                    app.dispatcher.replace('profile','login',['next','summary','checkout',extra]);
                    return;
                }
                if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 1 || app.data.pmsPropertyIdsInCart.length > 1 ||
                        ( app.data.spaPropertyIdsInCart.length == 1 && app.data.pmsPropertyIdsInCart.length == 1 && app.data.spaPropertyIdsInCart[0] != app.data.pmsPropertyIdsInCart[0] )
                    )) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.general.err.multipleProperties,
                                    message:''
                                });
                    app.dispatcher.replace('summary','',[]);
                    return;
                }
                if (r_pbs && extra != "override" && !app.data.overridePMSRestriction) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.spaBooking.pmsbeforespa.errorMotice,
                                    message:''
                                });
                    // app.data.messages.push({ type:'alert', 'class':'alert-notice', actions:[],
                    //                 title: app.localization.spaBooking.pmsbeforespa.acknowledgeTitle,
                    //                 message: app.localization.spaBooking.pmsbeforespa.acknowledgeIntro,
                    //                 actions: [{ text : app.localization.spaBooking.pmsbeforespa.acknowledgeText,
                    //                             loading : app.localization.spaBooking.pmsbeforespa.acknowledgeButton,
                    //                             label : app.localization.spaBooking.pmsbeforespa.acknowledgeButton,
                    //                             url : "#/summary/checkout/override" }]
                    //             });
                    app.dispatcher.replace('summary','',[]);
                    return;
                }
                var balance = app.models.systemModel.getSelectedValue('folioBalance','FolioBalance',{WebFolioId:app.data.WebFolioId,SessionId:app.data.SessionId});


                if (
                        app.customization.skipPayment
                        ||
                        (
                            (balance == "0.00" || balance == "0")
                            && (
                                    app.customization.roomsBooking.forcePayment != true
                                    || (
                                        app.customization.payment.skipGuaranteeIfZeroBalanceAndGCUsed
                                        && app.data.redeemedGCs
                                        && app.data.redeemedGCs[app.data.WebFolioId]
                                        && app.data.redeemedGCs[app.data.WebFolioId].length
                                        )
                                )
                        )
                    ) {
                    var checkoutDfd = $.Deferred();
                    app.controllers.cartController.prepBeforeDoCheckout(checkoutDfd.promise()).always(function(prepSuccess){
                        if (prepSuccess) {
                            checkoutDfd.resolve();
                            app.dispatcher.dispatch('summary','cartCheckout',["1"])
                            console.log('pay skipped');
                        }
                    });
                } else {
                    $.when(app.models.systemModel.getData('setCheckout', {}))
                        .done(function (r_sc) {
                            $.cookie('sessionid', app.data.SessionId, {expires: Date.now().add(+app.customization.defaultSessionTimeout).minutes()});
                            if (r_sc.PaymentEngine=="YPAY") {
                                app.dispatcher.dispatch('summary','ypPayment',[r_sc.MID, r_sc.MTR, r_sc.Digest,r_sc.Currency,r_sc.ForwardURL,r_sc.SuccessURL,r_sc.FailURL]);
                            } else if (r_sc.PaymentEngine=="I4GO") {
                                app.dispatcher.dispatch('summary','i4gPayment',[r_sc.ForwardURL]);
                            } else if (r_sc.PaymentEngine=="S4" || r_sc.PaymentEngine== "SIMPLE" ) {
                                app.dispatcher.dispatch('summary','ccPayment',[/*no params*/]);
                            } else if (r_sc.PaymentEngine=="PP") {
                                app.dispatcher.dispatch('summary','ppPayment',[/*assume params are still in customization.js*/]);
                            } else {
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                            title:app.localization.paymentProcessing.PPPostError,
                                            message:''
                                        });
                                app.dispatcher.replace('summary','show',[]);
                            }
                        })
                        .fail(function (r_sc) {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                            title:app.localization.paymentProcessing.PPPostError,
                                            message:''
                                        });
                            app.dispatcher.replace('summary','show',[]);
                        });
                }
            });
        },
        setPMSRestrictionOverride: function() {
            app.datac('overridePMSRestriction', true);
            window.history.back();
        }



    })
});
