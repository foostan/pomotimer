'use strict';

app.controller("TodoCtrl", function ($scope, $interval, TaskManager, PomodoroTimer) {

    $scope.category = 'today';
    $scope.tm = TaskManager;
    var tasks = $scope.tasks = $scope.tm.get();
    $scope.timer = PomodoroTimer;

    /* task */
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
    var running;
    $scope.time = PomodoroTimer.getTime();
    $scope.start_time = PomodoroTimer.getStartTime();
    $scope.running = PomodoroTimer.isRunning();

    $scope.timer_start = function (task) {
        PomodoroTimer.start(task);
        if (angular.isDefined(running)) return;
        running = $interval(function () {
            if (PomodoroTimer.isFinished()) {
                $scope.timer_stop(task);
            }
            $scope.time = PomodoroTimer.getTime();
            $scope.running = PomodoroTimer.isRunning();
        }, 1000);
    }

    $scope.timer_stop = function (task) {
        if (angular.isDefined(running)) {
            $interval.cancel(running);
            running = undefined;
        }

        if (PomodoroTimer.isFinished()) {
            console.log("finished");
            $scope.tm.countup(task);
        }
        PomodoroTimer.stop(task);
        $scope.time = PomodoroTimer.getTime();
        $scope.start_time = PomodoroTimer.getStartTime();
        $scope.running = PomodoroTimer.isRunning();
    }

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
