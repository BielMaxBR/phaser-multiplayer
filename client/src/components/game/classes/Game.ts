import { Game as GameClass } from "phaser";
import { GameOptions } from "../../../Utils/PhaserConfig";
import ClientManager from "./client/ClientManager";

export default class Game extends GameClass {
    client: ClientManager
    constructor(options: GameOptions) {
        super(options)
        
    }
} 