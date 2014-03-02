'use strict';

var app = angular.module('angularApp', [
               'ngCookies',
               'ngResource',
               'ngSanitize',
               'ngRoute',
               'ui.bootstrap',
               'xeditable',
               'todoFilters',
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
