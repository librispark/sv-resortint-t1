define(['jquery','jquery_validate'], function ($) {
// Resource file for all display text in the application (French)
Localization = {};
Localization.siteName = "Le Spa de ResortSuite";
Localization.bookingSummary = {};
Localization.bookingSummary.addMore  = 'Ajouter plus de services';
Localization.bookingSummary.addMoreSlogan  = 'Faites votre réservation encore plus mémorable';
Localization.bookingSummary.cartName  = 'Résumé réservation';
Localization.bookingSummary.cartNoItems  = 'IL n\'y a pas d\'article dans votre panier pour le moment. Pour ajouter des éléments, choississez un de nos services ci-dessus.';
Localization.bookingSummary.cartTitle  = 'S\'il vous plaît prendre un moment pour examiner le contenu de votre réservation attentivement.';
Localization.bookingSummary.checkoutButton  = 'Confirm';
Localization.bookingSummary.checkoutInfo  = 'Cliquez ici pour confirmer les détails de votre réservation ci-dessus et compléter votre réservation.';
Localization.bookingSummary.checkoutInstruction  = 'Finalisez votre réservation.';
Localization.bookingSummary.checkoutTitle  = 'Confirmer la réservation';
Localization.bookingSummary.clearCart  = 'Résumé Réservation effacer';
Localization.bookingSummary.clearCartFail  = 'Impossible de supprimer cet article de synthèse réservation.';
Localization.bookingSummary.clearCartInstructions  = 'Voulez-vous recommencer?';
Localization.bookingSummary.creditCard  = 'Carte de crédit.';
Localization.bookingSummary.depositPerPlayer  = 'Dépôt par joueur.';
Localization.bookingSummary.grid = {};
Localization.bookingSummary.grid.amountLabel  = 'Montant du dépôt';
Localization.bookingSummary.guaranteeTitle  = 'Méthode de garantie';
Localization.bookingSummary.issuedBy  = 'Publié par';
Localization.bookingSummary.marketing = {};
Localization.bookingSummary.marketing.bannerMessage  = 'Nous sommes ravis de répondre à vos besoins';
Localization.bookingSummary.orderTotal  = 'Total de la commande ';
Localization.bookingSummary.paymentInstruction  = 'Finalisez votre réservation en choisissant votre mode de paiement ci-dessous.';
Localization.bookingSummary.paymentTitle  = 'Mode de paiement.';
Localization.bookingSummary.payPal  = 'PayPal';
Localization.bookingSummary.player  = 'Joueur';
Localization.bookingSummary.players  = 'Joueurs';
Localization.bookingSummary.removeSelected  = 'Supprimer';
Localization.bookingSummary.roomReservationAt  = 'Réservation d\'une chambre à';
Localization.bookingSummary.spaServiceFrom  = 'Service de spa à partir de';
Localization.bookingSummary.teetimeAt  = 'L\'heure de golf';
Localization.bookingSummary.totalDeposit  = 'Payer un dépôt total de';
Localization.bookingSummary.tryAgain = 'S\'il vous plaît essayez de nouveau.';
Localization.bookingSummary.upgradeConfirmation = 'Votre mise à niveau a été ajouté à votre réservation.';
Localization.bookingSummary.upgradeError = 'Impossible d\'ajouter cette mise à jour de votre réservation.';
Localization.bookingSummary.using  = 'utilisantion ';
Localization.club = {};
Localization.club.account = 'compte';
Localization.club.accountBalance = 'Solde du compte';
Localization.club.accountDetails = 'Détails du compte';
Localization.club.accountMembers = 'Membres du compte';
Localization.club.accountOwner = 'titulaire du compte';
Localization.club.accounts = 'Comptes';
Localization.club.accountType = 'Type de compte';
Localization.club.accountList = 'Liste des comptes';
Localization.club.address = 'adresse';
Localization.club.amount = 'Montant';
Localization.club.charges = 'Frais';
Localization.club.date = 'Date';
Localization.club.description = 'Description';
Localization.club.effectiveDate = 'Entrée en vigueur';
Localization.club.expiryDate = 'Date d\'expiration';
Localization.club.fetchAccountsFail = 'Une erreur est survenue lors de la récupération des comptes.';
Localization.club.fetchStatementsFail = 'Une erreur est survenue lors de la récupération des relevés de compte.';
Localization.club.fetchTransactionsFail = 'Une erreur est survenue lors de la récupération des transactions de compte.';
Localization.club.payments = 'Paiements';
Localization.club.phone = 'Téléphone';
Localization.club.previousBalance = 'Solde précédent';
Localization.club.profile = 'profil';
Localization.club.statementPeriod = 'Période de déclaration';
Localization.club.statements = 'Déclarations';
Localization.club.status = 'Status';
Localization.club.member = 'membres';
Localization.club.memberId = 'Id membre';
Localization.club.memberLevel = 'Niveau de membres';
Localization.club.memberLevelNA = 'N / A';
Localization.club.memberName = 'Nom';
Localization.club.membership = 'adhésion';
Localization.club.memberships = 'Membre';
Localization.club.myAccounts = 'Mes comptes';
Localization.club.newCharges = 'nouvelles accusations';
Localization.club.noMemberships = 'no adhésions';
Localization.club.noTransactions = 'no Transactions';
Localization.general = {};
Localization.general.applicationTitle  = 'ResortSuite Web';
Localization.general.contactingServer  = 'Contacter avec le serveur';
Localization.general.continueProcessButtonLabel  = 'Continuer';
Localization.general.copyright = 'Droits d\'auteur 2012';
Localization.general.currencyPrefix = '$';
Localization.general.currencyPostfix = '';
Localization.general.err = {};
Localization.general.err.checkedoutContinue = 'Vous pouves continuer à faire des réservations supplémentaires en cliquant sur le buton ci-dessous.';
Localization.general.err.checkedoutText  = 'Les articles dans votre résumé réservation ont été bien enregistrées dans nos systèmes.';
Localization.general.err.checkedoutTitle  = 'Votre réservation a été effectuée avec succès.';
Localization.general.err.defaultErr  = 'Erreur lors du traitement de votre demande. S.v.p., essayez de nouveau.';
Localization.general.err.emailErrExist  = 'Cette adresse email est déjà enregistrée dans le système. Réinitialiser votre mot de passe en cliquant sur ce bouton.';
Localization.general.err.emailErrNotExist  = 'Cette adresse email n\'existe pas dans le système. Créer un nouveau compte en cliquant sur \ nouvel utilisateur';
Localization.general.err.jquery_validate = {
    required: "Ce champ est requis.",
    remote: "Veuillez remplir ce champ pour continuer.",
    email: "Veuillez entrer une adresse email valide.",
    url: "Veuillez entrer une URL valide.",
    date: "Veuillez entrer une date valide.",
    dateISO: "Veuillez entrer une date valide (ISO).",
    number: "Veuillez entrer un nombre valide.",
    digits: "Veuillez entrer (seulement) une valeur numérique.",
    creditcard: "Veuillez entrer un numéro de carte de cré©dit valide.",
    equalTo: "Veuillez entrer une nouvelle fois la même valeur.",
    accept: "Veuillez entrer une valeur avec une extension valide.",
    maxlength: jQuery.validator.format("Veuillez ne pas entrer plus de {0} caractères."),
    minlength: jQuery.validator.format("Veuillez entrer au moins {0} caractères."),
    rangelength: jQuery.validator.format("Veuillez entrer entre {0} et {1} caractères."),
    range: jQuery.validator.format("Veuillez entrer une valeur entre {0} et {1}."),
    max: jQuery.validator.format("Veuillez entrer une valeur inférieure ou égale à {0}."),
    min: jQuery.validator.format("Veuillez entrer une valeur supérieure ou égale à {0}.")
};
Localization.general.err.restartSession  = 'Impossible de redémarrer la session serveur…';
Localization.general.err.serverOffline  = 'Serveur est hors ligne ...';
Localization.general.err.startOver  = 'Recommencer';
Localization.general.err.startSession  = 'Impossible de démarrer la session nouveau serveur.';
Localization.general.err.timeoutContinue = 'Vous pouvez commencer une nouvelle session en cliquant sur le bouton ci-dessous.';
Localization.general.err.timeoutText  = 'Votre session a pris fin en raison de l\'inactivité.';
Localization.general.err.timeoutTitle  = 'Votre session a expiré.';
Localization.general.features = {};
Localization.general.features.clubName = 'Afficher les relevés d\'adhésion';
Localization.general.features.giftCertificatesName  = 'Achat certificat-cadeau.';
Localization.general.features.golfName  = 'Réserver le golf';
Localization.general.features.intro  = 'est heureux de vous offrir les services en ligne suivants';
Localization.general.features.pmsName  = 'Réserver une chambre';
Localization.general.features.spaName  = 'Réserver le spa, les cours, ou des activités';
Localization.general.features.title = 'S\'il vous plaît Choisir';
Localization.general.gender = {};
Localization.general.gender.female  = 'Femme';
Localization.general.gender.male  = 'Homme';
Localization.general.gender.noPreference  = 'Pas de préférence.';
Localization.general.language = 'Langue';
Localization.general.location = {};
Localization.general.location.phone  = 'Téléphoner';
Localization.general.location.website  = 'Site Web';
Localization.general.login = {};
Localization.general.login.alreadyLoggedIn  = 'Vous êtes actuellement connecté';
Localization.general.login.changePassword = {};
Localization.general.login.changePassword.commitButton  = 'Changer';
Localization.general.login.changePassword.err = {};
Localization.general.login.changePassword.err.min8chars  = 'Mot de passe doit comporter au moins 8 caractères';
Localization.general.login.changePassword.err.passwordsDoNotMatch  = 'Nouveaux mots de passe doivent correspondre';
Localization.general.login.changePassword.err.resetFailed  = 'Impossible de modifier le mot de passe. Adresse email / mot de passe incorrect';
Localization.general.login.changePassword.title  = 'Changer mot de passe';
Localization.general.login.changePassword.updateSuccess  = 'Votre mot de passe a été mis à jour';
Localization.general.login.changePasswordButtonLabel  = 'Modifier votre mot de passe';
Localization.general.login.description  = 's\'il vous plaît connecter ci-dessous.Si vous êtes un nouveau client, s\'il vous plaît créer un profil en clquant "nouvel utilisateur"';
Localization.general.login.emailTitle  = 'Adressee-mail';
Localization.general.login.err = {};
Localization.general.login.err.invalidCredentials  = 'Désolé, nous n\'avons pu vpus identifier avec l\'adresse e-mail et mot de passe founi';
Localization.general.login.forgotPasswordButtonLabel  = 'oublier mot de passe';
Localization.general.login.greeting  = 'Bienvenu ';
Localization.general.login.loginButtonLabel  = 'Ouvriez une session';
Localization.general.login.logoutButtonLabel  = 'Déconnexion';
Localization.general.login.logoutWarning  = 'Si vous déconnetez, tous les éléments dans la résumé de votre réservation seront rejetées . Voulez-vous vraiment vous déconnecter? ';
Localization.general.login.newUserButtonLabel  = 'Nouvel utilisateur';
Localization.general.login.passwordReset = {};
Localization.general.login.passwordReset.cancelButtonLabel  = 'Annuler';
Localization.general.login.passwordReset.description  = 'Tapez votre adresses e-mail.';
Localization.general.login.passwordReset.emailLabel  = 'Adresse e-mail';
Localization.general.login.passwordReset.newPassword1Label  = 'Nouveau mot de passe';
Localization.general.login.passwordReset.newPassword2Label  = 'Confirmer mot de passe';
Localization.general.login.passwordReset.newPasswordEmailConfirmation  = 'Votre nouveau mot de passe a été envoyé à l\'adresse e-mail que vous nous avez donnée. ';
Localization.general.login.passwordReset.oldPasswordLabel  = 'Mot de passe courant';
Localization.general.login.passwordReset.resetButtonLabel  = 'Réinitialiser';
Localization.general.login.passwordReset.title  = 'Réinitialisez votre mot de passe';
Localization.general.login.passwordTitle  = 'Mot de passe ';
Localization.general.login.title  = 'Se connecter pour continuer';
Localization.general.maintenance = {};
Localization.general.maintenance.folioTimeOutWarning  = 'Votre session sera fermée automatiquement si vous ne prenez pas de mesures.';
Localization.general.maintenance.maintenanceMessage  = 'Le système sera fermé pour l\'entrentien pour environ';
Localization.general.maintenance.maintenanceMessageTimeUnit  = 'minutes.';
Localization.general.paymentCards = {};
Localization.general.paymentCards.amex  = 'American Express';
Localization.general.paymentCards.discover  = 'Discover';
Localization.general.paymentCards.masterCard  = 'MasterCard';
Localization.general.paymentCards.visa  = 'Visa';
Localization.general.processingMessage  = 'S\'il vous plaît attendre, nous traitons votre demande.';
Localization.general.progressIndicatorMessage  = 'Traitement';
Localization.general.salutation = {};
Localization.general.salutation.doctor  = 'Dr';
Localization.general.salutation.miss  = 'Mlle';
Localization.general.salutation.missus  = 'Mme';
Localization.general.salutation.mister  = 'M.';
Localization.general.salutation.misterAndMissus  = 'M. & Mme';
Localization.general.salutation.mizz  = 'Mme';
Localization.general.serviceButtonLabel  = 'Nos services ';
Localization.general.termsText = 'Termes et conditions';
Localization.giftCertificate = {};
Localization.giftCertificate.customerCustomTextHeader = '';
Localization.giftCertificate.customerCustomTextFooter = '';
Localization.giftCertificate.customGiftCertificate = {};
Localization.giftCertificate.customGiftCertificate.cityLabel  = 'Ville';
Localization.giftCertificate.customGiftCertificate.countryLabel  = 'Pays';
Localization.giftCertificate.customGiftCertificate.deliverVia  = 'Mode de livraison:';
Localization.giftCertificate.customGiftCertificate.emailAddressLabel  = 'Adresse e-mail';
Localization.giftCertificate.customGiftCertificate.expressLabel  = 'Livraison Express';
Localization.giftCertificate.customGiftCertificate.messageLabel  = 'Message';
Localization.giftCertificate.customGiftCertificate.pickupText  = 'Votre certificat sera disponible pour ramasser à notre emplacement dans quelques jours.';
Localization.giftCertificate.customGiftCertificate.pickupTitle  = 'Ramassage en Magasin';
Localization.giftCertificate.customGiftCertificate.postalAddressLabel  = 'Adresse Postale';
Localization.giftCertificate.customGiftCertificate.recipientNameLabel  = 'Nom du destinataire';
Localization.giftCertificate.customGiftCertificate.sendByEmailLabel  = 'Envoyer par e-mail';
Localization.giftCertificate.customGiftCertificate.sendByMailTitle  = 'Envoyer par Courrier';
Localization.giftCertificate.customGiftCertificate.stateLabel  = 'État/Province';
Localization.giftCertificate.customGiftCertificate.styleImgTitle  = 'Style de Certificat par Courriel';
Localization.giftCertificate.customGiftCertificate.zipLabel  = 'Code Postal';
Localization.giftCertificate.failedPurchase  = 'Impossible de traiter certificat-cadeau.';
Localization.giftCertificate.instructions  = 'Sélectionnez un certificat-cadeau dans la liste ci-dessous';
Localization.giftCertificate.marketing = {};
Localization.giftCertificate.marketing.bannerMessage  = 'Donner et ravira';
Localization.giftCertificate.successfullPurchase  = 'Votre certificat- cadeau a été crée dans nos systèmes.';
Localization.giftCertificate.title  = 'Achetez un certificat-cadeau.';
Localization.golf = {};
Localization.golf.areYouAMember  = 'Êtes- vous membre?';
Localization.golf.availableTeeTimeTitle  = 'Heuresde golf disponibles ';
Localization.golf.confirmation = {};
Localization.golf.confirmation.courseLabel  = 'Cours:';
Localization.golf.confirmation.locationLabel  = 'emplacement';
Localization.golf.confirmation.priceLabel  = 'Prix par joueur ';
Localization.golf.confirmation.rateLabel = 'Taux';
Localization.golf.confirmation.teeTimeLabel  = 'Heure de golf';
Localization.golf.confirmGolfBooking  = 'Confirmer la réservation de golf.';
Localization.golf.continueButton  = 'Vérifiez les heures de golf disponibles';
Localization.golf.customerCustomTextHeader = '';
Localization.golf.customerCustomTextFooter = '';
Localization.golf.dateInstructions  = 'S\'il vous plaît sélectionner une date en premier';
Localization.golf.dateLabel  = 'Date';
Localization.golf.dateTimePlayerTitle  = 'Date, heure et joueurs';
Localization.golf.error = {};
Localization.golf.error.date  = 'S\'il vous plaît sélectionner une date en premier';
Localization.golf.error.noBooking  = 'Désolé, nous n\'avons pas pu enregistrer votre réservation Tee Time dans nos systèmes à cette époque.';
Localization.golf.error.noCourses  = 'Aucun parcours disponible sur ce terrain.';
Localization.golf.error.noLocations  = 'Impossible de récupérer la liste empacement de Golf.';
Localization.golf.error.noRates  = 'Impossible de récupérer les tarifs de golf pour la date spécifiée';
Localization.golf.error.noTeeTime  = 'impossible derécupérer des Tee Times pour la date spécifiée ';
Localization.golf.error.zeroCourses  = 'Pas de terrains de golf disponibles à cet endroit';
Localization.golf.error.zeroLocations  = 'Impossible de récupérer les emplacements de golf.';
Localization.golf.error.zeroRates  = 'Aucune tarifs de golf sont à votre disposition à la date spécifiée';
Localization.golf.error.zeroTeeTime  = 'Pas de temps disponibles pour le golf à la date spécifiée';
Localization.golf.loginToReceive  = 'Pour recevoir des prix membre, s\'il vous plaît';
Localization.golf.marketing = {};
Localization.golf.marketing.bannerMessage  = 'Eh bien au dessus du pair';
Localization.golf.on  = 'sur';
Localization.golf.playersLabel  = 'Nombre de joueurs';
Localization.golf.selectCourse  = 'Choisir le parcours';
Localization.golf.selectCourseDefault  = 'Choisir un parcours';
Localization.golf.selectLocation  = 'Choisir le terrain';
Localization.golf.selectLocationDefault  = 'Choisir un terrain';
Localization.golf.successfullBookingMessage  = 'Votre réservation de golf a été enregistrée dans nos systèmes.';
Localization.golf.timeLabel  = 'Départ souhaité';
Localization.golf.title  = 'Réservation de golf';
Localization.newUser = {};
Localization.newUser.address1Title  = 'Adresse 1';
Localization.newUser.address2Title  = 'Adresse 2';
Localization.newUser.addressType  = 'Type d\'adresse';
Localization.newUser.cancelButtonLabel  = 'Annuler';
Localization.newUser.cityTitle  = 'Ville';
Localization.newUser.confirmEmailTitle  = 'Confirmez l\'adresse e-mail*';
Localization.newUser.confirmPasswordTitle  = 'Confirmez le mot de passe*';
Localization.newUser.contactInfoSectionTitle  = 'Informations de contact ( Indiquez au moins un numéro de téléphone * )';
Localization.newUser.countryTitle  = 'Pays';
Localization.newUser.createButtonLabel  = 'Créer';
Localization.newUser.description  = 'Ajouter un utilisateur est aussi simple que de remplir ce formulaire.';
Localization.newUser.emailTitle  = 'l\'adresse e-mail*';
Localization.newUser.fail = 'Impossible de créer un nouveau compte utilisateur';
Localization.newUser.firstNameTitle  = 'Prénom*';
Localization.newUser.genderTitle  = 'Sexe*';
Localization.newUser.homePhoneTitle  = 'Numéro de téléphone à la maison';
Localization.newUser.language = 'Langue';
Localization.newUser.lastNameTitle  = 'Nom de famille*';
Localization.newUser.mainPhoneHome  = 'Maison';
Localization.newUser.mainPhoneOther  = 'Autre';
Localization.newUser.mainPhoneTitle  = 'Numéro de téléphone principal';
Localization.newUser.mainPhoneWork  = 'Travail';
Localization.newUser.newsletter  = 'Bulletin d\'information';
Localization.newUser.otherPhoneTitle  = 'Autre numéro de téléphone';
Localization.newUser.passwordTitle  = 'Mot de passe* (Minimum de 8 caractères)';
Localization.newUser.postCodeTitle  = 'Code postal';
Localization.newUser.salutationTitle  = 'Titre*';
Localization.newUser.sectionAddressTitle  = 'Adresse (Optionnel)';
Localization.newUser.sectionAddressTitleMan  = 'Adresse (* obligatoire)';
Localization.newUser.sectionNameAndPasswordTitle  = 'Nom et mot de passe (obligatoire *)';
Localization.newUser.stateTitle  = 'état/Province';
Localization.newUser.subscribeNewsletter  = 'S\'il vous plaît, envoyez moi les courriels de marketing. (E-mails transactionnels concernant votre compte continueront à être envoyés.)';
Localization.newUser.success = 'Votre compte a été créé avec succès!';
Localization.newUser.title  = 'Ajouter un utilisateur';
Localization.newUser.updateSessionFailed  = 'Nous avons créer votre compte de utilisateur, mais avait du problème à mettre à jour le contenu de votre résumé de réservation ( si aucune). Vous devrez peut-être recharger cette page.';
Localization.newUser.workPhoneExtension  = 'Numéro d\'extension au travail';
Localization.newUser.workPhoneTitle  = 'Numéro de téléphone au travail';
Localization.paymentProcessing = {};
Localization.paymentProcessing.addressLabel  = 'Adresse';
Localization.paymentProcessing.addressLabel2  = 'Adresse deuxième ligne.';
Localization.paymentProcessing.cardHolderBlank  = 'Entrez le nom du détenteur de la carte ';
Localization.paymentProcessing.cardNumberBlank  = 'Entrez un numéro de carte ';
Localization.paymentProcessing.cardNumberLabel  = 'Numéro de carte ';
Localization.paymentProcessing.cardTypeLabel  = 'Type de carte ';
Localization.paymentProcessing.checkoutButtonLabel  = 'Caisse';
Localization.paymentProcessing.cvvLabel  = 'Code de sécurité (CVV) ';
Localization.paymentProcessing.err = {};
Localization.paymentProcessing.err.folioUnpaid  = 'Nous sommes désolé, le paiement est toujours nécessaire pour votre réservation.';
Localization.paymentProcessing.err.invalidCVVNumber  = 'S\'il vous plaît entrez le numéro correct CVV.';
Localization.paymentProcessing.err.invalidExpiryDate  = 'S\'il vous plaît entrez la date d\'expiration de carte de crédit.';
Localization.paymentProcessing.err.noAddress  = 'Vous devez entrer l\'adresse associée à cette carte pour le traitement.';
Localization.paymentProcessing.err.noCardHolderName  = 'Entrez le nom du détenteur de la carte.';
Localization.paymentProcessing.err.noPostalCode  = 'Vous devez entrer le code postal associé à cette carte pour le traitement.';
Localization.paymentProcessing.err.pastExpiryDate  = 'Date d\'expiration de carte de crédit doit être dans le futur';
Localization.paymentProcessing.err.paymentFailed  = 'Impossible de traiter le paiement.';
Localization.paymentProcessing.err.requiredInfo  = '(Les champs marqués d\'une * sont obligatoires.)';
Localization.paymentProcessing.err.successButNoCheckoutFolio  = 'Paiement réussi, mais ne pouvait pas fermer votre folio.';
Localization.paymentProcessing.err.successButNoEmail  = 'Paiement réussi, mais ne pouvait pas e-mail un reçu.';
Localization.paymentProcessing.expiryLabel  = 'Date d\'expiration';
Localization.paymentProcessing.expiryMonthBlank  = 'Mois';
Localization.paymentProcessing.goHomeButtonLabel  = 'Menu principal';
Localization.paymentProcessing.guestLabel  = 'Client';
Localization.paymentProcessing.paymentSuccessDescription  = 'Je vous remercie pour votre entreprise';
Localization.paymentProcessing.paymentSuccessTitle  = 'Paiement reçu.';
Localization.paymentProcessing.sectionDescription  = 'Complétez votre commande en utilisant notre service de paiement sécurisé.';
Localization.paymentProcessing.sectionTitle  = 'Caisse';
Localization.paymentProcessing.totalLabel  = 'Total ';
Localization.paymentProcessing.userIDLabel  = 'Code d\'utilisateur ';
Localization.paymentProcessing.zipLabel  = 'Code Postal';
Localization.roomReservation = {};
Localization.roomReservation.confirmation = {};
Localization.roomReservation.confirmation.adultTotalLabel  = 'Adultes:';
Localization.roomReservation.confirmation.amountLabel  = 'Montant:';
Localization.roomReservation.confirmation.arrivalDateLabel  = 'Date d\'arrivée:';
Localization.roomReservation.confirmation.bookButtonLabel  = 'Réserver';
Localization.roomReservation.confirmation.childTotalLabel  = 'Enfants:';
Localization.roomReservation.confirmation.customerCustomTextHeader = '';
Localization.roomReservation.confirmation.customerCustomTextFooter = '';
Localization.roomReservation.confirmation.departureDateLabel  = 'Date de départ:';
Localization.roomReservation.confirmation.guestNameLabel  = 'Nom de l\'occupant:';
Localization.roomReservation.confirmation.infantTotalLabel  = 'Nourrissons:';
Localization.roomReservation.confirmation.instructions  = 'Vérifiez l\'exactitude des détails de votre réservation. Cliquez sur \u00ab Réserver \u00bb pour ajouter cette réservation à votre panier.';
Localization.roomReservation.confirmation.numberOfNightsLabel  = 'Nombre de nuits:';
Localization.roomReservation.confirmation.title  = 'Confirmez la réservation.';
Localization.roomReservation.confirmation.youthTotalLabel  = 'Jeunes:';
Localization.roomReservation.datesAndOccupants = {};
Localization.roomReservation.datesAndOccupants.adultOccupantsLabel  = 'Nombre d\'adultes ';
Localization.roomReservation.datesAndOccupants.arrivalLabel  = 'Date d\'arrivée ';
Localization.roomReservation.datesAndOccupants.childOccupantsLabel  = 'Nombre d\'enfants ';
Localization.roomReservation.datesAndOccupants.departureLabel  = 'Date de départ ';
Localization.roomReservation.datesAndOccupants.err = {};
Localization.roomReservation.datesAndOccupants.err.noMatchingAvailability  = 'Aucune disponibilité ne correspond à votre demande.';
Localization.roomReservation.datesAndOccupants.err.pmsBookingFailed  = 'Impossible de réserver une chambre';
Localization.roomReservation.datesAndOccupants.err.pmsRoomsFailed  = 'impossible de récupérer la liste chambre d\'hôtel';
Localization.roomReservation.datesAndOccupants.err.pmsRoomTypesFailed  = 'Impossible de récupérer la liste de tpe de chambre d\'hôtel.';
Localization.roomReservation.datesAndOccupants.err.pmsVenuesFailed  = 'Impossible de récupérer la liste des lieux hôtel.';
Localization.roomReservation.datesAndOccupants.infantsOccupantsLabel  = 'Les nourrissons';
Localization.roomReservation.datesAndOccupants.instructions  = 'Choisissez la durée de votre séjour et le nombre d\'occupants.';
Localization.roomReservation.datesAndOccupants.moreLabel  = 'Plus';
Localization.roomReservation.datesAndOccupants.promoOccupantsLabel  = 'Code promotionnel';
Localization.roomReservation.datesAndOccupants.title  = 'Réservez une chambre';
Localization.roomReservation.datesAndOccupants.youthOccupantsLabel  = 'Jeunes';
Localization.roomReservation.getPMSVenues = {};
Localization.roomReservation.getPMSVenues.instructions  = 'Choisissez un lieux pour réserver votre chambre.';
Localization.roomReservation.getPMSVenues.title  = 'Venue ';
Localization.roomReservation.marketing = {};
Localization.roomReservation.marketing.bannerMessage  = 'Installez-vous confortablement';
Localization.roomReservation.packageSelection = {};
Localization.roomReservation.packageSelection.customerCustomTextHeader = '';
Localization.roomReservation.packageSelection.customerCustomTextFooter = '';
Localization.roomReservation.packageSelection.instructions  = 'Sélectionnez un forfait. Déplacez votre curseur sur le forfait pour plus de détails.';
Localization.roomReservation.packageSelection.title  = 'Forfait ';
Localization.roomReservation.roomTypeSelection = {};
Localization.roomReservation.roomTypeSelection.customerCustomTextHeader = '';
Localization.roomReservation.roomTypeSelection.customerCustomTextFooter = '';
Localization.roomReservation.roomTypeSelection.instructions  = 'Sélectionnez un type de chambre. Le prix indiqué est par nuit.';
Localization.roomReservation.roomTypeSelection.roomNumber  = 'Nombre de chambre';
Localization.roomReservation.roomTypeSelection.roomRateLabel  = 'Prix moyen par nuit';
Localization.roomReservation.roomTypeSelection.roomSelection = {};
Localization.roomReservation.roomTypeSelection.roomSelection.instructions  = 'Sélection de chambre';
Localization.roomReservation.roomTypeSelection.roomSelection.customerCustomTextHeader = '';
Localization.roomReservation.roomTypeSelection.roomSelection.customerCustomTextFooter = '';
Localization.roomReservation.roomTypeSelection.roomTotalLabel  = 'avant tous les frais et les taxes applicables';
Localization.roomReservation.roomTypeSelection.roomTypeRateLabel  = ' / Nuit (moyenne)';
Localization.roomReservation.roomTypeSelection.title  = 'Type de chambre';
Localization.spaBooking = {};
Localization.spaBooking.categorySelection = {};
Localization.spaBooking.categorySelection.instructions  = 'Voulez-vous réserver un service de spa ou de rejoindre une de nos classes spa?';
Localization.spaBooking.categorySelection.locationLabel  = 'catégorie';
Localization.spaBooking.categorySelection.selectService  = 'Service de spa';
Localization.spaBooking.categorySelection.title  = 'type de réservation';
Localization.spaBooking.categorySelection.unselectText  = 'S\'il vous plaît, choisissez une catégorie';
Localization.spaBooking.classSelection = {};
Localization.spaBooking.classSelection.availableSlots  = 'Nombre d\'emplacements disponibles.';
Localization.spaBooking.classSelection.classNameLabel  = 'sessions';
Localization.spaBooking.classSelection.classNotAvail  = 'Il n\'y a pas de sessions programmées à cette date. S\'il vous plaît choisir une autre date.';
Localization.spaBooking.classSelection.customerCustomTextHeader = '';
Localization.spaBooking.classSelection.customerCustomTextFooter = '';
Localization.spaBooking.classSelection.dateTo  = 'à';
Localization.spaBooking.classSelection.err = {};
Localization.spaBooking.classSelection.err.classListFailed  = 'Désolé, nous n\'avons pas pu accéder à la liste des sessions de spa à l\'heure actuelle.';
Localization.spaBooking.classSelection.instructions  = 'S\'il vous plaît,  d\'abord sélectionnez un date ';
Localization.spaBooking.classSelection.numClasses  = 'nombre de classes';
Localization.spaBooking.classSelection.room  = 'Salle';
Localization.spaBooking.classSelection.title  = 'Sélection de classe.';
Localization.spaBooking.confirmation = {};
Localization.spaBooking.confirmation.additionalClasses  = 'D\'autres classes';
Localization.spaBooking.confirmation.additionalClassesPartOfProgram  = 'Les classes suivantes seront également réservé pour vous:';
Localization.spaBooking.confirmation.customerCustomTextHeader = '';
Localization.spaBooking.confirmation.customerCustomTextFooter = '';
Localization.spaBooking.confirmation.err = {};
Localization.spaBooking.confirmation.err.checkConflictingFailed  = 'Désolé, nous ne pouvions pas confirmer les paramètres de votre réservation pour le moment.';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveExisting  = 'Réservation existante:';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveMessage  = 'S\'il vous plaît choisissez un autre moment pour cette réservation, ou visitez le résumé de votre réservation pour enlever le réservation existante.';
Localization.spaBooking.confirmation.err.conflictingBookingsRemoveTitle  = 'Vous avez déjà été réservé pour un service de spa à l\'heure choisie.';
Localization.spaBooking.confirmation.err.createBookingFailed  = 'Désolé, nous ne pouvions pas enregistrer votre réservation dans nos systèmes en ce moment.';
Localization.spaBooking.confirmation.err.createTempUserFailed  = 'Désolé, ne ne pouvions pas commencer votre réservation en ce moment.';
Localization.spaBooking.confirmation.makeBookingButtonLabel  = 'Réserver';
Localization.spaBooking.confirmation.serviceClassesLabel  = 'Nombre de classes:';
Localization.spaBooking.confirmation.serviceDateLabel  = 'Date ';
Localization.spaBooking.confirmation.serviceDurationLabel  = 'Durée (min.) ';
Localization.spaBooking.confirmation.servicePerClassLabel  = 'par classe';
Localization.spaBooking.confirmation.servicePriceLabel  = 'Tarif ';
Localization.spaBooking.confirmation.serviceStartDateLabel  = 'Date de début:';
Localization.spaBooking.confirmation.serviceTotalLabel  = 'Prix total:';
Localization.spaBooking.confirmation.successfullBookingMessage  = 'Votre réservation à été enregistré dans nos systèmes';
Localization.spaBooking.confirmation.title  = 'Confirmer les détail de la réservation';
Localization.spaBooking.locationSelection = {};
Localization.spaBooking.locationSelection.customerCustomTextHeader = '';
Localization.spaBooking.locationSelection.customerCustomTextFooter = '';
Localization.spaBooking.locationSelection.title = 'Emplacement';
Localization.spaBooking.locationSelection.err = {};
Localization.spaBooking.locationSelection.err.noLocation  = 'Désolé, nous n\'avons pas pu accéder à la liste d\'établissements de spa à cette époque.';
Localization.spaBooking.locationSelection.instructions  = 'Choisissez un emplacement pour réserver vos services spa. ';
Localization.spaBooking.pmsbeforespa = {};
Localization.spaBooking.pmsbeforespa.notice = 'S\'il vous plaît noter que la réservation pièce est nécessaire de réserver un service de spa. Vous ne pourrez pas compléter votre réservation spa jusqu\'à ce que vous ont également ajouté une réservation d\'une chambre à votre réservation.';
Localization.spaBooking.pmsbeforespa.errorMotice = 'Une réservation de la chambre est nécessaire de réserver un service de Spa. S\'il vous plaît ajouter une réservation de chambre à votre réservation.';
Localization.spaBooking.pmsbeforespa.needReservation  = 'Besoin réservation au';
Localization.spaBooking.pmsbeforespa.on  = 'le';
Localization.spaBooking.marketing = {};
Localization.spaBooking.marketing.bannerMessage  = 'Préparez-vous à être choyé';
Localization.spaBooking.multipleAppointments = {};
Localization.spaBooking.multipleAppointments.instructions  = 'Il n\'y a rien qui correspond. Veuillez faire votre sélection à partir des propositions suggérées.';
Localization.spaBooking.multipleAppointments.title  = 'Sélectionnez un rendez-vous.';
Localization.spaBooking.serviceSelection = {};
Localization.spaBooking.serviceSelection.checkAvailability  = 'Vérifier la disponibilité';
Localization.spaBooking.serviceSelection.customerCustomTextHeader = '';
Localization.spaBooking.serviceSelection.customerCustomTextFooter = '';
Localization.spaBooking.serviceSelection.dateLabel  = 'Date';
Localization.spaBooking.serviceSelection.moreOptions  = 'plus d\'options';
Localization.spaBooking.serviceSelection.err = {};
Localization.spaBooking.serviceSelection.err.dateRequired  = 'Sélectionnez une date.';
Localization.spaBooking.serviceSelection.err.genderRequired  = 'Sélectionnez le sexe.';
Localization.spaBooking.serviceSelection.err.noAvailableAppointments  = 'Aucun rendez-vous disponible. Changez vos critères de recherche et essayez de nouveau.';
Localization.spaBooking.serviceSelection.err.noService  = 'Désolé, nous n\'avons pas pu accéder à la liste des services de spa à cette époque.';
Localization.spaBooking.serviceSelection.genderLabel  = 'Sexe de la personne prodiguant le soin';
Localization.spaBooking.serviceSelection.instructions  = 'Sélectionnez la date, l\'heure et le service que vous aimeriez réserve, puis sélectionnes " Reserve" sur le service désiré ce-dessous';
Localization.spaBooking.serviceSelection.meLabel  = 'moi-même';
Localization.spaBooking.serviceSelection.minutesLabel = 'minutes.';
Localization.spaBooking.serviceSelection.otherName  = 'Personne recevant le soin';
Localization.spaBooking.serviceSelection.otherNameLabel  = 'Nom de personne recevant le soin';
Localization.spaBooking.serviceSelection.sameGender  = 'Ce service nécessite que le sexe defournisseur de services et la personne recevant le soin sont les mêmes.';
Localization.spaBooking.serviceSelection.sameGenderLabel  = 'Le sexe de personne recevant le soin';
Localization.spaBooking.serviceSelection.serviceNameLabel  = 'Service';
Localization.spaBooking.serviceSelection.someoneLabel  = 'une autre personne';
Localization.spaBooking.serviceSelection.staffLabel  = 'Préférence pour un membre du personnel ';
Localization.spaBooking.serviceSelection.timeLabel  = 'Temps';
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

Localization.general.termsLink= 'legal-FR.html';
Localization.general.paymentCompleteMainSiteButton= ''; // put 'Return to Main Site'. Button won't appear if blank.
Localization.general.paymentCompleteMainSiteLink= ''; // put 'http://www.example.com'. Button won't appear if blank.
Localization.general.paymentCompleteStartOverButton= ''; // put 'Book More Stuff'. Otherwise uses Localization.general.err.startOver.

Localization.roomReservation.calendar = {};
Localization.roomReservation.calendar.clickContinueToProceed = 'Cliquez sur le bouton Continuer ci-dessous pour poursuivre votre réservation.';
Localization.roomReservation.calendar.dateUnavailable = 'Date indisponible';
Localization.roomReservation.calendar.limitedAvailabilityFrom = 'Disponibilité limitée';
Localization.roomReservation.calendar.limitedAvailability = 'Faible disponibilité ';
Localization.roomReservation.calendar.lowAvailability = 'Faible disponibilité';
Localization.roomReservation.calendar.nextStep = 'Prochaine étape:';
Localization.roomReservation.calendar.noDescriptionAvailable = 'Aucune description disponible.';
Localization.roomReservation.calendar.noRoomsAvailable = 'Pas de chambres disponibles';
Localization.roomReservation.calendar.noRoomsAvailableNoAction = 'Désolé, votre séjour ne peut pas inclure cette date. <br><br>Veuillez sélectionner une autre date d\'arrivée.';
Localization.roomReservation.calendar.noRoomsAvailableAction = 'Votre séjour ne peut pas inclure cette date, mais vous pouvez partir à cette date.';
Localization.roomReservation.calendar.roomsAvailableFrom = 'Chambres disponibles à partir de ';
Localization.roomReservation.calendar.roomsAvailable = 'Chambres disponibles ';
Localization.roomReservation.calendar.selectArrivalDateButton = 'Sélectionnez cette<br>date d\'arrivée';
Localization.roomReservation.calendar.selectArrivalDateOnCalendar = 'Sélectionnez votre date d\'arrivée sur le calendrier ci-dessus.';
Localization.roomReservation.calendar.selectDepartureDateButton = 'Sélectionnez cette<br>date de départ';
Localization.roomReservation.calendar.selectDepartureDateOnCalendar = 'Sélectionnez votre date de départ sur le calendrier ci-dessus.';
Localization.roomReservation.calendar.selectedStayDates = 'Dates sélectionnées du séjour';
Localization.roomReservation.calendar.notAvailable = 'N/A';
Localization.roomReservation.roomTypeSelection.roomTypeTotalRateLabel = '';

Localization.bookingSummary.selectedUpgrades  = 'Mises à niveau sélectionnées:';
Localization.bookingSummary.perNight  = 'Par nuit';
Localization.bookingSummary.removeUpgrade  = 'Retirer mise à niveaue';
Localization.bookingSummary.time  = 'Heure:';
Localization.bookingSummary.add  = 'Ajouter';
Localization.bookingSummary.grid.addUpgrade  = 'Ajoutez une mise à niveau de votre réservation';

Localization.bookingSummary.grid.totalAmountLabel  = 'Montant total';
Localization.bookingSummary.grid.depositAmountLabel  = 'Dépôt en raison aujourd\'hui';

Localization.bookingSummary.creditCardGuarantee = 'Confirmer maintenant';
Localization.bookingSummary.paymentGuarantee = 'Une carte de crédit valide est nécessaire pour garantir votre réservation. Votre carte ne sera pas débitée pour le moment.';
Localization.bookingSummary.selectUpgrade  = 'Sélectionnez une mise à niveau..';

Localization.roomReservation.specialService = {};
Localization.roomReservation.specialService.add  = 'Ajouter';
Localization.roomReservation.specialService.addUpgrade  = 'Ajoutez une mise à niveau de votre réservation';
Localization.roomReservation.specialService.category  = 'Catégorie';
Localization.roomReservation.specialService.invalidDateFormat  = 'Format de date non valide';
Localization.roomReservation.specialService.name  = 'Service spécial';
Localization.roomReservation.specialService.selectUpgradeDate  = 'Sélectionnez la date de la mise à niveau';
Localization.roomReservation.specialService.unselectText  = 'Veuillez choisir une catégorie';

Localization.bookingSummary.BookingHistory  = 'Histoire réservation';
Localization.bookingSummary.BookingHistoryTitle  = 'Réservations existantes';
Localization.bookingSummary.bookPackageAgain  = 'Réservez ce forfait à nouveau';
Localization.bookingSummary.bookServiceAgain  = 'Réserver ce service à nouveau';
Localization.bookingSummary.bookClassAgain  = 'Réservez une autre classe';
Localization.bookingSummary.dayVisitAt  = 'Visite d\'un jour à';
Localization.bookingSummary.futureBookings  = 'Ce sont Réservations à venir enregistrées dans votre compte. Nous nous réjouissons de vous accueillir.';
Localization.bookingSummary.pastBookings  = 'Ce sont vos réservations passées comme enregistré dans votre compte.';
Localization.bookingSummary.paymentInstruction = 'Finalisez votre réservation en cliquant sur le bouton ci-dessous';
Localization.bookingSummary.reservationAdded  = 'Votre réservation a été enregistrée dans nos systèmes.';
Localization.bookingSummary.upgradeRemoved = 'Votre mise à niveau a été supprimé de votre réservation.';
Localization.bookingSummary.viewPastBookings = 'Vous pouvez également consulter vos réservations passées avec nous.';
Localization.general.err.multipleProperties  = 'Vous ne pouvez pas avoir des éléments de plus d\'une propriété en une seule transaction. S\'il vous plaît supprimer des éléments de votre réservation Résumé de sorte qu\'une seule propriété reste dans votre réservation Résumé. Vous serez en mesure de compléter une transaction subséquente pour vos articles d\'autres propriétés.';
Localization.general.features.goHomeLabel  = 'Vous pouvez revenir à notre site principal ici:';
Localization.general.features.goHomeButtonLabel  = 'page d\'accueil';
Localization.general.features.pmsDayName  = 'Réservation de visite d\'une journée';
Localization.general.features.pmsOrDayName  = 'Réservation d\'une chambre ou de visite d\'une journée';
Localization.general.login.bookingHistoryLabel  = 'Histoire réservation';
Localization.general.login.promptFlyoutText  = 'Connectez-vous pour voir vos réservations à venir et l\'historique de vos réservations.';
Localization.general.login.promptFlyoutTitle  = 'Déjà un client?';
Localization.giftCertificate.customGiftCertificate.postalAddress2Label  = '';
Localization.paymentProcessing.PPCanceled = 'Opération de paiement annulé.';
Localization.paymentProcessing.PPNotConfigured = 'Désolé, la méthode de paiement n\'est pas disponible.';
Localization.paymentProcessing.PPPreRedirect = 'Vous transmettre au prestataire de paiement.';
Localization.paymentProcessing.PPPostRedirect = 'La finalisation de paiement.';
Localization.paymentProcessing.PPPreError = 'Erreur contactant fournisseur de paiement.';
Localization.paymentProcessing.PPPostError = 'Opération de paiement n\'est pas terminé en raison d\'une erreur ou d\'un paiement non autorisé.';
Localization.roomReservation.confirmation.dayVisitOnly  = 'Visite d\'un jour seulement';
Localization.roomReservation.confirmation.visitDateLabel  = 'Date de visite:';
Localization.roomReservation.datesAndOccupants.customerCustomTextHeader  = '';
Localization.roomReservation.datesAndOccupants.customerCustomTextFooter  = '';
Localization.roomReservation.datesAndOccupants.dayGuest = {};
Localization.roomReservation.datesAndOccupants.dayGuest.customerCustomTextHeader = '';
Localization.roomReservation.datesAndOccupants.dayGuest.customerCustomTextFooter = '';
Localization.roomReservation.datesAndOccupants.dayGuestInstructions  = 'Choisissez la date pour votre visite Jour et le nombre de personnes.';
Localization.roomReservation.datesAndOccupants.err.mismatchedProperty  = 'Désolé, le Lieu Hôtel que vous avez sélectionné n\'est pas disponible car vous avez déjà un élément de votre réservation Résumé d\'une propriété différente. S\'il vous plaît compléter votre réservation ou supprimer l\'élément (s) de la propriété des autres; vous serez alors en mesure de faire une réservation dans cet Lieu Hôtel.';
Localization.roomReservation.datesAndOccupants.err.noMatchingPackage  = 'Désolé, le paquet que vous aviez recherché n\'est pas disponible aux dates que vous avez sélectionnées. Voici les forfaits disponibles à ces dates:';
Localization.roomReservation.datesAndOccupants.err.noVenuesAtProperty  = 'Désolé, nous ne pouvons pas vous montrer toute Lieux hôtel, car il n\'y a pas d\'hôtel sur l\'Lieux propery à partir de laquelle vous avez produit dans votre réservation Résumé. S\'il vous plaît compléter votre réservation ou supprimer l\'élément (s) de la propriété des autres; vous serez alors en mesure de faire une réservation dans un Lieu Hôtel.';
Localization.roomReservation.datesAndOccupants.visitDate  = 'Date de visite';
Localization.roomReservation.getPMSVenues.dayBooking  = 'Visite d\'un jour';
Localization.roomReservation.getPMSVenues.stayBooking  = 'Restez Resort';
Localization.roomReservation.roomTypeSelection.roomTypeFromLabel  = 'De:';
Localization.spaBooking.alsoClasses = 'Afficher les autres catégories';
Localization.spaBooking.alsoServices = 'Afficher les services de Spa';
Localization.spaBooking.classSelection.classTitle  = 'Choisissez votre classe souhaitée ou activité';
Localization.spaBooking.classSelection.spaItemNotFound  = 'La classe que vous avez sélectionné n\'est pas disponible à cette date.';
Localization.spaBooking.locationSelection.err.mismatchedProperty  = 'Désolé, l\'emplacement que vous avez sélectionné Spa n\'est pas disponible car vous avez déjà un élément de votre réservation Résumé d\'une propriété différente. S\'il vous plaît compléter votre réservation ou supprimer l\'élément (s) de la propriété des autres; vous serez alors en mesure de faire une réservation dans cet Lieu Spa.';
Localization.spaBooking.locationSelection.err.noLocationsAtProperty  = 'Désolé, nous ne pouvons pas vous montrer toutes les établissements de spa, car il n\'y a pas établissements de spa au propery à partir de laquelle vous avez produit dans votre réservation Résumé. S\'il vous plaît compléter votre réservation ou supprimer l\'élément (s) de la propriété des autres; vous serez alors en mesure de faire une réservation dans un Spa Situation.';
Localization.spaBooking.pmsbeforespa.acknowledgeIntro  = 'Avez-vous déjà une journée de visite ou de réservation Stay Resort? <a href="#" onclick="return false" data-target="#overrideCollapse" data-toggle="collapse">Cliquez ici</a></p> <div id="overrideCollapse" class="collapse">Si vous êtes sûr que vous avez déjà une journée de visite ou de réservation Stay Resort, mais il n\'est tout simplement pas apparaître dans ce système, vous pouvez utiliser le bouton ci-dessous pour ajouter Traitements ou Activités Spa à votre itinéraire. Utilisez cette fonction si vous partagez quelqu\'un d\'autre chambre et la réservation d\'une chambre est au nom de cette personne. <p>';
Localization.spaBooking.pmsbeforespa.acknowledgeIntroFooter  = '</p></div>';
Localization.spaBooking.pmsbeforespa.acknowledgeText = 'J\'ai une réservation d\'un Resort. Je suis conscient que cette réservation peut être annulée si je n\'ai pas de réservation Resort qualification.';
Localization.spaBooking.pmsbeforespa.acknowledgeTitle = 'Réservation de qualification';
Localization.spaBooking.pmsbeforespa.acknowledgeButton = 'Reconnaître';
Localization.spaBooking.pmsbeforespa.dateSelectorAcknowledgePromptText = 'Si vous <i>déjà</ i> ont une journée de visite ou de réservation Stay Resort dehors de ces dates, s\'il vous plaît <a href="#/summary/setOverride">cliquez ici pour choisir une date</a>. Dans le cas contraire, il suffit d\'ajouter <a href="#/roomsBooking">une première réservation</a>.';
Localization.spaBooking.pmsbeforespa.dateSelectorAcknowledgePromptTitle = 'Vous souhaitez réserver une autre date?';
Localization.spaBooking.pmsbeforespa.noticeOverridden  = 'Vous avez indiqué que vous avez déjà une journée de visite ou de réservation Stay Resort, même si elle n\'est pas actuellement constaté par notre système. Vous pourrez compléter votre réservation en ce moment, mais vous devez être conscient que cette réservation peut être annulée en cas de réservation Resort qualification n\'est pas trouvé.';
Localization.spaBooking.serviceSelection.serviceTitle  = 'Choisissez votre service désiré Spa';
Localization.spaBooking.serviceSelection.at  = ' à ';

Localization.general.features.extraHTML = '';
Localization.general.location.closed = 'Fermé';
Localization.general.location.email = 'E-mail';
Localization.general.location.hours = 'Heures';
Localization.general.close = 'Close';
Localization.general.print = 'Print';
Localization.paymentProcessing.acceptTerms = {};
Localization.paymentProcessing.acceptTerms.title = 'Acceptez les termes & conditions';
Localization.paymentProcessing.acceptTerms.checkboxLabel = 'Je suis d\'accord avec les termes & conditions';
Localization.paymentProcessing.acceptTerms.continueButtonLabel = 'Continuer';
Localization.paymentProcessing.acceptTerms.cancelButtonLabel = 'Annuler';
Localization.paymentProcessing.acceptTerms.termsContentURL = 'termes.html';
Localization.paymentProcessing.acceptTerms.termsContentSelector = 'div#content';
Localization.paymentProcessing.gcRedeemTitle = 'Racheter bon cadeau';
Localization.paymentProcessing.gcRedeemDescription = 'Veuillez saisir votre bon cadeau détails ci-dessous';
Localization.paymentProcessing.gcRedeemDescriptionSubtitle = 'Choisir le type de bon cadeau que vous avez et entrez les numéros sans tirets ni espaces.';
Localization.paymentProcessing.gcTypeDescription = 'Nous offrons les Certificats-cadeaux en papier et cartes-cadeaux en plastique. Veuillez indiquer de quel type vous avez.';
Localization.paymentProcessing.gcTypeLabel = 'Type de bon cadeaue';
Localization.paymentProcessing.gcTypeCard = 'Carte cadeau';
Localization.paymentProcessing.gcTypeCert = 'Certificat-cadeau';
Localization.paymentProcessing.gcNumberCard = 'Numéro de carte-cadeau';
Localization.paymentProcessing.gcNumberCardBlank = '12345678';
Localization.paymentProcessing.gcNumberCert = 'Numéro de certificat-cadeau';
Localization.paymentProcessing.gcNumberCertBlank = '00123456';
Localization.paymentProcessing.gcRefNumberDescription = 'Votre bon cadeau contient également un numéro de référence. Saisissez-le ci-dessous';
Localization.paymentProcessing.gcRefNumber = 'Numéro de référence';
Localization.paymentProcessing.gcRefNumberBlank = '00000';
Localization.paymentProcessing.gcRedeemSubmit = 'Racheter bon cadeau';
Localization.paymentProcessing.gcRedeemedSuccess = 'Bon cadeau rachetés avec succès';
Localization.paymentProcessing.gcRedeemedFailure = 'Impossible de racheter bon cadeau';
Localization.paymentProcessing.gcRefundedSuccess = 'Bon cadeau remboursée avec succès';
Localization.paymentProcessing.gcRefundedFailure = 'Incapable de rembourser bon cadeau';
Localization.paymentProcessing.redeemedGCsTitle = 'Racheté les bons cadeaux';
Localization.paymentProcessing.redeemedGCsSubTitle = 'Ces bons-cadeaux ont été appliqués à votre réservation';
Localization.paymentProcessing.gcRedeemedAmount = 'Montant rachetés de bon cadeau';
Localization.paymentProcessing.gcRemainingAmount = 'Montant restant sur bon cadeau';
Localization.paymentProcessing.gcRemove = 'Supprimer bon cadeau';
Localization.paymentProcessing.gcRedeemAnother = 'Racheter un autre bon cadeau';
Localization.paymentProcessing.gcRedeemAnotherButton = 'Racheter un autre bon cadeau';
Localization.paymentProcessing.redeemGCsTitle = 'Racheter des bons cadeaux';
Localization.paymentProcessing.redeemGCsSubTitle = 'Si vous avez un certificat-cadeau ou carte cadeau vous pouvez racheter sa valeur contre votre récapitulatif de la réservation solde.';
Localization.paymentProcessing.redeemGCsButton = 'Racheter un bon cadeau';
Localization.paymentProcessing.gcRedeemAutoRemoveTitle = 'Supprimer bon cadeau avant de retirer l\'élément';
Localization.paymentProcessing.gcRedeemAutoRemoveDescription = 'Afin de supprimer cet élément de votre récapitulatif de la réservation vous devez d\'abord supprimer tous les rachetés bons-cadeaux. ';
Localization.paymentProcessing.gcRedeemAutoRemoveButton = 'Supprimer < %= type %> élément et tous les bons cadeaux.';
Localization.paymentProcessing.receiptHeader = 'Votre reçu ci-dessous:  (Tous les prix sont en CAD)<br><pre class="paymentReceipt" style="display:inline-block">';
Localization.paymentProcessing.receiptFooter = '</pre> <a class="btn btn-success receiptBtn" href="javascript:window.print()">' + Localization.general.print + '</a> <a class="btn receiptBtnClose" data-dismiss="alert" href="#">' + Localization.general.close + '</a>';


Localization.bookingSummary.skiTicketsFor = 'Les billets de ski à';
Localization.bookingSummary.skiTickets = 'Les billets de ski';
Localization.general.features.skiName = 'Achat billets de remontée de ski';
Localization.general.login.familyGroupTitle = 'Les membres du groupe de la famille';
Localization.general.login.guestName = 'Nom de l\'invité:';
Localization.general.login.profileLabel = 'Profil d\'invité';
Localization.general.login.editProfileLabel = 'Modifier le profil';
Localization.general.login.viewProfileLabel = 'Afficher le profil';
Localization.general.login.phoneNumber = 'Numéro de téléphone:';
Localization.general.login.relationshipLabel = 'Relation:';
Localization.general.login.sectionNameTitle = 'Nom';
Localization.newUser.addressTypeHome = 'Adresse du domicile';
Localization.newUser.addressTypeOther = 'Autre adresse';
Localization.newUser.failUpdate = 'Impossible de mettre à jour le compte de l\'utilisateur.';
Localization.newUser.skiSettings = {}
Localization.newUser.skiSettings.title = 'Ski Détails';
Localization.newUser.skiSettings.skiSize = 'Taille de Ski';
Localization.newUser.skiSettings.skiBootSize = 'Taille de boot de ski';
Localization.newUser.skiSettings.snowboardSize = 'Taille de Snowboard';
Localization.newUser.skiSettings.snowboardBootSize = 'Taille de boot de snowboard';
Localization.newUser.skiSettings.dinNumber = 'Numéro DIN';
Localization.newUser.skiSettings.age = 'Âge';
Localization.newUser.skiSettings.weight = 'Poids';
Localization.newUser.skiSettings.height = 'Hauteur';
Localization.newUser.successMember = 'Merci, nous avons créé le compte de membre du groupe de la famille.';
Localization.newUser.successUpdate = 'Merci, nous avons mis à jour votre compte.';
Localization.newUser.updateButtonLabel = 'Mise à jour';
Localization.ski = {}
Localization.ski.customerCustomTextHeader = '';
Localization.ski.customerCustomTextFooter = '';
Localization.ski.location = 'Emplacement';
Localization.ski.err = {};
Localization.ski.err.createBookingFailed = 'Désolé, nous n\'avons pas pu enregistrer votre billet achat dans nos systèmes en ce moment.';
Localization.ski.err.createBookingFailedLimitExceeded = 'La vente de ce point dépasse la limite absolue pour achats promotionnels par ce client.';
Localization.ski.err.mismatchedProperty = 'Désolé, l\'emplacement de ski que vous avez sélectionné n\'est pas disponible, car vous avez déjà un élément dans votre récapitulatif de la réservation d\'une propriété différente. Veuillez compléter votre réservation ou retirer l\'élément(s) à partir de l\'autre propriété; vous serez alors en mesure de faire une réserve à cet endroit de ski.';
Localization.ski.err.noLocationsAtProperty = 'Désolé, nous ne sommes pas en mesure de vous montrer les emplacements de ski parce qu\'il n\'y a pas d\'emplacements de ski à la propriété à partir duquel vous avez des éléments dans votre récapitulatif de la réservation. Veuillez compléter votre réservation ou retirer l\'élément(s) à partir de l\'autre propriété; vous serez alors en mesure de faire une réservation dans un endroit de ski.';
Localization.ski.err.noLocation = 'Désolé, nous n\'avons pas été en mesure d\'accéder à la liste des emplacements de ski en ce moment.';
Localization.ski.err.dateRequired = 'Veuillez sélectionner une date de la première.';
Localization.ski.err.noAvailableItems = 'Désolé, il n\'y a pas de disponibilité à la date à laquelle vous avez recherché.';
Localization.ski.err.locationClosed = 'Désolé, cet emplacement est fermé à partir de < %= closeBeginDate %> et rouvrira sur < %= closeEndDate % >.';
Localization.ski.err.locationClosedNoDate = 'Désolé, cet emplacement est fermé à la date à laquelle vous avez recherché.';
Localization.ski.err.noService = 'Désolé, nous n\'avons pas été en mesure d\'accéder à la liste de billets des remontées mécaniques en ce moment.';
Localization.ski.instructions = 'Choisissez un emplacement dans lequel vous pouvez acheter un billet de remontée de ski.';
Localization.ski.instructionsTickets = 'Choisissez une date, puis choisissez un billet de remontée d\'acheter à des catégories ci-dessous.';
Localization.ski.marketing = {};
Localization.ski.marketing.bannerMessage = 'Ressentez l\'excitation.';
Localization.ski.title = 'Billets de remontée de ski';
Localization.ski.locationLabel = 'Catégorie';
Localization.ski.serviceTitle = 'Billets de remontée';
Localization.ski.unselectText = 'Veuillez choisir une catégorie';
Localization.ski.at = 'À ';
Localization.ski.dateLabel = 'Date';
Localization.ski.meLabel = 'Moi';
Localization.ski.minutesLabel = 'minutes';
Localization.ski.ticketFor = 'Billet pour:';
Localization.ski.purchaseButton = 'Achat';
Localization.ski.serviceNameLabel = 'Service';
Localization.ski.someoneLabel = 'Quelqu\'un d\'autre';
Localization.ski.staffLabel = 'Personnel préféré';
Localization.ski.subCategoryLabel = 'Sous-catégorie: ';
Localization.ski.successfullBookingMessage = 'Votre réservation a été enregistrée dans nos systèmes.';
Localization.ski.timeLabel = 'Temps';
Localization.general.login.addGroupMember = 'Ajouter membre de groupe';
Localization.general.login.returnToProfileLabel = 'Retour au profil d\'invité';
Localization.paymentProcessing.analyticsCustomTemplate = '';
Localization.ski.promo = 'Promotion';
Localization.ski.promoPasses = 'Forfait Promotionnel';
Localization.newUser.addButtonLabel = 'Ajouter';
Localization.newUser.newGroupMember = 'Nouveau membre du groupe:';

Localization.bookingSummary.bookCourseAgain = "livre une autre heure de départ ";
Localization.bookingSummary.confirmRemoveSkiActivatesPromoButton = "Supprimer tous les articles promotionnels ";
Localization.bookingSummary.confirmRemoveSkiActivatesPromoTitle = "Supprimer <%= title %> et tous les articles promotionnels?";
Localization.bookingSummary.confirmRemoveSkiActivatesPromo = "Cet article vous permet d'acheter des articles promotionnels. Si vous avez des articles promotionnels dans le résumé de votre réservation et vous continuez à supprimer ce point, tous ces articles promotionnels seront également supprimés de votre résumé de réservation. Êtes-vous sûr? ";
Localization.bookingSummary.pmsDailyRateDateFormat = "<b>MMM</ b> dd";
Localization.bookingSummary.removeHotelReservation = "Supprimer Chambre Réservation au"
Localization.bookingSummary.removeSpaReservation = "Supprimer le Service Spa:"
Localization.bookingSummary.removeSkiReservation = "Retirer Ski / billetterie Pass:"
Localization.bookingSummary.removeGolfReservation = "Supprimer Tee Time à"
Localization.bookingSummary.removeRetailReservation = "Retirer Certificat Cadeau"
Localization.bookingSummary.selectedUpgrades = "Mises à niveau Options:";
Localization.bookingSummary.spaServiceForName = "Service Spa pour";
Localization.bookingSummary.skiTicketsForName = "Les billets de ski pour";
Localization.club.minimums = "minimums"; 
Localization.club.minimumChargeDate = "Date des frais";
Localization.club.minimumStartDate = "Date de début";
Localization.club.minimumCharged = "minimum facturé ";
Localization.club.minimumTotal = "minimum totale ";
Localization.club.minimumUsed = "minimum utilisé ";
Localization.newUser.guestNameSectionTitle = "Nom de l'invité ";
Localization.newUser.enterEmailFirstPrompt = "Se il vous plaît commencer en entrant votre adresse de courriel";
Localization.newUser.enterExistingEmailPrompt = "Si vous avez séjourné avec nous avant, se il vous plaît entrer la même adresse email que vous avez utilisé précédemment";
Localization.newUser.enterPasswordPrompt = "Bienvenue à nouveau! Se il vous plaît entrer votre mot de passe pour continuer. Si vous avez oublié votre mot de passe, se il vous plaît appuyez sur le bouton Mot de passe oublié ";
Localization.newUser.contactInfo = "Contact";
Localization.newUser.phoneType = "Type";
Localization.newUser.passwordCustom = "Choisissez votre propre mot de passe";
Localization.newUser.passwordIncorrect = "Désolé, ce mot de passe ne correspond pas à nos dossiers. Se il vous plaît essayer de nouveau ou si vous ne vous souvenez pas de votre mot de passe, se il vous plaît appuyez sur le bouton Mot de passe oublié ";
Localization.newUser.passwordInstruction = "Configuration de votre propre mot de passe vous permet d'accéder à votre historique de réservation ou de faire de futures réservations plus rapidement et facilement.";
Localization.newUser.passwordSectionTitle = "Guest Profil Mot de passe";
Localization.newUser.predefinedPassword = "Utiliser mot de passe généré aléatoirement: <code class=\"random\" />";
Localization.newUser.sectionEmailTitle = "adresse email";
Localization.newUser.successRandomPassword = $.validator.format("S'il vous plaît écrivez votre mot de passe: <strong>{0}</ strong> ");
Localization.newUser.phoneNumber = "Nombre";
Localization.newUser.context = {}
Localization.newUser.context['summary/redeemGC'] = {
    breadcrumb: "chèque cadeau",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et procédera au rachat certificat cadeau",
    buttonUpdate: "Mise à jour profil d'invité de l'information et procédera au rachat certificat cadeau",
    buttonProceed: "Passez à l'chèque cadeau",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ["summary/*"] = {
    breadcrumb: "Continuer réservation",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et de procéder au paiement fort",
    buttonUpdate: "Mise à jour profil d'invité de l'information et procéder au paiement fort",
    buttonProceed: "Passez à verser un acompte ",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ['membership/*'] = {
    breadcrumb: "Compte de membre",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et de procéder à Voir compte membre",
    buttonUpdate: "Mise à jour profil d'invité renseignements et passer à Voir compte membre",
    buttonProceed: "Passez à Voir compte membre ",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ['roomsBooking/*'] = {
    breadcrumb: "Réservation Chambre",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et de procéder à la réservation Room",
    buttonUpdate: "Mise à jour profil d'invité renseignements et passer à Chambre",
    buttonProceed: "Passez à Chambre ",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ['spaBooking/*'] = {
    breadcrumb: "Spa Réservation ",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et de procéder à la réservation Service de Spa",
    buttonUpdate: "Mise à jour profil d'invité renseignements et passer à Book Service Spa",
    buttonProceed: "Passez à Book Service Spa ",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ['ski/*'] = {
    breadcrumb: "Achetez Ski",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et de procéder à la réservation Service de Spa",
    buttonUpdate: "Mise à jour profil d'invité renseignements et passer à Book Service Spa",
    buttonProceed: "Passez à Book Service Spa ",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ['golfBooking/*'] = {
    breadcrumb: "Golf réservation",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et de procéder à la réservation Service de Spa",
    buttonUpdate: "Mise à jour profil d'invité renseignements et passer à Book Service Spa",
    buttonProceed: "Passez à Book Service Spa ",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ["profile/addMember"] = {
    breadcrumb: "Ajouter un groupe membre",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et de procéder à Ajouter Membre du groupe",
    buttonUpdate: "Mise à jour profil d'invité renseignements et passer à Ajouter Membre du groupe",
    buttonProceed: "Procéder à Ajouter Membre du groupe",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ["profile/*"] = {
    breadcrumb: "profil d'invité",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité et de procéder à Voir le profil des clients",
    buttonUpdate: "Mise à jour profil d'invité renseignements et passer à Voir le profil des clients",
    buttonProceed: "Passez à Voir le profil des clients ",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.newUser.context ['*/*'] = {
    breadcrumb: "Connexion",
    title: "Créer un nouveau profil de clients ou se connecter pour Revenant clients",
    instructions: "Si vous nous avez déjà visité nous aurons alors votre profil d'invité informations déjà dans le dossier. Tout ce que vous devez faire est de Connexion avec votre adresse e-mail et mot de passe! \ Nas un nouvel invité, vous aurez juste besoin de remplir ce court formulaire pour compléter votre réservation. ",
    buttonCreate: "Créer profil d'invité",
    buttonUpdate: "Mise à jour profil d'invité de l'information",
    buttonProceed: "Mise à jour des clients Information Profil ",
    updateInstructions: "Se il vous plaît prendre un moment pour vérifier l'exactitude de vos informations clients Pofile ci-dessous."
}
Localization.paymentProcessing.transaction = "détail de l'opération ";
Localization.paymentProcessing.cardInfo = "carte de crédit";
Localization.paymentProcessing.billingAddress = "Adresse de facturation ";
Localization.paymentProcessing.analyticsCustomTemplate = "";
Localization.roomReservation.calendar.minLOS = "Durée de séjour minimum se applique ";
Localization.roomReservation.calendar.minLOSRestriction = $.validator.format("minimum {0} Night Stay ");
Localization.roomReservation.roomTypeSelection.roomTypeTotalRateLabel = "";
Localization.ski.areYouAMember = "Déjà un invité ou membre?";
Localization.ski.mustLoginPurchaseItemActivatesPromo = "Vous devez créer un compte ou vous connecter à votre compte existant afin d'acheter cet article. Se il vous plaît cliquez sur le bouton Connexion ci-dessus pour continuer."
Localization.ski.loginToReceive = "Se connecter pour recevoir des promos, vous pourriez avoir droit, ou pour acheter vos membres de la famille / de groupe. "
Localization.ski.durationDaysTitle = "Pass Type Durée:"
Localization.ski.durationDaysPre = "jusqu'à"
Localization.ski.durationDaysPost = "jour"
Localization.ski.passStartDate = "col Date de début:";
Localization.ski.passStartDateMismatch = "Note ajusté date de démarrage";
Localization.ski.passTypeStartDate = "Disponible De:"
Localization.ski.passTypeEndDate = "Disponible jusqu'à:"
Localization.ski.promoActivatingPassStartDate = "disponibles à l'achat à partir de:"
Localization.ski.promoActivatingPassEndDate = "disponibles à l'achat Jusqu'à:"
Localization.ski.passEndDate = "col Date de fin:";
Localization.spaBooking.areYouAMember = "Réservation pour quelqu'un d'autre?";
Localization.spaBooking.loginToReceive = "Connexion ou créer un compte pour faire des réservations pour vos membres de la famille / de groupe.";
Localization.spaBooking.serviceSelection.availabilityRow = '<div class="clearfix spaAvailability"> <button class="bookButton btn btn-primary pull-right">Réserver à <span class="time"></span></button> avec <span class="staff"></ span> <small> (<span class="price"></ span>)</small></div>';
Localization.spaBooking.serviceSelection.checkNextDay = "Vérifier Jour suivant";
Localization.spaBooking.serviceSelection.foundOnDate = "Nous ne avons pas trouvé d'disponibilités <span class=\"staffOrGender\" /> sur <span class=\"fromdate\" />, mais le folowing est disponible sur <span class=\"date\" /> : ";
Localization.spaBooking.serviceSelection.noFurtherAvailabilities = "Aucune autre disponibilités <span class = \"staffOrGender\" /> disponible sur <span class=\"date\" />";
Localization.spaBooking.serviceSelection.notAvailable = "Désolé, nous ne avons pas trouvé de disponibilités <span class=\"staffOrGender\" /> sur <span class=\"date\" /> après <span class=\"time\" />";
Localization.spaBooking.serviceSelection.notAvailableDates = "Désolé, nous ne avons pas trouvé d'disponibilités <span class=\"staffOrGender\" /> entre <span class=\"fromdate\" /> et <span class=\"date\" />";
Localization.spaBooking.serviceSelection.notAvailableGenderMale = "avec un thérapeute masculin ";
Localization.spaBooking.serviceSelection.notAvailableGenderFemale = "avec un thérapeute féminine ";
Localization.spaBooking.serviceSelection.notAvailableStaff = "avec <span class=\"staffName\"> </ span>";
Localization.spaBooking.serviceSelection.showMoreTimes = "Montrer Plus Times";

    /**
     * Version: 1.0 Alpha-1
     * Build Date: 13-Nov-2007
     * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
     * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
     * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
     */

    Localization.CultureInfo = {
    /* Culture Name */
    name: "fr-CA",
    englishName: "French (Canada)",
    nativeName: "français (Canada)",

    /* Day Name Strings */
    dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    abbreviatedDayNames: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
    shortestDayNames: ["di", "lu", "ma", "me", "je", "ve", "sa"],
    firstLetterDayNames: ["d", "l", "m", "m", "j", "v", "s"],

    /* Month Name Strings */
    monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    abbreviatedMonthNames: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],

    /* AM/PM Designators */
    amDesignator: "",
    pmDesignator: "",

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
    dateElementOrder: "ymd",

    /* Standard date and time format patterns */
    formatPatterns: {
        shortDate: "yyyy-MM-dd",
        longDate: "d MMMM yyyy",
        mediumDate: "d MMM yyyy",
        shortTime: "HH:mm",
        longTime: "HH:mm:ss",
        fullDateTime: "d MMMM yyyy HH:mm:ss",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "d MMMM",
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
        jan: /^janv(.(ier)?)?/i,
        feb: /^févr(.(ier)?)?/i,
        mar: /^mars/i,
        apr: /^avr(.(il)?)?/i,
        may: /^mai/i,
        jun: /^juin/i,
        jul: /^juil(.(let)?)?/i,
        aug: /^août/i,
        sep: /^sept(.(embre)?)?/i,
        oct: /^oct(.(obre)?)?/i,
        nov: /^nov(.(embre)?)?/i,
        dec: /^déc(.(embre)?)?/i,

        sun: /^di(m(.(anche)?)?)?/i,
        mon: /^lu(n(.(di)?)?)?/i,
        tue: /^ma(r(.(di)?)?)?/i,
        wed: /^me(r(.(credi)?)?)?/i,
        thu: /^je(u(.(di)?)?)?/i,
        fri: /^ve(n(.(dredi)?)?)?/i,
        sat: /^sa(m(.(edi)?)?)?/i,

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
