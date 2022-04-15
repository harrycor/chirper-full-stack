import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { IAllTagsNames, IAuthors } from "../types";
import { isConditionalExpression } from "typescript";

const NewPost = () => {
  //use component for stuff b/c ... yikes this got out of hand
  const [namesList, setNamesList] = useState<Array<IAuthors>>();
  const [tagList, setTagList] = useState<Array<IAllTagsNames>>();
  const [tagSuggestions, setTagSuggestions] = useState<Array<string>>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHiddenName, setIsHiddenName] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tagId, setTagId] = useState<number>(null);
  const [lastInsterId, setLastInsertIdBlog] = useState<number>(null);
  let lastInsertIDBlogPostVar: number;
  let tagIDVar: number;
  const navTo = useNavigate();

  useEffect(() => {
    fetch(`/api/authors`)
      .then((res) => res.json())
      .then((res) => {
        setNamesList(res);
      });
    fetch(`/api/alltags`)
      .then((res) => res.json())
      .then((res) => setTagList(res));
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
  let handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setTag(inputValue);
    let tagListVar: Array<string> = [];
    if (inputValue.length > 0) {
      let regex = new RegExp(`^${inputValue}`, "i");
      tagList.map((tag) => {
        tagListVar.push(tag.name);
      });
      let suggestions = tagListVar.sort().filter((v) => regex.test(v));
      setTagSuggestions(suggestions);
      console.log(suggestions);
    }else{setTagSuggestions([])}
  };
  let renderTagSugg = () => {
    // let { suggestions } = suggestions
    if (tagSuggestions.length === 0) {
      return (
        <div></div>
      );
    }else if( tagSuggestions.length === 1){
      return(
        <ul style={{
          display: "block",
          position: "absolute"
        }}>
          <div className="bg-light p-2" >
          {tagSuggestions.map((sug) => {
            return (
                <option onClick={handleDropdownTagsTwo} value={sug}>
                  {sug}
                </option>
                );
  
              })}
              </div>
        </ul>
      )
    }else if ( tagSuggestions.length ===2){
      return(
        <ul style={{
          display: "block",
          position: "absolute"
        }}>
          <select className="form-select" size={2}>
          {tagSuggestions.map((sug) => {
            return (
                <option onClick={handleDropdownTagsTwo} value={sug}>
                  {sug}
                </option>
                );
  
              })}
              </select>
        </ul>
      )
    }else{
    return (
      <ul style={{
        display: "block",
        position: "absolute"
      }}>
        <select className="form-select" size={3}>
        {tagSuggestions.map((sug) => {
          return (
              <option onClick={handleDropdownTagsTwo} value={sug}>
                {sug}
              </option>
              );

            })}
            </select>
      </ul>
    );}
  };

  let handleDropdownClick = (e: any) => {
    let dropdownAuthor = e.target.value;
    let $nameBox = $("#name-box");
    setAuthorId(dropdownAuthor);
    $nameBox.val(dropdownAuthor);
    unhideName();
  };

  let handleDropdownTagsTwo =(e: any) => {
    let tagSelection = e.target.value;
    let $tagBox = $("#tag-box");
    setTag(tagSelection);
    $tagBox.val(tagSelection);
    setTagSuggestions([])
  }
  let handleDropdownTags = (e: any) => {
    let tagSelection = e.target.value;
    let $tagBox = $("#tag-box");
    setTag(tagSelection);
    $tagBox.val(tagSelection);
    setTagSuggestions([])
    unhideTags();
  };
  let unhideTags = () => {
    setIsHidden(!isHidden);
    console.log(isHidden);
  };
  let unhideName = () => {
    setIsHiddenName(!isHiddenName);
  };

  let submitFunc = () => {
    if (!title) return alert("Give that shit a title dog!"); //makes sure everything is filled out
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
            })
              .then((res) => res.json())
              .then((res) => (lastInsertIDBlogPostVar = res));

            if (tag) {
              //checks for tag
              fetch(`/api/gettag/${tag}`)
                .then((res) => res.json())
                .then((res) => {
                  if (res[0]) {
                    tagIDVar = res[0].id;
                    fetch(
                      `/api/postblogtag/${lastInsertIDBlogPostVar}/${tagIDVar}`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                      }
                    ).then((res) => {
                      alert(
                        "Your bullshit has been added to the message board!"
                      );
                      navTo("/allblogs");
                    });
                  } else {
                    fetch(`/api/post/newtag/${tag}`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      // .then(res => console.log('4'))
                      .then((resNum) => {
                        console.log("44");
                        fetch(
                          `/api/postblogtag/${lastInsertIDBlogPostVar}/${resNum}`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                          }
                        ).then((res) => {
                          alert(
                            "Your bullshit has been added to the message board!"
                          );
                          navTo("/allblogs");
                        });
                      })
                      .then((res) => console.log("2"));
                  }
                })
                .then((res) => console.log("3"));
            } else {
              console.log("nulled");
            }
          } else {
            alert("hmm loks like you need to make an account!");
            navTo("/newuser");
          }
        });
    }
  };

  let toBlog = () => {};

  if (!namesList || !tagList) return <h1>Loading ...</h1>;

  return (
    <div className="d-flex justify-content-center">
      <img
        src="https://www.moriareviews.com/rongulator/wp-content/uploads/Austin-Powers-International-Man-of-Mystery-1997-4.jpg"
        style={{
          // backgroundImage: "url('')",
          display: "block",
          position: "fixed",
          // backgroundSize: '90% 90%' ,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          height: "60%",
          // width: "100%",
          // padding: "5%",
          zIndex: -1,
        }}
      />
      <div className="p-3 mt-5 border border-5 border-info rounded col-xxl-4 col-lg-5 col-md-9 col-sm-9 col-12">
        <form>
          <div className="m-2 form-group">
            <label className="text-danger">Title:</label>
            <input onChange={handleChangeTitle} className="form-control" />
          </div>
          <div className="m-2 form-group">
            <label className="text-danger">Post:</label>
            <textarea
              onChange={handleChangePost}
              className="form-control"
            ></textarea>
          </div>
          <div className="d-flex align-items-end flex-wrap justify-content-between ">
            <div className="m-2 form-group">
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="col-sm-3 col-12 d-flex flex-wrap">
                  <label className="col-12 text-danger">Name:</label>
                  <div className="col-sm-11">
                    <input
                      onChange={handleChangeName}
                      className="form-control"
                      id="name-box"
                    />
                    {isHiddenName === false && (
                      <div
                        className="col-xxl-1 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-9 "
                        style={{
                          // display: "block",
                          position: "absolute",
                        }}
                      >
                        <select className=" form-select" size={3}>
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
                    )}
                  </div>

                  <div className="col-1">
                    <button
                      className="btn btn-thesky"
                      onClick={unhideName}
                      type="button"
                    >
                      v
                    </button>
                  </div>
                </div>

                <div className="col-sm-3 col-12 d-flex flex-wrap">
                  <label className="col-sm-3 col-12 text-danger">#:</label>
                  <div className="col-sm-11">
                    <input
                      onChange={handleChangeTag}
                      className="form-control"
                      id="tag-box"
                    />
                    {renderTagSugg()}
                    {isHidden === false && (
                      <div
                        className="col-xxl-1 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-9 "
                        style={{
                          // display: "block",
                          position: "absolute",
                        }}
                      >
                        <select className="form-select" size={3}>
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
                  <div className="col-1">
                    <button
                      className="btn btn-thesky"
                      onClick={unhideTags}
                      type="button"
                    >
                      v
                    </button>
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
