import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IBlogsWithAuthors } from "../types";

const BlogDescription = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Array<IBlogsWithAuthors>>(null);

  useEffect(() => {
    fetch(`/api/singleblogandauthor/${id}`)
      .then((res) => res.json())
      .then((res) => setBlog(res));
  }, []);

  if (!blog) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      <div className="d-flex justify-content-center col-12">
        <div className="card col-sm-10 col-11 d-flex justify-content-center">
          <div className="bg-thesky d-flex justify-content-center flex-wrap">
            <h1 className="pt-2 text-purps card-title text-center col-12">
              {blog[0].blogTitle}
            </h1>
            <p className="pb-2 text-success card-sub-title text-center col-12">
              {blog[0].tag}
            </p>
          </div>
          <div className="bg-dark d-flex justify-content-center flex-wrap">
            <hr />
            <p className="text-light pt-5 pb-5 card-text col-11">
              {blog[0].content}
            </p>
            <h5 className="text-light pb-2 card-title col-11 text-end">
              {" "}
              ~ {blog[0].name}
            </h5>
          </div>
        </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Link to={"/allblogs"} className="btn btn-purps col-12">
            Back to Blogs
          </Link>
        </div>
     
    </div>
  );
};

export default BlogDescription;
