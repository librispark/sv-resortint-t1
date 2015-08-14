define(['Handlebars'], function ( Handlebars ){
    function test(value, options) {
        console.log('test', value, options, this, !value);
        return "TEST";
    }
  

    Handlebars.registerHelper( 'test', test );
    return test;
});
        
