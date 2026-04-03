import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room: string) => {
    if (!room) {
      console.log("❌ Invalid room:", room);
      return;
    }

    socket.join(room);
    console.log("✅ Joined room:", room);
  });

  socket.on(
    "send_message",
    (data: { room: string; text: string; name: string }) => {
      if (!data.room || !data.text) return;

      const message = {
        ...data,
        sender: socket.id,
        name: data.name,
      };

      console.log("📩 Message:", message);

      io.to(data.room).emit("receive_message", message);
    },
  );

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket server running on port 3001");
});
