import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import RegisterPage, {action as registerAction} from './routes/RegisterPage';
import LoginPage, {action as loginAction} from './routes/LoginPage';
import ProfilePage, { todosLoader } from './routes/ProfilePage';
import Error from './routes/Error';
import { checkAuthLoader, getAuthToken, authUserLoader } from './util/auth';
import Home from './routes/Home';
import { logoutAction } from './routes/Logout';
import AddTodoPage, { action as addTodoAction } from './routes/AddTodo';
import { action as deleteAction } from'./routes/DeleteTodo';
import EditTodoPage, { singleTodoLoader } from './routes/EditTodo';
import { action as manipulateTodoAction } from './components/TodoForm';
import { action as updateTodoStatusAction } from './routes/UpdateTodoStatus'
const router = createBrowserRouter([
  { 
    path: '/',
    element: <Root/>,
    errorElement: <Error />,
    id:'root',
    loader: authUserLoader,
    children:[
      { index: true, element: <Home/>, loader: getAuthToken },
      { path:'register', element: <RegisterPage />, action: registerAction},
      { path: 'login', element: <LoginPage/>, action: loginAction },
      { path:'logout', action: logoutAction},
      {
        path:'user/:userId/todos',
        id:"user-todos",
        loader: checkAuthLoader,
        children:[
          { index:true, element: <ProfilePage />, loader: todosLoader},
          { path:'add', element: <AddTodoPage />, action: manipulateTodoAction },
          { 
            path: ':todoId',
            id:'single-todo',
            loader: singleTodoLoader,
            children:[
              { index:true, path:'edit', element: <EditTodoPage />, action: manipulateTodoAction },
              { path: 'delete', action: deleteAction }
            ]
          },

        ]
      }, 
      { path:'update/status/:todoId', action: updateTodoStatusAction }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
