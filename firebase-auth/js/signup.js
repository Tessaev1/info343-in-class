"use strict";

var signUpForm = document.getElementById("signup-form");
var emailInput = document.getElementById("email-input");
var passwordInput = document.getElementById("password-input");
var displayNameInput = document.getElementById("display-name-input");

signUpForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    //use Firebase to create a new user
    //with the email and password
    //after the account is created, then use
    //the .updateProfile() method to set the display name
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        // callback function to execute when the request/operation is successful
        .then(function(user) {
            // set displayName because firebase call doesn't do that automatically
            return user.updateProfile({
                displayName: displayNameInput.value
            });
        })
        .then(function() {
            // have browser navigate to a new location
            window.location = "secure.html";
        })
        .catch(function(err) {
        alert(err.message);
        });


    return false;
});