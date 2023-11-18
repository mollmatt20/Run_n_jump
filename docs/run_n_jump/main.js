title = "RUN N JUMP";

description = ` [Tap] to jump
`;

characters = [
`
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
`,
`
rrrrr
rrrrr
rrrrr
rrrrr
`,
`
ggggg
ggggg
ggggg
ggggg
`
];

const G = {
	WIDTH: 100,
	HEIGHT: 100,
    FALLSPEED: 2,
    JUMPSPEED: 2,
    BLOCK_MIN_SPEED: 1,
    BLOCK_MAX_SPEED: 2
};

options = {
    viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

// Define Player
/**
 * @typedef {{
* pos: Vector,
* }} Player
*/

/**
* @type { Player }
*/
let player;

// Define Block
/**
 * @typedef {{
* pos: Vector
* }} Block
*/

/**
* @type { Block [] }
*/
let redBlock;

/**
* @type { Block [] }
*/
let greenBlock;

// Other variables
let blockSpeed;
let whichBlock;
let speedBoost;
let isJump;
let isFall;

function update() {
    if (!ticks) {
        // Initialise var
        player = {
            pos: vec(G.WIDTH * 0.25, G.HEIGHT * 0.75)
        };
        redBlock = [];
        greenBlock = [];
        blockSpeed = 0;
        whichBlock = 0;
        speedBoost = 0;
        isJump = false;
        isFall = false;
    }
    // Create a block with its own speed
    if(redBlock.length == 0 && greenBlock.length == 0){
        whichBlock = rndi(0, 2);
    } 
    if(whichBlock == 0){
        if(redBlock.length == 0) {
            blockSpeed = (rnd(G.BLOCK_MIN_SPEED, G.BLOCK_MAX_SPEED) * difficulty) + speedBoost;
            for(let i = 0; i < 1; i++) {
                redBlock.push({ pos: vec(G.WIDTH, G.HEIGHT * 0.75) });
            }
        }
    }
    if(whichBlock == 1){
        if(greenBlock.length == 0) {
            blockSpeed = (rnd(G.BLOCK_MIN_SPEED, G.BLOCK_MAX_SPEED) * difficulty) + speedBoost;
            for(let i = 0; i < 1; i++) {
                greenBlock.push({ pos: vec(G.WIDTH, G.HEIGHT * 0.75) });
            }
        }
    }
    if(input.isJustPressed) {
        if(!isJump && !isFall) {
            play("hit");
            isJump = true;
        }
    }
    if(isJump) {
        player.pos.y -= G.JUMPSPEED;
    }
    if(player.pos.y <= (G.HEIGHT * 0.5)) {
        isJump = false;
        isFall = true;
    }
    if(isFall) {
        player.pos.y += G.FALLSPEED;
        if(player.pos.y >= (G.HEIGHT * 0.75)) {
            isFall = false;
            player.pos = vec(G.WIDTH * 0.25, G.HEIGHT * 0.75);
        }
    }
    color("cyan");
    char("a", player.pos);

    remove(redBlock, (b) => {
        b.pos.x -= blockSpeed;
        color("red");
        const isCollidingWithPlayer = char("a", b.pos).isColliding.char.a;
        if(isCollidingWithPlayer) {
            play("explosion");
            end();
        }
        return (b.pos.x < 0);
    });
    remove(greenBlock, (b) => {
        b.pos.x -= blockSpeed;
        color("green");
        const isCollidingWithPlayer = char("a", b.pos).isColliding.char.a;
        if(isCollidingWithPlayer) {
            play("powerUp");
            speedBoost += 0.1;
        }
        return (b.pos.x < 0);
    });
}