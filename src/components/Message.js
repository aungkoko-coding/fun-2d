import React from "react";

// this component will determine itself whether should render or not
const Message = ({ type, body }) => {
  return <>{body && <p className={`message ${type}`}> {body} </p>}</>;
};

export default Message;
