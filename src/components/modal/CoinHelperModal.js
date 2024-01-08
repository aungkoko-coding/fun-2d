import React, { useState } from "react";
import Modal from "./Modal";
import "../two-d-components/style.css";

const CoinHelperModal = ({
  title,
  message,
  toggleModal,
  showModal,
  toggleComingSoonModal,
}) => {
  const style = {
    border: "solid 0.6px green",
    backgroundColor: "white",
  };

  const handleClick = () => {
    toggleModal();
    toggleComingSoonModal();
  };

  return (
    <Modal
      title={title}
      message={message}
      toggleModal={toggleModal}
      showModal={showModal}
    >
      <div className="btn--container" style={{ width: "100%" }}>
        <button className="btn" style={style} onClick={handleClick}>
          Play Tenzies Game
        </button>
        <button className="btn" style={style} onClick={handleClick}>
          Play Memory Game
        </button>
      </div>
    </Modal>
  );
};

export default CoinHelperModal;
