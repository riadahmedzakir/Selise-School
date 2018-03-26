(function() {
    "use strict";

    var vm = window;

    class table {
        constructor(myData) {
            this.createTable();
            this.createColumn(myData);
            console.log(myData);
            //console.log(this.objectLength(myData));
            //console.log(Object.keys(myData).length);
            // console.log(myData[Object.keys(myData)[2]]);
            // for (var x in myData) {
            //     console.log(myData[x].FIRST_NAME);
            //     console.log(myData[x].LAST_NAME);
            // }
        }

        objectLength(obj) {
            var count = 0;
            if (typeof obj == "object") {

                if (Object.keys) {
                    count = Object.keys(obj).length;
                } else if (window._) {
                    count = _.keys(obj).length;
                } else if (window.$) {
                    count = $.map(obj, function() { return 1; }).length;
                } else {
                    for (var key in obj)
                        if (obj.hasOwnProperty(key)) count++;
                }
            }
            return count;
        };

        createTable() {
            var newtable = document.createElement("table");
            newtable.classList.add('table');
            newtable.classList.add('table-striped');
            newtable.classList.add('table-dark');
            newtable.classList.add('table-hover');
            newtable.classList.add('table-bordered');
            newtable.setAttribute("id", "myDataTable");
            var element = document.getElementById("tableContainer");
            element.appendChild(newtable);
        }

        createColumn(myData) {
            //columnCount = Object.keys(myData).length;
            var newThread = document.createElement("Thread");
            newThread.setAttribute("id", "myDataTableHeader");
            var myDataTable = document.getElementById("myDataTable");
            myDataTable.appendChild(newThread);
           
            var newTh = document.createElement("th");
            var myDataTableHeader = document.getElementById("myDataTableHeader");
            for (var x in myData[0]) {
                var textNode = document.createTextNode(x);
                myDataTableHeader.appendChild('textNode');
                myDataTable.appendChild('newTh');
            }
        }

        createRow() {

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