// Función para obtener los datos del Pokémon desde la API
const fetchPokemon = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  // Verificar el estado de la respuesta de la API
  if (!response.ok) {
    throw new Error("Error: La API de Pokemon no respondió correctamente");
  }
  // Convertir la respuesta a JSON y devolver los datos del Pokémon
  return response.json();
};

fetchPokemon;
