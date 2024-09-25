import React from "react";
import { MdCheckBox } from "react-icons/md";
import { Link, useNavigate, useNavigation, useSubmit } from "react-router-dom";

const TODOS = [
  { id: "t1", title: "project", description: "in progress" },
  { id: "t2", title: "football", description: "playing football" },
  { id: "t3", title: "playstation", description: "playing playstation" },
];

const TodoList = ({ todos }) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const deleteHandler = ()=>{
    const proceed = window.confirm("Are you sure that you want to delete this task.")
    if(proceed){
        submit(null, {method:'delete'})
    }
  } 
  
  return (
    <table className="table table-info w-75 m-auto">
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
                <Link to={`${todo.todoId}/delete`}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ marginLeft: 5 }}
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                </Link>
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
  );
};

export default TodoList;
