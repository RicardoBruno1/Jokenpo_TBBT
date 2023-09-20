const playerOptionsList = document.querySelectorAll('.player-option')
const enemyOptionsList = document.querySelectorAll('.enemy-option')

playerOptionsList.forEach(option => {
    option.addEventListener('click', () => {
        if (!gameProgress) {
            return;
        }

        clearSelectedOption(playerOptionsList)

        option.style.opacity = "1"
        option.classList.add('animate')
        setTimeout(() => {
            option.classList.remove('animate')
        }, 600)

        option.setAttribute('data-selected', true)

        const optionPlayer = option.getAttribute('data-value')
        const optionIa = enemyIa()

        result(optionPlayer, optionIa)
    })
})

const enemyIa = () => {
    clearSelectedOption(enemyOptionsList)

    const optionIa = Math.floor(Math.random() * enemyOptionsList.length)
    const optionIaSelected = enemyOptionsList[optionIa]

    optionIaSelected.style.opacity = '1'
    optionIaSelected.setAttribute('data-selected', 'true')

    optionIaSelected.classList.add('animate')
    setTimeout(() => {
        optionIaSelected.classList.remove('animate')
    }, 600)

    return optionIaSelected.getAttribute('data-value')
}

const clearSelectedOption = (array) => {
    array.forEach(element => {
        element.setAttribute('data-selected', 'false')
        element.style.opacity = '0.65'
    })
}

const options = {
    stone: ['scissor', 'lizard'],
    paper: ['stone', 'spock'],
    scissor: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissor', 'stone']
  };
  
  const playerScoreText = document.querySelector('.your-score');
  const computerScoreText = document.querySelector('.computer-score');
  const drawScoreText = document.querySelector('.draw-score');
  const resultMessage = document.querySelector('.result-message');
  const restartButton = document.querySelector('.restart-button');
  
  let playerScore = parseInt(playerScoreText.innerHTML);
  let computerScore = parseInt(computerScoreText.innerHTML);
  let drawScore = parseInt(drawScoreText.innerHTML);
  let roundsPlayed = 0;
  let gameProgress = true;
  
  const result = (optionPlayer, optionIa) => {
    if (!gameProgress) {
        return;
    }

    if (options[optionPlayer].includes(optionIa)) {
      playerScore++;
    } else if (options[optionIa].includes(optionPlayer)) {
      computerScore++;
    } else {
      drawScore++;
    }
  
    playerScoreText.innerHTML = playerScore;
    computerScoreText.innerHTML = computerScore;
    drawScoreText.innerHTML = drawScore;
  
    roundsPlayed++;
  
    // Checar se o jogador ganhaou melhor de 5
    if (playerScore >= 3 || computerScore >= 3) {
      endGame();
    }
  };
  
  const endGame = () => {
    gameProgress = false;

    // if (playerScore > computerScore) {
    //   resultMessage.innerHTML = 'Player 1 ganhou!';
    // } else if (playerScore < computerScore) {
    //   resultMessage.innerHTML = 'IA ganhou!';
    // } else {
    //   resultMessage.innerHTML = 'Deu empate!';
    // }

    // Desabilita os botões de escolha do jogador
    playerOptionsList.forEach(option => {
        option.disabled = true;
    });

    const restartButton = document.querySelector('.restart-button');
    restartButton.style.display = 'block';

    // Exibir o resultado como um alerta após o vencedor ser exibido na tela
    const notificationMessage =
        playerScore > computerScore
            ? 'Você ganhou!'
            : playerScore < computerScore
            ? 'IA ganhou!'
            : 'Deu empate!';
    setTimeout(() => {
        alert(notificationMessage);
    }, 1000);
  
  };

  //Reiniciar o jogo
  const restartGame = () => {
    gameProgress = true;


    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    roundsPlayed = 0;
  
    playerScoreText.innerHTML = '0';
    computerScoreText.innerHTML = '0';
    drawScoreText.innerHTML = '0';
    resultMessage.innerHTML = '';
  
    restartButton.style.display = 'none';
  };
  

  restartButton.addEventListener('click', restartGame);

  