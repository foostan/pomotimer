'use strict';

app.controller("backgroundCtrl", function ($scope, $interval, taskManager, pomodoroTimer) {
    console.log("hoge");
    console.log("huge");

    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        console.log(request);
    });
});
