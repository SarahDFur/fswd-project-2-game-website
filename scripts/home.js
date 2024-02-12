import { user } from './login.js';

function getUserFromLocalStorage() {
    user = localStorage.users.getItem('currentUser')
    console.log("user at home page:" + user);
    // const user = localStorage.getItem('user');
    // console.log(user, "3")

    return user;
}

document.addEventListener('DOMContentLoaded', () => {
    // const user = getUserFromLocalStorage();
    console.log(user);
    if (user) {
        document.getElementById('userName').textContent += user.name;
        document.getElementById('lastLogin').textContent += new Date(user.lastSeen).toLocaleString();
    }
});

document.querySelectorAll('.game-title').forEach(game => {
    game.addEventListener('click', (e) => {
        const user = getUserFromLocalStorage();
        if (!user) {
            e.preventDefault(); //
            alert('Please sign in or sign up to play the game.');
            window.location.href = 'login.html'; //
        }
    });
});

function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user, "1");
    alert("!!!!!!!!!")
    if (user) {
        document.querySelector('.user-name').textContent = `Username: ${user.name}`;
        document.querySelector('.last-login').textContent = `Last Login: ${new Date(user.lastSeen).toLocaleString()}`;
    }
});

function logout() {
    localStorage.removeItem('currentUser'); // מחיקת המשתמש הנוכחי מ-localStorage
    window.location.href = 'login.html'; // החזרה לעמוד ההתחברות
}