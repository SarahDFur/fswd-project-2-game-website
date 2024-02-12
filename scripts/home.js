function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    console.log(user, "3")

    return user ? JSON.parse(user) : null;
}

document.addEventListener('DOMContentLoaded', () => {
    const user = getUserFromLocalStorage();
    console.log(user, "2")
    if (user) {
        document.getElementById('userName').textContent += user.name;
        document.getElementById('lastLogin').textContent += new Date(user.lastSeen).toLocaleString();
    }
});

document.querySelectorAll('.game-title').forEach(game => {
    game.addEventListener('click', (e) => {
        const user = getUserFromLocalStorage();
        if (!user) {
            e.preventDefault(); // מונעת מהקישור לבצע את הפעולה הדיפולטיבית
            alert('Please sign in or sign up to play the game.');
            window.location.href = 'login.html'; // מעביר את המשתמש לעמוד ההתחברות
        }
    });
});

function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

document.addEventListener('DOMContentLoaded', () => {
    const user = getUserFromLocalStorage();
    console.log(user, "1")

    if (user) {
        // אם יש משתמש שמור, הצג את הפרטים שלו ב-navbar
        document.querySelector('.user-name').textContent = `Username: ${user.name}`;
        document.querySelector('.last-login').textContent = `Last Login: ${new Date(user.lastSeen).toLocaleString()}`;
    } else {
        // אם אין משתמש, הצג קישור להתחברות/הרשמה
        const signInUpLink = document.createElement('a');
        signInUpLink.href = 'login.html';
        signInUpLink.textContent = 'Sign In / Sign Up';
        signInUpLink.className = 'sign-button';
        document.querySelector('.navbar-container').appendChild(signInUpLink);
    }
});