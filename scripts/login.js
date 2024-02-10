// variables:
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");

let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

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