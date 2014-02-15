'use strict';

var app = angular.module('angularApp', [
               'ngCookies',
               'ngResource',
               'ngSanitize',
               'ngRoute',
               'ui.bootstrap',
               'xeditable'
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


app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'
});
