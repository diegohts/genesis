const audio = [
    new Audio('assets/greenSound.mp3')
    , new Audio('assets/redSound.mp3')
    , new Audio('assets/yellowSound.mp3')
    , new Audio('assets/blueSound.mp3')
];

const audioError = new Audio('assets/errorSound.mp3');

let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// Cria ordem aleatoria de cores.
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, order[i]);
    }
}

// Acende a proxima cor
let lightColor = (element, number, color) => {
    number *= 600;
    setTimeout(() => {
        audio[color].play();
        element.classList.add('selected');
    }, number - 400);

    setTimeout(() => {
        element.classList.remove('selected')
    }, number);
}

// Checa se os botoes clicados sao os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }

    if(clickedOrder.length == order.length){
        alert(`Pontuação: ${score}
                \nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

// Funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    audio[color].play();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

// Funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0){
        return green;
    } else if(color == 1){
        return red;
    } else if(color == 2){
        return yellow;
    } else if(color == 3){
        return blue;
    }
}

// Funcao para o proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// Funcao para game over
let gameOver = () => {
    audioError.play();
    alert(`Pontuação: ${score}!
            \nVocê perdeu o jogo!
            \nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

// Funcao para iniciar um jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo');
    order = [];
    clickedOrder = [];
    score = 0;

    nextLevel();
}

// Eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame(); 