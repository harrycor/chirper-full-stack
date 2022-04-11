import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewUser = () => {
  let [name, setName] = useState<string>("");
  let [email, setEmail] = useState<string>("");

  let handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  let handleChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  let submitFunc = () => {
    let dataForNewAuthor = {
      name: name,
      email: email,
    };
    fetch(`/api/post/author`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForNewAuthor),
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="p-3 border border-5 border-info rounded col-lg-5 col-sm-5 col-6">
        <form>
          <div className="m-2 form-group">
            <label>Name:</label>
            <input onChange={handleChangeTitle} className="form-control" />
          </div>
          <div className="m-2 form-group">
            <label>Email:</label>
            <input
              onChange={handleChangePost}
              className="form-control"
            ></input>
          </div>
          <div className="d-flex align-items-end flex-wrap justify-content-between ">
            <div>
              <Link
                to={"/newpost"}
                onClick={submitFunc}
                type="button"
                className="m-2 btn btn-purple"
              >
                Submit
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
