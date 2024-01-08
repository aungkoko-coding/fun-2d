import React from "react";
import "./style.css";

const Num = (props) => {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div onClick={props.holdNumber} className="number" style={style}>
      <h2 className="number--value">{props.value}</h2>
    </div>
  );
};

export default Num;
