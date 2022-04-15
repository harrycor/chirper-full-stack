import * as React from "react";
import { useEffect, useState } from "react";
import blog from "../../server/db/blog";
import BlogCard from "../components/BlogCard";
import { IBlogs, IBlogsWithAuthors } from "../types";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Array<IBlogsWithAuthors>>(null);

  let getAllBlogs = async () => {
    await fetch("/api/blogs/authors/tags")
      .then((res) => res.json())
      .then((res) => setBlogs(res));
  };

  if (!blogs) {
    getAllBlogs();
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <div>
        <h1>allll blooooooogs</h1>
      </div>
      <div className="blog-div mt-5 d-flex justify-content-evenly flex-wrap">
        {blogs.map((blog) => {
          return <BlogCard key={blog.blogID} {...blog} />;
        })}
      </div>
    </div>
  );
};

export default AllBlogs;
