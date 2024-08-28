const goku = document.querySelector('.goku');
const freeza = document.querySelector('.freeza');

let score = 0;
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');
const restartButton = document.getElementById('restart');

const jump = () => {
    goku.classList.add('jump');

    setTimeout(() => {
        goku.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {

    const freezaPosition = freeza.offsetLeft;
    const gokuPosition = +window.getComputedStyle(goku).bottom.replace('px', '');

    // Ajuste de colisão baseado na largura da tela
    let collisionGokuHeight = 80;
    let collisionFreezaWidth = 100;

    if (window.innerWidth <= 599) {
        collisionGokuHeight = 50;
        collisionFreezaWidth = 70;
    } else if (window.innerWidth <= 799) {
        collisionGokuHeight = 60;
        collisionFreezaWidth = 70;
    } else if (window.innerWidth <= 999) {
        collisionGokuHeight = 70;
        collisionFreezaWidth = 85;
    }

    // Verifica colisão
    if (freezaPosition <= collisionFreezaWidth && freezaPosition > -40 && gokuPosition < collisionGokuHeight) {
        
        freeza.style.animation = 'none';
        freeza.style.left = `${freezaPosition}px`;

        goku.style.animation = 'none';
        goku.style.bottom = `${gokuPosition}px`;

        goku.src = './Imagens/goku-over.png';

        // Ajuste do tamanho e margem do Goku com base na resolução
        if (window.innerWidth <= 599) {
            goku.style.width = '80px';
            goku.style.marginLeft = '10px';
        } else if (window.innerWidth <= 799) {
            goku.style.width = '100px';
            goku.style.marginLeft = '15px';
        } else if (window.innerWidth <= 999) {
            goku.style.width = '130px';
            goku.style.marginLeft = '20px';
        } else if (window.innerWidth <= 1199) {
            goku.style.width = '140px';
            goku.style.marginLeft = '25px';
        } else {
            goku.style.width = '155px';
            goku.style.marginLeft = '30px';
        }

        clearInterval(loop);

        // Exibe a mensagem de "game over" e o botão de reinício
        gameOverElement.style.display = 'block';
        restartButton.style.display = 'block';

    } else {
        // Atualiza a pontuação se não houver colisão
        score++;
        scoreElement.innerText = score;
    }

}, 10);

restartButton.addEventListener('click', () => {
    location.reload(); // Recarrega a página para reiniciar o jogo
});

document.addEventListener('keydown', jump);

document.addEventListener('touchstart', jump);
