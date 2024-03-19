let winnerCarColor = ''; // Variável para armazenar a cor do carro vencedor
let playerMoney = 100; // Dinheiro inicial do jogador
let betAmount = 100; // Valor da aposta
let upgradeValue = 0;

// Função para inicializar a posição dos carros
function init() {
    const cars = document.querySelectorAll('.car');
    cars.forEach(function(car) {
        car.style.left = '50px'; // Definindo a posição inicial de cada carro
    });
    }

// Função para mover os carros, seleciona todas as constantes ".car" e faz um foreach para chamar a função moveCar para cada um individualmente 
function moveCars() {
    const cars = document.querySelectorAll('.car');
    winnerCarColor = ''; // Limpa a cor do carro vencedor
    cars.forEach(function(car) {
        moveCar(car);
    });
        }

// Função para mover um carro individualmente, define a posição inicial, calcula a Width da pista subtraindo a Width do carro, e caso o carro passe da width da pista ele é considerado vencedor, caso contrário o sistema continua calculando a math.random*10 para que a corrida continue
function moveCar(car) {
    let position = 50;
    const raceTrackWidth = document.querySelector('.raceTrack').offsetWidth - car.offsetWidth;
    const moveInterval = setInterval(function() {
        if (position > raceTrackWidth) {
            clearInterval(moveInterval);
            if (!winnerCarColor) {
                winnerCarColor = getComputedStyle(car).backgroundColor; // define a cor do carro vencedor para soltar um alert na tela
                alert('O vencedor do GrandPrix é ' + getColorName(winnerCarColor) + '!');
            }
        } else {
            position += Math.floor(Math.random() * 10);
            car.style.left = position + 'px';
        }
    });
    }

// Mapeamento das cores dos carros pra ficar mais legal no alert
function getColorName(color) {
    const colorMap = {
        'rgb(255, 0, 0)': 'Leclerc',
        'rgb(0, 128, 0)': 'Alonso',
        'rgb(0, 0, 255)': 'Verstappen',
        'rgb(0, 0, 0)': 'Hamilton',
        'rgb(255, 165, 0)': 'Norris' 
    };  
    return colorMap[color.toLowerCase()] || color;
    }

// Função para expor e atualizar o dinheiro do jogador em tela
function updateMoneyDisplay() {
    const moneyDisplay = document.getElementById('money-display');
    moneyDisplay.textContent = 'Seu dinheiro: R$' + playerMoney;
    }

// Função para fazer uma aposta e iniciar a corrida
function placeBet(playerBetColor) {
    const betAmountInput = document.getElementById('bet-amount');
    const betAmount = parseInt(betAmountInput.value);

    if (isNaN(betAmount) || betAmount <= 0 || playerMoney < betAmount) {
        alert('Aposta inválida!');
        return;
    }

    if (playerBetColor) {
        alert('Você apostou R$' + betAmount + ' no carro do ' + playerBetColor.toUpperCase());
        moveCars(); // Iniciar a corrida após fazer a aposta
    } else {
        alert('Carro inválido!');
        return;
    }

    // Função para realizar a verificação de vitória ou derrota, apenas após a corrida
    setTimeout(function() {
        const winnerCarName = getColorName(winnerCarColor); // Obtém o nome do carro vencedor
        const playerBetColorName = getColorName(playerBetColor); // Obtém o nome do carro da aposta do jogador

        if (playerBetColorName.toLowerCase() === winnerCarName.toLowerCase()) {
            playerMoney += betAmount; // Aumenta o saldo se a aposta for vencedora
            updateMoneyDisplay(); // Atualizar e exibir o saldo do jogador na tela
            alert('Parabéns! Deu green! Seu novo balanço é R$' + playerMoney);
        } else {
            playerMoney -= betAmount; // Diminui o saldo se a aposta for perdida
            updateMoneyDisplay(); // Atualizar e exibir o saldo do jogador na tela
            alert('Você perdeu a aposta! Seu novo balanço é R$' + playerMoney);
        }
    }, 3500);
    }   

    function improveSpeed(playerBetColor){
        const car = document.getElementById(playerBetColor);
    
        upgradeValue == parseInt(7);
        if(parseInt(playerMoney) < upgradeValue){
            alert('Você não pode comprar esse upgrade!');
            return;
        } else {
            playerMoney -= upgradeValue;
            const newPosition = parseInt(car.style.left) + Math.floor(Math.random() * 14);
                car.style.left = newPosition + 'px';
                alert('Você aumentou sutilmente a velocidade do carro do ' + playerBetColor);
            }
    }
    