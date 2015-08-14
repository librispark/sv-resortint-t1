define(['Handlebars'], function ( Handlebars ){
    function toFixed(value, precision) {

        return (+value).toFixed(precision);
    }
  

    Handlebars.registerHelper( 'toFixed', toFixed );
    return toFixed;
});
        
