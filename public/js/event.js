document.addEventListener('DOMContentLoaded', (event) => {

    const divs = document.getElementsByClassName('expense-user');
   console.log({divs})
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function () {
            window.location.href = '/edit-transaction';
        });
    }
});