import React from 'react'
import { Form, json, Link, redirect, useActionData, useNavigation, useParams } from 'react-router-dom'
import classes from './TodoForm.module.css';
import { getAuthToken, getUserId } from '../util/auth';

const TodoForm = ({method, button, todo}) => {
  const params = useParams();
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log(data)
  return (

    <Form method={method} className={classes.form}>
      
      {/* Title */}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={todo? todo.title : ''}
          required
        />
      </p>

      {/* Description  */}
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          defaultValue={todo? todo.description : ''}
          required
        />
      </p>
      
      {/* Errors validation */}
      { 
        data && data.detail && 
        <ul>
          {data.detail.split(" | ").map(errMessage => <li key={errMessage} className='text-danger'>{errMessage}</li>)}
        </ul>
      }
      {
        data && data.errors && 
        <ul>
          {Object.values(data.errors).map(err => <li key={err} className='text-danger'>{err}</li>)}
        </ul>
      }
      <div className='container text-center'>
        <div className='row justify-content-end'>
          <div className='col-4 '>
            <Link to={`/user/${params.userId}/todos`}>
              <button className='btn btn-secondary w-100'> Cancel </button>
            </Link>
          </div>
          <div className='col-4'>
            <button className='btn btn-outline-primary w-100' disabled={isSubmitting}> 
              {
                isSubmitting? (
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ):
                button  
              }
            </button>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default TodoForm

export const action = async ({ request, params })=>{

  const formData = await request.formData();

  const todoData = {
    title: formData.get('title'),
    description: formData.get('description')
  }

  const userId = getUserId();
  let url = `http://localhost:5150/user/${userId}/addtodo`;

  if(request.method === "PUT"){
    const todoId= params.todoId;
    url = `http://localhost:5150/update/todo/${todoId}`
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method:request.method,
    headers:{
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ token
    },
    body: JSON.stringify(todoData)
  })

  
  if(response.status === 400 || response.status === 500 ){
    const resData = await response.json();
    return resData ;
  }

  if(!response.ok){
    throw json({message: "Can't add or update task"}, {statusText:"Internal server error!"})
  }else{
    return redirect(`/user/${userId}/todos`);
  }

}
