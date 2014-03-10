'use strict';

var app = angular.module('angularApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'xeditable',
        'pomotimerFilters'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/popup', {
                templateUrl: 'views/popup.html'
            })
            .when('/background', {
                templateUrl: 'views/background.html'
            });
    });
