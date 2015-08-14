({
    appDir: "src",
    baseUrl: "js",
    dir: "build",
    // optimize: "none",
    // optimizeCss: "none",
    modules: [
        {
            name: "rsweb",
            exclude: [ "Customization" ]
        }
    ],
    paths: {
        jquery:'lib/jquery',
        jquerymigrate:'lib/jquery.migrate',
        jqueryui:'lib/jquery.ui.core',
        jqueryuidatepicker:'lib/jquery.ui.datepicker',
        underscore:'lib/underscore',
        date:'lib/date',
        text:'lib/text',
        order:'lib/order',
        json2:'lib/json2',
        bootstrap:'lib/bootstrap',
        enquire:'lib/enquire',
        director:'lib/director-1.0.7',
        jquery_cookie:'lib/jquery.cookie',
        jquery_validate:'lib/jquery.validate',
        jquery_xml2json:'lib/jquery.xml2json',
        jquery_hashchange:'lib/jquery.ba-hashchange',
        rsweblib:'lib/rsweblib',
        Handlebars:'lib/handlebars',
        hbs:'lib/hbs',
        Customization:'customization/Customization',
        pointer_events_polyfill: 'lib/pointer_events_polyfill',
        jquerymask: 'lib/jquery.mask'
    },
	pragmas: {
		includeControllerSham : true,
        excludeCustomization: true
	},
	pragmasOnSave: {
        //removes Handlebars.Parser code (used to compile template strings) set
        //it to `false` if you need to parse template strings even after build
        excludeHbsParser : true,
        // kills the entire plugin set once it's built.
        excludeHbs: true,
        // removes i18n precompiler, handlebars and json2
        excludeAfterBuild: true
    },
    removeCombined:true
})
