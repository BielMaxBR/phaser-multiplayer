import { Schema, Context, type } from "@colyseus/schema";

export class GameState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";

}
