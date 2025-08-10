const pokedex_list = document.getElementById("pokedex__list");
const pokedex_button = document.getElementById("pokedex__buttonId");
const modal = document.getElementById("modal");

const maxRecords = 151;
const limit = 10;
let offset = 0;

pokedex_button.addEventListener("click", loadMorePokemons);

pokedex_list.addEventListener("click", loadPokemonClick);

function formatId(number) {
  if (number >= 0 && number < 10) {
    return `00${number}`;
  } else if (number >= 10 && number < 100) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newListPokemonsHtml = pokemons
      .map(
        (pokemon) =>
          `<li class="pokedex__pokemon ${pokemon.type}" data-id="${
            pokemon.number
          }">
                <span class="pokedex__number">#${formatId(
                  pokemon.number
                )}</span>
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

function loadMorePokemons() {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    pokedex_button.parentElement.removeChild(pokedex_button);
  } else {
    loadPokemonItens(offset, limit);
  }
}

function loadPokemonClick(e) {
  const pokemon = e.target.closest(".pokedex__pokemon");

  if (pokemon) {
    const id = pokemon.dataset.id;

    const pokemonData = pokeApi.getPokemon(id);

    modal.innerHTML = showPokemonInfo(pokemonData);
    modal.classList.remove("hidden");

    const modal_button = document.getElementById("modal__button");

    modal_button.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }
}

function showPokemonInfo(pokemon) {
  return `<div id="modal" class="modal">
            <div class="modal__content ${pokemon.type}">
              <div class="modal__info">
                <div>
                  <button id="modal__button" type="button">
                    <span class="material-symbols-outlined"> arrow_back </span>
                  </button>
                  <span class="modal__number">#${formatId(
                    pokemon.number
                  )}</span>
                </div>
                <img
                  class="modal__img"
                  src="${pokemon.photo}"
                  alt="${pokemon.name}"
                />
                <h3 class="modal__name">${pokemon.name}</h3>
              </div>
              <div class="modal__detail">
                <div class="modal__section">
                  <h4>Type(s):</h4>
                  <div class="modal__types">
                    ${pokemon.types
                      .map((type) => `<span>${type}</span>`)
                      .join(", ")}.
                  </div>
                </div>

                <div class="modal__section">
                  <h4>Height:</h4>
                  <p>${pokemon.height} m</p>
                </div>

                <div class="modal__section">
                  <h4>Weight:</h4>
                  <p>${pokemon.weight} kg</p>
                </div>

                <div class="modal__section">
                  <h4>Skills:</h4>
                  <div class="modal__skills">
                      ${pokemon.skills
                        .map((skill) => `<span>${skill}</span>`)
                        .join(", ")}.
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
}

loadPokemonItens(offset, limit);
