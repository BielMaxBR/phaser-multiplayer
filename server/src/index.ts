import { listen } from "@colyseus/arena";

import arenaConfig from "./arena.config";

listen(arenaConfig);

// import { Server } from "colyseus";
// import { Lobby } from "./rooms/Lobby";

// const server = new Server();

// server.define("lobby", Lobby);

// server.listen(2567);
// console.log("INICIAR");

