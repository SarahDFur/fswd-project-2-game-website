// variables:
    // buttons:
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
    // fields:
let nameField = document.getElementById("nameField");
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField");
    // title of login page (that you see):
let title = document.getElementById("title");

// might change this ↓
let users = JSON.parse(localStorage.getItem('users')) || {
    name: "",
    email: "",
    password: "",
    lastSeen: "10/02/2024",
    active: "True",
    medals: []
};

// click functions:
signinBtn.onclick = function () {
    nameField.style.maxHeight = "0"; // hide name field
    title.innerHTML = "Sign In"; // change title
    signupBtn.classList.add("disable"); // add classname disable to this button everytime we click on sign in
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function () {
    nameField.style.maxHeight = "60px"; // hide name field
    title.innerHTML = "Sign Up"; // change title
    signupBtn.classList.remove("disable"); // add classname disable to this button everytime we click on sign up
    signinBtn.classList.add("disable");
}


// adding users to json file
document.body.addEventListener('keydown', (event) => {
    if (event.key === '\n') {


// need to check for empty string as well



        if(signinBtn.classList.contains("disable")) { // we're in the sign up section
            /**
             * 1. check if user already exists!
             * 2. if exists: alert(user name or email already exists)
             * 3. don't sign them in
             * 4. otherwise:
             * 4.1. add to json file user info
             * 4.2. 
             */
            if(users.contains(nameField) || users.contains(emailField)) {
                alert("user name or email already exists. Please use different information");
            } else {
                users.add({
                    name: nameField,
                    email: emailField,
                    password: passwordField,
                    lastSeen: JSON.stringify(Date.now()),
                    active: "True",
                    medals: []
                });

                localStorage.setItem('score', JSON.stringify(score));
            }
        }
        else { 
            if(signupBtn.classList.contains("disable")) { // we're in the sign in section
                /**
                 * 1. check if user already exists!
                 * 2. if exists: enter the home page and load all inforamtion 
                 * 3. otherwise: don't sign them in
                 * 4. alert that they don't have an existing account
                 */
                if(users.contains(nameField)) {
                    // open home page
                } else {
                    alert("You have no existing account");
                }
            }
        }
    }
});