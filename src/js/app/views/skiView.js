/*
 * views/skiView.js
 * Ski View
 */

define([
    'lib/event',
    'app/views/commonViewHelper',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/breadcrumbs',
    'hbs!app/views/templates/content',
    'hbs!app/views/templates/skiLocationList',
    'hbs!app/views/templates/skiLiftTicketList',
    'bootstrap'
], function (Event, commonViewHelper, navbarTpl, breadcrumbsTpl, contentTpl, skiLocationListTpl, skiLiftTicketListTpl ) {
    var skiView = {
        app:app,
        event:$.extend({}, Event),
        module:"ski",
        render:function (template, data, breadcrumbs) {

        }
    };

    var setBreadCrumb = function (crumbText, crumbLink) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.ski = app.data.breadCrumbs.ski || [];
        var spliceCrumbsAt = -1,
            existingCrumb = $.grep(app.data.breadCrumbs.ski, function (crumb, index) {
                if (crumb.name == crumbText) {
                    spliceCrumbsAt = index;
                    return true;
                }
                return false;
            }),
            currentCrumb = {name:crumbText, url:crumbLink};

        app.data.breadCrumbs.ski = existingCrumb.length ?
            $.merge(app.data.breadCrumbs.ski.slice(0, spliceCrumbsAt), [currentCrumb]) :
            $.merge(app.data.breadCrumbs.ski, [currentCrumb]);

        for (var i = 0; i < app.data.breadCrumbs.ski.length; i++) {
            app.data.breadCrumbs.ski[i].last = i == (app.data.breadCrumbs.ski.length - 1);
        }
    };

    skiView.event.listen('requestSkiLocationSelection', skiView, function (e, skiLocations) {
        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (a) {
            return a.id == app.views.skiView.module
        }));
        app.data.breadCrumbs.ski = [
            {name:app.localization.ski.title, url:"#/ski", last:true}
        ];
        var skiDate = "",
            locations = [];
        if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.skiPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
            locations = _.filter(skiLocations,function(x){
                return _.any(app.data.skiPropertyIdsInCart, function(y){ return y==x.PropertyId }) || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
            })
            if (app.data.propertyIdsInCart.length == 1 && app.data.skiDateList[app.data.skiPropertyIdsInCart[0]] && app.data.skiDateList[app.data.skiPropertyIdsInCart[0]].length == 1) {
                skiDate = "/" + app.data.skiDateList[app.data.skiPropertyIdsInCart[0]][0];
            }
        } else {
            locations = skiLocations;
        }
        $('#nav').html(navbarTpl({
            Localization:app.localization,
            Customization:app.customization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            services:app.data.serviceTypes,
            bannerMessage:app.localization.ski.marketing.bannerMessage,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL,
            service:service
        }));
        $('#content').html(skiLocationListTpl({
            Localization:app.localization,
            Customization:app.customization,
            skiLocations:locations,
            skiDate:skiDate,
            showitem: //$.firstOrOnly(skiLocations).LocationId
                $.isArray(skiLocations) && skiLocations.length==1
                    ? $.firstOrOnly(skiLocations).LocationId : ""
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.ski
        }))
        commonViewHelper.showMessages();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);

        commonViewHelper.prepPMSRateForm();
    });

    skiView.event.listen('requestSkiLiftTicketSelection', skiView, function (e, skiServices, itemId, location, date, selectedRecipient, user, group) {
        app.data.breadCrumbs.ski = [
            {name:app.localization.ski.location, url:"#/ski", last:true}
        ];

        setBreadCrumb(app.localization.ski.title, "#ski/liftTickets");


        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (arr) {
            return arr.id == 'ski'
        }));

        // PromoLiftTickets
        // LiftTickets.LiftTicket
        var liftTickets = (skiServices.LiftTickets && skiServices.LiftTickets.LiftTicket) ? _.map( skiServices.LiftTickets.LiftTicket, function(x){x.promo=false; x.pass=false; return x} ) : [],
            promoLiftTickets = (skiServices.PromoLiftTickets && skiServices.PromoLiftTickets.LiftTicket) ? _.map( skiServices.PromoLiftTickets.LiftTicket, function(x){x.promo=true; x.pass=false; return x} ) : [],
            
            passes = (skiServices.Passes && skiServices.Passes.Pass) ? _.map( skiServices.Passes.Pass, function(x){x.promo=false; x.pass=true; return x} ) : [],
            promoPasses = (skiServices.PromoPasses && skiServices.PromoPasses.Pass) ? _.map( skiServices.PromoPasses.Pass, function(x){x.promo=true; x.pass=true; return x} ) : [],

            allLiftTickets = _.flatten([liftTickets,promoLiftTickets,passes,promoPasses],true),
            anyLiftTickets = allLiftTickets.length > 0,
            anyPromoLiftTickets = promoLiftTickets.length > 0 || promoPasses.length > 0,
            ticketCategoryNames = _.uniq(_.pluck(liftTickets, 'ItemCategory')).sort(),
            ticketPromoCategoryNames = _.uniq(_.pluck(promoLiftTickets, 'ItemCategory')).sort(),
            passCategoryNames = _.uniq(_.pluck(passes, 'ItemCategory')).sort(),
            passPromoCategoryNames = _.uniq(_.pluck(promoPasses, 'ItemCategory')).sort(),
            /*allCategories = _.sortBy(
                                 _.flatten( [
                                    _.map( promoCategoryNames, function(x){ return {name:x,promo:true} } ),
                                    _.map( categoryNames, function(x){ return {name:x,promo:false} } )
                                 ], true),
                                 function(x) {
                                    return (x.promo ? "1" : "0") + x.name;
                                 }
                             ),*/
            skiDate = Date.parse( date.substr(0,10), 'yyyy-MM-dd' );
            var weekDays = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" }
            categories = _.flatten( [
                    _.map( ticketCategoryNames ,function(catName){ 
                        return { name:catName, promo:false, pass:false, tickets: _.sortBy(
                            _.map(_.filter( liftTickets ,function(x){return x.ItemCategory==catName}),function(z){ 
                                z.Price = (Customization.skiBooking.showPriceIncludingSurcharges && z.PriceWithSurcharges)
                                                                                ? z.PriceWithSurcharges : z.Price;
                                z.earliestStartDate = date.substr(0,10)+"000000";
                                return z
                            }),
                            function(s){
                                return app.customization.skiBooking.sortByPrice ? +s.Price : s.ItemName
                            } 
                        )}
                    }),
                    _.map( passCategoryNames ,function(catName){ 
                        return { name:catName, promo:false, pass:true, tickets: _.sortBy(
_.filter(
                            _.map(_.filter( passes ,function(x){return x.ItemCategory==catName}),function(z){ 
                                z.Price = (Customization.skiBooking.showPriceIncludingSurcharges && z.PriceWithSurcharges)
                                                                                ? z.PriceWithSurcharges : z.Price;
                                z.earliestStartDate = skiDate < Date.parse( z.StartDate.substr(0,10), 'yyyy-MM-dd' ) ? z.StartDate : date + '000000';
                                var esd = Date.parse(z.earliestStartDate.substr(0,10), 'yyyy-MM-dd'),
                                    ed = Date.parse(z.EndDate.substr(0,10), 'yyyy-MM-dd').add(-1).days();
                                while (z["Available"+weekDays[esd.getDay()]] != "Y" && esd<ed) {
                                    esd.add(1).day();
                                }
                                if (esd>=ed) return; // There is no day on which the pass can be used before the end date.
                                var eed = +z.DurationDays
                                            ? ( esd.clone().add(+z.DurationDays-1).days()>ed ? ed : esd.clone().add(+z.DurationDays-1).days() )
                                            : ed;
                                z.earliestStartDate = esd.toString('yyyy-MM-dd')  + '000000';
                                z.effectiveEndDate = eed.toString('yyyy-MM-dd')  + '000000';
                                return z
                            })
, function(x){return x}),
                            function(s){
                                return app.customization.skiBooking.sortByPrice ? +s.Price : s.ItemName
                            } 
                        )}
                    }),
                    _.map( app.customization.skiBooking.groupPromoCategoriesIntoOne ? [app.localization.ski.promo] : ticketPromoCategoryNames ,function(catName){ 
                        return { name:catName, promo:true, pass:false, tickets: _.sortBy(
                            _.map(_.filter( promoLiftTickets ,function(x){return app.customization.skiBooking.groupPromoCategoriesIntoOne || x.ItemCategory==catName}),function(z){ 
                                z.Price = (Customization.skiBooking.showPriceIncludingSurcharges && z.PriceWithSurcharges) ? z.PriceWithSurcharges : z.Price;
                                z.earliestStartDate = date.substr(0,10)+"000000";
                                return z
                            }),
                            function(s){
                                return app.customization.skiBooking.sortByPrice ? +s.Price : s.ItemName
                            } 
                        )}
                    }),
                    _.map( app.customization.skiBooking.groupPromoCategoriesIntoOne ? [app.localization.ski.promoPasses] : passPromoCategoryNames ,function(catName){ 
                        return { name:catName, promo:true, pass:true, tickets: _.sortBy(
_.filter(
                            _.map(_.filter( promoPasses ,function(x){return x.ItemCategory==catName}),function(z){ 
                                z.Price = (Customization.skiBooking.showPriceIncludingSurcharges && z.PriceWithSurcharges)
                                                                                ? z.PriceWithSurcharges : z.Price;
                                z.earliestStartDate = skiDate < Date.parse( z.StartDate.substr(0,10), 'yyyy-MM-dd' ) ? z.StartDate : date + '000000';
                                var esd = Date.parse(z.earliestStartDate.substr(0,10), 'yyyy-MM-dd'),
                                    ed = Date.parse(z.EndDate.substr(0,10), 'yyyy-MM-dd').add(-1).days();
                                while (z["Available"+weekDays[esd.getDay()]] != "Y" && esd<ed) {
                                    esd.add(1).day();
                                }
                                if (esd>=ed) return; // There is no day on which the pass can be used before the end date.
                                var eed = +z.DurationDays-1
                                            ? ( esd.clone().add(+z.DurationDays-1).days()>ed ? ed : esd.clone().add(+z.DurationDays-1).days() )
                                            : ed;
                                z.earliestStartDate = esd.toString('yyyy-MM-dd')  + '000000';
                                z.effectiveEndDate = eed.toString('yyyy-MM-dd')  + '000000';
                                return z
                            })
, function(x){return x}),
                            function(s){
                                return app.customization.skiBooking.sortByPrice ? +s.Price : s.ItemName
                            } 
                        )}
                    })
                ] )


