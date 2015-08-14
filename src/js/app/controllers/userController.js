/*
 * controllers/spaController.js
 * Spa Controller
 */

define([
    'app/ControllerClass',
    'app/models/userModel',
    'app/views/userView'], function (ControllerClass, UserModel, UserView) {
    return window.app.controllers.userController = $.extend({}, ControllerClass, {
        app:app,
        module:'user',

        actions:{
            'show':['userLogin'],
            'create':['userCreateCustomer', 'user'],
            'addmember':['userCreateCustomer', 'member'],
            'details':['userCustomerProfile'],
            'detailssubmit':['userCustomerProfileSubmit'],
            'createsubmit':['userCreateCustomerSubmit', 'user'],
            'membercreatesubmit':['userCreateCustomerSubmit', 'member'],
            'quickmembercreatesubmit':['userCreateCustomerSubmit', 'quickmember'],
            'quickspamembercreatesubmit':['userCreateCustomerSubmit', 'quickspamember'],
            'change':['userPasswordChange'],
            'dochange':['userPasswordChangeSubmit'],
            'reset':['userPasswordReset'],
            'doreset':['userPasswordResetSubmit'],
            'login':['userLogin'],
            'authenticate':['userLoginSubmit'],
            'logout':['userLogout']
        },

        init:function () {
            console.log('initializing user controller');
            app.data.messages = app.data.messages || [];
            this.initialized = true;
        },

        userSelected:function () {
        },

        userCreateCustomer:function (type) {
            if ((type=='user'&&app.customization.disableAccountCreation)||(type=='member'&&app.customization.disableProfileScreenCreateGroupMember)) {
                app.dispatcher.replace('profile','',[]);
            } else {
                if (app.customization.login.useIntegratedLogin && type=='user') {
                    app.views.userView.event.fire('requestUserLogin', [app.data.lastLoginEmail, app.data.lastLoginPassword]);
                } else {
                    app.views.userView.event.fire('requestCreateUser',[type]);
                }
            }
        },

        userCustomerProfile:function (userId) {
            if (app.data.userLoggedIn) {
                var params = {
                    CustomerId: app.data.CustomerId,
                    CustomerGUID: app.data.CustomerGUID
                },
                    dfd = $.Deferred();
                app.models.userModel.getData('fetchGroupMembers', params ).always(function(x){
                    dfd.resolve(x);
                })
                $.when(
                    app.models.userModel.getData('fetchCustomerProfile', params ),
                    dfd.promise()
                    )
                    .done(function (r_fcp, r_fgm) {
                        var userData = {};
                        if (userId) {
                            userData = r_fgm && r_fgm.GroupMember && $.isArray(r_fgm.GroupMember)
                                        ? _.find(r_fgm.GroupMember,function(x){ return x.CustomerId==userId })
                                        : {}
                        } else {
                            userData = r_fcp && r_fcp.Customer && $.isArray(r_fcp.Customer)
                                        ? r_fcp.Customer[0]
                                        : {};
                            app.data.CustomerEmail = userData.EmailAddress?userData.EmailAddress:app.data.CustomerEmail
                        }
                        app.views.userView.event.fire('requestUserProfile', [userData]);
                    })
                    .fail(function (r_fcp, r_fgm) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.newUser.fail,
                            message: ''//r_cc.Result ? "("+r_cc.Result.Text+")" : ""
                        });
                        app.dispatcher.redirect('profile');
                    })

                // app.views.userView.event.fire('requestUserProfile');
            } else {
                app.dispatcher.replace('profile','',[]);
            }
        },

        userCustomerProfileSubmit:function (userEmail, userPassword, userGender, userSalutation, userFirstName, userLastName, userMainPhone, userHomePhone, userWorkPhone, userWorkExt, userOtherPhone,
                                            userHomeAddress1, userHomeAddress2, userHomeCity, userHomeProvince, userHomeCountry, userHomePostalCode,
                                            userOtherAddress1, userOtherAddress2, userOtherCity, userOtherProvince, userOtherCountry, userOtherPostalCode,
                                            newsletter, language,
                                            userSkiSize, userSkiBootSize, userSnowboardSize, userSnowboardBootSize, userDinNumber, userAge, userWeight, userHeight ) {
            if (!app.data.userLoggedIn) {
                app.dispatcher.replace('profile','login',['next','profile','']);
                return;
            }
            var phoneNumCount = 0,
                ccParams = {
                    "Customer.CustomerId": app.data.CustomerId,
                    "Customer.CustomerGUID": app.data.CustomerGUID,
                    "Customer.Name.Salutation": userSalutation,
                    "Customer.Name.FirstName": userFirstName,
                    "Customer.Name.LastName": userLastName,
                    "Customer.EmailAddress": String(userEmail).toLowerCase(),
                    "Customer.Password": userPassword,
                    "Customer.Gender": userGender,
                    "Customer.NoEmail": +newsletter ? "N" : "Y",
                    "Customer.Language": app.customization.submitLanguage[language] || ""
                };
            ccParams["Customer.Address[1]:type=HOME.Address1"] = userHomeAddress1;
            ccParams["Customer.Address[1]:type=HOME.Address2"] = userHomeAddress2;
            ccParams["Customer.Address[1]:type=HOME.City"] = userHomeCity;
            ccParams["Customer.Address[1]:type=HOME.StateProv"] = userHomeProvince;
            ccParams["Customer.Address[1]:type=HOME.Country"] = userHomeCountry;
            ccParams["Customer.Address[1]:type=HOME.PostCode"] = userHomePostalCode;
            ccParams["Customer.Address[2]:type=OTHER.Address1"] = userOtherAddress1;
            ccParams["Customer.Address[2]:type=OTHER.Address2"] = userOtherAddress2;
            ccParams["Customer.Address[2]:type=OTHER.City"] = userOtherCity;
            ccParams["Customer.Address[2]:type=OTHER.StateProv"] = userOtherProvince;
            ccParams["Customer.Address[2]:type=OTHER.Country"] = userOtherCountry;
            ccParams["Customer.Address[2]:type=OTHER.PostCode"] = userOtherPostalCode;
            if (userHomePhone) {
                ccParams["Customer.Phone["+phoneNumCount+"]:"+(userMainPhone=="H"?"primary=true;":"")+"type=HOME.PhoneNumber"] = userHomePhone;
                phoneNumCount++;
            }
            if (userWorkPhone) {
                ccParams["Customer.Phone["+phoneNumCount+"]:"+(userMainPhone=="W"?"primary=true;":"")+"type=WORK.PhoneData.PhoneNumber"] = userWorkPhone;
                if (userWorkExt) {
                    ccParams["Customer.Phone["+phoneNumCount+"]:"+(userMainPhone=="W"?"primary=true;":"")+"type=WORK.PhoneData.Extension"] = userWorkExt;
                }// else {
                    //ccParams["Customer.Phone["+phoneNumCount+"]:"+(userMainPhone=="W"?"primary=true;":"")+"type=WORK.PhoneNumber"] = userWorkPhone;
                //}
                phoneNumCount++;
            }
            if (userOtherPhone) {
                ccParams["Customer.Phone["+phoneNumCount+"]:"+(userMainPhone=="O"?"primary=true;":"")+"type=OTHER.PhoneNumber"] = userOtherPhone;
                phoneNumCount++;
            }
            if (app.customization.features.skiBooking) {
                ccParams["Customer.SkiSettings.SkiSize"] = userSkiSize;
                ccParams["Customer.SkiSettings.SkiBootSize"] = userSkiBootSize;
                ccParams["Customer.SkiSettings.SnowboardSize"] = userSnowboardSize;
                ccParams["Customer.SkiSettings.SnowboardBootSize"] = userSnowboardBootSize;
                ccParams["Customer.SkiSettings.DinNumber"] = userDinNumber;
                ccParams["Customer.SkiSettings.Age"] = userAge;
                ccParams["Customer.SkiSettings.Weight"] = userWeight;
                ccParams["Customer.SkiSettings.Height"] = userHeight;
            }

            $.when(app.models.systemModel.getData('updateCustomerProfile', ccParams ))
                .done(function (r_cc) {
                    app.data.messages.push({ type:'alert', class:'', actions:[],
                        title:app.localization.newUser.successUpdate,
                        message:""
                    });
                    if (app.data.loginNextURL) {
                        app.dispatcher.redirect.apply(app.dispatcher, app.data.loginNextURL);
                    } else {
                        app.dispatcher.redirect('profile');
                    }
                    app.data.loginNextURL = undefined;
                })
                .fail(function (r_cc) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                        title:app.localization.newUser.failUpdate,
                        message: ''//r_cc.Result ? "("+r_cc.Result.Text+")" : ""
                    });
                    if (app.data.loginNextURL) {
                        app.dispatcher.redirect.apply(app.dispatcher, app.data.loginNextURL);
                    } else {
                        app.dispatcher.redirect('profile');
                    }
                })

        },


        userCreateCustomerSubmit:function (type, userEmail, userPassword, userGender, userSalutation, userFirstName, userLastName,
                                            userMainPhone, userHomePhone, userWorkPhone, userWorkExt, userOtherPhone,
                                            userHomeAddress1, userHomeAddress2, userHomeCity, userHomeProvince, userHomeCountry, userHomePostalCode,
                                            userOtherAddress1, userOtherAddress2, userOtherCity, userOtherProvince, userOtherCountry, userOtherPostalCode,
                                            newsletter, language) {
            if (app.customization.disableProfileScreenCreateGroupMember&&type=='member') {
                app.dispatcher.replace('profile','',[]);
                return;
            }
            if (app.customization.skiBooking.disallowQuickAddGroupMember&&type=='quickmember') {
                app.dispatcher.replace('profile','',[]);
                return;
            }
            if (app.customization.spaBooking.disallowQuickAddGroupMember&&type=='quickspamember') {
                app.dispatcher.replace('profile','',[]);
                return;
            }

            var quickadd = false,
                quickaddspa = false;
            if (type=='quickmember'||type=='quickspamember') {
                quickadd=true;
                quickaddspa=(type=='quickspamember');
                type='member';
            }
            if (app.customization.disableAccountCreation&&type=="user") {
                app.dispatcher.replace('profile','',[]);
                return;
            }
            if (type=='member'&&!app.data.userLoggedIn) {
                app.dispatcher.replace('profile','login',['next','profile','addmember']);
                return;
            }
            var paramPrefix = '',
                phoneNumCount = 0,
                ccParams = {};
            if (type=='member') {
                ccParams["CustomerId"]= app.data.CustomerId;
                ccParams["CustomerGUID"]= app.data.CustomerGUID;
                paramPrefix = 'NewGroupMember.'
            }

            ccParams[paramPrefix + "Name.Salutation"]= userSalutation,
            ccParams[paramPrefix + "Name.FirstName"]= userFirstName,
            ccParams[paramPrefix + "Name.LastName"]= userLastName,
            ccParams[paramPrefix + "EmailAddress"]= String(userEmail).toLowerCase(),
            ccParams[paramPrefix + "Password"]= userPassword,
            ccParams[paramPrefix + "Gender"]= userGender,
            ccParams[paramPrefix + "NoEmail"]= +newsletter ? "N" : "Y",
            ccParams[paramPrefix + "Language"]= {"en-us":"English","es-sp":"Spanish","fr-ca":"French"}[language] || ""

            ccParams[paramPrefix + "Address[1]:type=HOME.Address1"] = userHomeAddress1;
            ccParams[paramPrefix + "Address[1]:type=HOME.Address2"] = userHomeAddress2;
            ccParams[paramPrefix + "Address[1]:type=HOME.City"] = userHomeCity;
            ccParams[paramPrefix + "Address[1]:type=HOME.StateProv"] = userHomeProvince;
            ccParams[paramPrefix + "Address[1]:type=HOME.Country"] = userHomeCountry;
            ccParams[paramPrefix + "Address[1]:type=HOME.PostCode"] = userHomePostalCode;
            ccParams[paramPrefix + "Address[2]:type=OTHER.Address1"] = userOtherAddress1;
            ccParams[paramPrefix + "Address[2]:type=OTHER.Address2"] = userOtherAddress2;
            ccParams[paramPrefix + "Address[2]:type=OTHER.City"] = userOtherCity;
            ccParams[paramPrefix + "Address[2]:type=OTHER.StateProv"] = userOtherProvince;
            ccParams[paramPrefix + "Address[2]:type=OTHER.Country"] = userOtherCountry;
            ccParams[paramPrefix + "Address[2]:type=OTHER.PostCode"] = userOtherPostalCode;

            if (userHomePhone) {
                ccParams[paramPrefix + "Phone["+phoneNumCount+"]:"+(userMainPhone=="H"?"primary=true;":"")+"type=HOME.PhoneNumber"] = userHomePhone;
                phoneNumCount++;
            }
            if (userWorkPhone) {
                ccParams[paramPrefix + "Phone["+phoneNumCount+"]:"+(userMainPhone=="W"?"primary=true;":"")+"type=WORK.PhoneData.PhoneNumber"] = userWorkPhone;
                if (userWorkExt) {
                    ccParams[paramPrefix + "Phone["+phoneNumCount+"]:"+(userMainPhone=="W"?"primary=true;":"")+"type=WORK.PhoneData.Extension"] = userWorkExt;
                }// else {
                //     ccParams[paramPrefix + "Phone["+phoneNumCount+"]:"+(userMainPhone=="W"?"primary=true;":"")+"type=WORK.PhoneNumber"] = userWorkPhone;
                // }
                phoneNumCount++;
            }
            if (userOtherPhone) {
                ccParams[paramPrefix + "Phone["+phoneNumCount+"]:"+(userMainPhone=="O"?"primary=true;":"")+"type=OTHER.PhoneNumber"] = userOtherPhone;
                phoneNumCount++;
            }

            $.when(app.models.systemModel.getData(type=='user'?'createCustomer':'createGroupMember', ccParams ))
                .done(function (r_cc) {
                    /*app.data.messages.push({ type:'alert', class:'', actions:[],
                        title:app.localization.newUser.success,
                        message:""
                    });*/
                    if (type=='user'){
                        app.datac('userLoggedIn', true);
                        app.datac('CustomerId', r_cc.CustomerId);
                        app.datac('CustomerGUID', r_cc.CustomerGUID);
                        app.datac('FirstName', userFirstName);
                        app.datac('LastName', userLastName);
                        app.datac('CustomerEmail', userEmail);
                        app.models.systemModel.getData('updateSession', {CustomerId:r_cc.CustomerId,CustomerGUID:r_cc.CustomerGUID})
                            .done(function(r){
                                app.data.messages.push({ type:'alert', 'class':'', actions:[],
                                    title:app.localization.newUser.success,
                                    message: userPassword==app.data.newpassword ? app.localization.newUser.successRandomPassword(app.data.newpassword) : '' // r.Result ? "("+r.Result.Text+")" : ""
                                });
                                if (app.data.loginNextURL) {
                                    app.dispatcher.redirect.apply(app.dispatcher, app.data.loginNextURL);
                                } else {
                                    app.dispatcher.redirect('summary');
                                }
                                app.data.loginNextURL = undefined;
                            })
                            .fail(function(r){
                                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                    title:app.localization.newUser.updateSessionFailed,
                                    message: '' //r.Result ? "("+r.Result.Text+")" : ""
                                });
                                app.dispatcher.redirect('profile');
                            })
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'', actions:[],
                                    title:app.localization.newUser.successMember,
                                    message: '' //r.Result ? "("+r.Result.Text+")" : ""
                                });
                                if (quickadd && app.data.loginNextURL) {
                                    if ($.isArray(app.data.loginNextURL) && $.isArray(app.data.loginNextURL[2])) {
                                        app.data.loginNextURL[2][quickaddspa?4:2]=r_cc.NewGroupMemberCustomerId;
                                    }
                                    app.dispatcher.redirect.apply(app.dispatcher, app.data.loginNextURL);
                                } else {
                                    app.dispatcher.redirect('profile');
                                }
                                app.data.loginNextURL = undefined;
                    }
                })
                .fail(function (r_cc) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                        title:app.localization.newUser.fail,
                        message: ''//r_cc.Result ? "("+r_cc.Result.Text+")" : ""
                    });
                    app.dispatcher.redirect('profile');
                })

        },


        userPasswordChange:function () {
            if (app.data.userLoggedIn) {
                app.views.userView.event.fire('requestChangePassword');
            } else {
                app.dispatcher.replace('profile','',[]);
            }
        },

        userPasswordReset:function (emailaddress) {
            if (app.customization.disablePasswordReset) {
                app.dispatcher.replace('profile','',[]);
                return;
            }
            app.views.userView.event.fire('requestResetPassword',[emailaddress]);
        },

        userPasswordResetSubmit:function (emailaddress, eventName) {
            if (app.customization.disablePasswordReset) {
                app.dispatcher.replace('profile','',[]);
                return;
            }
            if (typeof emailaddress != 'string') {
                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                    title:app.localization.general.err.defaultErr,
                    message:""
                });
                app.dispatcher.redirect('profile');
            }
            $.when(app.models.userModel.getData('checkCustomerEmail', {EmailAddress:emailaddress.toLowerCase()}))
                .done(function (r_ce) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                        title:app.localization.general.err.emailErrNotExist,
                        message:""
                    });
                    app.dispatcher.replace('profile');
                })
                .fail(function (r_ce) {
                    $.when(app.models.userModel.getData('resetPasswordCustomer', {EmailAddress:emailaddress.toLowerCase()}))
                        .done(function (r_pc) {
                            app.data.messages.push({ type:'alert', 'class':'', actions:[],
                                title:app.localization.general.login.passwordReset.newPasswordEmailConfirmation,
                                message:""
                            });
                            if (eventName) {
                                app.views.userView.event.fire(eventName, [true]);
                                return
                            }
                            app.dispatcher.redirect('profile');
                        })
                        .fail(function (r_pc) {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.general.err.defaultErr,
                                message:""
                            });
                            if (eventName) {
                                app.views.userView.event.fire(eventName, [false,r_pc]);
                                return
                            }
                            app.dispatcher.redirect('profile');
                        });

                });
        },

        userPasswordChangeSubmit:function (emailaddress, oldpassword, newpassword) {
            if (typeof emailaddress != 'string') {
                app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                    title:app.localization.general.err.defaultErr,
                    message:""
                });
                app.dispatcher.redirect('profile');
            }
            $.when(app.models.userModel.getData('checkCustomerEmail', {EmailAddress:emailaddress.toLowerCase()}))
                .done(function (r_ce) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                        title:app.localization.general.err.emailErrNotExist,
                        message:""
                    });
                })
                .fail(function (r_ce) {
                    $.when(app.models.userModel.getData('changePasswordCustomer', {EmailAddress:emailaddress.toLowerCase(), PasswordOld:oldpassword, PasswordNew:newpassword}))
                        .done(function (r_pc) {
                            app.data.messages.push({ type:'alert', 'class':'', actions:[],
                                title:app.localization.general.login.changePassword.updateSuccess,
                                message:""
                            });
                            app.dispatcher.redirect('profile');
                        })
                        .fail(function (r_pc) {
                            app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                                title:app.localization.general.login.changePassword.err.resetFailed,
                                message:""
                            });
                            app.dispatcher.redirect('profile');
                        });
                });
        },

        userLogin:function (next) {
            app.dispatcher.updateURL('profile', 'login')
            var hasNextURL = false;
            if (next == "next") {
                hasNextURL = true;
                [].shift.call(arguments);
                    app.data.loginNextURL = [];
                    var module, action;
                    (module = [].shift.call(arguments)) && app.data.loginNextURL.push(module);
                    (action = [].shift.call(arguments)) && app.data.loginNextURL.push(action);
                    arguments && app.data.loginNextURL.push($.makeArray(arguments));
            }
            if (app.data.userLoggedIn) {
                var params = {
                        CustomerId: app.data.CustomerId,
                        CustomerGUID: app.data.CustomerGUID
                    },
                    dfd = $.Deferred();

                app.models.userModel.getData('fetchGroupMembers', params ).always(function(x){
                    dfd.resolve(x);
                })
                $.when(
                    app.models.userModel.getData('fetchCustomerProfile', params ),
                    dfd.promise()
                    )
                    .done(function (r_fcp, r_fgm) {
                        var userData = r_fcp && r_fcp.Customer && $.isArray(r_fcp.Customer)
                                        ? r_fcp.Customer[0]
                                        : {};
                        app.data.CustomerEmail = userData.EmailAddress?userData.EmailAddress:app.data.CustomerEmail
                        if (hasNextURL) {
                            app.dispatcher.redirect.apply(app.dispatcher, app.data.loginNextURL);
                        } else {
                            app.views.userView.event.fire('requestUserLogin', [app.data.lastLoginEmail, app.data.lastLoginPassword, r_fcp, r_fgm]);
                        }
                    })
                    .fail(function (r_fcp, r_fgm) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.newUser.fail,
                            message: ''//r_cc.Result ? "("+r_cc.Result.Text+")" : ""
                        });
                        app.dispatcher.redirect('profile');
                    })
            } else {
                app.views.userView.event.fire('requestUserLogin', [app.data.lastLoginEmail, app.data.lastLoginPassword]);
            }
        },

        userLoginSubmit:function (email, password, eventName) {
            app.data.lastLoginEmail = email;
            app.data.lastLoginPassword = password;

            $.when(
                !!email && typeof email == 'string' && email.length > 5 &&
                !!password && typeof password == 'string' && password.length > 7 &&
                app.models.userModel.getData('authCustomer', {EmailAddress:email.toLowerCase(), Password:password})
                || (function(){ var d = $.Deferred(); d.reject(false); return d })()
                )
                .done(function (r_l) {
                    // process r_l.customerId, etc here
                    app.datac('userLoggedIn', true);
                    app.datac('CustomerId', r_l.CustomerId);
                    app.datac('CustomerGUID', r_l.CustomerGUID);
                    app.datac('FirstName', r_l.FirstName);
                    app.datac('LastName', r_l.LastName);
                    app.datac('CustomerEmail', email);
                    !!app.data.SessionId && $.when( app.models.systemModel.getData('updateSession', {CustomerId:r_l.CustomerId,CustomerGUID:r_l.CustomerGUID}),
                            app.models.systemModel.getData('folioBalance', {}),
                            app.controllers.initController.initGuestItinerary() )
                        .done(function(r_us, r_fb){
                            //app.dispatcher.redirect('');
                            if (eventName) {
                                app.views.userView.event.fire(eventName, [true]);
                                return
                            }
                            if (app.data.loginNextURL) {
                                app.dispatcher.redirect.apply(app.dispatcher, app.data.loginNextURL);
                            } else {
                                app.dispatcher.redirect('summary');
                            }
                            app.data.loginNextURL = undefined;
                        })
                        .fail(function(r_us, r_fb){
                            window.location.reload(false);
                        })
                })
                .fail(function (r_l) {
                    if (eventName) {
                        app.views.userView.event.fire(eventName, [false]);
                        return
                    }
                    if (!!email && !!password) {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.general.login.err.invalidCredentials
                        });
                    }
                    app.dispatcher.dispatch('profile', 'login', ['fail']);

                })
        },
        userLogout:function (force) {
            var self=this,
                deferreds = [];
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
            $.when.apply(this,deferreds).always(function(){
                    app.data = {};
                    app.dataclear();
                    app.models.systemModel.monitorSystemStateDfd&&app.models.systemModel.monitorSystemStateDfd.reject({});
                    app.controllers.initController.init();
                    if (force!='silent') {
                        force = force || '';
                        app.dispatcher.redirect('summary', '',[force]);
                    }
                })


        }

    })
});
