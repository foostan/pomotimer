'use strict';

app.factory("pomodoroTimer", function () {
    var STORAGE_ID = 'pomodoroTimer';
    var POMODORO_TIME = 10;
    var timer = null;

    return {
        get: function () {
            timer = JSON.parse(localStorage.getItem(STORAGE_ID)) || {
                time: POMODORO_TIME,
                startedAt: null,
                isRunning: false,
                isFinished: false
            };
            return timer;
        },

        put: function (tymer) {
            timer = tymer
            localStorage.setItem(STORAGE_ID, JSON.stringify(timer));
        },

        start: function () {
            timer.startedAt = parseInt((new Date) / 1000);
            timer.isRunning = true;

            chrome.extension.sendRequest({
                cmd: 'timer-start'
            }, function (req) {
            });

            //chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
            //    console.log(request);
            //    switch (request.action) {
            //        case "timer-stop":
            //            tasks.forEach(function (task) {
            //                if (task.$$hashKey == request.task.$$hashKey) {
            //                    $scope.timer_stop(task);
            //                }
            //            });
            //            break;
            //        case "timer-running":
            //            console.log(request.time);
            //            $scope.time = request.time;
            //            $scope.running = true;
            //        default:
            //            break;
            //    }
            //});

        },

        stop: function () {
            timer.startedAt = null;
            timer.isRunning = false;
            this.updateTime();
        },

        updateTime: function () {
            if (timer.startedAt == null) {
                timer.time = POMODORO_TIME;
            } else {
                var now = parseInt((new Date) / 1000);
                var newTime = POMODORO_TIME - (now - timer.startedAt)
                timer.time = newTime > 0 ? newTime : 0;
            }
            timer.isFinished = timer.isRunning && timer.time <= 0 ? true : false;
        }
    };
});
