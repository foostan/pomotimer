'use strict';

app.controller("popupCtrl", function ($scope, $interval, taskManager, pomodoroTimer) {
    $scope.category = 'today';

    /* task */
    $scope.tm = taskManager;
    var tasks = $scope.tasks = $scope.tm.get();
    $scope.$watch('tasks', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.tm.put(tasks);
        }
    }, true);
    $scope.tm.resetCountToday(tasks);

    /* timer */
    $scope.pt = pomodoroTimer;
    var timer = $scope.timer = $scope.pt.get();
    $scope.$watch('timer', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pt.put(timer);
        }
    }, true);
    $scope.pt.updateTime();
    $scope.pbar_style = {
        'width': '100%'
    };

    $scope.startTimer = function (task) {
        $scope.setTimerInterval();
        $scope.pt.start(task);
    }

    $scope.stopTimer = function (task) {
        tasks = $scope.tasks = $scope.tm.get();
        $interval.cancel(stop);
        $scope.pt.stop(task);
        $scope.pbar_style = {
            'width': Math.floor(timer.time / 15) + '%'
        };
    }

    var stop;
    $scope.setTimerInterval = function () {
        stop = $interval(function () {
            $scope.pt.updateTime();
            $scope.pbar_style = {
                'width': Math.floor(timer.time / 15) + '%'
            };
        }, 100);
    }

    if (timer.isRunning) {
        $scope.setTimerInterval();
    }

    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        switch (request.cmd) {
            case "stop-front-timer":
                $scope.stopTimer();
                break;
        }
    });

    /* validate */
    $scope.checkCountToday = function (task, data) {
        if (data == null || data == NaN) {
            return "Please input a number";
        } else if (data > task.count_total || data < 0) {
            return "Please input " + task.count_total + " or less";
        }
    };

    $scope.checkCountTotal = function (task, data) {
        if (data == null || data == NaN) {
            return "Please input a number";
        } else if (data < task.count_today || data < 0) {
            return "Please input " + task.count_total + " or over";
        }
    };
});
