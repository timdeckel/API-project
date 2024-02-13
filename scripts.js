// fixa error handling för när det går sönder och när det inte är correct info
// gör mer med data eller lägg till en api 
// 
$( () => {
    const NAME_API_URL = "https://api.namnapi.se/v2/names.xml?gender=both&type=firstname&limit=3"
    const API_URL = "https://pokeapi.co/api/v2/pokemon/"

   const getData = async input => {
        let response = await fetch(API_URL + `${input}`);
        let data = await response.json();
        return data;
   }

    const getAllPokemon = async () => {
        for(let i = 1 ; i <= 1025 ; i++){
            const pokemon = await getData(i);
            createPokemonProfile(pokemon)
        }
    }

    const getAbilityDescription = async pokemon => {
        let pokemonAbilityUrl = pokemon.abilities[0].ability.url;
        console.log(pokemonAbilityUrl)
        let response = await fetch(pokemonAbilityUrl);
        let data = await response.json();
        let text = data.flavor_text_entries[0].flavor_text;
        console.log(text)
        return text;
    }

    getPokemon = async index => {
        try {
            let pokemonData = await getData(index);
            console.log(pokemonData);
            // createPokemonProfile(pokemonData);
            createPokeProfile(pokemonData);
            $('#field').val('');
        } catch (error) {
            $('#field').val('');
            $('#field').attr("placeholder", "Please enter a whole number from 1 to 1025.")
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
  
    const createPokeProfile = async pokemon => {
        let abilityFlavourText = await getAbilityDescription(pokemon);
        console.log(abilityFlavourText)
        $('.main-content').append(`
        <div class="wip-profile">
                <div class="profile-column">
                    <div class="profile-header profile-row">
                        POKEMON INFO
                    </div>
                    <div class="profile-main profile-row">
                        <div class="profile-summary profile-column">
                            <p class="poke-id">No${pokemon.id}</p>
                            <div class="profile-img">img</div>
                            <div class="profile-name">
                                <p class="pokemon-name">NAME</p>
                                <p class="nickname">/NICKNAME</p>
                            </div>
                            <div class="level-bar profile-row">
                                <div class="pokeball-icon">
                                    O
                                </div>
                                <p>Lv33</p>
                                <div class="gender">M</div>
                            </div>
                        </div>
                        <div class="profile-info profile-column">
                            <div class="owner">
                                <p class="info-title">PROFILE</p>
                                <div class="owner-infobar">
                                    <div class="top-bar">
                                        <p>OT/name</p>
                                        <p>id:81724071</p>
                                    </div>
                                    <div class="bottom-bar profile-row">
                                        <p>TYPE/</p><div class="type">type</div>
                                    </div>
                                </div>
                            </div>
                            <div class="ability">
                                <p class="info-title">ABILITY</p>
                                <div class="ability-infobar">
                                    <div class="top-bar">
                                        ${pokemon.abilities[0].ability.name}
                                    </div>
                                    <div class="bottom-bar">
                                        <p>${abilityFlavourText}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="trainer-memo">
                                <p class="info-title">TRAINER MEMO</p>
                                <div class="trainer-infobar">
                                    <p>value nature,</p>
                                    <p>met at (lvl value),</p>
                                    <p>(value RND ROUTE)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }

    // createPokeProfile();
    getPokemon("6")
});
