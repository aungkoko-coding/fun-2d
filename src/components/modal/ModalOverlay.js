import React from "react";

const ModalOverlay = (props) => {
  const showModal = props.toggle;
  const style = showModal
    ? { pointerEvents: "auto", opacity: 1, transform: "scale(1)" }
    : {};

  return (
    <div className="modal-overlay" style={style}>
      {props.render(props.toggle)}
    </div>
  );
};

export default ModalOverlay;
