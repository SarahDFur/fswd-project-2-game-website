// import { user } from './login.js';

// function getUserFromLocalStorage() {
//     console.log("user at home page:" + user);
//     // const user = localStorage.getItem('user');
//     console.log(user, "3")

//     return user;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     // const user = getUserFromLocalStorage();
//     console.log(user, "2");
//     if (user) {
//         document.getElementById('userName').textContent += user.name;
//         document.getElementById('lastLogin').textContent += new Date(user.lastSeen).toLocaleString();
//     }
// });

// document.querySelectorAll('.game-title').forEach(game => {
//     game.addEventListener('click', (e) => {
//         const user = getUserFromLocalStorage();
//         if (!user) {
//             e.preventDefault(); // מונעת מהקישור לבצע את הפעולה הדיפולטיבית
//             alert('Please sign in or sign up to play the game.');
//             window.location.href = 'login.html'; // מעביר את המשתמש לעמוד ההתחברות
//         }
//     });
// });

function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
//     user = localStorage.users.getItem('currentUser')
//     console.log("user at home page:" + user);
//     // const user = localStorage.getItem('user');
//     // console.log(user, "3")

//     return user;
}

// document.addEventListener('DOMContentLoaded', () => {
    // const user = getUserFromLocalStorage();
    console.log(User, "1");


    if (User) {
        // אם יש משתמש שמור, הצג את הפרטים שלו ב-navbar
        document.querySelector('.user-name').textContent = `Username: ${User.name}`;
        document.querySelector('.last-login').textContent = `Last Login: ${new Date(User.lastSeen).toLocaleString()}`;
    } else {
        // אם אין משתמש, הצג קישור להתחברות/הרשמה
        const signInUpLink = document.createElement('a');
        signInUpLink.href = 'login.html';
        signInUpLink.textContent = 'Sign In / Sign Up';
        signInUpLink.className = 'sign-button';
        document.querySelector('.navbar-container').appendChild(signInUpLink);
    }


    console.log(User, "2");
    if (User) {
        document.getElementById('userName').textContent += User.name;
        document.getElementById('lastLogin').textContent += new Date(User.lastSeen).toLocaleString();
    }

    function getUserFromLocalStorage() {
        console.log("user at home page:" + User);
        // const user = localStorage.getItem('user');
        console.log(User, "3")
    
        return user;
    }
    
    document.querySelectorAll('.game-title').forEach(game => {
        game.addEventListener('click', (e) => {
            // const user = getUserFromLocalStorage();
            if (!User) {
                e.preventDefault(); // מונעת מהקישור לבצע את הפעולה הדיפולטיבית
                alert('Please sign in or sign up to play the game.');
                window.location.href = 'login.html'; // מעביר את המשתמש לעמוד ההתחברות
            }
        });
    });
    
    function logout() {
        localStorage.removeItem('currentUser'); // מחיקת המשתמש הנוכחי מ-localStorage
        window.location.href = 'login.html'; // החזרה לעמוד ההתחברות
    }
// });
// document.querySelectorAll('.game-title').forEach(game => {
//     game.addEventListener('click', (e) => {
//         const user = getUserFromLocalStorage();
//         if (!user) {
//             e.preventDefault(); //
//             alert('Please sign in or sign up to play the game.');
//             window.location.href = 'login.html'; //
//         }
//     });
// });

// function getUserFromLocalStorage() {
//     return JSON.parse(localStorage.getItem('currentUser'));
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const user = JSON.parse(localStorage.getItem('currentUser'));
//     console.log(user, "1");
//     alert("!!!!!!!!!")
//     if (user) {
//         document.querySelector('.user-name').textContent = `Username: ${user.name}`;
//         document.querySelector('.last-login').textContent = `Last Login: ${new Date(user.lastSeen).toLocaleString()}`;
//     }
// });

// function logout() {
//     localStorage.removeItem('currentUser'); // מחיקת המשתמש הנוכחי מ-localStorage
//     window.location.href = 'login.html'; // החזרה לעמוד ההתחברות
// }