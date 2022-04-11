import * as React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-success mb-5 nav nav-pills justify-content-center p-3">
      <NavLink
        to={"/"}
        className={({ isActive }) => `nav-link ${isActive && "active"}`}
      >
        Home
      </NavLink>
      <NavLink
        to={"/allblogs"}
        className={({ isActive }) => `nav-link ${isActive && "active"}`}
      >
        All Blogs
      </NavLink>
      <NavLink
        to={"/newpost"}
        className={({ isActive }) => `nav-link ${isActive && "active"}`}
      >
        New Post
      </NavLink>
      <NavLink
        to={"/newuser"}
        className={({ isActive }) => `nav-link ${isActive && "active"}`}
      >
        New User
      </NavLink>
    </nav>
  );
};

export default Navbar;