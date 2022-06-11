const io = require("socket.io")(5000, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
  cors: {
    origin: "http://127.0.0.1:3000",
  },
});
io.sockets.on("connection", function (socket) {
  socket.on("join", (data) => {
    console.log("User joined " + data.image);
    socket.join(data.image);
  });
});

module.exports = io;
