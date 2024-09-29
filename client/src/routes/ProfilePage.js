import React from 'react'
import TodoList from '../components/TodoList'
import { json, useLoaderData } from 'react-router'
import { getAuthToken, getUserId } from '../util/auth'


 
const ProfilePage = () => {

  const todos = useLoaderData();
  
  return <TodoList todos={todos}/>

}
export default ProfilePage;


export const todosLoader = async ({request, params})=>{

  const token = getAuthToken();
  const userId = getUserId();
  const response = await fetch(`http://localhost:5150/user/${userId}/todos`,{
    method:'GET',
    headers:{
      'Authorization': "Bearer " + token
    }
  })
  const resData = await response.json();
  
  if(!response.ok){
    throw json({message:"can't fetch tasks"},{status:500, statusText:"Internal server error!"})
  }

  // response should return with list of  todos
  return resData;

}