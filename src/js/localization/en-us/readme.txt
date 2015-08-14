Third party tracking implementation:

There are several ways to implement third party tracking. The most straight-
forward is shown in Example 1 below. 

You will need to create a localization/en-us/thirdPartyAnalyticsTpl.html file
and paste the tracking code (or "pixel") provided by the third party into it.
Then modify the first line of the customerOverrides.js file as shown in
Example 1, and also change or add the 
Localization.paymentProcessing.analyticsCustomTemplate line as shown in the
same example.





**** Example 1: analyticsCustomTemplate 
define(['localization/en-us/Localization','text!localization/en-us/thirdPartyAnalyticsTpl.html'], function (Localization,thirdPartyAnalyticsTpl) {

    // You can put other localization overrides before or after the analyticsCustomTemplate line.
    Localization.paymentProcessing.analyticsCustomTemplate = thirdPartyAnalyticsTpl;

});




**** Example 2: analyticsCustomTemplate function
define(['localization/en-us/Localization'], function (Localization) {

    // You can put other localization overrides before or after the analyticsCustomTemplate line.
    Localization.paymentProcessing.analyticsCustomTemplate = function (tplData) {
        var output = "";
        if (tplData.cartData typeof == "object" && tplData.cartData.length) {
            for( var i = 0; i < tplData.cartData.length; i++ ) {
                var item = tplData.cartData[i];
                output += '<div class="booking"><span class="booking-type">' + item.category + '</span>' +
                        '<span class="booking-price">' + item.price + '</span>' +
                        '<span class="booking-description">' + item.name + '</span>';
                if (item.category=="Hotel") {
                    output += '<span class="booking-nights">' + item.nights + '</span>';
                }
                output += '</div>';
            }
        }
        output += '<div class="order-id">' + tplData.appData.WebFolioId + '</div>';
        return output;
    };

});




**** Example 3: everyPage function
define(['localization/en-us/Localization'], function (Localization) {

    // You can put other localization overrides before or after the analyticsCustomTemplate line.
    Localization.analytics = {};
    Localization.analytics.everyPage = function (appData, url) {
        var segments = url.split('/');
        if (_gaq && segments[0] == "profile" && segments[1] == "createsubmit") {
            // Google Analytics is loaded and the submitted on the new account screen
            _gaq.push(['_trackEvent', 'Conversion', 'Created Account']);
        }
    };

});




**** Example 4: everyPage function with jQuery
define(['localization/en-us/Localization','jquery'], function (Localization,$) {

    // You can put other localization overrides before or after the analyticsCustomTemplate line.
    Localization.analytics = {};
    Localization.analytics.everyPage = function (appData, url) {
        var segments = url.split('/');
        if (_gaq && segments[0] == "club" ) {
            // Google Analytics is loaded and the submitted on the new account screen
            $('body').append('<div id="myCustomMessage">You are in the club section of the booking engine.</div>');
        } else {
            $('body div#myCustomMessage').remove();
        }
    };

});
