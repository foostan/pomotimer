'use strict';


function TodoCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.tasks = [
    {
      title: 'sample task - 1',
      content: 'sample task - 1',
      done: true,
      open: 'isCollapsed'
    },
    {
      title: 'sample task - 1',
      content: 'sample task - 1',
      done: true,
      open: '!isCollapsed'
    },
    {
      title: 'sample task - 3',
      content: 'sample task - 3',
      done: false,
      open: '!isCollapsed'
    }
  ];
}
