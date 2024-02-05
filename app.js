let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let nickname = '';
let patente = '';
let pontosDeExperiencia = 0;

function geraGamePlay() {
    const containerHTML = document.querySelector('.container');
    const containerGame = `
        <div class="container__conteudo">
            <div class="container__informacoes">
                <div class="container__texto">
                    <div class="container__xp">
                        <span></span>
                    </div>
                    <h1>Adivinhe o <span class="container__texto-azul">numero secreto</span></h1>
                    <p class="texto__paragrafo">Escolha um número entre 1 a 100</p>
                </div>
                <input type="number" min="1" max="10" class="container__input">
                <div class="chute container__botoes">
                    <button onclick="verificarChute()" class="container__botao">Chutar</button>
                    <button onclick="reiniciarJogo()" id="reiniciar" class="container__botao" disabled>Novo jogo</button>
                </div>
            </div>
            <img src="./img/ia.png" alt="Uma pessoa olhando para a esquerda" class="container__imagem-pessoa" />
        </div>
    `

    containerHTML.innerHTML = containerGame;
}

function salvarNome() {
    const inputNomeDoJogador = document.querySelector("input").value;

    if (inputNomeDoJogador.trim() != null && inputNomeDoJogador.trim() != '') {
        nickname = inputNomeDoJogador;
    } else {
        nickname = 'player123';
    }

    geraGamePlay()
    exibirMensagemInicial();
};

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('.container__texto h1', 'Jogo do número secreto');
    exibirTextoNaTela('.container__texto p', `Escolha um número entre 1 e ${numeroLimite}`);
    aumentaXP()
}

function aumentaXP() {
    // Classificador de nível
    let xpSpan = document.querySelector('span');

    if (pontosDeExperiencia <= 1000) {
        patente = 'Ferro'
    } else if (pontosDeExperiencia > 1000 && pontosDeExperiencia <= 2000) {
        patente = 'Bronze'
    } else if (pontosDeExperiencia > 2000 && pontosDeExperiencia <= 5000) {
        patente = 'Prata'
    } else if (pontosDeExperiencia > 5000 && pontosDeExperiencia <= 7000) {
        patente = 'Ouro'
    } else if (pontosDeExperiencia > 7000 && pontosDeExperiencia <= 8000) {
        patente = 'Platina'
    } else if (pontosDeExperiencia > 8000 && pontosDeExperiencia <= 9000) {
        patente = 'Ascedente'
    } else if (pontosDeExperiencia > 9000 && pontosDeExperiencia <= 10000) {
        patente = 'Imortal'
    } else if (pontosDeExperiencia > 10000 && pontosDeExperiencia <= 11000){
        patente = 'Radiante I'
    } else if (pontosDeExperiencia > 11000 && pontosDeExperiencia <= 12000){
        patente = 'Radiante II'
    } else if (pontosDeExperiencia > 12000 && pontosDeExperiencia <= 13000){
        patente = 'Radiante III'
    } else if (pontosDeExperiencia > 13000 && pontosDeExperiencia <= 14000){
        patente = 'Radiante IV'
    } else if (pontosDeExperiencia > 14000){
        patente = 'Radiante V'
    }

    xpSpan.innerHTML = `
        Jogador: ${nickname} <br>
        <span class="${patente.toLocaleLowerCase()}">Patente: ${patente}</span><br>
        Pontos de experiência: ${pontosDeExperiencia}
    `;
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('button').setAttribute('disabled', true);
        pontosDeExperiencia += 1500;
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        pontosDeExperiencia -= 50;
        tentativas++;
        limparCampo();
    }

    aumentaXP();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
    document.querySelector('button').removeAttribute('disabled');
}