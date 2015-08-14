/*
 * controllers/initController.js
 * Splash Controller
 */

define( [
    'app/ControllerClass',
    'app/models/systemModel',
    'app/views/splashView'], function( ControllerClass, SystemModel, SplashView ){
    return window.app.controllers.initController = $.extend({}, ControllerClass, {
            app: app,
        module: 'init',

        loadServiceTypes: function ( roomsHref, spaHref, daysHref, skiHref ) {
            var serviceTypes = [];
        app.customization.features.pmsBooking && (roomsHref !== false ) && serviceTypes.push( {
            id : "roomsBooking",
            href : roomsHref || "roomsBooking",
            icon : "home",
            name : (!!app.customization.roomsBooking.dayGuestPromoCode&&!daysHref) ? app.localization.general.features.pmsOrDayName : app.localization.general.features.pmsName
        });
        !!app.customization.roomsBooking.dayGuestPromoCode && daysHref && serviceTypes.push( {
            id : "roomsBooking",
            href : daysHref || "roomsBooking",
            icon : "bell",
            name : app.localization.general.features.pmsDayName
        });
        app.customization.features.spaBooking && (spaHref !== false) && serviceTypes.push( {
            id : "spaBooking",
            href : spaHref || "spaBooking",
            icon : "leaf",
            name : app.localization.general.features.spaName
        });
        app.customization.features.golfBooking && serviceTypes.push( {
            id : "golfBooking",
            href : "golfBooking",
            icon : "flag",
            name : app.localization.general.features.golfName
        });
        app.customization.features.skiBooking && (skiHref !== false) && serviceTypes.push( {
            id : "ski",
            href : skiHref || "ski",
            icon : "tag",
            name : app.localization.general.features.skiName
        });
        app.customization.features.giftCertificates && serviceTypes.push( {
            id : "giftCertificates",
            href : "giftCertificates",
            icon : "gift",
            name : app.localization.general.features.giftCertificatesName
        });
        app.customization.features.membership && serviceTypes.push( {
            id : "membership",
            href : "membership",
            icon : "certificate",
            name : app.localization.general.features.clubName
        });
        app.data.serviceTypes=serviceTypes;

    },

        // required by the dispatcher: actions, init, performAction
            actions: {
                // no routable actions in this controller
            },
            init: function() {
                console.log('initializing init controller');
                var self=this;

                if(!this.InitializedDfd) {
                    this.InitializedDfd = $.Deferred();
                    this.InitializedPromise = this.InitializedDfd.promise();
                }
                this.loadServiceTypes();
                console.log('wrote service types');

        app.data.languageNames=[];
                app.data.languageMap={};
        for( langid in app.customization.availableLanguages ){
          if( app.customization.availableLanguages.hasOwnProperty(langid)) {
          console.log('adding language',app.customization.availableLanguages[langid]);
            app.data.languageNames.push( { id: app.customization.availableLanguages[langid], name: app.customization.multiLanguageLabel[app.customization.availableLanguages[langid]] } );
            app.data.languageMap[app.customization.availableLanguages[langid]] = app.customization.multiLanguageLabel[app.customization.availableLanguages[langid]];
          }
        }

                app.data.breadCrumbs = {};
                app.data.messages = app.data.messages || [];
                app.data.bookingHistoryCollapseHidden = app.customization.hideInitialGuestItineraryOnBookingSummary;

                app.customization.forceSessionId && (app.data.SessionId = app.customization.forceSessionId);

                $('#loadMessage').html(app.localization.general.contactingServer);
                app.models.systemModel.fetchSystemState()
                    .done(function(r_fss){
                        if ( !app.customization.features.giftCertificates && !app.customization.features.pmsBooking && !app.customization.features.spaBooking && !app.customization.features.golfBooking) {
                            finishInit();
                            return;
                        }
                        var defer = self.initGuestItinerary();
                        if(app.data.SessionId && (!!r_fss.WebFolioStatus && r_fss.WebFolioStatus == "ACTIVE") && +r_fss.WebFolioRemainingTimeoutMinutes > 0) {
                            $.when(
                                app.models.systemModel.getData('folioBalance', {SessionId:app.data.SessionId, WebFolioId:app.data.WebFolioId}),
                                defer
                            ).done(function(r_fb,d){
                                    app.models.systemModel.dataModel.createSession.data = app.models.systemModel.dataModel.createSession.data || {};
                                    app.models.systemModel.dataModel.createSession.data['WebFolioId/'] = app.models.systemModel.dataModel.createSession.data['WebFolioId/'] || {};
                                    app.models.systemModel.dataModel.createSession.data['WebFolioId/']['WebFolioId'] = app.data.WebFolioId;
                                    app.models.systemModel.dataModel.createSession.data['WebFolioId/']['SessionId'] = app.data.SessionId;
                                    app.models.systemModel.dataModel.createSession.data['WebFolioId/']['DefaultCustomerId'] = app.data.DefaultCustomerId;
                                    app.models.systemModel.setSelected('createSession',{},app.data.WebFolioId);
                                    if(app.data.CustomerId && app.data.CustomerId!=r_fss.WebFolioCustomerId && app.data.userLoggedIn) {
                                        app.models.systemModel.getData('updateSession', {CustomerId:app.data.CustomerId,CustomerGUID:app.data.CustomerGUID});
                                    }
                                    console.log('continuing previously active session');
                                    finishInit();
                                })
                                .fail(function(r_fb){
                                    $.when(
                                        app.models.systemModel.getData('createSession', {})
                                    )
                                        .done(function(r_cs){
                                            $.cookie('sessionid', r_cs.SessionId, {expires: Date.now().add(+r_fss.WebFolioRemainingTimeoutMinutes || +app.customization.defaultSessionTimeout).minutes()});
                                            app.data.SessionId = r_cs.SessionId;
                                            app.customization.forceSessionId && (app.data.SessionId = app.customization.forceSessionId);
                                            app.datac('WebFolioId', r_cs.WebFolioId);
                                            app.datac('DefaultCustomerId', r_cs.DefaultCustomerId);
                                            app.models.systemModel.setSelected('createSession',{},r_cs.WebFolioId)
                                            if(app.data.CustomerId && app.data.userLoggedIn) {
                                                app.models.systemModel.getData('updateSession', {CustomerId:app.data.CustomerId,CustomerGUID:app.data.CustomerGUID})
                                                    .fail(function(r_us, r_fb){
                                                        window.location.reload(false);
                                                    });
                                            }
                                            console.log('previously active session invalid. starting new session');
                                            finishInit();
                                        })
                                        .fail( function( r_ss, r_cs ) {
                                            $('#loadMessage').html(app.localization.general.err.restartSession);
                                            //alert('We were unable to initialize the application. (fbfail)');
                                        });
                                })
                        } else {
                            $.when(
                                app.models.systemModel.getData('createSession', {}),
                                defer
                            )
                                .done(function(r_cs){
                                    $.cookie('sessionid', r_cs.SessionId, {expires:Date.now().add(+r_fss.WebFolioRemainingTimeoutMinutes || +app.customization.defaultSessionTimeout).minutes()});
                                    app.data.SessionId = r_cs.SessionId;
                                    app.customization.forceSessionId && (app.data.SessionId = app.customization.forceSessionId);
                                    app.datac('WebFolioId', r_cs.WebFolioId);
                                    app.datac('DefaultCustomerId', r_cs.DefaultCustomerId);
                                    app.models.systemModel.setSelected('createSession',{},r_cs.WebFolioId)
                                    $.when(
                                        app.models.systemModel.getData('folioBalance', {SessionId:app.data.SessionId, WebFolioId:app.data.WebFolioId}),
                                        app.data.CustomerId && app.data.userLoggedIn && app.models.systemModel.getData('updateSession', {CustomerId:app.data.CustomerId,CustomerGUID:app.data.CustomerGUID})
                                        ).fail(function(){
                                            console.log('updateSession failed. logging out user.')
                                            app.dispatcher.redirect('profile','logout',['silent']);
                                        }).done(function(){
                                            console.log('clean starting new session');
                                            finishInit();
                                        })

                                })
                                .fail( function( r_cs ) {
                                    $('#loadMessage').html(app.localization.general.err.startSession);
                                    //alert('We were unable to initialize the application. (csfail)');
                                });
                        }
                    })
                    .fail(function(r_mss){
                        //alert('system is offline');
                        if(app.data.WebFolioId) {
                            app.data.WebFolioId = undefined;
                            self.init();
                        } else {
                            $('#loadMessage').html(app.localization.general.err.serverOffline);
                            app.views.splashView.event.fire('displaySystemOffline');
                        }
                    });

                function finishInit(){
                    app.views.splashView.event.fire('initTemplate');
                    app.data.active = true;
                    app.data.inittime = Date.now();
                    console.log('resolving splash controller init', app.data);
                    app.controllers.initController.InitializedDfd.resolve();
                    // Tell the view to show the service selection screen
                    app.models.systemModel.monitorSystemState()
                        .progress(function(r_mss){
                            if (!!r_mss.RemainingUpTime) {
                                app.data['remainingUpTime'] = r_mss.RemainingUpTime;
                                app.views.splashView.event.fire('displayRemainingUpTime', [r_mss.RemainingUpTime]);
                            } else {
                                app.data['remainingUpTime'] = null;
                                app.views.splashView.event.fire('clearRemainingUpTime');
                            }
                            if (!!r_mss.WebFolioStatus && (r_mss.WebFolioStatus == "CHKOUT" || r_mss.WebFolioStatus == "CHKOUTC")) {
                                $.cookie('sessionid', null);
                                app.views.splashView.event.fire('folioCheckedOut');
                                app.data.active = false;
                            } else if (!!app.data.SessionId && r_mss.WebFolioStatus != "ACTIVE") {
                                $.cookie('sessionid', null);
                                app.views.splashView.event.fire('folioTimedOut');
                                app.data.active = false;
                            }
                            if (!!app.data.SessionId && r_mss.WebFolioRemainingTimeoutMinutes != undefined) {
                                $.cookie('sessionid', app.data.SessionId, {expires: Date.now().add(+r_mss.WebFolioRemainingTimeoutMinutes).minutes()});
                                app.data['folioTimeout'] = r_mss.WebFolioRemainingTimeoutMinutes;
                                if (r_mss.WebFolioRemainingTimeoutMinutes == "0") {
                                    $.cookie('sessionid', null);
                                    app.views.splashView.event.fire('folioTimedOut');
                                    app.data.active = false;
                                } else if (+r_mss.WebFolioRemainingTimeoutMinutes <= app.customization.warnFolioTimeoutMinutes) {
                                    app.views.splashView.event.fire('folioTimeoutWarning',[r_mss.WebFolioRemainingTimeoutMinutes])
                                } else {
                                    app.views.splashView.event.fire('clearTimeoutWarning');
                                }
                            }
                        })
                        .fail(function(r_mss){
                            app.data.active = false;
                            app.views.splashView.event.fire('displaySystemOffline');
                        });
                    $(window).trigger( 'hashchange', app );
                }

            },

            initGuestItinerary: function () {
                var defer = $.Deferred(),
                    deferreds = [],
                    itinerarySources = []
                app.customization.features.spaBooking && itinerarySources.push({name:'spaBooking', model:'fetchCustomerSpaBookings', data:'SpaFolio', subitem:'SpaFolioItem', date:'BookStartTime', reserved:'BKD', completed:'COM', folioid:'SpaFolioId'});
                        // {name:'skiBooking', model:'fetchCustomerSkiBookings', data:'SkiFolio', subitem:'SkiFolioItem', date:'BookStartTime', reserved:'BKD', completed:'COM', folioid:'SkiFolioId'}
                app.customization.features.golfBooking && itinerarySources.push({name:'golfBooking', model:'fetchCustomerGolfBookings', data:'GolfBooking', date:'BookingTime', folioid:'GolfBookingId', aggregateGolfPlayers:'GolfPlayer'});
                app.customization.features.pmsBooking && itinerarySources.push({name:'pmsBooking', model:'fetchCustomerPMSBookings', data:'PMSBooking', date:'ArrivalDate',reserved:'RESERV', completed:'CHKOUT', folioid:'PMSFolioId'});
                $.each(itinerarySources, function(i,itinerarySource){
                    var semaphore = $.Deferred();
                    deferreds.push(semaphore.promise());
                    if (app.data.CustomerId && app.data.CustomerGUID && app.customization.features[itinerarySource.name]) {
                        app.models.userModel.getData(itinerarySource.model, {CustomerId:app.data.CustomerId,CustomerGUID:app.data.CustomerGUID})
                            .done(function(r){
                                $.each(r[itinerarySource.data] || [], function(i,theBookingItem){
                                    var bookingItemArray = itinerarySource.subitem ? theBookingItem[itinerarySource.subitem] : theBookingItem,
                                        theDate=null;
                                    $.each($.isArray(bookingItemArray)?bookingItemArray:[bookingItemArray],function(j,bookingItem){
                                        if (!bookingItem || ((!!itinerarySource.reserved||!!itinerarySource.completed) && (bookingItem.BookStatus != itinerarySource.reserved && bookingItem.BookStatus != itinerarySource.completed)) || !bookingItem[itinerarySource.date] || ((theDate = Date.parseExact(bookingItem[itinerarySource.date].substr(0,10),"yyyy-MM-dd")) === null)) {
                                            return;
                                        }
                                        if (theDate > Date.now()) {
                                            if (bookingItem.BookStatus == itinerarySource.reserved){
                                                app.data[itinerarySource.name+'Future'] = app.data[itinerarySource.name+'Future'] || [];
                                                app.data[itinerarySource.name+'Future'].push(theBookingItem[itinerarySource.folioid]);
                                                theBookingItem.Future = true;
                                            } else {
                                                return;
                                            }
                                        } else {
                                            if (bookingItem.BookStatus == itinerarySource.completed){
                                                app.data[itinerarySource.name+'Past'] = app.data[itinerarySource.name+'Past'] || [];
                                                app.data[itinerarySource.name+'Past'].push(theBookingItem[itinerarySource.folioid]);
                                                theBookingItem.Past = true;
                                            } else {
                                                return;
                                            }
                                        }
                                        bookingItem.date = theDate;
                                        if (theBookingItem.DailyRateDetails) {
                                            var dailyRateDetails = $.firstOrOnly(theBookingItem.DailyRateDetails);
                                            theBookingItem.PMSRateType = dailyRateDetails.PMSRateType;
                                            theBookingItem.PMSRateId = dailyRateDetails.PMSRateId;
                                        }
                                        if (_.any(app.data.pmsDayBookings,function(x){return x==theBookingItem.PMSFolioId})) {
                                            theBookingItem.isDayBooking = true;
                                        }
                                        if (!app.data[itinerarySource.name+'s']) {
                                            app.data[itinerarySource.name+'s'] = []
                                        }
                                        if (itinerarySource.subitem) {
                                            var slicedBookingItem = $.extend( {}, theBookingItem );
                                            slicedBookingItem[itinerarySource.subitem] = $.extend( {}, bookingItem );
                                            app.data[itinerarySource.name+'s'].push( slicedBookingItem );
                                        } else {
                                            app.data[itinerarySource.name+'s'].push( theBookingItem );
                                        }
                                    });
                                  if (itinerarySource.aggregateGolfPlayers && theBookingItem[itinerarySource.aggregateGolfPlayers]) {
                                    theBookingItem.golfPlayers = _.reduce(
                                                        _.isArray(theBookingItem[itinerarySource.aggregateGolfPlayers])
                                                          ? theBookingItem[itinerarySource.aggregateGolfPlayers]
                                                          : [theBookingItem[itinerarySource.aggregateGolfPlayers]]
                                                      , function( aggregate, player ) {
                                                          if (player.BookStatus!='CNL' && player.BookStatus!='NSH') {
                                                            aggregate.players += 1
                                                            aggregate.price += +player.ItemPrice
                                                            aggregate.itemName = player.ItemName
                                                            aggregate.courseId = player.CourseId
                                                          }
                                                        return aggregate
                                                        }
                                                      , { players: 0, price: 0 }
                                                    )
                                  }
                                })
                                console.log('done semaphore',semaphore);
                                semaphore.resolve();
                            })
                            .fail(function(r){
                                app.data[itinerarySource.name+'s'] = [];
                                app.data[itinerarySource.name+'s'].noData = true;
                                console.log('fail semaphore',semaphore);
                                semaphore.resolve();
                            });
                    } else {
                        app.data[itinerarySource.name+'s'] = [];
                        semaphore.resolve();
                    }
                })

                $.when.apply(this,deferreds).done(function(){
                    console.log('resolving itinerarySources');
                    defer.resolve(deferreds.length);
                }).fail(function(){console.log('itinerarySources failed')});
                return defer.promise();
            }


        })
});
