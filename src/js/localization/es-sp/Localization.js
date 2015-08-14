define(['jquery','jquery_validate'], function ($) {
// Resource file for all display text in the application

Localization = {};
Localization.siteName = "El Spa en ResortSuite";

// START: General purpose text used in multiple application processes
Localization.general = {};
Localization.general.progressIndicatorMessage = 'Procesamiento';
Localization.general.continueProcessButtonLabel = 'Contin\u00fae';
Localization.general.reverseProcessButtonLabel = 'Vuelva';
Localization.general.cancelProcessButtonLabel = 'Cancele';

Localization.general.applicationTitle = 'ResortSuite Web';
Localization.general.serviceButtonLabel = 'Nuestros Servicios';

Localization.general.gender = {};
Localization.general.gender.male = 'Hombre';
Localization.general.gender.female = 'Mujer';
Localization.general.gender.noPreference = 'Ninguna Preferencia';


Localization.general.salutation = {};
Localization.general.salutation.mister = 'Sr. ';
Localization.general.salutation.mizz = 'Sra. ';
Localization.general.salutation.missus = 'Sra. ';
Localization.general.salutation.miss = 'Se\u00f1orita';
Localization.general.salutation.doctor = 'Dr.';
Localization.general.salutation.misterAndMissus = 'El Sr. & la Sra. ';

Localization.general.currencyPrefix = '$';
Localization.general.currencyPostfix = '';

Localization.general.features = {};
Localization.general.features.clubName = 'Ver Estados Miembros';
Localization.general.features.pmsName = 'Reserve Cuarto';
Localization.general.features.spaName = 'Reserve Spa';
Localization.general.features.giftCertificatesName = 'Gift Certificates';
Localization.general.features.golfName = 'Reserve Golf';

Localization.general.payment = {};
Localization.general.payment.customerCustomTextFooter = '';

Localization.general.maintenance = {};
Localization.general.maintenance.maintenanceMessage = 'El sistema estar\u00e1 cerrando para el mantenimiento en aproximadamente';
Localization.general.maintenance.maintenanceMessageTimeUnit = 'minutos.';

Localization.general.paymentCards = {};
Localization.general.paymentCards.visa = 'Visa';
Localization.general.paymentCards.masterCard = 'MasterCard';
Localization.general.paymentCards.amex = 'American Express';
Localization.general.paymentCards.discover = 'Discover';

Localization.general.err = {};
Localization.general.err.emailErrNotExist = 'Spanish: This email address does not exist in the system! \nClick OK and create a new account by clicking \'New User\'';
Localization.general.err.emailErrExist = 'Spanish: This email address is already registered in the system! \n\nClick OK and reset your password by clicking \'Forgot Password\'\nOr click Cancel to use a new email address';
Localization.general.err.defaultErr = 'El error que procesa su petici\u00f3n. Trate por favor otra vez. .';
Localization.general.err.timeoutTitle = 'TIEMPO MUERTO';
Localization.general.err.timeoutText = 'Su sesii\u00f3n ha expirado. Haga clic en BUENO reiniciar.';
Localization.general.err.maintenanceTitle = 'El sistema hacia abajo para Mantenimiento';
Localization.general.err.maintenanceText = 'El sistema es actualmente desconectado para el mantenimiento. Trate por favor otra vez luego.';
// END: General purpose text used in multiple application processes

// START: Text related to the user login process
Localization.general.login = {};
Localization.general.login.title = 'Entrada de cliente';
Localization.general.login.description = 'La entrada para continuar. \u00bfNo tiene una entrada? Cree uno haciendo clic en Nuevo a Usuario.';
Localization.general.login.loginButtonLabel = 'Entrada';
Localization.general.login.newUserButtonLabel = 'Nuevo Usuario';
Localization.general.login.forgotPasswordButtonLabel = 'Contrase\u00f1a olvidado';
Localization.general.login.changePasswordButtonLabel = 'Contrase\u00f1a de Cambio';
Localization.general.login.cancelButtonLabel = 'Cancele';
Localization.general.login.emailTitle = 'Correo electr\u00f3nico Direcci\u00f3n';
Localization.general.login.emailBlank = 'Entre por favor una direcci\u00f3n correo electr\u00f3nico';
Localization.general.login.passwordTitle = 'Contrase\u00f1a';
Localization.general.login.passwordBlank = 'Entre por favor una contrase\u00f1a';

Localization.general.login.err = {};
Localization.general.login.err.noUsernameOrPassword = 'Entre un nombre de usuario y la contrase\u00f1a';
Localization.general.login.err.noPhoneNumber = 'Enter at least one phone number';
Localization.general.login.err.invalidCredentials = 'Credencial proporcionado no son v\u00e1lido. Trate otra vez.';

Localization.general.login.passwordReset = {};
Localization.general.login.passwordReset.title = 'Reponga Contrase\u00f1a';
Localization.general.login.passwordReset.description = 'Reponga su contrase\u00f1a entrando la cuenta correo electr\u00f3nico se asoci\u00f3 con la cuenta.';
Localization.general.login.passwordReset.resetButtonLabel = 'Reponga';
Localization.general.login.passwordReset.cancelButtonLabel = 'Cancele';
Localization.general.login.passwordReset.newPasswordEmailConfirmation = 'Su nueva contrase\u00f1a ha sido mandada un correo electr\u00f3nico a la direcci\u00f3n proporcionado.';
Localization.general.login.passwordReset.emailLabel = 'Correo electr\u00f3nico Direcci\u00f3n';
Localization.general.login.passwordReset.emailBlank = 'Entre una direcci\u00f3n correo electr\u00f3nico para reponer contrase\u00f1a';
Localization.general.login.passwordReset.oldPasswordLabel = 'Contrase\u00f1a actual';
Localization.general.login.passwordReset.oldPasswordBlank = 'Debe entrar contrase\u00f1a';
Localization.general.login.passwordReset.newPassword1Label = 'Nueva Contrase\u00f1a';
Localization.general.login.passwordReset.newPassword1Blank = 'Debe entrar nueva contrase\u00f1a';
Localization.general.login.passwordReset.newPassword2Label = 'Confirme Contrase\u00f1a';
Localization.general.login.passwordReset.newPassword2Blank = 'Debe confirmar nueva contrase\u00f1a';

Localization.general.login.changePassword = {};
Localization.general.login.changePassword.title = 'Cambie Contrase\u00f1a';
Localization.general.login.changePassword.description = 'Entre su direcci\u00f3n correo electr\u00f3nico, contrase\u00f1as viejas y nuevas.';
Localization.general.login.changePassword.commitButton = 'Cambio';
Localization.general.login.changePassword.cancelButton = 'Cancele';
Localization.general.login.changePassword.updateSuccess = 'Su contrase\u00f1a ha sido actualizada.';
Localization.general.login.changePassword.forceChange = 'Usted es requerido a cambiar su contrase\u00f1a';
Localization.general.login.changePassword.err = {}
Localization.general.login.changePassword.err.noEmailAddress = 'Entre su direcci\u00f3n correo electr\u00f3nico';
Localization.general.login.changePassword.err.noOldPassword = 'Entre su contrase\u00f1a actual';
Localization.general.login.changePassword.err.noNewPassword = 'Entre su nueva contrase\u00f1a';
Localization.general.login.changePassword.err.passwordsDoNotMatch = 'Nuevas contrase\u00f1as deben emparejar';
Localization.general.login.changePassword.err.min8chars = 'La contrase\u00f1a debe ser por lo menos 8 caracteres de largo';
Localization.general.login.changePassword.err.resetFailed = 'Incapaz de cambiar contrase\u00f1a. Correo electr\u00f3nico direcci\u00f3n /  contrase\u00f1a inexacta';
//END: Text related to the user login process

// START: Text related to the payment process
Localization.paymentProcessing = {};
Localization.paymentProcessing.PPsectionDescription = 'Por favor, elija un m\u00e9todo de pago';
Localization.paymentProcessing.PPPreRedirect = 'Que le hagan llegar a PayPal.';
Localization.paymentProcessing.PPPostRedirect = 'Finalizaci\u00f3n de pago de PayPal.';
Localization.paymentProcessing.PPPreError = 'Error en contacto con PayPal.';
Localization.paymentProcessing.PPPostError = 'Transacci\u00f3n de PayPal cancela.';
Localization.paymentProcessing.PPErrorCode = 'C\u00f3digo de error\u003A ';
Localization.paymentProcessing.PPCancelled = 'Por favor, int\u00e9ntelo de nuevo o elegir un m\u00e9todo de pago alternativo.';
Localization.paymentProcessing.TryAgain = 'Int\u00e9ntalo de nuevo';
Localization.paymentProcessing.sectionTitle = 'Compruebe';
Localization.paymentProcessing.sectionDescription = 'Complete su orden que utiliza nuestro servicio seguro de pago.';
Localization.paymentProcessing.sectionDescriptionDeposit1 = 'Your order total is '; //NTBT
Localization.paymentProcessing.sectionDescriptionDeposit2 = '. At this time, we are taking your credit card information to guarantee your booking and charging it '; //NTBT
Localization.paymentProcessing.sectionDescriptionDeposit3 = '. The balance, if any, will be charged at a later date.'; //NTBT
Localization.paymentProcessing.checkoutButtonLabel = 'Compruebe';
Localization.paymentProcessing.guestLabel = 'Hu\u00e9sped';
Localization.paymentProcessing.userIDLabel = 'Usuario identificaci\u00f3n';
Localization.paymentProcessing.confirmationIDLabel = 'Confirmaci\u00f3n identificaci\u00f3n';
Localization.paymentProcessing.totalLabel = 'Suma';
Localization.paymentProcessing.cardTypeLabel = 'Tipo de tarjeta';
Localization.paymentProcessing.cardTypeBlank = 'Seleccione un tipo de tarjeta de cr\u00e9dito';
Localization.paymentProcessing.cardHolderLabel = 'Poseedor de tarjeta';
Localization.paymentProcessing.cardHolderBlank = 'Entre el nombre de poseedor de tarjeta';
Localization.paymentProcessing.cardNumberLabel = 'N\u00famero de tarjeta';
Localization.paymentProcessing.cardNumberBlank = 'Entre un n\u00famero de tarjeta';
Localization.paymentProcessing.expiryLabel = 'Fecha de vencimiento (MM/YY)';
Localization.paymentProcessing.expiryBlank = 'Entre una fecha de vencimiento (MM/YY)';
Localization.paymentProcessing.cvvLabel = 'CVV';
Localization.paymentProcessing.addressLabel = 'Direcci\u00f3n';
Localization.paymentProcessing.zipLabel = 'Cierre / C\u00f3digo Postal';
Localization.paymentProcessing.paymentProcessingMessage = 'Por favor espera, nosotros procesamos su pago.';
Localization.paymentProcessing.paymentSuccessTitle = 'Pago Exitoso';
Localization.paymentProcessing.paymentSuccessDescription = 'Gracias su pago ha sido procesado exitosamente.';
Localization.paymentProcessing.viewReceiptButtonLabel = 'Vea Recibo';
Localization.paymentProcessing.goHomeButtonLabel = 'Regrese a Principal P\u00e1gina';
Localization.paymentProcessing.receiptCreationProcessMessage = 'Por favor espera mientras creamos su recibo.';

Localization.paymentProcessing.err = {};
Localization.paymentProcessing.err.folioUnpaid  = 'ES: Sorry, your Booking Summary still requires payment.';
Localization.paymentProcessing.err.noCardTypeSelected = 'Seleccione un tipo de tarjeta.';
Localization.paymentProcessing.err.noCardHolderName = 'Entre un Nombre de Poseedor de Tarjeta.';
Localization.paymentProcessing.err.noCardNumber = 'Entre un n\u00famero de tarjeta.';
Localization.paymentProcessing.err.noExpiryDate = 'Entra una fecha de vencimiento.';
Localization.paymentProcessing.err.invalidExpiryDate = 'Formato inv\u00e1lido de fecha de vencimiento. Debe estar en el formato mm/dd.';
Localization.paymentProcessing.err.paymentErrorTitle = 'Error de pago';
Localization.paymentProcessing.err.paymentErrorDesc1 = 'Hab\u00eda un error que procesa su pago. Trate por favor otra vez o llame ';
Localization.paymentProcessing.err.paymentErrorDesc2 = ' para ayuda.';
Localization.paymentProcessing.err.noAddress = 'Debe introducir la direcci\u00f3n asociada a esta tarjeta para su procesamiento..';
Localization.paymentProcessing.err.noPostalCode = 'Se debe introducir el c\u00f3digo postal asociado con esta tarjeta para su procesamiento.';
// END: Text related to the payment process

// START: Text related to the creation of users
Localization.newUser = {};
Localization.newUser.title = 'Cree a Usuario';
Localization.newUser.description = 'Crear a un usuario es tan sencillo como llenar esta forma.';
Localization.newUser.createButtonLabel = 'Cree';
Localization.newUser.cancelButtonLabel = 'Cancele';

Localization.newUser.err = {};
Localization.newUser.err.noGender = 'Seleccione un g\u00e9nero';
Localization.newUser.err.noSalutation = 'Select a salutation';
Localization.newUser.err.noFirstName = 'Entre un primer nombre';
Localization.newUser.err.noLastName = 'Entre un apellido';
Localization.newUser.err.noEmailAddress = 'Entre una direcci\u00f3n correo electr\u00f3nico';
Localization.newUser.err.emailAddressNoMatch = 'Las direcciones correo electr\u00f3nico no emparejan';
Localization.newUser.err.noPassword = 'Entre una contrase\u00f1a';
Localization.newUser.err.min8charPassword = 'La contrase\u00f1a debe ser por lo menos 8 caracteres';
Localization.newUser.err.passwordNoMatch = 'Las contrase\u00f1as no emparejan';
Localization.newUser.err.emailTaken1 = 'La direcci\u00f3n correo electr\u00f3nico ';
Localization.newUser.err.emailTaken2 = ' ya es tomado. Por favor contacto apoya en ';
Localization.newUser.err.emailTaken3 = ' si usted se siente que esto es un error';


Localization.newUser.sectionNameAndPasswordTitle = 'Nombre & Contrase\u00f1a (Mandatario *)';
Localization.newUser.genderTitle = 'G\u00e9neror*';
Localization.newUser.genderHint = 'Seleccione un g\u00e9nero...';
Localization.newUser.salutationTitle = 'Salutaci\u00f3n*';
Localization.newUser.salutationHint = 'Seleccione una salutaci\u00f3n...';
Localization.newUser.firstNameTitle = 'Nombre primero*';
Localization.newUser.firstNameBlank = 'Entre por favor un primer nombre';
Localization.newUser.lastNameTitle = 'Apellido*';
Localization.newUser.lastNameBlank = 'Entre por favor un apellido';
Localization.newUser.emailTitle = 'Correo electr\u00f3nico*';
Localization.newUser.emailBlank = 'Entre por favor una direcci\u00f3n correo electr\u00f3nico';
Localization.newUser.confirmEmailTitle = 'Confirme Correo electr\u00f3nico*';
Localization.newUser.passwordTitle = 'Contrase\u00f1a* (El m\u00ednimo 8 caracteres)';
Localization.newUser.passwordBlank = 'Entre por favor una contrase\u00f1a*';
Localization.newUser.confirmPasswordTitle = 'Confirme Contrase\u00f1a*';
Localization.newUser.sectionAddressTitle = 'Direcci\u00f3n (Opcional)';
Localization.newUser.address1Title = 'Direcci\u00f3n 1';
Localization.newUser.address2Title = 'Direcci\u00f3n 2';
Localization.newUser.cityTitle = 'Ciudad';
Localization.newUser.stateTitle = 'State / Prov.';
Localization.newUser.countryTitle = 'Pa\u00eds';
Localization.newUser.postCodeTitle = 'CIERRE/ C\u00f3digo Postal';
Localization.newUser.contactInfoSectionTitle = 'Contacte Informaci\u00f3n (Opcional)';
Localization.newUser.mainPhoneTitle = 'Principal Tel\u00e9fono';
Localization.newUser.mainPhoneHome = 'Casa';
Localization.newUser.mainPhoneWork = 'Trabajo';
Localization.newUser.mainPhoneOther = 'Otro';
Localization.newUser.homePhoneTitle = 'Tel\u00e9fono de casa';
Localization.newUser.workPhoneTitle = 'Tel\u00e9fono de Trabajo';
Localization.newUser.workPhoneExtension = 'Ext. de Trabajo';
Localization.newUser.otherPhoneTitle = 'Otro Tel\u00e9fonol';
// END: Text related to the creation of users








// START: Text related to the room reservation process
Localization.roomReservation = {}

Localization.roomReservation.cancelConfirm = 'Seguro usted quiere cancelar';


// Dates and Occupants
Localization.roomReservation.datesAndOccupants = {};
Localization.roomReservation.datesAndOccupants.title = 'Reserve un Cuarto';
Localization.roomReservation.datesAndOccupants.instructions = 'Escoja el plazo de tiempo para su visita y el n\u00famero de hu\u00e9spedes.';
Localization.roomReservation.datesAndOccupants.arrivalLabel = 'Llegada';
Localization.roomReservation.datesAndOccupants.departureLabel = 'Salida';
Localization.roomReservation.datesAndOccupants.adultOccupantsLabel = 'Adultos';
Localization.roomReservation.datesAndOccupants.childOccupantsLabel = 'Ni\u00f1os';
Localization.roomReservation.datesAndOccupants.youthOccupantsLabel = 'Youth';
Localization.roomReservation.datesAndOccupants.err = {};
Localization.roomReservation.datesAndOccupants.err.arrivalAndDepartureRequired = 'Seleccione una llegada y salida fechan.';
Localization.roomReservation.datesAndOccupants.err.arrivalBeforeDeparture = 'La fecha de la llegada debe caerse antes de la fecha de salida';
Localization.roomReservation.datesAndOccupants.err.arrivalNotInPast = 'La fecha de la llegada no puede estar en el pasado';
Localization.roomReservation.datesAndOccupants.err.adultsNotEqualNumber = 'Entra un n\u00famero para Adultos';
Localization.roomReservation.datesAndOccupants.err.childNotEqualNumber = 'Entre un n\u00famero para ni\u00f1os';
Localization.roomReservation.datesAndOccupants.err.noMatchingAvailability = 'Ninguna disponibilidad que empareja sus criterios de la b\u00fasqueda.';
Localization.roomReservation.datesAndOccupants.err.adultsBlank = 'Entre el n\u00famero de adultos';

// Room Packages
Localization.roomReservation.packageSelection = {};
Localization.roomReservation.packageSelection.title = 'Paquete';
Localization.roomReservation.packageSelection.instructions = 'Seleccione un paquete. Ci\u00e9rnase sobre paquete para ver detalles adicionales.';
Localization.roomReservation.packageSelection.packageDescriptionLabel = 'Descripci\u00f3n';
Localization.roomReservation.packageSelection.err = {};
Localization.roomReservation.packageSelection.err.packageRequired = 'Seleccione un Paquete.';

// Room Types
Localization.roomReservation.roomTypeSelection = {};
Localization.roomReservation.roomTypeSelection.title = 'Al\u00f3jese Tipo';
Localization.roomReservation.roomTypeSelection.instructions = 'Seleccione su tipo de cuarto. List\u00f3 el precio es por noche.';
Localization.roomReservation.roomTypeSelection.roomTypeDescriptionLabel = 'Descripci\u00f3n';
Localization.roomReservation.roomTypeSelection.roomTypeRateLabel = 'Promedia la Tasa';
Localization.roomReservation.roomTypeSelection.customerCustomTextHeader = '';
Localization.roomReservation.roomTypeSelection.customerCustomTextFooter = '';
Localization.roomReservation.roomTypeSelection.err = {};
Localization.roomReservation.roomTypeSelection.err.roomTypeRequired = 'Seleccione un Tipo de Cuarto.';
Localization.roomReservation.roomTypeSelection.err.maxOccupantsExceeded = 'Usted ha excedido el n\u00famero m\u00e1ximo de ocupantes de este cuarto. El m\u00e1ximo permiti\u00f3 a ocupantes: ';

// Confirmation
Localization.roomReservation.confirmation = {};
Localization.roomReservation.confirmation.title = 'Confirme Reservaci\u00f3n';
Localization.roomReservation.confirmation.instructions = 'Verifique que sus datos de reservaci\u00f3n son accutate. Haciendo clic en Reserva agrega esta reservaci\u00f3n a su carrito.';
Localization.roomReservation.confirmation.guestNameLabel = 'Nombre de hu\u00e9sped:';
Localization.roomReservation.confirmation.arrivalDateLabel = 'Fecha de llegada:';
Localization.roomReservation.confirmation.departureDateLabel = 'Fecha de salida:';
Localization.roomReservation.confirmation.numberOfNightsLabel = 'El n\u00famero de Noches:';
Localization.roomReservation.confirmation.adultTotalLabel = 'Adultos:';
Localization.roomReservation.confirmation.youthTotalLabel = 'Youth:';
Localization.roomReservation.confirmation.childTotalLabel = 'Ni\u00f1os:';
Localization.roomReservation.confirmation.amountLabel = 'Cantidad:';
Localization.roomReservation.confirmation.customerCustomTextFooter = '';
Localization.roomReservation.confirmation.bookButtonLabel = 'Reserva';
Localization.roomReservation.confirmation.successMessage = ' La reservaci\u00f3n agreg\u00f3 exitosamente. Usted puede seguir compras. Contin\u00fae para Comprobar (abajo) cuando completa.';
// END: Text related to the room reservation process


// START: Text related to the spa booking process
Localization.spaBooking = {};

// Select Location
Localization.spaBooking.locationSelection = {};
Localization.spaBooking.locationSelection.title = 'Spa Ubicaci\u00f3n';
Localization.spaBooking.locationSelection.instructions = 'Escoja una ubicaci\u00f3n para reservar sus servicios de SPA.';
Localization.spaBooking.locationSelection.locationLabel = 'Ubicaci\u00f3n';
Localization.spaBooking.locationSelection.err = {};
Localization.spaBooking.locationSelection.err.locationRequired = 'Seleccione la ubicaci\u00f3n de SPA.';

// Choose Service
Localization.spaBooking.serviceSelection = {};
Localization.spaBooking.serviceSelection.title = 'Escoja su servicio';
Localization.spaBooking.serviceSelection.instructions = 'Seleccione su fecha preferido, el tiempo, y ati\u00e9ndale a querr\u00eda reservar.';
Localization.spaBooking.serviceSelection.dateLabel = 'Fecha';
Localization.spaBooking.serviceSelection.timeLabel = 'Tiempo';
Localization.spaBooking.serviceSelection.genderLabel = 'Atienda a G\u00e9nero de Proveedor';
Localization.spaBooking.serviceSelection.staffLabel = 'Personal preferido';
Localization.spaBooking.serviceSelection.staffNoPreference = 'Ning\u00fan Preferencia';
Localization.spaBooking.serviceSelection.serviceNameLabel = 'Servicio';
Localization.spaBooking.serviceSelection.serviceDescription = 'Descripci\u00f3n';
Localization.spaBooking.serviceSelection.servicePrice = 'Precio';
Localization.spaBooking.serviceSelection.serviceDuration = 'El tiempo (min)';
Localization.spaBooking.serviceSelection.err = {};
Localization.spaBooking.serviceSelection.err.dateRequired = 'Seleccione una Fecha.';
Localization.spaBooking.serviceSelection.err.dateNotInPast = 'Feche no puede estar en el pasado.';
Localization.spaBooking.serviceSelection.err.dateNotTodayOrInPast = 'La fecha debe ser ma\u00f1ana o posterior';
Localization.spaBooking.serviceSelection.err.timeRequired = 'Seleccione un Tiempo.';
Localization.spaBooking.serviceSelection.err.genderRequired = 'Seleccione un g\u00e9nero.';
Localization.spaBooking.serviceSelection.err.serviceRequired = 'Seleccione un Servicio.';
Localization.spaBooking.serviceSelection.err.noAvailableAppointments = 'Ningunas citas disponibles. Cambie sus criterios de la b\u00fasqueda y trate otra vez.';
Localization.spaBooking.serviceSelection.err.availableAppointmentsFailure = 'El error ocurri\u00f3 trayendo las citas disponibles';

// Multiple Appointments Choose
Localization.spaBooking.multipleAppointments = {};
Localization.spaBooking.multipleAppointments.title = 'Seleccione una Cita';
Localization.spaBooking.multipleAppointments.instructions = 'Hab\u00eda no exige los iguales. Seleccione de iguales sugeridos.';
Localization.spaBooking.multipleAppointments.appointmentTimeLabel = 'Comience Tiempo';

Localization.spaBooking.pmsbeforespa = {};
Localization.spaBooking.pmsbeforespa.notice = 'Tenga en cuenta que la reserva de habitaciones está obligada a reservar un servicio de spa. Usted no será capaz de completar su reserva spa de servicio hasta que se haya añadido también una reserva de habitación a su reserva Resumen';
Localization.spaBooking.pmsbeforespa.errorMotice = 'A reserva de habitaciones está obligado a reservar un servicio de Spa. Por favor, añada una reserva de habitaciones a su Resumen de reserva.';
// Confirmation of Booking
Localization.spaBooking.confirmation = {};
Localization.spaBooking.confirmation.title = 'Confirme Reservaci\u00f3n';
Localization.spaBooking.confirmation.instructions = 'Verifique que su reservando informaci\u00f3n es correcto. Haga clic en Reserva para agregar reservaci\u00f3n a su carrito.';
Localization.spaBooking.confirmation.guestNameLabel = 'Nombre de hu\u00e9sped:';
Localization.spaBooking.confirmation.serviceNameLabel = 'Servicio:';
Localization.spaBooking.confirmation.serviceDescriptionLabel = 'Descripci\u00f3n:';
Localization.spaBooking.confirmation.serviceStaffLabel = 'Personal:';
Localization.spaBooking.confirmation.serviceDateLabel = 'Fecha:';
Localization.spaBooking.confirmation.serviceTimeLabel = 'Tiempo:';
Localization.spaBooking.confirmation.serviceDurationLabel = 'La duraci\u00f3n (min):';
Localization.spaBooking.confirmation.servicePriceLabel = 'Precio:';
Localization.spaBooking.confirmation.makeBookingButtonLabel = 'Reserva';
Localization.spaBooking.confirmation.genderLabel = 'G\u00e9nero';
Localization.spaBooking.confirmation.overbookGuestTooltip = 'Entre el nombre del hu\u00e9sped que estar\u00e1 recibiendo este servicio.';
Localization.spaBooking.confirmation.successfullBookingMessage = ' La reservaci\u00f3n agreg\u00f3 exitosamente. Usted puede continuar hacer de compras. Vaya a Comprobar (abajo) cuando completa.';
Localization.spaBooking.confirmation.customerCustomTextFooter = '';
Localization.spaBooking.confirmation.err = {};
Localization.spaBooking.confirmation.err.conflictingBookingsMessage = 'Reservas opuestas. Seleccione por favor otra reserva.';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveMessage = 'You have already been booked for a spa service at the selected time. Click OK to remove your current booking.';
Localization.spaBooking.confirmation.err.overbookModeNotDefined = 'Ninguna configuraci\u00f3n que sobrecontrata defini\u00f3';
Localization.spaBooking.confirmation.err.overbookWarning = 'Esta reserva choca con otra reserva. Haga clic en BUENO si usted desea continuar, hacer clic en Cancela para abortar.';
Localization.spaBooking.confirmation.err.serviceNoLongerAvailableMessage = '\u00a1El tiempo seleccionado ya no est\u00e1 disponible! Haga clic en el bot\u00f3n de Reserva SPA para comenzar de nuevo.';


// END: Text related to the spa booking process


// START: Text related to the gift certificate booking process
Localization.giftCertificate = {};
Localization.giftCertificate.title = 'Compre Vale-obsequio';
Localization.giftCertificate.instructions = 'Seleccione un vale-obsequio de la lista siguiente.';
Localization.giftCertificate.giftCertificateIssueToLabel = 'Publique a';
Localization.giftCertificate.giftCertificateNameLabel = 'Nombre';
Localization.giftCertificate.giftCertificateDescriptionLabel = 'Descripci\u00f3n';
Localization.giftCertificate.giftCertificatePriceLabel = 'Precio';
// START: Custom gift certificate
Localization.giftCertificate.customGiftCertificate = {};
Localization.giftCertificate.customGiftCertificate.styleImgTitle = 'GC Styles';
Localization.giftCertificate.customGiftCertificate.recipientNameLabel = 'Recipient Name';
Localization.giftCertificate.customGiftCertificate.messageLabel = 'Message';
Localization.giftCertificate.customGiftCertificate.sendByEmailLabel = 'Send by Email';
Localization.giftCertificate.customGiftCertificate.emailAddressLabel = 'Email Address';
Localization.giftCertificate.customGiftCertificate.sendByMailTitle = 'Send by Mail';
Localization.giftCertificate.customGiftCertificate.postalAddressLabel = 'Postal Address';
Localization.giftCertificate.customGiftCertificate.cityLabel = 'City';
Localization.giftCertificate.customGiftCertificate.stateLabel = 'State/Prov';
Localization.giftCertificate.customGiftCertificate.countryLabel = 'Country';
Localization.giftCertificate.customGiftCertificate.zipLabel = 'Zip/Postal Code';
Localization.giftCertificate.customGiftCertificate.pickupTitle = 'Pickup';
Localization.giftCertificate.customGiftCertificate.deliverVia  = 'Deliver Via:';
// END: Custom gift certificate
Localization.giftCertificate.processingPurchase = 'Por favor espera, nosotros procesamos su compra.';
Localization.giftCertificate.successfullPurchase = ' El vale-obsequio agreg\u00f3. Usted puede seguir compras. Vaya a Comprobar (abajo) cuando completa.';
Localization.giftCertificate.confirmCancel = 'Son usted seguro usted quiere cancelar';
Localization.giftCertificate.customerCustomTextHeader = '';
Localization.giftCertificate.customerCustomTextFooter = '';

Localization.giftCertificate.err = {};
Localization.giftCertificate.err.selectGiftCertificate = 'Seleccione un vale-obsequio antes de continuar';
// END: Text related to the gift certificate booking process




// START: Text related to the golf reservation process
Localization.golf = {};
Localization.golf.title = 'Golf Reservaci\u00f3n';
Localization.golf.selectLocation = 'Seleccione la Ubicaci\u00f3n';
Localization.golf.selectLocationDefault = 'Seleccione una Ubicaci\u00f3n...';
Localization.golf.selectCourse = 'Seleccione Curso';
Localization.golf.selectCourseDefault = 'Seleccione un Curso...';
Localization.golf.dateTimePlayerTitle = 'La fecha, el Tiempo, y los Jugadores';
Localization.golf.dateLabel = 'Fecha';
Localization.golf.timeLabel = 'Pref. Horario de Salida';
Localization.golf.playersLabel = '# de Jugadores';
Localization.golf.availableTeeTimeTitle = 'Horario de Salida disponibles';
Localization.golf.continueButton = 'Contin\u00fae';
Localization.golf.makeBookingButton = 'Haga Reservaci\u00f3n';
Localization.golf.confirmGolfBooking = 'Confirme Reservaci\u00f3n de Golf';
Localization.golf.backToQueryButton = 'Vuelva';
Localization.golf.successfullBookingMessage = 'Reservando exitosamente agregado. Usted puede seguir compras. Vaya a Comprobar (abajo) cuando completa.';

Localization.golf.confirmation = {};
Localization.golf.confirmation.locationLabel = 'Ubicaci\u00f3n:';
Localization.golf.confirmation.rateLabel = '[ES] Rate:';
Localization.golf.confirmation.priceLabel = 'Valore por jugador:';
Localization.golf.confirmation.teeTimeLabel = 'Horario de Salida:';


Localization.golf.error = {};
Localization.golf.error.noCourses = 'Ningunos cursos disponibles en esta ubicaci\u00f3n';
Localization.golf.error.noTeeTime = 'Ningunos horario de salida disponibles';
Localization.golf.error.unhandled = 'Hab\u00eda un error que procesa su petici\u00f3n. Trate por favor otra vez.';
// END: Text related to the golf reservation process




// START: Text related to the booking summary process
Localization.bookingSummary = {}

Localization.bookingSummary.cartName = 'Carrito';
Localization.bookingSummary.cartItemLabel = 'Art\u00edculos';
Localization.bookingSummary.cartTitle = 'Acarree/las Reservas';
Localization.bookingSummary.cartNoItems = 'No hay art\u00edculos en su carrito en este momento. Para agregar art\u00edculos escogen uno de nuestros servicios arriba.';
Localization.bookingSummary.customerCustomTextFooter = '';
Localization.bookingSummary.orderTotal = 'Ordene Suma';
Localization.bookingSummary.removeSelected = 'Quite';
Localization.bookingSummary.proceedToCheckout = 'Contin\u00fae para comprobar';

Localization.bookingSummary.grid = {};
Localization.bookingSummary.grid.categoryLabel = 'Categor\u00eda';
Localization.bookingSummary.grid.folioLabel = 'Folio';
Localization.bookingSummary.grid.refNumLabel = 'Ref #';
Localization.bookingSummary.grid.locationLabel = 'Ubicaci\u00f3n';
Localization.bookingSummary.grid.detailsLabel = 'Detalles';
Localization.bookingSummary.grid.startLabel = 'Comienzo';
Localization.bookingSummary.grid.finishLabel = 'Fin';
Localization.bookingSummary.grid.amountLabel = 'Cantidad';

// END: Text related to the booking summary proocess



Localization.general.err.invalidSessionText	=	'Este sitio web requiere el uso de cookies. Por favor, activa las cookies en tu navegador y cargar la página.';
Localization.general.err.maintenanceTitle	=	'Sistema de Cerrado por Mantenimiento';
Localization.general.err.maintenanceText	=	'El sistema está actualmente fuera de línea por mantenimiento. Por favor, inténtelo de nuevo más tarde.';
Localization.general.login.emailTitle	=	'Dirección de correo electrónico';
Localization.general.login.emailBlank	=	'Por favor, introduzca una dirección de correo electrónico';
Localization.general.login.passwordTitle	=	'Contraseña';
Localization.general.login.passwordBlank	=	'Por favor, introduzca una contraseña';
Localization.general.login.passwordInvalid	=	'Por favor ingrese un número de teléfono válido';
Localization.paymentProcessing.expiryYearBlank	=	'AAAA';
Localization.paymentProcessing.receiptCreationProcessMessage	=	'Por favor espere, estamos creando su recibo.';
Localization.paymentProcessing.err.invalidCVVNumber	=	'Por favor, introduzca el número correcto CVV.';
Localization.paymentProcessing.err.noAddress	=	'Debe introducir la dirección asociada a esta tarjeta para su procesamiento.';
Localization.paymentProcessing.err.noPostalCode	=	'Usted debe entrar en el zip / código postal asociado a esta tarjeta para su procesamiento.';
Localization.paymentProcessing.err.successButNoEmail	=	'El pago realizado, pero no podía enviarle por correo electrónico un recibo.';
Localization.paymentProcessing.err.successButNoCheckoutFolio	=	'El pago tuvo éxito, pero no pudo cerrar su folio.';
Localization.paymentProcessing.err.paymentFailed	=	'No se puede procesar el pago.';
Localization.paymentProcessing.err.requiredInfo	=	'(Los campos marcados con * son obligatorios.)';
Localization.newUser.newsletter	=	'Boletín de noticias';
Localization.newUser.subscribeNewsletter	=	'Por favor, no me envíe mensajes de correo electrónico de marketing. (Emails transaccionales relacionadas con su cuenta seguirán siendo enviado.)';
Localization.newUser.success	=	'Tu cuenta ha sido creada con éxito!';
Localization.newUser.language = 'Idioma';
Localization.roomReservation.datesAndOccupants.infantsOccupantsLabel	=	'Los bebés';
Localization.roomReservation.datesAndOccupants.promoOccupantsLabel	=	'Código de promoción';
Localization.roomReservation.datesAndOccupants.moreLabel	=	'Más';
Localization.roomReservation.roomTypeSelection.roomTypeDescriptionLabel	=	'Descripción';
Localization.roomReservation.roomTypeSelection.roomTypeRateLabel	=	' / Noche (media)';
Localization.roomReservation.roomTypeSelection.roomRateLabel	=	'Tarifa media por noche';
Localization.roomReservation.roomTypeSelection.roomTotalLabel	=	'antes de que las tasas e impuestos';
Localization.roomReservation.marketing	=	{};
Localization.roomReservation.marketing.bannerMessage	=	'Póngase cómodo';
Localization.roomReservation.cancelConfirm	=	'¿Está seguro que desea cancelar';
Localization.roomReservation.getPMSVenues	=	{};
Localization.roomReservation.getPMSVenues.title	=	'Lugar';
Localization.roomReservation.getPMSVenues.instructions	=	'Elija un lugar para reservar su habitación';
Localization.roomReservation.getPMSVenues.label	=	'Nombre y Ciudad';
Localization.roomReservation.getPMSVenues.err	=	{};
Localization.roomReservation.getPMSVenues.err.venueRequired	=	'Por favor, seleccione un lugar';
Localization.roomReservation.confirmation.infantTotalLabel	=	'Bebés:';
Localization.spaBooking.marketing	=	{};
Localization.spaBooking.marketing.bannerMessage	=	'Prepárese para ser mimado';
Localization.spaBooking.locationSelection.err.noLocation	=	'Lo sentimos, no hemos podido acceder a la lista de ubicaciones de spa en este momento.';
Localization.spaBooking.categorySelection	=	{};
Localization.spaBooking.categorySelection.selectClass	=	'Spa de clase';
Localization.spaBooking.categorySelection.selectService	=	'Servicio de Spa';
Localization.spaBooking.categorySelection.title	=	'Categoría Selección';
Localization.spaBooking.categorySelection.instructions	=	'¿Quieres reservar un servicio de spa o unirse a una de nuestras clases de Spa?';
Localization.spaBooking.categorySelection.locationLabel	=	'Categoría';
Localization.spaBooking.categorySelection.emptyText	=	'Seleccione una categoría ...';
Localization.spaBooking.categorySelection.unselectText	=	'Por favor, elija una categoría';
Localization.spaBooking.classSelection	=	{};
Localization.spaBooking.classSelection.title	=	'Selección de Clases';
Localization.spaBooking.classSelection.instructions	=	'Selecciona una fecha de primera';
Localization.spaBooking.classSelection.classNameLabel	=	'Clase';
Localization.spaBooking.classSelection.startTimeLabel	=	'Hora de inicio';
Localization.spaBooking.classSelection.numClasses	=	'N º de Clases';
Localization.spaBooking.classSelection.err	=	{};
Localization.spaBooking.classSelection.classFull	=	'La clase está llena, por favor elija otra clase';
Localization.spaBooking.classSelection.err.conflictBooking	=	'Ha reservado un servicio o una clase al mismo tiempo que antes, por favor reservar en otro momento';
Localization.spaBooking.classSelection.classNotAvail	=	'No hay clases programadas en esta fecha. Por favor, elija otra fecha.';
Localization.spaBooking.serviceSelection.minutesLabel=		'minutos';
Localization.spaBooking.serviceSelection.sameGender	=	'Este servicio requiere que el proveedor de servicios y del destinatario';
Localization.spaBooking.serviceSelection.otherNameRequired	=	'Por favor, introduzca el nombre del destinatario del servicio.';
Localization.spaBooking.serviceSelection.otherName	=	'Servicio de destinatarios';
Localization.spaBooking.serviceSelection.otherNameLabel	=	'Servicio del destinatario';
Localization.spaBooking.serviceSelection.meLabel	=	'Me';
Localization.spaBooking.serviceSelection.someoneLabel	=	'Alguien más';
Localization.spaBooking.serviceSelection.moreOptions = 'Más opciones';
Localization.spaBooking.serviceSelection.recipGenderRequired	=	'Por favor, introduzca el servicio destinatario';
Localization.spaBooking.serviceSelection.sameGenderLabel	=	'Servicio del destinatario';
Localization.spaBooking.serviceSelection.checkAvailability	=	'Comprobar disponibilidad';
Localization.spaBooking.confirmation.serviceTotalLabel	=	'El precio total:';
Localization.spaBooking.confirmation.makeBookingButtonLabel	=	'Libro';
Localization.spaBooking.confirmation.genderLabel	=	'Género';
Localization.spaBooking.confirmation.overbookGuestTooltip	=	'Introduzca el nombre del invitado que va a recibir este servicio.';
Localization.spaBooking.confirmation.successfullBookingMessage	=	'Transacción añadido correctamente a su carrito. Puede seguir comprando haciendo clic en uno de los botones de servicios anteriores.';
Localization.spaBooking.confirmation.successfullRemovingMessage	=	'El artículo ha sido retirado de su carro. Puede seguir comprando haciendo clic en uno de los botones de servicios anteriores.';
Localization.spaBooking.confirmation.typeGuestNameHint	=	'Escriba el invitado de';
Localization.spaBooking.confirmation.additionalClasses	=	'Las clases adicionales';
Localization.spaBooking.confirmation.additionalClassesPartOfProgram	=	'Las siguientes clases también se pueden reservar para usted:';
Localization.spaBooking.confirmation.err.overbookModeNotDefined	=	'No requiere configuración overbooking definido';
Localization.spaBooking.confirmation.err.overbookWarning	=	'Esto entra en conflicto con otro de reserva de reserva. Haga clic en Aceptar si desea continuar, haga clic en Cancelar para abortar.';
Localization.spaBooking.confirmation.err.serviceNoLongerAvailableMessage	=	'El tiempo seleccionado ya no está disponible! Por favor, haga clic en el botón de spa libro para empezar de nuevo.';
Localization.giftCertificate.itemSoldOut	=	'El artículo ha sido vendido';
Localization.golf.continueButton	=	'Consulte los horarios disponibles camisetas';
Localization.golf.makeBookingButton	=	'Hacer reservas';
Localization.golf.confirmGolfBooking	=	'Confirmación de Golf';
Localization.golf.backToQueryButton	=	'Espalda';
Localization.golf.successfullBookingMessage	=	'Su reserva Tee Time ha sido registrada en nuestros sistemas.';
Localization.golf.confirmation.teeTimeLabel	=	'Tee Time:';
Localization.golf.error.noLocations	=	'No se puede recuperar la lista de Golf Ubicación.';
Localization.golf.error.zeroLocations	=	'No se puede recuperar los Lugares de golf.';
Localization.golf.error.zeroCourses	=	'No hay campos de golf disponibles en esta ubicación';
Localization.golf.error.zeroTeeTime	=	'No hay horarios de salida disponibles en la fecha especificada';
Localization.golf.error.zeroRates	=	'No hay tarifas de golf están a su disposición en la fecha especificada';
Localization.golf.error.noRates	=	'No se puede recuperar tasas de golf de la fecha especificada';
Localization.golf.error.noBooking	=	'Lo sentimos, no pudimos grabar su reserva Tee Time en nuestros sistemas en este momento.';
Localization.bookingSummary.marketing	=	{};
Localization.bookingSummary.marketing.bannerMessage	=	'Estamos encantados de responder a sus necesidades';
Localization.bookingSummary.cartEmpty	=	'No se puede pago y envío al carrito está vacío.';
Localization.bookingSummary.noItemSelected	=	'Seleccione un elemento para eliminar.';
Localization.bookingSummary.clearCart	=	'Resumen de Reservas claro.';
Localization.bookingSummary.clearCartInstructions	=	'¿Quieres empezar de nuevo?';
Localization.bookingSummary.clearCartFail	=	'No se puede eliminar este tema de su resumen de la reserva.';
Localization.bookingSummary.grid.webFolioLabel	=	'Web Folio #';
Localization.bookingSummary.grid.folioIdLabel	=	'Folio #';
Localization.bookingSummary.grid.folioItemIdLabel	=	'FolioItem #';
Localization.bookingSummary.grid.amountLabel	=	'Fuerte cantidad';
Localization.bookingSummary.grid.guestNameLabel	=	'Nombre del Invitado';
Localization.general.contactingServer = 'Contacting Server...';


Localization.bookingSummary.cartName	=	'Reservas Resumen';
Localization.bookingSummary.clearCart	=	'Resumen de Reservas claro.';
Localization.bookingSummary.clearCartFail	=	'No se puede eliminar este tema de su resumen de la reserva.';
Localization.bookingSummary.clearCartInstructions	=	'¿Quieres empezar de nuevo?';
Localization.bookingSummary.grid.amountLabel	=	'Fuerte cantidad';
Localization.bookingSummary.marketing	=	{};
Localization.bookingSummary.marketing.bannerMessage	=	'Estamos encantados de responder a sus necesidades';
Localization.bookingSummary.removeSelected	=	'Eliminar este producto';
Localization.general.err.emailErrExist	=	'Esta dirección de correo electrónico ya está registrada en el sistema! Restablecer la contraseña, haga clic en \ ¿Olvidó';
Localization.general.err.emailErrNotExist	=	'Esta dirección de correo electrónico no existe en el sistema! Crear una nueva cuenta haciendo clic en \ Nueva';
Localization.general.features.spaName	=	'Spa de libros, clases o actividades';
Localization.general.features.intro = 'se complace en ofrecer los siguientes servicios en línea';
Localization.general.features.title= 'Por favor, elija';
Localization.general.language	=	'Lengua';
Localization.general.login.alreadyLoggedIn	=	'Usted está actualmente conectado pulg';
Localization.general.login.logoutButtonLabel	=	'Finalizar la sesión';
Localization.general.maintenance.folioTimeOutWarning	=	'Su sesión se cerrará automáticamente si usted no \ t';
Localization.general.processingMessage	=	'Por favor espere, estamos procesando su petición.';
Localization.giftCertificate.customGiftCertificate.pickupText	=	'Su certificado estará disponible para recoger en nuestras oficinas dentro de pocos días.';
Localization.golf.confirmation.courseLabel	=	'Curso:';
Localization.golf.continueButton	=	'Consulte los horarios disponibles camisetas';
Localization.golf.error.noBooking	=	'Lo sentimos, no pudimos grabar su reserva Tee Time en nuestros sistemas en este momento.';
Localization.golf.error.noCourses	=	'No se puede recuperar campos de golf para esta ubicación';
Localization.golf.error.noLocations	=	'No se puede recuperar la lista de Golf Ubicación.';
Localization.golf.error.noRates	=	'No se puede recuperar tasas de golf de la fecha especificada';
Localization.golf.error.noTeeTime	=	'No se puede recuperar horas de salida para la fecha especificada';
Localization.golf.error.zeroCourses	=	'No hay campos de golf disponibles en esta ubicación';
Localization.golf.error.zeroLocations	=	'No se puede recuperar los Lugares de golf.';
Localization.golf.error.zeroRates	=	'No hay tarifas de golf están a su disposición en la fecha especificada';
Localization.golf.error.zeroTeeTime	=	'No hay horarios de salida disponibles en la fecha especificada';
Localization.golf.marketing	=	{};
Localization.golf.marketing.bannerMessage	=	'Muy por encima de la par';
Localization.golf.successfullBookingMessage	=	'Su reserva Tee Time ha sido registrada en nuestros sistemas.';
Localization.newUser.newsletter	=	'Boletín de noticias';
Localization.newUser.sectionAddressTitleMan	=	'Dirección (* Obligatorio)';
Localization.newUser.subscribeNewsletter	=	'Suscríbete a nuestro boletín electrónico.';
Localization.newUser.success	=	'Tu cuenta ha sido creada con éxito!';
Localization.paymentProcessing.err.pastExpiryDate	=	'Tarjeta de crédito la fecha de caducidad debe ser en el futuro';
Localization.paymentProcessing.err.paymentFailed	=	'No se puede procesar el pago.';
Localization.paymentProcessing.err.requiredInfo	=	'(Los campos marcados con * son obligatorios.)';
Localization.paymentProcessing.err.successButNoCheckoutFolio	=	'El pago tuvo éxito, pero no pudo cerrar su folio.';
Localization.paymentProcessing.err.successButNoEmail	=	'El pago realizado, pero no podía enviarle por correo electrónico un recibo.';
Localization.paymentProcessing.expiryMonthBlank	=	'Mes';
Localization.paymentProcessing.expiryYearBlank	=	'AAAA';
Localization.paymentProcessing.zipLabel	=	'Zip / Código Postal';
Localization.roomReservation.confirmation.infantTotalLabel	=	'Bebés:';
Localization.roomReservation.confirmation.instructions	=	'Compruebe que los datos de reserva es correcta. Al hacer clic en Libro añade que esta reserva de su resumen de la reserva.';
Localization.roomReservation.datesAndOccupants.err.adultsMin	=	'Por lo menos un adulto es siempre necesaria.';
Localization.roomReservation.datesAndOccupants.infantsOccupantsLabel	=	'Los bebés';
Localization.roomReservation.datesAndOccupants.moreLabel	=	'Más';
Localization.roomReservation.datesAndOccupants.promoOccupantsLabel	=	'Código de promoción';
Localization.roomReservation.marketing	=	{};
Localization.roomReservation.marketing.bannerMessage	=	'Póngase cómodo';
Localization.roomReservation.packageSelection.instructions	=	'Seleccionar un paquete. Haga clic en cada nombre de paquete para ver detalles adicionales.';
Localization.roomReservation.roomTypeSelection.instructions	=	'Seleccione el tipo de habitación. Precio indicado es tarifa promedio por habitación por noche.';
Localization.roomReservation.roomTypeSelection.roomNumber	=	'Número de habitaciones';
Localization.roomReservation.roomTypeSelection.roomRateLabel	=	'Tarifa media por noche';
Localization.roomReservation.roomTypeSelection.roomSelection	=	'Sala de Selección';
Localization.roomReservation.roomTypeSelection.roomTotalLabel	=	'antes de que las tasas e impuestos';
Localization.roomReservation.roomTypeSelection.roomTypeRateLabel	=	' / Noche (media)';
Localization.spaBooking.categorySelection.instructions	=	'¿Quieres reservar un servicio de spa o unirse a una de nuestras clases de Spa?';
Localization.spaBooking.categorySelection.selectClass	=	'Spa de clase';
Localization.spaBooking.categorySelection.selectService	=	'Servicio de Spa';
Localization.spaBooking.classSelection.classNotAvail	=	'No hay clases programadas en esta fecha. Por favor, elija otra fecha.';
Localization.spaBooking.confirmation.additionalClasses	=	'Las clases adicionales';
Localization.spaBooking.confirmation.additionalClassesPartOfProgram	=	'Las siguientes clases también se pueden reservar para usted:';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveExisting	=	'Reserva existente:';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveMessage	=	'Por favor elija otro momento de esta reserva, o visite su resumen de la reserva para retirar la reserva existente.';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveTitle	=	'Ya ha sido reservado para un servicio de spa a la hora seleccionada.';
Localization.spaBooking.confirmation.serviceClassesLabel	=	'Número de clases:';
Localization.spaBooking.confirmation.servicePerClassLabel	=	'por clase';
Localization.spaBooking.confirmation.serviceStartDateLabel	=	'Fecha de inicio:';
Localization.spaBooking.confirmation.serviceTotalLabel	=	'El precio total:';
Localization.spaBooking.locationSelection.err.noLocation	=	'Lo sentimos, no hemos podido acceder a la lista de ubicaciones de spa en este momento.';
Localization.spaBooking.marketing	=	{};
Localization.spaBooking.marketing.bannerMessage	=	'Prepárese para ser mimado';
Localization.spaBooking.serviceSelection.checkAvailability	=	'Comprobar disponibilidad';
Localization.spaBooking.serviceSelection.err.dateRequired	=	'Por favor, seleccione la primera cita.';
Localization.spaBooking.serviceSelection.err.noService	=	'Lo sentimos, no hemos podido acceder a la lista de los servicios de spa en este momento.';
Localization.spaBooking.serviceSelection.instructions	=	'Por favor, elija una fecha y hora para su servicio a continuación, seleccione Libro en el servicio deseado a continuación:';
Localization.spaBooking.serviceSelection.minutesLabel	=	'minutos';
Localization.general.contactingServer = 'Contacto con el servidor ...';

 Localization.general.location = {}
 Localization.general.location.phone  = 'ES:  Call';
 Localization.general.location.website  = 'ES:  Website';
 Localization.general.err.timeoutContinue  = 'ES:  You can start a new session by clicking the button below.';
 Localization.general.err.checkedoutTitle  = 'ES:  Your reservation has been successfully completed';
 Localization.general.err.checkedoutText  = 'ES:  The items in your booking summary have been sucessfully recorded in our systems.';
 Localization.general.err.checkedoutContinue  = 'ES:  You can continue to make additional bookings by clicking the button below.';
 Localization.general.err.restartSession  = 'ES:  Cannot restart server session...';
 Localization.general.err.startSession  = 'ES:  Cannot start new server session...';
 Localization.general.err.serverOffline  = 'ES:  Server is Offline...';
 Localization.general.err.serverError  = 'ES:  (Server error)';
 Localization.general.err.startOver  = 'ES:  Start Over';
 Localization.general.login.logoutWarning  = 'ES:  If you log out then all of the items in your Booking Summary will be discarded. Do you really want to log out?';
 Localization.newUser.addressType  = 'ES:  Address Type';
 Localization.newUser.fail  = 'ES:  Could not create new user account.';
 Localization.newUser.updateSessionFailed  = 'ES:  We created your user account but had trouble updating your Booking Summary contents (if any). You may need to reload this page.';
 Localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed  = 'ES:  Unable to retrieve Hotel Venue list.';
 Localization.roomReservation.datesAndOccupants.err.pmsRoomTypesFailed  = 'ES:  Unable to retrieve Hotel Room Type list.';
 Localization.roomReservation.datesAndOccupants.err.pmsRoomsFailed  = 'ES:  Unable to retrieve Hotel Room list.';
 Localization.roomReservation.datesAndOccupants.err.pmsBookingFailed  = 'ES:  Unable to book room.';
 Localization.spaBooking.classSelection.dateTo  = 'ES:  to';
 Localization.spaBooking.classSelection.room  = 'ES:  Room';
 Localization.spaBooking.classSelection.availableSlots  = 'ES:  Number of available slots';
 Localization.spaBooking.classSelection.err.classListFailed  = 'ES:  Sorry, we were unable to access the list of Spa Classes at this time.';
 //Localization.spaBooking.confirmation.err.conflictingBookingsRemoveMessage  = 'ES:  Do you want to replace the existing booking with this one?';
 Localization.spaBooking.confirmation.err.createTempUserFailed  = 'ES:  Sorry, we could not start your Booking at this time.';
 Localization.spaBooking.confirmation.err.checkConflictingFailed  = 'ES:  Sorry, we could not confirm parameters for your Booking at this time.';
 Localization.spaBooking.confirmation.err.createBookingFailed  = 'ES:  Sorry, we could not record your Booking in our systems at this time.';
 Localization.giftCertificate.failedPurchase  = 'ES:  Unable to process gift certificate.';
 Localization.golf.dateInstructions  = 'ES:  Please select a date first';
 Localization.golf.on  = 'ES:  on';
 Localization.golf.areYouAMember  = 'ES:  Are you a member?';
 Localization.golf.loginToReceive  = 'ES:  To receive member pricing, please';
 Localization.golf.error.date  = 'ES:  Please pick a date first.';
 Localization.bookingSummary.addMore  = 'ES:  Add More Services';
 Localization.bookingSummary.addMoreSlogan  = 'ES:  Make your Booking even more memorable';
 Localization.bookingSummary.roomReservationAt  = 'ES:  Room Reservation at';
 Localization.bookingSummary.spaServiceFrom  = 'ES:  Spa Service from';
 Localization.bookingSummary.issuedBy  = 'ES:  Issued by';
 Localization.bookingSummary.teetimeAt  = 'ES:  Tee Time at';
 Localization.bookingSummary.player  = 'ES:  Player';
 Localization.bookingSummary.players  = 'ES:  Players';
 Localization.bookingSummary.depositPerPlayer  = 'ES:  Deposit per Player';
 Localization.bookingSummary.paymentTitle  = 'ES:  Payment Method';
 Localization.bookingSummary.paymentInstruction  = 'ES:  Finalize your Booking by selecting your payment type below';
 Localization.bookingSummary.totalDeposit  = 'ES:  Pay Total Deposit of';
 Localization.bookingSummary.using  = 'ES:  using';
 Localization.bookingSummary.creditCard  = 'ES:  Credit Card';
 Localization.bookingSummary.payPal  = 'ES:  PayPal';
 Localization.general.err.defaultErr1  = 'ES:  Error processing your request. Please contact customer service.';
 Localization.general.err.invalidSessionTitle  = 'ES:  BROWSER ERROR';
 Localization.paymentProcessing.cvvButton  = 'ES:  What is CVV?';
 Localization.paymentProcessing.err.invalidCardNumber  = 'ES:  Please Enter correct Credit Card Number.';
 Localization.spaBooking.confirmation.serviceProgramLabel  = 'ES:  Program:';
    Localization.general.copyright= 'ES: Copyright &copy; 2012';
    Localization.general.termsText= 'ES: Terms and Conditions';
    Localization.general.termsLink= 'legal.html';
    Localization.giftCertificate.marketing = {};
    Localization.giftCertificate.marketing.bannerMessage = 'ES: Give and Delight';


Localization.roomReservation.calendar = {};
Localization.roomReservation.calendar.clickContinueToProceed = 'ES:Click the Continue button below to proceed with your booking.';
Localization.roomReservation.calendar.dateUnavailable = 'ES:Date Unavailable';
Localization.roomReservation.calendar.limitedAvailabilityFrom = 'ES:Limited availability from ';
Localization.roomReservation.calendar.limitedAvailability = 'ES:Limited availability';
Localization.roomReservation.calendar.lowAvailability = 'ES:Low Availability';
Localization.roomReservation.calendar.nextStep = 'ES:Next Step:';
Localization.roomReservation.calendar.noDescriptionAvailable = 'ES:No description available.';
Localization.roomReservation.calendar.noRoomsAvailable = 'ES:No rooms available';
Localization.roomReservation.calendar.noRoomsAvailableNoAction = 'ES: Sorry, your stay cannot start on this date. <br><br>Please select another check-in date.';
Localization.roomReservation.calendar.noRoomsAvailableAction = 'ES: Your stay cannot start on this date. <br><br>However, you can check out on this date.';
Localization.roomReservation.calendar.roomsAvailableFrom = 'ES:Rooms available from ';
Localization.roomReservation.calendar.roomsAvailable= 'ES:Rooms available ';
Localization.roomReservation.calendar.selectArrivalDateButton = 'ES:Select this<br>Arrival Date';
Localization.roomReservation.calendar.selectArrivalDateOnCalendar = 'ES:Select your Arrival Date on the calendar above.';
Localization.roomReservation.calendar.selectDepartureDateButton = 'ES:Select this<br>Departure Date';
Localization.roomReservation.calendar.selectDepartureDateOnCalendar = 'ES:Select your Departure Date on the calendar above.';
Localization.roomReservation.calendar.selectedStayDates = 'ES:Selected Stay Dates';
Localization.roomReservation.calendar.notAvailable = 'ES:N/A';
Localization.roomReservation.roomTypeSelection.roomTypeTotalRateLabel = '';

Localization.bookingSummary.selectedUpgrades  = 'ES:Selected Upgrades:';
Localization.bookingSummary.perNight  = 'ES:Per Night';
Localization.bookingSummary.removeUpgrade  = 'ES:Remove Upgrade';
Localization.bookingSummary.time  = 'ES:Time:';
Localization.bookingSummary.add  = 'ES:Add';
Localization.bookingSummary.grid.addUpgrade  = 'ES:Add an Upgrade to your Reservation';

Localization.bookingSummary.grid.totalAmountLabel  = 'ES:Total Amount';
Localization.bookingSummary.grid.depositAmountLabel  = 'ES:Deposit Due Today';

Localization.bookingSummary.creditCardGuarantee = 'ES: Confirm Now';
Localization.bookingSummary.paymentGuarantee = 'Una tarjeta de crédito válida es necesaria para garantizar su reserva. Su tarjeta no será facturado en este momento.';
Localization.bookingSummary.tryAgain = 'Por favor, inténtelo de nuevo.';
Localization.bookingSummary.upgradeConfirmation = 'Su actualización ha sido añadido a su reserva.';
Localization.bookingSummary.upgradeError = 'No se puede agregar esta actualización a su reserva.';

Localization.bookingSummary.guaranteeTitle  = 'Método de garantía';
Localization.bookingSummary.selectUpgrade  = 'ES: Select an Upgrade...';

Localization.roomReservation.specialService = {};
Localization.roomReservation.specialService.add  = 'ES: Add';
Localization.roomReservation.specialService.addUpgrade  = 'ES: Add an Upgrade to your Reservation';
Localization.roomReservation.specialService.category  = 'ES: Category';
Localization.roomReservation.specialService.invalidDateFormat  = 'ES: Invalid Date Format';
Localization.roomReservation.specialService.name  = 'ES: Special Service';
Localization.roomReservation.specialService.selectUpgradeDate  = 'ES: Select Date for Upgrade';
Localization.roomReservation.specialService.unselectText  = 'ES: Please choose a category';

Localization.spaBooking.pmsbeforespa.needReservation  = 'Need reservation at';
Localization.spaBooking.pmsbeforespa.on  = 'on';

Localization.general.login.addGroupMember = 'ES: Add Group Member';
Localization.general.login.returnToProfileLabel = 'ES: Return to Guest Profile';
Localization.paymentProcessing.analyticsCustomTemplate = '';
Localization.newUser.successMember = 'ES: Thank you, we have created the Family Group member account.';

Localization.bookingSummary.skiTicketsFor = 'ES: Ski Tickets at';
Localization.bookingSummary.skiTickets = 'ES: Ski Tickets';
Localization.general.features.skiName = 'ES: Purchase Ski Lift Tickets';
Localization.general.login.familyGroupTitle = 'ES: Family Group Members';
Localization.general.login.guestName = 'ES: Guest Name:';
Localization.general.login.profileLabel = 'ES: Guest Profile';
Localization.general.login.editProfileLabel = 'ES: Edit Profile';
Localization.general.login.viewProfileLabel = 'ES: View Profile';
Localization.general.login.phoneNumber = 'ES: Phone Number:';
Localization.general.login.relationshipLabel = 'ES: Relationship:';
Localization.general.login.sectionNameTitle = 'ES: Name';
Localization.newUser.addressTypeHome = 'ES: Home Address';
Localization.newUser.addressTypeOther = 'ES: Other Address';
Localization.newUser.failUpdate = 'ES: Could not update user account.';
Localization.newUser.skiSettings = {}
Localization.newUser.skiSettings.title = 'ES: Skiing Details';
Localization.newUser.skiSettings.skiSize = 'ES: Ski Size';
Localization.newUser.skiSettings.skiBootSize = 'ES: Ski Boot Size';
Localization.newUser.skiSettings.snowboardSize = 'ES: Snowboard Size';
Localization.newUser.skiSettings.snowboardBootSize = 'ES: Snowboard Boot Size';
Localization.newUser.skiSettings.dinNumber = 'ES: DIN Number';
Localization.newUser.skiSettings.age = 'ES: Age';
Localization.newUser.skiSettings.weight = 'ES: Weight';
Localization.newUser.skiSettings.height = 'ES: Height';
Localization.newUser.successMember = 'ES: Thank you, we have created the Family Group member account.';
Localization.newUser.successUpdate = 'ES: Thank you, we have successfully updated your account.';
Localization.newUser.updateButtonLabel = 'ES: Update';
Localization.ski = {}
Localization.ski.customerCustomTextHeader = 'ES: ';
Localization.ski.customerCustomTextFooter = 'ES: ';
Localization.ski.location = 'ES: Location';
Localization.ski.err = {};
Localization.ski.err.createBookingFailed = 'ES: Sorry, we could not record your Lift Ticket purchase in our systems at this time.';
Localization.ski.err.createBookingFailedLimitExceeded = 'ES: The sale of this item exceeds the absolute limit for promotional purchases by this customer.';
Localization.ski.err.mismatchedProperty = 'ES: Sorry, the Ski Location you selected is not available because you already have an item in your Booking Summary from a different Property. Please complete your reservation or remove the item(s) from the other Property; you will then be able to make a reservation at this Ski Location.';
Localization.ski.err.noLocationsAtProperty = 'ES: Sorry, we are unable to show you any Ski Locations because there are no Ski Locations at the propery from which you have items in your Booking Summary. Please complete your reservation or remove the item(s) from the other Property; you will then be able to make a reservation at a Ski Location.';
Localization.ski.err.noLocation = 'ES: Sorry, we were unable to access the list of Ski Locations at this time.';
Localization.ski.err.dateRequired = 'ES: Please select a Date first.';
Localization.ski.err.noAvailableItems = 'ES: Sorry, there is no availability on the date you searched.';
Localization.ski.err.locationClosed = 'ES: Sorry, this location is closed from <%= closeBeginDate %> and will re-open on <%= closeEndDate %>.';
Localization.ski.err.locationClosedNoDate = 'ES: Sorry, this location is closed on the date you searched.';
Localization.ski.err.noService = 'ES: Sorry, we were unable to access the list of Ski Lift Tickets at this time.';
Localization.ski.instructions = 'ES: Choose a location from which to purchase a Ski Lift Ticket.';
Localization.ski.instructionsTickets = 'ES: Pick a date and then choose a Lift Ticket to purchase from the categories below. ';
Localization.ski.marketing = {};
Localization.ski.marketing.bannerMessage = 'ES: Feel the excitement.';
Localization.ski.title = 'ES: Ski Lift Tickets';
Localization.ski.locationLabel = 'ES: Category';
Localization.ski.serviceTitle = 'ES: Lift Tickets';
Localization.ski.unselectText = 'ES: Please choose a category';
Localization.ski.at = 'ES:  at ';
Localization.ski.dateLabel = 'ES: Date';
Localization.ski.meLabel = 'ES: Me';
Localization.ski.minutesLabel = 'ES: minutes';
Localization.ski.ticketFor = 'ES: Ticket For:';
Localization.ski.purchaseButton = 'ES: Purchase';
Localization.ski.serviceNameLabel = 'ES: Service';
Localization.ski.someoneLabel = 'ES: Someone else';
Localization.ski.staffLabel = 'ES: Preferred Staff';
Localization.ski.subCategoryLabel = 'ES: Sub-Category: ';
Localization.ski.successfullBookingMessage = 'ES: Your Booking has been recorded in our systems.';
Localization.ski.timeLabel = 'ES: Time';
Localization.ski.promo = 'ES: Promo';

Localization.general.login.greeting = 'Bienvenido ';


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

    /**
     * Version: 1.0 Alpha-1
     * Build Date: 13-Nov-2007
     * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
     * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
     * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
     */
    Localization.CultureInfo = {
	/* Culture Name */
    name: "es-ES",
    englishName: "Spanish (Spain)",
    nativeName: "español (España)",

    /* Day Name Strings */
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    abbreviatedDayNames: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    shortestDayNames: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
    firstLetterDayNames: ["d", "l", "m", "m", "j", "v", "s"],

    /* Month Name Strings */
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    abbreviatedMonthNames: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],

	/* AM/PM Designators */
    amDesignator: "",
    pmDesignator: "",

    firstDayOfWeek: 1,
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
    dateElementOrder: "dmy",

    /* Standard date and time format patterns */
    formatPatterns: {
        shortDate: "dd/MM/yyyy",
        mediumDate: "d \\de MMM \\de yyyy",
        longDate: "dddd, dd \\de MMMM \\de yyyy",
        shortTime: "H:mm",
        longTime: "H:mm:ss",
        fullDateTime: "dddd, dd \\de MMMM \\de yyyy H:mm:ss",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "dd MMMM",
        yearMonth: "MMMM' de 'yyyy"
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
        jan: /^ene(ro)?/i,
        feb: /^feb(rero)?/i,
        mar: /^mar(zo)?/i,
        apr: /^abr(il)?/i,
        may: /^may(o)?/i,
        jun: /^jun(io)?/i,
        jul: /^jul(io)?/i,
        aug: /^ago(sto)?/i,
        sep: /^sep(tiembre)?/i,
        oct: /^oct(ubre)?/i,
        nov: /^nov(iembre)?/i,
        dec: /^dic(iembre)?/i,

        sun: /^do(m(ingo)?)?/i,
        mon: /^lu(n(es)?)?/i,
        tue: /^ma(r(tes)?)?/i,
        wed: /^mi(é(rcoles)?)?/i,
        thu: /^ju(e(ves)?)?/i,
        fri: /^vi(e(rnes)?)?/i,
        sat: /^sá(b(ado)?)?/i,

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

    abbreviatedTimeZoneStandard: { GMT: "-000", EST: "-0400", CST: "-0500", MST: "-0600", PST: "-0700" },
    abbreviatedTimeZoneDST: { GMT: "-000", EDT: "-0500", CDT: "-0600", MDT: "-0700", PDT: "-0800" }

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



    return Localization;
})
