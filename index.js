const rangeInput = document.getElementById('currentVideoSpeed');
const textInput = document.getElementById('valueFromRange');

function updateTextInput() {
    textInput.value = rangeInput.value;
    chrome.runtime.sendMessage({ action: "updateSpeed", speed: rangeInput.value });
    setVideoSpeed(parseFloat(rangeInput.value));
}

function updateRangeInput() {
    let value = parseFloat(textInput.value);
    if (value < parseFloat(rangeInput.min)) {
        value = parseFloat(rangeInput.min);
    } else if (value > parseFloat(rangeInput.max)) {
        value = parseFloat(rangeInput.max);
    }
    rangeInput.value = value;
    chrome.runtime.sendMessage({ action: "updateSpeed", speed: value });
    setVideoSpeed(value);
}

function setVideoSpeed(value) {
    const videoElement = document.getElementsByClassName("video-stream html5-main-video")[0];
    if (videoElement) {
        videoElement.playbackRate = value;
    }
}

rangeInput.addEventListener('input', updateTextInput);
textInput.addEventListener('input', updateRangeInput);

chrome.runtime.sendMessage({ action: "requestSpeed" }, function(response) {
    if (response) {
        rangeInput.value = response;
        textInput.value = response;
        setVideoSpeed(parseFloat(response));
    }
});
