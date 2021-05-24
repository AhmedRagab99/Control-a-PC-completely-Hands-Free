var WebSocketServer = require("websocket").server;
var http = require("http");
const robotjs = require("robotjs");
const PythonShell = require("python-shell").PythonShell;
const path = require("path");

var screen = robotjs.getScreenSize();
console.log(screen.width + "x" + screen.height);

const express = require("express");
const app = express();
const server = http.createServer(app);

const runPythonCode = (req, res, next) => {
  console.log("inside the python code");
  PythonShell.run(
    "/Users/ahmedragab/Desktop/GP_ML/face_landmark.py",
    null,
    function (err, message) {
      if (err) console.log(err);
      console.log(message);
      console.log(typeof message);
    }
  );
  console.log("out");
  next();
};

socket = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true,
});

socket.on("connect", function (connection) {
  console.log("New Connection!!");

  connection.on("message", function (message) {
    console.log("Received Message: " + message.utf8Data);

    // app.use("/", (req, res) => {});
    const { posX, posY } = robotjs.getMousePos();
    const coordinates = message.utf8Data.toString().split(" ");

    if (
      Math.abs(posX - coordinates[0] < 10) &&
      Math.abs(posY - coordinates[1] < 10)
    )
      return;

    robotjs.moveMouse(screen.width - coordinates[0], coordinates[1]);
    socket.broadcast(message.utf8Data);
  });
});

app.get("/", runPythonCode, function (req, res) {
  res.send("Hello World!");
});

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
