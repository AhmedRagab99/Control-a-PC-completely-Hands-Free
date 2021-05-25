import React, { useState } from "react";
const useForm = (validate) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",

  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { id, value } = e.target
    setInputs(prevState => ({
      ...prevState,
      [id]: value
    }))
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(inputs));
  };

  return { handleChange, inputs, handleSubmit, errors };
}

export default useForm;