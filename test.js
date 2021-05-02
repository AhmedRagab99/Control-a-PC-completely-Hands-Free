let pythonShell = require("python-shell");

var options = {
  pythonOptions: ["-u"],
  scriptPath: "/Users/ahmedragab/Downloads/GP/",
};
pythonShell.PythonShell.run("face_landmark.py", options, (err, res) => {
  if (err) throw err;
  console.log(res)
});

