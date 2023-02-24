import geckos, { ChannelId, Data, GeckosServer, ServerChannel } from "@geckos.io/server";

const io: GeckosServer = geckos();

io.onConnection((channel: ServerChannel) => {
    channel.on("connect", (data: Data, senderId: ChannelId) => {
        console.log("entraro");
    });
});

io.listen();
export default io;
