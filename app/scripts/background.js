chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var running = null;
    switch (request.action) {
        case "timer-start":
            var time = request.time;
            running = setInterval(function () {
                if (--time > 0) {
                    chrome.extension.sendRequest({
                        action: 'timer-update'
                    }, function (req) {
                    });
                } else {
                    chrome.notifications.create('pomotimer', {
                        type: "basic",
                        title: "Pomodoro finish!",
                        message: request.task.title,
                        contextMessage: "contextMessage",
                        iconUrl: "images/icon128_kaku.png"
                    }, function () {
                    });

                    chrome.extension.sendRequest({
                        action: 'timer-stop'
                    }, function (req) {
                        if (req == null) {
                            var tasks = JSON.parse(localStorage.getItem('pomotimer') || '[]');
                            tasks.forEach(function (task) {
                                if (task.$$hashKey == request.task.$$hashKey) {
                                    task.count_today++;
                                    task.count_total++;
                                }
                            });
                            localStorage.setItem('pomotimer', JSON.stringify(tasks));
                        }
                    });
                    clearInterval(running);
                }
            }, 1000);
            break;
        default:
            break;
    }
});
