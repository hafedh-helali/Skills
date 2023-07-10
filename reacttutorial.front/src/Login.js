import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function Login(props) {
  const navigate = useNavigate();
  const [usercode, setusercode] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState();

  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const users = [
    {
      usercode: "mgr1",
      username: "manager m1",
      password: "pwd",
      profile: "Manager BU Web",
      entrydate: "11/04/2001",
      lastinterviewdate: "13/04/2023",
    },
    {
      usercode: "mgr2",
      password: "pwd",
      username: "manager m2",
      profile: "Manager BU .Net",
      entrydate: "24/11/2001",
      lastinterviewdate: "01/06/2023",
    },
    {
      usercode: "consultant1",
      password: "pwd",
      username: "consultant c1",
      profile: "Consultant",
      entrydate: "01/06/2014",
      lastinterviewdate: "01/06/2023",
    },
    {
      usercode: "consultant2",
      password: "pwd",
      username: "consultant c2",
      profile: "Consultant",
      entrydate: "05/03/2022",
      lastinterviewdate: "05/03/2023",
    },
    {
      usercode: "rh1",
      password: "pwd",
      username: "Human Resources 1",
      profile: "Ressources Humaines",
      entrydate: "05/03/2022",
      lastinterviewdate: "05/03/2023",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const account = users.find((user) => user.usercode === usercode);
    if (account && account.password === password) {
      localStorage.setItem("authenticated", true);
      localStorage.setItem("usercode", usercode);
      localStorage.setItem("username", account.username);
      localStorage.setItem("profile", account.profile);
      localStorage.setItem("entrydate", account.entrydate);
      localStorage.setItem("lastinterviewdate", account.lastinterviewdate);
      navigate("/dashboard");
    } else {
      setError("Login ou mot de passe erroné");
    }
  };
  return (
    <div className="Auth-form-container" onSubmit={handleSubmit}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          {/* <h3 className="Auth-form-title">Connect</h3> */}
          <div className="form-group mt-3">
            <label>Code utilisateur</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Saisir le code"
              name="usercode"
              value={usercode}
              onChange={(e) => setusercode(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Saisir le mot de passe"
              name="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>

          <div>
            {error ? <label className="error-label">{error}</label> : null}
          </div>
          {/* <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
}
