const pokedex_list = document.getElementById("pokedex__list");
const pokedex_button = document.getElementById("pokedex__buttonId");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newListPokemonsHtml = pokemons
      .map(
        (pokemon) =>
          `<li class="pokedex__pokemon ${pokemon.type}">
                <span class="pokedex__number">#${pokemon.number}</span>
                <span class="pokedex__name">${pokemon.name}</span>
                <div class="pokedex__detail">
                    <ol class="pokedex__types">
                        ${pokemon.types
                          .map(
                            (type) =>
                              `<li class="pokedex__type ${type}">${type}</li>`
                          )
                          .join("")}
                    </ol>
                    <img
                        class="pokedex__img"
                        src="${pokemon.photo}"
                        alt="${pokemon.name}"
                    />
                </div>
            </li>`
      )
      .join("");

    pokedex_list.innerHTML += newListPokemonsHtml;
  });
}

loadPokemonItens(offset, limit);

pokedex_button.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    pokedex_button.parentElement.removeChild(pokedex_button);
  } else {
    loadPokemonItens(offset, limit);
  }
});
