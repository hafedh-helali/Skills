import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { addYears } from "date-fns";
import NavBar from "../navigation/NavBar";

import "../App.css";

export default function AnnualReport(props) {
  return (
    <React.Fragment>
      {renderNavbar()};
      <div>
        <h1>Annual Report</h1>
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
