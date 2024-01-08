import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const AddNumbersModal = ({
  title,
  recentAddedNumbers,
  add,
  toggleModal,
  showModal,
}) => {
  const style = {
    border: "solid 0.6px green",
    backgroundColor: "white",
  };

  const [totalCost, setTotalCost] = useState(totalAmount());
  // console.log("addedNumbers", addedNumbers);
  useEffect(() => {
    setTotalCost(totalAmount());
  }, [recentAddedNumbers]);

  function totalAmount() {
    let totalCosts = 0;
    recentAddedNumbers.map((n) => {
      totalCosts += parseInt(n.cost);
      return n;
    });
    return totalCosts;
  }

  const message = `You want to add these ${
    recentAddedNumbers.length === 1 ? "number" : "numbers"
  } to the list?`;

  return (
    <Modal
      title={title}
      message={message}
      toggleModal={toggleModal}
      showModal={showModal}
    >
      <ul style={{ width: "100%", maxHeight: "200px", overflowX: "auto" }}>
        {recentAddedNumbers.map((addedNumber, index) => (
          <li key={index}>
            {" "}
            {addedNumber.num} - {addedNumber.cost}{" "}
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          borderTop: "solid 0.7px #000000",
        }}
      >
        <p>Total : {recentAddedNumbers.length}</p>
        <p>Total cost : {totalCost} coins</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          gap: "5px",
        }}
      >
        <button
          className="btn"
          style={style}
          onClick={() => {
            toggleModal();
            add();
          }}
        >
          Add
        </button>
        <button className="btn btn--cancel" onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddNumbersModal;
