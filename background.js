chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateSpeed") {
        chrome.storage.sync.set({ 'videoSpeed': request.speed }, function() {
            console.log('Скорость видео сохранена: ' + request.speed);
        });
    } else if (request.action === "requestSpeed") {
        chrome.storage.sync.get('videoSpeed', function(data) {
            sendResponse(data.videoSpeed);
        });
        return true;
    }
});
