import React, { useState, useEffect } from "react";
import CoinHelperModal from "./modal/CoinHelperModal";
import ModalOverlay from "./modal/ModalOverlay";
import "./two-d-components/style.css";
import Modal from "./modal/Modal";

const MetaData = (props) => {
  const [coinHelperModal, setCoinHelperModal] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState(false);

  useEffect(() => {
    const target = props.coins;
    const speed = 200;
    const counter = document.querySelector(".metadata--coin__amount");

    const updateCount = () => {
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }

      // if (count < target) {
      //     counter.innerText = Math.ceil(count + inc);
      //     setTimeout(updateCount, 1);
      // }else if(count > target) {
      //     counter.innerText = Math.ceil(count - inc);
      //     setTimeout(updateCount, 1);
      // }else{
      //     counter.innerText = target;
      // }
    };

    updateCount();
  }, [props.coins]);

  const toggleCoinHelperModal = () => {
    setCoinHelperModal((coinHelperModal) => !coinHelperModal);
  };

  const toggleComingSoonModal = () => {
    setComingSoonModal((comingSoonModal) => !comingSoonModal);
  };

  const style = {
    border: "solid 0.6px green",
    backgroundColor: "white",
  };

  return (
    <section className="metadata">
      <h2 className="metadata--username">
        {JSON.parse(localStorage.getItem("formData")).username || "Unknown"}
      </h2>
      <div className="metadata--coin">
        <div className="metadata--coin__logo">
          <i className="coin--logo">$</i>
        </div>
        <div className="metadata--coin__amount"> {""} </div>
        <div className="metadata--coin__helper" onClick={toggleCoinHelperModal}>
          +
        </div>
      </div>

      <ModalOverlay
        toggle={coinHelperModal}
        render={(showModal) => (
          <CoinHelperModal
            title="Get the coins"
            message="To help you to gain more coins, play one of these games!"
            toggleModal={toggleCoinHelperModal}
            showModal={showModal}
            toggleComingSoonModal={toggleComingSoonModal}
          />
        )}
      />

      <ModalOverlay
        toggle={comingSoonModal}
        render={(showModal) => (
          <Modal
            title="Coming Soon!"
            message="This feature is currently unavailable!"
            toggleModal={toggleComingSoonModal}
            showModal={showModal}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <button
                className="btn"
                style={style}
                onClick={toggleComingSoonModal}
              >
                OK
              </button>
            </div>
          </Modal>
        )}
      />
    </section>
  );
};

export default MetaData;
