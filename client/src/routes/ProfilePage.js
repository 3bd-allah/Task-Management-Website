import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { json, useLoaderData, useRouteLoaderData } from 'react-router'
import { getAuthToken } from '../util/auth'


// 
const ProfilePage = () => {
  // const todos = useRouteLoaderData("user-todos");
  const todos = useLoaderData();
  return(
    <>
      <TodoForm />
      <TodoList todos={todos}/>
    </>
  )
}
export default ProfilePage;


export const loader = async ({request, params})=>{

  console.log(params)
  const userId = params.userId;

  const token = getAuthToken();
  const response = await fetch(`http://localhost:5150/user/${userId}/todos`,{
    method:'GET',
    headers:{
      'Authorization': "Bearer " + token
    }
  })

  if(!response.ok){
    throw json({message:"can't fetch tasks"},{status:500, statusText:"Internal server error!"})
  }

  const resData = await response.json();
  
  // response should return with list of  todos
  return resData;

}