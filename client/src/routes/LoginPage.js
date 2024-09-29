import React from 'react'
import LoginForm from '../components/LoginForm'
import { CgPassword } from 'react-icons/cg';
import { json, redirect } from 'react-router';

const LoginPage = () => {
  return <LoginForm />
}

export default LoginPage; 


export const action = async ({request, params})=>{
  
  const enteredData = await request.formData();
  const loginData = {
    email: enteredData.get("email"),
    password: enteredData.get("password")
  }

  const response = await fetch('http://localhost:5150/login',{
    method:request.method,
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })

  const loginResponseData = await response.json();
  
  if(response.status === 500 ){
    
    return loginResponseData.detail;
  }

  if(!response.ok){
    return json({message: "incorrect email or password"},{status:500, statusText:'Internal server error'})
  }else{

    const userId = loginResponseData.id; 
    localStorage.setItem("userId", loginResponseData.id)
    localStorage.setItem('name', loginResponseData.name);
    localStorage.setItem('token', loginResponseData.token);

    return redirect(`/user/${userId}/todos`)
  }
}