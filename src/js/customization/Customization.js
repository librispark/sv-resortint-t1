Customization = {};

// Unchanged below:
Customization.serverURL = 'http://www.resortsuite.com/';
Customization.serverURLButtonText = 'Return Home';
Customization.supportPhoneNumber = '555-555-5555';
Customization.defaultLanguage = 'en-us';
Customization.availableLanguages = ['en-us', 'fr-ca', 'es-sp'/*, 'zh-cn'*/];
Customization.defaultCountry = '';
Customization.defaultState = '';
Customization.goHomeOnHome = false;
Customization.multiLanguage = true;
Customization.multiLanguageLabel = {}
Customization.multiLanguageLabel['en-us'] = 'English';
Customization.multiLanguageLabel['fr-ca'] = 'Fran\u00e7ais';
Customization.multiLanguageLabel['es-sp'] = 'Espa\u00f1ol';
Customization.multiLanguageLabel['zh-cn'] = '中文';
Customization.submitLanguage = {}
Customization.submitLanguage['en-us'] = 'English';
Customization.submitLanguage['fr-ca'] = 'French';
Customization.submitLanguage['es-sp'] = 'Spanish';
Customization.submitLanguage['zh-cn'] = 'Chinese';
Customization.requirePaymentAddress = false;
Customization.requirePaymentPostalCode = false;
Customization.requireAddress = true;
Customization.showPaymentAllAddressFields = false;
Customization.showGenderInput = false;
Customization.showProvinceCode = false;
Customization.showAddMoreOnlyOnBottomOfBookingSummary = false;
Customization.warnFolioTimeoutMinutes = 5;
Customization.defaultSessionTimeout = 30;
Customization.hideOtherPropertyIfItemsInCart = false;
Customization.showLoginPromptFlyout = false;
Customization.hideInitialGuestItineraryOnBookingSummary = false;
Customization.moveGuestItineraryToBookingSummaryBottom = false;
Customization.googleAnalytics = ""; // e.g. "UA-12345678-1"
Customization.googleAnalyticsDomain = ""; // e.g. "resortsuite.com" **without the "www."**
Customization.disableAccountCreation = false;
Customization.disableProfileScreenCreateGroupMember = false; // add this to disable-quick-add-member
Customization.disablePasswordReset = false;
Customization.defaultMarketingOptIn = false;
// Customization.forceSessionId = '1234';

// START: Toggle feature availability
Customization.features = {};
Customization.features.spaBooking = true;				// true = feature enabled | false = feature not enabled
Customization.features.skiBooking = false;				// true = feature enabled | false = feature not enabled
Customization.features.giftCertificates = true;			// true = feature enabled | false = feature not enabled
Customization.features.golfBooking = true;				// true = feature enabled | false = feature not enabled
Customization.features.pmsBooking = true;				// true = feature enabled | false = feature not enabled
Customization.features.membership = true;				// true = feature enabled | false = feature not enabled
// END: Toggle feature availability
// START: Spa Settings
Customization.spaBooking = {};
Customization.spaBooking.appointmentIntervalTime = 30; 			// in minutes
Customization.spaBooking.allowBookingToday = true;			// true = appointments allowed date of booking | false = no appointments date of booking
Customization.spaBooking.allowBookClass = true;             // true = enable book class
Customization.spaBooking.showPropertyName = false;
Customization.spaBooking.defaultGender = '';
Customization.spaBooking.defaultSalutation = '';
Customization.spaBooking.sortByPrice = false;
Customization.spaBooking.sortClassesByDate = false;
Customization.spaBooking.showItemPrice = true;
Customization.spaBooking.autoExpandResults = false;
Customization.spaBooking.showPriceIncludingSurcharges = false;
Customization.spaBooking.preserveClassItemCrossDate = false;
Customization.spaBooking.disallowBookForGroupMember = false;
Customization.spaBooking.disallowQuickAddGroupMember = false;
Customization.spaBooking.alwaysQueryPrice = true;
Customization.spaBooking.availabilityQueryLookaheadDays = 3;
// END: Spa Settings
// START: Ski Settings
Customization.skiBooking = {};
Customization.skiBooking.allowBookingToday = false;			// true = appointments allowed date of booking | false = no appointments date of booking
Customization.skiBooking.showPropertyName = false;
Customization.skiBooking.defaultSalutation = '';
Customization.skiBooking.sortByPrice = false;
Customization.skiBooking.showPriceIncludingSurcharges = false;
Customization.skiBooking.groupPromoCategoriesIntoOne = false;
Customization.skiBooking.disallowBookForGroupMember = false;
Customization.skiBooking.disallowQuickAddGroupMember = false;
// END: Ski Settings
// START: Room Settings
Customization.roomsBooking = {};
Customization.roomsBooking.allowBookingToday = false;			// true = appointments allowed date of booking | false = no appointments date of booking
Customization.roomsBooking.dayGuestOnlyOne = false;
Customization.roomsBooking.filterByMaximumLengthOfStay = true;
Customization.roomsBooking.defaultNumAdults = 1; // Number from 1 to 4. Determines Single/Double/etc. rate shown on calendar
Customization.roomsBooking.showpmsNumYouth = true;
Customization.roomsBooking.showpmsNumChildren = true;
Customization.roomsBooking.showpmsNumJrChildren = true;
Customization.roomsBooking.showpmsPromoCode = true;
Customization.roomsBooking.showRateScreenMoreButton = true;
Customization.roomsBooking.showPropertyName = false;
Customization.roomsBooking.showDailyRates = false;
Customization.roomsBooking.sortPackagesByName = false; // false = off / "ASC" or true = sort 0-9A-Z / "DESC" = sort Z-A9-0
Customization.roomsBooking.sortRoomTypesByName = false; // false = off / "ASC" or true = sort 0-9A-Z / "DESC" = sort Z-A9-0
Customization.roomsBooking.sortRoomTypesByPrice = false; // false = off / "ASC" or true = sort smaller # first / "DESC" = larger # first
Customization.roomsBooking.suppressDailyRate = false;
Customization.roomsBooking.suppressCalendarRate = false;
Customization.roomsBooking.suppressCalendarPopover = false;
Customization.roomsBooking.suppressRateDateLoading = false;
Customization.roomsBooking.suppressConfirmScreen = false;
Customization.roomsBooking.showPricesOfRatesWithZeroRoomsLeftOnCalendar = false;
Customization.roomsBooking.ignoreStopArrivalsOnCalendar = false;
Customization.roomsBooking.ignoreMinLengthOfStayOnCalendar = false;
Customization.roomsBooking.ignoreDayOfWeekRestrictionOnCalendar = false;
Customization.roomsBooking.calendarRateDecimals = 0;
Customization.roomsBooking.autoExpandRateRoomResults = false;
Customization.roomsBooking.roomSelection = false;
Customization.roomsBooking.lowAvailabilityThreshold = 50;
Customization.roomsBooking.showSpecialServicePriceIncludingSurcharges = false;
	// Customization.roomsBooking.dayGuestPromoCode:
	//   Set to false to turn off availability of day guest mode; use string such as "MYPROMOCODE" otherwise
	//   Required to be set even if you are using the /dayguest/ deep linking with alternate promo codes; in such a case
	//   this value will be used as the default promo code to search for.
