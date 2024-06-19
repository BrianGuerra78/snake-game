// Obtén el elemento canvas y el contexto de dibujo
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// 1. Define una variable para almacenar el puntaje
let score = 0;

// Define el tamaño de los bloques
let box = 32;

// Crea la serpiente como un arreglo de objetos
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// Define la dirección inicial de la serpiente
let direction = "right";

// Crea la comida en una posición aleatoria
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Dibuja el fondo del juego
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Dibuja la serpiente
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "red";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Dibuja la comida
function drawFood() {
    context.fillStyle = "green";
    context.fillRect(food.x, food.y, box, box);
}

// Crea los obstáculos como un arreglo de objetos
let obstacles = [];
for (let i = 0; i < 5; i++) {
    obstacles.push({
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    });
}

// Dibuja los obstáculos
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        context.fillStyle = "blue";
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}


// Actualiza la dirección de la serpiente basado en la entrada del teclado
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Inicia el juego
function startGame() {
    // Si la serpiente se sale del canvas, aparece del otro lado
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Verifica si la serpiente se ha chocado a sí misma
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }
    // Comprueba la colisión con los obstáculos en tu función de actualización
    for (let i = 0; i < obstacles.length; i++) {
        if (snake[0].x == obstacles[i].x && snake[0].y == obstacles[i].y) {
            clearInterval(game);
        }
    }

    // Dibuja el fondo, la serpiente y la comida
    createBG();
    createSnake();
    drawFood();
    drawObstacles();

    // Mueve la serpiente en la dirección actual
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Verifica si la serpiente ha comido la comida
    if (snakeX != food.x || snakeY != food.y) {
        // Si no ha comido la comida, quita el último elemento de la serpiente
        snake.pop();
    } else {
        // 2. Aumenta el puntaje cuando la serpiente come la comida
        if (snakeX == food.x && snakeY == food.y) {
            score++;
        }
        // Si ha comido la comida, genera una nueva comida en una posición aleatoria
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Crea una nueva cabeza y la añade al inicio de la serpiente
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // 3. Muestra el puntaje en la pantalla
    context.fillStyle = "white";
    context.font = "45px Changa one";
    context.fillText(score, 2 * box, 1.6 * box);

    snake.unshift(newHead);
}

// Ejecuta la función startGame cada 100ms
let game = setInterval(startGame, 100);