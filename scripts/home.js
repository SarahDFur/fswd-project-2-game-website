function getUserFromLocalStorage() {
    user = localStorage.users.getItem('currentUser')
    console.log("user at home page:" + user);
    return user;
}
document.addEventListener('DOMContentLoaded', () => {
    const user = getUserFromLocalStorage();
    if (user) {
        // Update UI with user information
        document.querySelector('.user-name').textContent += ` ${user.name}`;
        document.querySelector('.last-login').textContent += ` ${new Date(user.lastSeen).toLocaleString()}`;
        document.querySelector('.memory-game-score').textContent += ` ${user.memoryGameScore}`;
        document.querySelector('.flappy-bird-score').textContent += ` ${user.flappyBirdScore}`;
        document.querySelector('.rock-paper-scissors-score').textContent += ` ${user.rockPaperScissorsScore}`;
        
        // Check for session expiration
        checkSessionExpiration(user);
    } else {
        // Redirect to login if no user data is found
        window.location.href = 'login.html';
    }
});

document.querySelectorAll('.game-title').forEach(game => {
    game.addEventListener('click', (e) => {
        const user = getUserFromLocalStorage();
        if (!user) {
            e.preventDefault(); //
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
    user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    if (user) {
        document.querySelector('.user-name').textContent = `Username: ${user.name}`;
        document.querySelector('.last-login').textContent = `Last Login: ${new Date(user.lastSeen).toLocaleString()}`;
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html'; // 
}

function checkSessionExpiration(user) {
    const now = new Date();
    const sessionExpiration = new Date(user.sessionExpiration);
    if (sessionExpiration < now) {
        alert('Your session has expired. Please log in again.');
        window.location.href = 'login.html';
    }
}
