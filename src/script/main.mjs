
/*---------------------------------------------------MODIFY DOCUMENT----------------------------------------------------------------------------------*/

// Agrega un evento que se dispara cuando el documento HTML se ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función buttonFilter para inicializar la interactividad del botón
    buttonFilter();

    // Llama a la función filters para cargar y mostrar la información de los Pokémon
    filters();

    // Llama a la función getPokemon para obtener y mostrar la información de los Pokémon
    getPokemon();
});


/*                                                     EXPLICACIONES:

document.addEventListener('DOMContentLoaded', () => { ... });

Este código agrega un evento que se activa cuando todo el documento HTML se ha cargado completamente en el navegador. Esto garantiza que las funciones se 
ejecuten después de que la estructura del documento esté disponible para su manipulación.

buttonFilter();
Llama a la función buttonFilter para inicializar la interactividad del botón. La función probablemente configure algún comportamiento relacionado con los filtros de Pokémon.

filters();
Llama a la función filters para cargar y mostrar la información de los Pokémon. Esta función podría estar encargada de la configuración inicial de los filtros o de mostrar 
algún tipo de información relacionada con los Pokémon.

getPokemon();
Llama a la función getPokemon para obtener y mostrar la información de los Pokémon. Esta función probablemente realiza solicitudes a la API de Pokémon y muestra la 
información en la interfaz de usuario.

En resumen, este código asegura que ciertas funciones se ejecuten después de que el documento HTML se haya cargado completamente. Esto es útil para garantizar que 
las operaciones relacionadas con la manipulación del DOM y la interactividad con el usuario se realicen en un momento adecuado durante el ciclo de vida de la página web.
*/

/* ----------------------------------------------------MENU FILTERS----------------------------------------------------------------------------*/

// Definición de la función buttonFilter
const buttonFilter = () => {
    // Selecciona el botón y el contenedor asociado en el DOM
    var buttonFilter = document.getElementById('button_filter');
    var containerFilters = document.getElementById('container_filters');

    // Agrega un escucha de evento de clic al botón
    buttonFilter.addEventListener('click', function () {
        // Alterna la clase "active" para mostrar u ocultar el contenedor con animación
        containerFilters.classList.toggle('active');
    });
};

/*                                                     EXPLICACIONES:

buttonFilter es una función que se encarga de gestionar la interacción del usuario con un botón y un contenedor en la interfaz de usuario.

document.getElementById('button_filter') selecciona el elemento del DOM con el id 'button_filter', que suele ser un botón.

document.getElementById('container_filters') selecciona el elemento del DOM con el id 'container_filters', que suele ser el contenedor que se mostrará u ocultará.

buttonFilter.addEventListener('click', function () { ... }); agrega un escucha de evento al botón. Cuando el botón es clicado, la función proporcionada se ejecuta.

containerFilters.classList.toggle('active'); alterna la presencia de la clase 'active' en el contenedor. Si la clase está presente, se elimina; si no está presente, se agrega. 
Esta clase 'active' generalmente está asociada a reglas de estilo CSS que controlan la visibilidad o apariencia del contenedor.

En resumen, esta función permite que al hacer clic en el botón, se muestre u oculte el contenedor, creando así un efecto de despliegue o colapso.


*/

/*-----------------------------------------------------SEARCH---------------------------------------------------------------------------------*/


// Agregar un evento de escucha al input de búsqueda
document.getElementById("input_search").addEventListener("input", function () {
    // Obtener el valor del input y convertirlo a minúsculas
    const searchTerm = this.value.toLowerCase();
    
    // Limpiar la lista de Pokémon antes de realizar una nueva búsqueda
    const listPokemon = document.querySelector("#list_pokemons");
    listPokemon.innerHTML = "";

    // Llamar a la función getPokemon con el término de búsqueda
    getPokemon(searchTerm);
});

