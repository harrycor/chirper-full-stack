import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";

const Navbar = () => {
  // let $navbarGrab = $("#navbar");
  // let sticky = $navbarGrab.offset;
  // window.onscroll = () => {
  //   console.log(sticky)
  // };

  // window.onresize = () => {
  //   if (window.innerWidth < 700) {
  //     return <div></div>;
  //   } else {
  //     console.log(window.innerWidth);
  //   }
  // };

  const [menuIsHidden, setMenuIsHidden] = useState<boolean>(false);

  let handleMenuClick = () => {
    setMenuIsHidden(!menuIsHidden);
  };
  let hideMenu = () => {
    setMenuIsHidden(false)
  }

  return (
    <div>
      <nav
        id="navbar"
        className="bg-success mb-5 nav nav-pills d-flex justify-content-between p-3"
        style={{
          position: "sticky",
          display: "block",
          width: "100%",
          top: "0",
          paddingTop: "60px",
          listStyleType: "none",
          overflow: "hidden",
          zIndex: 9,
        }}
      >
        <div>
          <NavLink
            to={"/"}
            onClick={hideMenu}
            className={({ isActive }) => `nav-link ${isActive && "active"}`}
          >
            🏠Home
          </NavLink>
        </div>
        <div className="">
          <div>
            <button onClick={handleMenuClick} className="btn btn-primary">
              <div
                style={{
                  width: "35px",
                  height: "5px",
                  backgroundColor: "black",
                  margin: "6px 0",
                }}
              ></div>
              <div
                style={{
                  width: "35px",
                  height: "5px",
                  backgroundColor: "black",
                  margin: "6px 0",
                }}
              ></div>
              <div
                style={{
                  width: "35px",
                  height: "5px",
                  backgroundColor: "black",
                  margin: "6px 0",
                }}
              ></div>
            </button>
          </div>
          <div className="">
            {menuIsHidden && (
              <div
                className="d-flex flex-column bg-thesky col-12"
                style={{
                  display: "block",
                  position: "fixed",
                  overflow: "visable",
                  width: "7em",
                  right: "3%"
                }}
              >
                <NavLink
                  to={"/allblogs"}
                  onClick={hideMenu}
                  className={({ isActive }) =>
                    `nav-link ${isActive && "active"}`
                  }
                >
                  All Blogs
                </NavLink>
                <NavLink
                  to={"/newpost"}
                  onClick={hideMenu}
                  className={({ isActive }) =>
                    `nav-link ${isActive && "active"}`
                  }
                >
                  New Post
                </NavLink>
                <NavLink
                  to={"/newuser"}
                  onClick={hideMenu}
                  className={({ isActive }) =>
                    `nav-link ${isActive && "active"}`
                  }
                >
                  New User
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>

    // <nav
    //   id="navbar"
    //   className="bg-success mb-5 nav nav-pills d-flex justify-content-between p-3"
    //   style={{
    //     position: "sticky",
    //     display: "block",
    //     width: "100%",
    //     top: "0",
    //     paddingTop: "60px",
    //     listStyleType: "none",
    //     overflow: "hidden",
    //     zIndex: 9,
    //   }}
    // >
    //   <div>
    //     <NavLink
    //       to={"/"}
    //       className={({ isActive }) => `nav-link ${isActive && "active"}`}
    //     >
    //       Home
    //     </NavLink>
    //   </div>
    //   <div className="d-flex flex-wrap">
    //     <NavLink
    //       to={"/allblogs"}
    //       className={({ isActive }) => `nav-link ${isActive && "active"}`}
    //     >
    //       All Blogs
    //     </NavLink>
    //     <NavLink
    //       to={"/newpost"}
    //       className={({ isActive }) => `nav-link ${isActive && "active"}`}
    //     >
    //       New Post
    //     </NavLink>
    //     <NavLink
    //       to={"/newuser"}
    //       className={({ isActive }) => `nav-link ${isActive && "active"}`}
    //     >
    //       New User
    //     </NavLink>
    //   </div>
    // </nav>
  );
};

export default Navbar;
