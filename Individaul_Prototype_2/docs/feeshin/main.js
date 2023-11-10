title = "I Love Fishin";

description = `
`;

characters = [];

const G = {
	WIDTH: 100,
	HEIGHT: 150
};

options = {
    viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

// Let bubbles be an array made of Bubble objects
/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Bubble
 */

/**
 * @type { Bubble [] }
 */
let bubbles;

function update() {
  if (!ticks) {
    bubbles = times(20, () => {
        // Random number generator function
        // rnd( min, max )
        const posX = rnd(0, G.WIDTH);
        const posY = rnd(50, G.HEIGHT);
        // An object of type Bubble with appropriate properties
        return {
            // Creates a Vector
            pos: vec(posX, posY),
            // More RNG
            speed: rnd(0.5, 1.0)
        };
    });
  }
  bubbles.forEach((b) => {
    // Move the bubbles to the right
    b.pos.x += b.speed;
    // Bring the bubble back to left once it's past the right screen
    b.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

    // Choose a color to draw
    color("light_black");
    // Draw the star as a square of size 1
    box(b.pos, 1);
    });
    line(0, 45, 100, 45, 2.5);

}