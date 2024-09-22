import React from 'react'
import { Form } from 'react-router-dom'
import classes from './TodoForm.module.css';
const TodoForm = () => {
  return (
    <Form  className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          required
        />
      </p>
      <div>
        <button className='btn btn-outline-primary d-block m-auto col-3'>Add Task</button>
      </div>
    </Form>
  )
}

export default TodoForm