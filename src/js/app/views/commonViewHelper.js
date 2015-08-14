/*
 * views/commonViewHelper.js
 * helper functions used by all views
 */
define([
    'hbs!app/views/templates/spaServiceListPartialSpaItem',
    'hbs!app/views/templates/skiLiftTicketPartialSkiItem',
    'app/views/templates/helpers/RSDateToString',
    'app/views/templates/helpers/stripChars',
    'Customization',
    'enquire',
    'lib/event',
    'hbs!app/views/templates/navbar',
    'order!jquery','order!jqueryui','order!jqueryuidatepicker','order!bootstrap','jquery_validate','date','jquerymask'
    ],
function (spaServiceListPartialSpaItemTpl,
          skiLiftTicketPartialSkiItemTpl,
          rsDateToString,
          stripChars,
          Customization,
          enquire,
          Event,
          navbarTpl) {

    var addOneMinute = function (timestr) {
        timestr = 1 + +timestr
        if (timestr%100==60) {
            timestr+=40
        }
        timestr = "" + timestr
        while(timestr.length<4) {
            timestr = "0" + timestr
        }
        return timestr
    }
    app.commonViewHelper = {
        prepFolioTimedOut: function() {
            $('#folioTimedOut').modal('show');
            $('#restart').click(function(obj){
                obj.preventDefault();
                app.dispatcher.redirect('');
                window.location.reload(false);
            });
            $('#folioTimedOut').on('hidden', function () {
                app.dispatcher.redirect('');
                window.location.reload(false);
            })
        },

        prepPMSSpecialSerivceForm: function() {
      $('.addSpecialServiceButton').bind('click', function(obj){
                var folioid = $(this).attr('data-for'),
                    dateHref = '';
                $(obj.target).button('loading');
        if ($(this).attr('data-charged') == '1') {
          dateHref = $(this).parents('.specialService').find('select.specialServicesDates').val();
        }
                this.href +=  dateHref;
            });
            $('.specialService.collapse').on('shown', function(obj){
                if ($(obj.target).data('collapse')) {
                    $(obj.target).collapse('reset');
                }

            });
        },

        updateNavBar:function (serviceType, language, folioBalance) {
            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
                $('#nav .navbar').removeClass('navbar-fixed-top');
                $('#footer .navbar').removeClass('navbar-fixed-bottom');
                $('html').addClass('ios');
            }
            $('#progressIndicator').modal('hide');
            $('div.popover').remove();
            $('.modal-backdrop').remove();
            if (!serviceType) {
                $('#navbarServiceTypeList').hide();
            } else {
                $('#navbarServiceTypeList').show();
                $('#navbarServiceTypeList li.serviceType').removeClass('active');
                $('#navbarServiceTypeList li.serviceType.' + serviceType.id).addClass('active')
                $('#navbarServiceTypeList a.dropdown-toggle span.name').text(serviceType.name);
                $('#navbarServiceTypeList a.dropdown-toggle i').replaceWith('<i class="icon-' + serviceType.icon + ' icon-white"></i>');
            }
            var items, balance = undefined;
            if ((app.data.pmsBookingFuture && app.data.pmsBookingFuture.length > 0) || (app.data.spaBookingFuture && app.data.spaBookingFuture.length > 0) || (app.data.golfBookingFuture && app.data.golfBookingFuture.length > 0) || folioBalance && (items = folioBalance.FolioItems) && items > 0) {
                balance = folioBalance.FolioBalance;
                $('#navbarCartControl').removeClass('hidden').addClass('active');
                $('#navbarCartControl .orderTotal').html(app.localization.general.currencyPrefix + (+balance).toFixed(2) + app.localization.general.currencyPostfix);
                $('#navbarServiceTypeList').removeClass('active');

            } else {
                $('.navbarCartControl').addClass('hidden').removeClass('active');
                $('#navbarServiceTypeList').addClass('active');
            }
            $('#navbarLanguageList li.language').removeClass('active');
            $('#navbarLanguageList li.language.' + app.language).addClass('active');
            $('#navbarLanguageList a.dropdown-toggle span.name').text(app.localization.general.language); //(app.data.languageMap[language]);
            if (app.data.userLoggedIn) {
                $('#navbarLoginControl a .name').html(app.localization.general.login.greeting + app.data.FirstName);
                $('#navbarLoginControl .bookingHistory').removeClass('hidden');
                $('#navbarLoginControl #loginForm').addClass('hidden');
                $('#navbarLoginControl #logoutForm').removeClass('hidden');
                $('#navbarLoginControl > a').attr('data-toggle', 'dropdown');
                $('#logoutButton').click(function(obj){
                    if (+balance==0) {
                        if (!window.confirm(app.localization.general.login.logoutWarning)) {
                            obj.preventDefault();
                        }
                    }
                })
            } else {
                $('#navbarLoginControl > a .name').html(app.localization.general.login.loginButtonLabel);
                // if (app.data.pmsBookingPast || app.data.spaBookingPast || app.data.golfBookingPast) {
                    $('#navbarLoginControl .bookingHistory').addClass('hidden');
                // }
                $('#navbarLoginControl #loginForm').removeClass('hidden');
                $('#navbarLoginControl #logoutForm').addClass('hidden');
                $('#navbarLoginControl > a').removeAttr('data-toggle');
                $('#navbarLoginControl > a').click(function (e) {
                    if (!$(e.target).parents('.nav-collapse').hasClass('in')) {
                        e.preventDefault();
                        $('#navbarLoginControl').toggleClass('open').popover('hide');
                    }

                });
                $('#navbarLoginControl form').submit(function (e) {
                    e.preventDefault();
                    $(e.target).validate();
                    if ($(e.target).valid()) {
                        app.dispatcher.updateURL('profile', 'login', [], true)
                        app.dispatcher.dispatch('profile', 'authenticate', [encodeURIComponent($('#loginEmail').val()), encodeURIComponent($('#loginPassword').val())])
                        $('#navbarLoginControl').removeClass('open');
                    }
                });
                if (app.customization.showLoginPromptFlyout && app.data.inittime.clone().add(10).seconds() > Date.now() && $('body > .loginPromptFlyout').length==0) {
                    var nlc = $('#navbarLoginControl');
                    nlc.popover({
                            trigger: 'manual',
                            placement: 'bottom loginPromptFlyout',
                            offsetX: -5,
                            delay: { show: 750, hide: 300 },
                            title: '<a class="close" onclick="app.customization.showLoginPromptFlyout = false; $(\'body > .loginPromptFlyout\').remove(); return false" href="#">&times;</a>'
                                     + app.localization.general.login.promptFlyoutTitle,
                            content: app.localization.general.login.promptFlyoutText
                        })
                    $('body').data('loginFlyout', nlc.data('popover'))
                    setTimeout(function(){
                        $('body').data('loginFlyout').show()
                        setTimeout(function(){
                            $('body').data('loginFlyout').hide()
                            app.customization.showLoginPromptFlyout = false;
                        },10000);
                    },500);

                }
            }
            $('.alert-hide').on('click', function (obj) {
                if ($(this).hasClass('dont-hide-alerts')) {
                    $(this).removeClass('dont-hide-alerts');
                } else {
                    $('.alert:not(.alert-error, .alert-uptime, .alert-no-autoclose)').alert('close');
                }
            })
            $('.error-hide').on('click', function (obj) {
                $('.alert-error').alert('close');
            })
            $.validator.messages = app.localization.general.err.jquery_validate;

        },

        updateBreadcrumbs:function (breadCrumbs) {
            $('#breadcrumbs').html($('#breadCrumbTpl').rendthaner({
                'breadCrumbs':breadCrumbs
            }));
        },

        showMessages:function () {
            if (app.data.messages) {
                var unusedmessages = [],
                    showedAMessage = false;
                for (var message; message = app.data.messages.shift();) {
                    if (!this.showMessage(message)) {
                        unusedmessages.push(message);
                    } else {
                        showedAMessage = true;
                    }
                }
                $.merge(app.data.messages, unusedmessages);
                if($('#breadcrumbs')[0]) {
                    showedAMessage && $('#breadcrumbs')[0].scrollIntoView(true);
                }
                $('.alert').fadeIn('slow');
            }
        },

        showMessage:function (message) {
            if (message.type == 'alert') {
                var msg = '<div class="alert hide ' + (message['class']) + '"><a class="close" data-dismiss="alert" href="#">×</a>';
                message.title && (msg +='<h4>' + message.title + '</h4>');
                message.message && (msg +='<p>' + message.message + '</p>');
                message.actions && _.each(message.actions, function (action) {
                    msg +='<p>' + action.text + '<a data-loading="' + action.loading + '" class="spaAlternateButton btn btn-small btn-primary" href="' + action.url + '">' + action.label + '</a></p>';
                })
                message.footer && (msg +='<p>' + message.footer + '</p>');
                msg +='</div>';
                $('#alerts').append(msg);
            } else if (message.type == 'spaAlternateService') {
                var msg = $('<div class="alert hide "><a class="close" data-dismiss="alert" href="#">×</a></div>');
                msg.append('<h4>' + (message.title || app.localization.spaBooking.multipleAppointments.title) + '</h4>');
                msg.append('<p>' + (message.message || app.localization.spaBooking.multipleAppointments.instructions) + '</p>');
                var tbl = $('<table class="spaAlternateService"></table>');
                message.actions && _.each(message.actions, function (action) {

                    tbl.append('<tr><td><p>' + app.rs.DateToString(action.text, "dddd, MMMM d, yyyy") + app.localization.spaBooking.serviceSelection.at + app.rs.DateToString(action.text, "h:mm tt") + '</p></td><td><a data-loading="' + (action.loading || app.localization.general.progressIndicatorMessage) + '" class="spaAlternateButton btn btn-small btn-primary" href="' + action.url + '">' + (action.label || app.localization.spaBooking.confirmation.makeBookingButtonLabel) + '</a></td></tr>');
                })
                msg.append(tbl);
                console.log(msg);
                $('#alerts').append(msg);
            } else if (message.type == 'spaConflictingBookings') {
                var msg = $('<div class="alert hide"><a class="close" data-dismiss="alert" href="#">×</a></div>');
                msg.append('<h4>' + (message.title || app.localization.spaBooking.confirmation.err.conflictingBookingsRemoveTitle) + '</h4>');
                msg.append('<p>' + (message.message || app.localization.spaBooking.confirmation.err.conflictingBookingsRemoveExisting) + '</p>');
                message.actions && _.each(message.actions, function (action) {
                    var locationName = $.firstOrOnly(message.locations[action.text.Location]) ? " - " + $.firstOrOnly(message.locations[action.text.Location]).LocationName : "";
                    msg.append('<p>' + app.rs.DateToString(action.text.StartTime, "dddd, MMMM d, yyyy  h:mm tt") + ' - ' + action.text.ItemName + locationName + '</p>');
                });
                msg.append('<p>' + (message.message || app.localization.spaBooking.confirmation.err.conflictingBookingsRemoveMessage) + '</p>');
                msg.append('<p><a class="btn btn-small" href="#/summary">' + Localization.bookingSummary.cartName + '</a></p>');

//                msg.append('<p>' + message.finally.text.StartDateTime + ' - ' + message.finally.text.ItemName + '</p>');
//                msg.append('<a data-loading="' + (message.finally.loading || app.localization.general.progressIndicatorMessage) + '" class="spaConflictingButton btn btn-small btn-primary" href="' + message.finally.url + '">' + (message.finally.label || app.localization.spaBooking.confirmation.makeBookingButtonLabel) + '</a>');
                $('#alerts').append(msg);
            } else {
                return false;
            }
            return true;
        },

        prepSpaForm:function (location, itemId, date, time, staffGenderOrId, templateData) {
            var lastItemId= itemId;
            var updateBookButton = function (newItemId) {
                lastItemId = newItemId || lastItemId;
                $('#spaServiceForm').validate();
                if ($('#spaServiceForm').valid()) {
                    $('.spaServiceButton').addClass(app.customization.spaBooking.alwaysQueryPrice?'':'btn-primary').removeClass('disabled').removeAttr('title');
                } else {
                    $('.spaServiceButton').removeClass('btn-primary').addClass('disabled').attr('title', 'Please pick a service date first.');
                }
                var url = app.dispatcher.updateURL('spaBooking','service',[
                     'Location' + location.LocationId + '|' + encodeURIComponent(lastItemId),
                     encodeURIComponent($('#spaServiceDate').val()),
                     encodeURIComponent($('#spaServiceTime').val()),
                     encodeURIComponent(($('#spaRecipientGender'+lastItemId).length ? ($('#spaServiceStaff').val()||$('#spaRecipientGender').val()||""): $('#spaServiceStaff').val())||""),
                     encodeURIComponent($('#serviceRecipient').val()||"")
                     ], true);
                $('.loginPrompt a').attr('href','#/profile/login/next'+url)
            }
            var resetAvailabilities = function(that){
                    var availabilities = $('.spaAvailability').remove()
                      , reqtime = _.min(availabilities,function(x){return $(x).data('reqtime')})
                      , spaItemElement = $(that).parents('.spaItem')
                    reqtime = addOneMinute( $(reqtime).data('reqtime') )
                    var firstTimeOption = _.find(spaItemElement.find('.spaServiceTime option'),function(x){
                        return x.value == reqtime
                    })
                    if (firstTimeOption) {
                        $('.spaServiceTime').val(firstTimeOption.value)
                        spaItemElement.find('.spaServiceTime').change()
                    }
                    $('.hasAvailabilities').removeClass('hasAvailabilities')
                    spaItemElement.find('.spaServiceButton').button('reset').css('display','inline-block')
                    spaItemElement.find('.alert.notAvailable').alert('close')
                    availabilities=undefined
                }
            var spaDateChange = _.debounce(function () {
                if ($('#spaServiceDate').val()!=this.value) {
                    resetAvailabilities(this)
                }
                $('.spaServiceDate').val(this.value);
                updateBookButton.call(this);
                var dayofweek = $.datepicker.formatDate('DD', $.datepicker.parseDate('yy-mm-dd', this.value));
                var startTime = !!location[dayofweek + 'Start'] && location[dayofweek + 'Start'].substr(10, 4);
                var endTime = !!location[dayofweek + 'End'] && location[dayofweek + 'End'].substr(10, 4);
                $('.spaServiceTimeSelect')
                    .html('')
                    .data('opentime',startTime)
                var time = $('#spaServiceTime').val();
                var minTime = Date.parseExact(startTime,"HHmm"),
                    maxTime = Date.parseExact(endTime,"HHmm"),
                    setTime = Date.parseExact($('#spaServiceTime').val(),"HHmm");
                if ( setTime < minTime ) {
                    $('#spaServiceTime').val(minTime.toString('HHmm'));
                }
                if ( setTime > maxTime ) {
                    $('#spaServiceTime').val(maxTime.toString('HHmm'));
                }
                for (var outputDate = minTime;
                     outputDate < maxTime;
                     outputDate.add({ minutes:app.customization.spaBooking.appointmentIntervalTime })) {
                    $('.spaServiceTimeSelect').append('<option value="' + outputDate.toString('HHmm') + '"' + ((time == outputDate.toString('HHmm')) && ' selected="selected"') + '>' + outputDate.toString('h:mm tt') + '</option>');
                }
            }, 150);
            var spaTimeChange = _.debounce(function () {
                var newtime = $(this).val();
                $('.spaServiceTime').val(newtime);
                updateBookButton.call(this);
            }, 150);
            var spaRecipientGenderChange = _.debounce(function (obj) {
                if ($('#spaRecipientGender').val()!=this.value) {
                    resetAvailabilities(this)
                }
                var thisValue = $(this).val();
                if (thisValue===null) return;
                $('.spaRecipientGender').val( thisValue );
                if (this.tagName!="INPUT") {
                    thisValue && (app.data.staffGenderOrId = thisValue);
                    var recipientGender = $(this).parents('.spaItem').find('.spaRecipientGender').val()
                    var serviceStaff = $(this).parents('.spaItem').find('.spaServiceStaff').val()
                    app.data.staffGenderOrId =  recipientGender ? (serviceStaff || thisValue) : thisValue
                    this[0].value == "" && $(this[0]).remove();
                    app.dispatcher.dispatch('spaBooking', 'serviceStaffList', [this.id.substr(18), false]);
                }
                updateBookButton.call(this);
            }, 150);
            var spaServiceStaffChange = _.debounce(function (obj) {
                if ($('#spaServiceStaff').val()!=this.value) {
                    resetAvailabilities(this)
                }
                var thisValue = $(this).val();
                if (thisValue===null) return;
                $('.spaServiceStaff').val( thisValue );
                if (this.tagName!="INPUT") {
                    var recipientGender = $(this).parents('.spaItem').find('.spaRecipientGender').val()
                    app.data.staffGenderOrId =  recipientGender ? (thisValue || recipientGender) : thisValue
                    // this[0].value == "" && $(this[0]).remove();
                    app.dispatcher.dispatch('spaBooking', 'serviceStaffList', [this.id.substr(15), false, 'spaServiceStaff', thisValue]);
                }
                updateBookButton.call(this);
            }, 150);
            var serviceRecipientChange = _.debounce(function (obj) {
                if ($('#newMemberOption')[0].selected) {
                    $('.newMember').removeClass('hide')
                } else {
                    $('.newMember').addClass('hide')
                    var thisValue = $(this).val();
                    $('.serviceRecipient').val( thisValue );
                    updateBookButton.call(this);
                }
            }, 150);
            templateData.showDateList = false;
            if (!app.data.overridePMSRestriction && templateData.dateList && templateData.dateList.length > 0) {
                templateData.showDateList = true;
                if(!_.any(templateData.dateList,function(x){return x.machine == date})) {
                    date = templateData.dateList[0].machine;
                }
            }
            $('.spaServiceDate').val(app.customization.spaBooking.forceSpaDate && app.customization.spaBooking.forceSpaDate.substr(0,10) || date || Date.today().add(app.customization.spaBooking.allowBookingToday ? 0 : 1).days().toString('yyyy-MM-dd'));
            $('#spaServiceDate').change(spaDateChange);
            $('.spaServiceTime').val(time);
            $('#spaServiceTime').change(spaTimeChange);
            $('#spaRecipientGender').change(spaRecipientGenderChange);
            $('.spaRecipientGender').val(staffGenderOrId)
            $('#spaServiceStaff').change(spaServiceStaffChange);
            $('.spaServiceStaff').val(staffGenderOrId)
            $('.serviceRecipient').val(templateData.guestName)
            $('.spaAlternateButton').on('click', function (obj) {
                $(obj.target).button('loading');
                $('#progressIndicator').modal('show');
            })
            var attachSpaEventHandlers = function(spaItemElement,itemId) {
                spaItemElement.find('.datepicker').datepicker({
                    minDate:app.customization.spaBooking.allowBookingToday ? "0" : "+1",
                    maxDate:"+2Y",
                    numberOfMonths:2,
                    dateFormat:"yy-mm-dd",
                    defaultDate:$('#spaServiceDate').val()
                });
                spaItemElement.find('.required').change(function(e){
                    updateBookButton.call(this,itemId);
                })
                spaItemElement.find('.spaServiceDate').change(spaDateChange);
                if (templateData.showDateList && app.data.pmsPropertyIdsInCart.length < 1) {
                    spaItemElement.find('.spaServiceDateContainer').popover({
                        trigger: 'hover',
                        placement: 'in left',
                        offsetY: 10,
                        delay: { show: 250, hide: 300 },
                        title: app.localization.spaBooking.pmsbeforespa.dateSelectorAcknowledgePromptTitle,
                        content: app.localization.spaBooking.pmsbeforespa.dateSelectorAcknowledgePromptText.replace('a href="#/summary/setOverride"', 'a onclick="app.data.overridePMSRestriction = true;" href="#/spaBooking/service/'+spaItemElement.attr('id').substr(7)+'"')
                    });
                }
                spaItemElement.find('.spaServiceTime').change(spaTimeChange);
                $('#spaServiceDate').change();
                $('#spaServiceTime').change();
                spaItemElement.find('.itemStaffPref').on('show', function () {
                    app.dispatcher.dispatch('spaBooking', 'serviceStaffList', [this.id.substr(13),location.AllowStaff=="N"]);
                });
                spaItemElement.find('.spaServiceButton').on('click', function (obj) {
    //                if ($('#spaServiceForm').valid()) {
                    var itemId = $(this).parents('.spaItem').attr('id') && $(this).parents('.spaItem').attr('id').substr(7) || ""
                    updateBookButton.call(this, itemId);
                    if (app.customization.spaBooking.alwaysQueryPrice) {
                        obj.preventDefault();
                        var date = $('#spaServiceDate').val()
                          , time = $('#spaServiceTime').val()
                          , staffGenderOrId = ($('#spaRecipientGender'+itemId).length ? $('#spaServiceStaff').val()||$('#spaRecipientGender').val(): $('#spaServiceStaff').val())||""
                          , guestName = $('#serviceRecipient').val()||""
                        $(obj.target)
                            .button('loading')
                            .data('lookahead',app.customization.spaBooking.availabilityQueryLookaheadDays)
                            .data('startDate',date)
                            .data('startTime',time)
                        app.dispatcher.dispatch('spaBooking', 'serviceItem', [itemId, date, time, staffGenderOrId, guestName]);
                        $('.alert.notAvailable').alert('close')
                    } else {
                        $(obj.target).button('loading');
                        $('#progressIndicator').modal('show');
                        obj.target.orighref = obj.target.orighref || obj.target.href
                        obj.target.href = obj.target.orighref + '/' + $('#spaServiceDate').val() + '/' + $('#spaServiceTime').val();
                        var spaItem = $(obj.target).parents('.spaItem'),
                            recipientGender = spaItem.find('.spaRecipientGender').val(),
                            staffGender = spaItem.find('.spaServiceStaff').val();
                        obj.target.href += '/';
                        if (staffGender) {
                            obj.target.href += staffGender;
                        } else if (recipientGender) {
                            obj.target.href += recipientGender;
                        }
                        obj.target.href += '/' + encodeURIComponent($('#serviceRecipient').val())
                    }

                });
                //$('#categories .nav-tabs li:first-child').addClass('active');
                //$('#categories .tab-content div.tab-pane:first-child').addClass('active');
                //$('#categories .tab-content div.accordion-group:first-child div.accordion-body').addClass('in')
                var value_spaServiceStaff = $('#spaServiceStaff').val()
                  , value_spaRecipientGender = $('#spaRecipientGender').val()
                spaItemElement.find('.spaServiceStaff').change(spaServiceStaffChange);
                app.dispatcher.dispatch('spaBooking', 'serviceStaffList', [itemId, false, 'spaServiceStaff', value_spaServiceStaff]);

                // $('#spaServiceStaff').change();
                spaItemElement.find('.spaRecipientGender').change(spaRecipientGenderChange);
                spaItemElement.find('.spaRecipientGender').val( value_spaRecipientGender ).change();
                // $('#spaRecipientGender').change();
                spaItemElement.find('.spaItemHasStaff').click(function (obj) {
                    app.dispatcher.dispatch('spaBooking', 'serviceStaffList', [obj.target.hash.substr(8)]);
                })
                spaItemElement.find('.itemStaffPref').on('show', function(obj){
                    $(obj.target).parents('.spaItem').find('.moreOptionsButton').hide();
                });
                spaItemElement.find('.itemStaffPref').on('shown', function(obj){
                    if ($(obj.target).parents('.spaItem').data('collapse')) {
                        $(obj.target).parents('.spaItem').collapse('reset');
                    }
                });
                spaItemElement.find('.serviceRecipient .me').click(function (obj) {
                    $(obj.target).parents('.spaItem').find('.someoneInput').addClass('hidden');
                    $('.someoneInputField').removeClass('required');
                    updateBookButton.call(this);
                    if ($(obj.target).parents('.spaItem').data('collapse')) {
                        $(obj.target).parents('.spaItem').collapse('reset');
                    }
                });
                spaItemElement.find('.serviceRecipient .someone').click(function (obj) {
                    $(obj.target).parents('.spaItem').find('.someoneInput').removeClass('hidden');
                    $('.someoneInputField').addClass('required');
                    updateBookButton.call(this);
                    if ($(obj.target).parents('.spaItem').data('collapse')) {
                        $(obj.target).parents('.spaItem').collapse('reset');
                    }
                });
                spaItemElement.find('.serviceRecipientGroup .serviceRecipient').change(serviceRecipientChange);
                spaItemElement.find('.serviceRecipientGroup .newMemberAdd').on('click',function(obj){
                    obj.preventDefault();
                    updateBookButton.call(this);
                    $('#progressIndicator').modal('show');
                    app.data.loginNextURL = ['spaBooking','service',[
                         'Location' + location.LocationId + '|' + encodeURIComponent(lastItemId),
                         encodeURIComponent($('#spaServiceDate').val()),
                         encodeURIComponent($('#spaServiceTime').val()),
                         encodeURIComponent($('#spaRecipientGender').val()||$('#spaServiceStaff').val()||""),
                         encodeURIComponent($('#serviceRecipient').val()||"")
                         ]]
                    app.dispatcher.dispatch('profile', 'quickspamembercreatesubmit', [
                        "", // encodeURIComponent($('#userEmail1').val()),
                        "", // encodeURIComponent($('#userPassword1').val()),
                        "", // encodeURIComponent($('#userGender').val()),
                        "", // encodeURIComponent($('#userSalutation').val()),
                        encodeURIComponent($(this).parents('.newMember').find('.newMemberFirstName').val()),
                        encodeURIComponent($(this).parents('.newMember').find('.newMemberLastName').val()),
                        // $('#userMainPhoneH').hasClass('active') ? "H" :
                        //     $('#userMainPhoneW').hasClass('active') ? "W" :
                        //         $('#userMainPhoneO').hasClass('active') ? "O" : "",
                        "",
                        "", // encodeURIComponent($('#userHomePhone').val()),
                        "", // encodeURIComponent($('#userWorkPhone').val()),
                        "", // encodeURIComponent($('#userWorkExt').val()),
                        "", // encodeURIComponent($('#userOtherPhone').val()),
                        templateData.user.Address[0].Address1 || "", // encodeURIComponent($('#userHomeAddress1').val()),
                        templateData.user.Address[0].Address2 || "", // encodeURIComponent($('#userHomeAddress2').val()),
                        templateData.user.Address[0].City || "", // encodeURIComponent($('#userHomeCity').val()),
                        templateData.user.Address[0].StateProv || "", // encodeURIComponent($('#userHomeProvince').val()),
                        templateData.user.Address[0].Country || "", // encodeURIComponent($('#userHomeCountry').val()),
                        templateData.user.Address[0].PostCode || "", // encodeURIComponent($('#userHomePostalCode').val()),
                        "", // encodeURIComponent($('#userOtherAddress1').val()),
                        "", // encodeURIComponent($('#userOtherAddress2').val()),
                        "", // encodeURIComponent($('#userOtherCity').val()),
                        "", // encodeURIComponent($('#userOtherProvince').val()),
                        "", // encodeURIComponent($('#userOtherCountry').val()),
                        "", // encodeURIComponent($('#userOtherPostalCode').val()),
                        "1", // $('#newsletter').prop('checked') ? "1" : "0",
                        {"English":"en-us","French":"fr-ca","Spanish":"es-sp","Chinese":"zh-cn","":"en-us"}[templateData.user.Language]
                        // $('#userLanguageen-us').hasClass('active') ? "en-us" :
                        //     $('#userLanguagefr-ca').hasClass('active') ? "fr-ca" :
                        //         $('#userLanguagezh-cn').hasClass('active') ? "zh-cn" :
                        //             $('#userLanguagees-sp').hasClass('active') ? "es-sp" : ""
                    ]);
                })
            };
            $('.spaItem').on('shown', function(obj){
                var itemId = $(this).attr('id').substr(7),
                    spaItemCollapse = $("#spaItem"+itemId),
                    spaItemServiceStaff = spaItemCollapse.find('.spaServiceStaff');
                if (spaItemServiceStaff.hasClass('hasData') && !spaItemServiceStaff.val()) {
                    $('.spaServiceStaff').val('').change();
                }
                spaItemCollapse.data('collapse') && spaItemCollapse.collapse('reset');
                app.customization.googleAnalytics && _gaq.push(['_trackPageview','#/spaBooking/service/'+itemId]);
            });
            $('.spaItemToggle').on('click', function(obj){
                var itemId = $(this).attr('id').substr(13),
                    spaItemCollapse = $("#spaItem"+itemId),
                    itemData = false;
                _.each(templateData.categories, function (v, k, l) {
                    itemData = itemData || _.find(v.value,function(x){
                        return x.SpaItemId == itemId;
                    })
                });
                obj.preventDefault();
                if (!app.customization.spaBooking.autoExpandResults && spaItemCollapse.hasClass('empty')) {
                    spaItemCollapse.html(spaServiceListPartialSpaItemTpl($.extend({},itemData,templateData)));
                    spaItemCollapse.data('collapse') && spaItemCollapse.collapse('reset');
                    spaItemCollapse.removeClass('empty');
                    attachSpaEventHandlers(spaItemCollapse,itemId);
                }
                updateBookButton.call(this,itemId);
            });
            $('#categoryTabs a').click(function (obj) {
                obj.preventDefault();
                $(this).tab('show');
                //$(this.hash).has('div.accordion-group div.accordion-body.in').length || $(this.hash).find('div.accordion-group:first-child div.accordion-body').addClass('in');
            })
            $('.crossTypeLink').on('click', function(obj){
                this.href += '/' + $('#spaServiceDate').val()
            })
            
            if (!!app.customization.spaBooking.autoExpandResults) {
                _.each(templateData.categories, function (v, k, l) {
                    _.each(v.value,function(spaItem){
                        var itemId = spaItem.SpaItemId
                          , spaItemCollapse = $("#spaItem"+itemId)
                        spaItemCollapse.html(spaServiceListPartialSpaItemTpl($.extend({},spaItem,templateData)));
                        spaItemCollapse.removeClass('empty').addClass('in');
                        attachSpaEventHandlers(spaItemCollapse,itemId);

                    })
                });
                $(".spaItemToggle").removeAttr('data-parent').removeAttr('data-toggle')
                if (!!itemId) {
                    $('html, body').animate({
                        scrollTop: ($("#spaItem"+itemId).offset().top - window.document.body.scrollTop < $(window).height()*.6 ) 
                                    ? $("#spaItem"+itemId).offset().top - $(window).height()*.5
                                    : 0
                    }, 300);                    
                } else {
                    $('#categoryTabs a:first').click()
                }
            } else if (!!itemId) {
                $('#spaItemToggle'+itemId).addClass('dont-hide-alerts').click();  
            }
        },

        updateSpaItemAvailability:function(params) {
            var spaItemElement = $('#spaItem'+params.itemId)
              , buttonElement = spaItemElement.find('.spaServiceButton')
              , availabilityElement = $(app.localization.spaBooking.serviceSelection.availabilityRow)
              , availabilityMaxTime = ""
              , lookahead = +buttonElement.data('lookahead')
              , startDate = params.date // buttonElement.data('startDate')
              , startTime = addOneMinute( params.time ) // buttonElement.data('startTime')
              , openTime = spaItemElement.find('.spaServiceTimeSelect').data('opentime')
              , duration = buttonElement.data('duration')

            spaItemElement.addClass('hasAvailabilities')
            if (params.spaAvailability&&params.spaAvailability.SpaAvailability) {
                buttonElement.button('reset')
                _.each(params.spaAvailability.SpaAvailability,function(availability){
                    var conflict = false
                      , endTime = Date.parseExact(availability.StartTime,'yyyy-MM-ddHHmmss').add(duration).minutes().toString('yyyy-MM-ddHHmmss')
                    _.each(app.data.spaBookings,function(spaBooking){
                        if ( spaBooking.SpaFolioItem.BookStartTime <= endTime
                             && availability.StartTime <= spaBooking.SpaFolioItem.BookEndTime ) {
                            conflict = true
                        }
                    })
                    availabilityMaxTime = availabilityMaxTime<availability.StartTime?availability.StartTime:availabilityMaxTime
                    if (conflict) return
                    spaItemElement.find('.spaAvailability[data-time='+availability.StartTime+']').remove()
                    var newElement = availabilityElement.clone()
                      , staffName = _.find(params.spaStaffList.SpaStaff,function(x){return x.SpaStaffId==availability.SpaStaffId})
                    staffName = staffName && staffName.SpaStaffName || ''
                    newElement.attr('data-time',availability.StartTime)
                    newElement.attr('data-reqtime',params.time)
                    newElement.find('.staff').text(staffName)
                    newElement.find('.time').text(Date.parseExact(availability.StartTime.substr(10,4),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                    newElement.find('.price').text(app.localization.general.currencyPrefix + (+availability.Price).toFixed(2) + app.localization.general.currencyPostfix)
                    newElement.find('.bookButton').on('click',function(e){
                        e.preventDefault()
                        app.dispatcher.dispatch('spaBooking', 'book', [params.itemId, availability.StartTime.substr(0,10), availability.StartTime.substr(10,4), availability.SpaStaffId, params.guestName, params.staffGenderOrId, 0]);
                    })
                    spaItemElement.find('.spaServiceButton').after(newElement)
                })
                // if params.spaAvailability.SpaAvailability.length<5 make note that there are no more today
            } else {
                if (lookahead > 0) {
                    if (startTime > openTime) {
                        startTime=openTime
                        // skip query if we have result with reqtime == opentime
                    } else {
                        buttonElement.data('lookahead', lookahead=lookahead-1 )
                        startDate=Date.parseExact(startDate,"yyyy-MM-dd").add(1).day().toString('yyyy-MM-dd')
                    }
                    app.dispatcher.dispatch('spaBooking', 'serviceItem', [params.itemId, startDate, startTime, params.staffGenderOrId, params.guestName]);
                } else {
                    buttonElement.button('reset')
                    spaItemElement.find('.spaServiceButton').after(
                        '<div class="alert fade in error notAvailable"><a class="close" data-dismiss="alert" href="#">×</a><p>'
                        +(app.customization.spaBooking.availabilityQueryLookaheadDays?app.localization.spaBooking.serviceSelection.notAvailableDates:app.localization.spaBooking.serviceSelection.notAvailable)
                        +(app.customization.spaBooking.availabilityQueryLookaheadDays
                            ?'</p><a class="btn" href="#">'+app.localization.spaBooking.serviceSelection.checkNextDay+'</a></div>'
                            :'</p></div>')
                        )
                    app.customization.spaBooking.availabilityQueryLookaheadDays && spaItemElement.find('.spaServiceButton').css('display','none')
                    spaItemElement.find('.alert.notAvailable .date').text(Date.parseExact(params.date,"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                    spaItemElement.find('.alert.notAvailable .fromdate').text(Date.parseExact(buttonElement.data('startDate'),"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                    spaItemElement.find('.alert.notAvailable .time').text(Date.parseExact(addOneMinute(params.time),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                    spaItemElement.find('.alert.notAvailable .staffOrGender').html(
                            params.staffGenderOrId == "M" ? app.localization.spaBooking.serviceSelection.notAvailableGenderMale :
                            params.staffGenderOrId == "F" ? app.localization.spaBooking.serviceSelection.notAvailableGenderFemale :
                            !!params.staffGenderOrId ? app.localization.spaBooking.serviceSelection.notAvailableStaff : ""
                        )
                    spaItemElement.find('.alert.notAvailable a.btn').on('click', function (obj) {
                            obj.preventDefault()
                            spaItemElement.find('.spaServiceDate').val( Date.parseExact(startDate,"yyyy-MM-dd").add(1).day().toString('yyyy-MM-dd') ).change()
                            setTimeout(function(){ spaItemElement.find('.spaServiceButton').trigger('click') },200)
                        })
                    if (!!params.staffGenderOrId && params.staffGenderOrId != "M" && params.staffGenderOrId != "F") {
                        var staffName = _.find(spaItemElement.find('.spaServiceStaff option'),function(x){return x.value==params.staffGenderOrId})
                        staffName && spaItemElement.find('.alert.notAvailable .staffName').text(staffName.text)
                    }
                    app.customization.spaBooking.availabilityQueryLookaheadDays || setTimeout(function(){
                        spaItemElement.find('.alert.notAvailable').alert('close')
                    },4500)
                }

            }
            var maxTime = ""
            spaItemElement.find('.spaServiceButton').after(
                _.sortBy(spaItemElement.find('.spaAvailability'),function(item){
                    var time = $(item).data('time')
                    maxTime = maxTime<time?time:maxTime
                    return time
                })
            )
            if (!!availabilityMaxTime) {
                if(params.date != buttonElement.data('startDate')) {
                    $('.spaServiceDate').val(params.date).change()
                    spaItemElement.find('.spaServiceButton').after(
                        '<div class="alert fade in alert-info notAvailable"><a class="close" data-dismiss="alert" href="#">×</a><p>'
                        +(app.localization.spaBooking.serviceSelection.foundOnDate)
                        +'</p></div>'
                        )
                    spaItemElement.find('.alert.notAvailable .date').text(Date.parseExact(params.date,"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                    spaItemElement.find('.alert.notAvailable .fromdate').text(Date.parseExact(buttonElement.data('startDate'),"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                    spaItemElement.find('.alert.notAvailable .time').text(Date.parseExact(addOneMinute(params.time),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                    spaItemElement.find('.alert.notAvailable .staffOrGender').html(
                            params.staffGenderOrId == "M" ? app.localization.spaBooking.serviceSelection.notAvailableGenderMale :
                            params.staffGenderOrId == "F" ? app.localization.spaBooking.serviceSelection.notAvailableGenderFemale :
                            !!params.staffGenderOrId ? app.localization.spaBooking.serviceSelection.notAvailableStaff : ""
                        )
                    if (!!params.staffGenderOrId && params.staffGenderOrId != "M" && params.staffGenderOrId != "F") {
                        var staffName = _.find(spaItemElement.find('.spaServiceStaff option'),function(x){return x.value==params.staffGenderOrId})
                        staffName && spaItemElement.find('.alert.notAvailable .staffName').text(staffName.text)
                    }
                } else {
                    buttonElement.text(Localization.spaBooking.serviceSelection.showMoreTimes)
                }
                if (availabilityMaxTime==maxTime) {
                    var nextTimeOption = _.find(spaItemElement.find('.spaServiceTime option'),function(x){
                        return x.value > maxTime.substr(10,4)
                    })
                    if (nextTimeOption) {
                        setTimeout(function(){ spaItemElement.find('.spaServiceTime').val(nextTimeOption.value).change() },200)
                    }
                } else {
                    spaItemElement.find('.spaServiceButton')
                        .after(
                        '<div class="alert fade in alert-info notAvailable noFurther"><a class="close" data-dismiss="alert" href="#">×</a><p>'
                        +(app.localization.spaBooking.serviceSelection.noFurtherAvailabilities)
                        +'</p><a class="btn" href="#">'+app.localization.spaBooking.serviceSelection.checkNextDay+'</a></div>'
                        )
                    app.customization.spaBooking.availabilityQueryLookaheadDays && spaItemElement.find('.spaServiceButton').css('display','none')
                    spaItemElement.find('.alert.notAvailable .date').text(Date.parseExact(params.date,"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                    spaItemElement.find('.alert.notAvailable .fromdate').text(Date.parseExact(buttonElement.data('startDate'),"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                    spaItemElement.find('.alert.notAvailable .time').text(Date.parseExact(addOneMinute(params.time),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                    spaItemElement.find('.alert.notAvailable .staffOrGender').html(
                            params.staffGenderOrId == "M" ? app.localization.spaBooking.serviceSelection.notAvailableGenderMale :
                            params.staffGenderOrId == "F" ? app.localization.spaBooking.serviceSelection.notAvailableGenderFemale :
                            !!params.staffGenderOrId ? app.localization.spaBooking.serviceSelection.notAvailableStaff : ""
                        )
                    spaItemElement.find('.alert.notAvailable a.btn').on('click', function (obj) {
                            obj.preventDefault()
                            spaItemElement.find('.spaServiceDate').val( Date.parseExact(startDate,"yyyy-MM-dd").add(1).day().toString('yyyy-MM-dd') ).change()
                            setTimeout(function(){ spaItemElement.find('.spaServiceButton').trigger('click') },200)
                        })

                    if (!!params.staffGenderOrId && params.staffGenderOrId != "M" && params.staffGenderOrId != "F") {
                        var staffName = _.find(spaItemElement.find('.spaServiceStaff option'),function(x){return x.value==params.staffGenderOrId})
                        staffName && spaItemElement.find('.alert.notAvailable .staffName').text(staffName.text)
                    }
                    // setTimeout(function(){
                    //     spaItemElement.find('.alert.noFurther').alert('close')
                    // },4500)
                }
            }
            availabilityElement.remove()
            /*Object {itemId: "1002", date: "2014-12-17", time: "0859", staffGenderOrId: "", guestName: ""…}
date: "2014-12-17"
guestName: ""
itemId: "1002"
spaAvailability: Object
SpaAvailability: Array[5]
0: Object
AvailabilityId: "2965"
Price: "60"
SpaStaffId: "7012"
StartTime: "2014-12-17090000"
__proto__: Object
1: Object
2: Object
3: Object
4: Object
length: 5
__proto__: Array[0]
rawData: Object
__proto__: Object
staffGenderOrId: ""
time: "0859"*/
        },

        prepSkiForm:function (location, itemId, date, templateData) {
            var skiDateChange = _.debounce(function () {
                $('.skiServiceDate').val(this.value);
                $('#progressIndicator').modal('show');
                console.log('xb')
                app.dispatcher.redirect('ski','liftTickets',['Location' + location.LocationId + '|' + encodeURIComponent($('#skiItemSelected').val()), encodeURIComponent(this.value), encodeURIComponent($('#skiRecipients').val())||'']);
            }, 150);
            var skiRecipientsChange = _.debounce(function (obj) {
                if ($('#newMemberOption')[0].selected) {
                    $('.newMember').removeClass('hide')
                } else {
                    $('.newMember').addClass('hide')
                    var thisValue = $(this).val();
                    console.log('seeting skiRecipients to ', skiRecipients);
                    $('.skiRecipients').val( thisValue );
                    console.log('xa')
                    app.dispatcher.redirect('ski','liftTickets',['Location' + location.LocationId + '|' + encodeURIComponent($('#skiItemSelected').val()), encodeURIComponent($('#skiServiceDate').val()), encodeURIComponent(this.value)||''], true);
                }
            }, 150);
            $('#newMemberAdd').on('click',function(obj){
                obj.preventDefault();
                $('#progressIndicator').modal('show');
                app.data.loginNextURL = ['ski','liftTickets',['Location' + location.LocationId + '|' + encodeURIComponent($('#skiItemSelected').val()), encodeURIComponent($('#skiServiceDate').val()), '']]
                app.dispatcher.dispatch('profile', 'quickmembercreatesubmit', [
                    "", // encodeURIComponent($('#userEmail1').val()),
                    "", // encodeURIComponent($('#userPassword1').val()),
                    "", // encodeURIComponent($('#userGender').val()),
                    "", // encodeURIComponent($('#userSalutation').val()),
                    encodeURIComponent($('#newMemberFirstName').val()),
                    encodeURIComponent($('#newMemberLastName').val()),
                    // $('#userMainPhoneH').hasClass('active') ? "H" :
                    //     $('#userMainPhoneW').hasClass('active') ? "W" :
                    //         $('#userMainPhoneO').hasClass('active') ? "O" : "",
                    "",
                    "", // encodeURIComponent($('#userHomePhone').val()),
                    "", // encodeURIComponent($('#userWorkPhone').val()),
                    "", // encodeURIComponent($('#userWorkExt').val()),
                    "", // encodeURIComponent($('#userOtherPhone').val()),
                    templateData.user.Address[0].Address1 || "", // encodeURIComponent($('#userHomeAddress1').val()),
                    templateData.user.Address[0].Address2 || "", // encodeURIComponent($('#userHomeAddress2').val()),
                    templateData.user.Address[0].City || "", // encodeURIComponent($('#userHomeCity').val()),
                    templateData.user.Address[0].StateProv || "", // encodeURIComponent($('#userHomeProvince').val()),
                    templateData.user.Address[0].Country || "", // encodeURIComponent($('#userHomeCountry').val()),
                    templateData.user.Address[0].PostCode || "", // encodeURIComponent($('#userHomePostalCode').val()),
                    "", // encodeURIComponent($('#userOtherAddress1').val()),
                    "", // encodeURIComponent($('#userOtherAddress2').val()),
                    "", // encodeURIComponent($('#userOtherCity').val()),
                    "", // encodeURIComponent($('#userOtherProvince').val()),
                    "", // encodeURIComponent($('#userOtherCountry').val()),
                    "", // encodeURIComponent($('#userOtherPostalCode').val()),
                    "1", // $('#newsletter').prop('checked') ? "1" : "0",
                    {"English":"en-us","French":"fr-ca","Spanish":"es-sp","Chinese":"zh-cn","":"en-us"}[templateData.user.Language]
                    // $('#userLanguageen-us').hasClass('active') ? "en-us" :
                    //     $('#userLanguagefr-ca').hasClass('active') ? "fr-ca" :
                    //         $('#userLanguagezh-cn').hasClass('active') ? "zh-cn" :
                    //             $('#userLanguagees-sp').hasClass('active') ? "es-sp" : ""
                ]);
            })
            templateData.showDateList = false;
            if (!app.data.overridePMSRestriction && templateData.dateList && templateData.dateList.length > 0) {
                templateData.showDateList = true;
                if(!_.any(templateData.dateList,function(x){return x.machine == date})) {
                    date = templateData.dateList[0].machine;
                }
            }
            $('.skiDate')
                .val(
                    app.customization.skiBooking.forceSkiDate && app.customization.skiBooking.forceSkiDate.substr(0,10)
                    || date
                    || Date.today().add(  app.customization.skiBooking.allowBookingToday ? 0 : 1  ).days().toString('yyyy-MM-dd')
                );
            $('#skiDate')
                .datepicker({
                    minDate:app.customization.skiBooking.allowBookingToday ? "0" : "+1",
                    maxDate:"+2Y",
                    numberOfMonths:2,
                    dateFormat:"yy-mm-dd",
                    defaultDate:$('#skiDate').val()
                })
                .change(skiDateChange);
            $('select.skiRecipients').change(skiRecipientsChange);

            var attachSkiEventHandlers = function(skiItemElement) {
                skiItemElement.find('.datepicker').datepicker({
                    minDate:app.customization.skiBooking.allowBookingToday ? "0" : "+1",
                    maxDate:"+2Y",
                    numberOfMonths:2,
                    dateFormat:"yy-mm-dd",
                    defaultDate:$('#skiServiceDate').val()
                });
                // skiItemElement.find('.required').change(updateBookButton);
                $('#skiServiceDate').change();
                skiItemElement.find('.skiServiceButton').on('click', function (obj) {
                    $(obj.target).button('loading');
                    $('#progressIndicator').modal('show');
                    obj.target.orighref = obj.target.orighref || obj.target.href
                    obj.target.href = obj.target.orighref + /*'/' + $('#skiServiceDate').val() +*/ "/" + $('#skiRecipients').val();
                });
                skiItemElement.find('.skiRecipients').val( $('#skiRecipients').val() ).change();
            };
            $('.skiItem').on('shown', function(obj){
                var itemId = $(this).attr('id').substr(7),
                    skiItemCollapse = $("#skiItem"+itemId),
                    url = '#/ski/liftTickets/Location'+location.LocationId + '|' + itemId;
                skiItemCollapse.data('collapse') && skiItemCollapse.collapse('reset');
                app.customization.googleAnalytics && _gaq.push(['_trackPageview',url]);

            });
            $('.skiItemToggle').on('click', function(obj){
                var itemId = $(this).attr('id').substr(13),
                    skiItemCollapse = $("#skiItem"+itemId),
                    itemData = false;
                _.each(templateData.categories, function (v, k, l) {
                    itemData = itemData || _.find(v.tickets,function(x){
                        return x.SkiItemId == itemId;
                    })
                });
                // if (skiItemCollapse.attr('style') && skiItemCollapse.attr('style').indexOf('height: 0px')>=0) {
                //     skiItemCollapse.attr('style', skiItemCollapse.attr('style').replace(/height: 0px/,'') ).addClass('in');
                // }
                $('#skiItemSelected').val(itemId);
                app.dispatcher.updateURL('ski','liftTickets',['Location' + location.LocationId + '|' + encodeURIComponent($('#skiItemSelected').val()), encodeURIComponent($('#skiServiceDate').val()), encodeURIComponent($('#skiRecipients').val())||''], true);
                if (skiItemCollapse.hasClass('empty')) {
                    skiItemCollapse.html(skiLiftTicketPartialSkiItemTpl($.extend({},itemData,templateData)));
                    skiItemCollapse.data('collapse') && skiItemCollapse.collapse('reset');
                    skiItemCollapse.removeClass('empty');
                    attachSkiEventHandlers(skiItemCollapse);
                }
            });
            $('#categoryTabs a').click(function (obj) {
                obj.preventDefault();
                $(this).tab('show');
                var categoryElem = $(this.hash+' div.accordion-group div.accordion-body.in');
                if (categoryElem.length==0) {
                    categoryElem = $(this.hash+' div.accordion-group:first-child div.accordion-body');
                }
                if (categoryElem.length>0) {
                    var itemId = categoryElem.attr('id').substr(7);
                    $('#skiItemSelected').val(itemId);
                    app.dispatcher.updateURL('ski','liftTickets',['Location' + location.LocationId + '|' + encodeURIComponent($('#skiItemSelected').val()), encodeURIComponent($('#skiServiceDate').val()), encodeURIComponent($('#skiRecipients').val())||''], true);
                    if (categoryElem.length==1 && !categoryElem.hasClass('in')) {
                        $('#skiItemToggle'+itemId).click();
                    }
                }
                //$(this.hash).has('div.accordion-group div.accordion-body.in').length || $(this.hash).find('div.accordion-group:first-child div.accordion-body').addClass('in');
            })
            !!itemId && _.debounce(function(){
                $('#skiItemToggle'+itemId).addClass('dont-hide-alerts').click();
            },200)()

        },

        prepPMSInputForm:function (venue, arrivalDate, departureDate, dayGuest) {
            var validateOnChange = function () {
                $('#pmsDatesForm').validate({
                    errorPlacement: function(error, element) {
                        element.parent().append(error)
                    }
                });


                if ($('#pmsDatesForm').valid()) {
                    $('#pmsFormSubmit').addClass('btn-primary').removeClass('disabled');
                } else {
                    $('#pmsFormSubmit').addClass('btn-primary').addClass('disabled');
                }
            }
            var bookDateOffset = app.customization.roomsBooking.allowBookingToday ? 0 : 1;

            $('#pmsDatesForm .required').change(validateOnChange);
            $('#pmsArrivalDate').val(arrivalDate?arrivalDate.toString('yyyy-MM-dd'):Date.today().add(bookDateOffset).days().toString('yyyy-MM-dd') );
            if (!!dayGuest) {
                $('#pmsArrivalDate').addClass('datepicker').datepicker({
                    minDate:bookDateOffset,
                    maxDate:"+2Y",
                    numberOfMonths:2,
                    dateFormat:"yy-mm-dd",
                    defaultDate:$('#pmsArrivalDate').val()
                });
                $('label[for=pmsArrivalDate].add-on').html('<i class="icon-calendar"></i>');
            } else {
                $('#pmsDepartureDate').val(departureDate ? departureDate.toString('yyyy-MM-dd') : (arrivalDate?arrivalDate.toString('yyyy-MM-dd'):Date.today().add(bookDateOffset).days().toString('yyyy-MM-dd')) ).datepicker('option', {'defaultDate':"+" + (bookDateOffset + 1) + "d", "minDate":"+" + (bookDateOffset + 1) + "d"});
                var datecontrols = ["#pmsDepartureDate", "#pmsArrivalDate"];
                var touch = $('html').hasClass('touch');
                var depth = {count:0};
                //console.log('docwidth at load',$(document).width());
                $('#pmsDatesCalendar').data('venue',venue);
                if (!jQuery.datepicker.__adjustDate) {
                    jQuery.datepicker.__adjustDate = jQuery.datepicker._adjustDate;
                }
                jQuery.datepicker._adjustDate = function( a,b,c ) {
                    jQuery.datepicker.__adjustDate( a,b,c );
                    if ($("#pmsDatesCalendar").length) {
                        app.commonViewHelper.updateRateCalendarData(venue);
                    }
                }
                if (!jQuery.datepicker.__updateDatepicker) {
                    jQuery.datepicker.__updateDatepicker = jQuery.datepicker._updateDatepicker;
                }
                jQuery.datepicker._updateDatepicker = function( a ) {
                    jQuery.datepicker.__updateDatepicker.call( this,a );
                    if ($("#pmsDatesCalendar").length) {
                        if (depth.count++ <5) { 
                            app.commonViewHelper.updateRateCalendar(false,venue);
                        }
                        depth.count--;
                    }

                }

                function setupCalendar() {
                    $("#pmsDatesCalendar").html('').removeClass('hasDatepicker').data('datepicker',null).datepicker({
                        defaultDate:(arrivalDate||Date.today().add(bookDateOffset).days()).toString('yyyy-MM-dd'), //"+" + bookDateOffset + "d",
                        changeMonth:false,
                        numberOfMonths:window.matchMedia("(max-width: 979px)").matches ? 1 : 2,
                        dateFormat:"yy-mm-dd",
                        minDate:"+" + bookDateOffset + "d",
                        maxDate:"+2Y",
                        altField:"#pmsArrivalDate",
                        dayNames: app.localization.CultureInfo.dayNames,
                        dayNamesMin: app.localization.CultureInfo.shortestDayNames,
                        dayNamesShort: app.localization.CultureInfo.abbreviatedDayNames,
                        monthNamesShort: app.localization.CultureInfo.abbreviatedMonthNames,
                        monthNames: app.localization.CultureInfo.monthNames,

                        onSelect:function (selectedDate) {
                            var altField = _.first(_.without(datecontrols, jQuery.datepicker._optionDatepicker(this,'altField') ));
                            $(datecontrols).each(function(x){
                                if(this==altField) {
                                    $("label[for="+this.substr(1)+"].add-on").removeClass('hidden')
                                } else {
                                    $("label[for="+this.substr(1)+"].add-on").addClass('hidden')
                                }
                            });
                            var inst=jQuery.datepicker._getInst(this);
                            inst.settings.altField = altField;
                            if (altField=="#pmsArrivalDate") {
                                var dateDiff =Date.parse($("#pmsDepartureDate").val()).compareTo( Date.parse($("#pmsArrivalDate").val()) );
                                if (dateDiff < 0) {
                                    var a = $("#pmsDepartureDate").val(),
                                        b = $("#pmsArrivalDate").val();
                                    inst.input.val(b);
                                    $("#pmsDepartureDate").val(b);
                                    $("#pmsArrivalDate").val(a).focus();
                                } else  if (dateDiff == 0) {
//                                     var a = Date.parse($("#pmsDepartureDate").val()).add(1).day().toString('yyyy-MM-dd');
//                                     $("#pmsDepartureDate").val(a);
//                                     inst.input.val(a);
                                    $("#pmsArrivalDate").focus();
                                } else {
                                    $("#pmsArrivalDate").focus();
                                }
                                $('#pmsDatesCalendar').data('popOverTouchButtonText',app.localization.roomReservation.calendar.selectArrivalDateButton);
                                $('.datepickernextstep').text(app.localization.roomReservation.calendar.clickContinueToProceed);
                                inst.rangeEnd = inst.input.val();
                                inst.rangeStart = $("#pmsArrivalDate").val();
                                /*var rangeEnd = Date.parse(inst.rangeEnd),
                                    rangeStart = Date.parse(inst.rangeStart);*/
                                inst.currentDay = inst.selectedDay = $("#pmsArrivalDate").val().substr(8);
                                inst.currentMonth = inst.selectedMonth = $("#pmsArrivalDate").val().substr(5,2)-1;
                                inst.input.val($("#pmsArrivalDate").val());
                            } else {
                                $("#pmsDepartureDate").val('').focus();
                                inst.rangeStart = inst.rangeEnd = null;
                                $('#pmsDatesCalendar').data('popOverTouchButtonText',app.localization.roomReservation.calendar.selectDepartureDateButton);
                                $('.datepickernextstep').text(app.localization.roomReservation.calendar.selectDepartureDateOnCalendar);
                            }
                            //console.log('selectedDate',selectedDate,this,altField,$(altField));
                           // app.commonViewHelper.updateRateCalendar(true,venue);
                            $('div.popover').remove();
                        },
                        onChangeMonthYear: function(year, month, inst) {
                            //console.log('onChangeMonthYear', year, month, inst);
                            $("#pmsDatesCalendar td .ui-state-default").append('<span class="small">&nbsp;</span>');
                        },
                        xbeforeShowDay: function(date) {
                            //console.log('beforeShowDat', date, this);
                            //$("#pmsDatesCalendar td .ui-state-default").append('<span class="small">&nbsp;</span>');
                            var asdf = date.toString("yyyy/M/d").split('/');
                            return (
                                app.data.pmsDatesCalendar
                                && app.data.pmsDatesCalendar[venue]
                                && app.data.pmsDatesCalendar[venue][asdf[1]+'/'+asdf[0]]
                                && app.data.pmsDatesCalendar[venue][asdf[1]+'/'+asdf[0]][asdf[2]] == undefined
                                )   ? [false, '']
                                    : [true, ''];
                        }
                    });
                }

                setupCalendar();
                app.commonViewHelper.updateRateCalendar(true,venue);
                if (!!app.data.windowResizeHandler) {
                    $(window).unbind('resize',app.data.windowResizeHandler);
                }
                var lastWindowSize = null;
                app.data.windowResizeHandler = _.debounce(function(){
                    if ($("#pmsDatesCalendar").length) {
                        var currentWindowSize = $(document).width();
                        if (currentWindowSize!=lastWindowSize) {
                            lastWindowSize=currentWindowSize;
                            setupCalendar();
                            app.commonViewHelper.updateRateCalendar(true,venue);
                        }
                    } else {
                        $(window).unbind('resize',app.data.windowResizeHandler)
                    }
                }, 500);
                $(window).bind('resize',app.data.windowResizeHandler);
                $('#pmsDatesCalendar').data('popOverTouchButtonText',app.localization.roomReservation.calendar.selectArrivalDateButton);
                $('#pmsDatesCalendar').removeAttr('style');
                $("#pmsDepartureDate").bind('click', function(){
                    var inst=jQuery.datepicker._getInst($('#pmsDatesCalendar')[0]);
                    inst.settings.altField = "#pmsDepartureDate";
                    inst.rangeStart = null;
                    var date = Date.parse($("#pmsArrivalDate").val()),
                        year = date.toString('yyyy'),
                        month = +date.toString('M') - 1,
                        day = date.toString('d');
                    //inst.rangeEnd = null;
                    $('#pmsDatesCalendar .ui-datepicker-inline td .ui-state-default').removeClass('ui-state-active ui-state-selected');
                    $('#pmsDatesCalendar .ui-datepicker-inline td[data-year='+year+'][data-month='+month+'][data-day='+day+'] a').addClass('ui-state-active');
                    $('#pmsDatesCalendar').data('popOverTouchButtonText',app.localization.roomReservation.calendar.selectArrivalDateButton);
                    $('.datepickernextstep').text(app.localization.roomReservation.calendar.selectDepartureDateOnCalendar);
                    $("label[for=pmsDepartureDate].add-on").removeClass('hidden')
                    $("label[for=pmsArrivalDate].add-on").addClass('hidden')
                    app.commonViewHelper.updateRateCalendar(true,venue);
                });
                $("#pmsArrivalDate").bind('click', function(){
                    var inst=jQuery.datepicker._getInst($('#pmsDatesCalendar')[0]);
                    inst.settings.altField = "#pmsArrivalDate";
                    inst.rangeStart = null;
                    inst.rangeEnd = null;
                    $('#pmsDatesCalendar .ui-datepicker-inline td .ui-state-default').removeClass('ui-state-active ui-state-selected');
                    $('#pmsDatesCalendar').data('popOverTouchButtonText',app.localization.roomReservation.calendar.selectDepartureDateButton);
                    $('.datepickernextstep').text(app.localization.roomReservation.calendar.selectArrivalDateOnCalendar);
                    $("label[for=pmsArrivalDate].add-on").removeClass('hidden')
                    $("label[for=pmsDepartureDate].add-on").addClass('hidden')
                    app.commonViewHelper.updateRateCalendar(true,venue);
                });

            }
            /*            $('#pmsArrivalDate,#pmsDepartureDate').change(function(e) {
             var arrivalDate = Date.parse($('#pmsArrivalDate').val()),
             departureDate = Date.parse($('#pmsDepartureDate').val());
             if (e.target.id == "pmsArrivalDate" && arrivalDate.add(1).days() > departureDate) {
             $('#pmsDepartureDate').val( arrivalDate.add(1).days().toString('yyyy-MM-dd') )
             }
             if (e.target.id == "pmsDepartureDate" && arrivalDate > departureDate.add(1).days() ) {
             $('#pmsArrivalDate').val( departureDate.subtract(1).days().toString('yyyy-MM-dd') )
             }
             });*/
            $('#showMore').click(function(obj){
                obj.preventDefault();
                $('#more').removeClass('hidden');
                $('#showMore').remove();
            })
            $('#pmsFormSubmit').on('click', function (obj) {
                $('#pmsDatesForm').validate({
                    errorPlacement: function(error, element) {
                        element.parent().append(error)
                    }
                });
                if ($('#pmsDatesForm').valid()) {
                    $(obj.target).button('loading');
                    obj.target.href += "/" + Date.parse($('#pmsArrivalDate').val()).toString('yyyy-MM-dd000000')
                        + "/" + ( dayGuest
                                    ? Date.parse($('#pmsArrivalDate').val()).add(1).days().toString('yyyy-MM-dd000000')
                                    : Date.parse($('#pmsDepartureDate').val()).toString('yyyy-MM-dd000000')
                                )
                        + "/" + ($('#pmsNumAdults').val() || "")
                        + "/" + ($('#pmsNumYouth').val() || "")
                        + "/" + ($('#pmsNumChildren').val() || "")
                        + "/" + ($('#pmsNumJrChildren').val() || "")
                        + "/" + ($('#pmsPromoCode').val() || "");
                } else {
                    return false;
                }

            });
        },

        prepPMSRateForm:function(){
            $('.btn-primary').on('click', function (obj) {
                $(obj.target).button('loading');
            });
        },

        updateDayRoomTypeData:function(rateType, roomTypes){
            if (!!roomTypes && roomTypes.length) {
                var count = roomTypes.length,
                    prices = {},
                    pricelist = [];
                _.each(roomTypes,function(x){
                    var theprice = app.customization.roomsBooking.suppressDailyRate ? +x.TotalStayRate : +x.AverageRate;
                    prices[theprice]=x;
                    pricelist.push(theprice);
                })
                pricelist = _.uniq(_.sortBy(pricelist,function(v,k){
                    return v;
                }), true);

                // roomTypes = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
                var fromTxt = pricelist.length > 1 ? app.localization.roomReservation.roomTypeSelection.roomTypeFromLabel : "",
                    atag = $('a[href=#collapse'+stripChars(rateType)+']');
                atag.find('span.pull-right').remove();
                var spantag = $('<span class="pull-right btn btn-mini disabled btn-info"></span>');
                spantag.text( fromTxt
                                + app.localization.general.currencyPrefix
                                + (app.customization.roomsBooking.suppressDailyRate ? +prices[pricelist[0]].TotalStayRate : +prices[pricelist[0]].AverageRate).toFixed(2)
                                + app.localization.general.currencyPostfix
                                + (app.customization.roomsBooking.suppressDailyRate
                                        ? app.localization.roomReservation.roomTypeSelection.roomTypeTotalRateLabel
                                        : app.localization.roomReservation.roomTypeSelection.roomTypeRateLabel));
                atag.append(spantag);
                if (count==1) {
                    $('#collapse'+rateType+' a.btn-primary').attr('href', '#/roomsBooking/roomtype/' + encodeURIComponent(rateType) + '/' + encodeURIComponent(roomTypes[0].PMSRoomType.PMSRoomTypeId) +'/1');
                }
            }
        },

        updateRateCalendar:function(request, venue) {
             if ($("#pmsDatesCalendar").length == 0) {
                return;
             }
            console.log('updateRateCalendar',request, venue);
            var _time = new Date()
            $(".ui-datepicker-inline,.datepicker-legend").css('width', ($(document).width() < 395 ? '100%' : window.matchMedia("(max-width: 979px)").matches ? '25em' : '50em'));
            var dpgf = window.matchMedia("(max-width: 979px)").matches ? 'ui-datepicker-inline' : 'ui-datepicker-group-first',
                dpg = window.matchMedia("(max-width: 979px)").matches ? 'ui-datepicker-inline' : 'ui-datepicker-group',
                origmonth = _.indexOf( app.localization.CultureInfo.monthNames, $("#pmsDatesCalendar ."+dpgf+" .ui-datepicker-month:first").text() ) + 1,
                inst = jQuery.datepicker._getInst($("#pmsDatesCalendar")[0]),
                rangeStart = inst.rangeStart ? Date.parse(inst.rangeStart) : null,
                rangeEnd = inst.rangeEnd ? Date.parse(inst.rangeEnd) : null,
                isSelectingEnd = !$("label[for=pmsDepartureDate]").hasClass('hidden'),
                selectedStart = Date.parseExact($("#pmsArrivalDate").val(),"yyyy-MM-dd"),
                selectedMonthYear = selectedStart && (selectedStart.getMonth()+1) + "/" + selectedStart.getFullYear(),
                selectedDay = selectedStart && selectedStart.getDate(),
                selectedEnd = Date.parseExact($("#pmsDepartureDate").val(),"yyyy-MM-dd"),
                selectedEndMonthYear = selectedEnd && (selectedEnd.getMonth()+1) + "/" + selectedEnd.getFullYear(),
                selectedEndDay = selectedEnd && selectedEnd.getDate(),
                waitForRoomTypeData = false
                limit = 62;
            // console.log('isSelectingEnd',isSelectingEnd,'selectedStart',selectedStart,rangeStart,rangeEnd);
          if (!!app.data.pmsDatesCalendar
                    && !!app.data.pmsDatesCalendar[venue]
                    && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]) 
          {
            while ( limit > 0 
                && ( !!app.data.pmsDatesCalendar
                    && !!app.data.pmsDatesCalendar[venue]
                    && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]
                    && !app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay])
                || (
                        !!app.data.pmsDatesCalendar
                        && !!app.data.pmsDatesCalendar[venue]
                        && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]
                        && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay]
                        && app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].bestRate
                        && (
                            (   app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].bestRate.availMonSun != "YYYYYYY"
                                && app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].bestRate.availMonSun[ (selectedStart.getDay()+6) % 7 ] == "N")
                            || app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].bestRate.stopArrivals == "Y"
                            )
                        )
                ) {
                selectedStart.add(1).day()
                selectedMonthYear = selectedStart && (selectedStart.getMonth()+1) + "/" + selectedStart.getFullYear(),
                selectedDay = selectedStart && selectedStart.getDate(),
                limit--;
            }
            var stop = false
            while ( selectedEnd
                 && limit > 0
                 && ( 
                       selectedStart >= selectedEnd  
                    || (
                        !!app.data.pmsDatesCalendar
                        && !!app.data.pmsDatesCalendar[venue]
                        && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]
                        && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay]
                        && app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].MinLOS >= 2 
                        && selectedEnd.between(
                            selectedStart.clone().add(1).days(), 
                            selectedStart.clone().add(+app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].MinLOS-1).days()
                            )
                        )
                    )
                ) {
                selectedEnd.add(1).day()
                selectedEndMonthYear = selectedEnd && (selectedEnd.getMonth()+1) + "/" + selectedEnd.getFullYear(),
                selectedEndDay = selectedEnd && selectedEnd.getDate(),
                rangeStart = selectedStart.clone()
                rangeEnd = selectedEnd.clone()
                inst.rangeStart = rangeStart.toString("yyyy-MM-dd")
                inst.rangeEnd = rangeEnd.toString("yyyy-MM-dd")
                if ((!!app.data.pmsDatesCalendar
                            && !!app.data.pmsDatesCalendar[venue]
                            && !!app.data.pmsDatesCalendar[venue][selectedEndMonthYear]
                            && !app.data.pmsDatesCalendar[venue][selectedEndMonthYear][selectedEndDay]
                        )
                    || (
                            !!app.data.pmsDatesCalendar
                            && !!app.data.pmsDatesCalendar[venue]
                            && !!app.data.pmsDatesCalendar[venue][selectedEndMonthYear]
                            && !!app.data.pmsDatesCalendar[venue][selectedEndMonthYear][selectedEndDay]
                            && app.data.pmsDatesCalendar[venue][selectedEndMonthYear][selectedEndDay].bestRate
                            && app.data.pmsDatesCalendar[venue][selectedEndMonthYear][selectedEndDay].bestRate.availMonSun != "YYYYYYY"
                            && app.data.pmsDatesCalendar[venue][selectedEndMonthYear][selectedEndDay].bestRate.availMonSun[ (selectedStart.getDay()+6) % 7 ] == "N"
                        )) 
                {
                    stop = stop || limit-1 // _.max([limit,stop])
                    console.log('selectedEnd,limit,stop',selectedEnd,limit,stop)
                }
                limit = (stop>=limit) ? 0 : limit-1
            }
            if (limit==0) {
                $("#pmsDepartureDate").val( "" )
                inst.rangeEnd = ""
                rangeEnd = null
            } else {
                if (!!app.data.pmsDatesCalendar
                    && !!app.data.pmsDatesCalendar[venue]
                    && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]
                    && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay]
                    && $("#pmsArrivalDate").val()!= selectedStart.toString("yyyy-MM-dd")) {
                        var prevSelectedStart = Date.parseExact($("#pmsArrivalDate").val(),"yyyy-MM-dd")
                        $("#pmsArrivalDate").val( selectedStart.toString("yyyy-MM-dd") )
                        $("#pmsDatesCalendar").datepicker( "setDate", selectedStart.toString("yyyy-MM-dd") );
                    }
                if (!!app.data.pmsDatesCalendar
                    && !!app.data.pmsDatesCalendar[venue]
                    && !!app.data.pmsDatesCalendar[venue][selectedEndMonthYear]
                    && !!app.data.pmsDatesCalendar[venue][selectedEndMonthYear][selectedEndDay]
                    && $("#pmsDepartureDate").val()!= selectedEnd.toString("yyyy-MM-dd")) {
                        $("#pmsDepartureDate").val( selectedEnd.toString("yyyy-MM-dd") )
                    }
            }
          }
            var month = _.indexOf( app.localization.CultureInfo.monthNames, $("#pmsDatesCalendar ."+dpgf+" .ui-datepicker-month:first").text() ) + 1,
                year = +$("#pmsDatesCalendar ."+dpgf+" .ui-datepicker-year:first").text()
            if (origmonth!=month) {
                request=true
            }
            $("#pmsDatesCalendar ."+dpg).each(function (i) {
                var monthyeardate = Date.parseExact(month.toString() + '/' + year.toString(), "M/yyyy").add(i).months(),
                    monthyear = monthyeardate.toString("M/yyyy");
                if (!!venue && !!app.data.pmsDatesCalendar && !!app.data.pmsDatesCalendar[venue] && !!app.data.pmsDatesCalendar[venue][monthyear]) {
                    var that=this;
                    $(this).find("td").blur();
                    $(this).find("td .ui-state-default span.small").remove();
                    $(this).find("td .ui-state-default").each(function (j) {
                        var day = $(this).text(),
                            monthyeardatecopy = monthyeardate.clone(),
                            theDay = monthyeardatecopy.add(+day-1).days(),
                            today = Date.today().add(app.customization.roomsBooking.allowBookingToday ? 0 : 1).days()
                        if (rangeStart !== null) {
                            if (theDay > rangeStart && theDay <= rangeEnd ) {
                                $(this).addClass(theDay.compareTo(rangeEnd)==0 ? 'ui-state-active' : 'ui-state-selected');
                            }
                            if (theDay == rangeStart && theDay <= rangeEnd ) {
                                $(this).addClass('ui-state-active');
                            }
                        }

                        if ( app.data.pmsDatesCalendar[venue][monthyear][day] == undefined 
                             || (
                                app.data.pmsDatesCalendar[venue][monthyear][day].bestRate
                                && app.data.pmsDatesCalendar[venue][monthyear][day].bestRate.availMonSun != "YYYYYYY"
                                && app.data.pmsDatesCalendar[venue][monthyear][day].bestRate.availMonSun[ (theDay.getDay()+6) % 7 ] == "N"
                                )
                            ) {
                            if (!app.customization.roomsBooking.suppressCalendarRate) {
                                $(this).append('<span class="small">'+(theDay>=today?app.localization.roomReservation.calendar.notAvailable:'&nbsp;')+'</span>');
                            }
                            if (theDay>=today) {
                                if (rangeEnd ? theDay.compareTo(rangeEnd)!=0 : true ) {
                                    $(this).addClass('ui-datepicker-unselectable ui-state-disabled').removeClass('ui-state-active');
                                }
/*                                var prevDay = theDay.clone().add(-1).days(),
                                    prevDayMonthYear = prevDay && (prevDay.getMonth()+1) + "/" + prevDay.getFullYear(),
                                    prevDayDay = prevDay && prevDay.getDate()
                                if (app.data.pmsDatesCalendar[venue][prevDayMonthYear]
                                    && !app.data.pmsDatesCalendar[venue][prevDayMonthYear][prevDayDay]
                                    || (    app.data.pmsDatesCalendar[venue][prevDayMonthYear][prevDayDay].bestRate
                                            && app.data.pmsDatesCalendar[venue][prevDayMonthYear][prevDayDay].bestRate.availMonSun == 'Y')
                                    ) {

                                }*/
                            }
                        } else {
                            var bestRate = app.data.pmsDatesCalendar[venue][monthyear][day].bestRate,
                                rate = (+bestRate.MinRate).toFixed(app.customization.roomsBooking.calendarRateDecimals),
                                roomType = stripChars(bestRate.PMSRoomType),
                                totalrooms = bestRate.totalrooms,
                                level = stripChars(bestRate.NumRoomLeft);
                            if (totalrooms <= app.customization.roomsBooking.lowAvailabilityThreshold) {
                                $(this).addClass('ui-state-low');
                            }
                            if (!!app.data.pmsDatesCalendar[venue][monthyear][day] 
                                    && +app.data.pmsDatesCalendar[venue][monthyear][day].MinLOS >= 2
                                    && !isSelectingEnd) {
                                $(this).addClass('min-los').attr('data-min-los',app.data.pmsDatesCalendar[venue][monthyear][day].MinLOS);
                            }
                            app.customization.roomsBooking.suppressCalendarRate ||
                                $(this).append('<span class="small level'+level+' room'+roomType+'">'+app.localization.general.currencyPrefix+rate+app.localization.general.currencyPostfix+'</span>');
                        }

                        if (isSelectingEnd && selectedStart
                            && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]
                            && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay]
                            && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].lastCheckOutDate
                            && app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].lastCheckOutDate < theDay
                            ) {
                                if (!$(this).parent('td').hasClass('ui-datepicker-unselectable')) {
                                    $(this).parent('td').addClass('ui-datepicker-unselectable ui-state-disabled rangeLock')
                                } else {
                                    $(this).addClass('ui-datepicker-unselectable ui-state-disabled').parent('td').addClass('rangeLock')
                                }
                        } else if (isSelectingEnd && selectedStart
                            && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]
                            && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay]
                            && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].firstCheckOutDate
                            && app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].firstCheckOutDate >= theDay) {
                            if (!$(this).parent('td').hasClass('ui-datepicker-unselectable')) {
                                $(this).parent('td').addClass('ui-datepicker-unselectable ui-state-disabled rangeLock')
                            } else {
                                $(this).parent('td').addClass('rangeLock')
                            }
                        } else {
                            if (isSelectingEnd && selectedStart
                                && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]
                                && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay]
                                && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].lastCheckOutDate
                                && app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].lastCheckOutDate.compareTo(theDay) == 0) {
                                // debugger
                                $(this).removeClass('ui-datepicker-unselectable ui-state-disabled').parent('td').addClass('rangeLock').removeClass('ui-datepicker-unselectable ui-state-disabled');
                            } else if ( app.data.pmsDatesCalendar[venue][monthyear][day] == undefined
                                        || (    app.data.pmsDatesCalendar[venue][monthyear][day].bestRate
                                             && app.data.pmsDatesCalendar[venue][monthyear][day].bestRate.availMonSun != "YYYYYYY" 
                                             && app.data.pmsDatesCalendar[venue][monthyear][day].bestRate.availMonSun[ (theDay.getDay()+6) % 7 ] == "N" )
                                ) {
                                $(this).parent('td').addClass('ui-datepicker-unselectable')
                                // if ($(this).parent('td').hasClass('rangeLock')){
                                //     $(this).parent('td').removeClass('rangeLock').find('a').addClass('ui-datepicker-unselectable ui-state-disabled')
                                // }
                            } 

                            if ( (isSelectingEnd || theDay.compareTo(selectedStart)==-1)
                                && !!app.data.pmsDatesCalendar[venue][selectedMonthYear]
                                && !!app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay]
                                &&  +app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].MinLOS >= 2 
                                && theDay.between(selectedStart.clone().add(1).days(), selectedStart.clone().add(+app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].MinLOS-1).days())
                                ) {
                                $(this).parent('td').addClass('rangeLock min-los').attr('data-range-min-los',app.data.pmsDatesCalendar[venue][selectedMonthYear][selectedDay].MinLOS)
                                if (!$(this).parent('td').hasClass('ui-datepicker-unselectable')) {
                                    $(this).parent('td').addClass('ui-datepicker-unselectable ui-state-disabled')
                                }
                            } else if ( (!isSelectingEnd || theDay.compareTo(selectedStart)==-1) ) {
                                if( !!bestRate && bestRate.stopArrivals == 'Y'){
                                    if (!$(this).hasClass('ui-state-active')) {
                                        $(this).parent('td').addClass('ui-state-disabled')
                                    }
                                    $(this).parent('td').addClass('ui-datepicker-unselectable stop-arrivals')
                                } else if (isSelectingEnd 
                                                && app.data.pmsDatesCalendar[venue][monthyear]
                                                && app.data.pmsDatesCalendar[venue][monthyear][day]
                                                && app.data.pmsDatesCalendar[venue][monthyear][day].MinLOS >= 2
                                                && selectedStart.between(theDay.clone().add(1).days(), theDay.clone().add(+app.data.pmsDatesCalendar[venue][monthyear][day].MinLOS-1).days())) {
                                    $(this).parent('td').addClass('rangeLock min-los').attr('data-range-min-los',app.data.pmsDatesCalendar[venue][monthyear][day].MinLOS)
                                    $(this).parent('td').addClass('ui-datepicker-unselectable ui-state-disabled')
                                }
                            } else if ($(this).parent('td').hasClass('rangeLock')){
                                $(this).parent('td').removeClass('ui-datepicker-unselectable ui-state-disabled rangeLock min-los')
                            } else {
                                $(this).parent('td').removeClass('rangeLock min-los')
                            }
                        }
                    });
                            
                } else {
                    waitForRoomTypeData = true;
                    if (request===true) {
                        app.commonViewHelper.updateRateCalendarData(venue,monthyear);
                    }
                    $(this).find("td .ui-state-default span.small").remove();
                    app.customization.roomsBooking.suppressCalendarRate ||
                        $(this).find("td .ui-state-default").removeClass('ui-state-low ui-datepicker-unselectable ui-state-disabled').append('<span class="small">...</span>');
                }
            });
            console.log('paint calendar',new Date().getTime() - _time.getTime())
            // the magic value null for request means that we were called from the controller for roomTypeData, which got us some
            // data. the other values that could be received are either false (which is called from __updateDatepicker in
            // commonViewHelper) or true (which means we will only be issuing the updateRateCalendarData request which in turn
            // populates the list of room types that need to be fetched by roomTypeData.
            // maybe we only need to ever dispatch this if request===null, but that would be to assume no call after the initial
            // updateRateCalendarData call will be for more than one month, and possibly we'd call roomtypedata too soon, before
            // knowing the list of room types returned in the next month to see whether there's a new one we need to fetch.
            app.data.beenBackFromDispatcherRateCalendar = app.data.beenBackFromDispatcherRateCalendar || (request===null);
            !waitForRoomTypeData && app.data.beenBackFromDispatcherRateCalendar && app.dispatcher.dispatch('roomsBooking', 'roomtypedata', []);
        },
        // TODO: identify return from controller vs a call in commonviewhelper, and then only dispatch roomtypedata when its come back at least once from controller.
        updateRateCalendarData:function(venue,monthyear) {
            var dpgf = window.matchMedia("(max-width: 979px)").matches ? 'ui-datepicker-inline' : 'ui-datepicker-group-first',
                dpg = window.matchMedia("(max-width: 979px)").matches ? 'ui-datepicker-inline' : 'ui-datepicker-group';
            if (!!monthyear) {
                app.dispatcher.dispatch('roomsBooking', 'ratecalendar', monthyear.split('/'));
            } else {
                var month = _.indexOf( app.localization.CultureInfo.monthNames, $("#pmsDatesCalendar ."+dpgf+" .ui-datepicker-month").text() ) + 1,
                    year = +$("#pmsDatesCalendar ."+dpgf+" .ui-datepicker-year").text(),
                    waitForRoomTypeData = false;
                $("#pmsDatesCalendar ."+dpg).each(function (i) {
                    var monthyear = Date.parseExact(month.toString() + '/' + year.toString(), "M/yyyy").add(i).months().toString("M/yyyy");
                    if (!!app.data.pmsDatesCalendar && !!app.data.pmsDatesCalendar[venue] && !!app.data.pmsDatesCalendar[venue][monthyear]) {
                    } else {
                        waitForRoomTypeData = true;
                        app.dispatcher.dispatch('roomsBooking', 'ratecalendar', monthyear.split('/'));
                    }
                });
                !waitForRoomTypeData && app.dispatcher.dispatch('roomsBooking', 'roomtypedata', []);
            }
        },

        roomTypeDataReady:function() {
            app.data.roomTypeDataReadyClick ? (app.data.roomTypeDataReadyClick++) : (app.data.roomTypeDataReadyClick = 1);
            var dpgf = window.matchMedia("(max-width: 979px)").matches ? 'ui-datepicker-inline' : 'ui-datepicker-group-first',
                dpg = window.matchMedia("(max-width: 979px)").matches ? 'ui-datepicker-inline' : 'ui-datepicker-group',
                roomTypeDataReadyClick = app.data.roomTypeDataReadyClick,
                lastCheckOutDateList = [],
                firstCheckOutDateList = [],
                noGoodCheckOutDate = null;
            //try {console.log('roomTypeDataReady', app.data.pmsDatesCalendar['Lodge']['10/2012'][1].Date, app.data.pmsRoomTypeData['DRES']['Venue']);} catch(e){}
            $('#pmsDatesCalendar .'+dpg+' td').each(function(x,elem){
                if (roomTypeDataReadyClick != app.data.roomTypeDataReadyClick) { console.log('over click', roomTypeDataReadyClick, app.data.roomTypeDataReadyClick); return; }
                var venue = $('#pmsDatesCalendar').data('venue'),
                    month = +$(elem).attr('data-month'),
                    year = +$(elem).attr('data-year'),
                    monthyear = (month+1)+'/'+year,
                    day = $(elem).attr('data-day'),
                    touch = $('html').hasClass('touch') && ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? false : true );
                //console.log('hover',x,monthyear,day,elem, venue);
                if (month!==NaN && year!==NaN && day!==undefined) {
                    if (!!app.data.pmsDatesCalendar && !!app.data.pmsDatesCalendar[venue] && !!app.data.pmsDatesCalendar[venue][monthyear] && !!app.data.pmsDatesCalendar[venue][monthyear][day]) {
                        lastCheckOutDateList.push(app.data.pmsDatesCalendar[venue][monthyear][day]);
                        if (noGoodCheckOutDate) {
                            app.data.pmsDatesCalendar[venue][monthyear][day].firstCheckOutDate = noGoodCheckOutDate;
                        }
                    } else {
                        $(lastCheckOutDateList).each(function(i,d){
                            d.lastCheckOutDate = new Date(year,month,day);
                        })
                        lastCheckOutDateList = [];
                        noGoodCheckOutDate = new Date(year,month,day);
                    }
                }
                if (!app.customization.roomsBooking.suppressCalendarPopover && month!==NaN && year!==NaN && !!app.data.pmsDatesCalendar && !!app.data.pmsDatesCalendar[venue] && !!app.data.pmsDatesCalendar[venue][monthyear] && !!app.data.pmsRoomTypeData ) {

                    touch && $(elem).unbind('click').bind('click',function(e){
                        $(elem).addClass('ui-state-hover');
                        return false;
                    });
                    if (!!app.data.pmsDatesCalendar[venue][monthyear][day] && !!app.data.pmsDatesCalendar[venue][monthyear][day].bestRate ) {

                        var bestRate = app.data.pmsDatesCalendar[venue][monthyear][day].bestRate,
                            roomDetails = app.data.pmsRoomTypeData[bestRate.PMSRoomType];
                        $(elem).data('popover',undefined).popover({
                            trigger: 'hover',
                            onEnter: function(){
                                (roomTypeDataReadyClick+1 < app.data.roomTypeDataReadyClick) && this.$tip && this.$tip.remove() //&& console.log('snip!');
                                touch && this.$element[0].scrollIntoView(true);
                            },
                            beforeEnter: function(){
                                var minLosElement = this.$element.find('a.min-los')
                                if (minLosElement.length) {
                                    if (!this.options._content_added) {
                                        this.options.content += "\n\n" + app.localization.roomReservation.calendar.minLOSRestriction( minLosElement.attr('data-min-los') || "" )
                                        this.options._content_added = true
                                    }
                                }
                                minLosElement = this.$element.hasClass('min-los') && this.$element.hasClass('rangeLock')
                                if (minLosElement) {
                                    if (!this.options._content_added) {
                                        this.options.content += "\n\n" + app.localization.roomReservation.calendar.minLOSRestriction( this.$element.attr('data-range-min-los') || "" )
                                        this.options._content_added = true
                                    }
                                }
                                return (!touch || !this.$element.hasClass('ui-datepicker-unselectable'))
                            },
                            placement: touch ? 'in bottom' : 'bottom',
                            delay: { show: 500, hide: 100 },
                            title: ( bestRate.totalrooms <= app.customization.roomsBooking.lowAvailabilityThreshold
                                    ?   ( app.customization.roomsBooking.suppressCalendarRate
                                        ? app.localization.roomReservation.calendar.limitedAvailability
                                        : app.localization.roomReservation.calendar.limitedAvailabilityFrom )
                                    :   ( app.customization.roomsBooking.suppressCalendarRate
                                        ? app.localization.roomReservation.calendar.roomsAvailable
                                        : app.localization.roomReservation.calendar.roomsAvailableFrom ) )
                                    + ( app.customization.roomsBooking.suppressCalendarRate ? '' : bestRate.MinRate)
                                    + (touch ? '<a class="close" onclick="$(this).parents(\'div.popover\').remove(); return false" href="#">&times;</a>' : ''),
                            content: (roomDetails
                                    ? '<div class="pmsRoomDesc month'+month+' year'+year+' day'+day+' clearfix"><img style="padding-left:1em" src="'+ roomDetails.PMSRoomTypeImage + '" align="right" width="100">' + roomDetails.PMSRoomTypeDesc + '<br><br><span class="small">' + (roomDetails.PMSRoomTypeCustDesc || '')+ '</span>'+( touch
                                        ? '<a href="#" onclick="javascript:$(\'label[for=pmsDepartureDate].add-on.hidden,label[for=pmsArrivalDate].add-on.hidden\').map(function(){$(this.htmlFor==\'pmsArrivalDate\'?\'pmsDepartureDate\':\'pmsArrivalDate\').val(\''+year+'-'+(1+month)+'-'+day+'\')}); $(\'#pmsDatesCalendar td[data-month='+month+'][data-year='+year+'][data-day='+day+']\').map(function(){$.datepicker._selectDay(\'#pmsDatesCalendar\', '+month+', '+year+', this);}); return false;" class="popOverTouchButton hasimg btn btn-primary btn-large">'+$('#pmsDatesCalendar').data('popOverTouchButtonText')+'</a>'
                                        : '')+'</div>'
                                    : app.localization.roomReservation.calendar.noDescriptionAvailable)
                                    + ($(elem).hasClass('stop-arrivals')
                                        ? "\n\n" + app.localization.roomReservation.calendar.noRoomsAvailableNoAction
                                        : "")

                            //'$(\'label[for=pmsDepartureDate].add-on.hidden,label[for=pmsArrivalDate].add-on.hidden\').map(function(){$(this.htmlFor==\'pmsArrivalDate\'?\'pmsDepartureDate\':\'pmsArrivalDate\').val(\''+year+'-'+(1+month)+'-'+day+'\')})'
                        });
                        //$(elem).popover('show');
                        //console.log('deets!!', bestRate.PMSRoomType, roomDetails, app.data.pmsRoomTypeData);
                    } else {
                        $(elem).data('popover',undefined).popover({
                            trigger: 'hover',
                            onEnter: function(){
                                (roomTypeDataReadyClick != app.data.roomTypeDataReadyClick) && this.$tip.remove();
                                touch && this.$element[0].scrollIntoView(true);
                            },
                            beforeEnter: function(){
                                var minLosElement = this.$element.hasClass('min-los')
                                if (minLosElement) {
                                    if (!this.options._content_added) {
                                        this.options.content += "\n\n" + app.localization.roomReservation.calendar.minLOSRestriction( this.$element.attr('data-range-min-los') || "" )
                                        this.options._content_added = true
                                    }
                                }
                                return (!touch || !this.$element.hasClass('ui-datepicker-unselectable'))
                            },
                            placement: touch ? 'in bottom' : 'bottom',
                            delay: { show: 500, hide: 100 },
                            title: app.localization.roomReservation.calendar.noRoomsAvailable,
                            content:    ( $(elem).hasClass('rangeLock')
                                            ? app.localization.roomReservation.calendar.noRoomsAvailableAction
                                                + ( touch ? '<div class="pmsRoomDesc"><a href="#" onclick="javascript:$(\'label[for=pmsDepartureDate].add-on.hidden,label[for=pmsArrivalDate].add-on.hidden\').map(function(){$(this.htmlFor==\'pmsArrivalDate\'?\'pmsDepartureDate\':\'pmsArrivalDate\').val(\''+year+'-'+(1+month)+'-'+day+'\')}); $(\'#pmsDatesCalendar td[data-month='+month+'][data-year='+year+'][data-day='+day+']\').map(function(){$.datepicker._selectDay(\'#pmsDatesCalendar\', '+month+', '+year+', this);}); return false;" class="popOverTouchButton hasimg btn btn-primary btn-large">'+$('#pmsDatesCalendar').data('popOverTouchButtonText')+'</a></div>' : "")
                                            : app.localization.roomReservation.calendar.noRoomsAvailableNoAction
                                        )
                        });
                        //console.log('no deets');
                    }

                } else {
                //console.log('boo');
                }
            });
        },

        prepPMSConfirmForm:function () {
            $('#pmsFormSubmit').on('click', function (obj) {
                $(obj.target).button('loading');
                $('#progressIndicator').modal('show');
            });
        },
        prepGolfConfirmForm: function() {
            $('.popover .close').click(function(o){
                o.preventDefault();
                $(o.target).parents('.popover').hide();
            })
        },
        updatedTeeTimes: function() {
            $('#golfTeeInfoSubmit').addClass('disabled');
            $('.bookGolfTime').click(function(obj){

            });
        },
        prepGolfForm:function (location, selectedStartTime) {
            selectedStartTime = selectedStartTime || "";
            $('.datepicker').datepicker({
                minDate:app.customization.golfBooking.allowBookingToday ? "0" : "+1",
                maxDate:"+2Y",
                numberOfMonths:2,
                dateFormat:"yy-mm-dd",
                defaultDate:app.customization.golfBooking.allowBookingToday ? "0" : "+1"
            });

            var updateGolfButton = function () {
                $('#golfTeeInfo').validate();
                if ($('#golfTeeInfo').valid()) {
                    $('#golfTeeInfoSubmit').removeClass('disabled').removeAttr('title');
                } else {
                    $('#golfTeeInfoSubmit').addClass('disabled').attr('title', app.localization.golf.error.date);
                }
            }

            var endDTime;
            var golfDateChange = function () {
                updateGolfButton();

                var time = $('#golfTeeTime').val();
                var teedate = $.datepicker.parseDate('yy-mm-dd', $('#golfTeeDate').val());
                var teedatestr = $.datepicker.formatDate('yyyy-mm-dd', teedate);
                var todaystr = $.datepicker.formatDate('yyyy-mm-dd', new Date());
                var sameday = teedatestr==todaystr;
                var dayofweek = $.datepicker.formatDate('DD', teedate );
                var startTime = !!location[dayofweek + 'Open'] && location[dayofweek + 'Open'].substr(10, 4);
                var endTime = !!location[dayofweek + 'Close'] && location[dayofweek + 'Close'].substr(10, 4);
                endDTime = endTime;
                $('#golfTeeTime').html('');
                for (var outputDate = Date.parse(startTime.substr(0, 2) + ":" + startTime.substr(2, 2));
                     outputDate < Date.parse(endTime.substr(0, 2) + ":" + endTime.substr(2, 2));
                     outputDate.add({ minutes:app.customization.golfBooking.teeTimeIntervalTime })) {
                  if (!sameday || outputDate > (new Date())) {
                      $('#golfTeeTime').append('<option value="' + outputDate.toString('HHmm') + '"' + ((selectedStartTime.substr(0,4) == outputDate.toString('HHmm')) && ' selected="selected"') + '>' + outputDate.toString('h:mm tt') + '</option>');
                  }
                }
            };
            $('#golfTeeDate').change(golfDateChange);
            $('#golfTeeTime').change(updateGolfButton);
            $('#golfTeeDate').val($('#golfTeeDate').val() || Date.today().add(app.customization.golfBooking.allowBookingToday ? 0 : 1).days().toString('yyyy-MM-dd'));
            $('#golfTeeDate').change();
            $('#golfTeeInfoSubmit').on('click', function (obj) {
                if ($('#golfTeeInfo').valid()) {
                    $('#progressIndicator').modal('show');
                    obj.target.orighref = obj.target.orighref || obj.target.href;
                    obj.target.href = obj.target.orighref
                        + "/" + Date.parse($('#golfTeeDate').val()).toString('yyyy-MM-dd')
                        + "/" + $('#golfTeeTime').val() + '00'
                        + "/" + endDTime + '00'
                        + "/" + $('#golfTeePlayers').val()
                } else {
                    return false;
                }

            });
        },
        updateSpaServiceStaffList:function (showitem, staffList, staffGenderOrId, location, type, value) {
            var requireGender = ""
              , found = (value=="M"||value=="F")?"found":"";
            if ($('#spaRecipientGender' + showitem).length) {
                requireGender = $('#spaRecipientGender' + showitem).val()
                $('#spaServiceForm #itemStaffPref' + showitem + ' select.spaServiceStaff').html(
                    location.AllowStaff == "Y"
                        ? '<optgroup class="staffList" label="' + app.localization.spaBooking.serviceSelection.staffLabel + '"><option value="">' + app.localization.general.gender.noPreference + '</option></optgroup>'
                        : ''
                );
            } else {
                $('#spaServiceForm #itemStaffPref' + showitem + ' select.spaServiceStaff').html(
                    (
                    location.AllowGender == "Y"
                        ? '<optgroup label="' + app.localization.spaBooking.serviceSelection.genderLabel + '"><option value="">' + app.localization.general.gender.noPreference + '</option><option '+(staffGenderOrId=="M" ? 'selected="selected" ' : '')+'value="M">' + app.localization.general.gender.male + '</option><option ' + (staffGenderOrId=="F" ? 'selected="selected" ' : '') + 'value="F">' + app.localization.general.gender.female + '</option></optgroup>'
                        : ''
                    ) + (
                    location.AllowStaff == "Y"
                        ? '<optgroup class="staffList" label="' + app.localization.spaBooking.serviceSelection.staffLabel + '"><option value="">' + app.localization.general.gender.noPreference + '</option></optgroup>'
                        : ''
                    )
                );
            }
            if (location.AllowStaff == "Y") {
                staffList = _.sortBy(staffList,function(staff){return staff.SpaStaffName});
                $.each(staffList, function (index, spaStaff) {
                    if (!requireGender || requireGender == spaStaff.Gender) {
                        $('#spaServiceForm #itemStaffPref' + showitem + ' select.spaServiceStaff .staffList').append('<option ' + ((type=='spaServiceStaff'?value:staffGenderOrId) == spaStaff.SpaStaffId ? (found='selected="selected" '): '')  + 'value="' + spaStaff.SpaStaffId + '">' + spaStaff.SpaStaffName + '</option>');
                        staffGenderOrId == spaStaff.SpaStaffId && $('.spaRecipientGender').val(spaStaff.Gender);
                    }
                });
            }
            if (type=="spaServiceStaff") {
                    thisValue = found?value:""
                    $('.spaServiceStaff').val( thisValue );
                    var recipientGender = $('#spaRecipientGender'+showitem).val()
                    app.data.staffGenderOrId =  recipientGender ? (thisValue || recipientGender) : thisValue
            }
            $('#spaServiceStaff'+showitem).addClass('hasData')
        },
        prepUserProfileForm:function () {
//            $('.nav-tabs').button();
            $('#userMainPhone .btn, #userLanguage .btn').on('click',function (obj) {
                $('#userProfileForm').validate();
                obj.preventDefault();
            })
            // $('#userProfileCancel').on('click', function (obj) {
            //         obj.target.href += "/profile"
            // })

            $('#userProfileSubmit').on('click', function (obj) {
                obj.preventDefault();
                if ($('#userProfileForm').valid()) {
                    $('#progressIndicator').modal('show')
                    app.dispatcher.dispatch('profile', 'detailssubmit', [
                        encodeURIComponent($('#userEmail1').val()||""),
                        encodeURIComponent($('#userPassword1').val()||""),
                        encodeURIComponent($('#userGender').val()),
                        encodeURIComponent($('#userSalutation').val()),
                        encodeURIComponent($('#userFirstName').val()),
                        encodeURIComponent($('#userLastName').val()),
                        $('#userMainPhoneH').hasClass('active') ? "H" :
                            $('#userMainPhoneW').hasClass('active') ? "W" :
                                $('#userMainPhoneO').hasClass('active') ? "O" : "",
                        encodeURIComponent($('#userHomePhone').val()),
                        encodeURIComponent($('#userWorkPhone').val()),
                        encodeURIComponent($('#userWorkExt').val()),
                        encodeURIComponent($('#userOtherPhone').val()),
                        encodeURIComponent($('#userHomeAddress1').val()),
                        encodeURIComponent($('#userHomeAddress2').val()),
                        encodeURIComponent($('#userHomeCity').val()),
                        encodeURIComponent($('#userHomeProvince').val()),
                        encodeURIComponent($('#userHomeCountry').val()),
                        encodeURIComponent($('#userHomePostalCode').val()),
                        encodeURIComponent($('#userOtherAddress1').val()),
                        encodeURIComponent($('#userOtherAddress2').val()),
                        encodeURIComponent($('#userOtherCity').val()),
                        encodeURIComponent($('#userOtherProvince').val()),
                        encodeURIComponent($('#userOtherCountry').val()),
                        encodeURIComponent($('#userOtherPostalCode').val()),
                        $('#newsletter').prop('checked') ? "1" : "0",
                        $('#userLanguageen-us').hasClass('active') ? "en-us" :
                            $('#userLanguagefr-ca').hasClass('active') ? "fr-ca" :
                                $('#userLanguagezh-cn').hasClass('active') ? "zh-cn" :
                                    $('#userLanguagees-sp').hasClass('active') ? "es-sp" : "",
                        encodeURIComponent($('#userSkiSize').val()),
                        encodeURIComponent($('#userSkiBootSize').val()),
                        encodeURIComponent($('#userSnowboardSize').val()),
                        encodeURIComponent($('#userSnowboardBootSize').val()),
                        encodeURIComponent($('#userDinNumber').val()),
                        encodeURIComponent($('#userAge').val()),
                        encodeURIComponent($('#userWeight').val()),
                        encodeURIComponent($('#userHeight').val())
                    ]);
                } else {
                    $('html, body').animate({
                        scrollTop: $("label.error:visible").offset().top - 70
                    }, 300);
                }
            })


            $('#userProfileForm').validate({
                rules: {
                    userPassword1: {
                        minlength: 8
                    },
                    userPassword2: {
                        equalTo: "#userPassword1"
                    },
                    userHomePhone: {
                        required: function(e) {
                            return $('#userMainPhoneH').hasClass('active');
                        }
                    },
                    userWorkPhone: {
                        required: function(e) {
                            return $('#userMainPhoneW').hasClass('active');
                        }
                    },
                    userOtherPhone: {
                        required: function(e) {
                            return $('#userMainPhoneO').hasClass('active');
                        }
                    },
                    userHomeProvince: {
                        required: function(e) {
                            return $('#userHomeCountry').val()=="CA" || $('#userHomeCountry').val()=="US" && app.customization.requireAddress;
                        }
                    }
                }
            });

        },
        prepCreateUserForm:function (type) {
//            $('.nav-tabs').button();
            $('#userMainPhone .btn, #userLanguage .btn').on('click',function (obj) {
                $('#userCreateUserForm').validate();
                obj.preventDefault();
            })
            $('#userAddressType .btn').on('click',function (obj) {
                obj.preventDefault();
            })
            $('#userCreateCancel').on('click', function (obj) {
                    obj.target.href += "/profile"
            })
            $('#userEmail1').on('change', function (obj) {
                $('#userEmail1').attr('data-isChecked','false');
                $.when(app.models.userModel.getData('checkCustomerEmail', {EmailAddress:$('#userEmail1').val()}))
                    .done(function (r_ce) {
                        $('#userEmail1').attr('data-isChecked','true');
                        $('#userEmail1').attr('data-exists','false');
                        $('#userEmail1').valid();
//                        $('.alert-hide').alert('close');
                    })
                    .fail(function (r_ce) {
                        $('#userEmail1').attr('data-isChecked','true');
                        $('#userEmail1').attr('data-exists','true');
                        $('#userEmail1').valid();
                        //console.log('email exists')
                       /* app.data.messages.push({ type:'alert', class:'alert-info', actions:[],
                            title:"You already have an account in this system. Log in or Reset your password to continue."//,
                            //message:"(" + r_cc.Result.Text + ")"
                        });
                        app.dispatcher.dispatch('profile','login',[$('#userEmail1').val()])*/
//                        $('.alert-hide').alert('close');
//                        app.commonViewHelper.showMessage({type:'alert', class:'alert-error alert-hide', title:app.localization.general.err.emailErrExist })
                    })

            });

            $('#userCreateSubmit').on('click', function (obj) {
                obj.preventDefault();
                if ($('#userCreateUserForm').valid()) {
                    $('#progressIndicator').modal('show')
                    app.dispatcher.dispatch('profile', (type == 'member' ? 'membercreatesubmit' : 'createsubmit'), [
                        encodeURIComponent($('#userEmail1').val()||""),
                        encodeURIComponent($('#userPassword1').val()||""),
                        encodeURIComponent($('#userGender').val()),
                        encodeURIComponent($('#userSalutation').val()),
                        encodeURIComponent($('#userFirstName').val()),
                        encodeURIComponent($('#userLastName').val()),
                        $('#userMainPhoneH').hasClass('active') ? "H" :
                            $('#userMainPhoneW').hasClass('active') ? "W" :
                                $('#userMainPhoneO').hasClass('active') ? "O" : "",
                        encodeURIComponent($('#userHomePhone').val()),
                        encodeURIComponent($('#userWorkPhone').val()),
                        encodeURIComponent($('#userWorkExt').val()),
                        encodeURIComponent($('#userOtherPhone').val()),
                        encodeURIComponent($('#userHomeAddress1').val()),
                        encodeURIComponent($('#userHomeAddress2').val()),
                        encodeURIComponent($('#userHomeCity').val()),
                        encodeURIComponent($('#userHomeProvince').val()),
                        encodeURIComponent($('#userHomeCountry').val()),
                        encodeURIComponent($('#userHomePostalCode').val()),
                        encodeURIComponent($('#userOtherAddress1').val()),
                        encodeURIComponent($('#userOtherAddress2').val()),
                        encodeURIComponent($('#userOtherCity').val()),
                        encodeURIComponent($('#userOtherProvince').val()),
                        encodeURIComponent($('#userOtherCountry').val()),
                        encodeURIComponent($('#userOtherPostalCode').val()),
                        $('#newsletter').prop('checked') ? "1" : "0",
                        $('#userLanguageen-us').hasClass('active') ? "en-us" :
                            $('#userLanguagefr-ca').hasClass('active') ? "fr-ca" :
                                $('#userLanguagezh-cn').hasClass('active') ? "zh-cn" :
                                    $('#userLanguagees-sp').hasClass('active') ? "es-sp" : ""
                    ]);
                } else {
                    $('html, body').animate({
                        scrollTop: $("label.error:visible").offset().top - 70
                    }, 300);
                }
            })

            jQuery.validator.addMethod(
                "emailExists",
                function(value, element) {
                    var retval = ($(element).attr('data-isChecked') == 'false' || $(element).attr('data-exists') == 'false' );

                    return this.optional(element) || retval;
                },
                app.localization.general.err.emailErrExist + (app.customization.disablePasswordReset ? '' : '<a class="btn btn-mini" href="#/profile/reset/' + encodeURIComponent($('#userEmail1').val()) + '">' + Localization.general.login.forgotPasswordButtonLabel + '</a>')
            );
            $('#userCreateUserForm').validate({
                rules: {
                    userPassword1: {
                        minlength: 8
                    },
                    userEmail1: {
                        emailExists: "#userEmail1"
                    },
                    userEmail2: {
                        equalTo: "#userEmail1"
                    },
                    userPassword2: {
                        equalTo: "#userPassword1"
                    },
                    userHomePhone: {
                        required: function(e) {
                            return $('#userMainPhoneH').hasClass('active');
                        }
                    },
                    userWorkPhone: {
                        required: function(e) {
                            return $('#userMainPhoneW').hasClass('active');
                        }
                    },
                    userOtherPhone: {
                        required: function(e) {
                            return $('#userMainPhoneO').hasClass('active');
                        }
                    },
                    userHomeProvince: {
                        required: function(e) {
                            return $('#userHomeCountry').val()=="CA" || $('#userHomeCountry').val()=="US" && app.customization.requireAddress;
                        }
                    }

                }
            });

        },
        prepChangePasswordForm:function () {
            var validateOnChange = function () {
                $('#userChangePasswordForm').validate();
                if ($('#userChangePasswordForm').valid()) {
                    $('#userChangeSubmit').addClass('btn-primary').removeClass('disabled');
                }
            }
            $('#userChangePasswordForm .required').change(validateOnChange);
            $('#userChangeCancel').on('click', function (obj) {
                    obj.target.href += "/profile"
                }
            )
            $('#userEmailAddress').on('change', function (obj) {
                $.when(app.models.userModel.getData('checkCustomerEmail', {EmailAddress:$('#userEmailAddress').val()}))
                    .done(function (r_ce) {
                        obj.preventDefault();
                        $('.alert-hide').alert('close');
                        app.commonViewHelper.showMessage({type:'alert', 'class':'alert-error alert-hide', title:app.localization.general.err.emailErrNotExist})
                    })
                    .fail(function (r_ce) {
                        $('.alert-hide').alert('close');
                    })

            });

            $('#userChangeSubmit').on('click', function (obj) {
                    if  ($('#userOldPassword').val().length < 1) {
                        obj.preventDefault();
                        $('.alert-hide').alert('close');
                        app.commonViewHelper.showMessage({type:'alert', 'class':'alert-error alert-hide', title:app.localization.general.login.changePassword.err.min8chars})
                        return;
                    }
                    if  (($('#userNewPassword1').val().length < 8) || ($('#userNewPassword2').val().length < 8)) {
                        obj.preventDefault();
                        $('.alert-hide').alert('close');
                        app.commonViewHelper.showMessage({type:'alert', 'class':'alert-error alert-hide', title:app.localization.general.login.changePassword.err.min8chars})
                        return;
                    }
                    if ($('#userNewPassword1').val() != $('#userNewPassword2').val()) {
                        obj.preventDefault();
                        $('.alert-hide').alert('close');
                        app.commonViewHelper.showMessage({type:'alert', 'class':'alert-error alert-hide', title:app.localization.general.login.changePassword.err.passwordsDoNotMatch})
                        return;
                    }

                    if ($('#userChangePasswordForm').valid()) {
                        $('#progressIndicator').modal('show')
                        obj.target.href += "/profile/dochange/" + $("#userEmailAddress").val() + "/" + $("#userOldPassword").val() + "/" + $("#userNewPassword1").val();
                    } else {
                        return false;
                    }
                }
            )
        },
        prepResetPasswordForm:function () {
            var validateOnChange = function () {
                $('#userResetPasswordForm').validate();
                if ($('#userResetPasswordForm').valid()) {
                    $('#userResetSubmit').addClass('btn-primary').removeClass('disabled');
                }
            }
            $('#userResetPasswordForm .required').change(validateOnChange);
//            $('.nav-tabs').button();
            $('#userResetCancel').on('click', function (obj) {
                    obj.target.href += "/profile"
                }
            )
            $('#userResetSubmit').on('click', function (obj) {
                    if ($('#userResetPasswordForm').valid()) {
                        $('#progressIndicator').modal('show')
                        obj.target.href += "/profile/doreset/" + $("#userEmailAddress").val();
                    } else {
                        return false;
                    }
                }
            )
        },
        prepCCPaymentForm:function () {
//            $('.nav-tabs').button();
            $('#cartCCFormCancel').on('click', function (obj) {
                    obj.target.href += "/summary"
                }
            )
            var maskOptions =   {
                onKeyPress :  function(cep, e, field, options){
                    var mask = '0000 0000 0000 0999'
                    switch (cep.substr(0,1)) {
                        case "3" : $('#cartCCtype').val('AMEX')
                                    mask = '0000 000000 00000'
                                    break;
                        case "4" : $('#cartCCtype').val('VISA')
                                    break;
                        case "5" : $('#cartCCtype').val('M/C')
                                    break;
                        case "6" : $('#cartCCtype').val('DISC')
                                    break;
                    }
                    $('#cartCCNum').mask(mask, options);
                }
            }
            $('#cartCCNum').mask('0000 0000 0000 0999', maskOptions);
            jQuery.validator.addMethod(
                "lessThanCurrent",
                function(value, element, param) {
                    var isValid = $('#cartCCexpyear').val() == Date.today().toString("yyyy") ? ($('#cartCCexpmon').val() >= +Date.today().toString("M")) : true;
                    if (isValid) {
                        $('#cartCCexpmon, #cartCCexpyear').removeClass('error').addClass('valid');
                    } else {
                        $('#cartCCexpmon, #cartCCexpyear').removeClass('valid').addClass('error');
                    }
                    return isValid
                },
                app.localization.paymentProcessing.err.pastExpiryDate
            );
            var validator = $('#cartCCPaymentForm').validate({
                rules: {
                    cartCCcvv: {
                        minlength: 3,
                        maxlength: 4,
                        required: true
                    },
                    cartCCexpmon: 'lessThanCurrent',
                    cartCCexpyear: 'lessThanCurrent',
                    cartCCNum: {
                        minlength: 13,
                        maxlength: 19,
                        required: true,
                        creditcard: true
                    }
                },
                errorPlacement: function(error, element) {
                    $('#cartCCFormSubmit').removeClass('btn-primary').addClass('disabled');
                    if (element.attr("name") == "cartCCexpmon" ) {
                        error.insertAfter("#cartCCexpContainer");
                    } else {
                        error.insertAfter(element);
                    }

                },
                groups: {
                    cartCCexp: "cartCCexpmon cartCCexpyear"
                },
                messages: {
                    cartCCexpmon : app.localization.paymentProcessing.err.pastExpiryDate,
                    cartCCexpyear : app.localization.paymentProcessing.err.pastExpiryDate,
                    cartCCNum : Localization.general.err.jquery_validate.creditcard
                },
                submitHandler: function() {
                    $('#progressIndicator').modal('show')
                    $('#cartCCFormSubmit').button('loading');

                    app.dispatcher.dispatch('summary', 'ccPaySubmit', [
                        encodeURIComponent($('#cartCCNum').val().replace(/[^\d]*/g,'')),
                        encodeURIComponent($('#cartCCtype').val()),
                        encodeURIComponent($('#cartCCexpmon').val()),
                        encodeURIComponent($('#cartCCexpyear').val()),
                        encodeURIComponent($('#cartCCcvv').val()),
                        encodeURIComponent($('#cartCCFName').val()),
                        encodeURIComponent($('#cartCCLName').val()),
                        encodeURIComponent($('#cartCCaddress').val()),
                        encodeURIComponent($('#cartCCaddress2').val()),
                        encodeURIComponent($('#cartCCcity').val()),
                        encodeURIComponent($('#cartCCstate').val()),
                        encodeURIComponent($('#cartCCzip').val()),
                        encodeURIComponent($('#cartCCcountry').val())
                    ])
                    return false;
                },
                success: function(label) {
                    if (!$('#cartCCPaymentForm .required:not(.valid)').length) {
                        $('#cartCCFormSubmit').addClass('btn-primary').removeClass('disabled');
                    }
                },
                invalidHandler: function(event, validator) {
                    $('#cartCCFormSubmit').removeClass('btn-primary').addClass('disabled');
                }
            });
            /*$('#cartCCFormSubmit').on('click', function (obj) {
                    obj.preventDefault();
                    if ($(obj.target).hasClass('disabled')) {
                        $('#cartCCPaymentForm').valid();
                        return false;
                    }
                    if ($('#cartCCPaymentForm').valid()) {
                        $('#progressIndicator').modal('show')
                        $('#cartCCFormSubmit').button('loading');

                        app.dispatcher.dispatch('summary', 'ccPaySubmit', [
                            $('#cartCCNum').val(),
                            $('#cartCCtype').val(),
                            $('#cartCCexpmon').val(),
                            $('#cartCCexpyear').val(),
                            $('#cartCCcvv').val(),
                            $('#cartCCFName').val(),
                            $('#cartCCLName').val(),
                            $('#cartCCaddress').val(),
                            $('#cartCCaddress2').val(),
                            $('#cartCCcity').val(),
                            $('#cartCCstate').val(),
                            $('#cartCCzip').val(),
                            $('#cartCCcountry').val()
                        ])
                        return false;
                    } else {
                        return false;
                    }
                }
            )*/
            app.models.userModel.getData('fetchCustomerProfile', {
                    CustomerId: app.data.CustomerId,
                    CustomerGUID: app.data.CustomerGUID
                })
                    .done(function(r_fcp){
                        var customer = $.firstOrOnly(r_fcp.Customer)
                        if (customer) {
                            $('#cartCCFName').val(customer.Name&&customer.Name.FirstName).parents('.control-group').addClass('filled')
                            $('#cartCCLName').val(customer.Name&&customer.Name.LastName).parents('.control-group').addClass('filled')
                            var homeAddress = _.find(customer.Address, function(address){
                                return address.type=="HOME"
                            })
                            var otherAddress = _.find(customer.Address, function(address){
                                return address.type=="OTHER"
                            })
                            if (otherAddress && otherAddress.Address1) {
                                $('#cartCCaddress').val(otherAddress.Address1)
                                $('#cartCCaddress2').val(otherAddress.Address2)
                                $('#cartCCcity').val(otherAddress.City)
                                $('#cartCCstate').val(otherAddress.StateProv)
                                $('#cartCCzip').val(otherAddress.PostCode)
                                selectedCountry = _.find(app.localization.countryList,function(x){return x.name==otherAddress.Country})
                                $('#cartCCcountry').val(selectedCountry && selectedCountry.code || otherAddress.Country)
                            } else if (homeAddress) {
                                $('#cartCCaddress').val(homeAddress.Address1)
                                $('#cartCCaddress2').val(homeAddress.Address2)
                                $('#cartCCcity').val(homeAddress.City)
                                $('#cartCCstate').val(homeAddress.StateProv)
                                $('#cartCCzip').val(homeAddress.PostCode)
                                selectedCountry = _.find(app.localization.countryList,function(x){return x.name==homeAddress.Country})
                                $('#cartCCcountry').val(selectedCountry && selectedCountry.code || homeAddress.Country)
                            }
                        }
                    })
            var isFormValid = function(elem,form) {
                var valid=validator.check(elem,true)
                valid && $.each(form[0],function() {
                    valid &= validator.check(arguments[1],true);
                });
                return valid
            }

            var validateOnChange = _.debounce(function () {
                if (isFormValid(this,$('#cartCCPaymentForm'))) {
                    $('#cartCCFormSubmit').addClass('btn-primary').removeClass('disabled');
                }
            }, 300)
            $('#cartCCPaymentForm .required').change(validateOnChange);
            $('#cartCCPaymentForm .required').blur(validateOnChange);
            $('#cartCCPaymentForm .required').keypress(validateOnChange);
            setTimeout(function(){
                $('#cartCCNum').focus()
            },150)
        },
        prepUserLoginForm:function () {
            if (!app.customization.login.useIntegratedLogin || !!app.data.userLoggedIn) {
                $('#userCreateUser').on('click', this, function (obj) {
                        obj.target.href += "/profile/create"
    //                    obj.preventDefault();
    //                    obj.data.showMessage({type:'alert', class:'alert-info', title:'Not yet implemented'})
                        }
                )
                $('#userResetPassword').on('click', this, function (obj) {
                        obj.target.href += "/profile/reset"
    //                    obj.preventDefault();
    //                    this.showMessage({type:'alert',class:'alert-info',title:'Not yet implemented'})
                    }
                )
                $('#userLoginCancel').on('click', function (obj) {
                        obj.target.href += "/"
                    }
                )
                $('#userLoginSubmit').on('click', function (obj) {
                        $('#progressIndicator').modal('show');
                        app.dispatcher.updateURL('profile', 'login', [], true)
                        app.dispatcher.dispatch('profile', 'authenticate', [encodeURIComponent($('#userEmailAddress').val()), encodeURIComponent($('#userPassword').val())]);
                        obj.preventDefault();
                    }
                )
            } else {
                var emailCheckResult = function(email,data) {
                        if (data[email]) {
                            $('.control-group.userEmail1 .controls')
                                .popover('destroy')
                                .removeClass('arrow-right')
                            $('.control-group.userPassword1 .controls')
                                .popover({content:'<span class="close" onclick="$($(this).parents(\'.popover\')).remove()" href="#">&times;</span>'+app.localization.newUser.enterPasswordPrompt, trigger:'focus', selector: 'input', placement: popoverPositionFn, container:'#userCreateUserForm1'})
                            // $('#userPassword1').focus()
                                // .popover('show')
                            $('#userCreateUserForm .well.submit-controls,#userCreateUserForm .well.passwords,#userCreateUserForm .well.contact,#userCreateUserForm .well.address,#userCreateUserForm .well.address-other,#userCreateUserForm .well.language,#userCreateUserForm .well.newsletter')
                                .addClass('disabled').find('input,select,textarea').attr('disabled','disabled')
                            $('.row-fluid.passwords.exist, .row-fluid.login').addClass('in')
                            $('#userPassword1, .row-fluid .forgot .btn').removeAttr('disabled') // .row-fluid.login = login and forgot btns. .row-fluid .login = just login btn
                            $('#userEmail2').attr('disabled','disabled')
    $('input').one('touchstart.lala', function () {
        $(this).focus();   // inside this function the focus works
        focused = $(this); // just for the example when I click next on fiddle
    });

                                $('#userPassword1').trigger('touchstart.lala');
                            setTimeout(function(){
                                 //event handler to set the focus()


                                checkFields({target:$('#userPassword1')[0]})
                            }, 125)
                        } else if (data[email]===false && $( document.activeElement ).attr('id')!='userEmail1') {
                            $('.control-group.userEmail1 .controls')
                                .popover('destroy')
                            $('.control-group.userEmail1 .controls').removeClass('arrow-right spinner')
                            $('.row-fluid.emails .control-group').removeClass('span4 span8').show().addClass('in span6')
                            $('#userPassword1').attr('disabled','disabled')
                            $('#userEmail2').removeAttr('disabled')
                            $('.well.passwords.new').addClass('in')
                            $('#userCreateUserForm .well.submit-controls,#userCreateUserForm .well.passwords,#userCreateUserForm .well.contact,#userCreateUserForm .well.address,#userCreateUserForm .well.address-other,#userCreateUserForm .well.language,#userCreateUserForm .well.newsletter')
                                .removeClass('disabled').find('input,select,textarea').removeAttr('disabled')
                            if (!app.data.newpassword) {
                                var pwchars = 'abcdefghijklmnopqrstuvwxyz0987654321'
                                app.data.newpassword=''
                                for(i=0;i<8;i++) {
                                    app.data.newpassword += pwchars.charAt(Math.floor(Math.random()*pwchars.length))
                                }
                            }
                            $('.well.passwords.new .random').text(app.data.newpassword)
                            // $('#userEmail1').removeClass('span10').addClass('span12')
                            $('#userEmail2').focus()
                            // if ($('#userEmail2').is(":focus")) {
                            //     setTimeout(function(){
                            //         $('#userFirstName').focus()
                            //     }, 125)
                            // }
                        }
                    }
                  , doEmailCheck = _.debounce(function(email,data) {
                        if (!data.hasOwnProperty(email)) {
                            $('#userEmail1').removeData('data-hasResult')
                            data[email] = null
                            $.when(app.models.userModel.getData('checkCustomerEmail', {EmailAddress:email}))
                                .done(function (r_ce) {
                                    data[email]=false
                                    emailCheckResult(email,data)
                                    $('#userEmail1').data('data-hasResult',true)
                                })
                                .fail(function (r_ce) {
                                    data[email]=true
                                    emailCheckResult(email,data)
                                    $('#userEmail1').data('data-hasResult',true)
                                })

                        } else {
                            emailCheckResult(email,data)
                        }
                    },500)
                  , validEmail = function(email) {
                        return /^[^@"(),:;<>\/\[\\\]|`]+@[a-z0-9-]+\.[a-z0-9]{2,}$/i.test(email)
                    }
                  , attachError = function (group, message) {
                        var label = $(group).addClass('invalid').find('.control-label')
                        label.find('span.required').remove()
                        message && label.append( '<span class="required"> '+message+'</span>')
                    }
                  , countryStates =  _.chain(app.localization.stateList).map(function(x){return x.country}).uniq()/*.map(function(x){return x && _.find(Localization.countryList,function(y){return y.code==x}).name})*//*.filter(function(x){return x})*/.value()  // The unique country names based on the country codes found in the state list
                  , checkFields = (function(e,reset,instant) {
                        var func = function(e,reset,instant){
                            target = e && e.target || '.form-float.control-group input, .form-float.control-group select, .form-float.control-group textarea, .form-float.control-group .btn-group'
                            if (reset) {
                                $('.form-float.control-group').addClass('pristine')
                            }
                            _.each($(target), function(elem){
                                var me = $(elem)
                                  , group = $(me.parents('.control-group')[0])
                                  , required = me.hasClass('required') && me.attr('disabled')!='disabled' && (elem.id!='userHomeProvince' || countryStates.indexOf($('#userHomeCountry').val()) >= 0)
                                  , pristine = group.hasClass('pristine')
                                  , focused = group.hasClass('focused')
                                if (me.val()) {
                                    group.addClass('filled')
                                    switch(elem.id) {
                                        case "userEmail1" : if (!validEmail(me.val())) {
                                                                target!=elem && attachError(group,app.localization.general.err.jquery_validate.email)
                                                            } else {
                                                                group.removeClass('invalid').find('.control-label span.required').remove()
                                                            }
                                                            break;
                                        case "userEmail2" : if (me.val()!=$('#userEmail1').val()) {
                                                                target!=elem && attachError(group,app.localization.general.err.jquery_validate.equalTo)
                                                            } else {
                                                                group.removeClass('invalid').find('.control-label span.required').remove()
                                                            }
                                                            break;
                                        case "newPassword1" : if (me.val().length < 8) {
                                                                target!=elem && attachError(group,app.localization.general.err.jquery_validate.minlength(8))
                                                            } else {
                                                                group.removeClass('invalid').find('.control-label span.required').remove()
                                                            }
                                                            break;
                                        case "newPassword2" : if (me.val()!=$('#newPassword1').val()) {
                                                                target!=elem && attachError(group,app.localization.general.err.jquery_validate.equalTo)
                                                            } else {
                                                                group.removeClass('invalid').find('.control-label span.required').remove()
                                                            }
                                                            break;
                                        case "userPassword1" : if (me.val().length < 8) {
                                                                target!=elem && attachError(group,app.localization.general.err.jquery_validate.minlength(8))
                                                                $('#userCreateUserForm .login.control-group .btn ').attr('disabled','disabled')
                                                            } else {
                                                                $('#userCreateUserForm .login.control-group .btn ').removeAttr('disabled')
                                                                group.removeClass('invalid').find('.control-label span.required').remove()
                                                            }
                                                            break;
                                        case "userHomeProvince" : var selectedProvince = _.find(app.localization.stateList, function(x){return x.code==$('#userHomeProvince').val()})
                                                                     
                                                            if (selectedProvince && selectedProvince.country!=$('#userHomeCountry').val()) {
                                                                var selectedCountry = selectedProvince && _.find(app.localization.countryList,function(x){return x.code==selectedProvince.country})
                                                                $('#userHomeCountry').val(selectedCountry && selectedCountry.code || "")
                                                                checkFields($.extend(e,{target:$('#userHomeCountry')[0]}))
                                                                group.removeClass('invalid')
                                                            }
                                                            break;
                                        case "userHomeCountry" :  var selectedProvince = _.find(app.localization.stateList, function(x){return x.code==$('#userHomeProvince').val()})
                                                                    //, selectedCountry = _.find(app.localization.countryList,function(x){return x.name==$('#userHomeCountry').val()})
                                                            if (selectedProvince && selectedProvince.country && selectedProvince.country!=$('#userHomeCountry').val()) {
                                                                $('#userHomeProvince').val("")
                                                            }  
//                                                             if(_.any( app.localization.stateList, function(x){return x.country==$('#userHomeCountry').val()} ) ){
//                                                                 $('#userHomeProvince').addClass('required')
//                                                             } else {
//                                                                 $('#userHomeProvince').removeClass('required')
//                                                             }
                                        default :  group.removeClass('invalid')
                                                    break;
                                    }
                                } else {
                                    if (required && !pristine && !focused) {
                                        attachError(group,app.localization.general.err.jquery_validate.required)
                                        if (elem.id=="userPassword1") {
                                            $('#userCreateUserForm .login.control-group .btn ').attr('disabled','disabled')
                                        }
                                    } else {
                                        group.removeClass('invalid').find('.control-label span.required').remove()
                                    }
                                    group.removeClass('filled')
                                }
                            })
                        }
                        var timeout = null
                        return function() {
                            var context=this, args=arguments, doNow=!!args[2], wait=750
                            if (args[0] && timeout!==null) {
                                args[0]=null
                                doNow=true
                            }
                            clearTimeout(timeout)
                            if (args[0] || doNow) {
                                timeout=null
                                func.apply(context,args)
                                // wait=50
                            } else {
                                var later=function(){
                                    timeout=null
                                    func.apply(context,args)
                                }
                                timeout = setTimeout(later,750)
                            }
                        }
                    })()
                  , popoverPositionFn = function() {
                        this.$tip.css('display','none');
                        return $(document).width()<768?'in bottom':'right'
                    }
                $('#userCreateUserFormContainer').on('focus', '.form-horizontal input, .form-horizontal select, .form-horizontal textarea', function(e){
                    $(this).parents('.control-group').addClass('focused')
                })
                $('#userCreateUserFormContainer').on('blur', '.form-horizontal input, .form-horizontal select, .form-horizontal textarea', function(e){
                    var removeClassStr = 'focused'
                    if (this.id!='userEmail1'||$(this).val()) {
                        removeClassStr += ' pristine'
                    }
                    $(this).parents('.control-group').removeClass(removeClassStr)
                    if (this.id=='userEmail1') {
                        if (validEmail($(this).val())) {
                            $('.control-group.userEmail1 .controls').addClass('spinner')
                        }
                        if (this.id=='userEmail1' && $(this).data('data-hasResult')) {
                            doEmailCheck($('#userEmail1').val(),$('#userEmail1').data('data-isChecked'))
                        }
                    }
                    checkFields(e)
                })
                $('#userCreateUserFormContainer').on('change', '.form-horizontal input, .form-horizontal select, .form-horizontal textarea, .form-horizontal .btn-group', function(e){
                    $(this).parents('.control-group').removeClass('pristine')
                    if ($(this).val()) {
                        $(this).parents('.control-group').addClass('filled')
                    } else {
                        $(this).parents('.control-group').removeClass('filled')
                    }
                    checkFields()
                })
                $('#userCreateUserFormContainer').on('input', '.form-horizontal input, .form-horizontal select, .form-horizontal textarea', function(e){
                    if (this.id=='userEmail1') {
                        var email = $(this).val()
                        if (email) {
                            if ( !$('.control-group.userEmail1 .controls').data('popover') ||
                                $('.control-group.userEmail1 .controls').data('popover').getContent()!=app.localization.newUser.enterExistingEmailPrompt) {
                                $('.control-group.userEmail1 .controls')
                                    .popover('destroy')
                                setTimeout(function(){
                                    $('.control-group.userEmail1 .controls')
                                        .popover({content:app.localization.newUser.enterExistingEmailPrompt, trigger:'manual', placement: popoverPositionFn, container:'#userCreateUserForm2'})
                                        .popover('show')
                                },250)
                            }
                            if (validEmail(email)) {
                                var data=$('#userEmail1').data('data-isChecked')
                                if (!data) {
                                    $('#userEmail1').data('data-isChecked', (data={}))
                                }
                                doEmailCheck(email,data)
                            }
                        }
                        if ($('#userEmail1').data('data-hasResult')) {
                            $('.control-group.userPassword1 .controls').data('popover') && $('.control-group.userPassword1 .controls, .control-group.userPassword1 .controls input').popover('destroy')
                            $('.control-group.userEmail1 .controls')
                                .addClass('arrow-right')
                                .removeClass('spinner')
                            // setTimeout(function(){
                            //     $('.control-group.userEmail1 .controls')
                            //         .popover({content:app.localization.newUser.enterExistingEmailPrompt, trigger:'manual', placement: $(document).width()<768?'bottom':'right', container:'#userCreateUserForm3'})
                            //         .popover('show')

                            // },250)
                            $('.row-fluid.emails .control-group.userEmail1').addClass('span8').removeClass('in span6')
                            $('.row-fluid.emails .control-group.userEmail2').addClass('span4').removeClass('in span6').hide()
                            $('.row-fluid.passwords, .well.passwords, .row-fluid.login').removeClass('in')
                            $('#userPassword1, #userEmail2, .row-fluid.login .btn').attr('disabled','disabled')
                            $('#userCreateUserForm .well.submit-controls,#userCreateUserForm .well.passwords,#userCreateUserForm .well.contact,#userCreateUserForm .well.address,#userCreateUserForm .well.address-other,#userCreateUserForm .well.language,#userCreateUserForm .well.newsletter')
                                    .addClass('disabled').find('input,select,textarea').attr('disabled','disabled')
                            $('#userCreateSubmit').text(app.localization.newUser.activeContext.buttonCreate)
                        }
                    }
                    if (this.id=='userSalutation') {
                        switch ($(this).val()) {
                            case "Mr." :
                                $('#userGender').val('M')
                                break
                            case "Ms." :
                            case "Mrs." :
                            case "Miss." :
                                $('#userGender').val('F')
                        }
                    }
                    if (this.id=='userGender') {
                        if ($(this).val()=="M") {
                            switch ($('#userSalutation').val()) {
                                case "Ms." :
                                case "Mrs." :
                                case "Miss." :
                                    $('#userSalutation').val('Mr.')
                            }
                        } else {
                            switch ($('#userSalutation').val()) {
                                case "Mr." :
                                    $('#userSalutation').val('Ms.')
                            }
                        }
                    }
                    if ($(this).hasClass('required')) {
                        checkFields(e)
                    }
                })
                $('#userCreateUserForm label.control-label').on('click',function(e){
                    setTimeout(function(){
                        $('#'+$(this).attr('for')).focus().click()
                    }, 50)
                })
                $('#userMainPhone').on('change',function(e){
                    if ($(this).val()=='WORK') {
                        $('.control-group.userPhoneExt').addClass('in').find('input').removeAttr('disabled')
                    } else {
                        $('.control-group.userPhoneExt').removeClass('in').find('input').attr('disabled','disabled')
                    }
                })
                $('#userLanguage .btn').on('click',function (obj) {
                    obj.preventDefault();
                    $('#userLanguage .btn').removeClass('btn-primary')
                    $(this).addClass('btn-primary')
                    $('#userCreateUserFormContainer').trigger.call($(this),'change')
                })
                $('input[type=radio][name=newPasswordType]').on('change', function(obj) {
                    console.log('change',obj,this)
                    if (this.value=="Random") {
                        $('.newPasswordTypeCustom input[type=password]').addClass('disabled').removeClass('required')
                    } else {
                        $('.newPasswordTypeCustom input[type=password]').addClass('required').removeClass('disabled')
                        $('.newPasswordTypeCustom .newPassword1 input[type=password]').focus()
                    }
                })
                $('.newPasswordTypeCustom input[type=password],.newPasswordTypeCustom label.control-label').on('click', function(obj) {
                    $('input[type=radio][name=newPasswordType][value=Custom]').click()
                })
                $('#userCreateUserForm .login.control-group .btn ').on('click', function(e){
                    e.preventDefault();
                    $('.control-group.login .controls').addClass('spinner')
                    $(this).attr('disabled','disabled')
                    app.dispatcher.dispatch('profile', 'authenticate', [encodeURIComponent($('#userEmail1').val()), encodeURIComponent($('#userPassword1').val()), 'updateLoginResult']);
                })
                $('#userCreateUserForm .forgot.control-group .btn ').on('click', function(e){
                    e.preventDefault();
                    $('.control-group.forgot .controls').addClass('spinner')
                    app.dispatcher.dispatch('profile', 'doreset', [encodeURIComponent($('#userEmail1').val()),'loginResetPasswordCustomer']);
                })
                $('#userCreateUserForm').on('submit', function(e){
                    e.preventDefault();
                    console.log('submit')
                })
                $('.userUpdateSubmit').on('click', function(e){
                    e.preventDefault()
                    if ($(this).hasClass('save')||$(this).hasClass('update')) {
                        $('.pristine').removeClass('pristine')
                        $('.invalid').removeClass('invalid')
                        checkFields(null, false, true)
                        if ($('.form-float.control-group.invalid').length==0) {
                            $('#progressIndicator').modal('show')
                            app.dispatcher.dispatch('profile', $(this).hasClass('update') ? 'detailssubmit' : 'createsubmit', [
                                encodeURIComponent($('#userEmail1').val()||""),
                                encodeURIComponent(($('input[type=radio][name=newPasswordType]:checked').val()=="Random" ? app.data.newpassword : $('#newPassword1').val()) || ""),
                                encodeURIComponent($('#userGender').val()),
                                encodeURIComponent($('#userSalutation').val()),
                                encodeURIComponent($('#userFirstName').val()),
                                encodeURIComponent($('#userLastName').val()),
                                $('#userMainPhone').val().substr(0,1),
                                // $('#userMainPhoneH').hasClass('active') ? "H" :
                                //     $('#userMainPhoneW').hasClass('active') ? "W" :
                                //         $('#userMainPhoneO').hasClass('active') ? "O" : "",
                                encodeURIComponent($('#userMainPhone').val()=="HOME" && $('#userPhone').val() || $('#userPhoneHOME').val()),
                                encodeURIComponent($('#userMainPhone').val()=="WORK" && $('#userPhone').val() || $('#userPhoneWORK').val()),
                                encodeURIComponent($('#userPhoneExt').val()||$('#userPhoneWORKExt').val()),
                                encodeURIComponent($('#userMainPhone').val()=="OTHER" && $('#userPhone').val() || $('#userPhoneOTHER').val()),
                                encodeURIComponent($('#userHomeAddress1').val()),
                                encodeURIComponent($('#userHomeAddress2').val()),
                                encodeURIComponent($('#userHomeCity').val()),
                                encodeURIComponent($('#userHomeProvince').val()),
                                encodeURIComponent($('#userHomeCountry :selected').text()),
                                encodeURIComponent($('#userHomePostalCode').val()),
                                encodeURIComponent($('#userOtherAddress1').val()),
                                encodeURIComponent($('#userOtherAddress2').val()),
                                encodeURIComponent($('#userOtherCity').val()),
                                encodeURIComponent($('#userOtherProvince').val()),
                                encodeURIComponent($('#userOtherCountry').val()),
                                encodeURIComponent($('#userOtherPostalCode').val()),
                                $('#newsletter').prop('checked') ? "1" : "0",
                                $('#userLanguageen-us').hasClass('active') ? "en-us" :
                                    $('#userLanguagefr-ca').hasClass('active') ? "fr-ca" :
                                        $('#userLanguagezh-cn').hasClass('active') ? "zh-cn" :
                                            $('#userLanguagees-sp').hasClass('active') ? "es-sp" : "",
                                "", // encodeURIComponent($('#userSkiSize').val()),
                                "", // encodeURIComponent($('#userSkiBootSize').val()),
                                "", // encodeURIComponent($('#userSnowboardSize').val()),
                                "", // encodeURIComponent($('#userSnowboardBootSize').val()),
                                "", // encodeURIComponent($('#userDinNumber').val()),
                                "", // encodeURIComponent($('#userAge').val()),
                                "", // encodeURIComponent($('#userWeight').val()),
                                "", // encodeURIComponent($('#userHeight').val())
                            ]);
                        } else {
                            var group = $($('.form-float.control-group.invalid')[0])
                            $('html, body').animate({
                                scrollTop: group.offset().top - 70
                            }, 300, function() {
                                    group.find('input, select, textarea').focus()
                            });

                        }
                    } else {
                        app.dispatcher.redirect.apply(this,app.data.loginNextURL)
                    }
                })
                $('#userCreateUserForm').on('login-success', function(e){
                    checkFields(null,true,true)
                    var once = false
                      , onceFn = function(e){
                                    if (!once) {
                                        $('.userUpdateSubmit').addClass('update').text(app.localization.newUser.activeContext.buttonUpdate)
                                        once=true
                                    }
                                }
                    $('#userCreateUserFormContainer').on('change', '.form-horizontal input, .form-horizontal select, .form-horizontal textarea, .form-horizontal .btn-group', onceFn)
                    $('#userCreateUserFormContainer').on('input', '.form-horizontal input, .form-horizontal select, .form-horizontal textarea', onceFn)
                })
                if (!!app.data.windowResizeHandler) {
                    $(window).unbind('resize',app.data.windowResizeHandler);
                }
                app.data.windowResizeHandler = _.debounce(function(){
                    $('.control-group.userEmail1 .controls, .control-group.userPassword1 .controls').each(function(){
                        var popover = $(this).data('popover')
                        if (popover) {
                            popover.show()
                        }
                    })
                }, 100);
                $(window).bind('resize',app.data.windowResizeHandler);
                if (validEmail($('#userEmail1').val())) {
                    $('#userEmail1').trigger('input')
                } else {
                    setTimeout(function(){
                        $('html, body').animate({
                            scrollTop: ($("#userEmail1").offset().top - window.document.body.scrollTop < $(window).height()*.6 ) 
                                        ? $("#userEmail1").offset().top - $(window).height()*.5
                                        : 0
                        }, 300);
                    }, 100)
                    setTimeout(function(){
                        $('.control-group.userEmail1 .controls')
                            .popover({content:app.localization.newUser.enterEmailFirstPrompt,trigger:'manual', placement: popoverPositionFn, container:'#userCreateUserForm4'})
                            .popover('show')
                        // $('#userEmail1')[0] && $('#userEmail1')[0].scrollIntoView(true)
                        $('#userEmail1').focus()
                    }, 500)
                }
                checkFields(null, true)
            }

        },
        loginResetPasswordCustomer:function(result, error){
            $('.control-group.forgot .controls').removeClass('spinner')
            if (result) {
                $('#userCreateUserForm .forgot.control-group .btn ').attr('disabled','disabled')
            }
            app.commonViewHelper.showMessages();
            $('#userCreateUserForm').trigger('login-reset-password')

        },
        updateLoginResult:function(result,service){
            $('.control-group.login .controls').removeClass('spinner')
            $('#userCreateUserForm .login.control-group .btn ').removeAttr('disabled')
            $('.control-group.userPassword1 .controls, .control-group.userPassword1 .controls input')
                .popover('destroy')
            if (result) {
                $('#userCreateUserForm .well.confirm').addClass('in')
                $('#userCreateUserForm #userEmail1').attr('disabled','disabled')
                $('.row-fluid.passwords, .well.passwords, .row-fluid.login').removeClass('in')
                $('#userCreateSubmit').text(app.localization.newUser.activeContext.buttonUpdate)
                app.models.userModel.getData('fetchCustomerProfile', {
                    CustomerId: app.data.CustomerId,
                    CustomerGUID: app.data.CustomerGUID
                })
                    .done(function(r_fcp){
                        $('#userCreateUserForm .well.submit-controls,#userCreateUserForm .well.passwords,#userCreateUserForm .well.contact,#userCreateUserForm .well.address,#userCreateUserForm .well.address-other,#userCreateUserForm .well.language,#userCreateUserForm .well.newsletter')
                            .removeClass('disabled').find('input,select,textarea').removeAttr('disabled')
                        $('.userUpdateSubmit.save').addClass('update')
                        var customer = $.firstOrOnly(r_fcp.Customer)
                        if (customer) {
                            $('#userCreateUserForm .well.submit-controls,#userCreateUserForm .well.passwords,#userCreateUserForm .well.contact,#userCreateUserForm .well.address,#userCreateUserForm .well.address-other,#userCreateUserForm .well.language,#userCreateUserForm .well.newsletter')
                                .removeClass('disabled')
                            $('#userCreateUserForm #userSalutation').val(customer.Name&&customer.Name.Salutation)
                            $('#userCreateUserForm #userGender').val(customer.Name&&customer.Gender)
                            $('#userCreateUserForm #userFirstName').val(customer.Name&&customer.Name.FirstName).parents('.control-group').addClass('filled')
                            $('#userCreateUserForm #userLastName').val(customer.Name&&customer.Name.LastName).parents('.control-group').addClass('filled')
                            var primaryPhone = _.find(customer.Phone, function(phone){
                                return phone.primary=="true"
                            })
                            if (primaryPhone) {
                                $('#userCreateUserForm #userMainPhone').val(primaryPhone.type)
                                $('#userCreateUserForm #userPhone').val(primaryPhone.PhoneNumber||(primaryPhone.PhoneData&&primaryPhone.PhoneData.PhoneNumber)).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userPhoneExt').val(primaryPhone.PhoneData&&primaryPhone.PhoneData.Extension).parents('.control-group').addClass('filled')
                            }
                            _.each(customer.Phone,function(phone){
                                $('#userCreateUserForm #userPhone'+phone.type).val(phone.PhoneNumber||(primaryPhone.PhoneData&&primaryPhone.PhoneData.PhoneNumber))
                                $('#userCreateUserForm #userPhone'+phone.type+'Ext').val(primaryPhone.PhoneData&&primaryPhone.PhoneData.Extension)
                            })
                            var homeAddress = _.find(customer.Address, function(address){
                                return address.type=="HOME"
                            })
                            if (homeAddress) {
                                $('#userCreateUserForm #userHomeAddress1').val(homeAddress.Address1).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userHomeAddress2').val(homeAddress.Address2).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userHomeCity').val(homeAddress.City).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userHomeProvince').val(homeAddress.StateProv).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userHomeCountry').val(homeAddress.Country).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userHomePostalCode').val(homeAddress.PostCode).parents('.control-group').addClass('filled')
                            }
                            var otherAddress = _.find(customer.Address, function(address){
                                return address.type=="OTHER"
                            })
                            if (otherAddress) {
                                $('#userCreateUserForm #userOtherAddress1').val(otherAddress.Address1).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userOtherAddress2').val(otherAddress.Address2).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userOtherCity').val(otherAddress.City).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userOtherProvince').val(otherAddress.StateProv).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userOtherCountry').val(otherAddress.Country).parents('.control-group').addClass('filled')
                                $('#userCreateUserForm #userOtherPostalCode').val(otherAddress.PostCode).parents('.control-group').addClass('filled')
                            }
                            $('#userLanguage .btn').removeClass('active btn-primary')
                            $('#userLanguage' + _.invert(app.customization.submitLanguage)[customer.Language]).addClass('active btn-primary')
                            if (customer.NoEmail=='N') {
                                $('#userCreateUserForm #newsletter').attr('checked','checked')
                            }
                        }
                        $('#nav').html(navbarTpl({
                            Customization:app.customization,
                            Localization:app.localization,
                            services:app.data.serviceTypes,
                            languages:app.data.languageNames,
                            siteName:app.localization.siteName,
                            backLink:app.customization.serverURL
                        }));
                        app.commonViewHelper.updateNavBar(service,app.language,!!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
                        $('#userCreateUserForm').trigger('login-success')
                    })
            } else {
                var popoverPositionFn = function() {
                    this.$tip.css('display','none');
                    return $(document).width()<768?'in bottom':'right'
                }
                $('.control-group.userPassword1 .controls')
                    .popover({content:'<span class="close" onclick="$($(this).parents(\'.popover\')).remove()" href="#">&times;</span>'+app.localization.newUser.passwordIncorrect, trigger:'focus', selector: 'input', placement: popoverPositionFn, container:'#userCreateUserForm5'})
                $('#userPassword1').focus()
            }
        },
        prepGCForm:function () {

            $('img.gcStyle').click(function(o){
                console.log('img clicked',o)
                var parent = $(o.target).parents('.giftCert'),
                    value = $(o.target).attr('data-gcstyle');
                parent.find('.gcStyleActive').attr('src', o.target.src);
                parent.find('.gcStyleValue').val(value);
            });
            $('.gcDeliverVia').on('shown', function(obj){
                if ($(obj.target).parents('.giftCertCollapse').data('collapse')) {
                    $(obj.target).parents('.giftCertCollapse').collapse('reset');
                }

            });

            $('.submitGCForm').on('click', function (obj) {
                    obj.preventDefault();
                    var parent = $(obj.target).parents('.giftCert'),
                        form = parent.find('form');
                    form.validate({
                        rules: {
                            gcEmailAddress: {
                                required: function(e) {
                                    return form.find('.gcEmail').hasClass('active');
                                }
                            },
                            gcPostAddress: {
                                required: function(e) {
                                    return form.find('.gcPost').hasClass('active');
                                }
                            },
                            gcPostCity: {
                                required: function(e) {
                                    return form.find('.gcPost').hasClass('active');
                                }
                            },
                            gcPostState: {
                                required: function(e) {
                                    return form.find('.gcPost').hasClass('active');
                                }
                            },
                            gcPostCountry: {
                                required: function(e) {
                                    return form.find('.gcPost').hasClass('active');
                                }
                            },
                            gcPostZip: {
                                required: function(e) {
                                    return form.find('.gcPost').hasClass('active');
                                }
                            },
                            gcExpress: {
                                required: function(e) {
                                    return form.find('.gcPost').hasClass('active');
                                }
                            }
                        }
                    });
                    $(obj.target).parents('.giftCertCollapse').css('height','');
                    parent.find('.gcDeliverVia').css('height','');
                    if (form.valid()) {
                        $('#progressIndicator').modal('show')
                        $('.submitGCForm').button('loading');
                        app.dispatcher.dispatch('giftCertificates', 'purchaseGC', [
                            encodeURIComponent(form.find('.gcId').val()),
                            encodeURIComponent(form.find('.gcRecipient').val()),
                            encodeURIComponent(form.find('.gcMessage').val() || ""),
                            encodeURIComponent(form.find('.gcDeliverViaBtn.active').attr('data-value') || ""),
                            encodeURIComponent(form.find('.gcStyleValue').val() || ""),
                            encodeURIComponent(form.find('.gcEmailAddress').val() || ""),
                            encodeURIComponent(form.find('.gcPostAddress').val() || ""),
                            encodeURIComponent(form.find('.gcPostAddress2').val() || ""),
                            encodeURIComponent(form.find('.gcPostCity').val() || ""),
                            encodeURIComponent(form.find('.gcPostState').val() || ""),
                            encodeURIComponent(form.find('.gcPostCountry').val() || ""),
                            encodeURIComponent(form.find('.gcPostZip').val() || ""),
                            encodeURIComponent(form.find('.gcExpress').val() || "")
                        ])
                        return false;
                    } else {
                        return false;
                    }
                }
            )
        },
        prepClassForm:function (spaLocationId, startDate) {
            $('.datepicker').datepicker({
                minDate:app.customization.spaBooking.allowBookingToday ? "0" : "+1",
                maxDate:"+2Y",
                numberOfMonths:2,
                dateFormat:"yy-mm-dd",
                defaultDate:app.customization.spaBooking.allowBookingToday ? "0" : "+1"
            });
            $('#spaClassDate').on('change', function (obj) {
                    $('#progressIndicator').modal('show');
                    app.dispatcher.redirect('spaBooking', 'class', [
                        'Location'+spaLocationId + ($('#spaClassSelectForm').data('lastItem') ? '|'+$('#spaClassSelectForm').data('lastItem') : ''),
                        $('#spaClassDate').val()
                    ])
            });
            $('.crossTypeLink').on('click', function(obj){
                obj.target.href += '/' + $('#spaClassDate').val()
            })
        },
        prepClassSelectionForm:function (spaLocationId, location, spaItemId) {
            var updateBookButton = function () {
                $('#spaClassSelectForm').validate();
                if ($('#spaClassSelectForm').valid()) {
                    $('.spaServiceButton').addClass('btn-primary').removeClass('disabled').removeAttr('title');
                } else {
                    $('.spaServiceButton').removeClass('btn-primary').addClass('disabled');
                }
            }
            $('#spaClassSelectForm').data('lastItem',spaItemId);
            $('#spaClassSelectForm .spaServiceButton').on('click', function (obj) {
//                if ($('#spaServiceForm').valid()) {
                $(obj.target).button('loading');
                $('#progressIndicator').modal('show');
                obj.target.orighref = obj.target.orighref || obj.target.href
                //obj.target.href = obj.target.orighref + '/' + spaLocationId;
                var  spaItem = $(obj.target).parents('.spaItem');
                if (location.AllowOverbook == "G") {
                    obj.target.href = obj.target.orighref +'/' + (  spaItem.find('.serviceRecipient .me').hasClass('active')
                        ? "me"
                        : encodeURIComponent(spaItem.find('.serviceRecipient .someoneInput input').val())
                        );
                }
                /*var spaItem = $(obj.target).parents('.spaItem'),
                    recipientGender = spaItem.find('.spaRecipientGender').val(),
                    staffGender = spaItem.find('.spaServiceStaff').val();*/
            });
            $('.spaItem .serviceRecipient .me').click(function (obj) {
                $(obj.target).parents('.spaItem').find('.someoneInput').addClass('hidden');
               updateBookButton();
                $('.someoneInputField').removeClass('required');
                if ($(obj.target).parents('.spaItem').data('collapse')) {
                    $(obj.target).parents('.spaItem').collapse('reset');
                }
            });
            $('.spaItem .serviceRecipient .someone').click(function (obj) {
                $(obj.target).parents('.spaItem').find('.someoneInput').removeClass('hidden');
               updateBookButton();
                $('.someoneInputField').addClass('required');
                if ($(obj.target).parents('.spaItem').data('collapse')) {
                    $(obj.target).parents('.spaItem').collapse('reset');
                }
            });
            // if (templateData.showDateList && app.data.pmsPropertyIdsInCart.length < 1) {
            //     spaItemElement.find('.spaServiceDateContainer').popover({
            //         trigger: 'hover',
            //         placement: 'in left',
            //         offsetY: 10,
            //         delay: { show: 250, hide: 300 },
            //         title: app.localization.spaBooking.pmsbeforespa.dateSelectorAcknowledgePromptTitle,
            //         content: app.localization.spaBooking.pmsbeforespa.dateSelectorAcknowledgePromptText.replace('a href="#/summary/setOverride"', 'a onclick="app.data.overridePMSRestriction = true;" href="#/spaBooking/service/'+spaItemElement.attr('id').substr(7)+'"')
            //     });
            // }
            $('.spaItem .required').change(updateBookButton);
            updateBookButton();
//            $('#categories .nav-tabs li:first-child').addClass('active');
//            $('#categories .tab-content div.tab-pane:first-child').addClass('active');
//            $('#categories .tab-content div.accordion-group:first-child div.accordion-body').addClass('in')
            $('#categoryTabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
                //$(this.hash).has('div.accordion-group div.accordion-body.in').length || $(this.hash).find('div.accordion-group:first-child div.accordion-body').addClass('in');
            })
            $('#spaClassSelectForm .accordion-heading').on('click', function(obj){
                $('#spaClassSelectForm').data('lastItem',
                    app.customization.spaBooking.preserveClassItemCrossDate ? $(obj.target).parents('.accordion-group').find('.spaItem').attr('data-itemid') : null
                );
            })
            $('.spaItem').on('shown', function(obj){
                app.customization.googleAnalytics && _gaq.push(['_trackPageview','#/spaBooking/class/'+$(obj.target).attr('id').substr(7)]);
            })

        },
        showPPProgressIndicator:function( message ) {
            var message = message || app.localization.paymentProcessing.PPPreRedirect;
            $('#progressIndicator .modal-body p').html(message);
            $('#progressIndicator').modal('show');
        },
        prepCartSummary:function() {
            $('.pay-pp').click( function(o) {
                $('.pay-pp').button('loading');
            });
            $('.pay-cc').click( function(o) {
                $('.pay-cc').button('loading');
            });
            $('#bookinHistoryCollapse').on('shown', function(obj){
                $('.bookingHistoryCollapseButton').html('<i class="icon-minus-sign"></i> Hide');
                app.data.bookingHistoryCollapseHidden = false;
            }).on('hidden', function(obj){
                $('.bookingHistoryCollapseButton').html('<i class="icon-plus-sign"></i> Show');
                app.data.bookingHistoryCollapseHidden = true;
            });
            $('.removeCartButton').click( function(o) {
                // if ($(this).hasClass('categorySki')&&$(this).hasClass('itemActivatesPromo')&&!window.confirm(app.localization.bookingSummary.confirmRemoveSkiActivatesPromo)) {
                //     o.preventDefault();
                // } else {
                    $(this).button('loading');
                // }
            })
            $('a.guestNote').click( function(o) {
                var note = encodeURIComponent($(this).siblings('textarea').val());
                if (note) {
                    $(this).button('loading');
                    this.href += note;
                } else {
                    o.preventDefault();
                }
            });
            $('textarea[maxlength].guestNote').bind('input propertychange', function() {
                var maxLength = $(this).attr('maxlength');
                if ($(this).val().length > maxLength) {
                    $(this).val($(this).val().substring(0, maxLength));
                }
            })  ;
        },
        updateRoomTypeDetails: function(PMSRoomTypeDetails){
            $('.pmsRoomTypeName'+stripChars(PMSRoomTypeDetails.PMSRoomType)).text(PMSRoomTypeDetails.PMSRoomTypeDesc);
        },
        updateRateDetails: function(PMSRateDetails){
            $('.pmsRateName'+stripChars(PMSRateDetails.PMSRateType)).text(PMSRateDetails.PMSRateName);
        },
        redirectYP:function() {
            $('#redirectYPForm').submit();
        },
        redirectI4G:function() {
            $('#redirectI4GForm').submit();
        },
        prepTermsModal:function() {
            $.ajax({
                url: app.localization.paymentProcessing.acceptTerms.termsContentURL
            }).done(function(data){
                var content = $(document.createElement('div')).html(data).find(app.localization.paymentProcessing.acceptTerms.termsContentSelector);
                if (content.length==0) {
                    $('#acceptTermsModal .modal-body .content').html('<p>Error Finding Terms</p>');
                } else {
                    $('#acceptTermsModal .modal-body .content').html( content );
                    $('#acceptTermsModal .modal-body #acceptBox').removeAttr('disabled');
                }
            }).fail(function(){
                $('#acceptTermsModal .modal-body .content').html('<p>Error Loding Terms</p>');
            })
            $('#acceptTermsModal').modal();
            $('#acceptTermsModal .continueBtn').on('click',function(){
                if ($('#acceptTermsModal #acceptBox').attr('checked')) {
                    app.data.termsAccepted = true;
                    app.dispatcher.dispatch('summary', 'checkout', []);
                }
            })
            $('#acceptTermsModal #acceptBox').on('change',function(){
                if ($('#acceptTermsModal #acceptBox').attr('checked')) {
                    $('#acceptTermsModal .continueBtn').removeAttr('disabled');
                } else {
                    $('#acceptTermsModal .continueBtn').attr('disabled','disabled');
                }
            })
            $('#acceptTermsModal').on('hide',function(){
                window.history.back();
            })
        },
        prepRedeemGCForm:function(){
            var form = $('#cartGCRedeemForm'),
                validateOnChange = function (label) {
                        setTimeout(function(){
                            if (!form.find('.required:not(.valid)').length) {
                                $('#gcRedeemSubmit').addClass('btn-primary').removeClass('disabled');
                                form.find('label[generated=true]').remove();
                            }
                            console.log('okeedokee',label);
                        },100)
                    },
                validifier = form.validate({
                        rules: {
                            gcNumber: {
                                minlength: app.customization.payment.GCNumberLengthMin,
                                maxlength: app.customization.payment.GCNumberLengthMax,
                                required: true
                            }
                        },
                        success: validateOnChange,
                        showErrors: function(errorMap, errorList) {
                            $('#gcRedeemSubmit').removeClass('btn-primary').addClass('disabled');
                            this.defaultShowErrors();
                        }
                    });
            // $('#cartGCRedeemForm input').change(validateOnChange);
            // $('#cartGCRedeemForm input').blur(validateOnChange);
            // $('#cartGCRedeemForm input').keypress(validateOnChange);
            form.on('submit', function (obj) {
                obj.preventDefault();
                var form = $('#cartGCRedeemForm');

                form.removeClass('pristine');
                if (form.valid()) {
                    $('#progressIndicator').modal('show')
                    $('#gcRedeemSubmit').button('loading');
                    app.dispatcher.redirect('summary', 'redeemGCApply', [
                        encodeURIComponent(form.find('#gcNumber').val()),
                        encodeURIComponent(form.find('#gcRefNumber').val()),
                        encodeURIComponent(form.find('#gcType .active').attr('data-value') || "")
                    ])
                    // return false;
                } else {
                    // return false;
                }
            });
            var gcTypeCard = function(e){
                e && e.preventDefault();
                $('#gcNumberLabel').text(app.localization.paymentProcessing.gcNumberCard);
                $('#gcNumber').attr('placeholder', app.localization.paymentProcessing.gcNumberCardBlank);
                if (app.customization.payment.redeemGCbyGCIDandRefNum) {
                    $('#cartGCRedeemForm .gcRefNumEnabled').show();
                    if (app.customization.payment.redeemGCbyGCID) {
                        $('#cartGCRedeemForm .gcRefNumberRequired').hide();
                        $('#cartGCRedeemForm #gcRefNumber').removeClass('required');
                    } else {
                        $('#cartGCRedeemForm .gcRefNumberRequired').show();
                        $('#cartGCRedeemForm #gcRefNumber').addClass('required');
                    }
                } else {
                    $('#cartGCRedeemForm .gcRefNumEnabled').hide();
                }
                $('#cartGCRedeemForm #gcTypeCard').addClass('active');
                $('#cartGCRedeemForm #gcTypeCert').removeClass('active');
                app.data.gcLastType = 'Card';
                validateOnChange();
            }
            $('#cartGCRedeemForm #gcTypeCard').on('click', gcTypeCard);
            var gcTypeCert = function(e){
                e && e.preventDefault();
                $('#gcNumberLabel').text(app.localization.paymentProcessing.gcNumberCert);
                $('#gcNumber').attr('placeholder', app.localization.paymentProcessing.gcNumberCertBlank);
                if (app.customization.payment.redeemGCbyGCNumandRefNum) {
                    $('#cartGCRedeemForm .gcRefNumEnabled').show();
                    if (app.customization.payment.redeemGCbyGCNum) {
                        $('#cartGCRedeemForm .gcRefNumberRequired').hide();
                        $('#cartGCRedeemForm #gcRefNumber').removeClass('required');
                    } else {
                        $('#cartGCRedeemForm .gcRefNumberRequired').show();
                        $('#cartGCRedeemForm #gcRefNumber').addClass('required');
                    }
                } else {
                    $('#cartGCRedeemForm .gcRefNumEnabled').hide();
                }
                $('#cartGCRedeemForm #gcTypeCert').addClass('active');
                $('#cartGCRedeemForm #gcTypeCard').removeClass('active');
                app.data.gcLastType = 'Cert';
                validateOnChange();
            }
            $('#cartGCRedeemForm #gcTypeCert').on('click',gcTypeCert);
            if (app.data.gcLastType != 'Cert' && (app.customization.payment.redeemGCbyGCIDandRefNum || app.customization.payment.redeemGCbyGCID)) {
                gcTypeCard();
            } else {
                gcTypeCert();
            }


        }


    }

    enquire.register("screen and (max-width: 481px)", function() {
        $('head meta[name=viewport]').attr('content','width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0, user-scalable=no')
        console.log('setting user-scalable to no')
    });
    enquire.register("screen and (min-width: 482px)", function() {
        $('head meta[name=viewport]').attr('content','width=device-width, minimum-scale=1.0, initial-scale=1.0')
        console.log('un setting user-scalable')
    });

    return app.commonViewHelper
});
