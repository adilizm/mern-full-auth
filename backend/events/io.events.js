const { saveMessage, MarkMessageDelivred, MarkMessageSeen } = require("../controllers/conversation.controller");

let onlineUsers = new Map();

const SocketEvents = (io) => {
    io.on("connection", (socket) => {
        socket.on("userConnected", (_id) => {
            onlineUsers.set(_id, socket.id);
            io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
        });

        socket.on("disconnect", () => {
            const _id = [...onlineUsers.entries()].find(([_, id]) => id === socket.id)?.[0];
            if (_id) {
                onlineUsers.delete(_id);
                io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
            }
        });

        socket.on("new_message", async (data) => {
            try {
                /* first time messaging (no conversation_id) */
                const [conv, msg] = await saveMessage(data)
                data.conversation = conv
                data.msg = msg
                console.log('res = ', data)
                if (!data.conversation_id) {
                    io.to(onlineUsers.get(data.to)).to(onlineUsers.get(data.from)).emit("new_message", data);
                } else {
                    io.to(onlineUsers.get(data.to)).to(onlineUsers.get(data.from)).emit("message", data);
                }
            } catch (error) {
                console.error(error.message)
            }
        });

        socket.on("message_delivred", async (data) => {
            try {
                const res = await MarkMessageDelivred(data._id)
                io.to(onlineUsers.get(data.from)).emit("message_delivred", res);

            } catch (error) {
                console.error(error.message)
            }
        });

        socket.on("message_seen", async (data) => {
            try {
                const res = await MarkMessageSeen(data._id)
                io.to(onlineUsers.get(data.from)).emit("message_is_seen", res);

            } catch (error) {
                console.error(error.message)
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};


module.exports = SocketEvents
