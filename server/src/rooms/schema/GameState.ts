import { Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";
import { Player } from "./PlayerSchema";

export class GameState extends Schema {
    @type("number") mapWidth: number;
    @type("number") mapHeight: number;

    @type({ map: Player }) players = new MapSchema<Player>();
    clients = new MapSchema<Client>();
}
