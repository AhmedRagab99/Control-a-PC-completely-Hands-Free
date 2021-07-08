var WebSocketServer = require("websocket").server;
var http = require("http");
const robotjs = require("robotjs");
const PythonShell = require("python-shell").PythonShell;
const path = require("path");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/AuthRoutes");
const morgan = require("morgan");
const dotenv = require("dotenv");
const runPythonCode = require("./config/runPythonCode");
const express = require("express");
const app = express();
const server = http.createServer(app);
const verifyToken = require("./middlewares/verifytoken");
const Configuration = require("./models/Configration");
const cors = require("cors");
const { exec } = require("child_process");

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
app.use(cors());
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

socket = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true,
});
var screen = robotjs.getScreenSize();
console.log(screen.width + "x" + screen.height);

const socketConnection = async (req, res) => {
  socket.on("connect", function (connection) {
    console.log("New Connection!!");

    connection.on("message", async function (message) {
      console.log("Received Message: " + message.utf8Data);
      const mouse = robotjs.getMousePos();

      if (message.utf8Data.length > 50) {
        const newConfig = await Configuration.updateOne(
          { user: req.user },
          { configuration_points: message.utf8Data }
        );
      } else if (message.utf8Data === "1") {
        robotjs.mouseClick("left");
        console.log("mouse left clicked");
      } else if (message.utf8Data === "2") {
        robotjs.mouseClick("right");
        console.log("mouse right clicked");
      } else if (message.utf8Data === "3") {
        robotjs.mouseClick("left", true);
        console.log("mouse double left clicked");
      } else if (message.utf8Data.includes("=")) {
        let str = message.utf8Data;

        str = str.replace("=", "");
        const { posX, posY } = robotjs.getMousePos();
        const coordinates = message.utf8Data.toString().split(" ");

        if (
          Math.abs(posX - coordinates[0] < 30) &&
          Math.abs(posY - coordinates[1] < 30)
        )
          return;

        robotjs.moveMouseSmooth(
          screen.width - coordinates[0],
          coordinates[1],
          0.8
        );
      } else if (message.utf8Data.includes("*")) {
        let word = message.utf8Data;
        word = word.replace("*", "");
        let command = "asd";
        if (word === "yes")
          await Configuration.findOne({ user: req.user }, (err, val) => {
            console.log(val.configuration_actions.yes);
            command = val.configuration_actions.yes;
          });
        else if (word === "no")
          await Configuration.findOne({ user: req.user }, (err, val) => {
            console.log(val.configuration_actions.no);
            command = val.configuration_actions.no;
          });
        else if (word === "up")
          await Configuration.findOne({ user: req.user }, (err, val) => {
            console.log(val.configuration_actions.up);
            command = val.configuration_actions.up;
          });
        else if (word === "down")
          await Configuration.findOne({ user: req.user }, (err, val) => {
            console.log(val.configuration_actions.down);
            command = val.configuration_actions.down;
          });
        else if (word === "left")
          await Configuration.findOne({ user: req.user }, (err, val) => {
            console.log(val.configuration_actions.left);
            command = val.configuration_actions.left;
          });
        else if (word === "on")
            await Configuration.findOne({ user: req.user }, (err, val) => {
              console.log(val.configuration_actions.on);
              command = val.configuration_actions.on;
            });
        else if (word === "off")
          await Configuration.findOne({ user: req.user }, (err, val) => {
            console.log(val.configuration_actions.off);
            command = val.configuration_actions.off;
          });
        else if (req.body.from === "stop")
          await Configuration.findOne({ user: req.user }, (err, val) => {
            console.log(val.configuration_actions.stop);
            command = val.configuration_actions.stop;
          });
        else if (req.body.from === "go")
          await Configuration.findOne({ user: req.user }, (err, val) => {
            console.log(val.configuration_actions.go);
            command = val.configuration_actions.go;
          });
        if (command.includes("."))
          exec("open " + "\"" + `${command}` + "\"", (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          });
        else
          exec(
            "open -a " + "\"" + `${command}` + "\"",
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
      }
      // app.use("/", (req, res) => {});
      socket.broadcast(message.utf8Data);
    });
  });
};

app.get(
  "/testface",
  [verifyToken, runPythonCode.runPythonFaceCode],
  function (req, res) {
    res.send("Face World!");
    socketConnection(req, res);
  }
);

app.get(
  "/testvoice",
  [verifyToken, runPythonCode.runPythonVoiceCode],
  function (req, res) {
    res.send("Voice World!");
    socketConnection(req, res);
  }
);

app.get("/face_configure", [verifyToken], async function (req, res, next) {
  await Configuration.findOne({ user: req.user }).updateOne({
    configuration_points: "true",
  });

  runPythonCode.runPythonFaceCode(req, res, next);
  socketConnection(req, res);

  res.send("Face World!");
  // socketConnection(req, res);
});

app.post("/set_face_action", [verifyToken], async function (req, res) {
  if (req.body.from === "1")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.1": req.body.to }
    );
  else if (req.body.from === "2")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.2": req.body.to }
    );
  else if (req.body.from === "3")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.3": req.body.to }
    );
  else if (req.body.from === "yes")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.yes": req.body.to }
    );
  else if (req.body.from === "no")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.no": req.body.to }
    );
  else if (req.body.from === "up")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.up": req.body.to }
    );
  else if (req.body.from === "down")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.down": req.body.to }
    );
  else if (req.body.from === "left")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.left": req.body.to }
    );
  else if (req.body.from === "on")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.on": req.body.to }
    );
  else if (req.body.from === "off")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.off": req.body.to }
    );
  else if (req.body.from === "stop")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.stop": req.body.to }
    );
  else if (req.body.from === "go")
    await Configuration.updateOne(
      { user: req.user },
      { "configuration_actions.go": req.body.to }
    );
  res.send("Success").end();
});

app.get("/stop", async (req, res) => {});

server.listen(process.env.PORT, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
