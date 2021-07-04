var WebSocketServer = require("websocket").server;
var http = require("http");
const robotjs = require("robotjs");
const PythonShell = require("python-shell").PythonShell;
const path = require("path");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/AuthRoutes");
const morgan = require("morgan");
const dotenv = require("dotenv");

const express = require("express");
const app = express();
const server = http.createServer(app);

app.get("/about", (req, res) => {
  res.send("welcome to our site");
});
app.get("/", function (req, res) {
  res.send("<b>My</b> first express http server");
});

// On localhost:3000/welcome
app.get("/welcome", function (req, res) {
  res.send("<b>Hello</b> welcome to my http server made with express");
});

// middelware
app.use(morgan("dev"));
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1/auth", AuthRoutes);

mongoose.connect(
  process.env.MONGOURI || "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    useCreateIndex: true,
  },
  () => {
    console.log("connected to data base ");
  }
);

var screen = robotjs.getScreenSize();
console.log(screen.width + "x" + screen.height);
console.log(process.env.MONGOURI);
const runPythonCode = (req, res, next) => {
  const { exec } = require("child_process");

  const testvar = "false";
  exec(
    `python3 prediction.py & python3 face_landmark.py ${testvar}`,
    { cwd: "/Users/ahmedragab/Desktop/GP_ML/" },
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
  // let options = {
  //   pythonOptions: ["-u"], // get print results in real-time
  //   args: ["false"],
  // };
  // console.log("inside the python code");
  // PythonShell.run(
  //   "/Users/ahmedragab/Desktop/GP_ML/test.py",
  //   null,
  //   function (err, message) {
  //     if (err) console.log(err);
  //     console.log(message);
  //     console.log(typeof message);
  //   }
  // );
  // PythonShell.run(
  //   "/Users/ahmedragab/GP_ML/Speech Recognition/prediction.py",
  //   null,
  //   function (err, message) {
  //     if (err) console.log(err);
  //     console.log(message);
  //     console.log(typeof message);
  //   }
  // );
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

app.get("/test", runPythonCode, function (req, res) {
  res.send("Hello World!");
});

server.listen(process.env.PORT, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
