/*
 * controllers/golfController.js
 * Golf Controller
 */

define([
    'app/ControllerClass',
    'app/models/retailModel',
    'app/views/retailView'], function( ControllerClass, RetailModel, RetailView) {
    return window.app.controllers.retailController = $.extend({}, ControllerClass, {
        app:app,
        module: 'retail',

        actions:{
            'show':['retailSelected'],
            'purchaseGC':['giftCertificatePurchase']

        },
        init:function () {
            console.log('initializing retail controller');
            app.data.messages = app.data.messages || [];
            this._init.call(this);
        },

        retailSelected:function (categoryId) {
            $.when(app.models.retailModel.getData('giftCertificates', {}))
                .done(function (r_gc) {
                    if (r_gc.GiftCertificate.length > 0) {
                        app.views.retailView.event.fire('requestGCSelection', [r_gc.GiftCertificate, categoryId]);
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                            title:app.localization.general.err.defaultErr,
                            message: r_gc.Result ? "(" + r_gc.Result.Text + ")" : ""
                        });
                        app.dispatcher.replace('','',[])
                    }
                })
                .fail(function (r_gc) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions: [],
                        title:app.localization.general.err.defaultErr,
                        message: r_gc.Result ? "(" + r_gc.Result.Text + ")" : ""
                    });
                    app.dispatcher.replace('','',[])
                });
        },

        giftCertificatePurchase:function (itemId, toName, message, method, layout, email, address, address2, city, state, country, zipcode, express) {
            var purchaseGCParameters = {
                'CustomerId': app.data.CustomerId || app.data.DefaultCustomerId,
                'ItemId':itemId,
                'IssueToName':toName,
                'Message':message,
                'Method':method,
                'Layout':layout,
                'EmailAddress':email,
                'MailToAddress:type=HOME.Address1':address,
                'MailToAddress:type=HOME.Address2':address2,
                'MailToAddress:type=HOME.City':city,
                'MailToAddress:type=HOME.StateProv':state,
                'MailToAddress:type=HOME.Country':country,
                'MailToAddress:type=HOME.PostCode':zipcode,
                'ExpressShipping':express=='true'?'true':'false'
            };;
            $.when(app.models.retailModel.getData('purchaseGC', purchaseGCParameters))
                .done(function (r_pgc) {
                    if (r_pgc.CertificateId) {
                        app.data.messages.push({ type:'alert', 'class':'alert-success', actions:[],
                            title:app.localization.giftCertificate.successfullPurchase,
                            message: _.uniq([app.localization.giftCertificate.customerCustomTextHeader, app.localization.giftCertificate.customerCustomTextFooter]).join("<br/><br/>")
                        });
                        //app.models.systemModel.getData('folioBalance', {}).always(function () {
                            app.dispatcher.replace('summary', 'show', []);
                        //});
                    } else {
                        app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                            title:app.localization.giftCertificate.failedPurchase,
                            message:"" //r_fb.Result.Text
                        });
                        app.views.retailView.event.fire('updateMessages', []);
                    }
                })
                .fail(function (r_pgc) {
                    app.data.messages.push({ type:'alert', 'class':'alert-error', actions:[],
                        title:app.localization.giftCertificate.failedPurchase,
                        message:app.localization.general.err.serverError //r_fb.Result.Text
                    });
                    app.views.retailView.event.fire('updateMessages', []);
                });
        }
    })
});
