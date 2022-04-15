import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AllBlogs from "./pages/AllBlogs";
import BlogDescription from "./pages/BlogDescription";
import EditForm from "./pages/EditForm";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import NewUser from "./pages/NewUser";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/blog/description/:id" element={<BlogDescription />} />
        <Route path="/edit/blog/:id" element={<EditForm />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/newuser" element={<NewUser />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
