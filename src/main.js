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

themeToggleBtn.addEventListener('click', function() {

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

function homePage() {
    return document.getElementById('home').innerHTML;
}

function newEventPage() {
    return fetch('new_event.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('app').innerHTML = data;
        });
}
function navigate(page) {
    // Actualiza el contenido de la página
    document.getElementById('app').innerHTML = page();

    // Agrega la página al historial de navegación
    window.history.pushState({}, '', `/${page.name}`);
}

window.onpopstate = function(event) {
    // Actualiza el contenido de la página basado en la URL
    if (window.location.pathname === '/') {
        document.getElementById('app').innerHTML = homePage();
    } else if (window.location.pathname === '/newEventPage') {
        document.getElementById('app').innerHTML = newEventPage();
    }
};

document.getElementById('new-event-link').addEventListener('click', function(event) {
    event.preventDefault();
    navigate(newEventPage);
});