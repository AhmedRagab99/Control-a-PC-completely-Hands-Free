const robot = require("robotjs");
var screen = robot.getScreenSize();
console.log(screen.width + "x" + screen.height);

const pythonShell = require("python-shell");
let pyshell = new pythonShell.PythonShell(
  "/Users/ahmedragab/Downloads/GP/face_landmark.py"
);

// sends a message to the Python script via stdin
pyshell.send("hello");

pyshell.on("message", function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  //   console.log("message is" + newX, "$$$$", newY);
  // coordinates  = message
  //   console.log(message);
  coordinates = message.split(" ");
  console.log(coordinates[0], "%%%", coordinates[1]);
  coordinates[0] = screen.width - coordinates[0];
  robot.setMouseDelay(100);
  const { posX, posY } = robot.getMousePos();
  if (
    Math.abs(posX - coordinates[0] < 10) &&
    Math.abs(posY - coordinates[1] < 10)
  )
    return;
  robot.moveMouse(coordinates[0], coordinates[1]);
});

// end the input stream and allow the process to exit
pyshell.end(function (err, code, signal) {
  if (err) throw err;
  console.log("The exit code was: " + code);
  console.log("The exit signal was: " + signal);
  console.log("finished");
});

// let pythonShell = require("python-shell");

// var options = {
//   pythonOptions: ["-u"],
//   scriptPath: "/Users/ahmedragab/Downloads/GP/",
// };
// pythonShell.PythonShell.run("face_landmark.py", options, (err, res) => {
//   if (err) throw err;
//   console.log("js results" + res);
// });

// Move the mouse across the screen as a sine wave.
// var robot = require("robotjs");
// robot.mouseClick()

// // Speed up the mouse.
// robot.setMouseDelay(2);

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = screenSize.height / 2 - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++) {
//   y = height * Math.sin((twoPI * x) / width) + height;
//   robot.moveMouse(x, y);
//   if (x === width / 2) {
//     robot.mouseClick();
//     console.log("here");
//   }
//   // robot.scrollMouse(x, y);
// }

// // Type "Hello World".
// robot.typeString("Hello World");

// Press enter.
// robot.keyTap("enter");
