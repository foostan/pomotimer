'use strict';


function TodoCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.tasks = [
    {
      title: 'sample task - 1',
      content: 'sample task - 1',
      done: true,
      collapsed: 'isCollapsed'
    },
    {
      title: 'sample task - 2',
      content: 'sample task - 2',
      done: true,
      collapsed: '!isCollapsed'
    },
    {
      title: 'sample task - 3',
      content: 'sample task - 3',
      done: false,
      collapsed: '!isCollapsed'
    }
  ];
}
