const PFicha = document.querySelector('[Ficha]');
const PNombre = document.querySelector('[Nombre]');
const PImagen = document.querySelector('[Imagen]');
const PIC = document.querySelector('[IC]');
const PNum = document.querySelector('[Num]');
const PTipo = document.querySelector('[Tipo]');
const PEstad = document.querySelector('[Estad]');

const Colores = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const Buscar = event => {
    event.preventDefault();
    const { value } = event.target.Pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(r => Datos(r))
        .catch(err => SinDatos())
}

const Datos = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    PNombre.textContent = data.name;
    PImagen.setAttribute('src', sprite);
    PNum.textContent = `Nº ${data.id}`;
    Color(types);
    PokemonTipos(types);
    PokemonEstad(stats);
}

const Color = types => {
    const Color1 = Colores[types[0].type.name];
    const Color2 = types[1] ? Colores[types[1].type.name] : Colores.default;
    PImagen.style.background =  `radial-gradient(${Color2} 33%, ${Color1} 33%)`;
    PImagen.style.backgroundSize = ' 20px 20px';
}

const PokemonTipos = types => {
    PTipo.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = Colores[type.type.name];
        typeTextElement.textContent = type.type.name;
        PTipo.appendChild(typeTextElement);
    });
}

const PokemonEstad = stats => {
    PEstad.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        PEstad.appendChild(statElement);
    });
}

const SinDatos = () => {
    PNombre.textContent = 'No se encontraron los datos buscados';
    PImagen.setAttribute('src', 'Pikachu.jpg');
    PImagen.style.background =  '#fff';
    PTipo.innerHTML = '';
    PEstad.innerHTML = '';
    PPeso.innerHTML = '';
    PNum.textContent = '';
}