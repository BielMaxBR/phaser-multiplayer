

import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { Lobby } from "./rooms/Lobby";
import cors from "cors"

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        gameServer.define('lobby', Lobby);

    },

    initializeExpress: (app) => {

        app.use(cors())
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {

    }
});