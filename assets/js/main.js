// Obtener los elementos del DOM
const input = document.getElementById("pokemonId");
const button = document.getElementById("searchBtn");
const container = document.getElementById("pokemonContainer");

// Agregar un event listener al botón de búsqueda
button.addEventListener("click", async () => {
  try {
    // Obtener el valor ingresado por el usuario y validar que sea un número
    const id = parseInt(input.value);

    if (isNaN(id) || id < 1 || id > 898) {
      container.innerHTML =
        "<p>Ingresa un Pokemon ID válido del número 1 al número 898</p>";
      return;
    }

    // Obtener los datos del Pokemon desde la API
    const data = await fetchPokemon(id);

    // Funcion para renombrar la data de la API
    const name = data.name;
    const types = data.types.map((type) => type.type.name);
    const height = data.height / (10).toFixed(1);
    const weight = data.weight / (10).toFixed(1);
    const image = data.sprites.front_default;

    // Función para crear el HTML de la Card
    const pokeCard = ({ name, types, height, weight, image }) => {
      return `
       <div class="pokemon-card">
        <h2>${name}</h2>
        <p>Type: ${types.join(", ")}</p>
        <p>Height: ${height}m</p>
        <p>Weight: ${weight}kg</p>
        <img src= ${image} alt="${name} sprite">
      </div>
    `;
    };

    // Renderizar la card
    const pokemonCard = pokeCard({ name, types, height, weight, image });
    container.innerHTML = pokemonCard;
  } catch (error) {
    // Mostrar un mensaje de error en caso de que la API no responda correctamente
    if (error.message === "Fallo la petición") {
      container.innerHTML =
        "<p>Error: No se pudo conectar a la API de Pokemon</p>";
    } else {
      container.innerHTML = "<p>Error: El Pokemon no fue encontrado</p>";
    }
  }
});
