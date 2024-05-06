import config from '../config.js';
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging
    .requestPermission()
    .then(() => {
        console.log("Notifications allowed")
        return messaging.getToken();
    })
    .then(token => {
        console.log("Token Is : " + token)
    })
    .catch(err => {
        console.log("No permission to send push", err);
    });

messaging.onMessage(payload => {
    console.log("Message received. ", payload);
    const { title, ...options } = payload.notification;
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            navigator.serviceWorker.register('/serviceWorker.js')
            // navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function (registration) {
            //     console.log('Service Worker Registration Successful with scope FCM: ', registration.scope);
            // }).catch(function (err) {
            //     console.log('Service Worker Registration Failed to FCM', err);
            // })
        } catch (error) {
            console.log('Service Worker Registration Failed to FCM');
        }
    })
}


// if (!("Notification" in window)) {
//     console.log("This browser does not support desktop notification");
// } else if (Notification.permission === "granted") {
//     // Si el permiso ya fue otorgado
//     messaging.onMessage(showNotification);
// } else if (Notification.permission !== "denied") {
//     // Si el permiso no ha sido denegado aún, solicitarlo al usuario
//     Notification.requestPermission().then(function (permission) {
//         // Si el usuario acepta, mostrar la notificación
//         if (permission === "granted") {
//             messaging.onMessage(showNotification);
//         }
//     });
// }

if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    let deferredPrompt;
    const btnAdd = document.getElementById('install-button');
    if (btnAdd) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            // Update UI to notify the user they can add to home screen
            btnAdd.style.display = 'block';
        });

        btnAdd.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = '/node_modules/flowbite/dist/flowbite.min.js';
    document.body.appendChild(script);
});


if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});

