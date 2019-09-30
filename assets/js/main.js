
//seletores
const img = document.querySelector("img");
const input = document.querySelector('input');
const form = document.querySelector('form');
const span = document.querySelector('span');
const div = document.querySelector('div');



//funções
const gerarPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 150 + 1)}`)
    .then((resposta) => { return resposta.json() })
    .then((pokemon) => { 
        img.setAttribute('src', pokemon.sprites.front_default); //link da foto que ira aparecer
        localStorage.setItem('pokemon', pokemon.name); //salvar o nome do pokemon que apareceu
     }) 
}

const validarResposta = (event) =>{
    event.preventDefault()
    if(input.value == localStorage.getItem('pokemon')){
        div.style.backgroundColor = '#4caf50';
        localStorage.setItem( 'pontuacao', String(parseInt(localStorage.getItem('pontuacao'))+100)); //transforma o valor do local host que era string em inteiro, soma com + 100 e volta a transformar em string
    }
    else{
        div.style.backgroundColor = '#ff5722';
        localStorage.setItem( 'pontuacao', String(parseInt(localStorage.getItem('pontuacao'))-100));
    }

    input.value = '';
    input.focus();
    img.style.filter = 'none';

    setTimeout(() => {
        div.style.backgroundColor = '#f9f9f9';
        img.style.filter = 'brightness(0)';
        gerarPokemon();
        mostrarPont();
    }, 1000);
}

const mostrarPont = () => {
    if(localStorage.getItem('pontuacao') == null){
        localStorage.setItem('pontuacao', '0');
    }

    span.innerHTML = localStorage.getItem('pontuacao');

}

//eventos^

window.onload = () => {
    gerarPokemon();
    mostrarPont();
}

form.onsubmit = validarResposta;

