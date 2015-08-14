define(['localization/fr-ca/Localization'], function (Localization) {
Localization.paymentMessages = {
	yespay : {
		defaultFailMessage : "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado. Por favor, inténtelo de nuevo. Número de error (<%= params.YPresult %>)",
		successCodes : [ 0, 99 ],
		reponseCodeMessages : [
			{	applicableCodes : [ 0 ],
				message: "Votre transaction de paiement a été complété avec succès." },
												// the above message will never be shown because its applicableCodes
												// are all found in successCodes. We only use reponseCodeMessages
												// when the response code is NOT found in successCodes.
			{	applicableCodes : [ 6 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: disminuido transacción" },
			{	applicableCodes : [ 7 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Se requiere CSC / CVV" },
			{	applicableCodes : [ 10 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Se requiere AVS" },
			{	applicableCodes : [ 23 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Es necesaria Nombre del titular" },
			{	applicableCodes : [ 24 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Código postal est obligatoire" },
			{	applicableCodes : [ 25 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: CVV pas égalé" },
			{	applicableCodes : [ 26 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Code postal non appariés" },
			{	applicableCodes : [ 27 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Adresse pas égalé" },
			{	applicableCodes : [ 32 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Nom du titulaire Invalide" },
			{	applicableCodes : [ 34001 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Numéro de carte invalide" },
			{	applicableCodes : [ 34007 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: carte n'est pas acceptée" },
			{	applicableCodes : [ 34009 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Transaction barrée" },
			{	applicableCodes : [ 34012 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: Invalid date d'expiration" },
			{	applicableCodes : [ 34014 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado: carte périmée" },
			{	applicableCodes : [ -1, 1, 2, 3 , 4, 5, 8, 9, 13, 15, 18, 19, 20, 21, 22, 29, 30, 31, 33, 34, 35, 36, 37, 38, 34002, 34010, 34011, 34015, 34016, 34017, 34018, 34020 ],
				message: "Hubo un error al procesar la transacción, su tarjeta de crédito no fue acusado. Por favor, póngase en contacto con nosotros en <%= Customization.supportPhoneNumber %> para obtener ayuda. Número de error (<%= params.YPresult %>)" }
		]
	}
}
});
