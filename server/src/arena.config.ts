import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { Lobby } from "./rooms/Lobby";
import cors from "cors";
import express from "express";
import path from "path";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        gameServer.define("lobby", Lobby);
    },

    initializeExpress: (app) => {
        app.use(cors());
        app.use("/", (req,res) => {
            res.send(`<html>
                <head>
                    <script src="https://unpkg.com/colyseus.js@^0.14.0/dist/colyseus.js"></script>
                    <title>multiplayer game</title>
                </head>
                <body>
                    <script>
                        var client = new Colyseus.Client("wss://" + window.location.host)
                        client.joinOrCreate("lobby")
                    </script>
                </body>
            </html>
            `)
        })
        app.use("/colyseus", monitor());
    },

    beforeListen: () => {},
});
