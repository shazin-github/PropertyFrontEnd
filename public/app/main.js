require.config({
    paths: {
        'domReady': 'lib/domReady/domReady',
        'angular': 'lib/angular/angular',
        'angular-route': 'lib/angular-route/angular-route',
        'app': 'app',
        'coreModule': 'coreModule'
    },

    shim: {
        'angular': {
            deps: ['domReady', 'jquery']
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