import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import blog from "../../server/db/blog";
import { IBlogs, IBlogsWithAuthors } from "../types";

const BlogCard = (blogInfo: IBlogsWithAuthors) => {

  let navTo = useNavigate();
  
  let description = () => {
    navTo(`/blog/description/${blogInfo.blogID}`)
  }
  
  if (blogInfo.tag !== null) {
    return (
      <div  className="bg-purps text-light mb-5 m-2 card col-xl-2 col-lg-2 col-md-5 col-9">
        <div onClick={description}>
        <h1 className="card-tite">{blogInfo.blogTitle}</h1>
        <h3 className="text-success">{blogInfo.tag}</h3>
        <p className="card-text">{blogInfo.content.substring(0, 10)}...</p>
        <p className="card-text">~{blogInfo.name}</p>
        </div>
        <div>
          <Link
            to={`/edit/blog/${blogInfo.blogID}`}
            className="btn btn-thesky"
          >
            Edit
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-purps text-light mb-5 m-2 card col-xl-2 col-lg-2 col-md-5 col-9">
        <div onClick={description}>
        <h1 className="card-tite">{blogInfo.blogTitle}</h1>
        <p className="card-text">{blogInfo.content.substring(0, 10)}...</p>
        <p className="card-text">~{blogInfo.name}</p>
        </div>
        <div>
          <Link
            to={`/edit/blog/${blogInfo.blogID}`}
            className="btn btn-thesky"
          >
            Edit
          </Link>
        </div>
      </div>
    );
  }
};

export default BlogCard;
