/**
 * class Timer
 */
var Timer = function (id) {
  this.id = id
  this.jq_object = $("#" + id)
}
Timer.prototype = {
  updateTime: function (time) {
    this.setTime(time)
  },
  resetTime: function () {
    var timer = this
    chrome.extension.sendRequest({id: id, action: "getTimeLimit"}, function(response){
      timer.setTime(response.time_limit)
    })
  },
  setTime: function (time) {
    h =  ("0" + Math.floor(time / 60)).slice(-2)
    s =  ("0" + time % 60).slice(-2)
    this.jq_object.text(h + ":" + s)
  }
}

/**
 * class TaskList
 */
var TaskList = function(task_list) {
  this.data = task_list
}
TaskList.prototype = {
  view: function() {
    console.log(this.data)
    this.data.forEach(function(task, i){
      var toggle = task.toggle ? "in" : ""
      console.log(toggle)
      $("#task_list").append($('<div class="panel panel-default">')
        .append($('<div class="panel-heading">')
          .append($('<span class="panel-title">')
            .append($('<a data-toggle="collapse" data-parent="#accordion" href="#collapse' +  i + '">')
              .text(task.title)
            )
          )
          .append($('<span class="badge">' + task.pomodoro + '</span>')
          )
          .append($('<div class="btn-group pull-right">')
            .append($('<button type="button" class="btn btn-xs"><span class="glyphicon glyphicon-ok"></span></button>'))
            .append($('<button type="button" class="btn btn-xs"><span class="glyphicon glyphicon-trash"></span></button>'))
          )
        )
        .append($('<div id="collapse' + i +'" class="panel-collapse collapse ' + toggle + '">')
          .append($('<div class="panel-body"><p>' + task.description + '</p></div>')
          )
          .append($('<hr/>'))
          .append($('<div>')
            .append($('<h4 id="timer' + i + '" class="text-danger timer">25:00</h4>'))
            .append($('<div class="btn-group btn-group-justified">')
              .append($('<a class="btn btn-primary btn-start" href="#"><span class="glyphicon glyphicon-play-circle"></span> Start</a>'))
              .append($('<a class="btn btn-success btn-break" href="#"><span class="glyphicon glyphicon-tree-deciduous"></span> Break</a>'))
              .append($('<a class="btn btn-danger btn-reset" href="#"><span class="glyphicon glyphicon-ban-circle"></span> Reset</a>'))
            )
          )
        )
      )

    })
  }
}

/**
 * Request listener
 */
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var id = request.id

    switch (request.action) {
      case "update_remaining_time":
        $(".timer").each(function(){
          if (timers[id] === undefined) {
            var id = $(this).attr("id")
            timers[id] = new Timer(id)
          }
        })

        timers[id].updateTime(request.remaining_time)
        break
      default:
        break
    }

    sendResponse({})
  }
)

/**
 * events
 */
$('.collapse').collapse({
  toggle: false
})

$(document).on("click", ".btn-start", function(){
  var $timer = $(this).parent().parent().find(".timer")
  id = $timer.attr("id")

  chrome.extension.sendRequest({id: id, action: "start"})
})

$(document).on("click", ".btn-reset", function(){
  var $timer = $(this).parent().parent().find(".timer")
  id = $timer.attr("id")

  timers[id].resetTime()
  chrome.extension.sendRequest({id: id, action: "reset"})
})

/**
 * function
 */
function updateTaskList() {
  chrome.extension.sendRequest({action: "getTaskList"}, function(response){
    var task_list = new TaskList(response.task_list.data)
    task_list.view()
  })
}

/**
 * main
 */
var timers = []
$(".timer").each(function(){
  var id = $(this).attr("id")
  timers[id] = new Timer(id)
})

updateTaskList()

