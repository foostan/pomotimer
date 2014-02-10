'use strict';

angular.module('angularApp')
.controller('TodoCtrl', function ($scope) {
    $scope.items = [
        {
            name: 'HTML5 Boilerplate',
            dist: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'
        },
        {
            name: 'AngularJS',
            dist: 'AngularJS is a toolset for building the framework most suited to your application development.'
        },
        {
            name: 'Karma',
            dist: 'Spectacular Test Runner for JavaScript.'
        }
    ];
});
