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
  PythonShell.run(
    "/home/fares/Desktop/GP_ML/Speech Recognition/prediction.py",
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
    const mouse = robotjs.getMousePos();

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

      // * Speech Recognition Configurations
    } else if (message.utf8Data === "Left") {
      robotjs.moveMouseSmooth(mouse.x - 50, mouse.y);
      console.log("Move Mouse Left");
    } else if (message.utf8Data === "Up") {
      robotjs.moveMouseSmooth(mouse.x, mouse.y - 50);
      console.log("Move Mouse Up");
    } else if (message.utf8Data === "Right") {
      robotjs.moveMouseSmooth(mouse.x + 50, mouse.y);
      console.log("Move Mouse Right");
    } else if (message.utf8Data === "Down") {
      robotjs.moveMouseSmooth(mouse.x, mouse.y + 50);
      console.log("Move Mouse Down");
    } else if (message.utf8Data === "Yes") {
      robotjs.mouseClick("left");
      console.log("Mouse Left Click");
    } else if (message.utf8Data === "No") {
      robotjs.mouseClick("right");
      console.log("Move Right Click");

    } else {
      const { posX, posY } = robotjs.getMousePos();
      const coordinates = message.utf8Data.toString().split(" ");

      if (
        Math.abs(posX - coordinates[0] < 20) &&
        Math.abs(posY - coordinates[1] < 20)
      )
        return;

      robotjs.moveMouseSmooth(screen.width - coordinates[0], coordinates[1], 1);
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
