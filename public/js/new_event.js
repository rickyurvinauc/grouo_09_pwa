document.addEventListener('DOMContentLoaded', (event) => {
    // Selecciona el botón "Add participant" por su ID
    const addButton = document.getElementById('add-button');

    // Selecciona el contenedor donde quieres agregar los nuevos divs por su ID
    const containerFriends = document.getElementById('container-friends');

    // Agrega un controlador de eventos al botón
    addButton.addEventListener('click', function () {
        // Crea un nuevo div con el mismo contenido
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="grid md:grid-cols-1 mb-4">
                <div class="flex">
                    <div class="relative w-full">
                        <input type="text"
                            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Your friend's name" required/>
                        <a 
                            class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 delete-button">
                            <i class="fas fa-trash-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Agrega el nuevo div al contenedor
        containerFriends.appendChild(newDiv);

        // Agrega un controlador de eventos al botón de borrar
        newDiv.querySelector('.delete-button').addEventListener('click', function () {
            // Elimina el div de entrada
            containerFriends.removeChild(newDiv);
        });
    });

    const form = document.getElementById('event-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const friendInputs = document.querySelectorAll('#container-friends input');

        // Crea un array para almacenar los nombres de los amigos
        const friends = [];

        // Itera sobre los inputs de los nombres de los amigos y agrega cada nombre al array
        friendInputs.forEach(input => {
            friends.push(input.value);
        });

        const eventForm = {
            id: formData.get('id_event') ? formData.get('id_event') : null,
            event_name: formData.get('event_name'),
            currency: formData.get('currency'),
            participant_name: formData.get('participant_name'),
            friends: friends,
        };

        if (eventForm.id) {
            editEvent(eventForm);
        }else{
            createEvent(eventForm);
        }

    });
});

function createEvent(eventForm) {
    console.log(eventForm);
    // window.location.href = '/'
}

function editEvent(eventForm) {
    console.log(eventForm);
    // window.location.href = '/event.js'
}