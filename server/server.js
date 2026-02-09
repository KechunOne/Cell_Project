const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

// 静态资源
app.use(express.static("visual"));
app.use("/mobile", express.static("mobile"));

// Socket.IO 逻辑
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("motion", (data) => {
    io.emit("motion", data); // 广播给所有客户端
  });
});

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
