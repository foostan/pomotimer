'use strict';

app.factory("TaskManager", function() {
  var tasks = [
    {
      title: 'sample task',
      category: 'today',
      count_today: 1,
      count_total: 1,
      state: 'wip'
    },
    {
      title: 'sample task',
      category: 'today',
      count_today: 1,
      count_total: 5,
      state: 'done'
    },
    {
      title: 'sample task',
      category: 'today',
      count_today: 1,
      count_total: 1,
      state: 'none'
    }
  ];

  return {
    tasks: tasks,

    add: function(task) {
      task = task || {};
      var new_task = {
        title: task.title || '',
        category: task.category || 'today',
        count_today: task.count_today || 1,
        count_total: task.count_total || 1,
        state: task.state || 'none'
      };
      tasks.unshift(new_task);
    },

    del: function(task) {
      tasks.splice(tasks.indexOf(task), 1);
    },

    resetWip: function(task) {
      angular.forEach(tasks, function(task, i) {
        if (task.state == 'wip') {
          task.state = 'none';
        }
      });
      tasks[tasks.indexOf(task)].state = 'wip';
    },

    toggleState: function(task) {
      switch (task.state) {
        case 'none': task.state = 'done'; break;
        case 'wip': task.state = 'done'; break;
        case 'done': task.state = 'none'; break;
      }
    },

    countup: function(task) {
      task.count_today++;
      task.count_total++;
    }
  };
});
