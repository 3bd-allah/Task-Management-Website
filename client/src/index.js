import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Root from './routes/Root'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import RegisterPage, {action as registerAction} from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import ProfilePage from './routes/ProfilePage';
import Error from './routes/Error';
import { getAuthToken, logoutLoader} from './util/auth';
import Home from './routes/Home';
const router = createBrowserRouter([
  { path: '/', element: <Root/>,
    errorElement: <Error />,
    children:[
      { index: true, element: <Home/>, loader: getAuthToken },
      { path:'register', element: <RegisterPage />, action: registerAction},
      { path: 'login', element: <LoginPage/> },
      { path:'logout', loader: logoutLoader},
      {
        path:'user/:userId',
        id:"user-todos",
        loader:()=>{}, // get all todos based on user id 
        children:[
          { path:'todos', element: <ProfilePage />}
        ]
      }
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
