var cfg = {
    debug: {
        enabled: false,
        color: `#FF0000`,
    },
    field: {
        color: `gray`,
    },
    ball: {
        color: `#FF0000`,
    },
    player: {
        color: `#FFFFFF`,
        mpt: 7,
        bots: false,
    },
};
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var player1 = {
    y: (canvas.height / 2),
    x: (canvas.width / 384),
    up: {
        active: false,
        keys: [`ArrowLeft`, `w`]
    },
    down: {
        active: false,
        keys: [`ArrowRight`, `s`]
    },
    hasPlayed: false,
};
var player2 = {
    y: (canvas.height / 2),
    x: (canvas.width / 384) * 383,
    up: {
        active: false,
        keys: [`ArrowUp`, `a`]
    },
    down: {
        active: false,
        keys: [`ArrowDown`, `d`]
    },
    hasPlayed: false,
};

var ball = {
    r: 15,
    x: (canvas.width / 2),
    y: (canvas.height / 2),
    dx: Math.floor(Math.random() * 3.21122121) + -3.21122121,
    dy: Math.floor(Math.random() * 5.22511211) + -5.22511211,
    color: {
        rainbow: false,
        r: 0,
        g: 0,
        b: 0,
        i: 0,
    }
};

var bt = {
    f2: false,
    f4: false,
    f8: false,
    f9: false,
}
document.addEventListener("keydown", (e) => {
    player1.up.keys.forEach(key => { if (e.key.toUpperCase() === key.toUpperCase()) player1.up.active = true; });
    player2.up.keys.forEach(key => { if (e.key.toUpperCase() === key.toUpperCase()) player2.up.active = true; });
    player1.down.keys.forEach(key => { if (e.key.toUpperCase() === key.toUpperCase()) player1.down.active = true; });
    player2.down.keys.forEach(key => { if (e.key.toUpperCase() === key.toUpperCase()) player2.down.active = true; });
    if (e.key.toUpperCase() === "F2") bt.f2 = true;
    if (e.key.toUpperCase() === "F4") bt.f4 = true;
    if (e.key.toUpperCase() === "F8") bt.f8 = true;
    if (e.key.toUpperCase() === "F9") bt.f9 = true;
}, false);
document.addEventListener("keyup", (e) => {
    player1.up.keys.forEach(key => { if (e.key.toUpperCase() === key.toUpperCase()) player1.up.active = false; });
    player2.up.keys.forEach(key => { if (e.key.toUpperCase() === key.toUpperCase()) player2.up.active = false; });
    player1.down.keys.forEach(key => { if (e.key.toUpperCase() === key.toUpperCase()) player1.down.active = false; });
    player2.down.keys.forEach(key => { if (e.key.toUpperCase() === key.toUpperCase()) player2.down.active = false; });
    if (e.key.toUpperCase() === "F2".toUpperCase()) bt.f2 = false;
    if (e.key.toUpperCase() === "F4".toUpperCase()) bt.f4 = false;
    if (e.key.toUpperCase() === "F8".toUpperCase()) bt.f8 = false;
    if (e.key.toUpperCase() === "F9".toUpperCase()) bt.f9 = false;


    if (e.key.toUpperCase() == "F2".toUpperCase()) {
        if (cfg.player.bots === false) cfg.player.bots = true;
        else cfg.player.bots = false;

        player1.down.active = false;
        player1.up.active = false;
        player2.down.active = false;
        player2.up.active = false;
    };

    if (e.key.toUpperCase() == "F4".toUpperCase()) {
        __freeze = !__freeze;
    };
}, false);

var drawDebug = function () {
    if (!cfg.debug.enabled) return;
    ctx.beginPath();
    ctx.rect(
        (canvas.width / 2 - 1),
        0,
        2,
        (canvas.height)
    );
    ctx.rect(
        0,
        (canvas.height / 2 - 1),
        (canvas.width),
        2,
    );
    ctx.fillStyle = cfg.debug.color || `#FF0000#`;
    ctx.fill();
    ctx.closePath();
};

var drawField = function () {
    var parts = canvas.height / 101;

    var drawC = false;
    for (let i = 0; i < 101; i++) {
        if (drawC) {
            ctx.beginPath();
            ctx.fillStyle = cfg.field.color || `#FFFFFF`;
            ctx.rect(
                (canvas.width / 2 - 1),
                parts * i,
                2,
                parts
            );
            ctx.fill();
            ctx.closePath();
            drawC = !drawC;
        } else drawC = !drawC;
    }
}

