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
    return json({ message: "password and confirm password must be match" });
  }

  const response = await fetch("http://localhost:5150/account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if(response.status === 400 ){
    return response.json().errors; 
  }

  if(response.status === 500 ){
    return response.json().detail
  }

  if (!response.ok) {
    console.log("response is not ok ");
    throw json({ message: "Can't register a new user!" }, { status: 500 });
  } else {

    // extracting user data from the response 
    // response data should be { userName, email, token, expiration }
    const resData = await response.json();
    console.log(resData)
    const userId = resData.id
    // set token 
    localStorage.setItem("token", resData.token);
    localStorage.setItem('name', resData.userName)
    return redirect(`/user/${userId}/todos`);
  }
};
