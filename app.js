const $pokemonName = document.querySelector(".pokecard-name"),
 $pokecardHeader = document.querySelector(".pokecard-header"),
 $pokecardElement = document.querySelector(".pokecard-element"),
 $pokecardFirstType = document.querySelector(".type-1"),
 $pokecardFirstAttack = document.querySelector(".attack-1"),
 $pokecardSecondAttack = document.querySelector(".attack-2"),
 $button = document.querySelector("button")

const POKEMON_TYPE = {
    normal: "#D6E7DE",
    fire: "#F5703B",
    water: "#008BFF",
    grass: "#15C256",
    flying: "#E1FFEC",
    fighting: "#A57655",
    poison: "#FF00FB",
    electric: "#FBFF00",
    ground: "#A18342", 
    rock: "#968D79", 
    psychic: "#8B4E9C", 
    ice: "#0BFFD3", 
    bug: "#379B25", 
    ghost: "#391A34", 
    steel: "#9E9E9E", 
    dragon: "#660F3D", 
    dark:"#000000" ,
    fairy: "#F1AAF1"
}

// Función para obtener los datos del pokémon a elegir usando la API a través de un Fetch

const getPokemonData = async (id) => {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
         let json = await res.json();
         
         if (!res.ok) throw { status: res.status, statusText: res.statusText };    
         
         renderPokemon(json)
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        console.warn(`Error ${error.status}: ${message}`)
    }
}

// Función que a través de un input obtiene el ID del pokémon elegido por el usuario para que sea renderizado

const getPokemonId = async () => {
    const ID = prompt("Ingresa el ID del pokémon que quieres renderizar");

    if (isNaN(ID)) return alert("Debes ingresar un número válido")

    if (ID > 0 && ID < 1011) { 
        getPokemonData(ID)
    } else {
        alert("El número ingresado como ID debe ser entre 1 a 1010") 
        return location.reload()
    }
   
}

const renderPokemon = async (pokemon) => {

    // Acceder al nombre e ID del pokémon

    $pokemonName.textContent = `${pokemon.name} #${pokemon.id}`;
         
    // Acceder y renderizar al sprite del pokémon
 
     const URL = pokemon.sprites.front_default;
     const IMG = document.createElement("img");
     IMG.src = URL;
     $pokecardHeader.appendChild(IMG);
 
     // Acceder al tipo del pokémon y renderizarlo
 
     $pokecardFirstType.textContent = pokemon.types[0].type.name;
     $pokecardFirstType.style.backgroundColor = POKEMON_TYPE[pokemon.types[0].type.name.toLowerCase()]
     if (pokemon.types[1]) {
        $pokecardSecondType = document.createElement("span")
        $pokecardSecondType.classList.add("type-2")
        $pokecardSecondType.textContent = pokemon.types[1].type.name
        $pokecardSecondType.style.backgroundColor = POKEMON_TYPE[pokemon.types[1].type.name.toLowerCase()]
        $pokecardElement.appendChild($pokecardSecondType)
    }
    
    // Acceder a los ataques del pokémon y renderizarlos

    $pokecardFirstAttack.textContent = pokemon.abilities[0].ability.name;
    $pokecardSecondAttack.textContent = pokemon.abilities[1].ability.name     
}

document.addEventListener("DOMContentLoaded", getPokemonId)

$button.addEventListener("click", e => {
    location.reload()
})