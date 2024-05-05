document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetchModal('settle-up-modal'),
        fetchModal('share-modal'),
        fetchModal('quick-add-modal'),
        fetchPartial('events_page/overview', 'overview-container'),
        fetchPartial('events_page/transactions', 'transactions-container'),
        fetchLayout('footer', 'footer-container'),
    ]).then(() => {

        const script = document.createElement('script');
        script.src = '/node_modules/flowbite/dist/flowbite.min.js';
        document.body.appendChild(script);
    });
});
function fetchModal(modalId) {
    return fetch(`../modals/${modalId}.html`)
        .then(response => response.text())
        .then(data => {
            const modalContainer = document.getElementById(`${modalId}-container`);
            if (modalContainer) {
                modalContainer.innerHTML = data;
            }
        });
}

function fetchPartial(partialPath, containerId) {
    return fetch(`../partials/${partialPath}.html`)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
            }
        });
}

function fetchLayout(layoutPath, containerId) {
    return fetch(`../layout/${layoutPath}.html`)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
            }
        });
}

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

window.addEventListener('load',async e=>{
    if('serviceWorker' in navigator){
        try{
            navigator.serviceWorker.register('../../serviceWorker.js');
            console.log('Service Worker Registered');
        }catch(error){
            console.log('Service Worker Registration Failed');
        }
    }
})