define(['jquery','jquery_validate'], function ($) {
// Resource file for all display text in the application (English)
Localization = {};
Localization.siteName = "ResortSuite 水疗中心";
Localization.bookingSummary = {};
Localization.bookingSummary.add  = '加';
Localization.bookingSummary.addMore = '增加更多的服务';
Localization.bookingSummary.addMoreSlogan = '当您预订更令人难忘';
Localization.bookingSummary.cartName = '预订总结';
Localization.bookingSummary.cartNoItems = '在这个时候，您的购物车中没有任何项目。要添加项目的选择上面我们的服务之一。';
Localization.bookingSummary.cartTitle = '请花点时间仔细审查的内容，您的预订。';
Localization.bookingSummary.checkoutButton = '确认';
Localization.bookingSummary.checkoutInfo = '点击这里确认您的上述保留的细节和完成预订：';
Localization.bookingSummary.checkoutInstruction = '完成您的预订';
Localization.bookingSummary.checkoutTitle = '确认预订';
Localization.bookingSummary.clearCart = '清除的预订总结。';
Localization.bookingSummary.clearCartFail = '无法删除此项目从您的预订摘要。';
Localization.bookingSummary.clearCartInstructions = '想重新开始吗？';
Localization.bookingSummary.creditCard = '立即付款';
Localization.bookingSummary.creditCardGuarantee = '确认现在';
Localization.bookingSummary.depositPerPlayer = '存款每球员';
Localization.bookingSummary.grid = {};
Localization.bookingSummary.grid.addUpgrade = '升级您的预订';
Localization.bookingSummary.grid.amountLabel = '存款金额';
Localization.bookingSummary.grid.totalAmountLabel = '总金额';
Localization.bookingSummary.grid.depositAmountLabel = '今天到期存款';
Localization.bookingSummary.guaranteeTitle  = '低保金的方法';
Localization.bookingSummary.issuedBy = '发稿';
Localization.bookingSummary.marketing = {};
Localization.bookingSummary.marketing.bannerMessage = '我们很高兴能满足您的需求';
Localization.bookingSummary.orderTotal = '订单总额';
Localization.bookingSummary.paymentGuarantee = '一个有效的信用卡，以保证您的预订。在这个时候，您的信用卡将不会被收取。';
Localization.bookingSummary.paymentInstruction = '通过点击下面的按钮来完成您的预订';
Localization.bookingSummary.paymentTitle = '付款方法';
Localization.bookingSummary.payPal = '<img src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif">';
Localization.bookingSummary.perNight  = '每晚';
Localization.bookingSummary.player = '播放机';
Localization.bookingSummary.players = '玩家';
Localization.bookingSummary.removeSelected = '消除';
Localization.bookingSummary.removeUpgrade  = '删除升级';
Localization.bookingSummary.roomReservationAt = '客房预订在';
Localization.bookingSummary.selectUpgrade  = '选择升级...';
Localization.bookingSummary.selectedUpgrades  = '选定升级：';
Localization.bookingSummary.spaServiceFrom = '水疗服务';
Localization.bookingSummary.teetimeAt = '开球时间在';
Localization.bookingSummary.time  = '时:';
Localization.bookingSummary.totalDeposit = '支付存款总额的';
Localization.bookingSummary.tryAgain='请再试一次。';
Localization.bookingSummary.upgradeConfirmation='您的升级已经被添加到您的预订。';
Localization.bookingSummary.upgradeError='无法升级您的预订。';
Localization.bookingSummary.using = '：';
Localization.general = {};
Localization.general.applicationTitle = 'ResortSuite网络';
Localization.general.contactingServer = '联系服务器...';
Localization.general.continueProcessButtonLabel = '下一步';
Localization.general.copyright = '版权所有2012';
Localization.general.currencyPrefix = '$';
Localization.general.currencyPostfix = '';
Localization.general.err = {};
Localization.general.err.checkedoutContinue = '您可以通过点击下面的按钮，下一步进行额外的预订。';
Localization.general.err.checkedoutText = '您的预订总结中的项目已成功地记录在我们的系统中。';
Localization.general.err.checkedoutTitle = '您的预订已顺利完成';
Localization.general.err.defaultErr = '错误处理您的请求。请再试一次。';
Localization.general.err.emailErrExist = '这个电子邮件地址已经在系统中注册。点击此按钮，重置您的密码。';
Localization.general.err.emailErrNotExist = '此邮件地址不存在于系统中。创建一个新的帐户，单击“新用户';
Localization.general.err.jquery_validate = {
    required: '此字段是必需的。',
    remote: '请解决这个字段。',
    email: '请输入一个有效的电子邮件地址。',
    url: '请输入一个有效的URL。',
    date: '请输入有效的日期。',
    dateISO: '请输入有效的日期（ISO）。',
    number: '请输入一个有效的数字。',
    digits: '请只输入数字。',
    creditcard: '请输入一个有效的信用卡号码。',
    equalTo: '请再次输入相同的值。',
    accept: '请输入一个有效的扩展。',
    maxlength: $.validator.format('请输入不超过{0}个字符。'),
    minlength: $.validator.format('请输入至少{0}个字符。'),
    rangelength: $.validator.format('请输入一个值介于{0}和{1}个字符长。'),
    range: $.validator.format('请输入一个值介于{0}和{1}。'),
    max: $.validator.format('请输入一个值小于或等于{0}。'),
    min: $.validator.format('请输入一个值大于或等于{0}。')
};
Localization.general.err.restartSession = '无法重新启动服务器会话...';
Localization.general.err.serverOffline = '服务器是离线...';
Localization.general.err.startOver = '重新开始';
Localization.general.err.startSession = '无法启动新服务器会话...';
Localization.general.err.timeoutContinue = '您可以通过点击下面的按钮启动一个新的会话。';
Localization.general.err.timeoutText = '您的会话已结束，由于处于非活动状态。';
Localization.general.err.timeoutTitle = '您的会话已超时';
Localization.general.features = {};
Localization.general.features.clubName = '查看會員報表';
Localization.general.features.giftCertificatesName = '购买礼券';
Localization.general.features.golfName = '预订高尔夫';
Localization.general.features.intro = '很高兴为您提供在线服务';
Localization.general.features.pmsName = '预订房间';
Localization.general.features.spaName = '预订水疗，课程或活动';
Localization.general.features.title = '请选择';
Localization.general.gender = {};
Localization.general.gender.female = '女';
Localization.general.gender.male = '男';
Localization.general.gender.noPreference = '没有县。';
Localization.general.language = {};
Localization.general.language = '语';
Localization.general.location = {};
Localization.general.location.phone = '呼叫';
Localization.general.location.website = '网站';
Localization.general.login = {};
Localization.general.login.alreadyLoggedIn = '您当前登录。';
Localization.general.login.changePassword = {};
Localization.general.login.changePassword.commitButton = '改变';
Localization.general.login.changePassword.err = {};
Localization.general.login.changePassword.err.min8chars = '密码必须至少为8个字符长';
Localization.general.login.changePassword.err.passwordsDoNotMatch = '新密码必须匹配';
Localization.general.login.changePassword.err.resetFailed = '无法更改密码。电子邮件地址/密码组合不正确';
Localization.general.login.changePassword.title = '更改密码';
Localization.general.login.changePassword.updateSuccess = '您的密码已更新。';
Localization.general.login.changePasswordButtonLabel = '更改密码';
Localization.general.login.description = '请在下面登录。如果您是新客户，请单击“新建用户创建一个配置文件，';
Localization.general.login.emailTitle = '电邮地址';
Localization.general.login.err = {};
Localization.general.login.err.invalidCredentials = '很抱歉，我们无法让您登录中所提供的电子邮件地址和密码。';
Localization.general.login.forgotPasswordButtonLabel = '忘记密码';
Localization.general.login.loginButtonLabel = '登录';
Localization.general.login.logoutButtonLabel = '注销';
Localization.general.login.logoutWarning = '如果你登录，然后在您的预订摘要的所有的项目都将被丢弃。你真的要退出吗？';
Localization.general.login.newUserButtonLabel = '新用户';
Localization.general.login.passwordReset = {};
Localization.general.login.passwordReset.cancelButtonLabel = '取消';
Localization.general.login.passwordReset.description = '输入您的电子邮件地址。';
Localization.general.login.passwordReset.emailLabel = '电邮地址';
Localization.general.login.passwordReset.newPassword1Label = '新密码';
Localization.general.login.passwordReset.newPassword2Label = '确认密码';
Localization.general.login.passwordReset.newPasswordEmailConfirmation = '已通过电子邮件发送给您的新密码提供的地址。';
Localization.general.login.passwordReset.oldPasswordLabel = '目前的密码';
Localization.general.login.passwordReset.resetButtonLabel = '复位';
Localization.general.login.passwordReset.title = '“重设密码”';
Localization.general.login.passwordTitle = '密码';
Localization.general.login.title = '登录以下一步';
Localization.general.maintenance = {};
Localization.general.maintenance.folioTimeOutWarning = '您的会话将被自动关闭，如果你不采取任何行动';
Localization.general.maintenance.maintenanceMessage = '该系统将被关闭进行维修约';
Localization.general.maintenance.maintenanceMessageTimeUnit = '分钟。';
Localization.general.paymentCards = {};
Localization.general.paymentCards.amex = '美国运通卡';
Localization.general.paymentCards.discover = '发现';
Localization.general.paymentCards.masterCard = '万事达卡';
Localization.general.paymentCards.visa = '签证';
Localization.general.processingMessage = '请稍候，我们正在处理您的请求。';
Localization.general.progressIndicatorMessage = '处理';
Localization.general.salutation = {};
Localization.general.salutation.doctor = {};
Localization.general.salutation.doctor = '博士';
Localization.general.salutation.miss = '小姐。';
Localization.general.salutation.missus = '夫人';
Localization.general.salutation.mister = '先生';
Localization.general.salutation.misterAndMissus = '先生及夫人';
Localization.general.salutation.mizz = '女士';
Localization.general.serviceButtonLabel = '我们的服务';
Localization.general.termsText = '条款和条件';
Localization.giftCertificate = {};
Localization.giftCertificate.customerCustomTextHeader = '';
Localization.giftCertificate.customerCustomTextFooter = '';
Localization.giftCertificate.customGiftCertificate = {};
Localization.giftCertificate.customGiftCertificate.cityLabel = '城市';
Localization.giftCertificate.customGiftCertificate.countryLabel = '国家';
Localization.giftCertificate.customGiftCertificate.deliverVia = '提供通过：';
Localization.giftCertificate.customGiftCertificate.emailAddressLabel = '电邮地址';
Localization.giftCertificate.customGiftCertificate.expressLabel = '快递送货';
Localization.giftCertificate.customGiftCertificate.messageLabel = '信息';
Localization.giftCertificate.customGiftCertificate.pickupText = '拿起我们的位置在几天之内将您的证书。';
Localization.giftCertificate.customGiftCertificate.pickupTitle = '拾音器';
Localization.giftCertificate.customGiftCertificate.postalAddressLabel = '邮政地址';
Localization.giftCertificate.customGiftCertificate.recipientNameLabel = '收件人姓名';
Localization.giftCertificate.customGiftCertificate.sendByEmailLabel = '通过电子邮件发送';
Localization.giftCertificate.customGiftCertificate.sendByMailTitle = '邮递';
Localization.giftCertificate.customGiftCertificate.stateLabel = '州/省';
Localization.giftCertificate.customGiftCertificate.styleImgTitle = 'GC样式';
Localization.giftCertificate.customGiftCertificate.zipLabel = '邮编/邮编';
Localization.giftCertificate.failedPurchase = '无法处理礼券。';
Localization.giftCertificate.instructions = '从下面的列表中选择一个礼券。';
Localization.giftCertificate.marketing = {};
Localization.giftCertificate.marketing.bannerMessage = '付出和喜悦';
Localization.giftCertificate.successfullPurchase = '在我们的系统中已经创建了你的礼券。';
Localization.giftCertificate.title = '购买礼券';
Localization.golf = {};
Localization.golf.areYouAMember = '你是会员吗？';
Localization.golf.availableTeeTimeTitle = '可用的开球时间';
Localization.golf.confirmation = {};
Localization.golf.confirmation.courseLabel = '课程：';
Localization.golf.confirmation.locationLabel = '地点：';
Localization.golf.confirmation.priceLabel = '价格每名球员：';
Localization.golf.confirmation.rateLabel = '率';
Localization.golf.confirmation.teeTimeLabel = '开球时间：';
Localization.golf.confirmGolfBooking = '确认高尔夫预订';
Localization.golf.continueButton = '检查可用的开球时间';
Localization.golf.customerCustomTextHeader = '';
Localization.golf.customerCustomTextFooter = '';
Localization.golf.dateInstructions = '请选择日期';
Localization.golf.dateLabel = '日期';
Localization.golf.dateTimePlayerTitle = '日期，时间，和播放器';
Localization.golf.error = {};
Localization.golf.error.date = '请选择一个日期。';
Localization.golf.error.noBooking = '很抱歉，我们不能在这个时候，在我们的系统中，记录你的开球时间预订。';
Localization.golf.error.noCourses = '无法检索到这个位置的高尔夫球场';
Localization.golf.error.noLocations = '无法检索高尔夫球位置“列表。';
Localization.golf.error.noRates = '无法在指定日期检索高尔夫价格';
Localization.golf.error.noTeeTime = '无法检索到的开球时间，在指定的日期';
Localization.golf.error.zeroCourses = '在这个位置没有高尔夫球场';
Localization.golf.error.zeroLocations = '无法检索到任何高尔夫球场的位置。';
Localization.golf.error.zeroRates = '没有高尔夫的价格为您提供在指定的日期';
Localization.golf.error.zeroTeeTime = '没有在指定的日期开球时间';
Localization.golf.loginToReceive = '要获得会员价格，请';
Localization.golf.marketing = {};
Localization.golf.marketing.bannerMessage = '远高于面值';
Localization.golf.on = '上';
Localization.golf.playersLabel = '＃玩家';
Localization.golf.selectCourse = '选择课程';
Localization.golf.selectCourseDefault = '选择一门课程...';
Localization.golf.selectLocation = '选择地点';
Localization.golf.selectLocationDefault = '选择一个位置...';
Localization.golf.successfullBookingMessage = '在我们的系统已记录您的开球时间预订。';
Localization.golf.timeLabel = '县。开球时间';
Localization.golf.title = '高尔夫预订';
Localization.newUser = {};
Localization.newUser.address1Title = '地址1';
Localization.newUser.address2Title = '地址2';
Localization.newUser.addressType = '地址类型';
Localization.newUser.cancelButtonLabel = '取消';
Localization.newUser.cityTitle = '城市';
Localization.newUser.confirmEmailTitle = '确认电子邮箱*';
Localization.newUser.confirmPasswordTitle = '确认密码*';
Localization.newUser.contactInfoSectionTitle = '联系方式（请输入至少一个电话号码*）';
Localization.newUser.countryTitle = '国家';
Localization.newUser.createButtonLabel = '创建';
Localization.newUser.description = '创建一个用户是简单，只要填写此表格。';
Localization.newUser.emailTitle = '电子邮件*';
Localization.newUser.fail = '无法创建新的用户帐户。';
Localization.newUser.firstNameTitle = '名字*';
Localization.newUser.genderTitle = '性别*';
Localization.newUser.homePhoneTitle = '家庭电话';
Localization.newUser.lastNameTitle = '姓*';
Localization.newUser.mainPhoneHome = '家';
Localization.newUser.mainPhoneOther = '其他';
Localization.newUser.mainPhoneTitle = '主要电话';
Localization.newUser.mainPhoneWork = '工作';
Localization.newUser.newsletter = '通讯';
Localization.newUser.otherPhoneTitle = '其他电话';
Localization.newUser.passwordTitle = '密码（至少8个字符）';
Localization.newUser.postCodeTitle = '邮政编码/';
Localization.newUser.salutationTitle = '称呼*';
Localization.newUser.sectionAddressTitle = '地址（可选）';
Localization.newUser.sectionAddressTitleMan = '地址（必须填写*）';
Localization.newUser.sectionNameAndPasswordTitle = '名和密码（必须填写*）';
Localization.newUser.stateTitle = '州/省。';
Localization.newUser.subscribeNewsletter = '订阅我们的电子报。';
Localization.newUser.success = '谢谢你，我们已经创建了您的帐户。';
Localization.newUser.title = '创建用户';
Localization.newUser.updateSessionFailed = '我们创建用户帐户，但遇到了麻烦更新您的预订总结的内容（如果有的话）。您可能需要重新载入此网页。';
Localization.newUser.workPhoneExtension = '工作电话分机。';
Localization.newUser.workPhoneTitle = '工作电话';
Localization.paymentProcessing = {};
Localization.paymentProcessing.addressLabel = '地址';
Localization.paymentProcessing.addressLabel2 = '第2行地址';
Localization.paymentProcessing.cardHolderBlank = '输入持卡人姓名';
Localization.paymentProcessing.cardNumberBlank = '输入卡号';
Localization.paymentProcessing.cardNumberLabel = '身份证号码';
Localization.paymentProcessing.cardTypeLabel = '卡类型';
Localization.paymentProcessing.checkoutButtonLabel = '结帐';
Localization.paymentProcessing.cvvLabel = 'CVV';
Localization.paymentProcessing.err = {};
Localization.paymentProcessing.err.folioUnpaid = '对不起，您的预订摘要仍需要支付。';
Localization.paymentProcessing.err.invalidCVVNumber = '请输入正确的CVV号码。';
Localization.paymentProcessing.err.invalidExpiryDate = '请输入信用卡到期日';
Localization.paymentProcessing.err.noAddress = '您必须输入与此卡相关联的地址进行处理。';
Localization.paymentProcessing.err.noCardHolderName = '输入持卡人姓名。';
Localization.paymentProcessing.err.noPostalCode = '您必须输入的邮政编码/与此卡处理。';
Localization.paymentProcessing.err.pastExpiryDate = '信用卡到期日期必须在未来';
Localization.paymentProcessing.err.paymentFailed = '无法处理。';
Localization.paymentProcessing.err.requiredInfo = '（标有*的字段是必需的。）';
Localization.paymentProcessing.err.successButNoCheckoutFolio = '付款成功，但不能闭上你的对开。';
Localization.paymentProcessing.err.successButNoEmail = '付款成功，但无法向您发送电子邮件收据。';
Localization.paymentProcessing.expiryLabel = '到期日';
Localization.paymentProcessing.expiryMonthBlank = '月';
Localization.paymentProcessing.goHomeButtonLabel = '返回首页';
Localization.paymentProcessing.guestLabel = '客人';
Localization.paymentProcessing.paymentSuccessDescription = '感谢您为您的企业。';
Localization.paymentProcessing.paymentSuccessTitle = '交易成功';
Localization.paymentProcessing.PPNotConfigured = '很抱歉，付款方式为不可用。';
Localization.paymentProcessing.PPPreRedirect = '转发您的支付服务提供商。';
Localization.paymentProcessing.PPPostRedirect = '最后完成支付。';
Localization.paymentProcessing.PPPreError = '接触支付服务提供商的错误。';
Localization.paymentProcessing.PPPostError = '付款交易已取消。';
Localization.paymentProcessing.sectionDescription = '使用我们的安全付款服务，完成您的订单。';
Localization.paymentProcessing.sectionTitle = '结帐';
Localization.paymentProcessing.totalLabel = '总';
Localization.paymentProcessing.userIDLabel = '用户ID';
Localization.paymentProcessing.zipLabel = '邮编/邮编';
Localization.roomReservation = {};
Localization.roomReservation.calendar = {};
Localization.roomReservation.calendar.clickContinueToProceed = '单击“下一步”按钮下一步进行您的预订。';
Localization.roomReservation.calendar.dateUnavailable = '日期不可用';
Localization.roomReservation.calendar.limitedAvailabilityFrom = '有限的可用性从';
Localization.roomReservation.calendar.limitedAvailability = '有限的可用性';
Localization.roomReservation.calendar.lowAvailability = '低可用性';
Localization.roomReservation.calendar.nextStep = '下一步:';
Localization.roomReservation.calendar.noDescriptionAvailable = '没有详细描述。';
Localization.roomReservation.calendar.noRoomsAvailable = '无房间';
Localization.roomReservation.calendar.noRoomsAvailableExplanation = '对不起，您的住宿可以不包括在此日期。<br> <br>请选择另一个日期。';
Localization.roomReservation.calendar.roomsAvailableFrom = '客房可从 ';
Localization.roomReservation.calendar.roomsAvailable = '可供应用客房 ';
Localization.roomReservation.calendar.selectArrivalDateButton = '选择这<BR>的的到达日期';
Localization.roomReservation.calendar.selectArrivalDateOnCalendar = '选择您的入住日期，在日历上以上。';
Localization.roomReservation.calendar.selectDepartureDateButton = '选择这<BR>的出发日期';
Localization.roomReservation.calendar.selectDepartureDateOnCalendar = '选择您的出发日期在日历上以上。';
Localization.roomReservation.calendar.selectedStayDates = '选择入住日期';
Localization.roomReservation.calendar.notAvailable = '不可用';
Localization.roomReservation.confirmation = {};
Localization.roomReservation.confirmation.adultTotalLabel = '成人：';
Localization.roomReservation.confirmation.amountLabel = '金额：';
Localization.roomReservation.confirmation.arrivalDateLabel = '到达日期：';
Localization.roomReservation.confirmation.bookButtonLabel = '书';
Localization.roomReservation.confirmation.childTotalLabel = '儿童：';
Localization.roomReservation.confirmation.customerCustomTextHeader = '';
Localization.roomReservation.confirmation.customerCustomTextFooter = '';
Localization.roomReservation.confirmation.departureDateLabel = '出发日期：';
Localization.roomReservation.confirmation.guestNameLabel = '客人姓名：';
Localization.roomReservation.confirmation.infantTotalLabel = '婴儿：';
Localization.roomReservation.confirmation.instructions = '请确认您的预订数据是准确的。点击书将保留您的预订摘要。';
Localization.roomReservation.confirmation.numberOfNightsLabel = '夜的数量：';
Localization.roomReservation.confirmation.title = '确认预订';
Localization.roomReservation.confirmation.youthTotalLabel = '青年：';
Localization.roomReservation.datesAndOccupants = {};
Localization.roomReservation.datesAndOccupants.adultOccupantsLabel = '成人';
Localization.roomReservation.datesAndOccupants.arrivalLabel = '到来';
Localization.roomReservation.datesAndOccupants.childOccupantsLabel = '孩子们';
Localization.roomReservation.datesAndOccupants.departureLabel = '出发';
Localization.roomReservation.datesAndOccupants.err = {};
Localization.roomReservation.datesAndOccupants.err.noMatchingAvailability = '很抱歉，您搜索的日期，也没有空房。';
Localization.roomReservation.datesAndOccupants.err.pmsBookingFailed = '无法向预订房间。';
Localization.roomReservation.datesAndOccupants.err.pmsRoomsFailed = '无法检索到酒店房间列表。';
Localization.roomReservation.datesAndOccupants.err.pmsRoomTypesFailed = '无法检索到酒店房间类型列表。';
Localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed = '无法检索到酒店的地点列表。';
Localization.roomReservation.datesAndOccupants.infantsOccupantsLabel = '婴幼儿';
Localization.roomReservation.datesAndOccupants.instructions = '选择您的逗留的长度和数量的客人。';
Localization.roomReservation.datesAndOccupants.moreLabel = '更多';
Localization.roomReservation.datesAndOccupants.promoOccupantsLabel = '促销代码';
Localization.roomReservation.datesAndOccupants.title = '预订房间';
Localization.roomReservation.datesAndOccupants.youthOccupantsLabel = '青年';
Localization.roomReservation.getPMSVenues = {};
Localization.roomReservation.getPMSVenues.instructions = '选择一个目的地，预订房间';
Localization.roomReservation.getPMSVenues.title = '地点';
Localization.roomReservation.marketing = {};
Localization.roomReservation.marketing.bannerMessage = '让自己舒服';
Localization.roomReservation.packageSelection = {};
Localization.roomReservation.packageSelection.customerCustomTextHeader = '';
Localization.roomReservation.packageSelection.customerCustomTextFooter = '';
Localization.roomReservation.packageSelection.instructions = '选择一个包。每个包的名称上看到更多的细节。';
Localization.roomReservation.packageSelection.title = '包';
Localization.roomReservation.roomTypeSelection = {};
Localization.roomReservation.roomTypeSelection.customerCustomTextHeader = '';
Localization.roomReservation.roomTypeSelection.customerCustomTextFooter = '';
Localization.roomReservation.roomTypeSelection.instructions = '选择您的客房类型。上市的价格是每晚的平均房价。';
Localization.roomReservation.roomTypeSelection.roomNumber = '房间数';
Localization.roomReservation.roomTypeSelection.roomRateLabel = '每晚平均率';
Localization.roomReservation.roomTypeSelection.roomSelection = {};
Localization.roomReservation.roomTypeSelection.roomSelection.instructions = '房间选择';
Localization.roomReservation.roomTypeSelection.roomSelection.customerCustomTextHeader = '';
Localization.roomReservation.roomTypeSelection.roomSelection.customerCustomTextFooter = '';
Localization.roomReservation.roomTypeSelection.roomTotalLabel = '任何适用费用及税项前';
Localization.roomReservation.roomTypeSelection.roomTypeRateLabel = ' /夜（平均）';
Localization.roomReservation.roomTypeSelection.roomTypeTotalRateLabel = '';
Localization.roomReservation.roomTypeSelection.title = '房间类型';
Localization.roomReservation.specialService = {};
Localization.roomReservation.specialService.add  = '加';
Localization.roomReservation.specialService.addUpgrade  = '升级您的预订';
Localization.roomReservation.specialService.category  = '类别';
Localization.roomReservation.specialService.invalidDateFormat  = '无效的日期格式';
Localization.roomReservation.specialService.name  = '特别服务';
Localization.roomReservation.specialService.selectUpgradeDate  = '选择“日期”升级“';
Localization.roomReservation.specialService.unselectText  = '请选择一个类别';
Localization.spaBooking = {};
Localization.spaBooking.categorySelection = {};
Localization.spaBooking.categorySelection.instructions = '您希望预定水疗服务, 或者参加我们的水疗课程么?';
Localization.spaBooking.categorySelection.locationLabel = '类别';
Localization.spaBooking.categorySelection.selectService = '水疗服务';
Localization.spaBooking.categorySelection.title = '类型预订';
Localization.spaBooking.categorySelection.unselectText = '请选择一个类别';
Localization.spaBooking.classSelection = {};
Localization.spaBooking.classSelection.availableSlots = '可用插槽数';
Localization.spaBooking.classSelection.classNameLabel = '课程';
Localization.spaBooking.classSelection.classNotAvail = '没有类此日期定于。请选择其他日期。';
Localization.spaBooking.classSelection.customerCustomTextHeader = '';
Localization.spaBooking.classSelection.customerCustomTextFooter = '';
Localization.spaBooking.classSelection.dateTo = '对';
Localization.spaBooking.classSelection.err = {};
Localization.spaBooking.classSelection.err.classListFailed = '很抱歉，我们不能在这个时候访问列表的水疗类。';
Localization.spaBooking.classSelection.instructions = '请选择日期';
Localization.spaBooking.classSelection.numClasses = '＃类';
Localization.spaBooking.classSelection.room = '房间';
Localization.spaBooking.classSelection.title = '选课程';
Localization.spaBooking.confirmation = {};
Localization.spaBooking.confirmation.additionalClasses = '附加的类';
Localization.spaBooking.confirmation.additionalClassesPartOfProgram = '下面的类，也可以为您预订：';
Localization.spaBooking.confirmation.customerCustomTextHeader = '';
Localization.spaBooking.confirmation.customerCustomTextFooter = '';
Localization.spaBooking.confirmation.err = {};
Localization.spaBooking.confirmation.err.checkConflictingFailed = '很抱歉，我们不能在这个时候为您的预订确认参数。';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveExisting = '现有的预订：';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveMessage = '请给酒店，或选择其他时间访问您的预订总结删除现有的预订。';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveTitle = '您已经被预订一空，水疗服务，在选定的时间。';
Localization.spaBooking.confirmation.err.createBookingFailed = '很抱歉，我们无法在我们的系统记录您的预订，在这个时候。';
Localization.spaBooking.confirmation.err.createTempUserFailed = '很抱歉，我们不能在这个时候开始预订。';
Localization.spaBooking.confirmation.makeBookingButtonLabel = '书';
Localization.spaBooking.confirmation.serviceClassesLabel = '班数：';
Localization.spaBooking.confirmation.serviceDateLabel = '日期：';
Localization.spaBooking.confirmation.serviceDurationLabel = '时间（分钟）：';
Localization.spaBooking.confirmation.servicePerClassLabel = '每类';
Localization.spaBooking.confirmation.servicePriceLabel = '价格：';
Localization.spaBooking.confirmation.serviceStartDateLabel = '开始日期：';
Localization.spaBooking.confirmation.serviceTotalLabel = '总价格：';
Localization.spaBooking.confirmation.successfullBookingMessage = '在我们的系统已记录您的预订。';
Localization.spaBooking.confirmation.title = '确认预订详情';
Localization.spaBooking.locationSelection = {};
Localization.spaBooking.locationSelection.customerCustomTextHeader = '';
Localization.spaBooking.locationSelection.customerCustomTextFooter = '';
Localization.spaBooking.locationSelection.err = {};
Localization.spaBooking.locationSelection.err.noLocation = '很抱歉，我们不能在这个时候访问列表的水疗中心位置。';
Localization.spaBooking.locationSelection.instructions = '选择一个地点，预订SPA服务。';
Localization.spaBooking.pmsbeforespa= {};
Localization.spaBooking.pmsbeforespa.notice='请注意，客房预订，预订水疗服务。您将无法完成您的水疗服务预订，直到你还增加了一个房间预订您的预订摘要';
Localization.spaBooking.pmsbeforespa.errorMotice='房间需提前预订，预订水疗服务。预订房间，请添加您的预订摘要';
Localization.spaBooking.pmsbeforespa.needReservation  = '在';
Localization.spaBooking.pmsbeforespa.on  = '需要預訂';
Localization.spaBooking.marketing = {};
Localization.spaBooking.marketing.bannerMessage = '准备被宠爱';
Localization.spaBooking.multipleAppointments = {};
Localization.spaBooking.multipleAppointments.instructions = '在要求的时间不可用。请从下面的替代选择。';
Localization.spaBooking.multipleAppointments.title = '选择一个约会';
Localization.spaBooking.serviceSelection = {};
Localization.spaBooking.serviceSelection.checkAvailability = '查看空房情况';
Localization.spaBooking.serviceSelection.customerCustomTextHeader = '';
Localization.spaBooking.serviceSelection.customerCustomTextFooter = '';
Localization.spaBooking.serviceSelection.dateLabel = '日期';
Localization.spaBooking.serviceSelection.moreOptions = '更多选项';
Localization.spaBooking.serviceSelection.err = {};
Localization.spaBooking.serviceSelection.err.dateRequired = '请选择一个日期。';
Localization.spaBooking.serviceSelection.err.genderRequired = '选择性别。';
Localization.spaBooking.serviceSelection.err.noAvailableAppointments = '对不起，您搜索的日期没有可用：';
Localization.spaBooking.serviceSelection.err.noService = '很抱歉，我们不能在这个时候访问列表的水疗服务。';
Localization.spaBooking.serviceSelection.genderLabel = '首选工作人员的性别';
Localization.spaBooking.serviceSelection.instructions = '请选择 一个日期和时间为您提供服务，然后选择您所需的服务：';
Localization.spaBooking.serviceSelection.meLabel = '我';
Localization.spaBooking.serviceSelection.minutesLabel = '分钟';
Localization.spaBooking.serviceSelection.otherName = '服务对象';
Localization.spaBooking.serviceSelection.otherNameLabel = '服务收件人的姓名：';
Localization.spaBooking.serviceSelection.sameGender = '这个服务要求的服务提供者和接收者的性别是相同的。';
Localization.spaBooking.serviceSelection.sameGenderLabel = '服务对象的性别';
Localization.spaBooking.serviceSelection.serviceNameLabel = '护理';
Localization.spaBooking.serviceSelection.someoneLabel = '他人';
Localization.spaBooking.serviceSelection.staffLabel = '首选工作人员';
Localization.spaBooking.serviceSelection.timeLabel = '时间';

Localization.general.termsLink = 'legal.html';

    /**
     * Version: 1.0 Alpha-1
     * Build Date: 13-Nov-2007
     * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
     * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
     * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
     */
    Localization.CultureInfo = {
        /* Culture Name */
        name: "zh-CN",
        englishName: "Chinese (People's Republic of China)",
        nativeName: "中文(中华人民共和国)",

        /* Day Name Strings */
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        abbreviatedDayNames: ["日", "一", "二", "三", "四", "五", "六"],
        shortestDayNames: ["日", "一", "二", "三", "四", "五", "六"],
        firstLetterDayNames: ["日", "一", "二", "三", "四", "五", "六"],

        /* Month Name Strings */
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        abbreviatedMonthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],

            /* AM/PM Designators */
        amDesignator: "上午",
        pmDesignator: "下午",

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
         *
         * The correct dateElementOrder is required by the parser to
         * determine the expected order of the date elements in the
         * string being parsed.
         */
        dateElementOrder: "ymd",

        /* Standard date and time format patterns */
        formatPatterns: {
            shortDate: "yyyy/M/d",
            mediumDate: "yyyy'年'M'月'd'日'",
            longDate: "yyyy'年'M'月'd'日'",
            shortTime: "H:mm",
            longTime: "H:mm:ss",
            fullDateTime: "yyyy'年'M'月'd'日' H:mm:ss",
            sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
            universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
            rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
            monthDay: "M'月'd'日'",
            yearMonth: "yyyy'年'M'月'"
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
         * to the Datejs Forum located at http://www.datejs.com/forums/.
         *
         * Please mark the subject of the post with [CultureInfo]. Example:
         *    Subject: [CultureInfo] Translated "da-DK" Danish(Denmark)
         *
         * We will add the modified patterns to the master source files.
         *
         * As well, please review the list of "Future Strings" section below.
         */
        regexPatterns: {
            jan: /^一月/i,
            feb: /^二月/i,
            mar: /^三月/i,
            apr: /^四月/i,
            may: /^五月/i,
            jun: /^六月/i,
            jul: /^七月/i,
            aug: /^八月/i,
            sep: /^九月/i,
            oct: /^十月/i,
            nov: /^十一月/i,
            dec: /^十二月/i,

            sun: /^星期日/i,
            mon: /^星期一/i,
            tue: /^星期二/i,
            wed: /^星期三/i,
            thu: /^星期四/i,
            fri: /^星期五/i,
            sat: /^星期六/i,

            future: /^next/i,
            past: /^last|past|prev(ious)?/i,
            add: /^(\+|aft(er)?|from|hence)/i,
            subtract: /^(\-|bef(ore)?|ago)/i,

            yesterday: /^yes(terday)?/i,
            today: /^t(od(ay)?)?/i,
            tomorrow: /^tom(orrow)?/i,
            now: /^n(ow)?/i,

            millisecond: /^ms|milli(second)?s?/i,
            second: /^sec(ond)?s?/i,
            minute: /^mn|min(ute)?s?/i,
                    hour: /^h(our)?s?/i,
                    week: /^w(eek)?s?/i,
            month: /^m(onth)?s?/i,
            day: /^d(ay)?s?/i,
            year: /^y(ear)?s?/i,

            shortMeridian: /^(a|p)/i,
            longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
            timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
            ordinalSuffix: /^\s*(st|nd|rd|th)/i,
            timeContext: /^\s*(\:|a(?!u|p)|p)/i
        },

            timezones: [{name:"UTC", offset:"-000"}, {name:"GMT", offset:"-000"}, {name:"EST", offset:"-0500"}, {name:"EDT", offset:"-0400"}, {name:"CST", offset:"-0600"}, {name:"CDT", offset:"-0500"}, {name:"MST", offset:"-0700"}, {name:"MDT", offset:"-0600"}, {name:"PST", offset:"-0800"}, {name:"PDT", offset:"-0700"}]
    };
// END: Text related to the booking summary proocess
return Localization;
})
