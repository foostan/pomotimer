chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    console.log(request);

    switch (request.action) {
        case "timer-start":
            chrome.extension.sendRequest({
                action: 'start-response'
            });
            break;
        case "timer-stop":
            chrome.extension.sendRequest({
                action: 'stop-response'
            });
            break;
        default:
            break;
    }
});
