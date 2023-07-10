import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { addYears } from "date-fns";
import NavBar from "../navigation/NavBar";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "../App.css";

export default function Trainings(props) {
  return (
    <React.Fragment>
      {renderNavbar()}
      {/* <Button variant="primary">Hello</Button> */}
      <div>
        <h1>Formations</h1>
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

function test() {
  return true;
}
