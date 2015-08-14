define(['localization/en-us/Localization'], function (Localization) {
Localization.paymentMessages = {
	yespay : {
		defaultFailMessage : "There was an error processing your transaction, your credit card has not been charged. Please try again. Error number (<%= params.YPresult %>)",
		successCodes : [ 0, 99 ],
		reponseCodeMessages : [
			{	applicableCodes : [ 0 ],
				message: "Your payment transaction was completed successfully." },
												// the above message will never be shown because its applicableCodes
												// are all found in successCodes. We only use reponseCodeMessages
												// when the response code is NOT found in successCodes.
			{	applicableCodes : [ 6 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Transaction Declined" },
			{	applicableCodes : [ 7 ],
				message: "There was an error processing your transaction, your credit card has not been charged: CSC / CVV is Mandatory" },
			{	applicableCodes : [ 10 ],
				message: "There was an error processing your transaction, your credit card has not been charged: AVS is Mandatory" },
			{	applicableCodes : [ 23 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Cardholder name is mandatory" },
			{	applicableCodes : [ 24 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Postcode is mandatory" },
			{	applicableCodes : [ 25 ],
				message: "There was an error processing your transaction, your credit card has not been charged: CVV not matched" },
			{	applicableCodes : [ 26 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Postcode not matched" },
			{	applicableCodes : [ 27 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Address not matched" },
			{	applicableCodes : [ 32 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Invalid cardholder name" },
			{	applicableCodes : [ 34001 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Invalid Card Number" },
			{	applicableCodes : [ 34007 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Card not accepted" },
			{	applicableCodes : [ 34009 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Transaction Barred" },
			{	applicableCodes : [ 34012 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Invalid Expiry Date" },
			{	applicableCodes : [ 34014 ],
				message: "There was an error processing your transaction, your credit card has not been charged: Expired Card" },
			{	applicableCodes : [ -1, 1, 2, 3 , 4, 5, 8, 9, 13, 15, 18, 19, 20, 21, 22, 29, 30, 31, 33, 34, 35, 36, 37, 38, 34002, 34010, 34011, 34015, 34016, 34017, 34018, 34020 ],
				message: "There was an error processing your transaction, your credit card has not been charged. Please contact us at <%= Customization.supportPhoneNumber %> for further assistance. Error number (<%= params.YPresult %>)" }
		]
	}
}
});
