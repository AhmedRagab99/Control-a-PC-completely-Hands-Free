import React from 'react'

export default function validatioInfo(inputs) {
    let errors = {};


    if (!inputs.username.trim()) {
        errors.username = "error";
    } else {
        errors.username = "success";
    }


    if (!inputs.email.trim()) {
        errors.email = "error";
    } else {
        errors.email = "success";
    }


    if (!inputs.password) {
        errors.password = "error";
    } else {
        errors.password = "success";
    }

    return errors;
}
