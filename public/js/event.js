document.addEventListener('DOMContentLoaded', (event) => {
    fetch('../modals/settle-up-modal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('settle-up-modal-container').innerHTML = data;
        });

    fetch('../modals/share-modal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('share-modal-container').innerHTML = data;
        });

    fetch('../modals/quick-add-modal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('quick-add-modal-container').innerHTML = data;
        });

    fetch('../partials/events_page/overview.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('overview-container').innerHTML = data;
        });

    fetch('../partials/events_page/transactions.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('transactions-container').innerHTML = data;
        });
});