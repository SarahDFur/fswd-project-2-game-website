let users = JSON.parse(localStorage.getItem('users')) || [];
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField");
let title = document.getElementById("title");
let loginAttempts = 0;


signupBtn.addEventListener('click', function() {
    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;
    if (title.textContent === "Sign Up") {
        addUser(name, email, password);
    } else {
        toggleForm();
    }
});

signinBtn.addEventListener('click', function() {
    const email = emailField.value;
    const password = passwordField.value;
    if (title.textContent === "Sign In") {
        signIn(email, password);
    } else {
        toggleForm();
    }
});

function addUser(name, email, password) {
    const userExists = users.some(user => user.email === email);
    if (!userExists) {
        const now = new Date();
        const expirationTime = new Date(now.getTime() + 30 * 60000); // 30 minutes
        const newUser = {
            name,
            email,
            password,
            lastSeen: new Date().toISOString(),
            sessionExpiration: expirationTime.toISOString(),
            active: true,
            memoryGameScore: 0, // ציון משחק זיכרון
            flappyBirdScore: 0, // ציון פלאפי בירד
            rockPaperScissorsScore: 0 // ציון אבן נייר ומספריים
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("User registered successfully.");
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

        alert(`Welcome back, ${user.name}! You last logged in on ${new Date(user.lastSeen).toLocaleString()}.`);
        user.lastSeen = now.toISOString(); // update last seen
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        loginAttempts++; // increment login attempts
        if (loginAttempts >= 3) {
            alert("Too many failed login attempts. Please try again later or verify you're not a robot.");
            return;
        }
        alert("Invalid email or password.");
    }
}

function toggleForm() {
    if (title.textContent === "Sign In") {
        title.textContent = "Sign Up";
        nameField.classList.remove("hide");
        signinBtn.textContent = "Switch to Sign In";
        signupBtn.textContent = "Sign Up";
    } else {
        title.textContent = "Sign In";
        nameField.classList.add("hide");
        signinBtn.textContent = "Sign In";
        signupBtn.textContent = "Switch to Sign Up";
    }
}