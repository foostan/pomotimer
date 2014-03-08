'use strict';

app.factory("TaskManager", function () {
    var STORAGE_ID = 'pomotimer';
    var tasks = [];

    return {
        get: function () {
            tasks = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            return tasks;
        },

        put: function (tascs) {
            tasks = tascs
            localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
        },

        resetCountToday: function (tasks) {
            tasks.forEach(function (task) {
                var updated_day = new Date(task.updated_at * 1000).getDate();
                var today = new Date().getDate();

                if (updated_day != today) {
                    task.count_today = 0;
                }
            });
        },

        add: function (task) {
            task = task || {};
            var new_task = {
                title: task.title || '',
                category: task.category || 'today',
                count_today: task.count_today || 1,
                count_total: task.count_total || 1,
                state: task.state || 'none',
                created_at: Math.round(new Date().getTime() / 1000),
                updated_at: Math.round(new Date().getTime() / 1000)
            };
            tasks.unshift(new_task);
        },

        del: function (task) {
            tasks.splice(tasks.indexOf(task), 1);
        },

        resetWip: function (task) {
            angular.forEach(tasks, function (tasc, i) {
                if (tasc.state == 'wip' && tasc != task) {
                    tasc.state = 'none';
                }
            });
            if (task.state == 'wip') {
                task.state = 'none';
            } else {
                task.state = 'wip';
            }
        },

        chCategory: function (task, category) {
            if (task.state == "wip") {
                task.state = 'none';
            }
            task.category = category;
        },

        toggleState: function (task) {
            switch (task.state) {
                case 'none':
                    task.state = 'done';
                    break;
                case 'wip':
                    task.state = 'done';
                    break;
                case 'done':
                    task.state = 'none';
                    break;
            }
        },

        countup: function (task) {
            task.count_today++;
            task.count_total++;
            task.updated_at = Math.round(new Date().getTime() / 1000);
        }
    };
});
