'use strict';

app.controller("TodoCtrl", function ($scope, $interval, taskManager, pomodoroTimer) {

    $scope.category = 'today';


    /* task */
    $scope.tm = taskManager;
    var tasks = $scope.tasks = $scope.tm.get();
    $scope.tm.resetCountToday(tasks);

    $scope.$watch('tasks', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.tm.put(tasks);
        }
    }, true);

    $scope.resetPomodoro = function (task) {
        $scope.tm.resetWip(task);
        $scope.timer_stop(task);
    }

    $scope.toggleState = function (task) {
        $scope.tm.toggleState(task);
        $scope.timer_stop(task);
    }

    $scope.chCategory = function (task, category) {
        $scope.tm.chCategory(task, category);
        $scope.timer_stop(task);
    }

    /* timer */
    $scope.pt = pomodoroTimer;
    var timer = $scope.timer = $scope.pt.get();
    $scope.pt.updateTime();

    $scope.$watch('timer', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.pt.put(timer);
        }
    }, true);

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

    /* validate */
    $scope.checkCountToday = function (task, data) {
        if (data == null || data == NaN) {
            return "Please input a number";
        } else if (data > task.count_total || data < 0) {
            return "Please input " + task.count_total + " or less";
        }
    };

    $scope.checkCountTotal = function (task, data) {
        console.log(task.count_today)
        console.log(task.count_total)
        console.log(data)
        if (data == null || data == NaN) {
            return "Please input a number";
        } else if (data < task.count_today || data < 0) {
            return "Please input " + task.count_total + " or over";
        }
    };
});
