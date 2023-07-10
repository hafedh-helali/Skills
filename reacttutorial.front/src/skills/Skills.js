import React, { useEffect, useState } from "react";
import NavBar from "../navigation/NavBar";

import "../App.css";

export default function About(props) {
  return (
    <React.Fragment>
      {renderNavbar()};
      <div>
        <h1>Compétences</h1>
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
