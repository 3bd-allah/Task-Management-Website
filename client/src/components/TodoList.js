import React from "react";
import { MdCheckBox } from "react-icons/md";
import { Link, useNavigate, useNavigation, useParams, useSubmit } from "react-router-dom";
import { getUserId } from "../util/auth";


const TodoList = ({ todos }) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const deleteHandler = (todoId)=>{
    const proceed = window.confirm("Are you sure that you want to delete this task.")
    if(proceed){
      const userId = getUserId();
      submit(null, {method:'delete', action: `/user/${userId}/todos/${todoId}/delete`})
    }
  } 
  
  return (
    <div className="container col justify-content-center">
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
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className={todo.completed && "text-decoration-line-through"}>
                  {todo.title}
                </td>
                <td>{todo.description}</td>
                <td>
                  <label>
                    <input
                      id="status"
                      name="status"
                      type="checkbox"
                      checked={todo.completed}
                    />
                    &nbsp; Completed
                  </label>
                </td>
                <td className="text-center">
                  <Link to={`${todo.todoId}/edit`}>
                    <button className="btn btn-outline-secondary"> Edit </button>
                  </Link>
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
