define(['Handlebars'], function ( Handlebars ){

    function escapeJSString(value) {
        return (value + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0').replace(/\n/g, '\\n\\\n');
    }


    Handlebars.registerHelper( 'escapeJSString', escapeJSString );
    return escapeJSString;
});

