import React from "react";
import { NavLink, useRouteLoaderData, useSubmit, Link, useParams } from "react-router-dom";
import './Header.css';
import { CiUser } from "react-icons/ci";


const NavItem = ({ title, to }) => {
  
  return (
    <NavLink className="nav-link fs-5" to={to}>
      {title}
    </NavLink>
  );
};

const Header = () => {
  const { token, userName }= useRouteLoaderData('root');
  const params = useParams();
  const submit = useSubmit();
  const userId = params.userId;
  console.log(token)
  console.log(userName)
  
  const logoutHandler = ()=>{
    submit(null, {method:"post", action:'/logout'})
  }

  return (
    <nav className="navbar bg-body-tertiary bg-primary-subtle">
      <div className="container-fluid">
        <a className="navbar-brand fs-1" href="#">ToDo App</a>
        <ul className="nav justify-content-end">

          {userName && 
            
            <li className="nav-item m-2 fs-5 fw-bold text-primary" style={{paddingRight: 50}}>
                <CiUser />
                &nbsp; &nbsp;
              <Link to={`/user/${userId}/todos`} >
                {userName}
              </Link>
            </li> 
          }

            {token? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fs-5">
                    <button onClick={logoutHandler} className="btn btn-outline-primary">Logout</button>
                  </Link>
                </li>
              </>
            ):(
              <>
                <li className="nav-item">
                  <NavItem title="Home" to='/' />
                </li>

                <li className="nav-item">
                  <NavItem title="Register" to='/register' />
                </li>

                <li className="nav-item">
                  <NavItem title="Login" to='/login' />
                </li>
              </>
            )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
