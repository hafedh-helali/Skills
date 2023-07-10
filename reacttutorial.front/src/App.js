import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
//import "bootstrap/dist/css/bootstrap.min.css";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#yourAppElement");

function App() {
  return <div className="App"></div>;
}

ReactDOM.render(<App />, appElement);
