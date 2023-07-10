import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { addYears } from "date-fns";
import NavBar from "../navigation/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { variables } from "../Variables";

export default function About(props) {
  return (
    <React.Fragment>
      {renderNavbar()};
      <div>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="Dashboard-panel rounded mt-4 d-flex justify-content-center">
            <div>
              &nbsp;
              <h3>Gestion de compétences </h3>
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <label className="mt-4">Version: {variables.VERSION}</label>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function renderNavbar() {
  const authenticated = true;
  if (authenticated) {
    return <NavBar />;
  }
  return <div></div>;
}
