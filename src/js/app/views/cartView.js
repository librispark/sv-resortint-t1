
/*
 * views/cartView.js
 * Cart View
 */

define( [
    'lib/event',
    'app/views/commonViewHelper',
    'Handlebars',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/breadcrumbs',
    'hbs!app/views/templates/content',
    'hbs!app/views/templates/cartSummary',
    'hbs!app/views/templates/bookingHistory',
    'hbs!app/views/templates/cartCCPaymentForm',
    'hbs!app/views/templates/cartCCPaymentResult',
    'hbs!app/views/templates/processingPPPayment',
    'hbs!app/views/templates/cartYPForm',
    'hbs!app/views/templates/redirectYP',
    'hbs!app/views/templates/redirectI4G',
    'hbs!app/views/templates/analytics',
    'hbs!app/views/templates/acceptTermsModal',
    'hbs!app/views/templates/cartGCRedeem',
    'bootstrap',
    'app/views/templates/helpers/escapeJSString'
], function( Event, commonViewHelper, Handlebars, navbarTpl, breadcrumbsTpl, contentTpl, cartSummaryTpl, bookingHistoryTpl, cartCCPaymentFormTpl, cartCCPaymentResultTpl, processingPPPaymentTpl, cartYPFormTpl, redirectYPTpl, redirectI4GTpl, analyticsTpl, acceptTermsModalTpl, cartGCRedeemTpl ){
    var cartView = {
        app : app,
        event: $.extend({},Event),
        module : "summary"
    };
    var setBreadCrumb = function( crumbText, crumbLink ) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.cart = app.data.breadCrumbs.cart || [];
        var spliceCrumbsAt = -1,
            existingCrumb = $.grep(app.data.breadCrumbs.cart,function(crumb,index){
                if (crumb.name==crumbText) {
                    spliceCrumbsAt = index;
                    return true;
                }
                return false;
            }),
            currentCrumb = {name:crumbText,url:crumbLink};

        app.data.breadCrumbs.cart = existingCrumb.length ?
            $.merge(app.data.breadCrumbs.cart.slice(0,spliceCrumbsAt),[currentCrumb]) :
            $.merge(app.data.breadCrumbs.cart,[currentCrumb]);

        for(var i=0;i<app.data.breadCrumbs.cart.length;i++) {
            app.data.breadCrumbs.cart[i].last = i==(app.data.breadCrumbs.cart.length-1);
        }
    };

    cartView.event.listen('showCartContents', cartView, function(e, cartData, specialServices){
        console.log('reading service types');
        var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        var golfGrouped = {},
            newItems = [],
            balance = app.models.systemModel.getSelectedValue('folioBalance','FolioBalance',{WebFolioId:app.data.WebFolioId,SessionId:app.data.SessionId}),
            guestNoteSpecialService = null;
        _.each(cartData.WebFolioItem, function(v,k,l){
            if (v.Category=="Golf") {
                if (golfGrouped[v.FolioId]) {
                    golfGrouped[v.FolioId].Amount += +v.Amount;
                    // golfGrouped[v.FolioId].FolioPayments += +v.FolioPayments;
                    golfGrouped[v.FolioId].Players += 1;
                } else {
                    golfGrouped[v.FolioId] = v;
                    golfGrouped[v.FolioId].Players = 1;
                    golfGrouped[v.FolioId].EachAmount = +v.Amount;
                    golfGrouped[v.FolioId].Amount = +v.Amount;
                    // golfGrouped[v.FolioId].FolioPayments = +v.FolioPayments;

                }

                delete l[k];
            } else if (v.specialServicesAvailable) {
                var newSpecialServicesAvailable = [];
                _.each(v.specialServicesAvailable, function(vv,kk,ll){
                    if (vv.IsCharged=='1') {
                        var startDate = Date.parseExact(v.StartDate, "yyyy-MM-ddHHmmss"),
                            endDate = Date.parseExact(v.FinishDate, "yyyy-MM-ddHHmmss");
                        vv.dateList = [];
                        for (var theDate = startDate.clone(); theDate < endDate; theDate.add(1).day()) {
                            vv.dateList.push({
                                human:theDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                                machine:theDate.toString("yyyy-MM-dd")
                            });
                        }
                    }
                    if (v.pmsVenue && v.pmsVenue.GuestNoteServiceName == vv.PMSSpecialServiceName) {
                        v.guestNoteSpecialService = vv;
                    } else {
                        newSpecialServicesAvailable.push(vv);
                    }
                });
                v.specialServicesAvailable = newSpecialServicesAvailable;
                if (_.any(app.data.pmsDayBookings,function(x){return x==v.FolioId})) {
                    v.isDayBooking = true;
                }
                v.PreDepositAmount = v.FolioTotal;
                newItems.push(v);
            } else {
                if (v.Category=="Hotel" && _.any(app.data.pmsDayBookings,function(x){return x==v.FolioId})) {
                    v.isDayBooking = true;
                }
                v.PreDepositAmount = v.FolioTotal;
                if (v.Category=="Spa"||v.Category=="Ski") {
                    v.PreDepositAmount = v.Amount;
                    v.Amount = (v.FolioPayments == 0) ? v.Amount : v.Amount / v.FolioTotal * v.FolioPayments
                }
                if (v.Category=="Ski"&&v.FinishDate) {
                    v.FinishDate = Date.parseExact(v.FinishDate.substr(0,10), "yyyy-MM-dd").add(-1).days().toString('yyyy-MM-dd') + v.FinishDate.substr(10)
                }
                

                newItems.push(v);
            }
        });
        _.each(golfGrouped, function(v,k,l){
            v.PreDepositAmount = v.Amount;
            v.Amount = (v.FolioPayments == 0) ? v.Amount : v.Amount / v.FolioTotal * v.FolioPayments
            newItems.push(v);
        });
        cartData.WebFolioItem = newItems;
        app.data.breadCrumbs.cart = [{name:app.localization.bookingSummary.cartName,url:"#/summary",last:true}];
        if (Customization.roomsBooking.forceSimple == undefined) {
            Customization.roomsBooking.forceSimple = true;
        }
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.bookingSummary.marketing.bannerMessage,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( cartSummaryTpl( {
            Localization : app.localization,
            Customization:app.customization,
            userLoggedIn : app.data.userLoggedIn,
            cartData: cartData,
            service : service,
            serviceTypes : app.data.serviceTypes,
            balance: balance,
            dontShowPayButton: (
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
                                ) ? 'yes' : 'no',
            dummy: "2000-01-01000000",
            itemCount: !app.customization.showAddMoreOnlyOnBottomOfBookingSummary && cartData && cartData.WebFolioItem && (cartData.WebFolioItem.length >= 5),
            pmsBookings: _.sortBy(app.data.pmsBookings, function (x) { return x.date }),
            spaBookings: _.sortBy(app.data.spaBookings, function (x) { return x.date }),
            golfBookings: _.sortBy(app.data.golfBookings, function (x) { return x.date }),
            anyFutureBookings: (app.data.pmsBookingFuture && app.data.pmsBookingFuture.length > 0) || (app.data.spaBookingFuture && app.data.spaBookingFuture.length > 0) || (app.data.golfBookingFuture && app.data.golfBookingFuture.length > 0),
            anyPastBookings: (app.data.pmsBookingPast && app.data.pmsBookingPast.length > 0) || (app.data.spaBookingPast && app.data.spaBookingPast.length > 0) || (app.data.golfBookingPast && app.data.golfBookingPast.length > 0),
            bookingHistoryCollapseHidden: app.data.bookingHistoryCollapseHidden,
            guestNoteSpecialService: guestNoteSpecialService,
            redeemedGCs: app.data.redeemedGCs && app.data.redeemedGCs[app.data.WebFolioId] || [],
            anyGCEnabled: (app.customization.payment.redeemGCbyGCID || app.customization.payment.redeemGCbyGCIDandRefNum)
                            || (app.customization.payment.redeemGCbyGCNum || app.customization.payment.redeemGCbyGCNumandRefNum)
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);

        commonViewHelper.prepCartSummary();
        commonViewHelper.showMessages();
        if (app.data.pmsBookings) {
            var rates = [],
                roomTypes = [];
            $.each(app.data.pmsBookings,function(i,x){
                if (x.Future) {
                    rates.push(x.PMSRateId);
                    roomTypes.push(x.PMSRoomType)
                }
            });
            rates = _.uniq(rates);
            roomTypes = _.uniq(roomTypes);
            $.each(rates, function(i,x){
                app.dispatcher.dispatch('roomsBooking', 'ratedetails',[x,'updateRateDetails']);
            })
            $.each(roomTypes, function(i,x){
                app.dispatcher.dispatch('roomsBooking', 'roomtypedetails',[x,'updateRoomTypeDetails']);
            })
        }
    });

    cartView.event.listen('showAnalytics', cartView, function(e, cartData, folioBalance, customer){
        var golfGrouped = {},
            newItems = [],
            balance = app.models.systemModel.getSelectedValue('folioBalance','FolioBalance',{WebFolioId:app.data.WebFolioId,SessionId:app.data.SessionId}),
            guestNoteSpecialService = null,
            grandTotal = 0;
        _.each(cartData.WebFolioItem, function(v,k,l){
            if (v.Category=="Golf") {
                if (golfGrouped[v.FolioId]) {
                    golfGrouped[v.FolioId].Amount += +v.Amount;
                    // golfGrouped[v.FolioId].FolioPayments += +v.FolioPayments;
                    golfGrouped[v.FolioId].Players += 1;
                } else {
                    golfGrouped[v.FolioId] = v;
                    golfGrouped[v.FolioId].Players = 1;
                    golfGrouped[v.FolioId].Amount = +v.Amount;
                    golfGrouped[v.FolioId].EachAmount = golfGrouped[v.FolioId].Amount / golfGrouped[v.FolioId].Players;
                    // golfGrouped[v.FolioId].FolioPayments = +v.FolioPayments;
                }

                delete l[k];
                var startDate = Date.parseExact(v.StartDate, "yyyy-MM-ddHHmmss"),
                    today = new Date();
                golfGrouped[v.FolioId].pace = Math.round((startDate-today)/(1000*60*60*24));
                golfGrouped[v.FolioId].startDate = startDate;
            } else {
                if (v.StartDate) {
                    var startDate = Date.parseExact(v.StartDate, "yyyy-MM-ddHHmmss"),
                        today = new Date();
                    v.pace = Math.round((startDate-today)/(1000*60*60*24));
                    v.startDate = startDate;
                }
                if (v.Category=="Hotel" ) { 
                    if( _.any(app.data.pmsDayBookings,function(x){return x==v.FolioId})) {
                        v.isDayBooking = true;
                    }
                    var endDate = Date.parseExact(v.FinishDate, "yyyy-MM-ddHHmmss");
                    v.nights = Math.round((endDate-startDate)/(1000*60*60*24));
                    v.endDate = endDate;
                }
                v.PreDepositAmount = v.FolioTotal;
                if (v.Category=="Spa") {
                    v.PreDepositAmount = v.Amount;
                    v.Amount = (v.FolioPayments == 0) ? v.Amount : v.Amount / v.FolioTotal * v.FolioPayments
                }
                grandTotal += +v.PreDepositAmount;
                newItems.push(v);
            }
        });
        _.each(golfGrouped, function(v,k,l){
            v.PreDepositAmount = v.Amount;
            v.Amount = (v.FolioPayments == 0) ? v.Amount : v.Amount / v.FolioTotal * v.FolioPayments
            grandTotal += +v.PreDepositAmount;
            newItems.push(v);
        });
        cartData.WebFolioItem = newItems;
        var itemData = {},
            itemsByCategory = {};
        _.each(newItems, function(v,k,l){
            var sku = (v.Category=='Hotel' ? 'Room-'+v.RateDetails+'-'+v.Details : v.Category+'-'+v.Details);
            if (!!itemData[sku]) {
                var prevPrice = itemData[sku].price,
                    prevQty = itemData[sku].qty,
                    newQty = +prevQty + (v.Category=='Golf' ? +v.Players : 1),
                    newPrice = ((+prevPrice * +prevQty) + ((v.Category=='Golf' ? +v.Players : 1) * (v.Category=='Golf' ? +v.EachAmount : +v.PreDepositAmount)))/(newQty)
                itemData[sku].price = newPrice;
                itemData[sku].qty = newQty;
                if (v.pace && itemData[sku].pace>v.pace) itemData[sku].pace = v.pace;
                if (v.startDate && itemData[sku].startDate>v.startDate) itemData[sku].startDate = v.startDate;
                if (v.endDate && itemData[sku].endDate<v.endDate) itemData[sku].endDate = v.endDate;
                if (v.nights) {
                    itemData[sku].nights += +v.nights;
                    itemData[sku].adr = itemData[sku].price / itemData[sku].nights;
                }
            } else {
                itemData[sku] = {
                    txnid : v.WebFolioId,
                    sku : sku,
                    qty : v.Category=='Golf' ? +v.Players : 1,
                    price : v.Category=='Golf' ? +v.EachAmount : +v.PreDepositAmount,
                    name : v.Category=='Hotel' ? v.RateDetails : v.Details,
                    cat : v.Location,
                    category : v.Category
                }
                if (v.Category=='Hotel') itemData[sku].roomtype = v.Details
                if (v.pace) itemData[sku].pace = v.pace;
                if (v.startDate) itemData[sku].startDate = v.startDate;
                if (v.endDate) itemData[sku].endDate = v.endDate;
                if (v.nights) {
                    itemData[sku].nights = +v.nights;
                    itemData[sku].adr = itemData[sku].price / itemData[sku].nights;
                }
            }
        });
        _.each(itemData, function(v,k,l){
            if (!itemsByCategory[v.Category]) {
                itemsByCategory[v.Category] = _.extend({},v);
                itemsByCategory[v.Category].qty = +v.qty;
                itemsByCategory[v.Category].avgPrice = itemsByCategory[v.Category].total = +v.price;
                if (v.pace && itemsByCategory[v.Category].pace>v.pace) itemsByCategory[v.Category].pace = v.pace;
                if (v.startDate && itemsByCategory[v.Category].startDate>v.startDate) itemsByCategory[v.Category].startDate = v.startDate;
                if (v.endDate && itemsByCategory[v.Category].endDate<v.endDate) itemsByCategory[v.Category].endDate = v.endDate;
                if (v.nights) {
                    itemsByCategory[v.Category].nights = +v.nights;
                    itemsByCategory[v.Category].adr = itemsByCategory[v.Category].total / itemsByCategory[v.Category].nights;
                }
                delete itemsByCategory[v.Category].price;
            } else {
                itemsByCategory[v.Category].total += +v.price;
                itemsByCategory[v.Category].qty += +v.qty;
                itemsByCategory[v.Category].avgPrice = itemsByCategory[v.Category].total / itemsByCategory[v.Category].qty;
                itemsByCategory[v.Category].name = v.name;
                if (v.roomtype) itemsByCategory[v.Category].roomtype = v.roomtype;
                if (v.pace) itemsByCategory[v.Category].pace = v.pace;
                if (v.startDate) itemsByCategory[v.Category].startDate = v.startDate;
                if (v.endDate) itemsByCategory[v.Category].endDate = v.endDate;
                if (v.nights) {
                    itemsByCategory[v.Category].nights += +v.nights;
                    itemsByCategory[v.Category].adr = itemsByCategory[v.Category].total / itemsByCategory[v.Category].nights;
                }
                delete itemsByCategory[v.Category].price;
            }
        });
        app.data.breadCrumbs.cart = [{name:app.localization.bookingSummary.cartName,url:"#/summary",last:true}];
        if (Customization.roomsBooking.forceSimple == undefined) {
            Customization.roomsBooking.forceSimple = true;
        }
        var storeName = '';
        try {
            storeName = cartData.WebFolioItem[0].pmsVenue.PropertyName;
        } catch (e) {
            storeName = app.localization.siteName;
        }
        var tpldata = {
            storeName : storeName,
            Customization:app.customization,
            rawCartData: cartData,
            cartData: _.values(itemData),
            itemsByCategory: _.values(itemsByCategory),
            appData: app.data,
            balance: grandTotal,
            customer: customer,
            customerCity: _.filter(_.uniq(_.pluck($.firstOrOnly(customer.Customer).Address,'City')), function(x){return !!x})[0] || "Unknown",
            customerState: _.filter(_.uniq(_.pluck($.firstOrOnly(customer.Customer).Address,'StateProv')), function(x){return !!x})[0] || "Unknown",
            customerCountry: _.filter(_.uniq(_.pluck($.firstOrOnly(customer.Customer).Address,'Country')), function(x){return !!x})[0] || "Unknown",
            customerPostCode: _.filter(_.uniq(_.pluck($.firstOrOnly(customer.Customer).Address,'PostCode')), function(x){return !!x})[0] || "Unknown"
        };
        try {
            if (app.localization.paymentProcessing.analyticsCustomTemplate) {
                switch (typeof app.localization.paymentProcessing.analyticsCustomTemplate) {
                    case "string":
                        var customTemplateTpl = Handlebars.compile(app.localization.paymentProcessing.analyticsCustomTemplate);
                        tpldata.analyticsCustomTemplate = customTemplateTpl(tpldata);
                        break;
                    case "function":
                        tpldata.analyticsCustomTemplate = app.localization.paymentProcessing.analyticsCustomTemplate.call(this,tpldata);
                        break;
                    default:
                        tpldata.analyticsCustomTemplate = '';
                }
            } else {
                tpldata.analyticsCustomTemplate = '';
            }
        } catch(err) {
            tpldata.analyticsCustomTemplate = '<!--' + err.message + ' -->';
        }
        $('body').append( analyticsTpl( tpldata ));
    });

    cartView.event.listen('showBookingHistory', cartView, function(e){
        var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        app.data.breadCrumbs.cart = [{name:app.localization.bookingSummary.cartName,url:"#/summary",last:true}];
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.bookingSummary.marketing.bannerMessage,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( bookingHistoryTpl( {
            Localization : app.localization,
            Customization:app.customization,
            service : service,
            serviceTypes : app.data.serviceTypes,
            pmsBookings: _.sortBy(app.data.pmsBookings, function (x) { return -x.date }),
            spaBookings: _.sortBy(app.data.spaBookings, function (x) { return -x.date }),
            golfBookings: _.sortBy(app.data.golfBookings, function (x) { return -x.date })
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        if (app.data.pmsBookings) {
            var rates = [],
                roomTypes = [];
            $.each(app.data.pmsBookings,function(i,x){
                if (x.Past) {
                    rates.push(x.PMSRateId);
                    roomTypes.push(x.PMSRoomType)
                }
            });
            rates = _.uniq(rates);
            roomTypes = _.uniq(roomTypes);
            $.each(rates, function(i,x){
                app.dispatcher.dispatch('roomsBooking', 'ratedetails',[x,'updateRateDetails']);
            })
            $.each(roomTypes, function(i,x){
                app.dispatcher.dispatch('roomsBooking', 'roomtypedetails',[x,'updateRoomTypeDetails']);
            })
        }
    });

    cartView.event.listen('updateMessages', cartView, function(e){
        var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        $('#alerts .alert').remove()
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        $('#cartCCFormSubmit').button('reset');
    });

    cartView.event.listen('showCCPaymentForm', cartView, function(e, cartData){
            var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        var years = [],
            thisYear = +Date.today().toString("yyyy");
        for (i=0; i<10; i++) {
            years.push(thisYear + i);
        }
        app.data.breadCrumbs.cart = [{name:app.localization.paymentProcessing.sectionTitle,url:"#/summary/ccPayment",last:true}];
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.bookingSummary.marketing.bannerMessage,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( cartCCPaymentFormTpl ( {
            Localization: app.localization,
            Customization: app.customization,
            cartData: cartData,
            service : service,
            serviceTypes : app.data.serviceTypes,
            FirstName: app.data.FirstName,
            LastName: app.data.LastName,
            email: app.data.CustomerEmail,
            balance: app.models.systemModel.getSelectedValue('folioBalance','FolioBalance',{WebFolioId:app.data.WebFolioId,SessionId:app.data.SessionId}),
            years: years,
            dummy: "2000-01-01000000"
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.prepCCPaymentForm();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    cartView.event.listen('showRedeemGCForm', cartView, function(e, cartData){
            var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        var years = [],
            thisYear = +Date.today().toString("yyyy");
        for (i=0; i<10; i++) {
            years.push(thisYear + i);
        }
        app.data.breadCrumbs.cart = [{name:app.localization.paymentProcessing.gcRedeemTitle,url:"#/summary/redeemGC",last:true}];
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.bookingSummary.marketing.bannerMessage,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( cartGCRedeemTpl ( {
            Localization: app.localization,
            Customization: app.customization,
            bothGCTypes: (app.customization.payment.redeemGCbyGCID || app.customization.payment.redeemGCbyGCIDandRefNum)
                            && (app.customization.payment.redeemGCbyGCNum || app.customization.payment.redeemGCbyGCNumandRefNum),
            eitherGCTypeID: app.customization.payment.redeemGCbyGCID || app.customization.payment.redeemGCbyGCIDandRefNum,
            eitherGCTypeNum: app.customization.payment.redeemGCbyGCNum || app.customization.payment.redeemGCbyGCNumandRefNum
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.prepRedeemGCForm();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    cartView.event.listen('showCCPaymentResult', cartView, function(e, cartData){
        var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        app.data.breadCrumbs.cart = [{name:app.localization.paymentProcessing.sectionTitle,url:"#/summary/",last:true}];
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.bookingSummary.marketing.bannerMessage,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( cartCCPaymentResultTpl ( {
            Localization: app.localization,
            Customization: app.customization,
            cartData: cartData,
            service : service,
            serviceTypes : app.data.serviceTypes,
            FirstName: app.data.FirstName,
            LastName: app.data.LastName,
            email: app.data.CustomerEmail,
            balance: app.models.systemModel.getSelectedValue('folioBalance','FolioBalance',{WebFolioId:app.data.WebFolioId,SessionId:app.data.SessionId}),
            dummy: "2000-01-01000000"
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.prepCCPaymentForm();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    cartView.event.listen('processingPPPayment', cartView, function(e){
        var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        app.data.breadCrumbs.cart = [{name:app.localization.paymentProcessing.sectionTitle,url:"#/summary/",last:true}];
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.paymentProcessing.sectionTitle,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( processingPPPaymentTpl ( {
            Localization: app.localization,
            Customization: app.customization
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.showPPProgressIndicator(app.localization.paymentProcessing.PPPostRedirect);
    });


    cartView.event.listen('showPPProgressIndicator', cartView, function(e,message){
        commonViewHelper.showPPProgressIndicator(message);
    });

    cartView.event.listen('showYPForm', cartView, function(e, cartData){
            var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };

        app.data.breadCrumbs.cart = [{name:app.localization.paymentProcessing.sectionTitle,url:"#/summary/ypPayment",last:true}];
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : Customization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.bookingSummary.marketing.bannerMessage,
            siteName : Customization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( cartYPFormTpl ( {
            Localization: app.localization,
            Customization: $.extend({},app.customization, {requirePaymentAddress:true}), // force requirepaymentaddress to be true so that form requires the fields.
            cartData: cartData,
            service : service,
            serviceTypes : app.data.serviceTypes,
            FirstName: app.data.FirstName,
            LastName: app.data.LastName,
            email: app.data.CustomerEmail,
            balance: app.models.systemModel.getSelectedValue('folioBalance','FolioBalance',{WebFolioId:app.data.WebFolioId,SessionId:app.data.SessionId}),
            dummy: "2000-01-01000000"
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.prepYPForm();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    cartView.event.listen('redirectYP', cartView, function(e, mid,mtr,digest,currency,forwardURL,successURL,failURL,amount,cartData){
        var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        cartData.WebFolioItem
            && (cartData.WebFolioItem = _.map(cartData.WebFolioItem,function(v,k){
                v.key = k+1;
                v.Amount = ((+v.Amount)*100).toFixed(0).toString();
                v.FolioSurcharges = ((+v.FolioSurcharges)*100).toFixed(0).toString();
                return v
            }));
        app.data.breadCrumbs.cart = [{name:app.localization.paymentProcessing.sectionTitle,url:"#/summary/ypPayment",last:true}];
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.bookingSummary.marketing.bannerMessage,
            siteName : Customization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( redirectYPTpl ( {
            mid:mid,
            WebFolioId: app.data.WebFolioId,
			mtr:mtr,
            digest:digest,
            amount: Math.round(amount*100),
            currency:currency,
            forwardURL:forwardURL,
            email: app.data.CustomerEmail,
            successURL:window.location.protocol + '//' + window.location.host + window.location.pathname,
            failURL:window.location.protocol + '//' + window.location.host + window.location.pathname,
            cartData: cartData
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.redirectYP();
    });

    cartView.event.listen('redirectI4G', cartView, function(e,forwardURL){
        var service = {
            id : "summary",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        app.data.breadCrumbs.cart = [{name:app.localization.paymentProcessing.sectionTitle,url:"#/summary/i4gPayment",last:true}];
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.bookingSummary.marketing.bannerMessage,
            siteName : Customization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        $('#content').html( redirectI4GTpl ( {
            forwardURL:forwardURL,
            successURL:window.location.protocol + '//' + window.location.host + window.location.pathname,
            failURL:window.location.protocol + '//' + window.location.host + window.location.pathname
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.cart
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.redirectI4G();
    });

    cartView.event.listen('showTermsModal', cartView, function(e){
        $('#acceptTermsModal').remove();
        $('#main').append(acceptTermsModalTpl({
            Localization : app.localization
        }));
        commonViewHelper.prepTermsModal();
    });

    return window.app.views.cartView = cartView;

});
