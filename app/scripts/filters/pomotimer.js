'use strict';

angular.module('pomotimerFilters', []).filter('timer', function () {
    return function (input) {
        var m = Math.floor(input / 60);
        var s = input % 60;
        return ('00' + m).slice(-2) + ":" + ('00' + s).slice(-2);
    };
});
