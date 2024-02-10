let users = JSON.parse(localStorage.getItem('users')) || [];
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField");
let title = document.getElementById("title");

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
        const newUser = {
            name,
            email,
            password,
            score: 0
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("User registered successfully.");
        toggleForm();
    } else {
        alert("User name or email already exists. Please use different information.");
    }
}

function signIn(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert(`Welcome back, ${user.name}! Your high score is ${user.score}.`);
    } else {
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