'use strict';


function TodoCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.tasks = [
    {
      title: "Dynamic Group Header - 1",
      content: "Dynamic Group Body - 1"
    },
    {
      title: "Dynamic Group Header - 2",
      content: "Dynamic Group Body - 2"
    }
  ];
}
