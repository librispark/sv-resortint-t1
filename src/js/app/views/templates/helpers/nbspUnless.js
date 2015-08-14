define(['Handlebars'], function ( Handlebars ){
    function nbspUnless(value) {
        return value==""? "&nbsp;" : String(value);
    }


    Handlebars.registerHelper( 'nbspUnless', nbspUnless );
    return nbspUnless;
});

