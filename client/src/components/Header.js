import React, { useState } from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";

let NavItems = [
  { title: "Home", to: "/" },
  { title: "Register", to: "/register" },
  { title: "Login", to: "/login" },
];

const NavItem = ({ title, to }) => {
  
  return (
    <NavLink className="nav-link fs-5" to={to}>
      {title}
    </NavLink>
  );
};

const Header = () => {
  // const token = useLoaderData();
  // if(token){
  //   NavItems = [
  //     { title: "Profile", to: "/" },
  //     { title: "logout", to: "/logout" },
  //   ]
  // }else{
  //   NavItems = [
  //     { title: "Register", to: "/register" },
  //     { title: "Login", to: "/login" },
  //   ]
  // }
  return (
    <nav className="navbar bg-body-tertiary bg-primary-subtle">
      <div className="container-fluid">
        <a className="navbar-brand fs-1" href="#">ToDo App</a>
        <ul className="nav justify-content-end">
          {NavItems.map((link) => (
            <li key={link.title} className="nav-item">
              <NavItem title={link.title} to={link.to} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
