// var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?openalfa\.com/;
var tabId;

//get route info from webpage
function fillRouteInfo(route) {
    chrome.extension.sendRequest({'route': route});
}

//receive initial request and ask for the info to the content.js
chrome.extension.onRequest.addListener(function(request) {
    if (request.initialize) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId, {text: 'get_scripts'}, fillRouteInfo);
        });
    }
});