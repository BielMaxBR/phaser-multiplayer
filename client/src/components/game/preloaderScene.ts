import { PRELOADER_SCENE } from "../../Utils/constants";
import ClientManager from "./classes/client/ClientManager";
import Game from "./classes/Game";


export class PreloaderScene extends Phaser.Scene {
    game: Game
    constructor(game: Game) {
        super({
          key: PRELOADER_SCENE,
        });
        this.game = game
      }
    create() {
        setTimeout((_: any) => {
            this.game.client = new ClientManager("https://9208-bielmaxbr-phasermultipl-9mjk4ralmzn.ws-us88.gitpod.io")//(process.env.REACT_APP_SERVER_URL)
        },1000)
    }
}