// Función asincrónica para obtener información de Pokémon
const getPokemon = async (searchTerm) => {
    // Seleccionar el contenedor de la lista de Pokémon
    const listPokemon = document.querySelector("#list_pokemons");
    
    // URL base de la API de Pokémon
    const baseURL = "https://pokeapi.co/api/v2/pokemon/";

    // Bucle para realizar las solicitudes de datos para los primeros 151 Pokémon
    for (let i = 1; i <= 151; i++) {
        try {
            // Realizar la solicitud y esperar a que se complete utilizando await
            const response = await fetch(baseURL + i);
            // Convertir la respuesta a formato JSON y esperar a que se complete
            const data = await response.json();

            // Filtrar por lo que se busca en el input
            if (data.name.toLowerCase().includes(searchTerm)) {
                // Llamar a la función showPokemon para mostrar el Pokémon en la interfaz
                showPokemon(data);
            }
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante la solicitud
            console.error(`Error fetching data for Pokemon ${i}:`, error);
        }
    }

    // Función para mostrar un Pokémon en la interfaz
    function showPokemon(data) {
        // Crear elementos HTML para mostrar la información del Pokémon
        let types = data.types.map((type) => `<p class="type ${type.type.name}">${type.type.name}</p>`);
        types = types.join('');

        const pokeId = data.id.toString().padStart(3, '0');

        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
            <div class="pokemon">
                <p class="pokemon_id_back">#${pokeId}</p>
                <div class="pokemon_image">
                    <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
                </div>
                <div class="pokemon_info">
                    <div class="name_container">
                        <p class="pokemon_id">#${pokeId}</p>
                        <h2 class="pokemon_name">${data.name}</h2>
                    </div>
                    <div class="types_pokemon">
                        ${types}
                    </div>
                </div>
                <div class="pokemon_stats">
                    <p class="stat">${data.height}m</p>
                    <p class="stat">${data.weight}kg</p>
                </div>
            </div>
        `;
        // Agregar el elemento del Pokémon al contenedor de la lista
        listPokemon.appendChild(div);
    }
};
/*                                                     EXPLICACIONES:

Evento de Escucha del Input:

Cuando se ingresa texto en el campo de búsqueda (input_search), se activa un evento de escucha.
Obtener Término de Búsqueda:

Captura el valor del campo de búsqueda y lo convierte a minúsculas para una búsqueda sin distinción entre mayúsculas y minúsculas.
Limpiar Lista de Pokémon:

Vacía el contenedor de la lista de Pokémon para prepararse para una nueva búsqueda.
Llamar a la Función getPokemon:

Invoca la función getPokemon con el término de búsqueda como argumento.
Función getPokemon:

Una función asincrónica que realiza solicitudes a la API de Pokémon para obtener información sobre los primeros 151 Pokémon.
Bucle de Solicitud y Filtrado:

Recorre un bucle para cada Pokémon, filtra aquellos cuyos nombres coinciden con el término de búsqueda.
Mostrar Pokémon en la Interfaz:

Si el Pokémon pasa el filtro, se llama a la función showPokemon para mostrarlo en la interfaz.
Función showPokemon:

Crea elementos HTML para representar la información del Pokémon, como número de Pokédex, imagen, nombre, tipos, altura y peso.
Crear Elementos para Tipos del Pokémon:

Genera elementos HTML para los tipos del Pokémon y los une en una cadena.
Agregar Elementos al Contenedor de la Lista:

Agrega el elemento del Pokémon al contenedor de la lista en el documento HTML.
En resumen, este código permite buscar Pokémon y mostrar su información en tiempo real mientras se escribe en el campo de búsqueda. 
Realiza solicitudes a la API de Pokémon, filtra los resultados según el término de búsqueda y muestra la información relevante de los Pokémon que coinciden en la interfaz de usuario.


*/


/*-----------------------------------------------------FILTER---------------------------------------------------------------------------------*/

const filters = async () => {
    // Selecciona el elemento en el que se mostrarán los Pokémon
    const listPokemon = document.querySelector("#list_pokemons");
    // Selecciona todos los botones de filtro
    const buttonsHeaderFilters = document.querySelectorAll(".btn_header");

    // URL base de la API de Pokémon
    let URL = "https://pokeapi.co/api/v2/pokemon/";

    // Bucle para realizar las solicitudes de datos para los primeros 151 Pokémon
    for (let i = 1; i <= 151; i++) {
        try {
            // Realiza la solicitud y espera a que se complete utilizando await
            const response = await fetch(URL + i);
            // Convierte la respuesta a formato JSON y espera a que se complete
            const data = await response.json();
            // Llama a la función showPokemon para mostrar el Pokémon en la interfaz
            showPokemon(data);
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud
            console.error(`Error fetching data for Pokemon ${i}:`, error);
        }
    };

    // Función para mostrar un Pokémon en la interfaz
    function showPokemon(data) {
        // Obtiene los tipos del Pokémon y los convierte en un string
        let types = data.types.map((type) => `<p class="type ${type.type.name}">${type.type.name}</p>`);
        types = types.join('');

        // Formatea el ID del Pokémon para que tenga siempre 3 dígitos
        let pokeId = data.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }

        // Crea un elemento div para mostrar la información del Pokémon
        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
        <div class="pokemon">
            <p class="pokemon_id_back">#${pokeId}</p>

            <div class="pokemon_image">
                <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
            </div>

            <div class="pokemon_info">
                <div class="name_container">
                    <p class="pokemon_id">#${pokeId}</p>
                    <h2 class="pokemon_name">${data.name}</h2>
                </div>
                <div class="types_pokemon">
                    ${types}
                </div>
            </div>

            <div class="pokemon_stats">
                <p class="stat">${data.height}m</p>
                <p class="stat">${data.weight}kg</p>
            </div>
        </div>
        `;
        // Agrega el elemento div al contenedor de Pokémon
        listPokemon.append(div);
    }

    // Agrega un evento de clic a cada botón de filtro
    buttonsHeaderFilters.forEach(button => button.addEventListener("click", async (event) => {
        // Obtiene el ID del botón que se hizo clic
        const buttonId = event.currentTarget.id;

        // Limpia el contenedor de Pokémon antes de aplicar el filtro
        listPokemon.innerHTML = '';

        // Bucle para realizar las solicitudes de datos para los primeros 151 Pokémon
        for (let i = 1; i <= 151; i++) {
            try {
                // Realiza la solicitud y espera a que se complete utilizando await
                const response = await fetch(URL + i);
                // Convierte la respuesta a formato JSON y espera a que se complete
                const data = await response.json();
                // Verifica si el botón es "see_all" o si el Pokémon tiene el tipo correspondiente
                if (buttonId === "see_all" || data.types.some(type => type.type.name.includes(buttonId))) {
                    // Llama a la función showPokemon para mostrar el Pokémon en la interfaz
                    showPokemon(data);
                }
            } catch (error) {
                // Maneja cualquier error que pueda ocurrir durante la solicitud
                console.error(`Error fetching data for Pokemon ${i}:`, error);
            }
        }
    }));
}

