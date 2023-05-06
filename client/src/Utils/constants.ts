export const PRELOADER_SCENE: string = "Preloader";
export const GAME_SCENE: string = "Game";
export const GAME_WIDTH: number = 667;
export const GAME_HEIGHT: number = 337;

export var GAME_SCALE: number;

export const setGameScale = (value: number) => {
    GAME_SCALE = value;
};

export const HEXSIZE = 64;

export const MATHS = {
    SQRT: 1.7320508075688772, // sqrt(3)
    SQRT32: 0.8660254037844386, // sqrt(3)/2
    HEXWITH: HEXSIZE / 1.7320508075688772,
    HEXHEIGHT: HEXSIZE / 2,
};
