$( () => {
    const API_URL = "https://pokeapi.co/api/v2/pokemon/"

   const getData = async input => {
        let response = await fetch(API_URL + `${input}`);
        let data = await response.json();
        return data;
   }

    const getAllPokemon = async () => {
        for(let i = 1 ; i < 1025 ; i++){
            const pokemon = await getData(i);
            createPokemonProfile(pokemon)
        }
    }

    getPokemon = async index => {
        try {
            let pokemonData = await getData(index);
            console.log(pokemonData);
            createPokemonProfile(pokemonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const createPokemonProfile = async pokemon => {
        $('.main-content').append(`
        <div class="profile"> 
        <img src="${pokemon.sprites.front_default}">
        <p>${pokemon.name}</p>
        <p>id: ${pokemon.id}</p>
        </div>
        `) 
    }

    $('#search-button').click(async function(){
        $('.main-content').empty();
        let input = $('#field').val();
        getPokemon(input);
    })

    $('#display-button').click(async function(){
        $('.main-content').empty();
        getAllPokemon();
    })
    
   
    //getAllPokemon()
  
});
