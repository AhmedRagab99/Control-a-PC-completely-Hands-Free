const { exec } = require("child_process");
const Configuration = require("../models/Configration");

const runPythonFaceCode = async (req, res, next) => {
  let testvar = "";
  await Configuration.findOne({ user: req.user })
    .select("configuration_points")
    .then((confiure) => {
      testvar = confiure.configuration_points;
    });

  console.log(testvar);
  exec(
    `python face_landmark.py ${testvar} & python3 prediction.py`,
    { cwd: process.env.WORKDIR },
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

  console.log("out");
  next();
};

const runPythonVoiceCode = (req, res, next) => {
  exec(
    "python prediction.py",
    { cwd: process.env.WORKDIR },
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

  console.log("out");
  next();
};

const runPythonCode = { runPythonVoiceCode, runPythonFaceCode };
module.exports = runPythonCode;
