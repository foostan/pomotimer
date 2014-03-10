'use strict';

app.factory("pomodoroTimer", function () {
    var STORAGE_ID = 'pomodoroTimer';
    var POMODORO_TIME = 10;
    var timer = null;

    return {
        get: function () {
            timer = JSON.parse(localStorage.getItem(STORAGE_ID)) || {
                time: POMODORO_TIME,
                task: null,
                startedAt: null,
                isRunning: false
            };
            return timer;
        },

        put: function (tymer) {
            timer = tymer
            localStorage.setItem(STORAGE_ID, JSON.stringify(timer));
        },

        getTime: function () {
            if (timer.startedAt == null) {
                return POMODORO_TIME;
            } else {
                var now = parseInt((new Date) / 1000);
                return POMODORO_TIME - (now - timer.startedAt)
            }
        },

        isFinished: function () {
            return timer.isRunning && this.getTime() <= 0 ? true : false;
        },

        start: function (task) {
            timer.task = task;
            timer.startedAt = parseInt((new Date) / 1000);
            timer.isRunning = true;
        },

        stop: function () {
            timer.task = null;
            timer.startedAt = null;
            timer.isRunning = false;
        },

        reset: function (task) {
            timer.time = POMODORO_TIME;
            timer.task = task;
        }
    };
});
