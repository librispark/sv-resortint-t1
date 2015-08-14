/*
 * systemModel.js
 * System Model for RSWebJS
 */

define([ 'rsweblib', 'app/ModelClass', 'underscore'], function( rs, ModelClass, _) {
        return window.app.models.systemModel = $.extend({}, ModelClass, {

        app:app,
        module:'system',
        dataModel:{
            'createSession':{
                source:{'soap':'CreateSession', ns:'c'},
                parameters:[ {name:'SessionId', userinput:true, optional:true} ],
                returnData:[
                    {name:'WebFolioId', key:"WebFolioId"},
                    {name:'DefaultCustomerId', key:"DefaultCustomerId"},
                    {name:'SessionId', key:"SessionId"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:false
            },
            'updateSession':{
                source:{'soap':'UpdateSession', ns:'c'},
                parameters:[
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'CustomerId', userinput:true},
                    {name:'CustomerGUID', userinput:true}
                ],
                returnData:[
                    {name:'Result', key:"value"}
                ],
                fetchOnce:false,
                persistData:false,
                persistSelection:false
            },
            'folioBookings' : {
                source: {'soap': 'FetchWebFolioBookings', ns:'f'},
                parameters: [
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'SessionId', model:'system.createSession.SessionId'}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'WebFolioItem', array: true, key:'FolioItemId'}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'specialServices' : {
                source: {'soap': 'FetchPMSSpecialServices', ns:'p'},
                parameters: [
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'Venue', userinput:true, optional:true},
                    {name:'PMSFolioId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'PMSSpecialService', array: true, key:'PMSItemId'},
                    {name:'InventoriedSpecialServices', key:'PMSItemId'}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'folioSpecialServices' : {
                source: {'soap': 'FetchPMSFolioSpecialServices', ns:'p'},
                parameters: [
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'PMSFolioId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'PMSBookingDetails', key:'PMSFolioId'}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'folioBalance' : {
                source: {'soap': 'FetchWebFolioBalance', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'FolioBalance', key:'FolioBalance'},
                    {name:'FolioItems', key:'FolioItems'}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'webFolioPayments' : {
                source: {'soap': 'FetchWebFolioPayments', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'WebFolioPayments', key:"WebFolioPayments"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'redeemGC' : {
                source: {'soap': 'RedeemGC', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'GCNumber', userinput:true},
                    {name:'GCRefNumber', userinput:true},
                    {name:'GCType', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'GiftCertId', key:"GiftCertId"},
                    {name:'GiftCardId', key:"GiftCardId"},
                    {name:'GCRedeemedAmount', key:"GCRedeemedAmount"},
                    {name:'GCBalance', key:"GCBalance"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'refundGC' : {
                source: {'soap': 'RefundGC', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'GiftCertId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'FolioBalance', key:'FolioBalance'}//,
                    // {name:'FolioItems', key:'FolioItems'}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'cancelSpaService' : {
                source: {'soap': 'CancelSpaService', ns:'s'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'SpaFolioId', userinput:true},
                    {name:'SpaFolioItemId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'cancelPMSBooking' : {
                source: {'soap': 'CancelPMSBooking', ns:'p'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'PMSFolioId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'cancelGolfBooking' : {
                source: {'soap': 'CancelGolfBooking', ns:'g'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'GolfFolioItemId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'cancelRetailItem' : {
                source: {'soap': 'CancelRetailItem', ns:'r'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'RetFolioId', userinput:true},
                    {name:'RetFolioItemId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'cancelSkiLiftTicket' : {
                source: {'soap': 'CancelSkiLiftTicket', ns:'k'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'SkiFolioId', userinput:true},
                    {name:'SkiFolioItemId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'cancelSkiPass' : {
                source: {'soap': 'CancelSkiPass', ns:'k'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'SkiFolioId', userinput:true},
                    {name:'SkiFolioItemId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'processCCPayment' : {
                source: {'soap': 'PostWebFolioPayment', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'CardType', userinput:true},
                    {name:'CardHolder', userinput:true},
                    {name:'ExpiryDate', userinput:true},
                    {name:'CVV2', userinput:true},
                    {name:'PostalCode', userinput:true},
                    {name:'CardNumber', userinput:true},
                    {name:'CustomerId', userinput:true},
                    {name:'GenerateReport', value:"TRUE"},
                    {name:'Address', userinput:true},
                    {name:'Address2', userinput:true},
                    {name:'City', userinput:true},
                    {name:'Country', userinput:true},
                    {name:'StateProv', userinput:true},
                    {name:'FName', userinput:true},
                    {name:'LName', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'Receipt', key:"Receipt"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'setupPPPayment' : {
                source: {'soap': 'SetExpressCheckout', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'Language', userinput:true},
                    {name:'CustomerId', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'Token', key:"Token"}

                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'doPPPayment' : {
                source: {'soap': 'DoExpressCheckout', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'CustomerId', userinput:true},
                    {name:'Token', userinput:true},
                    {name:'PayerID', userinput:true}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'PaymentStatus', key:"PaymentStatus"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'setCheckout' : {
                source: {'soap': 'SetCheckout', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [
                    {name:'Result', key:"value"},
                    {name:'Currency', key:"Currency"},
                    {name:'Digest', key:"Digest"},
                    {name:'FailURL', key:"FailURL"},
                    {name:'ForwardURL', key:"ForwardURL"},
                    {name:'MID', key:"MID"},
					{name:'MTR', key:"MTR"},
                    {name:'PaymentEngine', key:"PaymentEngine"},
                    {name:'SuccessURL', key:"SuccessURL"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'doCheckout' : {
                source: {'soap': 'DoCheckout', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'i4GoToken', userinput:true, optional:true},
                    {name:'i4GoCardType', userinput:true, optional:true},
                    {name:'i4GoExpiryMonth', userinput:true, optional:true},
                    {name:'i4GoExpiryYear', userinput:true, optional:true},
                    {name:'YPPGTR', userinput:true, optional:true},
                    {name:'YPMTR', userinput:true, optional:true},
                    {name:'YPAUTHID', userinput:true, optional:true},
                    {name:'YPauthCode', userinput:true, optional:true},
                    {name:'YPmessage', userinput:true, optional:true},
                    {name:'YPamount', userinput:true, optional:true},
                    {name:'YPresult', userinput:true, optional:true},
                    {name:'YPdigest', userinput:true, optional:true},
                    {name:'YPCVVResponse', userinput:true, optional:true},
                    {name:'YPAVSResponse', userinput:true, optional:true},
                    {name:'YPpostcodeResponse', userinput:true, optional:true},
					{name:'YPsubscriptionRef', userinput:true, optional:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },

            'checkoutFolio' : {

                source: {'soap': 'CheckOutWebFolio', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'emailWebFolioReceipt' : {

                source: {'soap': 'EmailWebFolioReceipt', ns:'f'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'debugfolio' : {

                source: {'soap': 'FetchSystemState', ns:'c'},
                parameters: [
                    {name:'SessionId', model:'system.createSession.SessionId'},
                    {name:'WebFolioId', model:'system.createSession.WebFolioId'},
                    {name:'Debug', userinput:true, optional:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'createCustomer' : {
                source: {'soap': 'CreateCustomer', ns:'c'},
                parameters: [
/* *
<NewCustomer>
    <CustomerId>?</CustomerId>
    <Name>
        <Salutation>?</Salutation>
        <FirstName>?</FirstName>
        <LastName>?</LastName>
    </Name>
    <EmailAddress>?</EmailAddress>
    <Password>?</Password>
    <Gender>?</Gender>
    <DateOfBirth>?</DateOfBirth>
    <!--0 to 2 repetitions:-->
    <Address type="?">
        <Address1>?</Address1>
        <Address2>?</Address2>
        <City>?</City>
        <StateProv>?</StateProv>
        <Country>?</Country>
        <PostCode>?</PostCode>
    </Address>
    <!--0 to 3 repetitions:-->
    <Phone type="?" primary="?">
        <!--You have a CHOICE of the next 2 items at this level-->
        <PhoneData>
            <PhoneNumber>?</PhoneNumber>
            <Extension>?</Extension>
        </PhoneData>
    </Phone>
    <BookingAgentId>?</BookingAgentId>
    <BookingAgentContactId>?</BookingAgentContactId>
    <CompanyName>?</CompanyName>
    <IATANumber>?</IATANumber>
    <FaxNumber>?</FaxNumber>
    <WebAddress>?</WebAddress>
    <VIPLevel>?</VIPLevel>
</NewCustomer>

 * */

                    {name:'Name.Salutation', userinput:true, optional:true},
                    {name:'Name.FirstName', userinput:true},
                    {name:'Name.LastName', userinput:true},
                    {name:'EmailAddress', userinput:true},
                    {name:'Language', userinput:true, optional:true},
                    {name:'NoEmail', userinput:true, optional:true},
                    {name:'Password', userinput:true, optional:true},
                    {name:'Gender', userinput:true, optional:true},
                    {name:'DateOfBirth', userinput:true, optional:true},
                    {name:'Address.Address1', userinput:true, optional:true},
                    {name:'Address.Address2', userinput:true, optional:true},
                    {name:'Address.City', userinput:true, optional:true},
                    {name:'Address.StateProv', userinput:true, optional:true},
                    {name:'Address.Country', userinput:true, optional:true},
                    {name:'Address.PostCode', userinput:true, optional:true},
                    {name:'Phone.PhoneNumber', userinput:true, optional:true},
                    {name:'Phone.PhoneData.PhoneNumber', userinput:true, optional:true},
                    {name:'Phone.PhoneData.Extension', userinput:true, optional:true},
                    {name:'Phone.Extension', userinput:true, optional:true}

                ],
                returnData: [
                    {name:'CustomerId', key:"CustomerId"},
                    {name:'Result', key:"value"},
                    {name:'CustomerGUID', key:"CustomerGUID"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'createGroupMember' : {
                source: {'soap': 'CreateGroupMember', ns:'c'},
                parameters: [
                    {name:'CustomerId', userinput:true},
                    {name:'CustomerGUID', userinput:true},
                    {name:'NewGroupMember.Name.Salutation', userinput:true, optional:true},
                    {name:'NewGroupMember.Name.FirstName', userinput:true},
                    {name:'NewGroupMember.Name.LastName', userinput:true},
                    {name:'NewGroupMember.EmailAddress', userinput:true, optional:true},
                    {name:'NewGroupMember.Language', userinput:true, optional:true},
                    {name:'NewGroupMember.NoEmail', userinput:true, optional:true},
                    {name:'NewGroupMember.Password', userinput:true, optional:true},
                    {name:'NewGroupMember.Gender', userinput:true, optional:true},
                    {name:'NewGroupMember.DateOfBirth', userinput:true, optional:true},
                    {name:'NewGroupMember.Address.Address1', userinput:true, optional:true},
                    {name:'NewGroupMember.Address.Address2', userinput:true, optional:true},
                    {name:'NewGroupMember.Address.City', userinput:true, optional:true},
                    {name:'NewGroupMember.Address.StateProv', userinput:true, optional:true},
                    {name:'NewGroupMember.Address.Country', userinput:true, optional:true},
                    {name:'NewGroupMember.Address.PostCode', userinput:true, optional:true},
                    {name:'NewGroupMember.Phone.PhoneNumber', userinput:true, optional:true},
                    {name:'NewGroupMember.Phone.PhoneData.PhoneNumber', userinput:true, optional:true},
                    {name:'NewGroupMember.Phone.PhoneData.Extension', userinput:true, optional:true},
                    {name:'NewGroupMember.Phone.Extension', userinput:true, optional:true}

                ],
                returnData: [
                    {name:'NewGroupMemberCustomerId', key:"NewGroupMemberCustomerId"},
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            },
            'updateCustomerProfile' : {
                source: {'soap': 'UpdateCustomerProfile', ns:'c'},
                parameters: [
                    {name:'Customer.CustomerId', userinput:true},
                    {name:'Customer.CustomerGUID', userinput:true},
                    {name:'Customer.Name.Salutation', userinput:true, optional:true},
                    {name:'Customer.Name.FirstName', userinput:true},
                    {name:'Customer.Name.LastName', userinput:true},
                    {name:'Customer.EmailAddress', userinput:true},
                    {name:'Customer.Password', userinput:true, optional:true},
                    {name:'Customer.Gender', userinput:true, optional:true},
                    {name:'Customer.NoEmail', userinput:true, optional:true},
                    {name:'Customer.Language', userinput:true, optional:true},
                    {name:'Customer.DateOfBirth', userinput:true, optional:true},
                    {name:'Customer.Address.Address1', userinput:true, optional:true},
                    {name:'Customer.Address.Address2', userinput:true, optional:true},
                    {name:'Customer.Address.City', userinput:true, optional:true},
                    {name:'Customer.Address.StateProv', userinput:true, optional:true},
                    {name:'Customer.Address.Country', userinput:true, optional:true},
                    {name:'Customer.Address.PostCode', userinput:true, optional:true},
                    {name:'Customer.Phone.PhoneNumber', userinput:true, optional:true},
                    {name:'Customer.Phone.PhoneData.PhoneNumber', userinput:true, optional:true},
                    {name:'Customer.Phone.PhoneData.Extension', userinput:true, optional:true},
                    {name:'Customer.Phone.Extension', userinput:true, optional:true},
                    {name:'Customer.SkiSettings.SkiSize', userinput:true, optional:true},
                    {name:'Customer.SkiSettings.SkiBootSize', userinput:true, optional:true},
                    {name:'Customer.SkiSettings.SnowboardSize', userinput:true, optional:true},
                    {name:'Customer.SkiSettings.SnowboardBootSize', userinput:true, optional:true},
                    {name:'Customer.SkiSettings.DinNumber', userinput:true, optional:true},
                    {name:'Customer.SkiSettings.Age', userinput:true, optional:true},
                    {name:'Customer.SkiSettings.Weight', userinput:true, optional:true},
                    {name:'Customer.SkiSettings.Height', userinput:true, optional:true}
                ],
                returnData: [
                    {name:'Result', key:"value"}
                ],
                fetchOnce: false,
                persistData: false,
                persistSelection: false
            }
        },
            fetchSystemState : function () {
                if ( !! app.models.systemModel.fetchSystemStatePromise ) {
                    return app.models.systemModel.fetchSystemStatePromise;
                }
                var fetchSystemState = $.Deferred();
                $.extend(app.data, { 'fetchSystemStatePromise' : fetchSystemState.promise() });
                rs.SOAP('c','FetchSystemState', app.data.WebFolioId ?  ( new rs.SOAPParam("WebFolioId").val(app.data.WebFolioId)) : null, app.customization.SOAPUrl )
                    .done( function(r) {
                        if (r.SystemState == "ONLINE") {
                            fetchSystemState.resolve(app.data['fetchSystemStatePromise']=r);
                        } else {
                            fetchSystemState.reject(r);
                        }
                    })
                    .fail( function(r) {
                        fetchSystemState.reject(r);
                    });
                return fetchSystemState.promise();
            },

            monitorSystemState : function (delay) {

                app.models.systemModel.monitorSystemStateDfd = app.models.systemModel.monitorSystemStateDfd
                    ||  $.Deferred();
                app.models.systemModel.monitorSystemStatePromise = app.models.systemModel.monitorSystemStateDfd.promise();

                $.wait(delay || 60000).then(function(){
                    rs.SOAP('c','FetchSystemState',  app.data.WebFolioId ?  ( new rs.SOAPParam("WebFolioId").val(app.data.WebFolioId)) : null, app.customization.SOAPUrl)
                        .done( function(r) {
                            if (r.SystemState == "ONLINE") {
                                app.models.systemModel.monitorSystemStateDfd.notify(r);
                                !delay && app.data.active && app.models.systemModel.monitorSystemState();
                            } else {
                                app.models.systemModel.monitorSystemStateDfd.reject(r);
                            }
                        })
                        .fail( function(r) {
                            app.models.systemModel.monitorSystemStateDfd.reject(r);
                        });
                })
                return app.models.systemModel.monitorSystemStatePromise;
            },
            validatePMSBeforeSpa : function (spaLocationName, updateFolioData) {
                var validatePMSBeforeSpa = $.Deferred();
                if (!app.customization.features.pmsBooking) {
                    validatePMSBeforeSpa.resolve(undefined);
                    return validatePMSBeforeSpa.promise();
                }
                $.when(
                    ( !app.models.systemModel.dataModel.folioBookings.data || updateFolioData
                        ? app.models.systemModel.getData('folioBookings', {})
                        : app.models.systemModel.dataModel.folioBookings.data[
                            app.models.roomsModel.makeStandardName(app.models.systemModel.dataModel.folioBookings,{})
                          ]
                    ),
                    app.customization.features.pmsBooking && app.models.roomsModel.getData('pmsVenues', {}),
                    app.customization.features.spaBooking && app.models.spaModel.getData('spaLocations', {}),
                    app.customization.features.skiBooking && app.models.skiModel.getData('skiLocations', {})
                ).done(function(r_fb, r_pv, r_sl, r_kl){
                    console.log('Running validatePMSBeforeSpa');
                    app.data.hasPmsReservation = {}; // redundant with pmsPropertyIdsInCart? No! These are 'in the context of PMSRoomMandatory' only
                    app.data.hasSpaReservation = {}; // redundant with spaPropertyIdsInCart? No! These are 'in the context of PMSRoomMandatory' only
                    // add values from app.data.spabookings and pmsbookings into these two above, but not into the cart ones.
                    // also makse sure to add to pmsdatelist and spadatelist based on above, so that we can populate the date drop-downs
                    app.data.pmsDateList = {};
                    app.data.spaDateList = {};
                    app.data.skiDateList = {};
                    app.data.spaMissing = [];
                    app.data.spaLocationsByPropertyId = {};
                    app.data.spaLocationsBookingType = {};
                    app.data.spaLocationsInCart = [];
                    app.data.spaPropertyIdsInCart = [];
                    app.data.skiLocationsByPropertyId = {};
                    app.data.skiLocationsInCart = [];
                    app.data.skiPropertyIdsInCart = [];
                    app.data.pmsVenuesByPropertyId = {};
                    app.data.pmsVenuesInCart = [];
                    app.data.pmsPropertyIdsInCart = [];
                    app.data.spaClassesInCart = false;
                    app.data.spaServicesInCart = false;
                    var spa = undefined;
                    var missing = false;
                    var spaFolioIdsInCart = [];
                    var skiFolioIdsInCart = [];
                    var pmsFolioIdsInCart = [];
                    _.each(r_sl.SpaLocation, function(x){
                        if (app.data.spaLocationsByPropertyId[x.PropertyId]) {
                            app.data.spaLocationsByPropertyId[x.PropertyId].push(x.LocationId);
                        } else {
                            app.data.spaLocationsByPropertyId[x.PropertyId] = [x.LocationId];
                        }
                        app.data.spaLocationsBookingType[x.LocationId] = x.BookingType;
                        if (spaLocationName == x.LocationName) {
                            spa = x;
                        }
                    });
                    _.each(r_kl.SkiLocation, function(x){
                        if (app.data.skiLocationsByPropertyId[x.PropertyId]) {
                            app.data.skiLocationsByPropertyId[x.PropertyId].push(x.LocationId);
                        } else {
                            app.data.skiLocationsByPropertyId[x.PropertyId] = [x.LocationId];
                        }
                    });
                    _.each(r_pv.Venue, function(x){
                        if (app.data.pmsVenuesByPropertyId[x.PropertyId]) {
                            app.data.pmsVenuesByPropertyId[x.PropertyId].push(x.VenueId);
                        } else {
                            app.data.pmsVenuesByPropertyId[x.PropertyId] = [x.VenueId];
                        }
                        return spaLocationName == x.LocationName
                    });
                    $.each(r_fb && r_fb.WebFolioItem || [], function(i,webFolioItem) {
                        if (webFolioItem.Category=="Hotel") {
                            pmsFolioIdsInCart.push(webFolioItem.FolioId);
                            var folioProperty = _.find(r_pv.Venue, function(x){
                                return webFolioItem.Location == x.VenueName
                            });
                            if (folioProperty) {
                                app.data.hasPmsReservation[folioProperty.PropertyId] = true;
                                app.data.pmsPropertyIdsInCart.push(folioProperty.PropertyId);
                                app.data.pmsVenuesInCart.push(folioProperty.VenueId);
                                app.data.pmsDateList[folioProperty.PropertyId] = app.data.pmsDateList[folioProperty.PropertyId] || [];
                                if (_.any(app.data.pmsDayBookings,function(x){return x==webFolioItem.FolioId})) {
                                    var theDate = Date.parseExact(webFolioItem.StartDate, "yyyy-MM-ddHHmmss");
                                    app.data.pmsDateList[folioProperty.PropertyId].push({
                                        human:theDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                                        machine:theDate.toString("yyyy-MM-dd")
                                    });
                                } else {
                                    var startDate = Date.parseExact(webFolioItem.StartDate, "yyyy-MM-ddHHmmss"),
                                        endDate = Date.parseExact(webFolioItem.FinishDate, "yyyy-MM-ddHHmmss");
                                    for (var theDate = startDate.clone(); theDate <= endDate; theDate.add(1).day()) {
                                        app.data.pmsDateList[folioProperty.PropertyId].push({
                                            human:theDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                                            machine:theDate.toString("yyyy-MM-dd")
                                        });
                                    }
                                }
                            }
                        }
                    });
                    $.each(app.data.pmsBookings || [], function(i,pmsFolioItem){
                        if (!pmsFolioItem || pmsFolioItem.BookStatus != "RESERV" || !pmsFolioItem.ArrivalDate || (Date.parseExact(pmsFolioItem.ArrivalDate.substr(0,10),"yyyy-MM-dd") < Date.now())) {
                            return;
                        }
                        $.each(pmsFolioIdsInCart,function(j,x){
                            if (x == pmsFolioItem.PMSFolioId) {
                                app.data.pmsBookings[i].Future = undefined;
                                app.data.pmsBookingFuture = _.without(app.data.pmsBookingFuture,pmsFolioItem.PMSFolioId);
                                app.data.pmsBookingPast = _.without(app.data.pmsBookingPast,pmsFolioItem.PMSFolioId);
                            }
                        });
                        var folioProperty = _.find(r_pv.Venue, function(x){
                            return pmsFolioItem.Venue == x.VenueId
                        });
                        folioProperty && (folioProperty = $.extend({},folioProperty));
                        if (folioProperty) {
                            app.data.hasPmsReservation[folioProperty.PropertyId] = true;
                            app.data.pmsDateList[folioProperty.PropertyId] = app.data.pmsDateList[folioProperty.PropertyId] || [];
                            if (_.any(app.data.pmsDayBookings,function(x){return x==pmsFolioItem.PMSFolioId})) {
                                var theDate = Date.parseExact(pmsFolioItem.ArrivalDate, "yyyy-MM-ddHHmmss");
                                app.data.pmsDateList[folioProperty.PropertyId].push({
                                    human:theDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                                    machine:theDate.toString("yyyy-MM-dd")
                                });
                            } else {
                                var startDate = Date.parseExact(pmsFolioItem.ArrivalDate, "yyyy-MM-ddHHmmss"),
                                    endDate = Date.parseExact(pmsFolioItem.DepartureDate, "yyyy-MM-ddHHmmss");
                                for (var theDate = startDate.clone(); theDate <= endDate; theDate.add(1).day()) {
                                    app.data.pmsDateList[folioProperty.PropertyId].push({
                                        human:theDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                                        machine:theDate.toString("yyyy-MM-dd")
                                    });
                                }
                            }
                        }
                    });
                    $.each(r_fb && r_fb.WebFolioItem || [], function(i,webFolioItem) {
                        if (webFolioItem.Category=="Spa") {
                            spaFolioIdsInCart.push(webFolioItem.FolioId);
                            var folioSpa = _.find(r_sl.SpaLocation, function(x){
                                return webFolioItem.Location == x.LocationName
                            });
                            folioSpa && (folioSpa = $.extend({},folioSpa));
                            if (folioSpa) {
                                folioSpa.PMSRoomMandatory == "Y" && (app.data.hasSpaReservation[folioSpa.PropertyId] = true);
                                app.data.spaPropertyIdsInCart.push(folioSpa.PropertyId);
                                app.data.spaLocationsInCart.push(folioSpa.LocationId);
                                app.data.spaDateList[folioSpa.LocationId] = app.data.spaDateList[folioSpa.LocationId] || [];
                                app.data.spaDateList[folioSpa.LocationId].push(webFolioItem.StartDate.substr(0,10));
                                if (_.any(app.data.spaClassFolioItemIds,function(x){return x==webFolioItem.FolioItemId})) {
                                    app.data.spaClassesInCart = true;
                                } else {
                                    app.data.spaServicesInCart = true;
                                }
                                if (folioSpa.PMSRoomMandatory == "Y") {
                                    if (
                                        !_.find(app.data.pmsDateList[folioSpa.PropertyId],function(y){
                                                return y.machine == (webFolioItem.StartDate && webFolioItem.StartDate.substr(0,10))
                                            })
                                        ) {
                                        app.data.spaMissing.push({date:webFolioItem.StartDate.substr(0,10),property:folioSpa.PropertyName})
                                        folioSpa && (folioSpa.PropertyId = "RSzzzDateRangeCheckFailedZzzRS"); //  :)
                                    }
                                }
                            }

                        }
                    });
                    $.each(app.data.spaBookings || [], function(i,spaBooking){
                        var spaFolioItem = spaBooking.SpaFolioItem;
                        if (!spaFolioItem || spaFolioItem.BookStatus != "BKD" || !spaFolioItem.BookStartTime || (Date.parseExact(spaFolioItem.BookStartTime.substr(0,10),"yyyy-MM-dd") < Date.now())) {
                            return;
                        }
                        var folioSpa = _.find(r_sl.SpaLocation, function(x){
                            return spaFolioItem.LocationId == x.LocationId
                        });
                        $.each(spaFolioIdsInCart,function(j,x){
                            if (x == spaBooking.SpaFolioId) {
                                app.data.spaBookings[i].Future = undefined;
                                app.data.spaBookingFuture = _.without(app.data.spaBookingFuture,spaBooking.SpaFolioId);
                                app.data.spaBookingPast = _.without(app.data.spaBookingPast,spaBooking.SpaFolioId);
                            }
                        })
                        folioSpa && (folioSpa = $.extend({},folioSpa));
                        if (app.data.spaBookings[i].Future && folioSpa) {
                            app.data.spaDateList[folioSpa.LocationId] = app.data.spaDateList[folioSpa.LocationId] || [];
                            app.data.spaDateList[folioSpa.LocationId].push(spaFolioItem.BookStartTime.substr(0,10));
                            if (folioSpa.PMSRoomMandatory == "Y") {
                                /*app.data.hasSpaReservation[folioSpa.PropertyId] = true;
                                if (
                                    !_.find(app.data.pmsDateList[folioSpa.PropertyId],function(y){
                                            return y.machine == (spaFolioItem.BookStartTime && spaFolioItem.BookStartTime.substr(0,10))
                                        })
                                    ) {
                                    app.data.spaMissing.push({date:spaFolioItem.BookStartTime.substr(0,10),property:folioSpa.PropertyName})
                                    folioSpa && (folioSpa.PropertyId = "RSzzzDateRangeCheckFailedZzzRS"); //  :)
                                }*/
                            }
                        }
                    });
                    $.each(r_fb && r_fb.WebFolioItem || [], function(i,webFolioItem) {
                        if (webFolioItem.Category=="Ski") {
                            skiFolioIdsInCart.push(webFolioItem.FolioId);
                            var folioSki = _.find(r_kl.SpaLocation, function(x){
                                return webFolioItem.Location == x.LocationName
                            });
                            folioSki && (folioSki = $.extend({},folioSki));
                            if (folioSki) {
                                app.data.skiPropertyIdsInCart.push(folioSki.PropertyId);
                                app.data.skiLocationsInCart.push(folioSki.LocationId);
                                app.data.skiDateList[folioSki.LocationId] = app.data.skiDateList[folioSki.LocationId] || [];
                                app.data.skiDateList[folioSki.LocationId].push(webFolioItem.StartDate.substr(0,10));
                            }

                        }
                    });
                    $.each(app.data.skiBookings || [], function(i,skiBooking){
                        var skiFolioItem = skiBooking.SkiFolioItem;
                        if (!skiFolioItem || skiFolioItem.BookStatus != "BKD" || !skiFolioItem.BookStartTime || (Date.parseExact(skiFolioItem.BookStartTime.substr(0,10),"yyyy-MM-dd") < Date.now())) {
                            return;
                        }
                        var folioSki = _.find(r_sl.SkiLocation, function(x){
                            return skiFolioItem.LocationId == x.LocationId
                        });
                        $.each(skiFolioIdsInCart,function(j,x){
                            if (x == skiBooking.SkiFolioId) {
                                app.data.skiBookings[i].Future = undefined;
                                app.data.skiBookingFuture = _.without(app.data.skiBookingFuture,skiBooking.SkiFolioId);
                                app.data.skiBookingPast = _.without(app.data.skiBookingPast,skiBooking.SkiFolioId);
                            }
                        })
                        folioSki && (folioSki = $.extend({},folioSki));
                        if (app.data.skiBookings[i].Future && folioSki) {
                            app.data.skiDateList[folioSki.LocationId] = app.data.skiDateList[folioSki.LocationId] || [];
                            app.data.skiDateList[folioSki.LocationId].push(skiFolioItem.BookStartTime.substr(0,10));
                        }
                    });
                    _.each(app.data.spaDateList,function(v,k,l){
                        l[k] = _.uniq(v);
                    });
                    _.each(app.data.skiDateList,function(v,k,l){
                        l[k] = _.uniq(v);
                    });
                    app.data.spaLocationsInCart = _.uniq(app.data.spaLocationsInCart);
                    app.data.spaPropertyIdsInCart = _.uniq(app.data.spaPropertyIdsInCart);
                    app.data.skiLocationsInCart = _.uniq(app.data.skiLocationsInCart);
                    app.data.skiPropertyIdsInCart = _.uniq(app.data.skiPropertyIdsInCart);
                    app.data.pmsVenuesInCart = _.uniq(app.data.pmsVenuesInCart);
                    app.data.pmsPropertyIdsInCart = _.uniq(app.data.pmsPropertyIdsInCart);
                    app.data.propertyIdsInCart = _.uniq( _.flatten( [app.data.spaPropertyIdsInCart,app.data.skiPropertyIdsInCart,app.data.pmsPropertyIdsInCart] ) ); 
                    // this will assume all spa locations have PMSRoomMandatory set.
                    // TODO: add check for PMSRoomMandatory and only add those spas to the hasPmsReservation/hasSpaReservation
                    // variables. also dont populate var spa if PMSRoomMandatory isn't set, right?
                    //
                    // still missing checking if dates are overlapping between spa and pms
                    if (r_fb && r_fb.WebFolioItem) {
                        if (spa) {
                            missing =  spa.PMSRoomMandatory == "Y" && (!app.data.hasPmsReservation[spa.PropertyId] /*|| !app.data.hasSpaReservation[spa.PropertyId]*/);
                        } else {
                            $.each(app.data.hasSpaReservation, function(i,spaReservation){
                                missing = missing || (app.data.hasPmsReservation[i] != spaReservation);
                            });
                            missing = missing || (app.data.spaMissing.length > 0)
                        }
                    } else {
                        missing  =(spa && spa.PMSRoomMandatory == "Y") ? true : null;
                    }
                    missing = missing && !app.data.overridePMSRestriction; // if app.data.overridePMSRestriction is set, then make missing false
                    if (app.customization.hideOtherPropertyIfItemsInCart) {
                        var pmsLink = "roomsBooking",
                            dayLink = false,
                            spaLink = "spaBooking";
                            skiLink = "ski";
                        if ( app.data.pmsPropertyIdsInCart.length == 1 && app.data.spaPropertyIdsInCart.length == 1 ) {
                            var propertyId = app.data.spaPropertyIdsInCart[0];
                            if (app.data.pmsPropertyIdsInCart[0]==propertyId) {
                                if ( app.data.pmsVenuesByPropertyId[ propertyId ] && app.data.pmsVenuesByPropertyId[ propertyId ].length==1) {
                                    pmsLink = "roomsBooking/venue/" + app.data.pmsVenuesByPropertyId[ propertyId ][0];
                                    if (app.data.spaLocationsInCart.length > 0 && app.data.spaDateList[app.data.spaLocationsInCart[0]]) {
                                        pmsLink += "/" + app.data.spaDateList[app.data.spaLocationsInCart[0]]
                                    } else if (app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]] && app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]].length > 0) {
// try to add these links also if pms bookings
                                        pmsLink += "/" + app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]][0].machine
                                    }
                                    dayLink = pmsLink.replace("/venue/","/dayvenue/");
                                } else if (!app.data.pmsVenuesByPropertyId[ propertyId ]) {
                                    dayLink = pmsLink = false;
                                }
                            }
                        } else if ( app.data.pmsPropertyIdsInCart.length == 1 || app.data.spaPropertyIdsInCart.length == 1 ) {
                            var propertyId = app.data.spaPropertyIdsInCart.length == 1 ? app.data.spaPropertyIdsInCart[0] : app.data.pmsPropertyIdsInCart[0];
                            if (app.data.pmsVenuesByPropertyId[ propertyId ] && app.data.pmsVenuesByPropertyId[ propertyId ].length==1) {
                                pmsLink = "roomsBooking/venue/" + app.data.pmsVenuesByPropertyId[ propertyId ][0];
                                if (app.data.spaLocationsInCart.length > 0 && app.data.spaDateList[app.data.spaLocationsInCart[0]]) {
                                    pmsLink += "/" + app.data.spaDateList[app.data.spaLocationsInCart[0]]
                                } else if (app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]] && app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]].length > 0) {
                                    pmsLink += "/" + app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]][0].machine
                                }
                                dayLink = pmsLink.replace("/venue/","/dayvenue/");
                            } else if (!app.data.pmsVenuesByPropertyId[ propertyId ]) {
                                dayLink = pmsLink = false;
                            }
                            if (app.data.pmsPropertyIdsInCart.length > 0 &&  !app.data.spaLocationsByPropertyId[app.data.pmsPropertyIdsInCart[0]]) {
                                spaLink = false;
                            }
                        }
                        if (app.data.spaLocationsInCart.length == 1) {
                            if (app.data.spaClassesInCart && !app.data.spaServicesInCart) {
                                spaLink = "spaBooking/class/Location" +  app.data.spaLocationsInCart[0];
                                if (app.data.spaDateList[app.data.spaLocationsInCart[0]] && app.data.spaDateList[app.data.spaLocationsInCart[0]].length == 1) {
                                    var spaLocation = _.find(r_sl.SpaLocation,function(x){ return x.LocationId == app.data.spaLocationsInCart[0] });
                                    if (spaLocation.PMSRoomMandatory == "Y") {
                                        if (app.data.pmsPropertyIdsInCart.length==0 || _.any(app.data.pmsDateList[spaLocation.PropertyId],function(x){return x.machine == app.data.spaDateList[app.data.spaLocationsInCart[0]][0]})) {
                                            spaLink += "/" + app.data.spaDateList[app.data.spaLocationsInCart[0]][0];
                                        }
                                    } else {
                                        spaLink += "/" + app.data.spaDateList[app.data.spaLocationsInCart[0]][0];
                                    }
                                }
                            } else if (!app.data.spaClassesInCart && app.data.spaServicesInCart) {
                                spaLink = "spaBooking/service/Location" +  app.data.spaLocationsInCart[0];
                                if (app.data.spaDateList[app.data.spaLocationsInCart[0]] && app.data.spaDateList[app.data.spaLocationsInCart[0]].length == 1) {
                                    var spaLocation = _.find(r_sl.SpaLocation,function(x){ return x.LocationId == app.data.spaLocationsInCart[0] });
                                    if (spaLocation.PMSRoomMandatory == "Y") {
                                        if (app.data.pmsPropertyIdsInCart.length==0 || _.any(app.data.pmsDateList[spaLocation.PropertyId],function(x){return x.machine == app.data.spaDateList[app.data.spaLocationsInCart[0]][0]})) {
                                            spaLink += "/" + app.data.spaDateList[app.data.spaLocationsInCart[0]][0];
                                        }
                                    } else {
                                        spaLink += "/" + app.data.spaDateList[app.data.spaLocationsInCart[0]][0];
                                    }
                                }
                            }
                        }
                        if (app.data.pmsPropertyIdsInCart.length == 1 && app.data.spaLocationsByPropertyId[app.data.pmsPropertyIdsInCart[0]] && app.data.spaLocationsByPropertyId[app.data.pmsPropertyIdsInCart[0]].length == 1) {
                            var spaLocation = app.data.spaLocationsByPropertyId[app.data.pmsPropertyIdsInCart[0]][0];
                            switch(app.data.spaLocationsBookingType[spaLocation]) {
                                case "Service" : spaLink = "spaBooking/service/Location" + spaLocation; break;
                                case "Class" : spaLink = "spaBooking/class/Location" +  spaLocation; break;
                            }
                        }
                        if (app.data.propertyIdsInCart.length==1 && app.data.skiLocationsByPropertyId[app.data.propertyIdsInCart[0]] && app.data.skiLocationsByPropertyId[app.data.propertyIdsInCart[0]].length == 1) {
                            var skiLocation = app.data.skiLocationsByPropertyId[app.data.propertyIdsInCart[0]][0];
                            skiLink = "ski/liftTickets/Location" + skiLocation;
                        }
                        app.controllers.initController.loadServiceTypes(pmsLink,spaLink,dayLink,skiLink);
                    }
                    validatePMSBeforeSpa.resolve(missing);
                });

                return validatePMSBeforeSpa.promise();
            }


        })
});
