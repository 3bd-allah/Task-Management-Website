import React from "react";
import { Link, useNavigation, useSubmit } from "react-router-dom";
import { getUserId } from "../util/auth";


const TodoList = ({ todos }) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const updateStatusHandler = (todoStatus, todoId)=>{
    submit({status: todoStatus },{method:"PUT", action:`/update/status/${todoId}`})
  }

  const deleteHandler = (todoId)=>{
    const proceed = window.confirm("Are you sure that you want to delete this task.")
    if(proceed){
      const userId = getUserId();
      submit(null, {method:'delete', action: `/user/${userId}/todos/${todoId}/delete`})
    }
  }
  
  return (
    <div className="container col justify-content-center">
      <h1 className="m-2">Tasks</h1>
      <div className='m-3'>
        <Link to='add' >
          <button className='btn btn-outline-primary '>Add New Task</button>
        </Link>
      </div>
      <table className="table table-info ">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>STATUS</th>
            <th className="text-center">HANDLE</th>
          </tr>
        </thead>
        {todos.length !== 0 ? (
          <tbody>
            {todos.map((todo,index) => (
              <tr key={index}>

                {/* title */}
                <td className={todo.completed ? "text-decoration-line-through" : undefined }>
                  {todo.title}
                </td>

                {/* description */}
                <td className={todo.completed ? "text-decoration-line-through" : undefined }>
                  {todo.description}
                </td>

                {/* status */}
                <td>
                    <label>
                      <input
                        id="status"
                        name="status"
                        type="checkbox"
                        onChange={(e)=> updateStatusHandler(e.target.checked, todo.todoId)}
                        defaultChecked={todo.completed ? true: false}
                        />
                        &nbsp; Completed
                    </label>
                </td>

                {/* handle */}
                <td className="text-center">
                  {/* edit */}
                  <Link to={`${todo.todoId}/edit`}>
                    <button className="btn btn-outline-secondary"> Edit </button>
                  </Link>
                  {/* delete */}
                  <button
                    className="btn btn-outline-danger"
                    style={{ marginLeft: 5 }}
                    onClick={() => deleteHandler(todo.todoId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tr>
            <td colSpan={4} className="text-center fs-4">
              {isLoading ? "Loading...." : "No Tasks added yet"}
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default TodoList;
