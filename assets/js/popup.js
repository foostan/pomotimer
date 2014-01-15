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
 * Request listener
 */
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var id = request.id

    switch (request.action) {
      case "update_remaining_time":
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

$('.btn-start').on("click", function(){
  var $timer = $(this).parent().parent().find(".timer")
  id = $timer.attr("id")

  chrome.extension.sendRequest({id: id, action: "start"})
})

$('.btn-reset').on("click", function(){
  var $timer = $(this).parent().parent().find(".timer")
  id = $timer.attr("id")

  timers[id].resetTime()
  chrome.extension.sendRequest({id: id, action: "reset"})
})

/**
 * main
 */
var timers = []
$(".timer").each(function(){
  var id = $(this).attr("id")
  timers[id] = new Timer(id)
})

