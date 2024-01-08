import React from "react";
import Modal from "./Modal";

const ErrorModal = ({ title, message, toggleModal, showModal }) => {
  const style = {
    border: "solid 0.6px rgb(255, 0, 0)",
    backgroundColor: "white",
  };

  return (
    <Modal
      title={title}
      message={message}
      toggleModal={toggleModal}
      showModal={showModal}
      titleStyle={{ color: "rgba(255, 0, 0, 1)" }}
      messageStyle={{ color: "rgba(255, 0, 0, 0.7)" }}
    >
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <button className="btn" style={style} onClick={toggleModal}>
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
