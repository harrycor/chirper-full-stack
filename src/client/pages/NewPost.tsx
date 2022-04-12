import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { IAuthors } from "../types";

const NewPost = () => {
  const [namesList, setNamesList] = useState<Array<IAuthors>>();
  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const navTo = useNavigate();

  useEffect(() => {
    fetch(`/api/authors`)
      .then((res) => res.json())
      .then((res) => {
        setNamesList(res);
      });
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

  let handleDropdownClick = (e: any) => {
    let dropdownAuthor = e.target.value;
    let $nameBox = $("#name-box");
    setAuthorId(dropdownAuthor);
    $nameBox.val(dropdownAuthor);
  };

  let submitFunc = () => {
    if (!title) return alert("Give that shit a title!");
    if (!post)
      return alert("If you don't have anything to say ... why are you here?");
    if (!authorId) return alert("You didnt enter your name dummy!");
    else {
      fetch(`/api/check/authors/${authorId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res[0]) {
            let dataForNewPost = {
              title: title,
              content: post,
              authorid: res[0].id,
            };
            fetch(`/api/postblog`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataForNewPost),
            });
            alert("Your bullshit has been added to the message board!")
            navTo("/allblogs");
          } else {
            alert("hmm loks like you need to make an account!");
            navTo("/newuser");
          }
        });
    }
  };

  if (!namesList) return <h1>Loading ...</h1>;

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
              <div className="d-flex flex-wrap">
                <div className="col-sm-4 col-12">
                  <input
                    onChange={handleChangeName}
                    className="form-control"
                    id="name-box"
                  />
                </div>
                <div className="col-1">
                  <select className="col-1 the-dropdown form-select">
                    <option></option>
                    {namesList.map((author) => {
                      return (
                        //get this dropdown button shit working fucking PITA!
                        <option
                          onClick={handleDropdownClick}
                          key={author.id}
                          value={author.name}
                        >
                          {author.name} | {author.email}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={submitFunc}
                type="button"
                className="m-2 btn btn-warning"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
