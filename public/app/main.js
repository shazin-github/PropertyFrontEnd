require.config({
    paths: {
        'domReady': 'lib/domReady/domReady',
        'angular': 'lib/angular/angular',
        'angular-csp': 'lib/angular/angular-csp',
        'angular-route': 'lib/angular-route/angular-route',
        'coreModule': 'coreModule'
    },

    shim: {
        'angular': {
            deps: ['domReady']
        },

        'angular-route': {
            deps: ['angular']
        },

        'coreModule': {
            deps: ['angular']
        }
    }
});

require(['coreModule']);