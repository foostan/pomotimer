'use strict';

app.controller("backgroundCtrl", function ($scope, $interval, taskManager, pomodoroTimer) {
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        var running = null;
        switch (request.cmd) {
            case "timer-start":
                var time = request.time;
                running = setInterval(function () {
                    if (--time > 0) {
                        chrome.extension.sendRequest({
                            action: 'timer-update'
                        }, function (req) {
                        });
                    } else {
                        chrome.notifications.create('pomotimer', {
                            type: "basic",
                            title: "Pomodoro finish!",
                            message: request.task.title,
                            contextMessage: "contextMessage",
                            iconUrl: "images/icon128_kaku.png"
                        }, function () {
                        });

                        chrome.extension.sendRequest({
                            action: 'timer-stop'
                        }, function (req) {
                            if (req == null) {
                                var timer = pomodoroTimer.get();
                                pomodoroTimer.stop();
                                pomodoroTimer.put(timer);

                                var tasks = taskManager.get();
                                tasks.forEach(function (task) {
                                    if (task.$$hashKey == request.task.$$hashKey) {
                                        taskManager.countup(task);
                                    }
                                });
                                taskManager.put(tasks);
                                console.log("Finished and updated!");
                            }
                        });
                        clearInterval(running);
                    }
                    console.log(time);
                }, 1000);
                break;
            default:
                break;
        }
    });
});
