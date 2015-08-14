/*
 * views/roomsView.js
 * Rooms View
 */

define( [
    'lib/event',
    'app/views/commonViewHelper',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/breadcrumbs',
    'hbs!app/views/templates/content',
    'hbs!app/views/templates/pmsVenueList',
    'hbs!app/views/templates/pmsDatesForm',
    'hbs!app/views/templates/pmsRatesList',
    'hbs!app/views/templates/pmsRoomTypeList',
    'hbs!app/views/templates/pmsRoomsList',
    'hbs!app/views/templates/pmsBookConfirm',
    'hbs!app/views/templates/pmsSpecialService',
    'bootstrap'
    ], function( Event, commonViewHelper, navbarTpl, breadcrumbsTpl, contentTpl, pmsVenuesListTpl, pmsDatesForm, pmsRatesList, pmsRoomTypeList, pmsRoomList, pmsBookConfirm, pmsSpecialServiceTpl){
        var roomsView = {
            app: app,
            event: $.extend({},Event),
            module : "roomsBooking"
        };

        var setBreadCrumb = function( crumbText, crumbLink ) {
            app.data.breadCrumbs = app.data.breadCrumbs || {};
            app.data.breadCrumbs.rooms = app.data.breadCrumbs.rooms || [];
            var spliceCrumbsAt = -1,
                existingCrumb = $.grep(app.data.breadCrumbs.rooms,function(crumb,index){
                    if (crumb.name==crumbText) {
                        spliceCrumbsAt = index;
                        return true;
                    }
                    return false;
                }),
                currentCrumb = {name:crumbText,url:crumbLink};

            app.data.breadCrumbs.rooms = existingCrumb.length ?
                    $.merge(app.data.breadCrumbs.rooms.slice(0,spliceCrumbsAt),[currentCrumb]) :
                    $.merge(app.data.breadCrumbs.rooms,[currentCrumb]);

            for(var i=0;i<app.data.breadCrumbs.rooms.length;i++) {
                app.data.breadCrumbs.rooms[i].last = i==(app.data.breadCrumbs.rooms.length-1);
            }
        };

    roomsView.event.listen('requestSpecialServiceSelection', roomsView, function(e, specialServices, folioId, StartDate, FinishDate, pmsVenue) {
        setBreadCrumb(app.localization.roomReservation.specialService.addUpgrade, "#/roomsBooking/specialService/" + folioId + "/" + StartDate + "/" + FinishDate);

        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function(a) {
            return a.id == app.views.roomsView.module
        }));


        if (specialServices.InventoriedSpecialServices && specialServices.InventoriedSpecialServices.PMSSpecialService) {
          $.each($.wrapArray(specialServices.InventoriedSpecialServices.PMSSpecialService), function(k,v){
            v._isInventoried = true
            specialServices.PMSSpecialService.push(v)
          })
        }

        var newPMSSpecialService = {};
        $.each(specialServices.PMSSpecialService, function(k,v){
            if (!pmsVenue || pmsVenue.GuestNoteServiceName != v.PMSSpecialServiceName) {
                if (v.IsCharged=='1') {
                    if (v._isInventoried == true) {
                      var theDate = Date.parseExact(v.Date, "yyyy-MM-ddhhmmss")
                        , maxQty = Number(v.RemainingQty)
                      v.dateList = [];
                      maxQty && v.dateList.push({
                          human:theDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                          machine:theDate.toString("yyyy-MM-dd"),
                          maxQty:maxQty
                        });
                    } else {
                      var startDate = Date.parseExact(StartDate, "yyyy-MM-dd"),
                        endDate = Date.parseExact(FinishDate, "yyyy-MM-dd");
                      v.dateList = [];
                      for (var theDate = startDate.clone(); theDate < endDate; theDate.add(1).day()) {
                        v.dateList.push({
                          human:theDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                          machine:theDate.toString("yyyy-MM-dd")
                        });
                      }
                    }
                } else {
                    if (v._isInventoried == true && Number(v.RemainingQty)==0) {
                        v._void = true;
                    }
                }
                if (!v.PMSSpecialServiceCategory) {
                    v.PMSSpecialServiceCategory="___";
                }
                if (newPMSSpecialService[v.PMSSpecialServiceName]) {
                  if (v.dateList && v.dateList.length) {
                    if (newPMSSpecialService[v.PMSSpecialServiceName].dateList) {
                      newPMSSpecialService[v.PMSSpecialServiceName].dateList.push(v.dateList[0])
                    } else {
                      newPMSSpecialService[v.PMSSpecialServiceName].dateList = v.dateList
                    }
                  }
                  if (v._void) newPMSSpecialService[v.PMSSpecialServiceName]._void = true;
                } else {
                  newPMSSpecialService[v.PMSSpecialServiceName] = v;
                  newPMSSpecialService[v.PMSSpecialServiceName].hasPrice = v.Price
                      && (v.Price!="0.00");
                  Customization.roomsBooking.showSpecialServicePriceIncludingSurcharges
                      && newPMSSpecialService[v.PMSSpecialServiceName].PriceWithSurcharges
                      && (newPMSSpecialService[v.PMSSpecialServiceName].Price = newPMSSpecialService[v.PMSSpecialServiceName].PriceWithSurcharges);
                }
            }
        });
        newPMSSpecialService = _.filter(newPMSSpecialService,function(x){return !x._void})
        specialServices.PMSSpecialService = _.groupBy(newPMSSpecialService, 'PMSSpecialServiceCategory');

        //adjusting the format for hogan template iteration
        var customizedSpecialServices = [],
			numberOfCategories = 0;
        $.each(specialServices.PMSSpecialService, function (i,v){
			customizedSpecialServices.push( {name:i, val:v} );
			numberOfCategories++;
		});
        specialServices.PMSSpecialService = customizedSpecialServices;

        $('#nav').html(navbarTpl({
            Customization: app.customization,
            Localization: app.localization,
            services: app.data.serviceTypes,
            languages: app.data.languageNames,
            siteName: app.localization.siteName,
            backLink: app.customization.serverURL
        }));

        $('#main').html(contentTpl({
            Localization: app.localization,
            bannerMessage: app.localization.roomReservation.marketing.bannerMessage,
            service: service
        }));

        $('#content').html(pmsSpecialServiceTpl({
            Localization: app.localization,
            specialServices: specialServices,
            folioId: folioId,
			numberOfCategories: numberOfCategories
        }));

        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs': app.data.breadCrumbs.rooms
        }))

        commonViewHelper.updateNavBar(service, app.language, app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance, {})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepPMSSpecialSerivceForm();
    });

        roomsView.event.listen('requestPmsVenueSelection', roomsView, function(e, pmsVenues){
            var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
                return a.id==app.views.roomsView.module
            }));
            app.data.breadCrumbs.rooms = [{name:app.localization.roomReservation.getPMSVenues.title,url:"#/roomsBooking",last:true}]
            /*if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
                pmsVenues = _.filter(pmsVenues,function(x){
                    return _.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId }) || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
                })
                if (pmsVenues.length==0) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed,
                        message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.redirect('summary','',[]);
                    return;
                }
            }*/
            $('#nav').html( navbarTpl( {
                Customization:app.customization,
                Localization : app.localization,
                services : app.data.serviceTypes,
                languages : app.data.languageNames,
                siteName : app.localization.siteName,
                backLink : app.customization.serverURL
            }) );
            $('#main').html( contentTpl( {
                Localization : app.localization,
                services : app.data.serviceTypes,
                bannerMessage : app.localization.roomReservation.marketing.bannerMessage,
                siteName : app.localization.siteName,
                backLink : app.customization.serverURL,
                service : service
            }) );
            console.log(pmsVenues, service)
            $('#content').html( pmsVenuesListTpl( {
                pmsVenues : app.data.pmsVenues
            }));
            $('#content').html( pmsVenuesListTpl( {
                Customization:app.customization,
                Localization : app.localization,
                pmsVenues : pmsVenues,
                showitem: /*$.firstOrOnly(pmsVenues).VenueId*/
                        $.isArray(pmsVenues) && pmsVenues.length==1
                            ? $.firstOrOnly(pmsVenues).VenueId : ""
            }));
            $('#breadcrumbs').html( breadcrumbsTpl({
                'breadCrumbs':app.data.breadCrumbs.rooms
            }) )
            commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
            commonViewHelper.showMessages();
        });

        roomsView.event.listen('requestBookingDetailSelection', roomsView, function(e, pmsVenues, arrivalDate, departureDate, dayGuest, pmsNumAdults, pmsNumYouth, pmsNumChildren, pmsNumJrChildren, pmsPromoCode){
            setBreadCrumb(app.localization.roomReservation.datesAndOccupants.title,"#/roomsBooking/venue/"+app.models.roomsModel.getSelectedValue("pmsVenues"));
            var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
                return a.id==app.views.roomsView.module
            }));
            $('#nav').html( navbarTpl( {
                Customization:app.customization,
                Localization : app.localization,
                services : app.data.serviceTypes,
                languages : app.data.languageNames,
                siteName : app.localization.siteName,
                backLink : app.customization.serverURL
            }) );
            $('#main').html( contentTpl( {
                Localization : app.localization,
                bannerMessage : app.localization.roomReservation.marketing.bannerMessage,
                service : service
            }) );
            $('#content').html( pmsDatesForm( {
                Customization:app.customization,
                Localization : app.localization,
                showmore: app.customization.roomsBooking.showRateScreenMoreButton &&
                    ( app.customization.roomsBooking.showpmsNumYouth
                    || app.customization.roomsBooking.showpmsNumChildren
                    || app.customization.roomsBooking.showpmsNumJrChildren
                    || app.customization.roomsBooking.showpmsPromoCode ),
                venue: pmsVenues,
                dayGuest: dayGuest,
                pmsNumAdults:pmsNumAdults,
                pmsNumYouth:pmsNumYouth,
                pmsNumChildren:pmsNumChildren,
                pmsNumJrChildren:pmsNumJrChildren,
                pmsPromoCode:pmsPromoCode,
                dayGuestAndOnlyOne : app.customization.roomsBooking.dayGuestOnlyOne && dayGuest
            } ));
            $('#breadcrumbs').html( breadcrumbsTpl({
                'breadCrumbs':app.data.breadCrumbs.rooms
            }) )
            commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
            commonViewHelper.showMessages();
            commonViewHelper.prepPMSInputForm(pmsVenues && pmsVenues.VenueId, arrivalDate, departureDate, dayGuest);
        });

        roomsView.event.listen('updateDayRoomTypeData', roomsView, function(e, rateType, roomTypes){
            commonViewHelper.updateDayRoomTypeData(rateType, roomTypes);
        });

        roomsView.event.listen('updateRateCalendar', roomsView, function(e, pmsVenues){
            commonViewHelper.updateRateCalendar(null,pmsVenues);
        });

        roomsView.event.listen('updateRoomTypeDetails', roomsView, function(e, PMSRoomTypeDetails){
            commonViewHelper.updateRoomTypeDetails(PMSRoomTypeDetails);
        });

        roomsView.event.listen('updateRateDetails', roomsView, function(e, PMSRateDetails){
            commonViewHelper.updateRateDetails(PMSRateDetails);
        });

        roomsView.event.listen('roomTypeDataReady', roomsView, function(e){
            commonViewHelper.roomTypeDataReady();
        });

        roomsView.event.listen('requestPmsRateSelection', roomsView, function(e, pmsArrivalDate, pmsDepartureDate, pmsNumAdults, pmsNumYouth, pmsNumChildren, pmsNumJrChildren, pmsPromoCode, PMSRateType, dayGuest){
            setBreadCrumb(app.localization.roomReservation.packageSelection.title,"#/roomsBooking/rate/"+pmsArrivalDate+'/'+pmsDepartureDate+'/'+pmsNumAdults+'/'+pmsNumYouth+'/'+pmsNumChildren+'/'+pmsNumJrChildren+'/'+pmsPromoCode);

            var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
                return a.id==app.views.roomsView.module
            }));
            if (app.customization.roomsBooking.sortPackagesByName) {
                PMSRateType = _.sortBy(PMSRateType,function(x){ return x.PMSRateTypeDesc });
                if (app.customization.roomsBooking.sortPackagesByName == "DESC") {
                    PMSRateType.reverse();
                }
            }
            if (app.customization.roomsBooking.filterByMaximumLengthOfStay) {
                var arrivalDate = Date.parseExact(pmsArrivalDate,'yyyy-MM-dd000000'),
                    departureDate = Date.parseExact(pmsDepartureDate,'yyyy-MM-dd000000'),
                    lengthOfStay = Math.round((departureDate - arrivalDate)/1000/60/60/24);
                PMSRateType = _.filter(PMSRateType,function(x){ return !(x.MaximumLengthOfStay>0) || x.MaximumLengthOfStay >= lengthOfStay });
                if (PMSRateType.length==0) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.roomReservation.datesAndOccupants.err.noMatchingAvailability,
                        message: '' //r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.redirect('roomsBooking',((!!dayGuest) ? 'dayvenue' : 'venue'),[app.models.roomsModel.getSelectedValue('pmsVenues'),pmsArrivalDate.substr(0,10),pmsDepartureDate.substr(0,10), pmsNumAdults, pmsNumYouth, pmsNumChildren, pmsNumJrChildren, pmsPromoCode])
                    return;
                }
            }
            $('#nav').html( navbarTpl( {
                Customization:app.customization,
                Localization : app.localization,
                services : app.data.serviceTypes,
                languages : app.data.languageNames,
                siteName : app.localization.siteName,
                backLink : app.customization.serverURL
            }) );
            $('#main').html( contentTpl( {
                Localization : app.localization,
                bannerMessage : app.localization.roomReservation.marketing.bannerMessage,
                service : service
            }) );
            console.log(PMSRateType, service)
            $('#content').html( pmsRatesList( {
                Customization:app.customization,
                Localization : app.localization,
                pmsRates : PMSRateType,
                showitem : // $.firstOrOnly(PMSRateType).PMSRateTypeId
                        $.isArray(PMSRateType) && PMSRateType.length==1
                            ? $.firstOrOnly(PMSRateType).PMSRateTypeId : ""
            }));
            $('#breadcrumbs').html( breadcrumbsTpl({
                'breadCrumbs':app.data.breadCrumbs.rooms
            }) )
            commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
            commonViewHelper.showMessages();
            commonViewHelper.prepPMSRateForm();
        });

        roomsView.event.listen('requestPmsRoomTypeSelection', roomsView, function(e, rateType, roomTypes){
            setBreadCrumb(app.localization.roomReservation.roomTypeSelection.title, "#/roomsBooking/roomtype/"+rateType );

            var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
                return a.id==app.views.roomsView.module
            }));
            if (app.customization.roomsBooking.sortRoomTypesByName) {
                roomTypes = _.sortBy(roomTypes,function(x){ return x.PMSRoomType && x.PMSRoomType.PMSRoomTypeDesc });
                if (app.customization.roomsBooking.sortRoomTypesByName == "DESC") {
                    roomTypes.reverse();
                }
            }
            if (app.customization.roomsBooking.sortRoomTypesByPrice) {
                roomTypes = _.sortBy(roomTypes,function(x){ return +x.TotalStayRate });
                if (app.customization.roomsBooking.sortRoomTypesByPrice == "DESC") {
                    roomTypes.reverse();
                }
            }
            $('#nav').html( navbarTpl( {
                Customization:app.customization,
                Localization : app.localization,
                services : app.data.serviceTypes,
                languages : app.data.languageNames,
                siteName : app.localization.siteName,
                backLink : app.customization.serverURL
            }) );
            $('#main').html( contentTpl( {
                Localization : app.localization,
                bannerMessage : app.localization.roomReservation.marketing.bannerMessage,
                service : service
            }) );
            console.log(roomTypes, service)
            $('#content').html( pmsRoomTypeList( {
                Customization:app.customization,
                Localization : app.localization,
                pmsRoomTypes : roomTypes,
                showitem :$.isArray(roomTypes) && roomTypes.length==1 ? $.firstOrOnly(roomTypes).PMSRoomType.PMSRoomTypeId : ""
            }));
            $('#breadcrumbs').html( breadcrumbsTpl({
                'breadCrumbs':app.data.breadCrumbs.rooms
            }) )
            commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
            commonViewHelper.showMessages();
            commonViewHelper.prepPMSRateForm();
        });

        roomsView.event.listen('requestPmsRoomSelection', roomsView, function(e, roomType, rooms){
            setBreadCrumb(app.localization.roomReservation.roomTypeSelection.title, "#/roomsBooking/rooms/"+roomType );

            var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
                return a.id==app.views.roomsView.module
            }));
            $('#nav').html( navbarTpl( {
                Customization:app.customization,
                Localization : app.localization,
                services : app.data.serviceTypes,
                languages : app.data.languageNames,
                siteName : app.localization.siteName,
                backLink : app.customization.serverURL
            }) );
            $('#main').html( contentTpl( {
                Localization : app.localization,
                bannerMessage : app.localization.roomReservation.marketing.bannerMessage,
                service : service
            }) );
            console.log(rooms, service)
            $('#content').html( pmsRoomList( {
                Customization:app.customization,
                Localization : app.localization,
                pmsRooms : rooms,
                pmsRoomType: roomType,
                showitem : // $.firstOrOnly(roomTypes).PMSRoomType.PMSRoomTypeId
                    $.isArray(rooms) && rooms.length==1
                        ? $.firstOrOnly(rooms).PMSRoomNumber : ""
            }));
            $('#breadcrumbs').html( breadcrumbsTpl({
                'breadCrumbs':app.data.breadCrumbs.rooms
            }) )
            commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
            commonViewHelper.showMessages();
            commonViewHelper.prepPMSRateForm();
        });

        roomsView.event.listen('requestBookingConfirmation', roomsView, function(e, pmsRoomType, bookingParams, roomTypeDetails, pmsRoomNumber){
            setBreadCrumb(app.localization.roomReservation.confirmation.title,"#/roomsBooking/bookroom/"+pmsRoomType);
            var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
                return a.id==app.views.roomsView.module
            }));
            var stayDuration= Math.round((Date.parse(bookingParams.DepartureDate.substr(0,10)) - Date.parse(bookingParams.ArrivalDate.substr(0,10)))/ 24/60/60/1000);
            var totalAmount = roomTypeDetails.TotalStayRate || (stayDuration * roomTypeDetails.AverageRate);
            var rateType = _.find(bookingParams.PMSLastQuery,function(o){return o.PMSRateTypeId == bookingParams.PMSRateType});

            $.extend(bookingParams, {stayDuration: stayDuration,totalAmount:totalAmount,rateType:rateType});

            $('#nav').html( navbarTpl( {
                Customization:app.customization,
                Localization : app.localization,
                services : app.data.serviceTypes,
                languages : app.data.languageNames,
                siteName : app.localization.siteName,
                backLink : app.customization.serverURL
            }) );
            $('#main').html( contentTpl( {
                Localization : app.localization,
                bannerMessage : app.localization.roomReservation.marketing.bannerMessage,
                service : service
            }) );
            $('#content').html( pmsBookConfirm( {
                Localization : app.localization,
                Customization : app.customization,
                bookingParams : $.extend({},bookingParams,{PromoCode:(!bookingParams.PromoCode&&app.customization.roomsBooking.dayGuestPromoCode===false?'dontmatchemptypromocode':bookingParams.PromoCode)}),
                roomTypeDetails: roomTypeDetails,
                userLoggedIn: app.data.userLoggedIn,
                FirstName : app.data.FirstName,
                LastName : app.data.LastName,
                RoomNumber: pmsRoomNumber,
                noTotal : (bookingParams.stayDuration == 1) || app.customization.roomsBooking.suppressDailyRate

            } ));
            $('#breadcrumbs').html( breadcrumbsTpl({
                'breadCrumbs':app.data.breadCrumbs.rooms
            }) )
            commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
            commonViewHelper.showMessages();
            commonViewHelper.prepPMSConfirmForm();
        });

        return window.app.views.roomsView = roomsView;
});
