/*
 * controllers/spaController.js
 * Spa Controller
 */

define([
    'app/ControllerClass',
    'app/models/spaModel',
    'app/views/spaView'], function (ControllerClass, SpaModel, SpaView) {
    return window.app.controllers.spaController = $.extend({}, ControllerClass, {
        app:app,
        module:'spa',

        actions:{
            'show':['spaBookingSelected'],
            'location':['spaLocationSelected'],
            'service':['spaServiceSelected'],
            'serviceItem':['spaItemSelected'],
            'serviceStaffList':['spaServiceStaffListRequested'],
            'class':['spaClassSelected'],
            'findclass':['spaClassDateSelected'],
            'confirmClass':['spaClassConfirmation'],
            'bookClass':['bookSpaClass'],
            'book':['bookSpaItem']

        },
        init:function () {
            console.log('initializing spa controller');
            app.data.messages = app.data.messages || [];

            /*
             // this is trivial method overloading
             // save super
             this._pfa = this.performAction;
             // replace it
             this.performAction = function(action) {
             if(!app.customization.login.atCheckOut && !app.data.userLoggedIn) {
             app.dispatcher.redirect('profile','login',['next','spaBooking', action, [].slice.call(arguments,1)]);
             } else {
             // call saved super
             this._pfa.apply(this, arguments)
             }
             }
             */
            this._init.call(this);
        },

        spaBookingSelected:function () {
            var self = this;
            $.when(
                app.models.spaModel.getData('spaLocations', {}),
                (app.customization.hideOtherPropertyIfItemsInCart && app.models.systemModel.validatePMSBeforeSpa())
            )
                .done(function (r_sl, r_pbs) {

                    if (!!r_sl.SpaLocation) {

                        var spaLocations = r_sl.SpaLocation;
                        if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
                            spaLocations = _.filter(spaLocations,function(x){
                                return _.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId }) || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
                            })
                            if (spaLocations.length==0) {
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                    title: app.localization.spaBooking.locationSelection.err.noLocationsAtProperty,
                                    message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                                });
                                app.dispatcher.redirect('summary','',[]);
                                return;
                            }
                        }

                        if (spaLocations.length > 1) {
                            if (r_pbs && location.PMSRoomMandatory == "Y") {
                                app.data.messages.push({
                                    type:'alert', 'class':'alert-info alert-no-autoclose', actions:[],
                                    title:app.localization.spaBooking.pmsbeforespa.notice
                                });
                            }
                            app.views.spaView.event.fire('requestSpaLocationSelection', [spaLocations, app.models.spaModel.getSelectedItem('spaLocations', {})]);
                        } else {
                            var spaLocationId = $.firstOrOnly(spaLocations).LocationId;
                            //app.models.spaModel.setSelected('spaLocations', {}, spaLocationId);
                            self.spaLocationSelected(spaLocationId);
                        }
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.spaBooking.locationSelection.err.noLocation/*,
                            message:"(" + r_ss.Result.Text + ")"*/
                        });
                        app.dispatcher.redirect('');
                    }
                })
                .fail(function (r_sl) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                        title:app.localization.spaBooking.locationSelection.err.noLocation
                    });
                    app.dispatcher.redirect('');
                });
        },

        spaLocationSelected:function (spaLocationId) {
            app.models.spaModel.setSelected('spaLocations', {}, spaLocationId);
            var self = this,
                location = app.models.spaModel.getSelectedItem('spaLocations', {});
            if (app.customization.spaBooking.allowBookClass) {

                if (location.PMSRoomMandatory == "Y") {
                    app.models.systemModel.validatePMSBeforeSpa(location.LocationName).done(function(r_pbs){
                        if (r_pbs) {
                            app.data.messages.push({ type:'alert', 'class':'alert-info alert-no-autoclose', actions:[],
                                title:app.localization.spaBooking.pmsbeforespa.notice
                            });
                        }
                        app.views.spaView.event.fire('requestSpaServiceTypeSelection', [spaLocationId]);
                    });
                } else {
                    app.views.spaView.event.fire('requestSpaServiceTypeSelection', [spaLocationId]);

                }
            } else {
                self.spaServiceSelected('Location' + spaLocationId);
            }
        },

        spaServiceSelected:function (showitem, date, time, staffGenderOrId, guestName) {
            if (showitem && showitem.substr(0, 8) == "Location") {
                var showitemParts = showitem.split('|');
                app.models.spaModel.setSelected('spaLocations', {}, showitemParts[0].substr(8));
                showitem = showitemParts[1];
            }
            var self = this,
                loadProfileData = false,
                location = undefined;
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
                var profileParams = {
                        CustomerId: app.data.CustomerId,
                        CustomerGUID: app.data.CustomerGUID
                    }
            }

            staffGenderOrId && app.datac('staffGenderOrId', staffGenderOrId);
            app.models.spaModel.getData('spaLocations', {}).done(function(r_sl){
                location = app.models.spaModel.getSelectedItem('spaLocations', {});
                if (!location) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.spaBooking.locationSelection.err.noLocation,
                        message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                    });
                    app.dispatcher.redirect('summary','',[]);
                    return;
                }
                $.when(
                    app.models.spaModel.getData('spaServicesByCategory', {}),
                    ((location.PMSRoomMandatory == "Y"||app.customization.hideOtherPropertyIfItemsInCart) && app.models.systemModel.validatePMSBeforeSpa(location.LocationName)),
                    (loadProfileData && app.models.userModel.getData('fetchCustomerProfile', profileParams )),
                    (loadProfileData && dfd.promise())

                )
                    .done(function (r_sc, r_pbs, r_fcp, r_fgm) {
                        var spaLocations = r_sl.SpaLocation;
                        if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
                            spaLocations = _.filter(spaLocations,function(x){
                                return _.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId }) || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
                            })
                            if (spaLocations.length==0) {
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                    title:app.localization.spaBooking.locationSelection.err.noLocationsAtProperty,
                                    message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                                });
                                app.dispatcher.redirect('summary','',[]);
                                return;
                            } else if (!_.any(spaLocations,function(x){return x.LocationId == location.LocationId})) {
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                    title:app.localization.spaBooking.locationSelection.err.mismatchedProperty,
                                    message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                                });
                                app.dispatcher.redirect('summary','',[]);
                                return;
                            }
                        }
                        showitem = showitem || // $.firstOrOnly($.first(r_sc).value.value).SpaItemId;
                                   ( $.isArray(r_sc) && $.isArray($.first(r_sc).value) &&
                                        r_sc.length==1 && $.first(r_sc).value.length==1
                                        ? $.firstOrOnly($.first(r_sc).value.value).SpaItemId : "" );
                        if (location.PMSRoomMandatory == "Y") {
                            if (r_pbs) {
                                app.data.messages.push({ type:'alert', 'class':'alert-info alert-no-autoclose', actions:[],
                                    title:app.localization.spaBooking.pmsbeforespa.notice
                                });
                            }
                        }
                        if (app.data.overridePMSRestriction) {
                            app.data.messages.push({ type:'alert', 'class':'alert-info', actions:[],
                                title:app.localization.spaBooking.pmsbeforespa.noticeOverridden,
                                message:''
                            });
                        }
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

                        app.views.spaView.event.fire('requestSpaServiceSelection', [ r_sc, showitem, location, date, time, staffGenderOrId, guestName, (location.PMSRoomMandatory == "Y" ? (!!app.data.pmsDateList ? app.data.pmsDateList[location.PropertyId] : []) : []), user, group ]);

                        if (!!showitem) {
                            if (location.AllowStaff == "Y") {
                                $.when(app.models.spaModel.getData('spaStaff', { 'SpaItemId':showitem }))
                                    .done(function (r_ssf) {
                                        app.views.spaView.event.fire('updateSpaServiceStaffList', {showitem:showitem, staffList:r_ssf.SpaStaff, staffGenderOrId:staffGenderOrId, location:location});
                                    })
                            } else if (location.AllowGender == "Y") {
                                app.views.spaView.event.fire('updateSpaServiceStaffList', {showitem:showitem, staffList:[], staffGenderOrId:staffGenderOrId, location:location});
                            }

                        }
                    })
                    .fail(function (r_ss) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.spaBooking.serviceSelection.err.noService /*,
                            message:"(" + r_ss.Result.Text + ")"*/
                        });
                        app.dispatcher.redirect('spaBooking');
                    });
            })
        },

        spaServiceStaffListRequested:function (showitem, skipStaff, type, value) {
            $.when(
                skipStaff || app.models.spaModel.getData('spaStaff', {SpaItemId:showitem}),
                app.models.spaModel.getData('spaLocations', {})
            )
                .done(function (r_ssf, r_l) {
                    var location = app.models.spaModel.getSelectedItem('spaLocations', {});
                    app.views.spaView.event.fire('updateSpaServiceStaffList', {showitem:showitem, staffList:(skipStaff?{}:r_ssf.SpaStaff), staffGenderOrId:app.data.staffGenderOrId, location:location, type:type, value:value});
                })
        },

        spaItemSelected:function (itemId, date, time, staffGenderOrId, guestName) {
            if (!/\d{4}/.test(time)) {
                app.dispatcher.replace('spaBooking', 'service', [itemId, date, "", staffGenderOrId, guestName])
                return;
            }
            if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
                app.dispatcher.replace('spaBooking', 'service', [itemId, "", time, staffGenderOrId, guestName])
                return;
            }
            app.models.spaModel.setSelected('spaServicesByCategory', {}, itemId);
            if (!app.customization.login.atCheckOut && !app.data.userLoggedIn) {
                app.dispatcher.redirect('profile', 'login', ['next', 'spaBooking', 'serviceItem', itemId, date, time, staffGenderOrId, guestName ]);
            } else {
                var params = {SpaItemId:itemId, StartDateTime:date + time + "00", GuestName:guestName  };
                if (staffGenderOrId == "M" || staffGenderOrId == "F") {
                    $.extend(params, {Gender:staffGenderOrId});
                } else if (staffGenderOrId) {
                    $.extend(params, {SpaStaffId:staffGenderOrId});
                }
                if (app.customization.spaBooking.alwaysQueryPrice) {
                    time = time - 1
                    if(time % 100 == 99) {
                        time-=40
                    }
                    time = "" + time
                    while(time.length<4) {
                        time = "0"+time
                    }
                    params.StartDateTime=date + time + "00"
                }
                $.when(
                    app.customization.spaBooking.alwaysQueryPrice && app.models.spaModel.getData('spaStaff', {SpaItemId:itemId}),
                    app.models.spaModel.getData('spaAvailability', params)
                    )
                    .done(function (r_ss, r_sa) {
                        console.log('r_sa', r_sa);
                        // StartTime
                        // AvailabilityId
                        // SpaStaffId

                        if (app.customization.spaBooking.alwaysQueryPrice) { 
                            app.views.spaView.event.fire('updateSpaItemAvailability', {itemId:itemId, date:date, time:time, staffGenderOrId:staffGenderOrId, guestName:guestName, spaAvailability:r_sa, spaStaffList:r_ss});
                        } else {
                            if (r_sa.SpaAvailability.length == 1 && r_sa.SpaAvailability[0].StartTime == date + time + "00") {
                                // the requested time is available
                                app.controllers.spaController.bookSpaItem(itemId, date, time, r_sa.SpaAvailability[0].SpaStaffId, guestName, staffGenderOrId, 0);

                            } else {
                                // this is an alternate time
                                var message = {
                                    type:'spaAlternateService',
                                    'class':'',
                                    title:undefined,
                                    message:undefined,
                                    actions:[]
                                };
                                _.each(r_sa.SpaAvailability, function (sa) {
                                    message.actions.push({
                                        // include price here if it differs from the std item price
                                        text:sa.StartTime,
                                        url:'#/spaBooking/book/' + [itemId, sa.StartTime.substr(0, 10), sa.StartTime.substr(10, 4), sa.SpaStaffId, guestName, staffGenderOrId, 0].join('/'),
                                        label:undefined,
                                        loading:undefined,
                                        data: sa
                                    })
                                })
                                app.data.messages.push(message);
                                app.dispatcher.replace('spaBooking', 'service', [itemId, date, time, staffGenderOrId, guestName])
                            }
                        }
                    })
                    .fail(function (r_ss, r_sa) {
                        if (app.customization.spaBooking.alwaysQueryPrice) { 
                            app.views.spaView.event.fire('updateSpaItemAvailability', {itemId:itemId, date:date, time:time, staffGenderOrId:staffGenderOrId, guestName:guestName, spaAvailability:r_sa, spaStaffList:r_ss});
                        } else {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title: app.localization.spaBooking.serviceSelection.err.noAvailableAppointments + " " + app.rs.DateToString(date + time),
                                message: '' // "(" + app.models.spaModel.dataModel.spaAvailability.faildata.Result.Text + ")"
                            });
                            app.dispatcher.replace('spaBooking', 'service', [itemId, date, time, staffGenderOrId, guestName])
                            //                        app.views.spaView.event.fire('requestSpaServiceSelection', [itemId, date, time, staffGenderOrId]);
                        }
                    });
            }
        },

        bookSpaItem:function (itemId, date, time, staffId, guestName, staffGenderOrId, ignoreConflicting) {
            if (!/\d{4}/.test(time)) {
                app.dispatcher.replace('spaBooking', 'service', [itemId, date, "", staffGenderOrId, guestName])
                return;
            }
            if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
                app.dispatcher.replace('spaBooking', 'service', [itemId, "", time, staffGenderOrId, guestName])
                return;
            }
            if (!app.data.CustomerId) {
                // firstName = webfolioid
                // lastName = TempWebFolio
                // email = webfolioid @ webfolioid .com
                $.when(app.models.systemModel.getData('createCustomer', {
                    'Name.FirstName':app.data.WebFolioId,
                    'Name.LastName':'TempWebFolio',
                    'EmailAddress':app.data.WebFolioId + '@' + app.data.WebFolioId + '.com'}))
                    .done(function (r_cc) {
                        app.datac('CustomerId', r_cc.CustomerId);
                        doTheBooking();
                    })
                    .fail(function (r_cc) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.spaBooking.confirmation.err.createTempUserFailed,
                            message:'' //"(" + r_cc.Result.Text + ")"
                        });
                        app.dispatcher.replace('spaBooking', 'service', [itemId, date, time, staffGenderOrId, guestName]);
                    })
            } else {
                if (+ignoreConflicting) {
                    doTheBooking();
                } else {
                    checkConflicting();
                }
            }

            function checkConflicting() {
                $.when(
                    app.models.spaModel.getData('spaCustomerConflictingBookings', {SpaItemId:itemId, StartDateTime:date + time + "00", CustomerId:guestName||app.data.CustomerId}),
                    app.models.spaModel.getData('spaLocations', {})
                )
                    .done(function (r_cc, r_l) {
                        if (r_cc.SpaBooking && r_cc.SpaBooking.length > 0) {
                            var message = {
                                type:'spaConflictingBookings',
                                'class':'alert-error',
                                title:undefined,
                                message:undefined,
                                actions:[]
                            };
                            var spaBookings = _.sortBy(r_cc.SpaBooking, function (sb) {
                                return sb.StartTime
                            });
                            _.each(spaBookings, function (sb) {
                                message.actions.push({ text:sb, url:undefined, label:undefined, loading:undefined })
                                // ItemName, StartTime, EndTime, Location
                            })
                            var item = app.models.spaModel.getSelectedItem('spaServicesByCategory', {}),
                                itemName = item && item.ItemName;
                            message.locations = r_l.SpaLocation && _.groupBy( r_l.SpaLocation, "LocationId" )
                            message['finally'] = {
                                text:{SpaItemId:itemId, StartDateTime:date + time + "00", ItemName:itemName},
                                url:'#/spaBooking/book/' + [itemId, date, time, staffId, guestName, staffGenderOrId, 1].join('/'),
                                label:undefined,
                                loading:undefined
                            }
                            app.data.messages.push(message);
                            app.dispatcher.replace('spaBooking', 'service', [itemId, date, time, staffGenderOrId, guestName]);
                        } else {
                            doTheBooking();
                        }
                    })
                    .fail(function (r_cc) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.spaBooking.confirmation.err.checkConflictingFailed ,
                            message: '' // "(" + r_cc.Result.Text + ")"
                        });
                        app.dispatcher.replace('spaBooking', 'service', [itemId, date, time, staffGenderOrId, guestName])
                    })
            }

            function doTheBooking() {
                var params = {SpaItemId:itemId, StartDateTime:date + time + "00", SpaStaffId:staffId, CustomerId:guestName||app.data.CustomerId  };
                // if (guestName) {
                //    params.GuestName = guestName || (app.data.FirstName ? app.data.FirstName+" "+app.data.LastName : "FolioCustomer");
                // }
                if (staffGenderOrId == "M" || staffGenderOrId == "F") {
                    params.Gender=staffGenderOrId;
                } else if (staffGenderOrId==staffId) {
                    params.StaffRequested="Y";
                }
                app.models.spaModel.getData('spaBooking', params)
                    .done(function (r_csb) {
                        console.log('r_csb', r_csb)
                        app.data.messages.push({ type:'alert', 'class':'alert-success', actions:[],
                            title:app.localization.spaBooking.confirmation.successfullBookingMessage,
                            message:app.localization.spaBooking.confirmation.customerCustomTextFooter
                        });
                        //app.models.systemModel.getData('folioBalance', {}).always(function () {
                            app.dispatcher.replace('summary', 'show', []);
                        //});
                    })
                    .fail(function (r_csb) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.spaBooking.confirmation.err.createBookingFailed,
                            message:'' // "(" + r_csb.Result.Text + ")"
                        });
                        app.dispatcher.replace('spaBooking', 'service', [itemId, date, time, staffGenderOrId, guestName])
                    })
            };
        },

        spaClassSelected:function (spaLocationId, startDate, showItem, guestName) {

/*
TODO: call validatePMSBeforeSpa from every controller action that renders ui and can possibly be an entry point to the flow.
*/
            var spaItemId = undefined,
                self = this,
                location = undefined;
            if (spaLocationId && spaLocationId.substr(0, 8) == "Location") {
                var showitemParts = spaLocationId.split('|');
                spaLocationId=showitemParts[0].substr(8);
                app.models.spaModel.setSelected('spaLocations', {}, spaLocationId);
                spaItemId = showitemParts[1];
            }
            app.models.spaModel.getData('spaLocations', {}).done(function(r_sl){
                location = app.models.spaModel.getSelectedItem('spaLocations', {});
                $.when(
                    (location.PMSRoomMandatory == "Y" && app.models.systemModel.validatePMSBeforeSpa(location.LocationName))
                )
                    .done(function (r_pbs) {
                        var spaLocations = r_sl.SpaLocation;
                        if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
                            spaLocations = _.filter(spaLocations,function(x){
                                return !!location && location.LocationId == x.LocationId &&
                                    (_.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId }) || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId }))
                            })
                            if (spaLocations.length==0) {
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                                    title:app.localization.spaBooking.locationSelection.err.mismatchedProperty,
                                    message: '' // r_pr.Result ? "(" + r_pr.Result.Text + ")" : ""
                                });
                                app.dispatcher.redirect('summary','',[]);
                                return;
                            }
                        }
                        if (r_pbs) {
                            app.data.messages.push({ type:'alert', 'class':'alert-info alert-no-autoclose', actions:[],
                                title:app.localization.spaBooking.pmsbeforespa.notice
                            });
                        }
                        if (app.data.overridePMSRestriction) {
                            app.data.messages.push({ type:'alert', 'class':'alert-info', actions:[],
                                title:app.localization.spaBooking.pmsbeforespa.noticeOverridden,
                                message:''
                            });
                        }
                        var dateList = location.PMSRoomMandatory == "Y"
                                        ? ( !!app.data.pmsDateList ? app.data.pmsDateList[location.PropertyId] : [] )
                                        : [];
                        !startDate && dateList && dateList.length>0 && (startDate=dateList[0].machine)
                        app.views.spaView.event.fire('requestSpaClassDateSelection', [spaLocationId, startDate, dateList, guestName]);
                        if (startDate) {
                            app.dispatcher.dispatch('spaBooking', 'findclass', [spaLocationId, startDate, showItem, guestName, spaItemId])
                        }
                    })
                    .fail(function (r_pbs) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.spaBooking.classSelection.err.classListFailed,
                            message:''//"(" + r_ss.Result.Text + ")"
                        });
                        app.dispatcher.redirect('spaBooking');
                    })
            });
        },
        spaClassDateSelected : function ( spaLocationId, startDate , showItem, guestName, spaItemId) {
            var endDate = startDate; // Date.parse(startDate).add(1).days().toString('yyyy-MM-dd');
            $.when ( app.models.spaModel.getData('spaClassesByCategory', {StartDate:startDate, EndDate:endDate}))
                .done( function(r_sc) {
                    if (r_sc != undefined) {
                        showItem = showItem || // $.firstOrOnly($.first(r_sc).value.value).SpaItemId;
                                            ( $.isArray(r_sc) && $.isArray($.first(r_sc).value) &&
                                                r_sc.length==1 && $.first(r_sc).value.length==1
                                                ? $.firstOrOnly($.first(r_sc).value.value).SpaClassId : "" );
                        if (spaItemId && !_.any(r_sc, function(x){
                            return _.any(x.value,function(y){
                                return y.SpaItemId == spaItemId
                            })
                        })) {
                            app.data.messages.push({ type:'alert', 'class':'alert-info', actions:[],
                                title:app.localization.spaBooking.classSelection.spaItemNotFound,
                                message:''
                            });
                        }
                        app.views.spaView.event.fire('requestClassSelection',[r_sc, startDate, showItem, spaLocationId, guestName, spaItemId]);
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            //title:Localization.spaBooking.classSelection.classNotAvail,
                            message:Localization.spaBooking.classSelection.classNotAvail
                        });
                        app.views.spaView.event.fire('updateMessages');
//                        app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses')])
                    }
                })
                .fail( function( r_sc) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                       // title:app.localization.spaBooking.classSelection.classNotAvail,
                        message:app.localization.spaBooking.classSelection.classNotAvail
                    });
                    app.views.spaView.event.fire('updateMessages', []);
