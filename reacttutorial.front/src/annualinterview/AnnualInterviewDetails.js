import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function InterviewDetails() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <React.Fragment>
        <h2
          className="Auth-form-title"
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          Nouvel Entretien
        </h2>

        <form>
          <label>Date Entretien</label>
          <input />
          <button className="btn btn-secondary">Sauvegarder</button>
          <button onClick={closeModal}>Quitter</button>
        </form>
      </React.Fragment>
    </Modal>
  );
}
