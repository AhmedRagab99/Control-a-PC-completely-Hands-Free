let pythonShell = require("python-shell");

var options = {
  pythonOptions: ["-u"],
  scriptPath: "/Users/ahmedragab/Downloads/GP/",
};
pythonShell.PythonShell.run("face_landmark.py", options, (err, res) => {
  if (err) throw err;
  console.log("js results" + res);
});

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
//   robot.scrollMouse(x, y);
// }

// // Type "Hello World".
// robot.typeString("Hello World");

// Press enter.
// robot.keyTap("enter");