//                    app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses')])
                });

        },

        spaClassConfirmation: function(spaLocationId, classId, itemId, startDate, guestName){
            $.when(
                app.models.spaModel.getData('spaClassComponents', {ProgramId: classId}),
                app.models.spaModel.getData('spaLocations', {}),
                app.models.spaModel.getData('spaClassesFlat', {StartDate:startDate.substr(0,10), EndDate: startDate.substr(0,10)}),
                (location.PMSRoomMandatory == "Y" && app.models.systemModel.validatePMSBeforeSpa(location.LocationName))
            )
                .done(function(r_scc, r_sl, r_scf, r_pbs){
                    app.models.spaModel.setSelected('spaClassesFlat', {StartDate:startDate.substr(0,10), EndDate: startDate.substr(0,10)}, classId);
                    app.models.spaModel.setSelected('spaLocations', {}, spaLocationId);
                    var item = app.models.spaModel.getSelectedItem('spaClassesFlat', {StartDate:startDate.substr(0,10), EndDate: startDate.substr(0,10)});
                    var location = app.models.spaModel.getSelectedItem('spaLocations',{});
                    if (r_pbs) {
                        app.data.messages.push({ type:'alert', 'class':'alert-info alert-no-autoclose', actions:[],
                            title:app.localization.spaBooking.pmsbeforespa.notice
                        });
                    }
                    app.views.spaView.event.fire('confirmSpaClass', [r_scc,location,item,spaLocationId, classId, itemId, startDate, guestName]);
                })


        },
        bookSpaClass:function (spaLocationId, classId, itemId, startDate, guestName, confirmed /*ignoreConflicting*/) {
            var endDate = startDate; // Date.parse(startDate).add(1).days().toString('yyyy-MM-dd');

            if (!app.data.CustomerId) {
                $.when(app.models.systemModel.getData('createCustomer', {
                    'Name.FirstName':app.data.WebFolioId,
                    'Name.LastName':'TempWebFolio',
                    'EmailAddress':app.data.WebFolioId + '@' + app.data.WebFolioId + '.com'}))
                    .done(function (r_cc) {
                        app.datac('CustomerId', r_cc.CustomerId);
                        doTheBooking();
                    })
                    .fail(function (r_cc) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.spaBooking.confirmation.err.createTempUserFailed,
                            message:''//"(" + r_cc.Result.Text + ")"
                        });
                        app.dispatcher.replace('spaBooking', 'class', ['Location'+spaLocationId, startDate, classId, guestName]);
                    })
            } else {
                /*if (+ignoreConflicting) {
                    doTheBooking();
                } else {*/
                    checkConflicting();
                /*}*/
            }

            function checkConflicting() {
                $.when(
                    app.models.spaModel.getData('spaCustomerConflictingBookings', {SpaItemId:itemId, StartDateTime:startDate, CustomerId:app.data.CustomerId}),
                    app.models.spaModel.getData('spaLocations', {})
                )
                    .done(function (r_cc, r_l) {
                        if (r_cc.SpaBooking && r_cc.SpaBooking.length > 0) {
                            var message = {
                                type:'spaConflictingBookings',
                                'class':'alert-error',
                                title:undefined,
                                message:undefined,
                                actions:[]
                            };
                            var spaBookings = _.sortBy(r_cc.SpaBooking, function (sb) {
                                return sb.StartTime
                            });
                            _.each(spaBookings, function (sb) {
                                message.actions.push({ text:sb, url:undefined, label:undefined, loading:undefined })
                                // ItemName, StartTime, EndTime, Location
                            })
                            var item = app.models.spaModel.getSelectedItem('spaClassesByCategory', {StartDate:startDate.substr(0,10), EndDate: endDate.substr(0,10)}),
                                itemName = item && item.ItemName;
                            message.locations = r_l.SpaLocation && _.groupBy( r_l.SpaLocation, "LocationId" )
                            /*message.finally = {
                                text:{SpaItemId:itemId, StartDateTime:startDate + "00", ItemName:itemName},
                                url:'#/spaBooking/bookClass/' + [classIdId, startDate, guestName].join('/'),
                                label:undefined,
                                loading:undefined
                            }*/
                            app.data.messages.push(message);
//                            app.dispatcher.replace('spaBooking', 'class', [classIdId, startDate, guestName]);
                            app.dispatcher.replace('spaBooking', 'class', ['Location'+spaLocationId, startDate, classId, guestName]);
                        } else {
                            if (+confirmed) {
                                doTheBooking();
                            } else {
                                app.dispatcher.redirect('spaBooking','confirmClass', [spaLocationId, classId, itemId, startDate, guestName])
                            }
                        }
                    })
                    .fail(function (r_cc) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.spaBooking.confirmation.err.checkConflictingFailed,
                            message:'' //"(" + r_cc.Result.Text + ")"
                        });
                        app.dispatcher.replace('spaBooking', 'class', ['Location'+spaLocationId, startDate, classId, guestName]);
                    })
            }

            function doTheBooking() {
                var params = {ProgramId:classId, CustomerId:app.data.CustomerId  };
                // if (guestName) {
                    params.GuestName = guestName || (app.data.FirstName ? app.data.FirstName+" "+app.data.LastName : "FolioCustomer");
                // }
                app.models.spaModel.getData('classBooking', params)
                    .done(function (r_csb) {
                        console.log('r_csb', r_csb)
                        app.data.messages.push({ type:'alert', 'class':'alert-success', actions:[],
                            title:app.localization.spaBooking.confirmation.successfullBookingMessage,
                            message:app.localization.spaBooking.confirmation.customerCustomTextFooter
                        });
                        if (r_csb.SpaFolioItem && r_csb.SpaFolioItem[0] && r_csb.SpaFolioItem[0].SpaFolioItemId) {
                            app.data.spaClassFolioItemIds = app.data.spaClassFolioItemIds
                                                                ? app.data.spaClassFolioItemIds.push(r_csb.SpaFolioItem[0].SpaFolioItemId)
                                                                : [r_csb.SpaFolioItem[0].SpaFolioItemId]
                        }
                        //app.models.systemModel.getData('folioBalance', {}).always(function () {
                            app.dispatcher.replace('summary', 'show', []);
                        //});
                    })
                    .fail(function (r_csb) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title: app.localization.spaBooking.confirmation.err.createBookingFailed,
                            message: '' //"(" + r_csb.Result.Text + ")"
                        });
                        app.dispatcher.replace('spaBooking', 'class', ['Location'+spaLocationId, startDate, classId, guestName]);
                    })
            };
        }
    })
});
