import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IAuthors } from "../types";

const NewPost = () => {
  const [namesList, setNamesList] = useState<Array<IAuthors>>();
  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [authorId, setAuthorId] = useState<any>();

  useEffect(() => {
    fetch(`/api/authors`)
      .then((res) => res.json())
      .then((res) => setNamesList(res));
  }, []);

  let handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  let handleChangePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };
  let handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorId(e.target.value);
  };

  let submitFunc = () => {
    let dataForNewPost = {
      title: title,
      content: post,
      authorid: authorId,
    };
    fetch(`/api/postblog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForNewPost),
    });
  };

  if(!namesList)return <h1>Loading ...</h1>

  return (
    <div className="d-flex justify-content-center">
      <div className="p-3 border border-5 border-info rounded col-lg-10 col-sm-10 col-12">
        <form>
          <div className="m-2 form-group">
            <label>Title:</label>
            <input onChange={handleChangeTitle} className="form-control" />
          </div>
          <div className="m-2 form-group">
            <label>Post:</label>
            <textarea
              onChange={handleChangePost}
              className="form-control"
            ></textarea>
          </div>
          <div className="d-flex align-items-end flex-wrap justify-content-between ">
            <div className="m-2 form-group">
              <label>Name:</label>
              <div className="d-flex">
                <div className="col-4">
                <input onChange={handleChangeName} className="form-control" />
                </div>
                <div className="col-1">
                  <select className="col-1the-dropdown form-select">
                    <option></option>
                    {namesList.map((author) => {
                      return (
                        <option value={author.name} >
                          {author.name}  |  {author.email}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <Link
                to={"/allblogs"}
                onClick={submitFunc}
                type="button"
                className="m-2 btn btn-warning"
              >
                Submit
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="input-group mb-3">
  <div className="input-group-prepend">
    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <a className="dropdown-item" href="#">Something else here</a>
      <div role="separator" className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Separated link</a>
    </div>
  </div>
  <input type="text" className="form-control" aria-label="Text input with dropdown button" />
</div>

<div className="input-group">
  <input type="text" className="form-control" aria-label="Text input with dropdown button" />
  <div className="input-group-append">
    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <a className="dropdown-item" href="#">Something else here</a>
      <div role="separator" className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Separated link</a>
    </div>
  </div>
</div>
    </div>
  );
};

export default NewPost;
