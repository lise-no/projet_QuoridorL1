/**
 * Module providing color constants for various elements in the game.
 * @module Colors
 */
const clc = require("cli-color");

/**
 * Color for fences.
 * @type {cli-color.Color}
 */
export const fence_color = clc.xterm(82);

/**
 * Color for current player.
 * @type {cli-color.Color}
 */
export const currentPlayer_color = clc.xterm(226);

/**
 * Color for grid numbers.
 * @type {cli-color.Color}
 */
export const gridNum_color = clc.xterm(136);

/**
 * Color for invalid input/outputs..
 * @type {cli-color.Color}
 */
export const invalid_color = clc.xterm(196);

/**
 * Color for mildly invalid elements.
 * @type {cli-color.Color}
 */
export const mildInvalid_color = clc.xterm(208);

/**
 * Color for valid input/outputs.
 * @type {cli-color.Color}
 */
export const valid_color = clc.xterm(82);

/**
 * Color for the grid.
 * @type {cli-color.Color}
 */
export const grid_color = clc.xterm(196);

