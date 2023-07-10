import React, { useEffect, useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

export default function NavBar() {
  return (
    <React.Fragment>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/dashboard" className="btn btn-primary font-weight-bold">
            Tableau de bord
          </NavLink>
          <NavLink
            to="/annualinterviews"
            className="btn btn-primary font-weight-bold"
          >
            Entretiens Annuels
          </NavLink>
          <NavLink to="/trainings" className="btn btn-primary font-weight-bold">
            Formations
          </NavLink>
          <NavLink to="/trainings" className="btn btn-primary font-weight-bold">
            Administration
          </NavLink>
          {/*<NavLink to="/skills" className="btn btn-primary font-weight-bold">
            Compétences
          </NavLink>
           <NavLink
            to="/interviews"
            className="btn btn-primary font-weight-bold"
          >
            Entretiens
          </NavLink> */}

          <NavLink to="/about" className="btn btn-primary font-weight-bold">
            A propos
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink
            className="btn btn-primary font-weight-bold mr-2"
            to="/login"
          >
            Déconnexion
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </React.Fragment>
  );
}
