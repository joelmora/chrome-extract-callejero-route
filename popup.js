//initialize the whole extension
chrome.extension.sendRequest({'initialize': true});

//receive route object to display on popup
chrome.extension.onRequest.addListener(function(data) {
    if (data.route) {
        fillData(data.route);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    //click on copy-sql button
    document.getElementById('copy-sql').addEventListener('click', function() {
        var sql = '';
        var values = [];
        values.push("'" + document.getElementById('code').value + "'");
        values.push("'" + document.getElementById('name').value + "'");
        values.push("'" + document.getElementById('company').value + "'");
        values.push("'" + document.getElementById('route').value + "'");

        sql += 'INSERT INTO [TABLE_NAME] VALUES(' + values.join(',') + ')';

        document.getElementById('sql').value = sql;
        document.getElementById('sql').focus();
        document.getElementById('sql').select();
        document.execCommand('Copy');
    });
});

//get popup data
function fillData(route)
{
    document.getElementById('code').value = route.code;
    document.getElementById('name').value = route.name;
    document.getElementById('route').value = JSON.stringify(route.coord);
}