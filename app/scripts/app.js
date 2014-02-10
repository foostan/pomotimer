'use strict';

angular.module('angularApp', [
               'ngCookies',
               'ngResource',
               'ngSanitize',
               'ngRoute'
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
