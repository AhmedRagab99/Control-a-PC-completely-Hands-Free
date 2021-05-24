const robotjs = require("robotjs");
const pythonShel = require("python-shell");
const W3CWebSocket = require("websocket").w3cwebsocket;

function initializeSocket() {
  const client = new W3CWebSocket("ws://localhost:8080");
  // const context = this;
  client.onopen = function () {
    console.log("Socket is open for messages");
    let pyshell = new pythonShel.PythonShell(
      "//Users/ahmedragab/Desktop/GP_ML/face_landmark.py"
    );
    pyshell.on("message", (message) => {
      console.log(message);
    });
  };
  client.onmessage = function (message) {
    let coordinates = message.data.toString().split(" ");
    console.log("split is success", coordinates[0]);
    // setData(coordinates);
    robotjs.moveMouse(coordinates[0], coordinates[1]);
  };
  client.onclose = function () {
    // setData("WebSocket Client Connection Closed");
  };
}

initializeSocket();
