// Initialize variables and load users from localStorage
let users = loadOrInitializeUsers();
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Elements from the document
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameFieldInput = document.querySelector("#nameField input");
let emailField = document.querySelector("#emailField input");
let passwordField = document.querySelector("#passwordField input");
let title = document.getElementById("title");
let loginAttempts = 0;

function loadOrInitializeUsers() {
    let users;
    try {
        users = JSON.parse(localStorage.getItem('users'));
    } catch (error) {
        console.error('Error parsing users from localStorage:', error);
    }
    
    if (!Array.isArray(users)) {
        console.log('Initializing users as an empty array.');
        users = [];
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    return users;
}

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
// Function to add a new user
function addUser(name, email, password) {
    // Check if user already exists
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
// Function for user sign-in
function signIn(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        user.lastSeen = new Date().toISOString();
        user.sessionExpiration = new Date(new Date().getTime() + 30 * 60000).toISOString();
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert("Logged in successfully.");
        window.location.href = 'home.html';
    } else {
        loginAttempts++;
        if (loginAttempts >= 3) {
            // Freeze the page for a minute if there are more than 3 failed login attempts
            alert("Too many failed login attempts. Please try again later.");
            setTimeout(() => {
                loginAttempts = 0; // Reset the login attempts after a minute
            }, 60000);
            return;
        }
        alert("Invalid email or password.");
    }
}

// click functions:
// Toggle functions for switching between sign up and sign in
function signinToggle() {
    // Switch to sign in mode
    nameField.style.maxHeight = "0px";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

function signupToggle() {
    // Switch to sign up mode
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}

// Load users from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    users = JSON.parse(localStorage.getItem('users')) || [];
});

// export { user };