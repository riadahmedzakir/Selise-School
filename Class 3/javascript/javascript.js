(function() {
    "use strict";

    var vm = window;

    class table {
        constructor(myData) {
        	console.log(myData);
        }
    }

    function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'json/data-sheet.json', true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    loadJSON(function(response) {
        var myData = JSON.parse(response);
        var myTable = new table(myData);        
    });
})(window);