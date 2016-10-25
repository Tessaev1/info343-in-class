//put the interpreter into strict mode
"use strict";

//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCvSoZTeGRTtt43bY7_KKO-vUlCYJiWS3U",
    authDomain: "tasks-demo-b3fd6.firebaseapp.com",
    databaseURL: "https://tasks-demo-b3fd6.firebaseio.com",
    storageBucket: "tasks-demo-b3fd6.appspot.com",
    messagingSenderId: "337170385473"
};
firebase.initializeApp(config);

var currentUser;
var authProvider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        console.log(currentUser);
    } else {
        firebase.auth().signInWithRedirect(authProvider);
    }
});

var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");
var purgeButton = document.querySelector(".btn-purge");

var tasksRef = firebase.database().ref("tasks");

taskForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    var task = {
        title: taskTitleInput.value.trim(),
        done: false,
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };
    tasksRef.push(task);
    taskTitleInput.value = "";

    return false;
});

function renderTask(snapshot) {
    var task = snapshot.val();
    var li = document.createElement("li");
    // li.textContent = task.title;

    var spanTitle = document.createElement("span");
    spanTitle.textContent = task.title;
    spanTitle.classList.add("task-title");
    li.appendChild(spanTitle);

    var spanCreation = document.createElement("span");
    spanCreation.textContent = moment(task.createdOn).fromNow() 
    + " by " + (task.createdBy.displayName || task.createdBy.email);
    spanCreation.classList.add("task-creation");
    li.appendChild(spanCreation);

    if (task.done) {
        li.classList.add("done");
        purgeButton.classList.remove("hidden");
    }

    li.addEventListener("click", function() {
        // console.log("click for " + task.title);
        snapshot.ref.update({
            // set opposite to whatever value it is right now
            done: !task.done
        });
    });

    taskList.appendChild(li);
}

function render(snapshot) {
    taskList.innerHTML = "";
    purgeButton.classList.add("hidden");
    snapshot.forEach(renderTask)
}

tasksRef.on("value", render);

// this actually deletes, but to implement an "undo", use a boolean "deleted" that switches between true and false, having Firebase only retrieve data where "deleted" is set to false
purgeButton.addEventListener("click", function() {
    // console.log("purge button clicked");
    tasksRef.once("value", function(snapshot) {
        snapshot.forEach(function(taskSnapshot) {
            if (taskSnapshot.val().done) {
                taskSnapshot.ref.remove();
            }
        });
    });
});