define(function () {


    if (window.navigator.language) {
        var ua_lang = window.navigator.language,
            lang_bits = ua_lang.split('-'),
            language = lang_bits[0],
            country = lang_bits[1],
            languageMap = {
                'en':'en-us',
                'en-GB':'en-us',
                'fr':'fr-ca',
                'es':'es-sp',
                'zh':'zh-cn'
            };

        if (languageMap[ua_lang]) {
            pickLanguage = languageMap[ua_lang];
        } else if (languageMap[language]) {
            pickLanguage = languageMap[language];
        } else {
            pickLanguage = undefined;
        }
    } else {
        pickLanguage = undefined;
    }
    return pickLanguage
})