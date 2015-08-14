/* 
 * controllers/golfController.js
 * Golf Controller
 */

define([
    'app/ControllerClass',
    'app/models/golfModel',
    'app/views/golfView'], function( ControllerClass, GolfModel, GolfView) {
    return window.app.controllers.golfController = $.extend({}, ControllerClass, {
        app:app,
        module: 'golf',

        actions:{
            'show':['golfBookingSelected'],
            'location':['golfLocationSelected'],
            'course':['golfCourseSelected'],
            'teetime':['golfTeeTimeSelected'],
            'confirm':['golfRates'],
            'book':['golfBook']
            ,'test':['Test']

        },
        init:function () {
            console.log('initializing golf controller');
            app.data.messages = app.data.messages || [];
            this._init.call(this);
        },

        Test:function(){
            app.views.golfView.event.fire('test');
        },

        golfBookingSelected:function () {
            var self = this;
            console.log('doit!');
            $.when(app.models.golfModel.getData('golfLocations', {}))
                .done(function (r_gl) {
                    console.log('yessir');
                    if (r_gl.GolfLocation != undefined) {
                        if (r_gl.GolfLocation.length > 1) {
                            app.views.golfView.event.fire('requestGolfLocationSelection', [r_gl.GolfLocation]);
                        } else {
                            var golfLocationId = $.firstOrOnly(r_gl.GolfLocation).LocationId;
                            app.models.golfModel.setSelected('golfLocations', {}, golfLocationId);
                            self.golfLocationSelected(golfLocationId);
                        }
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.golf.error.zeroLocations //,
                            //message:"("+r_ss.Result.Text+")",
                        });
                        app.dispatcher.replace('greeting','show',[])
                    }
                })
                .fail(function (r_gl) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.golf.error.noLocations //,
                        //message:"("+r_ss.Result.Text+")",
                    });
                    app.dispatcher.replace('greeting','show',[])
                });
        },

        golfLocationSelected:function (golfLocationId) {
            var self = this;
            app.models.golfModel.setSelected('golfLocations', {}, golfLocationId);
            $.when(
                app.models.golfModel.getData('golfLocations',{}),
                app.models.golfModel.getData('golfCourses',{'LocationId':golfLocationId})
            )
                .done( function( r_gl, r_gc) {
                    if (r_gc.GolfCourse != undefined) {
                        if (r_gc.GolfCourse.length>1) {
                            app.views.golfView.event.fire('requestGolfCourseSelection',[r_gl.GolfLocation, r_gc.GolfCourse]);
                        } else {
                            var golfCourseId = $.firstOrOnly(r_gc.GolfCourse).CourseId;
                            app.models.golfModel.setSelected('golfCourses',{'LocationId':golfLocationId},golfCourseId);
                            self.golfCourseSelected(golfCourseId);
                        }
                    }
                    else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.golf.error.zeroCourses //,
                            //message:"("+r_ss.Result.Text+")",
                        });
                        app.dispatcher.replace('golfBooking','',[])
                        // app.views.golfView.event.fire('requestGolfLocationSelection');
                    }
                })
                .fail( function( r_gc) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.golf.error.noCourses //,
                        //message:"("+r_ss.Result.Text+")",
                    });
                    app.dispatcher.replace('golfBooking','',[])
                });
        },

        golfCourseSelected : function ( golfCourseId, startDate, startTime, endDTime, numberOfPlayers ) {
            $.when (
                app.models.golfModel.getData('golfLocations',{}),
                app.models.golfModel.getData('golfCourses',{'LocationId':app.models.golfModel.getSelectedValue('golfLocations')})
            )
                .done( function(r_gl, r_gc) {
                    app.models.golfModel.setSelected('golfCourses', {'LocationId':app.models.golfModel.getSelectedValue('golfLocations')}, golfCourseId);
                    app.views.golfView.event.fire('requestGolfTeeInfo', [r_gc.GolfCourse, app.models.golfModel.getSelectedItem('golfLocations',{}), startDate, startTime, endDTime, numberOfPlayers]);
                    if (startDate && startTime && endDTime && numberOfPlayers) {
                        app.dispatcher.dispatch('golfBooking', 'teetime', [startDate, startTime, endDTime, numberOfPlayers]);
                    }
                })
                .fail( function( r_gc) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.golf.error.noCourses //,
                        //message:"("+r_ss.Result.Text+")",
                    });
                    app.dispatcher.replace('golfBooking','location',[app.models.golfModel.getSelectedValue('golfLocations')])
                });

            //app.data.selectedGolfCourse = golfCourseId;

        },

        golfTeeTimeSelected : function ( startDate, startTime, endDTime, numberOfPlayers ) {
            var startDateTime = startDate + startTime;
            var endDateTime = startDate + endDTime;
            var golfTeeParameters = {
                'Players':numberOfPlayers,
                'StartDateTime':startDateTime,
                'EndDateTime':endDateTime
            };
            $.when (app.models.golfModel.getData('golfTeeTimes', golfTeeParameters))
                .done( function(r_gt) {
                    if (app.customization.golfBooking.onlyShowTeeTimesWithFourAvailableSlots && $.isArray($.firstOrOnly(r_gt.GolfTeeTimes).TeeTime)) {

                        r_gt.GolfTeeTimes[0].TeeTime = _.filter($.firstOrOnly(r_gt.GolfTeeTimes).TeeTime,function(v){
                            return v.SlotsAvailable == 4
                        })
                        if (r_gt.GolfTeeTimes[0].TeeTime.length<1) {
                            r_gt.GolfTeeTimes = undefined;
                        }
                    }
                    if (r_gt.GolfTeeTimes != undefined) {

                            app.views.golfView.event.fire('requestTeeTimeSelection',[r_gt.GolfTeeTimes, numberOfPlayers]);
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.golf.error.zeroTeeTime /*,
                            message:"(Zero tee times returned)"*/
                        });
                        app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses')])
                    }
                })
                .fail( function( r_gt) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:Localization.golf.error.noTeeTime /*,
                        message:"(Request to server failed)"*/
                    });
                    app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses')])
                });

        },
        golfRates : function ( courseId, dateTime, numberOfPlayers ) {
            if (!courseId || !dateTime || !numberOfPlayers) {
                app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses')]);
                return;
            }
            if (! (locationId = app.models.golfModel.getSelectedValue('golfLocations'))) {
                app.dispatcher.replace('golfBooking','',[]);
                return;
            }
            var date=dateTime.substr(0,10),
                time =dateTime.substr(10),
                golfRateParameters = {
                'CustomerId':app.data.CustomerId || app.data.DefaultCustomerId,
                'CourseId':courseId,
                'Date':date,
                'TeeTime':app.rs.DateToString(dateTime, "hh:mm tt")
            };
            $.when (
                app.models.golfModel.getData('golfLocations',{}),
                app.models.golfModel.getData('golfCourses',{'LocationId':locationId}),
                app.models.golfModel.getData('golfRates', golfRateParameters)
            )
                .done( function(r_gl, r_gc, r_gr) {
                    if (r_gr.Price != undefined) {
                            app.views.golfView.event.fire('requestTeeTimeConfirmation',[r_gr, app.models.golfModel.getSelectedItem('golfLocations'), app.models.golfModel.getSelectedItem('golfCourses', {'LocationId':locationId}), dateTime, numberOfPlayers]);
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.golf.error.zeroRates
                        });
                        app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses'),date, time,'235959',numberOfPlayers])
                    }
                })
                .fail( function( r_gr) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.golf.error.noRates
                    });
                    app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses'),date, time,'235959',numberOfPlayers])
                });

        },
        golfBook : function ( locationId, courseId, itemId, price, date, time, numberOfPlayers ) {
            if (!locationId || !courseId || !itemId || !price || !date || !time || !numberOfPlayers) {
                app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses')]);
                return;
            }
            var golfBookParameters = {
                    'CustomerId':app.data.CustomerId || app.data.DefaultCustomerId,
                    'CourseId':courseId,
                    'LocationId':locationId,
                    'TeeTime':date+time,
                    'Players': numberOfPlayers,
                    'ItemId': itemId,
                    'Price': price
                };
            $.when ( app.models.golfModel.getData('bookTeeTime', golfBookParameters) )
                .done( function(r_gb) {
                    if (r_gb.GolfBookingId != undefined) {
                        app.data.messages.push({ type:'alert', 'class':'alert-success', actions: [],
                            title:app.localization.golf.successfullBookingMessage,
                            message:Localization.spaBooking.confirmation.customerCustomTextFooter
                        });
                        //app.models.systemModel.getData('folioBalance', {}).always(function(){
                            app.dispatcher.replace('summary','show',[]);
                        //});
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.golf.error.noBooking,
                            message:(r_gb && r_gb.Result) ? "("+r_gb.Result.Text+")" : ""
                        });
                        app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses'),date,time,'235959',numberOfPlayers])
                    }
                })
                .fail( function( r_gt) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.golf.error.noBooking,
                        message:"(Request to server failed)"
                    });
                    app.dispatcher.replace('golfBooking','course',[app.models.golfModel.getSelectedValue('golfCourses'),date,time,'235959',numberOfPlayers])
                });
        }
    })
});