/*
 * controllers/roomsController.js
 * Rooms Controller
 */

define([
    'app/ControllerClass',
    'app/models/roomsModel',
    'app/views/roomsView'], function( ControllerClass, RoomsModel, RoomsView) {
    return window.app.controllers.roomsController = $.extend({}, ControllerClass, {
        app:app,
        module:'rooms',

        /**
         * actions are a mapping of URI strings to the function that is to be
         * run in response. for example: http://localhost/#/roomsBooking/roomType
         * will look up the 'roomType' key in the actions array of the rooms
         * controller and call the specified function.
         * N.B. the dispatcher handles mapping 'roomsBooking' to the rooms controller
         */
        actions:{
            // 'url': ['functionInThisClass','prependArgument1','prependArgument2',...]
            'show':['roomsBookingSelected'],
            'venue':['pmsVenueSelected'],
            'dayvenue':['pmsVenueSelected','dayguest'],
            'ratecalendar':['pmsRateCalendar'],
            'roomtypedata':['pmsRoomTypeData'],
            'roomtypedetails':['pmsRoomTypeDetails'],
            'ratedetails':['pmsRateDetails'],
            'rate':['pmsRateList',false],
            'dayrate':['pmsRateList',true],
            'dayroomtypedata':['getDayRoomTypeData'],
            'roomtype':['pmsRoomTypeList',false],
            'dayroomtype':['pmsRoomTypeList',true],
            'rooms':['pmsRoomList'],
            'confirm':['pmsConfirmBooking'],
            'book':['pmsBookRoom'],
            'specialService':['pmsSpecialService'],
            'addSpecialService':['pmsAddSpecialService'],
            'removeSpecialService':['pmsRemoveSpecialService']
        },

        pmsSpecialService: function(folioId, StartDate, FinishDate, pmsVenueName) {
                var arrivalDate = Date.parseExact(StartDate,'yyyy-MM-dd'),
                departureDate = Date.parseExact(FinishDate,'yyyy-MM-dd');
            if (arrivalDate==null || departureDate==null) {
                app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                    title:app.localization.roomReservation.specialServices.invalidDateFormat,
                    message: '' //r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                });
                app.dispatcher.replace('roomsBooking','venue',[app.models.roomsModel.getSelectedValue('pmsVenues')])
                return;
            }


            $.when(
                app.models.systemModel.getData('specialServices', { PMSFolioId: folioId }),
                app.models.roomsModel.getData('pmsVenues', {})
            ).done(function(r_ss, r_pv) {
                app.views.roomsView.event.fire('requestSpecialServiceSelection', [ r_ss, folioId, StartDate, FinishDate, (r_pv.Venue && _.find(r_pv.Venue, function(x){
                    return x.VenueName == pmsVenueName
                })) ])
            })
        },

        init:function () {
            console.log('initializing rooms controller');
            app.data.messages = app.data.messages || [];
            this._init.call(this);
        },


        roomsBookingSelected:function () {
            var self = this;
            $.when(
                app.models.roomsModel.getData('pmsVenues', {}),
                (app.customization.hideOtherPropertyIfItemsInCart && app.models.systemModel.validatePMSBeforeSpa())
                )
                .done(function (r_pv, r_pbs) {
                    var pmsVenues = r_pv.Venue;
                    if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
                        pmsVenues = _.filter(r_pv.Venue,function(x){
                            return _.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId })
                                || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
                        })
                        if (pmsVenues.length==0) {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                title:app.localization.roomReservation.datesAndOccupants.err.noVenuesAtProperty,
                                message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                            });
                            app.dispatcher.redirect('summary','',[]);
                            return;
                        }
                    }
                    if (pmsVenues.length > 1 || !!Customization.roomsBooking.dayGuestPromoCode) {
                        app.views.roomsView.event.fire('requestPmsVenueSelection', [pmsVenues]);
                    } else {
                        var pmsVenueId = $.firstOrOnly(pmsVenues).VenueId;
                        app.models.roomsModel.setSelected('pmsVenues', {}, pmsVenueId);
                        self.pmsVenueSelected(pmsVenueId);
                    }
                    app.data.pmsVenues = r_pv;
                })
                .fail(function (r_pv) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed,
                        message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.replace('','',[])
                });
        },

        pmsVenueSelected:function (pmsVenue, pmsArrivalDate, pmsDepartureDate, pmsNumAdults, pmsNumYouth, pmsNumChildren, pmsNumJrChildren, pmsPromoCode, extra) {
            var dayGuest = false;
            if (pmsVenue=="dayguest" && !!Customization.roomsBooking.dayGuestPromoCode) {
                dayGuest = true;
                pmsVenue=pmsArrivalDate;
                pmsArrivalDate=pmsDepartureDate;
                pmsDepartureDate=pmsNumAdults;
                pmsNumAdults=pmsNumYouth;
                pmsNumYouth=pmsNumChildren;
                pmsNumChildren=pmsNumJrChildren;
                pmsNumJrChildren=pmsPromoCode;
                pmsPromoCode=extra;
            }
            if (pmsPromoCode == app.customization.roomsBooking.dayGuestPromoCode) {
                dayGuest = true;
            }
            var arrivalDate = Date.parseExact(pmsArrivalDate,'yyyy-MM-dd'),
                departureDate = Date.parseExact(pmsDepartureDate,'yyyy-MM-dd');
            $.when(app.models.roomsModel.getData('pmsVenues', {}),
                (app.customization.hideOtherPropertyIfItemsInCart && app.models.systemModel.validatePMSBeforeSpa())
                )
                .done(function (r_pv,r_pbs) {
                    app.models.roomsModel.setSelected('pmsVenues', {}, pmsVenue);
                    console.log('setting selected pmsVenues',pmsVenue);
                    if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
                        var pmsVenues = _.filter(r_pv.Venue,function(x){
                            return _.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId })
                                || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
                        })
                        if (pmsVenues.length==0) {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                title: app.localization.roomReservation.datesAndOccupants.err.noVenuesAtProperty,
                                message: ''
                            });
                            app.dispatcher.redirect('summary','',[]);
                            return;
                        } else if (!_.any(pmsVenues,function(x){return x.VenueId == pmsVenue})) {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                title: app.localization.roomReservation.datesAndOccupants.err.mismatchedProperty,
                                message: ''
                            });
                            app.dispatcher.redirect('summary','',[]);
                            return;
                        }
                    }
                    var currentVenue = _.find(r_pv.Venue,function(x){return x.VenueId == pmsVenue})
                    if (!currentVenue) {
                        currentVenue = { VenueId:pmsVenue, VenueName:pmsVenue }
                    }
                    app.views.roomsView.event.fire('requestBookingDetailSelection', [currentVenue, arrivalDate, departureDate, dayGuest, pmsNumAdults, pmsNumYouth, pmsNumChildren, pmsNumJrChildren, pmsPromoCode]);

                })
                .fail(function (r_pv) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed,
                        message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.replace('','',[])
                });

        },

        pmsRateCalendar:function(month, year) {
            var start = Date.parseExact(year+'-'+month+'-01','yyyy-M-dd')
              , end = Date.parseExact(year+'-'+month+'-'+Date.getDaysInMonth(year,month-1),'yyyy-M-d')
              , today = Date.today().add(app.customization.roomsBooking.allowBookingToday ? 0 : 1).days()
            if (today.toString('yyyy-MM')==start.toString('yyyy-MM')) {
                start.set({day:+today.toString('d')})
            }
            var venue = app.models.roomsModel.getSelectedValue('pmsVenues'),
                params = {
                    'Venue':venue,
                    'StartDate':start.toString('yyyy-MM-dd'),
                    'EndDate':end.toString('yyyy-MM-dd'),
                    'Language':app.data.languageMap[app.language]
                },
                rateOccQtyName = (["SingleRate","SingleRate","DoubleRate","TripleRate","QuadRate"])[+app.customization.roomsBooking.defaultNumAdults];
            console.log('getting rate calendar for ',venue, month, year, params);
            $.when(app.customization.roomsBooking.suppressRateDateLoading ? null : app.models.roomsModel.getData('pmsVenueCalendar', params, month, year))
                .done(function (r_prc) {
                    if (r_prc && r_prc.BarRateAvailability) {
                        !app.data.pmsDatesCalendar && (app.data.pmsDatesCalendar={});
                        !app.data.pmsDatesCalendar[venue] && (app.data.pmsDatesCalendar[venue]={});
                        !app.data.pmsDatesCalendar[venue][ start.toString( "M/yyyy" ) ] && (app.data.pmsDatesCalendar[venue][ start.toString( "M/yyyy" ) ] = {});
                        var bestRoomTypes = [];
                        r_prc.BarRoomType && bestRoomTypes.push(r_prc.BarRoomType);
                        _.each(r_prc.BarRateAvailability, function(barRate){
                            barRate.date = Date.parseExact( barRate.Date, "yyyy-MM-ddHHmmss" )
                            if (barRate.RateCardDailyAvailability) {
                                if (!$.isArray(barRate.RateCardDailyAvailability)){
                                    barRate.RateCardDailyAvailability = [barRate.RateCardDailyAvailability]
                                }
                                var barRates = _.filter(barRate.RateCardDailyAvailability,function(x){
                                                            return (+x.NumRoomsAvail || app.customization.roomsBooking.showPricesOfRatesWithZeroRoomsLeftOnCalendar) 
                                                                && ((x.AvailMonSun[ (barRate.date.getDay()+6) % 7 ] != "N")  || app.customization.roomsBooking.ignoreDayOfWeekRestrictionOnCalendar)
                                                        })
                                if (barRates.length > 0) {
                                    barRate.bestRate = _.min( barRates, function(x){return +x[rateOccQtyName]} )
                                    barRate.bestRate.minLength = app.customization.roomsBooking.ignoreMinLengthOfStayOnCalendar ? 0 : _.chain( barRates ).pluck('MinLength').map(function(x){return +x}).min().value()
                                    barRate.MinLOS = barRate.bestRate.minLength.toString()
                                    barRate.bestRate.maxLength = _.chain( barRates ).pluck('MaxLength').map(function(x){return x===""?Infinity:+x}).max().value()
                                    barRate.bestRate.stopArrivals = app.customization.roomsBooking.ignoreStopArrivalsOnCalendar ? "N" : (_.chain( barRates ).pluck('StopArrivals').map(function(x){return x=="Y"}).all(_.identity).value() ?"Y":"N")
                                    barRate.bestRate.availMonSun = app.customization.roomsBooking.ignoreDayOfWeekRestrictionOnCalendar ? "YYYYYYY" : _.chain( _.zip.apply(null, _.chain( barRates ).pluck('AvailMonSun').map(function(x){return _(x.split('')).map(function(x){return x=='Y'}) }).value() )).map(function(x){return _.any(x, _.identity)}).map(function(x){return x?"Y":"N"}).value().join("")
                                    barRate.bestRate.totalrooms = barRate.RoomsAvailable;
                                    barRate.bestRate.MinRate = Number(barRate.bestRate[rateOccQtyName]);
                                    barRate.bestRate.PMSRoomType = barRate.bestRate.RoomType;
                                    barRate.bestRate.NumRoomLeft = barRate.bestRate.NumRoomsAvail;
                                    bestRoomTypes.length || barRate.bestRate.RoomType && bestRoomTypes.push(barRate.bestRate.RoomType);
                                    app.data.pmsDatesCalendar[venue][ app.rs.DateToString( barRate.Date, "M/yyyy" ) ][ app.rs.DateToString( barRate.Date, "d" ) ] = barRate;
                                }
                            }
                                
                        });
                        app.data.pmsRoomTypeData || (app.data.pmsRoomTypeData={});
                        $.each(_.uniq(bestRoomTypes), function(i,bestRoomType) {
                            app.data.pmsRoomTypeData[bestRoomType] || (app.data.pmsRoomTypeData[bestRoomType]=null);
                        });
                    }
                    if (r_prc===null) {
                        console.log('setting null pmscalendar rate data')
                        !app.data.pmsDatesCalendar && (app.data.pmsDatesCalendar={});
                        !app.data.pmsDatesCalendar[venue] && (app.data.pmsDatesCalendar[venue]={});
                        !app.data.pmsDatesCalendar[venue][ month + "/" + year ] && (app.data.pmsDatesCalendar[venue][ month + "/" + year ] = {});
                        app.data.pmsRoomTypeData || (app.data.pmsRoomTypeData={});
                    }
                    console.log('updateRateCalendar', venue);
                    app.views.roomsView.event.fire('updateRateCalendar', venue);
                })
                .fail(function (r_prc) {
                    if (!!r_prc && !!r_prc.Result && r_prc.Result.value == "SUCCESS") {
                        !app.data.pmsDatesCalendar && (app.data.pmsDatesCalendar={});
                        !app.data.pmsDatesCalendar[venue] && (app.data.pmsDatesCalendar[venue]={});
                        !app.data.pmsDatesCalendar[venue][ month + "/" + year ] && (app.data.pmsDatesCalendar[venue][ month + "/" + year ] = {});
                        app.data.pmsRoomTypeData || (app.data.pmsRoomTypeData={});
                    }
                    app.views.roomsView.event.fire('updateRateCalendar', venue, false);
                });

        },

        pmsRoomTypeData:function() {
            var deferreds = [];
            $.each(app.data.pmsRoomTypeData,function(roomType,data){

                console.log('pmsRoomTypeDetails',roomType,data);
                data===null && deferreds.push(
                    app.models.roomsModel.getData('pmsRoomTypeDetails', {'PMSRoomType':roomType})
                        .done(function (r_prtd) {
                            app.data.pmsRoomTypeData || (app.data.pmsRoomTypeData={});

                            if (r_prtd.PMSRoomTypeDetails){
                                var fakedesc = /*(roomType=="DRES") ? { PMSRoomTypeCustDesc: "<ul><li> 485 square feet of luxury<li> Each double queen room accommodates up to four people<li> High-definition television<li> Desk and sitting area</ul>" } : (roomType=="ROOM") ? { PMSRoomTypeCustDesc: "<ul><li> 650 square feet of luxury<li> Accommodates two people<li> Interior pass-through fireplace<li> Lower level rooms with a private outdoor patio, in-ground hot tub and fire pit<li> High-definition television<li> One king-size SpringAir pillow-top bed</ul>" } :*/ {};
                                (app.data.pmsRoomTypeData[roomType] = $.extend( fakedesc, r_prtd.PMSRoomTypeDetails));
                            }
                        })
                );
            });
            $.when.apply(this,deferreds)
                .done(function (a,b,c,d,e,f) {
                    app.views.roomsView.event.fire('roomTypeDataReady');
                });
        },

        pmsRoomTypeDetails:function(roomType,eventName) {
            app.models.roomsModel.getData('pmsRoomTypeDetails', {'PMSRoomType':roomType})
            .done(function (r_prtd) {
                app.data.pmsRoomTypeData || (app.data.pmsRoomTypeData={});
                if (r_prtd.PMSRoomTypeDetails){
                    app.data.pmsRoomTypeData[roomType] = $.extend( {}, r_prtd.PMSRoomTypeDetails);
                    app.views.roomsView.event.fire(eventName, r_prtd.PMSRoomTypeDetails);
                }
            });
        },

        pmsRateDetails:function(pmsRateId,eventName) {
            app.models.roomsModel.getData('pmsRateDetails', {'PMSRate':pmsRateId})
            .done(function (r_prd) {
                if (r_prd.PMSRateDetails){
                    app.views.roomsView.event.fire(eventName, r_prd.PMSRateDetails);
                }
            });
        },

        pmsRateList:function (dayGuestMode, pmsArrivalDate, pmsDepartureDate, pmsNumAdults, pmsNumYouth, pmsNumChildren, pmsNumJrChildren, pmsPromoCode, fastForwardPMSRate, fastForwardPMSRoomType, pmsVenue) {
            var self = this,
                arrivalDate = Date.parseExact(pmsArrivalDate,'yyyy-MM-dd000000'),
                departureDate = Date.parseExact(pmsDepartureDate,'yyyy-MM-dd000000');
            if (app.customization.roomsBooking.dayGuestPromoCode && (pmsPromoCode == app.customization.roomsBooking.dayGuestPromoCode)) {
                dayGuestMode = true;
            }
            $.when(
                    app.models.roomsModel.getData('pmsVenues', {}),
                    (app.customization.hideOtherPropertyIfItemsInCart && app.models.systemModel.validatePMSBeforeSpa())
                )
            .done(function (r_pv,r_pbs) {
                pmsVenue && app.models.roomsModel.setSelected('pmsVenues', {}, pmsVenue);
                fastForwardPMSRate && (app.data.fastForwardPMSRate = fastForwardPMSRate);
                fastForwardPMSRoomType && (app.data.fastForwardPMSRoomType = fastForwardPMSRoomType);
                var venue = app.models.roomsModel.getSelectedItem('pmsVenues', {});
                if (!venue) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed,
                        message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.redirect('summary','',[]);
                    return;
                }
                if (arrivalDate==null || departureDate==null) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.roomReservation.datesAndOccupants.err.noMatchingAvailability,
                        message: '' //r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.replace('roomsBooking','venue',[app.models.roomsModel.getSelectedValue('pmsVenues')])
                    return;
                }
                if (Date.parseExact(pmsArrivalDate,'yyyy-MM-dd000000') > Date.parseExact(pmsDepartureDate,'yyyy-MM-dd000000')) {
                    app.dispatcher.replace('roomsBooking','rate',[pmsDepartureDate, pmsArrivalDate, pmsNumAdults, pmsNumYouth, pmsNumChildren, pmsNumJrChildren, pmsPromoCode])
                    return;
                }
                var pmsRatesParameters = {
                    'ArrivalDate':pmsArrivalDate,
                    'DepartureDate':pmsDepartureDate,
                    'Adults':+pmsNumAdults,
                    'Youth':+pmsNumYouth,
                    'Children':+pmsNumChildren,
                    'Infants':+pmsNumJrChildren,
                    'Venue':app.models.roomsModel.getSelectedValue('pmsVenues'),
                    'PromoCode':(dayGuestMode && app.customization.roomsBooking.dayGuestPromoCode && !pmsPromoCode) ? app.customization.roomsBooking.dayGuestPromoCode : pmsPromoCode

                };
                if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
                    var pmsVenues = _.filter(r_pv.Venue,function(x){
                        return _.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId })
                            || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
                    })
                    if (pmsVenues.length==0) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title: app.localization.roomReservation.datesAndOccupants.err.noVenuesAtProperty,
                            message: ''
                        });
                        app.dispatcher.redirect('summary','',[]);
                        return;
                    } else if (!_.any(pmsVenues,function(x){return x.VenueId == venue.VenueId})) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title: app.localization.roomReservation.datesAndOccupants.err.mismatchedProperty,
                            message: ''
                        });
                        app.dispatcher.redirect('summary','',[]);
                        return;
                    }

                }
                $.when(app.models.roomsModel.getData('pmsRates', pmsRatesParameters ))
                    .done(function (r_pr) {
                        var roomType;
                        app.models.roomsModel.dataModel.pmsLastQuery.data = app.models.roomsModel.dataModel.pmsLastQuery.data || {};
                        app.models.roomsModel.dataModel.pmsLastQuery.data[app.models.roomsModel.makeStandardName(app.models.roomsModel.dataModel.pmsLastQuery,{})]
                            = {PMSRateType:[$.extend( {'PMSLastQuery':r_pr.PMSRateType}, {dayGuestMode: dayGuestMode}, pmsRatesParameters )]};
                        app.models.roomsModel.setSelected('pmsLastQuery',{},r_pr.PMSRateType)
                        if (app.data.fastForwardPMSRate && r_pr.PMSRateType && _.find(r_pr.PMSRateType, function(rt){return rt.PMSRateTypeId==app.data.fastForwardPMSRate})) {
                            self.pmsRoomTypeList(dayGuestMode, app.data.fastForwardPMSRate);
                        } else {
                       // if (r_pr.PMSRateType.length > 1) {

                            if (app.data.fastForwardPMSRate && r_pr.PMSRateType) {
                                app.data.messages.push({ type:'alert', 'class':'alert-warning', actions: [],
                                    title:app.localization.roomReservation.datesAndOccupants.err.noMatchingPackage,
                                    message: '' //r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                                });
                            }

                            app.views.roomsView.event.fire('requestPmsRateSelection', [pmsArrivalDate, pmsDepartureDate, pmsNumAdults, pmsNumYouth, pmsNumChildren, pmsNumJrChildren, pmsPromoCode, r_pr.PMSRateType, dayGuestMode]);
                            if (!!app.customization.roomsBooking.dayGuestPromoCode && dayGuestMode) {
                                r_pr.PMSRateType.length>0 && app.dispatcher.dispatch('roomsBooking','dayroomtypedata',[_.map(r_pr.PMSRateType,function(x){return x.PMSRateTypeId})]);
                            }
                       // } else {
                           // self.pmsRoomTypeList(r_pr.PMSRateType[0].PMSRateTypeId);
                        }
                    })
                    .fail(function (r_pr) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.roomReservation.datesAndOccupants.err.noMatchingAvailability,
                            message: '' //r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                        });
                        app.dispatcher.replace('roomsBooking',((!!app.customization.roomsBooking.dayGuestPromoCode && dayGuestMode) ? 'dayvenue' : 'venue'),[app.models.roomsModel.getSelectedValue('pmsVenues'),pmsArrivalDate.substr(0,10),pmsDepartureDate.substr(0,10)])
                    });
            }).fail(function (r_pv) {       ////-->$.when(pmsVenueDeferreds)
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed,
                        message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.replace('','',[])
                });     ////-->$.when(pmsVenueDeferreds)
        },

        getDayRoomTypeData: function (pmsRate) {
            if (pmsRate) {
                pmsRate = pmsRate.split(',');
                var theRate = pmsRate.shift(),
                    pmsRoomTypesParameters = {'PMSRateType':theRate},
                    pmsLastQueryParameters = app.models.roomsModel.getSelectedItem('pmsLastQuery');
                for (key in pmsLastQueryParameters) {
                    if (key != 'PromoCode' && key != 'dayGuestMode') {
                        pmsRoomTypesParameters[key] = pmsLastQueryParameters[key]
                    }
                }
                $.when(app.models.roomsModel.getData( 'pmsRoomTypes', pmsRoomTypesParameters ))
                    .done(function (r_prt) {
                        if (pmsRate.length>0) {
                            app.dispatcher.dispatch('roomsBooking','dayroomtypedata',[pmsRate])
                        }
                        app.views.roomsView.event.fire('updateDayRoomTypeData', [theRate, r_prt.PMSRate]);
                    })
            }
        },

        pmsRoomTypeList:function (dayGuestMode, pmsRate, pmsRoomType, fastForward, pmsVenue, pmsPromoCode) {
            var self = this;
            if (app.customization.roomsBooking.dayGuestPromoCode && (pmsPromoCode == app.customization.roomsBooking.dayGuestPromoCode)) {
                dayGuestMode = true;
            }
            $.when(
                    app.models.roomsModel.getData('pmsVenues', {}),
                    (app.customization.hideOtherPropertyIfItemsInCart && app.models.systemModel.validatePMSBeforeSpa())
                )
            .done(function (r_pv,r_pbs) {
                pmsVenue && app.models.roomsModel.setSelected('pmsVenues', {}, pmsVenue);
                var venue = app.models.roomsModel.getSelectedItem('pmsVenues', {});
                if (!venue) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed,
                        message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.redirect('summary','',[]);
                    return;
                }
                app.data.fastForwardPMSRate = app.data.fastForwardPMSRate || (+fastForward ? pmsRate : undefined);
                app.data.fastForwardPMSRoomType = app.data.fastForwardPMSRoomType || (+fastForward ? pmsRoomType : undefined);

                if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {

                    var pmsVenues = _.filter(r_pv.Venue,function(x){
                        return _.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId })
                            || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
                    })
                    if (pmsVenues.length==0) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title: app.localization.roomReservation.datesAndOccupants.err.noVenuesAtProperty,
                            message: ''
                        });
                        app.dispatcher.redirect('summary','',[]);
                        return;
                    } else if (!_.any(pmsVenues,function(x){return x.VenueId == venue.VenueId})) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title: app.localization.roomReservation.datesAndOccupants.err.mismatchedProperty,
                            message: ''
                        });
                        app.dispatcher.redirect('summary','',[]);
                        return;
                    }
                }

                var pmsRoomTypesParameters = {'PMSRateType':pmsRate},
                    pmsLastQueryParameters = app.models.roomsModel.getSelectedItem('pmsLastQuery');
                if (!pmsLastQueryParameters ) {
                    app.dispatcher.redirect('roomsBooking',((!!app.customization.roomsBooking.dayGuestPromoCode && dayGuestMode) ? 'dayvenue' : 'venue'),[app.models.roomsModel.getSelectedValue('pmsVenues'),'','',fastForward])

                } else {
                    app.models.roomsModel.setSelected('pmsRates', pmsLastQueryParameters, pmsRate);
                    for (key in pmsLastQueryParameters) {
                        if (key != 'PromoCode' && key !='dayGuestMode') {
                            pmsRoomTypesParameters[key] = pmsLastQueryParameters[key]
                        }
                    }
                    $.when(app.models.roomsModel.getData( 'pmsRoomTypes', pmsRoomTypesParameters ))
                        .done(function (r_prt) {
                            //app.data.pmsRoomTypes = r_prt;

                            if (    app.data.fastForwardPMSRoomType
                                    && r_prt.PMSRate
                                    && _.find(  r_prt.PMSRate,
                                                function(r){
                                                    return r.PMSRoomType && (r.PMSRoomType.PMSRoomTypeId==app.data.fastForwardPMSRoomType)
                                                }
                                            )
                                )
                            {
                                if (Customization.roomsBooking.roomSelection) {
                                    self.pmsRoomList( app.data.fastForwardPMSRoomType );
                                } else {
                                    self.pmsConfirmBooking( app.data.fastForwardPMSRoomType );
                                }
                            } else {

// todo if !!fastForwardPMSRoomType then warning messsage

                            //if (app.data.pmsRoomTypes.PMSRate.length > 1) {
    //                        if (r_prt.PMSRate.length > 1) {

                                app.views.roomsView.event.fire('requestPmsRoomTypeSelection', [pmsRate, r_prt.PMSRate]);
    //                        } else {
    //                            var pmsRoomType = $.firstOrOnly(r_prt.PMSRate[0].PMSRoomType).PMSRoomTypeId;
    //                            app.models.roomsModel.setSelected('pmsRoomTypes', {}, pmsRoomType);
    //                            app.dispatcher.dispatch('roomsBooking','confirm',[pmsRoomType]);
    //                        }
                            }
                        })
                        .fail(function (r_prt) {
                            console.log(r_prt);
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                title:app.localization.roomReservation.datesAndOccupants.err.pmsRoomTypesFailed,
                                message: '' //r_prt.Result ? "(" + r_prt.Result.Text + ")" : ""
                            });
                            app.dispatcher.replace('roomsBooking',((!!app.customization.roomsBooking.dayGuestPromoCode && dayGuestMode) ? 'dayvenue' : 'venue'),[app.models.roomsModel.getSelectedValue('pmsVenues')])

                        });
                }
            });
        },

        pmsRoomList:function (pmsRoomType) {
            var var1 = app.models.roomsModel.getSelectedItem('pmsLastQuery')
            if (!var1) {
                app.dispatcher.replace('roomsBooking','venue',[app.models.roomsModel.getSelectedValue('pmsVenues')])
                return;
            }
            var var2 = {PMSRateType:  app.models.roomsModel.getSelectedValue('pmsRates'),
                Venue: app.models.roomsModel.getSelectedValue('pmsVenues'),
                WebFolioId: app.models.systemModel.getSelectedValue('createSession')};
            $.extend(var2,var1);

            var pmsRoomTypesParameters = {'RoomType':pmsRoomType},
                pmsLastQueryParameters = app.models.roomsModel.getSelectedItem('pmsLastQuery');
            if (!pmsLastQueryParameters ) {
                app.dispatcher.redirect('roomsBooking','venue',[app.models.roomsModel.getSelectedValue('pmsVenues')])
            } else {
                app.models.roomsModel.setSelected('pmsRoomTypes', $.extend({'PMSRoomType.PMSRoomTypeId':app.models.roomsModel.getSelectedValue('pmsRoomTypes')},var2), pmsRoomType);
                for (key in pmsLastQueryParameters) {
                    if (key != 'PromoCode' && key != 'dayGuestMode') {
                        pmsRoomTypesParameters[key] = pmsLastQueryParameters[key]
                    }
                }
                $.when(app.models.roomsModel.getData( 'pmsRooms', pmsRoomTypesParameters ))
                    .done(function (r_prt) {
                        app.views.roomsView.event.fire('requestPmsRoomSelection', [pmsRoomType, r_prt.PMSRoom]);

//                        }
                    })
                    .fail(function (r_prt) {
                        console.log(r_prt);
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.roomReservation.datesAndOccupants.err.pmsRoomsFailed,
                            message: '' // r_prt.Result ? "(" + r_prt.Result.Text + ")" : ""
                        });
                        app.dispatcher.replace('roomsBooking','venue',[app.models.roomsModel.getSelectedValue('pmsVenues')])
                    });
            }
        },

        pmsConfirmBooking:function (pmsRoomType, pmsRoomNumber) {
            var self = this
              , var1 = app.models.roomsModel.getSelectedItem('pmsLastQuery')
            if (!var1) {
                app.dispatcher.replace('roomsBooking','venue',[app.models.roomsModel.getSelectedValue('pmsVenues')])
                return;
            }
            var var2 = {PMSRateType:  app.models.roomsModel.getSelectedValue('pmsRates'),
                Venue: app.models.roomsModel.getSelectedValue('pmsVenues'),
                WebFolioId: app.models.systemModel.getSelectedValue('createSession')};
            $.extend(var2,var1);
            app.models.roomsModel.setSelected('pmsRoomTypes', var2, pmsRoomType);

            var pmsRoomTypesParameters = {'RoomType':pmsRoomType},
                pmsLastQueryParameters = app.models.roomsModel.getSelectedItem('pmsLastQuery');
            if (!pmsLastQueryParameters ) {
                app.dispatcher.redirect('roomsBooking','venue',[app.models.roomsModel.getSelectedValue('pmsVenues')])
            } else {
                if (!!pmsRoomNumber) {
                    for (key in pmsLastQueryParameters) {
                        if (key != 'PromoCode' && key != 'dayGuestMode') {
                            pmsRoomTypesParameters[key] = pmsLastQueryParameters[key]
                        }
                    }
                    app.models.roomsModel.setSelected('pmsRooms', pmsRoomTypesParameters, pmsRoomNumber);
                }
            }
            var var3 = app.models.roomsModel.getSelectedItem('pmsRoomTypes', var2);
            console.log('confirm',pmsRoomType, var2, var3);
            if (app.customization.roomsBooking.suppressConfirmScreen) {
                self.pmsBookRoom()
            } else {
                app.views.roomsView.event.fire('requestBookingConfirmation', [ pmsRoomType, var2, var3, pmsRoomNumber ]);
            }
            if (!!app.customization.roomsBooking.dayGuestPromoCode && var2.dayGuestMode==true) {
                app.data.fastForwardPMSRate = undefined;
                app.data.fastForwardPMSRoomType = undefined;
            }
            //}
        },

        pmsCreateBooking: function() {
            $.when( app.models.roomsModel.getData('bookingConfirmation'))

        },

        pmsAddSpecialService: function(pmsFolioId, qty, PMSSpecialServiceName, date, note) {
			$.when(
				app.models.systemModel.getData('folioBookings', {}),
				app.models.systemModel.getData('specialServices', { PMSFolioId : pmsFolioId})
			).done(function(r_fb, r_ss){

                if (r_ss.InventoriedSpecialServices && r_ss.InventoriedSpecialServices.PMSSpecialService) {
                  $.each($.wrapArray(r_ss.InventoriedSpecialServices.PMSSpecialService), function(k,v){
                    v._isInventoried = true
                    r_ss.PMSSpecialService.push(v)
                  })
                }
        var params = {},
          systemModel = app.models.systemModel,
          itemSpecialService = _.find(r_ss.PMSSpecialService, function(x){return x.PMSSpecialServiceName==PMSSpecialServiceName}),
          webFolioItem = _.find(r_fb.WebFolioItem, function(x){return x.FolioId==pmsFolioId});

        if (itemSpecialService && webFolioItem) {
          date = date || webFolioItem.StartDate;
          params = {
            PMSFolioId: pmsFolioId,
            PMSSpecialServiceName : PMSSpecialServiceName,
            PMSSpecialServiceQty : +qty
          };
          if (itemSpecialService.IsCharged == "1" && date) {
            params.PMSSpecialServiceDate = Date.parse(date).toString("yyyy-MM-ddHHmmss")
          }
                    if (note) {
                        params.PMSSpecialServiceNote = note;
                    }
          $.when( app.models.roomsModel.getData('addSpecialService', params) )
            .done(function(){
              app.data.messages.push({
                type:'alert', 'class':'alert-success',
                actions: [],
                title:app.localization.bookingSummary.upgradeConfirmation,
                message:""
              });
              app.dispatcher.replace('summary','show',[]);
            })
            .fail(function() {
              app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                title:app.localization.bookingSummary.upgradeError,
                message: ''
              });
              app.dispatcher.replace('summary','show',[]);
            });
        } else {
          app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
            title:app.localization.bookingSummary.upgradeError,
            message: app.localization.bookingSummary.tryAgain
          });
          app.dispatcher.replace('summary','show',[]);
        }
             });
        },

        pmsRemoveSpecialService: function(pmsFolioId, pmsFolioSpecialServiceId) {
            $.when( app.models.roomsModel.getData('removeSpecialService', {
                PMSFolioId: pmsFolioId,
                PMSFolioSpecialServiceId : pmsFolioSpecialServiceId
            })).done(function(){
                app.data.messages.push({ type:'alert', 'class':'alert-success', actions: [],
                    title:app.localization.bookingSummary.upgradeRemoved,
                    message:""
                });
                //app.models.systemModel.getData('folioBalance', {}).always(function(){
                    app.dispatcher.replace('summary','show',[]);
                //});

            })

        },

        pmsBookRoom:function () {
            var1 = app.models.roomsModel.getSelectedItem('pmsLastQuery');
            if (var1 == undefined) {
                app.dispatcher.replace('roomsBooking','venue',[app.models.roomsModel.getSelectedValue('pmsVenues')]);
                return
            }
            var2 = {PMSRateType:  app.models.roomsModel.getSelectedValue('pmsRates'),
                Venue: app.models.roomsModel.getSelectedValue('pmsVenues'),
                WebFolioId: app.models.systemModel.getSelectedValue('createSession')};
            var3 = app.models.roomsModel.getSelectedItem('pmsRoomTypes', $.extend(var2,var1));
            if (!app.customization.login.atCheckOut && !app.data.userLoggedIn) {
                app.dispatcher.redirect('profile','login',['next','roomsBooking','book']);
            } else {
                var pmsCreateParameters = {
                    'PMSRoomType': app.models.roomsModel.getSelectedValue('pmsRoomTypes'),
                    'PMSRateType': app.models.roomsModel.getSelectedValue('pmsRates'),
                    'ArrivalDate':var1.ArrivalDate,
                    'DepartureDate':var1.DepartureDate,
                    'Adults': var1.Adults,
                    'Children': var1.Children,
                    'Youth': var1.Youth,
                    'Infants':var1.Infants,
                    'CustomerId': app.data.CustomerId || app.data.DefaultCustomerId
                };
                var roomNumber = undefined;
                if (roomNumber = app.models.roomsModel.getSelectedValue(
                    'pmsRooms',
                    'PMSRoomNumber',
                    $.extend( {'RoomType': pmsCreateParameters.PMSRoomType}, pmsCreateParameters) )
                ) {
                    pmsCreateParameters['RoomNumber'] = roomNumber;
                }
                $.when(app.models.roomsModel.getData('pmsBookRoom', pmsCreateParameters))
                    .done(function (r_cb) {
                        console.log('completed pmsBookRoom',r_cb);
                        if (r_cb.PMSFolioId) {
                            app.data.messages.push({ type:'alert', 'class':'alert-success', actions: [],
                                title:app.localization.bookingSummary.reservationAdded,
                                message:""
                            });
                            if (!!app.customization.roomsBooking.dayGuestPromoCode && var1.dayGuestMode == true) {
                                !!app.data.pmsDayBookings ? app.data.pmsDayBookings.push(r_cb.PMSFolioId) : (app.data.pmsDayBookings=[r_cb.PMSFolioId])
                                app.datal('pmsDayBookings',app.data.pmsDayBookings);
                            }
                            //app.models.systemModel.getData('folioBalance', {}).always(function(){
                                app.dispatcher.replace('summary','show',[]);
                            //});
                        } else {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                title:app.localization.roomReservation.datesAndOccupants.err.pmsBookingFailed,
                                message: '' // "(No folio returned from booking request)"
                            });
                            app.dispatcher.replace('roomsBooking',((!!app.customization.roomsBooking.dayGuestPromoCode && var1.dayGuestMode==true) ? 'dayvenue' : 'venue'),[app.models.roomsModel.getSelectedValue('pmsVenues'),var1.ArrivalDate.substr(0,10),var1.DepartureDate.substr(0,10)])
                        }
                    })
                    .fail(function (r_cb) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.roomReservation.datesAndOccupants.err.pmsBookingFailed,
                            message: app.localization.general.err.serverError // "(No folio returned from booking request" + (r_cb.Result ? " - " + r_cb.Result.Text : "") + ")"
                        });
                        app.dispatcher.replace('roomsBooking',((!!app.customization.roomsBooking.dayGuestPromoCode && var1.dayGuestMode==true) ? 'dayvenue' : 'venue'),[app.models.roomsModel.getSelectedValue('pmsVenues'),var1.ArrivalDate.substr(0,10),var1.DepartureDate.substr(0,10)])
                    });

            }
        }

    })
});
