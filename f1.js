let winnerCarColor = ''; // Armazena a cor do carro vencedor
let playerMoney = 100; // Dinheiro inicial do jogador

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
    winnerCarColor = ''; // Limpa a cor do carro vencedor para que apareça no alert do final o carro correto.
    cars.forEach(function(car) {
        moveCar(car);
    });
        }

// Função para mover um carro individualmente, define a posição inicial, calcula a Width da pista subtraindo a Width do carro, e caso o carro passe da width da pista ele é considerado vencedor, caso contrário o sistema continua calculando a math.random*10 para que a corrida continue
function moveCar(car) {
    let position = 50;
    const raceTrackWidth = document.querySelector('.raceTrack').offsetWidth - car.offsetWidth;
    const moveInterval = setInterval(function() {
        const speedIncrease = parseInt(car.getAttribute('data-speed-increase')) || 2; // Apelidei de fator velocidade, é o que permite que os power-ups e power-downs funcionem.
        if (position > raceTrackWidth) {
            clearInterval(moveInterval);
            if (!winnerCarColor) {
                winnerCarColor = getComputedStyle(car).backgroundColor; // Define a cor do carro vencedor para soltar um alert na tela
                alert('O vencedor do GrandPrix é ' + getColorName(winnerCarColor) + '!');
            }
        } else {
            position += Math.floor((Math.random() + speedIncrease) * 10); 
            car.style.transform = "translate(" + position + "px)"; 
        }
    }, 300);
}

// Mapeamento das cores dos carros pra expor o vencedor no alert
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

// Expor e atualizar o dinheiro do jogador em tela
function updateMoneyDisplay() {
    const moneyDisplay = document.getElementById('money-display');
    moneyDisplay.textContent = 'Seu dinheiro: R$' + playerMoney;
    }

// Função para fazer uma aposta e iniciar a corrida, pega o carro que foi selecionado no select junto com o valor inserido no input, verificando se a aposta é válida e caso seja, faz a aposta
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

    // Realiza a verificação de vitória ou derrota, apenas após a corrida e com isso, paga ou pega o dinheiro da aposta feita na function placeBet()
    setTimeout(function() {
        const winnerCarName = getColorName(winnerCarColor);
        const playerBetColorName = getColorName(playerBetColor);

        if (playerBetColorName.toLowerCase() === winnerCarName.toLowerCase()) {
            playerMoney += betAmount; // Aumenta o saldo se a aposta for vencedora
            updateMoneyDisplay(); // Atualizar e exibir o saldo do jogador na tela
            alert('Parabéns! Deu green! Seu novo balanço é R$' + playerMoney);
        } else {
            playerMoney -= betAmount; // Diminui o saldo se a aposta for perdida
            updateMoneyDisplay(); // Atualizar e exibir o saldo do jogador na tela
            alert('Você perdeu a aposta! Seu novo balanço é R$' + playerMoney);
        }
    }, 7500);
    }   

    // Aumenta a velocidade do carro selecionado pelo select, diminuindo o custo do power-up do dinheiro do jogador
    function improveSpeed() {
        const selectedColor = document.getElementById('color-select').value;
        if (selectedColor) {
            const carId = selectedColor.toLowerCase();
            const car = document.getElementById(carId);
            const upgradeValue = 7;
    
            if (parseInt(playerMoney) < upgradeValue) {
                alert('Você não pode comprar esse upgrade!');
                return;
            } else {
                playerMoney -= upgradeValue;
                updateMoneyDisplay()
                const subtleSpeedIncrease = 3; // O valor padrão de velocidade é 2
                car.setAttribute('data-speed-increase', subtleSpeedIncrease);
                alert('Você aumentou sutilmente a velocidade do carro do ' + getColorName(selectedColor));
            }
        }
    }  

    // Diminui a velocidade de um carro aleatório, criando um array de carros, pegando um indice aleatório desse array e inferindo isso a um carro da disputa, diminuindo o custo do power-up do dinheiro do jogador
    function decreaseSpeed() {
        const carArray = document.querySelectorAll('.car');
        const randomIndex = Math.floor(Math.random() * carArray.length);
        const randomCar = carArray[randomIndex]; 
        const upgradeValue = 5; 

        if (parseInt(playerMoney) < upgradeValue) {
            alert('Você não pode comprar esse upgrade!');
            return;
        } else {
            playerMoney -= upgradeValue;
            updateMoneyDisplay();
            const subtleSpeedDecrease = 1; // O valor padrão de velocidade é 2
            randomCar.setAttribute('data-speed-increase', subtleSpeedDecrease);
            alert('Você diminuiu sutilmente a velocidade de um carro aleatório.');
        }
    }   

    // Diminui a velocidade do carro líder da corrida, pegando todos os elementos da classe e diminuindo o custo do power-up do dinheiro do jogador
    function decreaseLeaderSpeed() {
        const cars = document.querySelectorAll('.car');
        let leadingCar = null;
        let leadingPosition = 0;
        const upgradeValue = 10;
    
        // Encontrar a posição do carro mais à frente usando getBoundingClientRect().left para obter a posição horizontal do carro em relação à janela do navegador
        cars.forEach(car => {
            const carPosition = car.getBoundingClientRect().left; // Alteração para obter a posição relativa à janela
            if (carPosition > leadingPosition) {
                leadingPosition = carPosition;
                leadingCar = car;
            }
        });

        if (!leadingCar) {
            // Não há carro líder, possivelmente todos os carros já terminaram a corrida ou sequer começaramm
            alert('Não há carro líder para diminuir a velocidade.');
            return;
        }
    
        if (parseInt(playerMoney) < upgradeValue) {
            alert('Você não pode comprar esse upgrade!');
            return;
        } else {
            playerMoney -= upgradeValue;
            updateMoneyDisplay();
            const subtleLeaderSpeedDecrease = 1; // O valor padrão de velocidade é 2
            leadingCar.setAttribute('data-speed-increase', subtleLeaderSpeedDecrease);
            alert('Você diminuiu sutilmente a velocidade do carro mais à frente.');
        }
    }
    