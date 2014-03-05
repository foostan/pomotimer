chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var timeout = null;
    switch (request.action) {
        case "timer-start":
            timeout = setTimeout(function () {
                chrome.extension.sendRequest({
                    action: 'timer-stop',
                    task: request.task
                }, function (req) {
                    if (req == null) {
                        tasks = JSON.parse(localStorage.getItem('pomotimer') || '[]');
                        tasks.forEach(function (task) {
                            if (task.$$hashKey == request.task.$$hashKey) {
                                task.count_today++;
                                task.count_total++;
                            }
                        });
                        localStorage.setItem('pomotimer', JSON.stringify(tasks));
                        console.log("Finished and updated!");
                    }
                });
            }, request.time * 1000);
            break;
        default:
            break;
    }
});
