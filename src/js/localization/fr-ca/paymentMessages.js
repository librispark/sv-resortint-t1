define(['localization/fr-ca/Localization'], function (Localization) {
Localization.paymentMessages = {
	yespay : {
		defaultFailMessage : "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé. S'il vous plaît essayer de nouveau. Numéro d'erreur (<%= params.YPresult %>)",
		successCodes : [ 0, 99 ],
		reponseCodeMessages : [
			{	applicableCodes : [ 0 ],
				message: "Votre transaction de paiement a été complété avec succès." },
												// the above message will never be shown because its applicableCodes
												// are all found in successCodes. We only use reponseCodeMessages
												// when the response code is NOT found in successCodes.
			{	applicableCodes : [ 6 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: transaction refusée" },
			{	applicableCodes : [ 7 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: CSC / CVV est obligatoire" },
			{	applicableCodes : [ 10 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: AVS est obligatoire" },
			{	applicableCodes : [ 23 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: Nom du titulaire est obligatoire" },
			{	applicableCodes : [ 24 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: Code postal est obligatoire" },
			{	applicableCodes : [ 25 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: CVV pas égalé" },
			{	applicableCodes : [ 26 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: Code postal non appariés" },
			{	applicableCodes : [ 27 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: Adresse pas égalé" },
			{	applicableCodes : [ 32 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: Nom du titulaire Invalide" },
			{	applicableCodes : [ 34001 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: Numéro de carte invalide" },
			{	applicableCodes : [ 34007 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: carte n'est pas acceptée" },
			{	applicableCodes : [ 34009 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: Transaction barrée" },
			{	applicableCodes : [ 34012 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: Invalid date d'expiration" },
			{	applicableCodes : [ 34014 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé: carte périmée" },
			{	applicableCodes : [ -1, 1, 2, 3 , 4, 5, 8, 9, 13, 15, 18, 19, 20, 21, 22, 29, 30, 31, 33, 34, 35, 36, 37, 38, 34002, 34010, 34011, 34015, 34016, 34017, 34018, 34020 ],
				message: "Il ya eu une erreur lors du traitement de votre transaction, votre carte de crédit n'a pas été inculpé. S'il vous plaît contactez-nous au <%= Customization.supportPhoneNumber %> pour obtenir de l'aide. Numéro d'erreur (<%= params.YPresult %>)" }
		]
	}
}
});