/*                                                     EXPLICACIONES:

--------------Configuración Inicial y Selección de Elementos del DOM:

listPokemon: Representa el contenedor donde se mostrará la información de los Pokémon. Se selecciona utilizando el método document.querySelector("#list_pokemons").

buttonsHeaderFilters: Representa todos los botones de filtro. Se seleccionan mediante el método document.querySelectorAll(".btn_header"),
que selecciona todos los elementos con la clase "btn_header".

URL: Es la URL base de la API de Pokémon que se utilizará para realizar las solicitudes de datos.

--------------Bucle para Obtener Datos de Pokémon:

Bucle for: Recorre los números del 1 al 151, realizando solicitudes de datos para cada Pokémon de la API.

try/catch: Manejo de errores para cada solicitud. Si hay algún problema durante la solicitud, se captura el error y se muestra en la consola.

-------------Función showPokemon:

showPokemon: Función que toma los datos de un Pokémon y los utiliza para construir un elemento en el DOM que representa visualmente la información del Pokémon.

Obtención de Tipos del Pokémon: Utiliza el método map para convertir la información de tipos del Pokémon en un conjunto de elementos HTML <p> con clases específicas.

Formateo del ID del Pokémon: Asegura que el ID del Pokémon tenga siempre 3 dígitos.

Creación del Elemento div: Utiliza document.createElement para crear un nuevo elemento div con la clase "pokemon" y establece su contenido HTML utilizando la información del Pokémon.

Inserción en el DOM: Agrega el elemento div al contenedor listPokemon.

------------Evento de Clic en Botones de Filtro:

buttonsHeaderFilters.forEach: Itera sobre cada botón de filtro y agrega un escucha de evento de clic.

Obtención del ID del Botón Clicado: Utiliza event.currentTarget.id para obtener el ID del botón que se hizo clic.

Limpieza del Contenedor de Pokémon: Vacía el contenedor listPokemon antes de aplicar el filtro.

Solicitud y Filtro de Datos: Realiza un bucle similar al inicial, pero filtra los Pokémon que se mostrarán en función del botón de filtro clicado.

data.types.some: Verifica si algún tipo del Pokémon coincide con el tipo asociado al botón de filtro.

Llama a showPokemon: Si el botón es "see_all" o el Pokémon cumple con el tipo filtrado, se llama a la función showPokemon para mostrar el Pokémon en la interfaz.

*/


