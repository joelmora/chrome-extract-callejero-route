chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'get_scripts') {

        var route = {
            'coord': []
        };

        //title
        var title = document.getElementsByClassName('posttitle')[0].innerText;

        title = title.replace('Línea de Autobús ', '');
        title = title.replace(' - Ocultar Mapa', '');
        title = title.replace(' - Mostrar Mapa', '');

        var splitted = title.split(' - ');
        route.code = splitted.shift();
        route.name = splitted.join(' - ');

        //coord
        var scripts = document.getElementsByTagName('script');

        for (var i = 0; i < scripts.length; i++) {
            if (!scripts[i].hasAttribute("src")) {
                var rawText = scripts[i].innerHTML;
    
                if (rawText.substring(4, 15) == 'road_coords') {
                    var rawCoords = rawText.match(/\[([^[]*?)\]/g);
    
                    for (var j = 0; j < rawCoords.length; j++) {
                        route.coord.push(JSON.parse(rawCoords[j]))
                    }
                }
            }
        }
    
        sendResponse(route);
    }
});