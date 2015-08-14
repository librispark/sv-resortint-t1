define(['Handlebars'], function ( Handlebars ){
    function xmlEscape(value) {
        return String(value)
            .replace(/&/g, '&amp;amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
  

    Handlebars.registerHelper( 'xmlEscape', xmlEscape );
    return xmlEscape;
});
        
