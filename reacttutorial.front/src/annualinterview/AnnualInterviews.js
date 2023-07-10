import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
/* import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";*/
import Modal from "react-modal";
import { Navigate } from "react-router-dom";
import { addYears } from "date-fns";
import NavBar from "../navigation/NavBar";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import { FaEdit } from "react-icons/fa";

import "../App.css";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  content: {
    width: "60%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const modalLabelStyle = {
  // width: "50%",
};

export default function Interviews(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [startDate, setStartDate] = useState(new Date());
  const today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  function handleEdit() {
    alert("affichage details");
  }

  return (
    <React.Fragment>
      {renderNavbar()}

      <div>
        <div class="container mt-4">
          <div class="row">
            <div class="col-sm-12">
              <div>
                <button className="btn btn-primary btn-sm" onClick={openModal}>
                  Nouvel Entretien Annuel
                </button>
                {
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={false}
                  >
                    <h2
                      className="Auth-form-title"
                      ref={(_subtitle) => (subtitle = _subtitle)}
                    >
                      Entretien Annuel - {today.date}
                    </h2>
                    <form>
                      <div class="container">
                        <div className="row mb-3">
                          <div class="col">
                            <label>Date Entretien&nbsp;</label>

                            <DatePicker
                              className="form-control"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </div>
                          <div class="col">
                            <div className="row mb-3">
                              <label for="" class="col-sm-2 col-form-label">
                                <label>Statut</label>
                              </label>
                              <div class="col-sm-6">
                                <input className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          for="responsable"
                          class="col-sm-2 col-form-label"
                        >
                          <label>Responsable</label>
                        </label>
                        <div class="col-sm-4">
                          <input className="form-control" />
                        </div>
                      </div>

                      <div className="form-group mt-2">
                        <label id="details">Commentaires Manager</label>
                        <textarea
                          className="form-control"
                          id="details"
                          placeholder=""
                          rows="3"
                        />
                      </div>

                      <div className="form-group mt-2">
                        <label id="details">Commentaires Consultant</label>
                        <textarea
                          className="form-control"
                          id="details"
                          placeholder=""
                          rows="3"
                        />
                      </div>

                      <div class="container mt-3">
                        <div className="row mb-3">
                          <div class="col">
                            <div className="row mb-3">
                              <label for="" class="col-sm-6 col-form-label">
                                <label>Validation Consultant</label>
                              </label>
                              <div class="col-sm-6">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div className="row mb-3">
                              <label for="" class="col-sm-4 col-form-label">
                                <label>Satisfaction</label>
                              </label>
                              <div class="col-sm-6">
                                <select className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="container mt-3">
                        <div className="row mb-3">
                          <div class="col">
                            <div className="row mb-3">
                              <label for="" class="col-sm-3 col-form-label">
                                <label>Validation Manager</label>
                              </label>
                              <div class="col-sm-6">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                        <button className="btn btn-primary float-right">
                          Sauvegarder
                        </button>
                        <button
                          className="btn btn-secondary float-right"
                          onClick={closeModal}
                        >
                          Quitter
                        </button>
                      </div>
                    </form>
                  </Modal>
                }
              </div>
            </div>
          </div>
          <div class="col-sm-12 mt-4">
            <hr></hr>
          </div>
          <div>
            <label>Entretiens annuels effectués</label>
          </div>
          <div className="row Dashboard-panel rounded mt-3">
            <div class="col-sm-12">
              <label>Filtres</label>
            </div>
            <div class="col-sm-12">
              <input
                type="text"
                className=""
                placeholder="Saisir le code"
                name="usercode"
              />
            </div>
            <div class="col-sm-12">
              {" "}
              <hr></hr>
            </div>

            <div class="col-sm-12">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date Entretien</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Code</th>
                    <th scope="col">Profil</th>
                    <th scope="col">Manager</th>
                    <th scope="col">Statut</th>
                    <th scope="col">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>11/12/2022</td>
                    <td>Consultant 1 Nom</td>
                    <td>Consultant 1 Prénom</td>
                    <td>FRAA991029</td>
                    <td>Consultant .Net</td>
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
                    <td>Consultant 2 Nom</td>
                    <td>Consultant 2 Prénom</td>
                    <td>FRJJ123234</td>
                    <td>Consultant BI</td>
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
                    <td>Consultant 3 Nom</td>
                    <td>Consultant 3 Prénom</td>
                    <td>FRAA001002</td>
                    <td>Consultant Java</td>
                    <td>Manager 3</td>
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

function renderNavbar() {
  const authenticated = true;
  if (authenticated) {
    return <NavBar />;
  }
  return <div></div>;
}
