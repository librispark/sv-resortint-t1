define(['Handlebars'], function ( Handlebars ){
    function stripPlain(value) {
        return String(value)
            .replace(/[^a-z ]/gi, ' ');
    }
  

    Handlebars.registerHelper( 'stripPlain', stripPlain );
    return stripPlain;
});
        
