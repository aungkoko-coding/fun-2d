import React from "react";
import "./style.css";

const Modal = ({
  title,
  message,
  children,
  toggleModal,
  showModal,
  titleStyle,
  messageStyle,
}) => {
  const style = showModal
    ? {
        pointerEvents: "auto",
        opacity: 1,
        transform: "scale(1) translate(-50%, -50%)",
      }
    : {};

  return (
    <div className="modal" style={style}>
      <h2 style={titleStyle || {}}> {title} </h2>
      <p style={messageStyle || {}}> {message} </p>
      <i className="close--btn" onClick={toggleModal}>
        X
      </i>
      {children}
    </div>
  );
};

export default Modal;
