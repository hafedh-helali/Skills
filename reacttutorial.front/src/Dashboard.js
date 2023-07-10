import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { addYears } from "date-fns";
import NavBar from "./navigation/NavBar";
import { FaEdit, FaCheck } from "react-icons/fa";

import "./App.css";

export default function Dashboard() {
  debugger;
  // const [authenticated, setauthenticated] = useState(null);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("authenticated");
  //   if (loggedInUser) {
  //     setauthenticated(loggedInUser);
  //   }
  // }, []);
  debugger;
  let authenticated = true;

  if (!authenticated) {
    debugger;
    return <Navigate replace to="/login" />;
  } else {
    let authenticated = true;
    const date = calculateNextAnnualInterviewDate(
      localStorage.getItem("entrydate")
    );

    function handleEdit() {
      alert("affichage details");
    }
    return (
      <React.Fragment>
        {renderNavbar()}
        {/* <div>
          <h3 className="Auth-form-title">
            {localStorage.getItem("usercode")} {localStorage.getItem("role")}
            {localStorage.getItem("date")}
          </h3>
        </div> */}
        <div class="container">
          <div class="row">
            <div class="col">
              <div className="Dashboard-panel rounded mt-3">
                &nbsp;
                <label className="Dashboard-label">
                  {localStorage.getItem("username")},{" "}
                  {localStorage.getItem("profile")}
                </label>
              </div>
            </div>
            <div class="col">
              <div className="Dashboard-panel rounded mt-3">
                &nbsp;
                <label className="Dashboard-label">
                  Date prochain entretien: {date.toLocaleDateString("fr-FR")}
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div className="Dashboard-panel rounded mt-3">
                <label className="Dashboard-label">
                  &nbsp;Dernier entretien:{" "}
                  {localStorage.getItem("lastinterviewdate")}
                </label>
              </div>
            </div>
            <div class="col">
              <div className="Dashboard-panel rounded mt-3"></div>
            </div>
          </div>
        </div>
        <div>{/* */}</div>
        <hr></hr>
        <div class="container mt-4">
          <label>Entretiens annuels effectués</label>
          <div class="row">
            <div class="col-sm-12">
              <div className="Dashboard-panel rounded mt-3">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date Entretien</th>
                      <th scope="col">Manager</th>
                      <th scope="col">Statut</th>
                      <th scope="col">Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>11/12/2022</td>
                      <td>Manager 1</td>
                      <td>Validé</td>
                      <td>
                        <button onClick={handleEdit}>
                          <FaEdit></FaEdit>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>03/01/2023</td>
                      <td>Manager 2</td>
                      <td>Validé</td>
                      <td>
                        <button onClick={handleEdit}>
                          <FaEdit></FaEdit>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>13/06/2022</td>
                      <td>Manager 2</td>
                      <td>Enregistré</td>
                      <td>
                        <button onClick={handleEdit}>
                          <FaEdit></FaEdit>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function renderNavbar() {
  const authenticated = true;
  if (authenticated) {
    return <NavBar />;
  }
  return <div></div>;
}

function calculateNextAnnualInterviewDate(entryDate) {
  var date = Date.parse(entryDate);
  date = addYears(date, 1);
  return date;
}
