let users = JSON.parse(localStorage.getItem('users')) || [];
let User; // user that is currently in the system
// buttons and field variables
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField"); // for styling
let nameFieldInput = document.querySelector("#nameField input"); // for passing input
let emailField = document.querySelector("#emailField input");
let passwordField = document.querySelector("#passwordField input");
let title = document.getElementById("title");
let loginAttempts = 0;

// click on sign up button 
signupBtn.addEventListener('click', () => {
    if (title.textContent === "Sign Up") {
        addUser(nameFieldInput.value, emailField.value, passwordField.value);
    } else {
        signupToggle(); // toggleForm();
    }
});

// click on sign in button 
signinBtn.addEventListener('click', () => {
    if (title.textContent === "Sign In") {
        signIn(emailField.value, passwordField.value);
    } else {
        signinToggle(); // toggleForm();
    }
});

// functions 
function addUser(name, email, password) {
    users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);
    if (!userExists) {
        const newUser = {
            name,
            email,
            password,
            lastSeen: new Date().toISOString(),
            sessionExpiration: new Date(new Date().getTime() + 30 * 60000).toISOString(),
            active: true,
            memoryGameScore: 0,
            flappyBirdScore: 0,
            rockPaperScissorsScore: 0
        };
        users.push(newUser); 
        localStorage.setItem('users', JSON.stringify(users)); 
        localStorage.setItem('currentUser', JSON.stringify(newUser)); 
        alert("User registered successfully.");
        window.location.href = 'home.html';
    } else {
        alert("User name or email already exists. Please use different information.");
    }
}

// sign in function

function signIn(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
        const now = new Date();
        user.lastSeen = now.toISOString();
        user.sessionExpiration = new Date(now.getTime() + 30 * 60000).toISOString();
        localStorage.setItem('currentUser', JSON.stringify(user)); // עדכון המשתמש הנוכחי בלבד
        alert("Logged in successfully.");
        loginAttempts = 0; // reset login attempts  
        localStorage.setItem('users', JSON.stringify(user));
        window.location.href = 'home.html';
    } else {
        loginAttempts++; // increment login attempts
        if (loginAttempts >= 3) {
            alert("Too many failed login attempts. Please try again later.");
            return;
        }
        alert("Invalid email or password.");
    }
}

// click functions:
function signinToggle() {
    nameField.style.maxHeight = "0px"; // hide name field
    title.innerHTML = "Sign In"; // change title
    signupBtn.classList.add("disable"); // add classname disable to this button everytime we click on sign in
    signinBtn.classList.remove("disable");
}

function signupToggle() {
    nameField.style.maxHeight = "60px"; // hide name field
    title.innerHTML = "Sign Up"; // change title
    signupBtn.classList.remove("disable"); // add classname disable to this button everytime we click on sign up
    signinBtn.classList.add("disable");
}

document.addEventListener('DOMContentLoaded', () => {
    users = JSON.parse(localStorage.getItem('users')) || [];
});

// export { user };