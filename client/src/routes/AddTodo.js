import { json, redirect } from "react-router";
import { getAuthToken, getUserId } from "../util/auth";


import React from 'react'
import TodoForm from "../components/TodoForm";

const AddTodoPage = () => {
  return <TodoForm method="POST" button="Add Task" />
}

export default AddTodoPage

// export const action = async ({ request }) =>{

//     const userId = getUserId();
//     const enteredData = await request.formData();
//     const todoData = {
//         title: enteredData.get('title'),
//         description: enteredData.get('description')
//     }

//     const token = getAuthToken();
//     const response = await fetch(`http://localhost:5150/user/${userId}/addtodo`, {
//         method: request.method,
//         headers:{
//             'Content-Type':'application/json',
//             'Authorization': "Bearer " + token
//         },
//         body: JSON.stringify(todoData)
//     })

//     const resData =await response.json();
//     if(response.status === 400 || response.status === 500){
//         return resData ;
//     }

//     if(!response.ok){
//         throw json({message: "Can't add task."})
//     }else{
//         return redirect (`/user/${userId}/todos`)
//     }

// }