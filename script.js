let pokemonImage = undefined;
let pokemonInfo = document.createElement("div");
pokemon.id = "pokemon-info";

function handleSearch() {
  const pokedexContainer = document.getElementById("pokedex-container");
  const query = document.getElementById("pokemon-input").value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`, {
    method: "GET",
  })
    .then((response) => {
      response.json().then(function (data) {
        if (!pokemonImage) {
          pokemonImage = document.createElement("img");
          pokemonImage.id = "pokemon-image";
          pokemonImage.src = data.sprites.other.dream_world.front_default;

          pokedexContainer.appendChild(pokemonImage);
        } else {
          pokemonImage.src = data.sprites.other.dream_world.front_default;
        }

        pokemonInfo.innerHTML = `
          <span>Name: ${data.name}</span>
          <span>Height: ${data.height}</span>
          <span>Weight: ${data.weight}</span>
        `;
      });
    })
    .catch((error) => {
      alert("Não foi encontrado nenhum pokemon com este nome :(");
    });
}

function handlePokedexImage(event, option) {
  const pokedexContainer = document.getElementById("pokedex-container");
  const image = event.target;

  if (option === 1) {
    image.src = "assets/open.svg";

    const inputs = pokedexContainer.getElementsByTagName("input");

    if (!inputs.length) {
      const searchContainer = document.createElement("div");
      searchContainer.id = "search-container";

      pokedexContainer.appendChild(searchContainer);

      const input = document.createElement("input");
      input.type = "text";
      input.id = "pokemon-input";
      searchContainer.appendChild(input);

      const button = document.createElement("button");
      button.type = "button";
      button.id = "submit-button";
      button.textContent = "Lookup";
      button.onclick = handleSearch;
      searchContainer.appendChild(button);

      searchContainer.append(pokemonInfo);
    }

    if (pokemonImage) {
      pokedexContainer.appendChild(pokemonImage);
    }
  } else if (!event.relatedTarget || event.relatedTarget.localName === "body") {
    image.src = "assets/closed.svg";

    const searchContainer = pokedexContainer.getElementsByTagName("div")[0];

    if (searchContainer) {
      pokedexContainer.removeChild(searchContainer);
    }

    const pokemonImage = document.getElementById("pokemon-image");

    if (pokemonImage) {
      pokemonImage.parentElement.removeChild(pokemonImage);
    }
  }
}
