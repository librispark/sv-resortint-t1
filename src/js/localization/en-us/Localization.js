define(['jquery', 'jquery_validate'], function($) {
// Resource file for all display text in the application (English)
    Localization = {};
    Localization.siteName = "The Spa at ResortSuite";
    Localization.bookingSummary = {};
    Localization.bookingSummary.add = 'Add';
    Localization.bookingSummary.addMore = 'Add More Services';
    Localization.bookingSummary.addMoreSlogan = 'Make your Booking even more memorable';
    Localization.bookingSummary.BookingHistory = 'Booking History';
    Localization.bookingSummary.BookingHistoryTitle = 'Existing Bookings';
    Localization.bookingSummary.bookPackageAgain = 'Book this package again';
    Localization.bookingSummary.bookServiceAgain = 'Book this service again';
    Localization.bookingSummary.bookClassAgain = 'Book another class';
    Localization.bookingSummary.bookCourseAgain = 'Book another tee time';
    Localization.bookingSummary.cartName = 'Booking Summary';
    Localization.bookingSummary.cartNoItems = 'There are no items in your cart at this time.  To add items choose one of our services above.';
    Localization.bookingSummary.cartTitle = 'Please take a moment to review the contents of your booking carefully.';
    Localization.bookingSummary.checkoutButton = 'Confirm';
    Localization.bookingSummary.checkoutInfo = 'Click here to confirm your above reservation details and complete your booking: ';
    Localization.bookingSummary.checkoutInstruction = 'Finalize your Booking';
    Localization.bookingSummary.checkoutTitle = 'Confirm Reservation';
    Localization.bookingSummary.clearCart = 'Clear Booking Summary.';
    Localization.bookingSummary.clearCartFail = 'Unable to remove this item from your Booking Summary.';
    Localization.bookingSummary.clearCartInstructions = 'Want to start over?';
    Localization.bookingSummary.confirmRemoveSkiActivatesPromoButton = 'Remove all promotional items';
    Localization.bookingSummary.confirmRemoveSkiActivatesPromoTitle = 'Remove <%= title %> and all promotional items?';
    Localization.bookingSummary.confirmRemoveSkiActivatesPromo = 'This item allows you to buy promotional items. If you have promotional items in your booking summary and you continue to remove this item, then all those promotional items will also be removed from your booking summary. Are you sure?';
    Localization.bookingSummary.creditCard = 'Pay Now';
    Localization.bookingSummary.creditCardGuarantee = 'Confirm Now';
    Localization.bookingSummary.dayVisitAt = 'Day Visit at';
    Localization.bookingSummary.depositPerPlayer = 'Deposit per Player';
    Localization.bookingSummary.futureBookings = 'These are future Bookings recorded in your account. We look forward to greeting you.';
    Localization.bookingSummary.grid = {};
    Localization.bookingSummary.grid.addUpgrade = 'Add an Upgrade to your Reservation';
    Localization.bookingSummary.grid.amountLabel = 'Deposit Amount';
    Localization.bookingSummary.grid.totalAmountLabel = 'Total Amount';
    Localization.bookingSummary.grid.depositAmountLabel = 'Deposit Due Today';
    Localization.bookingSummary.guaranteeTitle = 'Guarantee Method';
    Localization.bookingSummary.issuedBy = 'Issued by';
    Localization.bookingSummary.marketing = {};
    Localization.bookingSummary.marketing.bannerMessage = 'We are delighted to serve your needs';
    Localization.bookingSummary.orderTotal = 'Order Total:';
    Localization.bookingSummary.pastBookings = 'These are your past Bookings as recorded in your account.';
    Localization.bookingSummary.paymentGuarantee = 'A valid credit card is required to guarantee your reservation.  Your card will not be billed at this time.';
    Localization.bookingSummary.paymentInstruction = 'Finalize your Booking by clicking on the button below';
    Localization.bookingSummary.paymentTitle = 'Payment Method';
    Localization.bookingSummary.payPal = '<img src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif">';
    Localization.bookingSummary.perNight = 'Per Night';
    Localization.bookingSummary.pmsDailyRateDateFormat = '<b>MMM</b> dd';
    Localization.bookingSummary.player = 'Player';
    Localization.bookingSummary.players = 'Players';
    Localization.bookingSummary.removeSelected = 'Remove';
    Localization.bookingSummary.removeHotelReservation = 'Remove Room Reservation at'
    Localization.bookingSummary.removeSpaReservation = 'Remove Spa Service:'
    Localization.bookingSummary.removeSkiReservation = 'Remove Ski Ticket/Pass:'
    Localization.bookingSummary.removeGolfReservation = 'Remove Tee Time at'
    Localization.bookingSummary.removeRetailReservation = 'Remove Gift Certificate from'
    Localization.bookingSummary.removeUpgrade = 'Remove Upgrade';
    Localization.bookingSummary.reservationAdded = 'Your Reservation has been recorded in our systems.';
    Localization.bookingSummary.roomReservationAt = 'Room Reservation at';
    Localization.bookingSummary.selectUpgrade = 'Select an Upgrade...';
    Localization.bookingSummary.selectedUpgrades = 'Selected Upgrades:';
    Localization.bookingSummary.spaServiceFrom = 'Spa Service from';
    Localization.bookingSummary.spaServiceForName = 'Spa Service for';
    Localization.bookingSummary.skiTicketsFor = 'Ski Tickets at';
    Localization.bookingSummary.skiTicketsForName = 'Ski Tickets for';
    Localization.bookingSummary.skiTickets = 'Ski Tickets';
    Localization.bookingSummary.teetimeAt = 'Tee Time at';
    Localization.bookingSummary.time = 'Time:';
    Localization.bookingSummary.totalDeposit = 'Pay Total Deposit of';
    Localization.bookingSummary.tryAgain = 'Please try again.';
    Localization.bookingSummary.upgradeConfirmation = 'Your Upgrade has been added to your Reservation.';
    Localization.bookingSummary.upgradeError = 'Unable to add this upgrade to your Reservation.';
    Localization.bookingSummary.upgradeRemoved = 'Your Upgrade has been removed from your Reservation.';
    Localization.bookingSummary.using = ':';
    Localization.bookingSummary.viewPastBookings = 'You may also wish to review your past Bookings with us.';
    Localization.club = {};
    Localization.club.account = 'Account';
    Localization.club.accountBalance = 'Account Balance';
    Localization.club.accountDetails = 'Account Details';
    Localization.club.accountMembers = 'Account Members';
    Localization.club.accountOwner = 'Account Owner';
    Localization.club.accounts = 'Accounts';
    Localization.club.accountType = 'Account Type';
    Localization.club.accountList = 'Account List';
    Localization.club.address = 'Address';
    Localization.club.amount = 'Amount';
    Localization.club.charges = 'Charges';
    Localization.club.date = 'Date';
    Localization.club.description = 'Description';
    Localization.club.effectiveDate = 'Effective Date';
    Localization.club.expiryDate = 'Expiry Date';
    Localization.club.fetchAccountsFail = 'Error occurred while fetching accounts.';
    Localization.club.fetchStatementsFail = 'Error occurred while fetching account statements.';
    Localization.club.fetchTransactionsFail = 'Error occurred while fetching account transactions.';
    Localization.club.payments = 'Payments';
    Localization.club.phone = 'Phone';
    Localization.club.previousBalance = 'Previous Balance';
    Localization.club.profile = 'Profile';
    Localization.club.statementPeriod = 'Statement Period';
    Localization.club.statements = 'Statements';
    Localization.club.status = 'Status';
    Localization.club.member = 'Member';
    Localization.club.memberId = 'Member Id';
    Localization.club.memberLevel = 'Member Level';
    Localization.club.memberLevelNA = 'N/A';
    Localization.club.memberName = 'Name';
    Localization.club.membership = 'Membership';
    Localization.club.memberships = 'Memberships';
    Localization.club.minimums = 'Minimums';
    Localization.club.minimumChargeDate = 'Charge Date';
    Localization.club.minimumStartDate = 'Start Date';
    Localization.club.minimumCharged = 'Minimum Charged';
    Localization.club.minimumTotal = 'Minimum Total';
    Localization.club.minimumUsed = 'Minimum Used';
    Localization.club.myAccounts = 'My Accounts';
    Localization.club.newCharges = 'New Charges';
    Localization.club.noMemberships = 'No Memberships';
    Localization.club.noTransactions = 'No Transactions';
    Localization.general = {};
    Localization.general.applicationTitle = 'ResortSuite Web';
    Localization.general.close = 'Close';
    Localization.general.contactingServer = 'Contacting Server...';
    Localization.general.continueProcessButtonLabel = 'Continue';
    Localization.general.copyright = 'Copyright 2013';
    Localization.general.currencyPrefix = '$';
    Localization.general.currencyPostfix = '';
    Localization.general.err = {};
    Localization.general.err.checkedoutContinue = 'You can continue to make additional bookings by clicking the button below.';
    Localization.general.err.checkedoutText = 'The items in your booking summary have been sucessfully recorded in our systems.';
    Localization.general.err.checkedoutTitle = 'Your reservation has been successfully completed';
    Localization.general.err.defaultErr = 'Error processing your request.  Please try again.';
    Localization.general.err.emailErrExist = 'This email address is already registered in the system. Reset your password by clicking this button .';
    Localization.general.err.emailErrNotExist = 'This email address does not exist in the system. Create a new account by clicking New User';
    Localization.general.err.jquery_validate = {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: $.validator.format("Please enter no more than {0} characters."),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Please enter a value less than or equal to {0}."),
        min: $.validator.format("Please enter a value greater than or equal to {0}.")
    };
    Localization.general.err.multipleProperties = 'You can not have items from more than one property in one transaction. Please remove items from your Booking Summary so that only one property remains in your Booking Summary. You will be able to complete a subsequent transaction for your items from other properties.';
    Localization.general.err.restartSession = 'Cannot restart server session...';
    Localization.general.err.serverOffline = 'Server is Offline...';
    Localization.general.err.startOver = 'Start Over';
    Localization.general.err.startSession = 'Cannot start new server session...';
    Localization.general.err.timeoutContinue = 'You can start a new session by clicking the button below.';
    Localization.general.err.timeoutText = 'Your session has ended due to inactivity.';
    Localization.general.err.timeoutTitle = 'Your session has timed out';
    Localization.general.features = {};
    Localization.general.features.clubName = 'View Membership Statements';
    Localization.general.features.extraHTML='';
    Localization.general.features.giftCertificatesName = 'Purchase Gift Certificate';
    Localization.general.features.goHomeLabel = 'You can return to our main website here:';
    Localization.general.features.goHomeButtonLabel = 'Home Page';
    Localization.general.features.golfName = 'Book Golf';
    Localization.general.features.intro = 'is pleased to offer you the following online services';
    Localization.general.features.pmsName = 'Reserve Room';
    Localization.general.features.pmsDayName = 'Book Day Visit';
    Localization.general.features.pmsOrDayName = 'Reserve Room or Day Visit';
    Localization.general.features.spaName = 'Book Spa, Classes or Activities';
    Localization.general.features.skiName = 'Purchase Ski Lift Tickets / Passes';
    Localization.general.features.title = 'Please Choose';
    Localization.general.gender = {};
    Localization.general.gender.female = 'Female';
    Localization.general.gender.male = 'Male';
    Localization.general.gender.noPreference = 'No Pref.';
    Localization.general.language = 'Language';
    Localization.general.location = {};
    Localization.general.location.closed = 'Closed';
    Localization.general.location.email = 'Email';
    Localization.general.location.hours = 'Hours';
    Localization.general.location.phone = 'Call';
    Localization.general.location.website = 'Website';
    Localization.general.login = {};
    Localization.general.login.addGroupMember = 'Add Group Member';
    Localization.general.login.alreadyLoggedIn = 'You are currently logged in.';
    Localization.general.login.bookingHistoryLabel = 'Booking History';
    Localization.general.login.changePassword = {};
    Localization.general.login.changePassword.commitButton = 'Change';
    Localization.general.login.changePassword.err = {};
    Localization.general.login.changePassword.err.min8chars = 'Password must be at least 8 characters long';
    Localization.general.login.changePassword.err.passwordsDoNotMatch = 'New passwords must match';
    Localization.general.login.changePassword.err.resetFailed = 'Unable to change password.  Email address / password combination incorrect';
    Localization.general.login.changePassword.title = 'Change Password';
    Localization.general.login.changePassword.updateSuccess = 'Your password has been updated.';
    Localization.general.login.changePasswordButtonLabel = 'Change Password';
    Localization.general.login.description = 'Please log in below. If you are a new customer, please create a profile by clicking New User';
    Localization.general.login.emailTitle = 'Email Address';
    Localization.general.login.err = {};
    Localization.general.login.err.invalidCredentials = 'Sorry, we could not log you in with the provided email address and password.';
    Localization.general.login.forgotPasswordButtonLabel = 'Forgot Password';
    Localization.general.login.familyGroupTitle = 'Family Group Members';
    Localization.general.login.greeting = 'Welcome ';
    Localization.general.login.guestName = 'Guest Name:';
    Localization.general.login.loginButtonLabel = 'Log In';
    Localization.general.login.logoutButtonLabel = 'Log Out';
    Localization.general.login.logoutWarning = 'If you log out then all of the items in your Booking Summary will be discarded. Do you really want to log out?';
    Localization.general.login.newUserButtonLabel = 'New User';
    Localization.general.login.passwordReset = {};
    Localization.general.login.passwordReset.cancelButtonLabel = 'Cancel';
    Localization.general.login.passwordReset.description = 'Type your email address.';
    Localization.general.login.passwordReset.emailLabel = 'Email Address';
    Localization.general.login.passwordReset.newPassword1Label = 'New Password';
    Localization.general.login.passwordReset.newPassword2Label = 'Confirm Password';
    Localization.general.login.passwordReset.newPasswordEmailConfirmation = 'Your new password has been emailed to the address provided.';
    Localization.general.login.passwordReset.oldPasswordLabel = 'Current Password';
    Localization.general.login.passwordReset.resetButtonLabel = 'Reset';
    Localization.general.login.passwordReset.title = 'Reset Password';
    Localization.general.login.passwordTitle = 'Password';
    Localization.general.login.profileLabel = 'Guest Profile';
    Localization.general.login.editProfileLabel = 'Edit Profile';
    Localization.general.login.viewProfileLabel = 'View Profile';
    Localization.general.login.returnToProfileLabel = 'Return to Guest Profile';
    Localization.general.login.phoneNumber = 'Phone Number:';
    Localization.general.login.promptFlyoutText = 'Log in to see your upcoming reservations and your booking history.';
    Localization.general.login.promptFlyoutTitle = 'Already a Guest?';
    Localization.general.login.relationshipLabel = 'Relationship:';
    Localization.general.login.sectionNameTitle = 'Name';
    Localization.general.login.title = 'Login to Continue';
    Localization.general.maintenance = {};
    Localization.general.maintenance.folioTimeOutWarning = 'Your session will be closed automatically if you don\'t take any action in';
    Localization.general.maintenance.maintenanceMessage = 'The system will be closing for maintenance in approximately';
    Localization.general.maintenance.maintenanceMessageTimeUnit = 'minutes.';
    Localization.general.paymentCards = {};
    Localization.general.paymentCards.amex = 'American Express';
    Localization.general.paymentCards.discover = 'Discover';
    Localization.general.paymentCards.masterCard = 'MasterCard';
    Localization.general.paymentCards.visa = 'Visa';
    Localization.general.print = 'Print';
    Localization.general.processingMessage = 'Please wait, we are processing your request.';
    Localization.general.progressIndicatorMessage = 'Processing';
    Localization.general.salutation = {};
    Localization.general.salutation.doctor = 'Dr.';
    Localization.general.salutation.miss = 'Miss.';
    Localization.general.salutation.missus = 'Mrs.';
    Localization.general.salutation.mister = 'Mr.';
    Localization.general.salutation.misterAndMissus = 'Mr. & Mrs.';
    Localization.general.salutation.mizz = 'Ms.';
    Localization.general.serviceButtonLabel = 'Our Services';
    Localization.general.termsText = 'Terms and Conditions';
    Localization.giftCertificate = {};
    Localization.giftCertificate.customerCustomTextHeader = '';
    Localization.giftCertificate.customerCustomTextFooter = '';
    Localization.giftCertificate.customGiftCertificate = {};
    Localization.giftCertificate.customGiftCertificate.cityLabel = 'City';
    Localization.giftCertificate.customGiftCertificate.countryLabel = 'Country';
    Localization.giftCertificate.customGiftCertificate.deliverVia = 'Deliver Via:';
    Localization.giftCertificate.customGiftCertificate.emailAddressLabel = 'Email Address';
    Localization.giftCertificate.customGiftCertificate.expressLabel = 'Express Shipping';
    Localization.giftCertificate.customGiftCertificate.messageLabel = 'Message';
    Localization.giftCertificate.customGiftCertificate.pickupText = 'Your certificate will be available for pick up at our location within a few days.';
    Localization.giftCertificate.customGiftCertificate.pickupTitle = 'Pickup';
    Localization.giftCertificate.customGiftCertificate.postalAddressLabel = 'Postal Address';
    Localization.giftCertificate.customGiftCertificate.postalAddress2Label = '';
    Localization.giftCertificate.customGiftCertificate.recipientNameLabel = 'Recipient Name';
    Localization.giftCertificate.customGiftCertificate.sendByEmailLabel = 'Send by Email';
    Localization.giftCertificate.customGiftCertificate.sendByMailTitle = 'Send by Mail';
    Localization.giftCertificate.customGiftCertificate.stateLabel = 'State/Prov';
    Localization.giftCertificate.customGiftCertificate.styleImgTitle = 'GC Styles';
    Localization.giftCertificate.customGiftCertificate.zipLabel = 'Zip/Postal Code';
    Localization.giftCertificate.failedPurchase = 'Unable to process gift certificate.';
    Localization.giftCertificate.instructions = 'Select a gift certificate from the following list.';
    Localization.giftCertificate.marketing = {};
    Localization.giftCertificate.marketing.bannerMessage = 'Give and Delight';
    Localization.giftCertificate.successfullPurchase = 'Your Gift Certificate has been created in our systems.';
    Localization.giftCertificate.title = 'Purchase Gift Certificate';
    Localization.golf = {};
    Localization.golf.areYouAMember = 'Are you a member?';
    Localization.golf.availableTeeTimeTitle = 'Available Tee Times';
    Localization.golf.confirmation = {};
    Localization.golf.confirmation.courseLabel = 'Course:';
    Localization.golf.confirmation.locationLabel = 'Location:';
    Localization.golf.confirmation.priceLabel = 'Price per player:';
    Localization.golf.confirmation.rateLabel = 'Rate';
    Localization.golf.confirmation.teeTimeLabel = 'Tee Time:';
    Localization.golf.confirmGolfBooking = 'Confirm Golf Booking';
    Localization.golf.continueButton = 'Check Available Tee Times';
    Localization.golf.customerCustomTextHeader = '';
    Localization.golf.customerCustomTextFooter = '';
    Localization.golf.dateInstructions = 'Please select a date first';
    Localization.golf.dateLabel = 'Date';
    Localization.golf.dateTimePlayerTitle = 'Date, Time, and Players';
    Localization.golf.error = {};
    Localization.golf.error.date = 'Please pick a date first.';
    Localization.golf.error.noBooking = 'Sorry, we could not record your Tee Time reservation in our systems at this time.';
    Localization.golf.error.noCourses = 'Unable to retrieve Golf Courses for this location';
    Localization.golf.error.noLocations = 'Unable to retrieve Golf Location list.';
    Localization.golf.error.noRates = 'Unable to retrieve Golf Rates for the specified date';
    Localization.golf.error.noTeeTime = 'Unable to retrieve tee times for the specified date';
    Localization.golf.error.zeroCourses = 'No Golf Courses available at this location';
    Localization.golf.error.zeroLocations = 'Unable to retrieve any Golf Locations.';
    Localization.golf.error.zeroRates = 'No Golf Rates are available to you on the specified date';
    Localization.golf.error.zeroTeeTime = 'No tee times available on the specified date';
    Localization.golf.loginToReceive = 'To receive member pricing, please';
    Localization.golf.marketing = {};
    Localization.golf.marketing.bannerMessage = 'Well above par';
    Localization.golf.on = 'on';
    Localization.golf.playersLabel = '# of Players';
    Localization.golf.selectCourse = 'Select Course';
    Localization.golf.selectCourseDefault = 'Select a Course...';
    Localization.golf.selectLocation = 'Select Location';
    Localization.golf.selectLocationDefault = 'Select a Location...';
    Localization.golf.successfullBookingMessage = 'Your Tee Time reservation has been recorded in our systems.';
    Localization.golf.timeLabel = 'Pref. Tee Time';
    Localization.golf.title = 'Golf Reservation';
    Localization.newUser = {};
    Localization.newUser.addButtonLabel = 'Add';
    Localization.newUser.address1Title = 'Address 1';
    Localization.newUser.address2Title = 'Address 2';
    Localization.newUser.addressType = 'Address Type';
    Localization.newUser.addressTypeHome = 'Home Address';
    Localization.newUser.addressTypeOther = 'Other Address';
    Localization.newUser.cancelButtonLabel = 'Cancel';
    Localization.newUser.cityTitle = 'City';
    Localization.newUser.confirmEmailTitle = 'Confirm Email*';
    Localization.newUser.confirmPasswordTitle = 'Confirm Password *';
    Localization.newUser.contactInfoSectionTitle = 'Contact Information (Enter at least one phone number * )';
    Localization.newUser.guestNameSectionTitle = 'Guest Name';
    Localization.newUser.countryTitle = 'Country';
    Localization.newUser.createButtonLabel = 'Create';
    Localization.newUser.description = 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.';
    Localization.newUser.emailTitle = 'Email *';
    Localization.newUser.enterEmailFirstPrompt = 'Please start by entering your email address';
    Localization.newUser.enterExistingEmailPrompt = 'If you have stayed with us before, please enter the same email address you used previously';
    Localization.newUser.enterPasswordPrompt = 'Welcome back! Please enter your password to continue. If you do not remember your password, please press the Forgot Password button';
    Localization.newUser.fail = 'Could not create new user account.';
    Localization.newUser.failUpdate = 'Could not update user account.';
    Localization.newUser.firstNameTitle = 'First Name *';
    Localization.newUser.genderTitle = 'Gender *';
    Localization.newUser.homePhoneTitle = 'Home Phone';
    Localization.newUser.contactInfo = 'Contact Information';
    Localization.newUser.lastNameTitle = 'Last Name *';
    Localization.newUser.language = 'Language Preference';
    Localization.newUser.mainPhoneHome = 'Home';
    Localization.newUser.mainPhoneOther = 'Other';
    Localization.newUser.mainPhoneTitle = 'Preferred Phone';
    Localization.newUser.phoneType = 'Type';
    Localization.newUser.mainPhoneWork = 'Work';
    Localization.newUser.newGroupMember = 'New Family/Group Member:';
    Localization.newUser.newsletter = 'Newsletter';
    Localization.newUser.otherPhoneTitle = 'Other Phone';
    Localization.newUser.passwordCustom = 'Pick your own password';
    Localization.newUser.passwordIncorrect = 'Sorry, that password does not match our records. Please try again or if you do not remember your password, please press the Forgot Password button';
    Localization.newUser.passwordInstruction = 'Setting your own password lets you access your reservation history or make future bookings more quickly and easily.';
    Localization.newUser.passwordTitle = 'Password (Minimum 8 characters) *';
    Localization.newUser.passwordSectionTitle = 'Guest Profile Password';
    Localization.newUser.postCodeTitle = 'ZIP / Postal Code';
    Localization.newUser.predefinedPassword = 'Use randomly generated password: <code class="random"/>';
    Localization.newUser.salutationTitle = 'Salutation *';
    Localization.newUser.sectionAddressTitle = 'Address (Optional)';
    Localization.newUser.sectionAddressTitleMan = 'Address (Mandatory * )';
    Localization.newUser.sectionNameAndPasswordTitle = 'Name & Password (Mandatory * )';
    Localization.newUser.sectionEmailTitle = 'Email Address';
    Localization.newUser.skiSettings = {}
    Localization.newUser.skiSettings.title = 'Skiing Details';
    Localization.newUser.skiSettings.skiSize = 'Ski Size';
    Localization.newUser.skiSettings.skiBootSize = 'Ski Boot Size';
    Localization.newUser.skiSettings.snowboardSize = 'Snowboard Size';
    Localization.newUser.skiSettings.snowboardBootSize = 'Snowboard Boot Size';
    Localization.newUser.skiSettings.dinNumber = 'DIN Number';
    Localization.newUser.skiSettings.age = 'Age';
    Localization.newUser.skiSettings.weight = 'Weight';
    Localization.newUser.skiSettings.height = 'Height';
    Localization.newUser.stateTitle = 'State / Prov.';
    Localization.newUser.subscribeNewsletter = 'Marketing opt-in. Check to receive valuable offers by email. (Transactional emails regarding your account will be sent nonetheless.)';
    Localization.newUser.success = 'Thank you, we have created your account.';
    Localization.newUser.successMember = 'Thank you, we have created the Family Group member account.';
    Localization.newUser.successRandomPassword = $.validator.format('Please write down your account password: <strong>{0}</strong>');
    Localization.newUser.successUpdate = 'Thank you, we have successfully updated your account.';
    Localization.newUser.title = 'Create a New Guest Profile or Log In for Returning Guests';
    Localization.newUser.updateButtonLabel = 'Update';
    Localization.newUser.updateSessionFailed = 'We created your user account but had trouble updating your Booking Summary contents (if any). You may need to reload this page.';
    Localization.newUser.workPhoneExtension = 'Ext.';
    Localization.newUser.workPhoneTitle = 'Work Phone';
    Localization.newUser.phoneNumber = 'Number';
    Localization.newUser.context = {}
    Localization.newUser.context['summary/redeemGC'] = {
        breadcrumb : 'Redeem Gift Certificate',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to Redeem Gift Certificate',
        buttonUpdate : 'Update Guest Profile Information and Proceed to Redeem Gift Certificate',
        buttonProceed : 'Proceed to Redeem Gift Certificate',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['summary/*'] = {
        breadcrumb : 'Continue Booking',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to Pay Deposit',
        buttonUpdate : 'Update Guest Profile Information and Proceed to Pay Deposit',
        buttonProceed : 'Proceed to Pay Deposit',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['membership/*'] = {
        breadcrumb : 'Member Account',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to View Member Account',
        buttonUpdate : 'Update Guest Profile Information and Proceed to View Member Account',
        buttonProceed : 'Proceed to View Member Account',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['roomsBooking/*'] = {
        breadcrumb : 'Room Reservation',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to Book Room',
        buttonUpdate : 'Update Guest Profile Information and Proceed to Book Room',
        buttonProceed : 'Proceed to Book Room',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['spaBooking/*'] = {
        breadcrumb : 'Spa Reservation',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to Book Spa Service',
        buttonUpdate : 'Update Guest Profile Information and Proceed to Book Spa Service',
        buttonProceed : 'Proceed to Book Spa Service',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['ski/*'] = {
        breadcrumb : 'Ski Purchase',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to Book Spa Service',
        buttonUpdate : 'Update Guest Profile Information and Proceed to Book Spa Service',
        buttonProceed : 'Proceed to Book Spa Service',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['golfBooking/*'] = {
        breadcrumb : 'Golf Booking',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to Book Spa Service',
        buttonUpdate : 'Update Guest Profile Information and Proceed to Book Spa Service',
        buttonProceed : 'Proceed to Book Spa Service',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['profile/addmember'] = {
        breadcrumb : 'Add Group Member',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to Add Group Member',
        buttonUpdate : 'Update Guest Profile Information and Proceed to Add Group Member',
        buttonProceed : 'Proceed to Add Group Member',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['profile/*'] = {
        breadcrumb : 'Guest Profile',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile and Proceed to View Guest Profile',
        buttonUpdate : 'Update Guest Profile Information and Proceed to View Guest Profile',
        buttonProceed : 'Proceed to View Guest Profile',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.newUser.context['*/*'] = {
        breadcrumb : 'Log In',
        title : 'Create a New Guest Profile or Log In for Returning Guests',
        instructions : 'If you have visited us before then we will have your Guest Profile information already on file. All you need to do is Log In with your email address and password!\nAs a new Guest you will just need to fill out this short form to complete your booking.',
        buttonCreate : 'Create Guest Profile',
        buttonUpdate : 'Update Guest Profile Information',
        buttonProceed : 'Update Guest Profile Information',
        updateInstructions : 'Please take a moment to review the accuracy of your Guest Pofile information below.'
    }
    Localization.paymentProcessing = {};
    Localization.paymentProcessing.acceptTerms = {};
    Localization.paymentProcessing.acceptTerms.title = 'Accept Terms & Conditions';
    Localization.paymentProcessing.acceptTerms.checkboxLabel = 'I agree to the Terms & Conditions';
    Localization.paymentProcessing.acceptTerms.continueButtonLabel = 'Continue';
    Localization.paymentProcessing.acceptTerms.cancelButtonLabel = 'Cancel';
    Localization.paymentProcessing.acceptTerms.termsContentURL = 'terms.html';
    Localization.paymentProcessing.acceptTerms.termsContentSelector = 'div#content';
    Localization.paymentProcessing.addressLabel = 'Address';
    Localization.paymentProcessing.addressLabel2 = 'Address Line 2';
    Localization.paymentProcessing.cardHolderBlank = 'Enter the card holder name';
    Localization.paymentProcessing.transaction = 'Transaction Detail';
    Localization.paymentProcessing.cardInfo = 'Credit Card';
    Localization.paymentProcessing.billingAddress = 'Billing Address';
    Localization.paymentProcessing.cardNumberBlank = 'Enter a card number';
    Localization.paymentProcessing.cardNumberLabel = 'Card Number';
    Localization.paymentProcessing.cardTypeLabel = 'Card Type';
    Localization.paymentProcessing.checkoutButtonLabel = 'Checkout';
    Localization.paymentProcessing.cvvLabel = 'CVV';
    Localization.paymentProcessing.analyticsCustomTemplate = '';
    Localization.paymentProcessing.err = {};
    Localization.paymentProcessing.err.folioUnpaid = 'Sorry, your Booking Summary still requires payment.';
    Localization.paymentProcessing.err.invalidCVVNumber = 'Please enter correct CVV number.';
    Localization.paymentProcessing.err.invalidExpiryDate = 'Please enter credit card expiry date';
    Localization.paymentProcessing.err.noAddress = 'You must enter the address associated with this card for processing.';
    Localization.paymentProcessing.err.noCardHolderName = 'Enter a Card Holder Name.';
    Localization.paymentProcessing.err.noPostalCode = 'You must enter the zip/postal code associated with this card for processing.';
    Localization.paymentProcessing.err.pastExpiryDate = 'Credit card expiry date must be in the future';
    Localization.paymentProcessing.err.paymentFailed = 'Unable to process payment.';
    Localization.paymentProcessing.err.requiredInfo = '(Fields marked with a * are required.)';
    Localization.paymentProcessing.err.successButNoCheckoutFolio = 'Payment succeeded but could not close your folio.';
    Localization.paymentProcessing.err.successButNoEmail = 'Payment succeeded but could not email you a receipt.';
    Localization.paymentProcessing.expiryLabel = 'Expiry Date';
    Localization.paymentProcessing.expiryMonthBlank = 'Month';
    Localization.paymentProcessing.gcRedeemTitle = 'Redeem Gift Voucher';
    Localization.paymentProcessing.gcRedeemDescription = 'Please enter your Gift Voucher details below';
    Localization.paymentProcessing.gcRedeemDescriptionSubtitle = 'Choose the appropriate type of voucher that you have and enter the numbers without any dashes or spaces.';
    Localization.paymentProcessing.gcTypeDescription = 'We offer paper Gift Certificates and plastic Gift Cards. Please indicate which kind you have.';
    Localization.paymentProcessing.gcTypeLabel = 'Gift Voucher Type';
    Localization.paymentProcessing.gcTypeCard = 'Gift Card';
    Localization.paymentProcessing.gcTypeCert = 'Gift Certificate';
    Localization.paymentProcessing.gcNumberCard = 'Gift Card Number';
    Localization.paymentProcessing.gcNumberCardBlank = '12345678';
    Localization.paymentProcessing.gcNumberCert = 'Gift Certificate Number';
    Localization.paymentProcessing.gcNumberCertBlank = '00123456';
    Localization.paymentProcessing.gcRefNumberDescription = 'Your Gift Voucher also contains a Reference Number. Please enter it below';
    Localization.paymentProcessing.gcRefNumber = 'Reference Number';
    Localization.paymentProcessing.gcRefNumberBlank = '00000';
    Localization.paymentProcessing.gcRedeemSubmit = 'Redeem Gift Voucher';
    Localization.paymentProcessing.gcRedeemedSuccess = 'Gift Voucher Redeemed Successfully';
    Localization.paymentProcessing.gcRedeemedFailure = 'Unable to Redeem Gift Voucher';
    Localization.paymentProcessing.gcRefundedSuccess = 'Gift Voucher Refunded Successfully';
    Localization.paymentProcessing.gcRefundedFailure = 'Unable to Refund Gift Voucher';
    Localization.paymentProcessing.receiptHeader = 'Your receipt follows:  (All prices are in CAD)<br><pre class="paymentReceipt" style="display:inline-block">';
    Localization.paymentProcessing.receiptFooter = '</pre> <a class="btn btn-success receiptBtn" href="javascript:window.print()">' + Localization.general.print + '</a> <a class="btn receiptBtnClose" data-dismiss="alert" href="#">' + Localization.general.close + '</a>';
    Localization.paymentProcessing.redeemedGCsTitle = 'Redeemed Gift Vouchers';
    Localization.paymentProcessing.redeemedGCsSubTitle = 'These Gift Vouchers have been applied to your booking';
    Localization.paymentProcessing.gcRedeemedAmount = 'Amount Redeemed from Gift Voucher';
    Localization.paymentProcessing.gcRemainingAmount = 'Amount Remaining on Gift Voucher';
    Localization.paymentProcessing.gcRemove = 'Remove Gift Voucher';
    Localization.paymentProcessing.gcRedeemAnother = 'Redeem Another Gift Voucher';
    Localization.paymentProcessing.gcRedeemAnotherButton = 'Redeem Another Gift Voucher';
    Localization.paymentProcessing.gcRedeemAutoRemoveTitle = 'Remove Gift Voucher before Removing Item';
    Localization.paymentProcessing.gcRedeemAutoRemoveDescription = 'In order to remove this item from your Booking Summary you need to first remove all redeemed Gift Vouchers. ';
    Localization.paymentProcessing.gcRedeemAutoRemoveButton = 'Remove  <%= type %> Item and All Gift Vouchers.';
    Localization.paymentProcessing.redeemGCsTitle = 'Redeem Gift Vouchers';
    Localization.paymentProcessing.redeemGCsSubTitle = 'If you have a Gift Certificate or Gift Card you can redeem its value against your Booking Summary balance.';
    Localization.paymentProcessing.redeemGCsButton = 'Redeem A Gift Voucher';
    Localization.paymentProcessing.goHomeButtonLabel = 'Return to Home Page';
    Localization.paymentProcessing.guestLabel = 'Guest';
    Localization.paymentProcessing.paymentSuccessDescription = 'Thank you for you business.';
    Localization.paymentProcessing.paymentSuccessTitle = 'Transaction Successful';
    Localization.paymentProcessing.PPCanceled = 'Payment Transaction cancelled.';
    Localization.paymentProcessing.PPNotConfigured = 'Sorry, payment method is not available.';
    Localization.paymentProcessing.PPPreRedirect = 'Forwarding you to payment provider.';
    Localization.paymentProcessing.PPPostRedirect = 'Finalizing payment.';
    Localization.paymentProcessing.PPPreError = 'Error contacting payment provider.';
    Localization.paymentProcessing.PPPostError = 'Payment Transaction not completed due to error or payment not authorized.';
    Localization.paymentProcessing.sectionDescription = 'Complete your order using our secure payment service.';
    Localization.paymentProcessing.sectionTitle = 'Checkout';
    Localization.paymentProcessing.totalLabel = 'Total';
    Localization.paymentProcessing.userIDLabel = 'User ID';
    Localization.paymentProcessing.zipLabel = 'Zip / Postal Code';
    Localization.roomReservation = {};
    Localization.roomReservation.confirmation = {};
    Localization.roomReservation.confirmation.adultTotalLabel = 'Adults:';
    Localization.roomReservation.confirmation.amountLabel = 'Amount:';
    Localization.roomReservation.confirmation.arrivalDateLabel = 'Arrival Date:';
    Localization.roomReservation.confirmation.bookButtonLabel = 'Book';
    Localization.roomReservation.confirmation.dayVisitOnly = 'Day Visit Only';
    Localization.roomReservation.confirmation.childTotalLabel = 'Children:';
    Localization.roomReservation.confirmation.customerCustomTextHeader = '';
    Localization.roomReservation.confirmation.customerCustomTextFooter = '';
    Localization.roomReservation.confirmation.departureDateLabel = 'Departure Date:';
    Localization.roomReservation.confirmation.guestNameLabel = 'Guest Name:';
    Localization.roomReservation.confirmation.infantTotalLabel = 'Infants:';
    Localization.roomReservation.confirmation.instructions = 'Verify that your reservation data is accurate. Clicking Book adds this reservation to your Booking Summary.';
    Localization.roomReservation.confirmation.numberOfNightsLabel = 'Number of Nights:';
    Localization.roomReservation.confirmation.title = 'Confirm Reservation';
    Localization.roomReservation.confirmation.youthTotalLabel = 'Youth:';
    Localization.roomReservation.confirmation.visitDateLabel = 'Visit Date:';
    Localization.roomReservation.calendar = {};
    Localization.roomReservation.calendar.clickContinueToProceed = 'Click the Continue button below to proceed with your booking.';
    Localization.roomReservation.calendar.dateUnavailable = 'Date Unavailable';
    Localization.roomReservation.calendar.limitedAvailabilityFrom = 'Limited availability from ';
    Localization.roomReservation.calendar.limitedAvailability = 'Limited availability';
    Localization.roomReservation.calendar.lowAvailability = 'Low Availability';
    Localization.roomReservation.calendar.minLOS = 'Minimum Length of Stay Applies';
    Localization.roomReservation.calendar.minLOSRestriction = $.validator.format('Minimum {0} Night Stay');
    Localization.roomReservation.calendar.nextStep = 'Next Step:';
    Localization.roomReservation.calendar.noDescriptionAvailable = 'No description available.';
    Localization.roomReservation.calendar.noRoomsAvailable = 'No rooms available';
    Localization.roomReservation.calendar.noRoomsAvailableNoAction = 'Sorry, your stay cannot start on this date. <br><br>Please select another check-in date.';
    Localization.roomReservation.calendar.noRoomsAvailableAction = 'Your stay cannot start on this date. <br><br>However, you can check out on this date.';
    Localization.roomReservation.calendar.roomsAvailableFrom = 'Rooms available from ';
    Localization.roomReservation.calendar.roomsAvailable = 'Rooms available';
    Localization.roomReservation.calendar.selectArrivalDateButton = 'Select this<br>Arrival Date';
    Localization.roomReservation.calendar.selectArrivalDateOnCalendar = 'Select your Arrival Date on the calendar above.';
    Localization.roomReservation.calendar.selectDepartureDateButton = 'Select this<br>Departure Date';
    Localization.roomReservation.calendar.selectDepartureDateOnCalendar = 'Select your Departure Date on the calendar above.';
    Localization.roomReservation.calendar.selectedStayDates = 'Selected Stay Dates';
    Localization.roomReservation.calendar.notAvailable = 'N/A';
    Localization.roomReservation.datesAndOccupants = {};
    Localization.roomReservation.datesAndOccupants.adultOccupantsLabel = 'Adults';
    Localization.roomReservation.datesAndOccupants.arrivalLabel = 'Arrival';
    Localization.roomReservation.datesAndOccupants.childOccupantsLabel = 'Children';
    Localization.roomReservation.datesAndOccupants.customerCustomTextHeader = '';
    Localization.roomReservation.datesAndOccupants.customerCustomTextFooter = '';
    Localization.roomReservation.datesAndOccupants.dayGuest = {};
    Localization.roomReservation.datesAndOccupants.dayGuest.customerCustomTextHeader = '';
    Localization.roomReservation.datesAndOccupants.dayGuest.customerCustomTextFooter = '';
    Localization.roomReservation.datesAndOccupants.dayGuestInstructions = 'Choose the date for your Day Visit and number of Guests.';
    Localization.roomReservation.datesAndOccupants.departureLabel = 'Departure';
    Localization.roomReservation.datesAndOccupants.err = {};
    Localization.roomReservation.datesAndOccupants.err.noMatchingAvailability = 'Sorry, there were no availabilities on the dates that you searched.';
    Localization.roomReservation.datesAndOccupants.err.noMatchingPackage = 'Sorry, the package you had searched for is not available on the dates that you selected. Here are the packages available on these dates:';
    Localization.roomReservation.datesAndOccupants.err.mismatchedProperty = 'Sorry, the Hotel Venue you selected is not available because you already have an item in your Booking Summary from a different Property. Please complete your reservation or remove the item(s) from the other Property; you will then be able to make a reservation at this Hotel Venue.';
    Localization.roomReservation.datesAndOccupants.err.noVenuesAtProperty = 'Sorry, we are unable to show you any Hotel Venues because there are no Hotel Venues at the propery from which you have items in your Booking Summary. Please complete your reservation or remove the item(s) from the other Property; you will then be able to make a reservation at a Hotel Venue.';
    Localization.roomReservation.datesAndOccupants.err.pmsBookingFailed = 'Unable to book room.';
    Localization.roomReservation.datesAndOccupants.err.pmsRoomsFailed = 'Unable to retrieve Hotel Room list.';
    Localization.roomReservation.datesAndOccupants.err.pmsRoomTypesFailed = 'Unable to retrieve Hotel Room Type list.';
    Localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed = 'Unable to retrieve Hotel Venue list.';
    Localization.roomReservation.datesAndOccupants.infantsOccupantsLabel = 'Infants';
    Localization.roomReservation.datesAndOccupants.instructions = 'Choose the length of your stay and number of guests.';
    Localization.roomReservation.datesAndOccupants.moreLabel = 'More';
    Localization.roomReservation.datesAndOccupants.promoOccupantsLabel = 'Promo Code';
    Localization.roomReservation.datesAndOccupants.title = 'Reserve a Room';
    Localization.roomReservation.datesAndOccupants.youthOccupantsLabel = 'Youth';
    Localization.roomReservation.datesAndOccupants.visitDate = 'Visit Date';
    Localization.roomReservation.getPMSVenues = {};
    Localization.roomReservation.getPMSVenues.instructions = 'Choose a venue to reserve your room';
    Localization.roomReservation.getPMSVenues.title = 'Venue';
    Localization.roomReservation.getPMSVenues.dayBooking = 'Day Visit';
    Localization.roomReservation.getPMSVenues.stayBooking = 'Resort Stay';
    Localization.roomReservation.marketing = {};
    Localization.roomReservation.marketing.bannerMessage = 'Make yourself comfortable';
    Localization.roomReservation.packageSelection = {};
    Localization.roomReservation.packageSelection.customerCustomTextHeader = '';
    Localization.roomReservation.packageSelection.customerCustomTextFooter = '';
    Localization.roomReservation.packageSelection.instructions = 'Select a package.  Click on each package name to see additional details.';
    Localization.roomReservation.packageSelection.title = 'Package';
    Localization.roomReservation.roomTypeSelection = {};
    Localization.roomReservation.roomTypeSelection.customerCustomTextHeader = '';
    Localization.roomReservation.roomTypeSelection.customerCustomTextFooter = '';
    Localization.roomReservation.roomTypeSelection.instructions = 'Select your room type. Price listed is average room rate per night.';
    Localization.roomReservation.roomTypeSelection.roomNumber = 'Room Number';
    Localization.roomReservation.roomTypeSelection.roomRateLabel = 'Average rate per night';
    Localization.roomReservation.roomTypeSelection.roomSelection = {};
    Localization.roomReservation.roomTypeSelection.roomSelection.instructions = 'Room Selection';
    Localization.roomReservation.roomTypeSelection.roomSelection.customerCustomTextHeader = '';
    Localization.roomReservation.roomTypeSelection.roomSelection.customerCustomTextFooter = '';
    Localization.roomReservation.roomTypeSelection.roomTotalLabel = 'before any applicable fees and taxes';
    Localization.roomReservation.roomTypeSelection.roomTypeFromLabel = 'From: ';
    Localization.roomReservation.roomTypeSelection.roomTypeRateLabel = ' / Night (avg)';
    Localization.roomReservation.roomTypeSelection.roomTypeTotalRateLabel = '';
    Localization.roomReservation.roomTypeSelection.title = 'Room Type';
    Localization.roomReservation.specialService = {};
    Localization.roomReservation.specialService.add = 'Add';
    Localization.roomReservation.specialService.addUpgrade = 'Add an Upgrade to your Reservation';
    Localization.roomReservation.specialService.category = 'Category';
    Localization.roomReservation.specialService.invalidDateFormat = 'Invalid Date Format';
    Localization.roomReservation.specialService.name = 'Special Service';
    Localization.roomReservation.specialService.selectUpgradeDate = 'Select Date for Upgrade';
    Localization.roomReservation.specialService.unselectText = 'Please choose a category';
    Localization.ski = {}
    Localization.ski.areYouAMember = "Already a guest or member?";
    Localization.ski.customerCustomTextHeader = '';
    Localization.ski.customerCustomTextFooter = '';
    Localization.ski.location = 'Location';
    Localization.ski.err = {};
    Localization.ski.err.createBookingFailed = 'Sorry, we could not record your Lift Ticket / Pass purchase in our systems at this time.';
    Localization.ski.err.createBookingFailedLimitExceeded = 'The sale of this item exceeds the absolute limit for promotional purchases by this customer.';
    Localization.ski.err.mismatchedProperty = 'Sorry, the Ski Location you selected is not available because you already have an item in your Booking Summary from a different Property. Please complete your reservation or remove the item(s) from the other Property; you will then be able to make a reservation at this Ski Location.';
    Localization.ski.err.noLocationsAtProperty = 'Sorry, we are unable to show you any Ski Locations because there are no Ski Locations at the propery from which you have items in your Booking Summary. Please complete your reservation or remove the item(s) from the other Property; you will then be able to make a reservation at a Ski Location.';
    Localization.ski.err.noLocation = 'Sorry, we were unable to access the list of Ski Locations at this time.';
    Localization.ski.err.dateRequired = 'Please select a Date first.';
    Localization.ski.err.noAvailableItems = 'Sorry, there is no availability on the date you searched.';
    Localization.ski.err.locationClosed = 'Sorry, this location is closed from <%= closeBeginDate %> and will re-open on <%= closeEndDate %>.';
    Localization.ski.err.locationClosedNoDate = 'Sorry, this location is closed on the date you searched.';
    Localization.ski.err.noService = 'Sorry, we were unable to access the list of Ski Lift Tickets / Passes at this time.';
    Localization.ski.instructions = 'Choose a location from which to purchase a Ski Lift Ticket / Pass.';
    Localization.ski.instructionsTickets = 'Pick a date and then choose a Lift Ticket/Ski Pass to purchase from the categories below. ';
    Localization.ski.marketing = {};
    Localization.ski.marketing.bannerMessage = 'Feel the excitement.';
    Localization.ski.mustLoginPurchaseItemActivatesPromo = "You need to create an account or log into your existing account in order to purchase this item. Please click the Log In button above to continue."
    Localization.ski.title = 'Ski Lift Tickets / Passes';
    Localization.ski.locationLabel = 'Category';
    Localization.ski.loginToReceive = 'Log in to receive any promos you may be entitled to, or to buy for your family/group members.'
    Localization.ski.serviceTitle = 'Lift Tickets / Passes';
    Localization.ski.unselectText = 'Please choose a category';
    Localization.ski.at = ' at ';
    Localization.ski.dateLabel = 'Date';
    Localization.ski.durationDaysTitle = "Pass Type Duration: "
    Localization.ski.durationDaysPre = "Up to "
    Localization.ski.durationDaysPost = " days"
    Localization.ski.meLabel = 'Me';
    Localization.ski.minutesLabel = 'minutes';
    Localization.ski.ticketFor = 'Ticket For:';
    Localization.ski.passStartDate = 'Pass Start Date:';
    Localization.ski.passStartDateMismatch = 'Note Adjusted Start Date';
    Localization.ski.passTypeStartDate = "Available From:"
    Localization.ski.passTypeEndDate = "Available Until:"
    Localization.ski.promoActivatingPassStartDate = "Available to Purchase From:"
    Localization.ski.promoActivatingPassEndDate = "Available to Purchase Until:"
    Localization.ski.passEndDate = 'Pass End Date:';
    Localization.ski.promo = 'Promo';
    Localization.ski.promoPasses = 'Promo Passes';
    Localization.ski.purchaseButton = 'Purchase';
    Localization.ski.serviceNameLabel = 'Product';
    Localization.ski.someoneLabel = 'Someone else';
    Localization.ski.staffLabel = 'Preferred Staff';
    Localization.ski.subCategoryLabel = 'Sub-Category: ';
    Localization.ski.successfullBookingMessage = 'Your Booking has been recorded in our systems.';
    Localization.ski.timeLabel = 'Time';

    Localization.spaBooking = {};
    Localization.spaBooking.areYouAMember = 'Booking for someone else?';
    Localization.spaBooking.alsoClasses = "View Classes";
    Localization.spaBooking.alsoServices = "View Spa Services";
    Localization.spaBooking.categorySelection = {};
    Localization.spaBooking.categorySelection.instructions = 'Would you like to book a Spa Service or join one of our Spa Classes?';
    Localization.spaBooking.categorySelection.locationLabel = 'Category';
    Localization.spaBooking.categorySelection.selectService = 'Spa service';
    Localization.spaBooking.categorySelection.title = 'Type of Booking';
    Localization.spaBooking.categorySelection.unselectText = 'Please choose a category';
    Localization.spaBooking.classSelection = {};
    Localization.spaBooking.classSelection.availableSlots = 'Number of available slots';
    Localization.spaBooking.classSelection.classNameLabel = 'Class';
    Localization.spaBooking.classSelection.classTitle = 'Choose your desired Class or Activity';
    Localization.spaBooking.classSelection.classNotAvail = 'There are no classes scheduled on this date. Please choose another date.';
    Localization.spaBooking.classSelection.customerCustomTextHeader = '';
    Localization.spaBooking.classSelection.customerCustomTextFooter = '';
    Localization.spaBooking.classSelection.dateTo = 'to';
    Localization.spaBooking.classSelection.err = {};
    Localization.spaBooking.classSelection.err.classListFailed = 'Sorry, we were unable to access the list of Spa Classes at this time.';
    Localization.spaBooking.classSelection.instructions = 'Please select a date first';
    Localization.spaBooking.classSelection.numClasses = '# of Classes';
    Localization.spaBooking.classSelection.room = 'Room';
    Localization.spaBooking.classSelection.spaItemNotFound = 'The Class you selected is not available on this date.';
    Localization.spaBooking.classSelection.title = 'Class Selection';
    Localization.spaBooking.confirmation = {};
    Localization.spaBooking.confirmation.additionalClasses = 'Additional classes';
    Localization.spaBooking.confirmation.additionalClassesPartOfProgram = 'The following classes will also be booked for you:';
    Localization.spaBooking.confirmation.customerCustomTextHeader = '';
    Localization.spaBooking.confirmation.customerCustomTextFooter = '';
    Localization.spaBooking.confirmation.err = {};
    Localization.spaBooking.confirmation.err.checkConflictingFailed = 'Sorry, we could not confirm parameters for your Booking at this time.';
    Localization.spaBooking.confirmation.err.conflictingBookingsRemoveExisting = 'Existing Booking:';
    Localization.spaBooking.confirmation.err.conflictingBookingsRemoveMessage = 'Please choose another time for this booking, or visit your Booking Summary to remove the existing booking.';
    Localization.spaBooking.confirmation.err.conflictingBookingsRemoveTitle = 'You have already been booked for a spa service at the selected time.';
    Localization.spaBooking.confirmation.err.createBookingFailed = 'Sorry, we could not record your Booking in our systems at this time.';
    Localization.spaBooking.confirmation.err.createTempUserFailed = 'Sorry, we could not start your Booking at this time.';
    Localization.spaBooking.confirmation.makeBookingButtonLabel = 'Book';
    Localization.spaBooking.confirmation.serviceClassesLabel = 'Number of Classes:';
    Localization.spaBooking.confirmation.serviceDateLabel = 'Date:';
    Localization.spaBooking.confirmation.serviceDurationLabel = 'Duration (min):';
    Localization.spaBooking.confirmation.servicePerClassLabel = 'per class';
    Localization.spaBooking.confirmation.servicePriceLabel = 'Price:';
    Localization.spaBooking.confirmation.serviceStartDateLabel = 'Start Date:';
    Localization.spaBooking.confirmation.serviceTotalLabel = 'Total Price:';
    Localization.spaBooking.confirmation.successfullBookingMessage = 'Your Booking has been recorded in our systems.';
    Localization.spaBooking.confirmation.title = 'Confirm Reservation Details';
    Localization.spaBooking.locationSelection = {};
    Localization.spaBooking.locationSelection.customerCustomTextHeader = '';
    Localization.spaBooking.locationSelection.customerCustomTextFooter = '';
    Localization.spaBooking.locationSelection.title = 'Location';
    Localization.spaBooking.locationSelection.err = {};
    Localization.spaBooking.locationSelection.err.mismatchedProperty = 'Sorry, the Spa Location you selected is not available because you already have an item in your Booking Summary from a different Property. Please complete your reservation or remove the item(s) from the other Property; you will then be able to make a reservation at this Spa Location.';
    Localization.spaBooking.locationSelection.err.noLocationsAtProperty = 'Sorry, we are unable to show you any Spa Locations because there are no Spa Locations at the propery from which you have items in your Booking Summary. Please complete your reservation or remove the item(s) from the other Property; you will then be able to make a reservation at a Spa Location.';
    Localization.spaBooking.locationSelection.err.noLocation = 'Sorry, we were unable to access the list of Spa Locations at this time.';
    Localization.spaBooking.locationSelection.instructions = 'Choose a location to book your spa services.';
    Localization.spaBooking.loginToReceive = 'Log in or create an account to make reservations for your family/group members.';
    Localization.spaBooking.marketing = {};
    Localization.spaBooking.marketing.bannerMessage = 'Prepare to be pampered';
    Localization.spaBooking.multipleAppointments = {};
    Localization.spaBooking.multipleAppointments.instructions = 'The requested time is not available.  Please select from the following alternative times.';
    Localization.spaBooking.multipleAppointments.title = 'Select an Appointment';
    Localization.spaBooking.pmsbeforespa = {};
    Localization.spaBooking.pmsbeforespa.acknowledgeIntro = 'Do you already have a Day Visit or Resort Stay reservation? <a href="#" onclick="return false" data-target="#overrideCollapse" data-toggle="collapse">Click Here</a></p><div id="overrideCollapse" class="collapse">If you are sure you already have a Day Visit or Resort Stay reservation, but it is simply not appearing in this system you may use the button below to add Spa Treatments or Activities to your itinerary. Use this feature if you are sharing someone else\'s room and the room reservation is under that person\'s name.<p>';
    Localization.spaBooking.pmsbeforespa.acknowledgeIntroFooter = '</p></div>';
    Localization.spaBooking.pmsbeforespa.acknowledgeText = 'I have a a Resort reservation. I am aware that this booking is subject to cancellation if I do not have a qualifying Resort reservation.    ';
    Localization.spaBooking.pmsbeforespa.acknowledgeTitle = 'Qualifying Reservation';
    Localization.spaBooking.pmsbeforespa.acknowledgeButton = 'Acknowledge';
    Localization.spaBooking.pmsbeforespa.dateSelectorAcknowledgePromptText = 'If you <i>already</i> have a Day Visit or Resort Stay reservation outside of these dates, please <a href="#/summary/setOverride">click here to pick any date</a>. Otherwise, just add <a href="#/roomsBooking">a reservation first</a>.';
    Localization.spaBooking.pmsbeforespa.dateSelectorAcknowledgePromptTitle = 'Want to book another date?';
    Localization.spaBooking.pmsbeforespa.noticeOverridden = 'You have indicated that you already have a Day Visit or Resort Stay reservation even though it is not currently found by our system. You will be able to complete your reservation at this time, however you must be aware that this booking is subject to cancellation if a qualifying Resort reservation is not found.';
    Localization.spaBooking.pmsbeforespa.notice = 'Please note that a Room reservation is required to book a spa service. You will be unable to complete your spa service reservation until you have also added a room reservation at the same property to your Booking Summary.';
    Localization.spaBooking.pmsbeforespa.errorMotice = 'A Room reservation is required to book a Spa Service. Please add a Room reservation at the same property and date as your spa booking to continue.';
    Localization.spaBooking.pmsbeforespa.needReservation = 'Need reservation at';
    Localization.spaBooking.pmsbeforespa.on = 'on';
    Localization.spaBooking.serviceSelection = {};
    Localization.spaBooking.serviceSelection.at = ' at ';
    Localization.spaBooking.serviceSelection.availabilityRow = '<div class="spaAvailability clearfix"><button class="bookButton btn btn-primary pull-right">Book <span class="time"></span></button>With <span class="staff"></span> <small>(<span class="price"></span>)</small></div>';
    Localization.spaBooking.serviceSelection.checkAvailability = 'Check Availability';
    Localization.spaBooking.serviceSelection.checkNextDay = 'Check Next Day';
    Localization.spaBooking.serviceSelection.customerCustomTextHeader = '';
    Localization.spaBooking.serviceSelection.customerCustomTextFooter = '';
    Localization.spaBooking.serviceSelection.dateLabel = 'Date';
    Localization.spaBooking.serviceSelection.moreOptions = 'More Options';
    Localization.spaBooking.serviceSelection.err = {};
    Localization.spaBooking.serviceSelection.err.dateRequired = 'Please select a Date first.';
    Localization.spaBooking.serviceSelection.err.genderRequired = 'Select a gender.';
    Localization.spaBooking.serviceSelection.err.noAvailableAppointments = 'Sorry, there is no availability on the date you searched:';
    Localization.spaBooking.serviceSelection.err.noService = 'Sorry, we were unable to access the list of Spa Services at this time.';
    Localization.spaBooking.serviceSelection.foundOnDate = 'We did not find any availabilities <span class="staffOrGender"/> on <span class="fromdate"/>, however the folowing is available on <span class="date"/>:';
    Localization.spaBooking.serviceSelection.genderLabel = 'Preferred Staff Gender';
    Localization.spaBooking.serviceSelection.instructions = 'Please pick a date and time for your service and then select Book on your desired service below:';
    Localization.spaBooking.serviceSelection.meLabel = 'Me';
    Localization.spaBooking.serviceSelection.minutesLabel = 'minutes';
    Localization.spaBooking.serviceSelection.noFurtherAvailabilities = 'No further availabilities <span class="staffOrGender"/> found on <span class="date"/>';
    Localization.spaBooking.serviceSelection.notAvailable = 'Sorry, we did not find any availabilities <span class="staffOrGender"/> on <span class="date"/> after <span class="time"/>';
    Localization.spaBooking.serviceSelection.notAvailableDates = 'Sorry, we did not find any availabilities <span class="staffOrGender"/> between <span class="fromdate"/> and <span class="date"/>';
    Localization.spaBooking.serviceSelection.notAvailableGenderMale = 'with a male therapist';
    Localization.spaBooking.serviceSelection.notAvailableGenderFemale = 'with a female therapist';
    Localization.spaBooking.serviceSelection.notAvailableStaff = 'with <span class="staffName"></span>';
    Localization.spaBooking.serviceSelection.otherName = 'Service Recipient';
    Localization.spaBooking.serviceSelection.otherNameLabel = 'Service Recipient\'s Name:';
    Localization.spaBooking.serviceSelection.sameGender = 'This service requires the service provider and recipient\'s genders to be the same.';
    Localization.spaBooking.serviceSelection.sameGenderLabel = 'Service Recipient\'s Gender';
    Localization.spaBooking.serviceSelection.serviceNameLabel = 'Service';
    Localization.spaBooking.serviceSelection.serviceTitle = 'Choose your desired Spa Service';
    Localization.spaBooking.serviceSelection.showMoreTimes = 'Show More Times';
    Localization.spaBooking.serviceSelection.someoneLabel = 'Someone else';
    Localization.spaBooking.serviceSelection.staffLabel = 'Preferred Staff';
    Localization.spaBooking.serviceSelection.timeLabel = 'Time';
    Localization.countryList = [
        {code: "AF", name: "Afghanistan"},
        {code: "AX", name: "Åland Islands"},
        {code: "AL", name: "Albania"},
        {code: "DZ", name: "Algeria"},
        {code: "AS", name: "American Samoa"},
        {code: "AD", name: "Andorra"},
        {code: "AO", name: "Angola"},
        {code: "AI", name: "Anguilla"},
        {code: "AQ", name: "Antarctica"},
        {code: "AG", name: "Antigua and Barbuda"},
        {code: "AR", name: "Argentina"},
        {code: "AM", name: "Armenia"},
        {code: "AW", name: "Aruba"},
        {code: "AU", name: "Australia"},
        {code: "AT", name: "Austria"},
        {code: "AZ", name: "Azerbaijan"},
        {code: "BS", name: "Bahamas"},
        {code: "BH", name: "Bahrain"},
        {code: "BD", name: "Bangladesh"},
        {code: "BB", name: "Barbados"},
        {code: "BY", name: "Belarus"},
        {code: "BE", name: "Belgium"},
        {code: "BZ", name: "Belize"},
        {code: "BJ", name: "Benin"},
        {code: "BM", name: "Bermuda"},
        {code: "BT", name: "Bhutan"},
        {code: "BO", name: "Bolivia, Plurinational State of"},
        {code: "BQ", name: "Bonaire, Sint Eustatius and Saba"},
        {code: "BA", name: "Bosnia and Herzegovina"},
        {code: "BW", name: "Botswana"},
        {code: "BV", name: "Bouvet Island"},
        {code: "BR", name: "Brazil"},
        {code: "IO", name: "British Indian Ocean Territory"},
        {code: "BN", name: "Brunei Darussalam"},
        {code: "BG", name: "Bulgaria"},
        {code: "BF", name: "Burkina Faso"},
        {code: "BI", name: "Burundi"},
        {code: "KH", name: "Cambodia"},
        {code: "CM", name: "Cameroon"},
        {code: "CA", name: "Canada"},
        {code: "CV", name: "Cape Verde"},
        {code: "KY", name: "Cayman Islands"},
        {code: "CF", name: "Central African Republic"},
        {code: "TD", name: "Chad"},
        {code: "CL", name: "Chile"},
        {code: "CN", name: "China"},
        {code: "CX", name: "Christmas Island"},
        {code: "CC", name: "Cocos (Keeling) Islands"},
        {code: "CO", name: "Colombia"},
        {code: "KM", name: "Comoros"},
        {code: "CG", name: "Congo"},
        {code: "CD", name: "Congo, the Democratic Republic of the"},
        {code: "CK", name: "Cook Islands"},
        {code: "CR", name: "Costa Rica"},
        {code: "CI", name: "Côte d'Ivoire"},
        {code: "HR", name: "Croatia"},
        {code: "CU", name: "Cuba"},
        {code: "CW", name: "Curaçao"},
        {code: "CY", name: "Cyprus"},
        {code: "CZ", name: "Czech Republic"},
        {code: "DK", name: "Denmark"},
        {code: "DJ", name: "Djibouti"},
        {code: "DM", name: "Dominica"},
        {code: "DO", name: "Dominican Republic"},
        {code: "EC", name: "Ecuador"},
        {code: "EG", name: "Egypt"},
        {code: "SV", name: "El Salvador"},
        {code: "GQ", name: "Equatorial Guinea"},
        {code: "ER", name: "Eritrea"},
        {code: "EE", name: "Estonia"},
        {code: "ET", name: "Ethiopia"},
        {code: "FK", name: "Falkland Islands (Malvinas)"},
        {code: "FO", name: "Faroe Islands"},
        {code: "FJ", name: "Fiji"},
        {code: "FI", name: "Finland"},
        {code: "FR", name: "France"},
        {code: "GF", name: "French Guiana"},
        {code: "PF", name: "French Polynesia"},
        {code: "TF", name: "French Southern Territories"},
        {code: "GA", name: "Gabon"},
        {code: "GM", name: "Gambia"},
        {code: "GE", name: "Georgia"},
        {code: "DE", name: "Germany"},
        {code: "GH", name: "Ghana"},
        {code: "GI", name: "Gibraltar"},
        {code: "GR", name: "Greece"},
        {code: "GL", name: "Greenland"},
        {code: "GD", name: "Grenada"},
        {code: "GP", name: "Guadeloupe"},
        {code: "GU", name: "Guam"},
        {code: "GT", name: "Guatemala"},
        {code: "GG", name: "Guernsey"},
        {code: "GN", name: "Guinea"},
        {code: "GW", name: "Guinea-Bissau"},
        {code: "GY", name: "Guyana"},
        {code: "HT", name: "Haiti"},
        {code: "HM", name: "Heard Island and McDonald Islands"},
        {code: "VA", name: "Holy See (Vatican City State)"},
        {code: "HN", name: "Honduras"},
        {code: "HK", name: "Hong Kong"},
        {code: "HU", name: "Hungary"},
        {code: "IS", name: "Iceland"},
        {code: "IN", name: "India"},
        {code: "ID", name: "Indonesia"},
        {code: "IR", name: "Iran, Islamic Republic of"},
        {code: "IQ", name: "Iraq"},
        {code: "IE", name: "Ireland"},
        {code: "IM", name: "Isle of Man"},
        {code: "IL", name: "Israel"},
        {code: "IT", name: "Italy"},
        {code: "JM", name: "Jamaica"},
        {code: "JP", name: "Japan"},
        {code: "JE", name: "Jersey"},
        {code: "JO", name: "Jordan"},
        {code: "KZ", name: "Kazakhstan"},
        {code: "KE", name: "Kenya"},
        {code: "KI", name: "Kiribati"},
        {code: "KP", name: "Korea, Democratic People's Republic of"},
        {code: "KR", name: "Korea, Republic of"},
        {code: "KW", name: "Kuwait"},
        {code: "KG", name: "Kyrgyzstan"},
        {code: "LA", name: "Lao People's Democratic Republic"},
        {code: "LV", name: "Latvia"},
        {code: "LB", name: "Lebanon"},
        {code: "LS", name: "Lesotho"},
        {code: "LR", name: "Liberia"},
        {code: "LY", name: "Libya"},
        {code: "LI", name: "Liechtenstein"},
        {code: "LT", name: "Lithuania"},
        {code: "LU", name: "Luxembourg"},
        {code: "MO", name: "Macao"},
        {code: "MK", name: "Macedonia, the former Yugoslav Republic of"},
        {code: "MG", name: "Madagascar"},
        {code: "MW", name: "Malawi"},
        {code: "MY", name: "Malaysia"},
        {code: "MV", name: "Maldives"},
        {code: "ML", name: "Mali"},
        {code: "MT", name: "Malta"},
        {code: "MH", name: "Marshall Islands"},
        {code: "MQ", name: "Martinique"},
        {code: "MR", name: "Mauritania"},
        {code: "MU", name: "Mauritius"},
        {code: "YT", name: "Mayotte"},
        {code: "MX", name: "Mexico"},
        {code: "FM", name: "Micronesia, Federated States of"},
        {code: "MD", name: "Moldova, Republic of"},
        {code: "MC", name: "Monaco"},
        {code: "MN", name: "Mongolia"},
        {code: "ME", name: "Montenegro"},
        {code: "MS", name: "Montserrat"},
        {code: "MA", name: "Morocco"},
        {code: "MZ", name: "Mozambique"},
        {code: "MM", name: "Myanmar"},
        {code: "NA", name: "Namibia"},
        {code: "NR", name: "Nauru"},
        {code: "NP", name: "Nepal"},
        {code: "NL", name: "Netherlands"},
        {code: "NC", name: "New Caledonia"},
        {code: "NZ", name: "New Zealand"},
        {code: "NI", name: "Nicaragua"},
        {code: "NE", name: "Niger"},
        {code: "NG", name: "Nigeria"},
        {code: "NU", name: "Niue"},
        {code: "NF", name: "Norfolk Island"},
        {code: "MP", name: "Northern Mariana Islands"},
        {code: "NO", name: "Norway"},
        {code: "OM", name: "Oman"},
        {code: "PK", name: "Pakistan"},
        {code: "PW", name: "Palau"},
        {code: "PS", name: "Palestinian Territory, Occupied"},
        {code: "PA", name: "Panama"},
        {code: "PG", name: "Papua New Guinea"},
        {code: "PY", name: "Paraguay"},
        {code: "PE", name: "Peru"},
        {code: "PH", name: "Philippines"},
        {code: "PN", name: "Pitcairn"},
        {code: "PL", name: "Poland"},
        {code: "PT", name: "Portugal"},
        {code: "PR", name: "Puerto Rico"},
        {code: "QA", name: "Qatar"},
        {code: "RE", name: "Réunion"},
        {code: "RO", name: "Romania"},
        {code: "RU", name: "Russian Federation"},
        {code: "RW", name: "Rwanda"},
        {code: "BL", name: "Saint Barthélemy"},
        {code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha"},
        {code: "KN", name: "Saint Kitts and Nevis"},
        {code: "LC", name: "Saint Lucia"},
        {code: "MF", name: "Saint Martin (France)"},
        {code: "PM", name: "Saint Pierre and Miquelon"},
        {code: "VC", name: "Saint Vincent and the Grenadines"},
        {code: "WS", name: "Samoa"},
        {code: "SM", name: "San Marino"},
        {code: "ST", name: "Sao Tome and Principe"},
        {code: "SA", name: "Saudi Arabia"},
        {code: "SN", name: "Senegal"},
        {code: "RS", name: "Serbia"},
        {code: "SC", name: "Seychelles"},
        {code: "SL", name: "Sierra Leone"},
        {code: "SG", name: "Singapore"},
        {code: "SX", name: "Sint Maarten (Nederlands)"},
        {code: "SK", name: "Slovakia"},
        {code: "SI", name: "Slovenia"},
        {code: "SB", name: "Solomon Islands"},
        {code: "SO", name: "Somalia"},
        {code: "ZA", name: "South Africa"},
        {code: "GS", name: "South Georgia and the South Sandwich Islands"},
        {code: "SS", name: "South Sudan"},
        {code: "ES", name: "Spain"},
        {code: "LK", name: "Sri Lanka"},
        {code: "SD", name: "Sudan"},
        {code: "SR", name: "Suriname"},
        {code: "SJ", name: "Svalbard and Jan Mayen"},
        {code: "SZ", name: "Swaziland"},
        {code: "SE", name: "Sweden"},
        {code: "CH", name: "Switzerland"},
        {code: "SY", name: "Syrian Arab Republic"},
        {code: "TW", name: "Taiwan, Province of China"},
        {code: "TJ", name: "Tajikistan"},
        {code: "TZ", name: "Tanzania, United Republic of"},
        {code: "TH", name: "Thailand"},
        {code: "TL", name: "Timor-Leste"},
        {code: "TG", name: "Togo"},
        {code: "TK", name: "Tokelau"},
        {code: "TO", name: "Tonga"},
        {code: "TT", name: "Trinidad and Tobago"},
        {code: "TN", name: "Tunisia"},
        {code: "TR", name: "Turkey"},
        {code: "TM", name: "Turkmenistan"},
        {code: "TC", name: "Turks and Caicos Islands"},
        {code: "TV", name: "Tuvalu"},
        {code: "UG", name: "Uganda"},
        {code: "UA", name: "Ukraine"},
        {code: "AE", name: "United Arab Emirates"},
        {code: "GB", name: "United Kingdom"},
        {code: "US", name: "United States"},
        {code: "UM", name: "United States Minor Outlying Islands"},
        {code: "UY", name: "Uruguay"},
        {code: "UZ", name: "Uzbekistan"},
        {code: "VU", name: "Vanuatu"},
        {code: "VE", name: "Venezuela, Bolivarian Republic of"},
        {code: "VN", name: "Viet Nam"},
        {code: "VG", name: "Virgin Islands, British"},
        {code: "VI", name: "Virgin Islands, U.S."},
        {code: "WF", name: "Wallis and Futuna"},
        {code: "EH", name: "Western Sahara"},
        {code: "YE", name: "Yemen"},
        {code: "ZM", name: "Zambia"},
        {code: "ZW", name: "Zimbabwe"}
    ]
    Localization.stateList = [
        {country: "US", code: "AL", name: "Alabama"},
        {country: "US", code: "AK", name: "Alaska"},
        {country: "US", code: "AZ", name: "Arizona"},
        {country: "US", code: "AR", name: "Arkansas"},
        {country: "US", code: "AS", name: "American Samoa"},
        {country: "US", code: "CA", name: "California"},
        {country: "US", code: "CO", name: "Colorado"},
        {country: "US", code: "CT", name: "Connecticut"},
        {country: "US", code: "DE", name: "Delaware"},
        {country: "US", code: "DC", name: "District of Columbia"},
        {country: "US", code: "FM", name: "Fed. States of Micronesia"},
        {country: "US", code: "FL", name: "Florida"},
        {country: "US", code: "GA", name: "Georgia"},
        {country: "US", code: "GU", name: "Guam"},
        {country: "US", code: "HI", name: "Hawaii"},
        {country: "US", code: "ID", name: "Idaho"},
        {country: "US", code: "IL", name: "Illinois"},
        {country: "US", code: "IN", name: "Indiana"},
        {country: "US", code: "IA", name: "Iowa"},
        {country: "US", code: "KS", name: "Kansas"},
        {country: "US", code: "KY", name: "Kentucky"},
        {country: "US", code: "LA", name: "Louisiana"},
        {country: "US", code: "ME", name: "Maine"},
        {country: "US", code: "MD", name: "Maryland"},
        {country: "US", code: "MH", name: "Marshall Islands"},
        {country: "US", code: "MA", name: "Massachusetts"},
        {country: "US", code: "MI", name: "Michigan"},
        {country: "US", code: "MN", name: "Minnesota"},
        {country: "US", code: "MS", name: "Mississippi"},
        {country: "US", code: "MO", name: "Missouri"},
        {country: "US", code: "MT", name: "Montana"},
        {country: "US", code: "NE", name: "Nebraska"},
        {country: "US", code: "NV", name: "Nevada"},
        {country: "US", code: "NH", name: "New Hampshire"},
        {country: "US", code: "NJ", name: "New Jersey"},
        {country: "US", code: "NM", name: "New Mexico"},
        {country: "US", code: "NY", name: "New York"},
        {country: "US", code: "NC", name: "North Carolina"},
        {country: "US", code: "ND", name: "North Dakota"},
        {country: "US", code: "MP", name: "Northern Marianas"},
        {country: "US", code: "OH", name: "Ohio"},
        {country: "US", code: "OK", name: "Oklahoma"},
        {country: "US", code: "OR", name: "Oregon"},
        {country: "US", code: "PA", name: "Pennsylvania"},
        {country: "US", code: "PR", name: "Puerto Rico"},
        {country: "US", code: "RI", name: "Rhode Island"},
        {country: "US", code: "SC", name: "South Carolina"},
        {country: "US", code: "SD", name: "South Dakota"},
        {country: "US", code: "TN", name: "Tennessee"},
        {country: "US", code: "TX", name: "Texas"},
        {country: "US", code: "UT", name: "Utah"},
        {country: "US", code: "VT", name: "Vermont"},
        {country: "US", code: "VA", name: "Virginia"},
        {country: "US", code: "VI", name: "(U.S.) Virgin Islands"},
        {country: "US", code: "WA", name: "Washington"},
        {country: "US", code: "WV", name: "West Virginia"},
        {country: "US", code: "WI", name: "Wisconsin"},
        {country: "US", code: "WY", name: "Wyoming"},
        {country: "US", code: "AA", name: "Armed Forces, the Americas"},
        {country: "US", code: "AE", name: "Armed Forces, Europe"},
        {country: "US", code: "AP", name: "Armed Forces, Pacific"},
        {country: "", code: "", name: "--------------"},
        {country: "CA", code: "AB", name: "Alberta"},
        {country: "CA", code: "BC", name: "British Columbia"},
        {country: "CA", code: "MB", name: "Manitoba"},
        {country: "CA", code: "NB", name: "New Brunswick"},
        {country: "CA", code: "NL", name: "Newfoundland and Labrador"},
        {country: "CA", code: "NT", name: "Northwest Territories"},
        {country: "CA", code: "NS", name: "Nova Scotia"},
        {country: "CA", code: "NU", name: "Nunavut"},
        {country: "CA", code: "ON", name: "Ontario"},
        {country: "CA", code: "PE", name: "Prince Edward Island"},
        {country: "CA", code: "QC", name: "Quebec"},
        {country: "CA", code: "SK", name: "Saskatchewan"},
        {country: "CA", code: "YT", name: "Yukon"}
    ];

    Localization.general.termsLink = 'legal.html';
    Localization.general.paymentCompleteMainSiteButton = ''; // put 'Return to Main Site'. Button won't appear if blank.
    Localization.general.paymentCompleteMainSiteLink = ''; // put 'http://www.example.com'. Button won't appear if blank.
    Localization.general.paymentCompleteStartOverButton = ''; // put 'Book More Stuff'. Otherwise uses Localization.general.err.startOver.

    /**
     * Version: 1.0 Alpha-1
     * Build Date: 13-Nov-2007
     * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
     * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
     * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
     */
    Localization.CultureInfo = {
        /* Culture Name */
        name: "en-US",
        englishName: "English (United States)",
        nativeName: "English (United States)",
        /* Day Name Strings */
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
        /* Month Name Strings */
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        /* AM/PM Designators */
        amDesignator: "AM",
        pmDesignator: "PM",
        firstDayOfWeek: 0,
        twoDigitYearMax: 2029,
        /**
         * The dateElementOrder is based on the order of the
         * format specifiers in the formatPatterns.DatePattern.
         *
         * Example:
         <pre>
         shortDatePattern    dateElementOrder
         ------------------  ----------------
         "M/d/yyyy"          "mdy"
         "dd/MM/yyyy"        "dmy"
         "yyyy-MM-dd"        "ymd"
         </pre>
         * The correct dateElementOrder is required by the parser to
         * determine the expected order of the date elements in the
         * string being parsed.
         *
         * NOTE: It is VERY important this value be correct for each Culture.
         */
        dateElementOrder: "mdy",
        /* Standard date and time format patterns */
        formatPatterns: {
            shortDate: "M/d/yyyy",
            longDate: "dddd, MMMM dd, yyyy",
            mediumDate: "MMM d, yyyy",
            shortTime: "h:mm tt",
            longTime: "h:mm:ss tt",
            fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
            sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
            universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
            rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
            monthDay: "MMMM dd",
            yearMonth: "MMMM, yyyy"
        },
        /**
         * NOTE: If a string format is not parsing correctly, but
         * you would expect it parse, the problem likely lies below.
         *
         * The following regex patterns control most of the string matching
         * within the parser.
         *
         * The Month name and Day name patterns were automatically generated
         * and in general should be (mostly) correct.
         *
         * Beyond the month and day name patterns are natural language strings.
         * Example: "next", "today", "months"
         *
         * These natural language string may NOT be correct for this culture.
         * If they are not correct, please translate and edit this file
         * providing the correct regular expression pattern.
         *
         * If you modify this file, please post your revised CultureInfo file
         * to the Datejs Discussions located at
         *     http://groups.google.com/group/date-js
         *
         * Please mark the subject with [CultureInfo]. Example:
         *    Subject: [CultureInfo] Translated "da-DK" Danish(Denmark)
         *
         * We will add the modified patterns to the master source files.
         *
         * As well, please review the list of "Future Strings" section below.
         */
        regexPatterns: {
            jan: /^jan(uary)?/i,
            feb: /^feb(ruary)?/i,
            mar: /^mar(ch)?/i,
            apr: /^apr(il)?/i,
            may: /^may/i,
            jun: /^jun(e)?/i,
            jul: /^jul(y)?/i,
            aug: /^aug(ust)?/i,
            sep: /^sep(t(ember)?)?/i,
            oct: /^oct(ober)?/i,
            nov: /^nov(ember)?/i,
            dec: /^dec(ember)?/i,
            sun: /^su(n(day)?)?/i,
            mon: /^mo(n(day)?)?/i,
            tue: /^tu(e(s(day)?)?)?/i,
            wed: /^we(d(nesday)?)?/i,
            thu: /^th(u(r(s(day)?)?)?)?/i,
            fri: /^fr(i(day)?)?/i,
            sat: /^sa(t(urday)?)?/i,
            future: /^next/i,
            past: /^last|past|prev(ious)?/i,
            add: /^(\+|after|from)/i,
            subtract: /^(\-|before|ago)/i,
            yesterday: /^yesterday/i,
            today: /^t(oday)?/i,
            tomorrow: /^tomorrow/i,
            now: /^n(ow)?/i,
            millisecond: /^ms|milli(second)?s?/i,
            second: /^sec(ond)?s?/i,
            minute: /^min(ute)?s?/i,
            hour: /^h(ou)?rs?/i,
            week: /^w(ee)?k/i,
            month: /^m(o(nth)?s?)?/i,
            day: /^d(ays?)?/i,
            year: /^y((ea)?rs?)?/i,
            shortMeridian: /^(a|p)/i,
            longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
            timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,
            ordinalSuffix: /^\s*(st|nd|rd|th)/i,
            timeContext: /^\s*(\:|a|p)/i
        },
        abbreviatedTimeZoneStandard: {GMT: "-000", EST: "-0400", CST: "-0500", MST: "-0600", PST: "-0700"},
        abbreviatedTimeZoneDST: {GMT: "-000", EDT: "-0500", CDT: "-0600", MDT: "-0700", PDT: "-0800"}

    };

    /********************
     ** Future Strings **
     ********************
     *
     * The following list of strings are not currently being used, but
     * may be incorporated later. We would appreciate any help translating
     * the strings below.
     *
     * If you modify this file, please post your revised CultureInfo file
     * to the Datejs Discussions located at
     *     http://groups.google.com/group/date-js
     *
     * Please mark the subject with [CultureInfo]. Example:
     *    Subject: [CultureInfo] Translated "da-DK" Danish(Denmark)
     *
     * English Name        Translated
     * ------------------  -----------------
     * date                date
     * time                time
     * calendar            calendar
     * show                show
     * hourly              hourly
     * daily               daily
     * weekly              weekly
     * bi-weekly           bi-weekly
     * monthly             monthly
     * bi-monthly          bi-monthly
     * quarter             quarter
     * quarterly           quarterly
     * yearly              yearly
     * annual              annual
     * annually            annually
     * annum               annum
     * again               again
     * between             between
     * after               after
     * from now            from now
     * repeat              repeat
     * times               times
     * per                 per
     */

// END: Text related to the booking summary proocess
    return Localization;
})
