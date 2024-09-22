import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { useRouteLoaderData } from 'react-router'


// 
const ProfilePage = () => {
  const todos = useRouteLoaderData("user-todos");
  return(
    <>
      <TodoForm />
      <TodoList todos={todos}/>
    </>
  )
}
export default ProfilePage