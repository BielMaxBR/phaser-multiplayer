import React, { useEffect } from "react";
import "phaser";
import { getPhaserConfig } from "../../Utils/PhaserConfig";
import { Game, Types } from "phaser";

const GameView: React.FC = () => {
    const config: Types.Core.GameConfig = getPhaserConfig();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const game: Game = new Game(config);
    });

    return <div id="game" />;
};
export default GameView;
