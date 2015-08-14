define(['Handlebars'], function ( Handlebars ){
    function nl2br(value) {
        return String(value)
            .replace(/\r?\n/g, '<br/>');
    }
  

    Handlebars.registerHelper( 'nl2br', nl2br );
    return nl2br;
});
        