/*            _.map(
                                allCategories,
                                function(x){
                                    return {
                                        name: x.name,
                                        promo: x.promo,
                                        tickets:    _.sortBy(
                                                        _.map(
                                                            _.filter(allLiftTickets, function(y){
                                                                return y.ItemCategory==x.name && y.promo==x.promo
                                                            }),
                                                            function(z){
                                                                z.Price = (Customization.skiBooking.showPriceIncludingSurcharges && z.PriceWithSurcharges)
                                                                            ? z.PriceWithSurcharges : z.Price;
                                                                return z
                                                            }
                                                        )
                                                    )
                                    }
                                }
                            );*/
        /*if (app.customization.skiBooking.groupPromoCategoriesIntoOne) {
            var groupedCategories = [],
                promoCategory = {
                                    name: app.localization.ski.promo,
                                    promo: true,
                                    tickets: []
                                };
            _.each(categories, function(x){
                if (x.promo) {
                    promoCategory.tickets = _.flatten( [ promoCategory.tickets, x.tickets ], true );
                } else {
                    groupedCategories.push(x);
                }
            });
            if (promoCategory.tickets.length>1) {
                groupedCategories.push(promoCategory)
            }
            categories = groupedCategories;
        } else { */
            var first = false;
            _.find(categories, function(x){
                if (x.promo && !first) {
                    x.first = first = true
                }
            })
        // }
        var category = _.find(categories, function (x) {
                            return _.any(x.tickets, function (y) {
                                return y.SkiItemId && (y.SkiItemId == itemId)
                            })
                        })
        // _.each(skiServices.LiftTicket, function (v, k, l) {
        //     l[k].value = _.sortBy(l[k].value, function (s) {
        //         return app.customization.skiBooking.sortByPrice ? +s.Price : s.ItemName
        //     });
        //     Customization.skiBooking.showPriceIncludingSurcharges
        //         && _.each(l[k].value, function(s,i){
        //             s.PriceWithSurcharges && (l[k].value[i].Price = s.PriceWithSurcharges);
        //         })
        // })
        // skiServices.LiftTicket = _.sortBy(skiServices.LiftTicket, function (s) {
        //     return s.name
        // });
        var templateData = {
            categories:categories,
            location:location,
            Customization:app.customization,
            Localization:app.localization,
            showitem:itemId,
            showcategory:category,
            selectedRecipient: selectedRecipient,
            user: user,
            group: group,
            skiDate: date+'000000',
            anyLiftTickets: anyLiftTickets,
            anyPromoLiftTickets: anyPromoLiftTickets,
            url: window.location.hash.replace(/^#/, ''),
            showBookForGroupMember: user.CustomerId && !app.customization.skiBooking.disallowBookForGroupMember
        };
        console.log(categories);
        $('#nav').html(navbarTpl({
            Localization:app.localization,
            Customization:app.customization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:Customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            bannerMessage:app.localization.ski.marketing.bannerMessage,
            service:service
        }));
        $('#content').html(skiLiftTicketListTpl(templateData));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.ski
        }))
        console.log(location, app.localization);
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.prepSkiForm(location, itemId, date, templateData);
        commonViewHelper.showMessages();
    });


    skiView.event.listen('updateMessages', skiView, function(e){
        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (a) {
            return a.id == app.views.skiView.module
        }));
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    return window.app.views.skiView = skiView;

});
