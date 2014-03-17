'use strict';

app.factory("taskManager", function () {
    var STORAGE_ID = 'taskManager';
    var tasks = [];

    return {
        get: function () {
            tasks = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            return tasks;
        },

        put: function (tascs) {
            localStorage.setItem(STORAGE_ID,
                JSON.stringify(tascs, function (key, val) {
                    if (key == '$$hashKey') {
                        return undefined;
                    }
                    return val;
                }));
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
                id: md5(Math.random(), new Date().getTime()),
                title: task.title || '',
                category: task.category || 'today',
                count_today: task.count_today || 0,
                count_total: task.count_total || 0,
                state: task.state || 'none',
                created_at: Math.round(new Date().getTime() / 1000),
                updated_at: Math.round(new Date().getTime() / 1000)
            };
            tasks.unshift(new_task);
        },

        del: function (task) {
            tasks.splice(tasks.indexOf(task), 1);
        },

        resetWip: function (task, pt) {
            pt.stop();
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

        chCategory: function (task, category, pt) {
            pt.stop();
            if (task.state == "wip") {
                task.state = 'none';
            }
            task.category = category;
        },

        toggleState: function (task, pt) {
            pt.stop();
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
