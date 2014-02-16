'use strict';

var app = angular.module('angularApp', [
               'ngCookies',
               'ngResource',
               'ngSanitize',
               'ngRoute',
               'ui.bootstrap',
               'xeditable',
               'timer'
])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
            templateUrl: 'views/todo.html'
        }
    )
    .otherwise({
        redirectTo: '/'
    });
})
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'
});
