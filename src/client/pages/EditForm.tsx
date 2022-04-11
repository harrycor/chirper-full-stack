import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteBlog } from "../../server/db/blog";
import { IBlogsWithAuthors } from "../types";

const EditForm = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Array<IBlogsWithAuthors>>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  let getBlog = async () => {
    await fetch(`/api/singleblogandauthor/${id}`)
      .then((res) => res.json())
      .then((res) => setBlog(res));
  };
  useEffect(() => {
    if (!blog) {
      return;
    } else {
      setNewTitle(blog[0].blogTitle);
      setNewMessage(blog[0].content);
    }
  }, [blog]);

  let updatePost = () => {
    let dataForPut = {
      title: newTitle,
      content: newMessage,
      id: blog[0].blogID,
    };
    fetch("/api/update/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForPut),
    });
  };

  let deleteBlog = () => {
    fetch(`/api/delete/blog/${id}`, {
      method: "DELETE",
    });
  };

  let handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  let handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  if (!blog) {
    getBlog();
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="d-flex justify-content-center">
      {blog.map((blog) => {
        return (
          <div
            className="p-3 border border-5 border-lightblue rounded col-lg-10 col-sm-10 col-12"
            key={blog.blogID}
          >
            <form>
              <div className="m-2 form-group">
                <label>Blog Title:</label>
                <input
                  onChange={handleChangeTitle}
                  className="form-control"
                  defaultValue={blog.blogTitle}
                />
              </div>
              <div className="m-2 form-group">
                <label>Edit Post:</label>
                <textarea
                  onChange={handleChangeMessage}
                  className="form-control"
                  defaultValue={blog.content}
                ></textarea>
              </div>
              <div className="d-flex flex-wrap justify-content-between ">
                <Link
                  to={"/allblogs"}
                  onClick={updatePost}
                  type="button"
                  className="m-2 btn btn-primary"
                >
                  Submit
                </Link>
                <Link
                  to={"/allblogs"}
                  onClick={deleteBlog}
                  type="button"
                  className="m-2 btn btn-danger"
                >
                  Delete
                </Link>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default EditForm;
