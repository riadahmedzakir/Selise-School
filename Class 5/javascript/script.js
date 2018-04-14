   (function() {
       "use strict";
       var vm = window;


       //Storage Getter & Setter Functions 
       function setJsonOnLocalStorage(taskList) {
           localStorage.setItem("taskList", JSON.stringify(taskList));
       }

       function loadJsonFromLocalStorage() {
           var taskList = localStorage.getItem("taskList");
           var dataSet = JSON.parse(taskList);
           return dataSet;
       }

       // GuID Genarator
       function guIdGenarator() {
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
           }
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
       }
       //Event Listner Initialize
       function initializeEventListners() {
           var addTask = document.getElementById('addTask');
           var searhTaskInput = document.getElementById('searhTaskInput');
           var editTask = document.getElementById("editTask");
           var deleteTask = document.getElementById("deleteTask");
           var filterAll = document.getElementById("filterAll");
           var filterToDo = document.getElementById("filterToDo");
           var filterComplete = document.getElementById("filterComplete");

           addTask.addEventListener('click', function() {
               formValidator();
           });

           filterAll.addEventListener("click", function() {})

           filterToDo.addEventListener("click", function() {})

           filterComplete.addEventListener("click", function() {})

           searhTaskInput.addEventListener("click", function() {})

           editTask.addEventListener("click", function() {})

           deleteTask.addEventListener("click", function() {})
       }

       //Form Validator
       function formValidator() {
           var taskNameErr, taskDetailErr, taskDateErr, taskPriorityErr, taskStatusErr = "";

           var taskName = document.getElementsByTagName("input")[1].value;
           var taskDetail = document.getElementsByTagName("input")[2].value;
           var taskDate = document.getElementsByTagName("input")[3].value;
           var taskPriority = document.getElementsByTagName("select")[0].value;
           var taskStatus = document.getElementsByTagName("select")[1].value;

           if (taskName === null || taskName === "") {
               taskNameErr = "*Please provide a task name";
               document.getElementById("taskNameErr").innerHTML = taskNameErr;
           } else {
               taskNameErr = "";
               document.getElementById("taskNameErr").innerHTML = taskNameErr;
           }

           if (taskDetail === null || taskDetail === "") {
               taskDetailErr = "*Please provide details for your task";
               document.getElementById("taskDetailErr").innerHTML = taskDetailErr;
           } else {
               taskDetailErr = "";
               document.getElementById("taskDetailErr").innerHTML = taskDetailErr;
           }

           if (taskDate === null || moment(taskDate).isValid() === false) {
               taskDateErr = "*Please provide a valid date";
               document.getElementById("taskDateErr").innerHTML = taskDateErr;
           } else {
               taskDateErr = "";
               document.getElementById("taskDateErr").innerHTML = taskDateErr;
           }

           if (taskPriority !== 'High' && taskPriority !== 'Medium' && taskPriority !== 'Low') {
               taskPriorityErr = "*Please choose your priority";
               document.getElementById("taskPriorityErr").innerHTML = taskPriorityErr;
           } else {
               taskPriorityErr = "";
               document.getElementById("taskPriorityErr").innerHTML = taskPriorityErr;
           }

           if (taskStatus !== 'OnQueue' && taskStatus !== 'InProgress' && taskStatus !== 'Completed') {
               taskStatusErr = "*Please select your task status";
               document.getElementById("taskStatusErr").innerHTML = taskStatusErr;
           } else {
               taskStatusErr = "";
               document.getElementById("taskStatusErr").innerHTML = taskStatusErr;
           }


           if (taskNameErr === "" && taskDetailErr === "" && taskDateErr === "" && taskStatusErr === "" && taskPriorityErr === "") {
               addTask(taskName, taskDetail, taskDate, taskPriority, taskStatus, guIdGenarator());
           }
       }

       function addTask(taskName, taskDetail, taskDate, taskPriority, taskStatus, guId) {
           if (loadJsonFromLocalStorage() === null) {
               var newTask = {
                   "taskName": taskName,
                   "taskDetail": taskDetail,
                   "taskDate": taskDate,
                   "taskPriority": taskPriority,
                   "taskStatus": taskStatus,
                   "guId": guId
               }

               var newTaskList = [];
               newTaskList.push(newTask);
               console.log(newTaskList);
               setJsonOnLocalStorage(newTaskList);
           } else {
               var newTask = {
                   "taskName": taskName,
                   "taskDetail": taskDetail,
                   "taskDate": taskDate,
                   "taskPriority": taskPriority,
                   "taskStatus": taskStatus,
                   "guId": guId
               }

               var oldTask = loadJsonFromLocalStorage();
               oldTask.push(newTask);
               setJsonOnLocalStorage(oldTask);
           }
       }

       //Init Function
       function init() {
           initializeEventListners();

           if (localStorage.getItem("myTaskList") !== null) {

           }

       }

       init();
   })(window);