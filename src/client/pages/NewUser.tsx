import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewUser = () => {
  let [name, setName] = useState<string>("");
  let [email, setEmail] = useState<string>("");
  const navTo = useNavigate();

  let handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  let handleChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  let submitFunc = () => {
    if (!name) return alert("Wuts yer name bra..");
    if (!email) return alert("Emails suck. Make one up!");
    else {
      fetch(`/api/check/authors/${name}`)
        .then((res) => res.json())
        .then((res) => {
          if (res[0] && res[0].name === name && res[0].email === email) {
            return alert(
              `Great news ${name}! your already a VIP here! Talk Shit on the message board!`
            );
          } else {
            let dataForNewAuthor = {
              name: name,
              email: email,
            };
            fetch(`/api/post/author`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataForNewAuthor),
            });
          }
        });
        alert("Okay, I've got your deets .. time to hack ya!")
        alert("sucker")
        navTo('/newpost')
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="p-3 border border-5 border-info rounded col-lg-5 col-sm-5 col-12">
        <form>
          <div className="m-2 form-group">
            <label>Name:</label>
            <input onChange={handleChangeTitle} className="form-control" />
          </div>
          <div className="m-2 form-group">
            <label>Email:</label>
            <input onChange={handleChangePost} className="form-control"></input>
          </div>
          <div className="d-flex align-items-end flex-wrap justify-content-between ">
            <div>
              <button
                // to={"/newpost"}
                onClick={submitFunc}
                type="button"
                className="m-2 btn btn-purple"
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

export default NewUser;
