define(['Handlebars'], function ( Handlebars ){

    function stripChars(value) {
        var safeRegex = /[^0-9a-zA-Z_-]/,
            output = "";
        if (safeRegex.test(value)) {
            for (i = 0; i < value.length; i++) {
                if (safeRegex.test(value[i])) {
                    output += value[i] == " "? "-" : "_" + value.charCodeAt(i);
                } else {
                    output += value[i];
                }
            }
            return output;
        } else {
            return value;
        }
        // var hash = 0, i, char;
        // if (value == undefined || value.length == 0) {
        //     return hash;
        // }
        // for (i = 0; i < value.length; i++) {
        //     char = value.charCodeAt(i);
        //     hash = ((hash << 5) - hash) + char;
        //     hash = hash & hash; // Convert to 32bit integer
        // }
        // return hash;
    }


    Handlebars.registerHelper( 'stripChars', stripChars );
    return stripChars;
});

