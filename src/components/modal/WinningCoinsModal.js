import React from "react";
import Modal from "./Modal";

export default function WinningCoinsModal({
  title,
  message,
  rewardCoins,
  toggleModal,
  showModal,
}) {
  return (
    <Modal
      title={title}
      message={message + " " + rewardCoins + " coins"}
      toggleModal={toggleModal}
      showModal={showModal}
    >
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <button
          onClick={toggleModal}
          className="btn btn--confirm"
          style={{ fontSize: "0.8rem" }}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
}
