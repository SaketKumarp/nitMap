// import { Server } from "socket.io";

// const io = new Server(3001, {
//   cors: { origin: "*" },
// });

// io.on("connection", (socket) => {
//   console.log("User connected");

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("join_room", (room) => {
//     socket.join(room);
//   });
// });
