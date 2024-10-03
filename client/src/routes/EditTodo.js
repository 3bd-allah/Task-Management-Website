import React from 'react'
import TodoForm from '../components/TodoForm';
import { useRouteLoaderData, json} from 'react-router';
import { getAuthToken } from '../util/auth';

const EditTodoPage = () => {

  const todo = useRouteLoaderData('single-todo');
  return <TodoForm todo={todo} method="PUT" button="Save Changes"/>
}

export default EditTodoPage;

export const singleTodoLoader = async({request, params}) => {

    const todoId = params.todoId;
  
    const token = getAuthToken();
    const response = await fetch(`http://localhost:5150/todo/${todoId}`,{
      headers:{
        'Authorization': 'Bearer '+ token
      }
    })
  
    const resData = await response.json();

    if(response.status === 400 || response.status === 500){
      return resData;
    }
  
    if(!response.ok){
      throw json({message:"Todo not found"},{status: 500, statusText:"Internal server error"})
    }else{
      // todo details will be returned
      return resData;
    }
}