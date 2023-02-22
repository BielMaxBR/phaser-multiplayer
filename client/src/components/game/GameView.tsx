import { useEffect } from "react";
import 'phaser';
import { GameOptions, getPhaserConfig } from "../../Utils/PhaserConfig";
import { PreloaderScene } from "./preloaderScene";
import { PRELOADER_SCENE } from "../../Utils/constants";


const GameView: React.FC = _ => {
    const config: GameOptions = getPhaserConfig();
    useEffect(() => {
      const game: Phaser.Game = new Phaser.Game(config);
  
      game.scene.add(PRELOADER_SCENE, new PreloaderScene(), true);
  
    });
  
    return (
      <div>
        <div id="game" />
      </div>
    );
  };
export default GameView