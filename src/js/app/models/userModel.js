/*
 * userModel.js
 * User Model for RSWebJS
 */

define([ 'rsweblib','app/ModelClass','underscore'], function( rs, ModelClass, _ ){
    return window.app.models.userModel = $.extend({}, ModelClass, {

        app:app,

        module: 'user',

        dataModel: {
            'checkCustomerEmail' : {
                source: {'soap': 'CheckCustomerEmail', ns:'c'},
                parameters: [{name:'EmailAddress', userinput:true}],
                returnData: [{name:'Result', array: true, key:"value"}],
                fetchOnce: false,
                persistData: false,
                persistSelection: true
            },
            'resetPasswordCustomer' : {
                source: {'soap': 'ResetPasswordCustomer', ns:'c'},
                parameters: [{name:'EmailAddress', userinput:true},
                    {name:'GenerateReport', value:'TRUE'}],
                returnData: [{name:'Result', array: false, key:"value"}],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'changePasswordCustomer' : {
                source: {'soap': 'ChangePasswordCustomer', ns:'c'},
                parameters: [{name:'EmailAddress', userinput:true},
                    {name:'PasswordOld', userinput:true},
                    {name:'PasswordNew', userinput:true}],
                returnData: [{name:'Result', array: false, key:"value"}],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'authCustomer' : {
                source: {'soap': 'AuthCustomer', ns:'c'},
                parameters: [{name:'EmailAddress', userinput:true},
                    {name:'Password', userinput:true}],
                returnData: [
                    {name:'CustomerId', key:"CustomerId"},
                    {name:'FirstName', key:"FirstName"},
                    {name:'LastName', key:"LastName"},
                    {name:'ResetPwd', key:"ResetPwd"},
                    {name:'BookingAgentId', key:"BookingAgentId"},
                    {name:'CustomerGUID', key:"CustomerGUID"}

                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: true
            },
            'fetchCustomerProfile' : {
                source: {'soap': 'FetchCustomerProfile', ns:'c'},
                parameters: [
                    {name:'CustomerId', userinput:true},
                    {name:'CustomerGUID', userinput:true}
                ],
                returnData: [
                    {name:'Customer', array: true, key:"CustomerId"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: true
            },
            'fetchGroupMembers' : {
                source: {'soap': 'FetchGroupMembers', ns:'c'},
                parameters: [
                    {name:'CustomerId', userinput:true},
                    {name:'CustomerGUID', userinput:true}
                ],
                returnData: [
                    {name:'GroupMember', array: true, key:"CustomerId"},
                    {name:'GroupId', key:"GroupId"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: true
            },
            'fetchProfileData' : {
                source: {model:'user.fetchCustomerProfile',mapper:
                    function(thisModel,sourceModelName,parameters){
                                
                        var params = { 
                                CustomerId: app.data.CustomerId, 
                                CustomerGUID: app.data.CustomerGUID
                            },
                            dfd = $.Deferred();
                        app.models.userModel.getData('fetchGroupMembers', params ).always(function(x){
                            dfd.resolve(x);
                        })
                        return $.when(
                            app.models.userModel.getData('fetchCustomerProfile', params ),
                            dfd.promise()
                            )
                    }},
                parameters: [
                    {name:'CustomerId', userinput:true},
                    {name:'CustomerGUID', userinput:true}
                ],
                returnData: [{name:'Result', key:"value"}],
                fetchOnce: true,
                persistData: false,
                persistSelection: false
            },
            'fetchCustomerPMSBookings' : {
                source: {'soap': 'FetchCustomerPMSBookings', ns:'p'},
                parameters: [
                    {name:'CustomerId', userinput:true},
                    {name:'CustomerGUID', userinput:true}
                ],
                returnData: [
                    {name:'PMSBooking', array: true, key:"PMSFolioId"}
                ],
                fetchOnce: true,
                persistData: false,
                persistSelection: true
            },
            'fetchCustomerSpaBookings' : {
                source: {'soap': 'FetchCustomerSpaBookings', ns:'s'},
                parameters: [
                    {name:'CustomerId', userinput:true},
                    {name:'CustomerGUID', userinput:true}
                ],
                returnData: [
                    {name:'SpaFolio', array: true, key:"SpaFolioId"}
                ],
                fetchOnce: true,
                persistData: false,
                persistSelection: true
            },
            'fetchCustomerGolfBookings' : {
                source: {'soap': 'FetchCustomerGolfBookings', ns:'g'},
                parameters: [
                    {name:'CustomerId', userinput:true},
                    {name:'CustomerGUID', userinput:true}
                ],
                returnData: [
                    {name:'GolfBooking', array: true, key:"GolfBookingId"}
                ],
                fetchOnce: true,
                persistData: false,
                persistSelection: true
            }
        }
    })
});
