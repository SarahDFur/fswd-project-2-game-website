let users = JSON.parse(localStorage.getItem('users')) || [];
let user; // user that is currently in the system
// buttons and field variables
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.querySelector("#nameField input");
let emailField = document.querySelector("#emailField input");
let passwordField = document.querySelector("#passwordField input");
let title = document.getElementById("title");
let loginAttempts = 0;

// 
signupBtn.addEventListener('click', () => {
    if (title.textContent === "Sign Up") {
        addUser(nameField.value, emailField.value, passwordField.value);
    } else {
        toggleForm();
    }
});

signinBtn.addEventListener('click', () => {
    if (title.textContent === "Sign In") {
        signIn(emailField.value, passwordField.value);
    } else {
        toggleForm();
    }
});

function addUser(name, email, password) {
    const userExists = users.some(user => user.email === email);
    if (!userExists) {
        const now = new Date();
        const expirationTime = new Date(now.getTime() + 30 * 60000); // 30 minutes
        const user = {
            name,
            email,
            password,
            lastSeen: new Date().toISOString(),
            sessionExpiration: expirationTime.toISOString(),
            active: true,
            memoryGameScore: 0, // 
            flappyBirdScore: 0, // 
            rockPaperScissorsScore: 0 // 
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert("User registered successfully.");
        console.log(users)


        window.location.href = 'home.html';
    } else {
        alert("User name or email already exists. Please use different information.");
    }
}


function signIn(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        const now = new Date();
        const expirationTime = new Date(now.getTime() + 30 * 60000); // 30 minutes
        user.sessionExpiration = expirationTime.toISOString(); // update session expiration
        loginAttempts = 0; // reset login attempts
        user.lastSeen = now.toISOString(); // update last seen
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'home.html';
        console.log(user)
        console.log(users)
    } else {
        loginAttempts++; // increment login attempts
        if (loginAttempts >= 3) {
            alert("Too many failed login attempts. Please try again later.");
            return;
        }
        alert("Invalid email or password.");
    }
}

function toggleForm() {
    if (title.textContent === "Sign In") {
        title.textContent = "Sign Up";
        nameField.parentElement.classList.remove("hide"); // 
        signinBtn.textContent = "Sign Up";
        signupBtn.textContent = "Switch to Sign In";
    } else {
        title.textContent = "Sign In";
        nameField.parentElement.classList.add("hide"); // problem area
        signinBtn.textContent = "Sign In";
        signupBtn.textContent = "Switch to Sign Up";
    }
}