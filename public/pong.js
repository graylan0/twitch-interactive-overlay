var socket = io.connect();

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: 2, dy: 2 };
var paddleA = { y: canvas.height / 2, height: 100 };
var paddleB = { y: canvas.height / 2, height: 100 };

socket.on('updatePaddles', function(data) {
    paddleA.y = data.paddleA;
    paddleB.y = data.paddleB;
});

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();

    // Draw paddles
    context.fillStyle = '#0095DD';
    context.fillRect(10, paddleA.y - paddleA.height / 2, 10, paddleA.height);
    context.fillRect(canvas.width - 20, paddleB.y - paddleB.height / 2, 10, paddleB.height);

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with walls
    if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }

    // Ball collision with paddles
    if ((ball.x - ball.radius < 20 && ball.y > paddleA.y - paddleA.height / 2 && ball.y < paddleA.y + paddleA.height / 2) ||
        (ball.x + ball.radius > canvas.width - 20 && ball.y > paddleB.y - paddleB.height / 2 && ball.y < paddleB.y + paddleB.height / 2)) {
        ball.dx = -ball.dx;
    }

    // Ball out of bounds
    if (ball.x + ball.dx < 0 || ball.x + ball.dx > canvas.width) {
        // Reset ball
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    requestAnimationFrame(draw);
}

// Function to handle Xbox 360 controller input
function handleControllerInput() {
    var gamepad = navigator.getGamepads()[0];
    if (gamepad) {
        if (gamepad.buttons[0].pressed) socket.emit('controllerAction', 'upa');
        if (gamepad.buttons[1].pressed) socket.emit('controllerAction', 'downa');
        // Add more conditions for other buttons and actions
    }
    requestAnimationFrame(handleControllerInput);
}

// Start handling controller input
handleControllerInput();

// Start drawing the game
draw();
