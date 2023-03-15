import { useEffect } from "react";
import "phaser";
import { GameOptions, getPhaserConfig } from "../../Utils/PhaserConfig";
import { PreloaderScene } from "./preloaderScene";
import { PRELOADER_SCENE } from "../../Utils/constants";
import { Game } from "phaser";

const GameView: React.FC = (_) => {
    const config: GameOptions = getPhaserConfig();
    useEffect(() => {
        const game: Game = new Game(config);

        game.scene.add(PRELOADER_SCENE, new PreloaderScene(), true);
    });

    return <div id="game" />;
};
export default GameView;