var drawBall = function () {
    ctx.beginPath();

    // very ugly I know... but its allready 11pm
    if (ball.color.rainbow) {
        ball.color.i++;
        if (ball.color.i < (1500 / 6)) ball.color.r = ball.color.r + 1;
        else if (ball.color.i < (1500 / 6 * 2)) ball.color.g = ball.color.g + 1;
        else if (ball.color.i < (1500 / 6 * 3)) ball.color.b = ball.color.b + 1;
        else if (ball.color.i < (1500 / 6 * 4)) ball.color.r = ball.color.r - 1;
        else if (ball.color.i < (1500 / 6 * 5)) ball.color.g = ball.color.g - 1;
        else if (ball.color.i < 1500) ball.color.b = ball.color.b - 1;
        else ball.color.i = 0;
        if ((ball.color.r < 5) || (ball.color.g < 5) || (ball.color.b < 5)) {
            ball.color.r = 20;
            ball.color.g = 20;
            ball.color.b = 20;
        }
    }

    // BORDER
    if (((ball.y - ball.r) <= 0) || ((ball.y + ball.r) >= canvas.height)) ball.dy = -ball.dy;       // TOP // BOTTOM
    if (((ball.x - ball.r) <= 0) || ((ball.x + ball.r) >= canvas.width)) __go = true;        // LEFT // RIGHT

    // PLAYERS
    var ph = (canvas.height / 4.32) / 2;
    if (
        (((ball.y + ball.dy) - ball.r) >= (player1.y - ph) && ((ball.y + ball.dy) + ball.r) <= (player1.y + ph))
        &&
        ((ball.x + ball.dx - ball.r) <= (player1.x + 25))
    ) ball.dx = -ball.dx;
    if (
        (((ball.y + ball.dy) - ball.r) >= (player2.y - ph) && ((ball.y + ball.dy) + ball.r) <= (player2.y + ph))
        &&
        ((ball.x + ball.dx + ball.r) >= (player2.x - 25))
    ) ball.dx = -ball.dx;

    ball.x += ball.dx;
    ball.y += ball.dy;

    ctx.arc(
        ball.x,
        ball.y,
        ball.r,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = cfg.ball.color || `#FF0000#`;
    if (ball.color.rainbow) ctx.fillStyle = `rgb(${ball.color.r},${ball.color.g},${ball.color.b})`;
    ctx.fill();
    ctx.closePath();
};

var drawPlayers = function () {
    ctx.beginPath();

    if ((player1.up.active) && (player1.y - cfg.player.mpt > ((canvas.height / 4.32) / 2))) player1.y = player1.y - cfg.player.mpt;
    if ((player2.up.active) && (player2.y - cfg.player.mpt > ((canvas.height / 4.32) / 2))) player2.y = player2.y - cfg.player.mpt;
    if ((player1.down.active) && (player1.y + cfg.player.mpt < (canvas.height - ((canvas.height / 4.32) / 2)))) player1.y = player1.y + cfg.player.mpt;
    if ((player2.down.active) && (player2.y + cfg.player.mpt < (canvas.height - ((canvas.height / 4.32) / 2)))) player2.y = player2.y + cfg.player.mpt;

    // PLAYER 1
    ctx.rect(
        player1.x,
        player1.y - (canvas.height / 4.32) / 2,
        25,
        (canvas.height / 4.32)
    )

    // PLAYER 2
    ctx.rect(
        player2.x - 25,
        player2.y - (canvas.height / 4.32) / 2,
        25,
        (canvas.height / 4.32)
    )

    // BOTS
    if (cfg.player.bots === true) {

        var ph = ((canvas.height / 4.32) / 2);

        player1.down.active = false;
        player1.up.active = false;
        player2.down.active = false;
        player2.up.active = false;

        if ((ball.x > (canvas.width / 2)) && !player2.hasPlayed) {
            player1.hasPlayed = false;

            // PLAYER 2 MOVE
            if (player2.y < ball.y) player2.down.active = true;
            if (player2.y > ball.y) player2.up.active = true;

            if (
                (((ball.y + ball.dy) - ball.r) >= (player2.y - ph) && ((ball.y + ball.dy) + ball.r) <= (player2.y + ph))
                &&
                ((ball.x + ball.dx + ball.r) >= (player2.x - 25))
            ) player2.hasPlayed = true;
        }

        if ((ball.x < (canvas.width / 2)) && !player1.hasPlayed) {
            player2.hasPlayed = false;

            // PLAYER 1 MOVES
            if (player1.y < ball.y) player1.down.active = true;
            if (player1.y > ball.y) player1.up.active = true;

            if (
                (((ball.y + ball.dy) - ball.r) >= (player1.y - ph) && ((ball.y + ball.dy) + ball.r) <= (player1.y + ph))
                &&
                ((ball.x + ball.dx - ball.r) <= (player1.x + 25))
            ) player1.hasPlayed = true;
        }
    }

    ctx.fillStyle = cfg.player.color || `#FFFFFF`;
    ctx.fill();
    ctx.closePath();
}

var drawFPS = function () {
    ctx.beginPath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText((__fpsDisplay) + " FPS", 4, 20);
    ctx.closePath();
}

var __freeze = false;
var __freezeApplied = false;
var __go = false;
var __goApplied = false;
function drawControls() {
    ctx.beginPath();
    ctx.font = `16px Consolas`;

    /**
     *      [F2] [F3] [F8] [F9]      *
     *                               *
     *    [W]     [F] [+]     [↑]    *
     * [A][S][D]  [B] [-]  [←][↓][→] *
     *                               *
     *      BOT   FREEZE   STOP      *
     */
    [
        { key: 'SPEED_UP',          text: `                         `, line: 6 },
        { key: 'SPEED_DOWN',        text: `                         `, line: 6 },
        { key: 'FREEZE',            text: `        [F4]             `, line: 6 },
        { key: 'BOT',               text: `   [F2]                  `, line: 6 },
        { key: 'NONE',              text: `                         `, line: 5 },
        { key: 'UP',                text: `   [W]                   `, line: 4 },
        { key: 'UP',                text: `                [←]      `, line: 3 },
        { key: 'LEFT',              text: `                   [↑]   `, line: 4 },
        { key: 'LEFT',              text: `[A]                      `, line: 3 },
        { key: 'RIGHT',             text: `      [D]          [↓]   `, line: 3 },
        { key: 'DOWN',              text: `   [S]                [→]`, line: 3 },
        { key: 'NONE',              text: `                         `, line: 2 },
        { key: 'ST_BOT',            text: `   BOT                   `, line: 1 },
        { key: 'ST_FREEZE',         text: `         FREEZE          `, line: 1 },
        { key: 'ST_STOP',           text: `                  STOP   `, line: 1 }
    ].forEach((ks, i) => {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';

        // CONTROLS
        if ((ks.key === 'UP') && player1.up.active) ctx.fillStyle = '#FFFF00';
        if ((ks.key === 'LEFT') && player2.up.active) ctx.fillStyle = '#FFFF00';
        if ((ks.key === 'RIGHT') && player2.down.active) ctx.fillStyle = '#FFFF00';
        if ((ks.key === 'DOWN') && player1.down.active) ctx.fillStyle = '#FFFF00';

        // BOT & ACTION KEYS
        if ((ks.key === 'BOT') && bt.f2) ctx.fillStyle = '#FFFF00';
        if ((ks.key === 'FREEZE') && bt.f4) ctx.fillStyle = '#FFFF00';

        // STATUS LINE
        if (ks.key.substring(0, 2) === 'ST') ctx.fillStyle = 'rgba(0,0,0,0)';
        if ((ks.key === 'ST_BOT') && cfg.player.bots) ctx.fillStyle = 'rgba(255,0,0,0.8)';
        if ((ks.key === 'ST_FREEZE') && __freeze) ctx.fillStyle = 'rgba(255,0,0,0.8)';
        if ((ks.key === 'ST_STOP') && __go) ctx.fillStyle = 'rgba(255,0,0,0.8)';

        // BLOCKED KEYS
        if ((ks.key === 'LEFT') && cfg.player.bots) ctx.fillStyle = 'rgba(255,0,0,0.5)';
        if ((ks.key === 'RIGHT') && cfg.player.bots) ctx.fillStyle = 'rgba(255,0,0,0.5)';
        if ((ks.key === 'UP') && cfg.player.bots) ctx.fillStyle = 'rgba(255,0,0,0.5)';
        if ((ks.key === 'DOWN') && cfg.player.bots) ctx.fillStyle = 'rgba(255,0,0,0.5)';

        ctx.fillText(
            ks.text,
            ((canvas.width / 2) / 2 - (ks.text.length / 2 * 8)),
            canvas.height - (20 * ks.line)
        );

    })
    ctx.closePath();
}

var __fps = 0;
var __fpsDisplay = __fps;

var draw = function () {
    if (__freeze) {
        if (__freezeApplied) return;
        __freezeApplied = true;
    } else __freezeApplied = false;
    if (__go) {
        if (__goApplied) return;
        __goApplied = true;
    } else __goApplied = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDebug();
    drawField();
    drawControls();
    drawFPS();
    drawBall();
    drawPlayers();

    __fps++;
};

setInterval(function () { __fpsDisplay = __fps; __fps = 0; }, 1000);
setInterval(draw, 10);