require.config({
    paths: {
        'domReady': 'lib/domReady/domReady',
        'jquery': '../js/jquery',
        //'jQuery': './jQuery',
        'jquery-ui': '../js/jquery-ui',
        'bxslider': '../js/bxslider',
        'marquee': '../js/marquee',
        'nouislider': '../js/nouislider',
        'modernizr': '../js/modernizr',
        'imagesloaded': '../js/imagesloaded',
        'smooth-scroll': '../js/smooth-scroll',
        'owl-carousel': '../js/owl-carousel',
        'isotope': '../js/isotope',
        'theia': '../js/theia',
        'lightbox': '../js/lightbox',
        'options': '../js/options',
        'angular': 'lib/angular/angular',
        'angular-route': 'lib/angular-route/angular-route',
        'app': 'app',
        'coreModule': 'coreModule'
    },

    shim: {
        'jquery': {
            deps: ['domReady']
        },

        'jquery-ui': {
            deps: ['jquery']
        },

        'bxslider': {
            deps: ['jquery']
        },

        'marquee': {
            deps: ['jquery']
        },

        'nouislider': {
            deps: ['jquery']
        },

        'modernizr': {
            deps: ['jquery']
        },

        'imagesloaded': {
            deps: ['jquery']
        },

        'smooth-scroll': {
            deps: ['jquery', 'modernizr']
        },

        'owl-carousel': {
            deps: ['jquery']
        },

        'isotope': {
            deps: ['jquery']
        },

        'theia': {
            deps: ['jquery']
        },

        'lightbox': {
            deps: ['jquery', 'jquery-ui', 'bxslider', 'marquee', 'nouislider', 'modernizr', 'imagesloaded', 'smooth-scroll', 'owl-carousel', 'isotope', 'theia']
        },

        'options': {
            deps: ['lightbox', 'isotope']
        },

        'angular': {
            deps: ['jquery']
        },

        'angular-route': {
            deps: ['angular']
        },


        'app': {
            deps: ['angular-route', 'coreModule']
        },

        'coreModule': {
            deps: ['angular-route']
        }
    }
});

require(['app']);