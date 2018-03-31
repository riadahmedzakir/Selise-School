(function() {
    "use strict";

    var vm = window;

    class Table {

        constructor(myData) {
            this.createTable(myData);
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

        createTable(myData) {
            var newtable = document.createElement("table");
            newtable.classList.add('table');
            newtable.classList.add('table-striped');
            newtable.classList.add('table-hover');
            newtable.classList.add('table-dark');
            newtable.classList.add('table-bordered');
            newtable.setAttribute("id", "myDataTable");
            newtable.setAttribute("value", "dark");
            var element = document.getElementById("tableContainer");
            element.appendChild(newtable);

            this.createColumn(myData);
        }

        createColumn(myData) {
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

            this.createRow(myData);
        }

        createRow(myData) {
            var rowCount = this.objectLength(myData);
            var newTablebody = document.createElement('tbody');
            newTablebody.setAttribute("id", "myTableBody");
            var myDataTable = document.getElementById('myDataTable');
            myDataTable.appendChild(newTablebody);

            for (var x = 0; x < rowCount; x++) {
                var newRow = document.createElement("tr");
                newRow.setAttribute("id", "myDataRow" + x);
                var myTableBody = document.getElementById("myTableBody");
                myTableBody.appendChild(newRow);
                var myDataRow = document.getElementById("myDataRow" + x);

                for (var y in Object.values(myData)[x]) {
                    var newTd = document.createElement("td");
                    newTd.setAttribute("id", y + x);
                    newTd.setAttribute("contenteditable", "false");
                    if (y === 'FIRST NAME' || y === 'LAST NAME') {
                        newTd.addEventListener("dblclick", function() {
                            makeEditable(this.id);
                        });
                        newTd.addEventListener("focusout", function() {
                            makeNonEditable(this.id);
                        });
                        newTd.addEventListener("keypress", function(event) {
                            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                                makeNonEditable(this.id);
                            }
                        });
                    }
                    var textNode = document.createTextNode(Object.values(myData)[x][y]);
                    newTd.appendChild(textNode);
                    myDataRow.appendChild(newTd);
                };
            }
        }
    }

    function makeEditable(idValue) {
        var element = document.getElementById(idValue);
        element.setAttribute("contenteditable", "true");
        element.classList.add('editable-effect');
    }

    function makeNonEditable(idValue) {
        var element = document.getElementById(idValue);
        element.setAttribute("contenteditable", "false");
        element.classList.remove('editable-effect');
    }

    function personEventListner() {
        var element = document.getElementById('addPerson');
        element.addEventListener("click", function() {
            if (this.value === 'isClickable') {
                addPersonForm();
            }
        });
    }

    function addPersonForm() {
        var myData = loadJsonFromLocalStorage();
        var personInputTable = document.getElementById("newPersonInfo");
        for (var x in Object.values(myData)[0]) {
            var newInput = document.createElement("input");
            newInput.classList.add("form-control");
            newInput.setAttribute("name", x);
            newInput.setAttribute("placeholder", x.toLowerCase() + " ...........");
            personInputTable.appendChild(newInput);
        };

        var personInputSave = document.createElement("button");
        personInputSave.setAttribute("id", "savePerson");
        personInputSave.setAttribute("type", "button");
        personInputSave.classList.add("btn");
        personInputSave.classList.add("btn-primary");
        personInputSave.classList.add("btn-lg");
        personInputSave.classList.add("btn-block");
        personInputSave.addEventListener("click", function() {
            savePerson();
        });
        var textNode = document.createTextNode("Save");
        personInputSave.appendChild(textNode);
        personInputTable.appendChild(personInputSave);
        var element = document.getElementById('addPerson');
        element.setAttribute("value", "isNotClickable");
    }

    function savePerson() {
        var randomKeyValue = randomKeyGenarator();

        var newJson = '';
        console.log(randomKeyValue);
        var element = document.getElementById('newPersonInfo');
        element.innerHTML = '';
        var element = document.getElementById('addPerson');
        element.setAttribute("value", "isClickable");
    }

    function randomKeyGenarator() {
        var value = (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)).toUpperCase();
        return value;
    }

    function changeTheme() {
        var element = document.getElementById('toggleTheme');

        element.addEventListener("click", function() {
            var myDataTable = document.getElementById('myDataTable');

            if (myDataTable.getAttribute("value") === 'dark') {
                myDataTable.classList.remove('table-dark');
                myDataTable.classList.add('table-info');

                element.classList.remove('btn-dark');
                element.classList.add('btn-info');
                myDataTable.setAttribute("value", "light");
            } else if (myDataTable.getAttribute("value") === 'light') {
                myDataTable.classList.remove('table-info');
                myDataTable.classList.add('table-dark');

                element.classList.remove('btn-info');
                element.classList.add('btn-dark');
                myDataTable.setAttribute("value", "dark");
            }
        })
    }

    function setJsonOnLocalStorage(myJsonString) {
        localStorage.setItem("myJsonString", myJsonString);
    }

    function loadJsonFromLocalStorage() {
        var myJsonString = localStorage.getItem("myJsonString");
        var myData = JSON.parse(myJsonString);
        return myData;
    }

    function init() {
        setJsonOnLocalStorage('{ "ROW_ONE": { "FIRST NAME": "John", "LAST NAME": "Doe", "TITLE": "Administration Vice President", "MANAGER": "Steven King", "DEPARTMENT": "Executive", "SALARY": "17000" }, "ROW_TWO": { "FIRST NAME": "Jane", "LAST NAME": "Doe", "TITLE": "Programmer", "MANAGER": "Lex De Haan", "DEPARTMENT": "IT", "SALARY": "9000" }, "ROW_THREE": { "FIRST NAME": "Hulond", "LAST NAME": "Doe", "TITLE": "Accountant", "MANAGER": "Nancy Greenberg", "DEPARTMENT": "Finance", "SALARY": "8000" }, "ROW_FOUR": { "FIRST NAME": "Faviet", "LAST NAME": "Doe", "TITLE": "Finance Manager", "MANAGER": "Alexander Hulond", "DEPARTMENT": "Finance", "SALARY": "12000" } }');
        var myTable = new Table(loadJsonFromLocalStorage());
        changeTheme();
        personEventListner();
    }

    init();
})(window);