import React from "react";
import Modal from "./Modal";

export default function HowToUseModal({
  title,
  message,
  toggleModal,
  showModal,
}) {
  return (
    <Modal
      title={title}
      message={message}
      toggleModal={toggleModal}
      showModal={showModal}
    >
      <div style={{ width: "100%", maxHeight: "250px", overflowX: "auto" }}>
        <p>
          1st Step =&gt; Select or Click on each numbers (and tick checkboxes
          from options if you want).
        </p>
        <p>
          2nd Step =&gt; Click "Add to list" button to add the selected numbers
          to the list.
        </p>
        <p>
          3rd Step =&gt; Click "Confirm" button to confirm the numbers from the
          list, then click "confirm" and wait util the result appear.
        </p>
        <p>
          4th Step =&gt; Click "Ok" if the result has showed! (You will receive
          coins if you won!)
        </p>
      </div>
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
