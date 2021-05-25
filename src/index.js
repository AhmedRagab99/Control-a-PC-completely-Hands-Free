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

    if (message.utf8Data === "1") {
      robotjs.mouseClick("left");
      console.log("mouse left clicked");
    } else if (message.utf8Data === "2") {
      robotjs.mouseClick("right");
      console.log("mouse right clicked");
    } else if (message.utf8Data === "3") {
      robotjs.mouseClick("left", true);
      console.log("mouse double left clicked");
    } else if (message.utf8Data === "4") {
      robotjs.mouseClick("right", true);
      console.log("mouse double right clicked");
    } else {
      const { posX, posY } = robotjs.getMousePos();
      const coordinates = message.utf8Data.toString().split(" ");

      if (
        Math.abs(posX - coordinates[0] < 20) &&
        Math.abs(posY - coordinates[1] < 20)
      )
        return;

      robotjs.moveMouseSmooth(
        screen.width - coordinates[0],
        coordinates[1],
        0.9
      );
      socket.broadcast(message.utf8Data);
    }

    // app.use("/", (req, res) => {});
  });
});

app.get("/", runPythonCode, function (req, res) {
  res.send("Hello World!");
});

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
