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

        start: function (task) {
            timer.startedAt = parseInt((new Date) / 1000);
            timer.isRunning = true;

            chrome.extension.sendRequest({
                cmd: 'timer-start',
                time: timer.time,
                task: task
            }, function (req) {
            });
        },

        stop: function (task) {
            timer.startedAt = null;
            timer.isRunning = false;
            this.updateTime();

            chrome.extension.sendRequest({
                cmd: 'timer-stop'
            }, function (req) {
            });
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
