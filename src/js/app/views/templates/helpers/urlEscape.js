define(['Handlebars'], function ( Handlebars ){
    function urlEscape(value) {
        return encodeURIComponent(value);
    }
  

    Handlebars.registerHelper( 'urlEscape', urlEscape );
    return urlEscape;
});
        
