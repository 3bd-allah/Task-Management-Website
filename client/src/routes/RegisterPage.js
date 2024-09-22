import React from "react";
import RegisterForm from "../components/RegisterForm";
import { json, redirect } from "react-router";
import { compareValidator } from "../util/Validators";

const RegisterPage = () => {
  return <RegisterForm method="post" />;
};

export default RegisterPage;

export const action = async ({ request, params }) => {
  const enteredData = await request.formData();

  const registerData = {
    name: enteredData.get("name"),
    email: enteredData.get("email"),
    password: enteredData.get("password"),
    confirmPassword: enteredData.get("confirmPassword"),
  };

  if (!compareValidator(registerData.password, registerData.confirmPassword)) {
    throw json({ message: "password and confirm password must be match" });
  }

  const response = await fetch("http://localhost:5150/account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    console.log("response is not ok ");
    throw json({ message: "Error !" }, { status: 500 });
  } else {

    // extracting user data from the response 
    const resData = await response.json();
    const userId = resData.userId

    localStorage.setItem("token",registerData.email);
    return redirect(`/user/${userId}`);
  }
};
