//initialize the whole extension
chrome.extension.sendRequest({'initialize': true});

//receive route object to display on popup
chrome.extension.onRequest.addListener(function(data) {
    if (data.route) {
        fillData(data.route);
    }
});

//get popup data
function fillData(route)
{
    document.getElementById('route').value = JSON.stringify(route.coord);
}