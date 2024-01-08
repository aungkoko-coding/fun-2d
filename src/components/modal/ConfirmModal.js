import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const ConfirmModal = ({
  title,
  message,
  addedNumbers,
  coins,
  extractCoins,
  calculateWinOrLose,
  errorModal,
  setErrorModal,
  toggleModal,
  showModal,
}) => {
  const [totalCost, setTotalCost] = useState(totalAmount());
  // console.log("addedNumbers", addedNumbers);
  useEffect(() => {
    setTotalCost(totalAmount());
  }, [addedNumbers]);

  function totalAmount() {
    let totalCosts = 0;
    addedNumbers.map((n) => {
      totalCosts += parseInt(n.cost);
      return n;
    });
    return totalCosts;
  }

  function shouldCalculateWinOrLose() {
    if (coins >= totalCost) {
      extractCoins(totalCost);
      calculateWinOrLose();
    } else {
      setErrorModal((errorModal) => ({
        ...errorModal,
        show: true,
        message: "Not enough coins!",
      }));
    }
  }

  return (
    <Modal
      title={title}
      message={message}
      toggleModal={toggleModal}
      showModal={showModal}
    >
      <ul style={{ width: "100%", maxHeight: "200px", overflowX: "auto" }}>
        {addedNumbers.map((addedNumber, index) => (
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
        <p>Total : {addedNumbers.length}</p>
        <p>Total cost : {totalCost} coins</p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={() => {
              toggleModal();
              shouldCalculateWinOrLose();
            }}
            className="btn btn--confirm"
            style={{ fontSize: "0.8rem" }}
          >
            Confirm
          </button>
          <button onClick={toggleModal} className="btn btn--cancel">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

// return (
//     <CoinContext.Consumer>{coinContext => {
//         const {extractCoins} = coinContext;
//         return (
//             <Modal title={title} message={message} toggleModal={toggleModal} showModal={showModal}>
//                 <ul style={{ width: "100%", maxHeight: "200px", overflowX: "auto" }}>
//                     {addedNumbers.map((addedNumber, index) => (<li key={index}> {addedNumber.num} - {addedNumber.cost} </li>))}
//                 </ul>
//                 <div style={{ display: "flex", width: "100%", justifyContent: "space-between", borderTop: "solid 0.7px #000000" }}>
//                     <p>Total : {addedNumbers.length}</p>
//                     <p>Total cost : {totalAmount()} coins</p>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
//                     <div style={{ display: 'flex', gap: '5px' }}>
//                         <button onClick={() => {toggleModal(); extractCoins(totalAmount())}} className="btn btn--confirm" style={{ fontSize: '0.8rem' }} >Confirm</button>
//                         <button onClick={toggleModal} className="btn btn--cancel" >Cancel</button>
//                     </div>
//                 </div>
//             </Modal>
//         );
//     }}
//     </CoinContext.Consumer>

// );
