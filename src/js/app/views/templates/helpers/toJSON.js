define(['Handlebars'], function ( Handlebars ){
    function toJSON(value) {

        return JSON.stringify(value);
    }
  

    Handlebars.registerHelper( 'toJSON', toJSON );
    return toJSON;
});
        
