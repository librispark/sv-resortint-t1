define(['Handlebars'], function ( Handlebars ){
    function equal(lvalue, rvalue, options) {
        if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
        if( lvalue!=rvalue ) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    }
  

    Handlebars.registerHelper( 'equal', equal );
    return equal;
});
        