Customization.roomsBooking.dayGuestPromoCode = false;
// END: Room Settings
// START: Gift Cert Settings
Customization.retail = {};
Customization.retail.allowMessageInNonCustomGC  = true;
Customization.retail.showPickup = true;
Customization.retail.showSnailMail = true;
// END: Gift Cert Settings
// START: Golf Settings
Customization.golfBooking = {};
Customization.golfBooking.allowBookingToday = false;
Customization.golfBooking.teeTimeIntervalTime = 8;
Customization.golfBooking.onlyShowTeeTimesWithFourAvailableSlots = true;
Customization.golfBooking.showPriceIncludingSurcharges = false;
// END: Golf Settings
//START: Club Essential Setting -- deprecated
// Customization.clubEssential = {};
// Customization.clubEssential.enable = false;                              // true = enable club essential interface
// END: Club Essential
//START: Passing Parameters in URL -- deprecated
// Customization.passingParamInURL = {};
// Customization.passingParamInURL.enable = true;
//END:
//START: View Receipt Button
Customization.exactTarget = {};
Customization.exactTarget.viewReceipt = true;
//END:
Customization.payment = {};
Customization.payment.ccEnabledVisa = true;
Customization.payment.ccEnabledMC = true;
Customization.payment.ccEnabledAmex = true;
Customization.payment.ccEnabledDisc = true;
Customization.payment.requireExplicitTermsAccept = true;
// GC Redemption settings.
// If all four redeemGC settings are false, then GC redemption will not be offered.
// The GCNum settings enable submitting the user-entered number as a Gift Certificate Number
// The GCID settings enable submitting the user-entered number as a Gift Card ID
// If only the ...andRefNum setting is true, then Ref Num field will be shown and required
// If only the non-...andRefNum setting is true, then Ref Num field will not be shown
// If both the non- and ...andRefNum settings are true, then Ref Num field will be shown and optional
Customization.payment.redeemGCbyGCID = false;
Customization.payment.redeemGCbyGCIDandRefNum = false;
Customization.payment.redeemGCbyGCNum = false;
Customization.payment.redeemGCbyGCNumandRefNum = false;

Customization.payment.GCNumberLengthMin = 4;
Customization.payment.GCNumberLengthMax = 16;
Customization.payment.skipGuaranteeIfZeroBalanceAndGCUsed = false;

Customization.login = {};
Customization.login.atCheckOut = true;
Customization.login.emailcheck = true; // true = make web service calls to check for the email address in the system
Customization.login.useIntegratedLogin = true; // true = enable single-page login+signup mechanism
Customization.paypal = {};
Customization.paypal.enabled = false;
Customization.paypal.url = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&useraction=commit&token=";
Customization.yespay = {};
Customization.yespay.enabled = false;
Customization.i4go = {};
Customization.i4go.enabled = false;

Customization.SOAPUrl = null;
define(Customization);
