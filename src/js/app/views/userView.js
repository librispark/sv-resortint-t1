/*
 * views/spaView.js
 * Spa View
 */

define( [
    'lib/event',
    'app/views/commonViewHelper',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/breadcrumbs',
    'hbs!app/views/templates/content',
    'hbs!app/views/templates/userCreateUserForm',
    'hbs!app/views/templates/userChangePasswordForm',
    'hbs!app/views/templates/userResetPasswordForm',
    'hbs!app/views/templates/userLoginForm',
    'hbs!app/views/templates/userProfileForm',
    'bootstrap'
], function( Event, commonViewHelper, navbarTpl, breadcrumbsTpl, contentTpl, userCreateUserForm, userChangePasswordForm, userResetPasswordForm, userLoginForm, userProfileForm) {
    var userView = {
        app:app,
        event:$.extend({}, Event),
        module:"user"
    };
      _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
          result[obj[keys[i]]] = keys[i];
        }
        return result;
      };

    userView.event.listen('requestCreateUser', userView, function (e, type) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.user = [
            {name:app.localization.general.login.profileLabel, url:"#/profile"},
            {name:app.localization.general.login.newUserButtonLabel, url:"#/profile/create", last:true}
        ];

        var service = {
            id : "profile",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        $('#nav').html(navbarTpl({
            Customization:app.customization,
            Localization:app.localization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            services:app.data.serviceTypes,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL,
            service:service
        }));
        $('#content').html(userCreateUserForm({
            Localization:app.localization,
            languages:app.data.languageNames,
            language:app.language,
            Customization:app.customization,
            type: type
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.user
        }))
        commonViewHelper.updateNavBar(service,app.language,!!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepCreateUserForm(type);
    });

    userView.event.listen('requestAddGroupMember', userView, function (e) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.user = [
            {name:app.localization.general.login.profileLabel, url:"#/profile"},
            {name:app.localization.general.login.addGroupMember, url:"#/profile/addmember", last:true}
        ];

        var service = {
            id : "profile",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        $('#nav').html(navbarTpl({
            Customization:app.customization,
            Localization:app.localization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            services:app.data.serviceTypes,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL,
            service:service
        }));
        $('#content').html(userCreateUserForm({
            Localization:app.localization,
            languages:app.data.languageNames,
            language:app.language,
            Customization:app.customization
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.user
        }))
        commonViewHelper.updateNavBar(service,app.language,!!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepCreateUserForm();
    });

    userView.event.listen('requestChangePassword', userView, function (e) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.user = [
            {name:app.localization.general.login.profileLabel, url:"#/profile"},
            {name:app.localization.general.login.changePassword.title, url:"#/profile/change", last:true}
        ];

        var service = {
            id : "profile",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        $('#nav').html(navbarTpl({
            Customization:app.customization,
            Localization:app.localization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            services:app.data.serviceTypes,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL,
            service:service
        }));
        $('#content').html(userChangePasswordForm({
            Localization:app.localization,
            Customization:app.customization
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.user
        }))
        commonViewHelper.updateNavBar(service,app.language,!!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepChangePasswordForm();
    });

    userView.event.listen('requestResetPassword', userView, function (e, emailaddress) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.user = [
            {name:app.localization.general.login.profileLabel, url:"#/profile"},
            {name:app.localization.general.login.passwordReset.title, url:"#/profile/reset", last:true}
        ];

        var service = {
            id : "profile",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        $('#nav').html(navbarTpl({
            Customization:app.customization,
            Localization:app.localization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            services:app.data.serviceTypes,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL,
            service:service,
            emailaddress:emailaddress
        }));
        $('#content').html(userResetPasswordForm({
            Localization:app.localization,
            Customization:app.customization
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.user
        }))
        commonViewHelper.updateNavBar(service,app.language,!!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepResetPasswordForm();
    });

    userView.event.listen('requestUserLogin', userView, function (e, email, password, user, group) {
        var module = app.data.loginNextURL && app.data.loginNextURL[0] || 'nomodule'
          , action = app.data.loginNextURL && app.data.loginNextURL[1] || 'noaction'
          , contexts = _.keys(app.localization.newUser.context)
          , contextModules = _.filter(contexts,function(x){return x.match(new RegExp("(^"+module+"/)|(^\\*/)","i"))})
          , contextActions = _.filter(contextModules,function(x){return x.match(new RegExp("(^[^/]+/"+action+"$)|(^[^/]+/\\*$)","i"))})
          , contextAction = _.sortBy(contextActions,function(x){return -x.length})
        contextAction = contextAction[0] || "*/*"
        app.localization.newUser.activeContext = app.localization.newUser.context[contextAction]
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.user = [
            {name:
                app.data.userLoggedIn
                    ? app.localization.general.login.profileLabel
                    : app.localization.newUser.activeContext.breadcrumb, url:"#/profile", last:true}
        ];

        var service = {
            id : "profile",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        $('#nav').html(navbarTpl({
            Customization:app.customization,
            Localization:app.localization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            services:app.data.serviceTypes,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL,
            service:service
        }));
        $('#content').html(userLoginForm({
            Localization:app.localization,
            Customization:app.customization,
            useIntegratedLogin : !!app.customization.login.useIntegratedLogin && !app.customization.disableAccountCreation,
            email: email,
            password: password,
            user: user,
            group: group,
            hasGroupMembers: group && group.GroupMember && $.isArray(group.GroupMember),
            anyFutureBookings: (app.data.pmsBookingFuture && app.data.pmsBookingFuture.length > 0) || (app.data.spaBookingFuture && app.data.spaBookingFuture.length > 0) || (app.data.golfBookingFuture && app.data.golfBookingFuture.length > 0),
            anyPastBookings: (app.data.pmsBookingPast && app.data.pmsBookingPast.length > 0) || (app.data.spaBookingPast && app.data.spaBookingPast.length > 0) || (app.data.golfBookingPast && app.data.golfBookingPast.length > 0),
            userLoggedIn: app.data.userLoggedIn,
            languages:app.data.languageNames,
            language:app.language,
            CustomerEmail: app.data.CustomerEmail
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.user
        }))
        commonViewHelper.updateNavBar(service,app.language,!!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepUserLoginForm();
    });

    userView.event.listen('requestUserProfile', userView, function (e, userData) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.user = [
            {name:app.localization.general.login.profileLabel, url:"#/profile"},
            {name:app.localization.general.login.editProfileLabel, url:"#/profile/details", last:true}
        ];

        var service = {
            id : "profile",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        var params = {
            Localization:app.localization,
            Customization:app.customization,
            languages:app.data.languageNames,
            language:app.language,
            userLoggedIn: app.data.userLoggedIn,
            CustomerEmail: app.data.CustomerEmail
        };
        $.extend(params,userData, {isEditable:userData.CustomerId==app.data.CustomerId});
        params.userLanguage = _.invert(app.customization.submitLanguage)[userData.Language] || "";
        params.CustomerEmail = params.CustomerEmail.toLowerCase();
        $('#nav').html(navbarTpl({
            Customization:app.customization,
            Localization:app.localization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            services:app.data.serviceTypes,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL,
            service:service
        }));
        $('#content').html(userProfileForm(params));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.user
        }))
        commonViewHelper.updateNavBar(service,app.language,!!app.data.SessionId && app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepUserProfileForm();
    });

    userView.event.listen('updateLoginResult', userView, function (e, result) {
        var service = {
            id : "profile",
            icon : "ok",
            name : app.localization.general.serviceButtonLabel
        };
        commonViewHelper.updateLoginResult(result,service);
    })
    
    userView.event.listen('loginResetPasswordCustomer', userView, function (e, result, error) {
        commonViewHelper.loginResetPasswordCustomer(result, error);
    })


    return window.app.views.userView = userView;

});
