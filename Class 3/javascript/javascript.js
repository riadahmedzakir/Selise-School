(function() {
    "use strict";

    var vm = window;

    class table {
        constructor(myData) {
            this.createTable();
            this.createColumn(myData);
            this.createRow(myData);
            // console.log(myData);
            //console.log(this.objectLength(myData));
            //console.log(Object.keys(myData).length);
            // console.log(myData[Object.keys(myData)[0]]);
            // var object1 = Object.values(myData)[0];
            // console.log(Object.values(object1));
            // console.log(Object.keys(object1));
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
            newtable.classList.add('table-hover');
            newtable.classList.add('table-dark');            
            newtable.classList.add('table-bordered');
            newtable.setAttribute("id", "myDataTable");
            var element = document.getElementById("tableContainer");
            element.appendChild(newtable);
        }

        createColumn(myData) {
            //columnCount = Object.keys(myData).length;
            var newThread = document.createElement("tr");
            newThread.setAttribute("id", "myDataTableHeader");
            var myDataTable = document.getElementById("myDataTable");
            myDataTable.appendChild(newThread);
            var myDataTableHeader = document.getElementById("myDataTableHeader");

            for (var x in Object.values(myData)[0]) {
                var newTh = document.createElement("th");
                var textNode = document.createTextNode(x.toLowerCase());
                newTh.appendChild(textNode);
                myDataTableHeader.appendChild(newTh);
            };
        }

        createRow(myData) {
            var rowCount = this.objectLength(myData);
            for (var x = 0; x < rowCount; x++) {
                var newRow = document.createElement("tr");
                newRow.setAttribute("id", "myDataRow" + x);
                var myDataTable = document.getElementById("myDataTable");
                myDataTable.appendChild(newRow);
                var myDataRow = document.getElementById("myDataRow" + x);

                for (var y in Object.values(myData)[x]) {
                    var newTd = document.createElement("td");
                    var textNode = document.createTextNode(Object.values(myData)[x][y]);
                    newTd.appendChild(textNode);
                    myDataRow.appendChild(newTd);
                };
            }
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