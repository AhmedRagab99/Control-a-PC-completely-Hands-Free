import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios");

const useForm = (validate) => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setErrors(validate(inputs));
    axios
      .post("http://localhost:8080/api/v1/auth/register", {
        name: inputs.username,
        email: inputs.email,
        password: inputs.password,
      })
      .then(function (responce) {
        console.log(responce);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return { handleChange, inputs, handleSubmit, errors };
};

export default useForm;
