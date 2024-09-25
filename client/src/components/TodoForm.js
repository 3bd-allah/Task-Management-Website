import React, { useState } from 'react'
import { Form, useParams, useSubmit } from 'react-router-dom'
import classes from './TodoForm.module.css';

const TodoForm = ({method, button}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const submit = useSubmit();

  const userId = params.userId

  const addTodoHandler = ()=>{
    submit({
      title:title,
      description:description
    },
    {
      method:'post',
      action:`/user/${userId}/todos/add`
    }
  )
  // setTitle('')
  // setDescription('')
  }

  return (
    <Form className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
        />
      </p>
      <div>
        <button className='btn btn-outline-primary d-block m-auto col-3' onClick={addTodoHandler}>Add Task</button>
      </div>
    </Form>
  )
}

export default TodoForm