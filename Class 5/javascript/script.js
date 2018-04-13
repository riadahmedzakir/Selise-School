   (function() {
       "use strict";
       var vm = window;


       function setJsonOnLocalStorage(myTaskList) {
           localStorage.setItem("myTaskList", myTaskList);
       }

       function loadJsonFromLocalStorage() {
           var myTaskList = localStorage.getItem("myTaskList");
           var myData = JSON.parse(myTaskList);
           return myData;
       }

       function initializeEventListners() {}

       function init() {
           initializeEventListners();

           if (localStorage.getItem("myTaskList") !== null) {
               
           }
       }

       init();
   })(window);