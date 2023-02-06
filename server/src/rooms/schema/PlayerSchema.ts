import { Schema, type } from "@colyseus/schema";
import { InputData } from "./InputDataInterface";

export class Player extends Schema {
    @type("number") x: number;
    @type("number") y: number;
    @type("number") tick: number;

    inputQueue: InputData[] = [];
}
