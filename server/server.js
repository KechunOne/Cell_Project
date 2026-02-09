const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ✅ 静态目录
app.use("/mobile", express.static(path.join(__dirname, "../mobile")));
app.use("/visual", express.static(path.join(__dirname, "../visual")));

// ✅ 默认访问
app.get("/", (req, res) => {
  res.send("Cell Project server running");
});

// ✅ socket.io
io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("motion", (data) => {
    socket.broadcast.emit("motion", data);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

// ✅ Render 必须用这个端口
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("server running on port", PORT);
});
