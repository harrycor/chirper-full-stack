import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import $ from "jquery";
import { allBlogTags, deleteBlog } from "../../server/db/blog";
import { IAllTagsNames, IBlogsWithAuthors } from "../types";

const EditForm = () => {
  const navTo = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState<Array<IBlogsWithAuthors>>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [newTag, setNewTag] = useState<string>("");
  const [tagList, setTagList] = useState<Array<IAllTagsNames>>();
  const [isHiddenTag, setIsHiddenTags] = useState<boolean>(true);
  let tagID: number;

  let getBlog = async () => {
    await fetch(`/api/singleblogandauthor/${id}`)
      .then((res) => res.json())
      .then((res) => setBlog(res))
      .then(() => {
        fetch(`/api/alltags`)
          .then((res) => res.json())
          .then((res) => setTagList(res));
      });
  };
  useEffect(() => {
    if (!blog) {
      return;
    } else {
      setNewTitle(blog[0].blogTitle);
      setNewMessage(blog[0].content);
      setNewTag(blog[0].tag);
    }
  }, [blog]);

  let updatePost = () => {
    if (!newTitle) {
      return alert(`${blog[0].name}, what is your title for this blog post?`);
    }
    if (!newMessage) {
      return alert(`if you dont like your comment, delete it ${blog[0].name}!`);
    }
    let dataForPut = {
      title: newTitle,
      content: newMessage,
      id: blog[0].blogID,
    };
    fetch("/api/update/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForPut),
    }).then(() => updateTag());
  };

  let updateTag = () => {
    if (blog[0].tag !== null) {
      fetch(`/api/delete/blogtag/${blog[0].blogID}/${blog[0].tagID}`, {
        method: "DELETE",
      });
    }
    if (newTag === null || newTag === "") {
      alert(`Okay, ${blog[0].name}, your post has been updated!`);
      navTo("/allblogs");
    } else {
      fetch(`/api/gettag/${newTag}`)
        .then((res) => res.json())
        .then((res) => {
          if (res[0]) {
            tagID = res[0].id;
            fetch(`/api/postblogtag/${blog[0].blogID}/${tagID}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }).then((res) => {
              alert(`Okay, ${blog[0].name}, your post has been updated!`);
              navTo("/allblogs");
            });
          } else {
            fetch(`/api/post/newtag/${newTag}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then((resNum) => {
                fetch(`/api/postblogtag/${blog[0].blogID}/${resNum}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                }).then((res) => {
                  alert(`Okay, ${blog[0].name}, your post has been updated!`);
                  navTo("/allblogs");
                });
              });
          }
        });
    }
  };

  let deleteBlog = () => {
    fetch(`/api/delete/blog/${id}`, {
      method: "DELETE",
    }).then(() =>
      alert(`${blog[0].name}, you delete your post about, ${blog[0].blogTitle}`)
    );
  };

  let handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  let handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };
  let newTageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };
  let handleDropdownTags = (e: any) => {
    let tagSelection = e.target.value;
    let $tagBox = $("#tag-box");
    setNewTag(tagSelection);
    $tagBox.val(tagSelection);
    unHideTags();
  };
  let unHideTags = () => {
    setIsHiddenTags(!isHiddenTag);
  };

  if (!blog || !tagList) {
    getBlog();
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="d-flex justify-content-center">
      {blog.map((blog) => {
        return (
          <div
            className="p-3 border border-5 border-thesky rounded col-lg-10 col-sm-10 col-12"
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
              <div className="d-flex flex-wrap justify-content-between align-items-center m-2">
                <div className="d-flex flex-wrap ">
                  <label className="col-10">#:</label>
                  <div className="col-sm11">
                    <input
                      id="tag-box"
                      className="col-12 col-sm-12 form-control"
                      onChange={newTageChange}
                      defaultValue={blog.tag}
                    />
                    {isHiddenTag === false && (
                      <div
                        className="col-xxl-1 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-9 "
                        style={{
                          // display: "block",
                          position: "absolute",
                        }}
                      >
                        <select className=" form-select" size={3}>
                          {tagList.map((tag) => {
                            return (
                              <option
                                key={tag.id}
                                onClick={handleDropdownTags}
                                value={tag.name}
                              >
                                {tag.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      className="btn btn-purps"
                      onClick={unHideTags}
                      type="button"
                    >
                      v
                    </button>
                  </div>
                </div>
                <div className="d-flex align-center-end flex-wrap">
                  <button
                    onClick={updatePost}
                    type="button"
                    className="m-2 btn btn-primary"
                  >
                    Submit
                  </button>
                  <Link
                    to={"/allblogs"}
                    onClick={deleteBlog}
                    type="button"
                    className="m-2 btn btn-danger"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default EditForm;
