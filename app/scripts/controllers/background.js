'use strict';

app.controller("backgroundCtrl", function ($scope, $interval, taskManager, pomodoroTimer) {
    var stop;
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        switch (request.cmd) {
            case "timer-start":
                var time = request.time;
                stop = $interval(function () {
                    if (--time <= 0) {
                        // update tasks and timer
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

                        chrome.notifications.create('pomotimer', {
                            type: "basic",
                            title: "Pomodoro finish!",
                            message: request.task.title,
                            contextMessage: "contextMessage",
                            iconUrl: "images/icon128_kaku.png"
                        }, function () {
                        });

                        $interval.cancel(stop);
                    }
                    console.log(time);
                }, 1000);
                break;
            case "timer-stop":
                console.log("stop");
                $interval.cancel(stop);
                break;
        }
    });
});
