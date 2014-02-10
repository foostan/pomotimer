'use strict';

angular.module('angularApp', [
               'ngCookies',
               'ngResource',
               'ngSanitize',
               'ngRoute',
               'ui.bootstrap'
])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
