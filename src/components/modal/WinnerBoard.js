import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Typical from "react-typical";
import Confetti from "react-confetti";

export default function WinnerBoard({
  addCoins,
  setPrizeCoins,
  addedNumbers,
  clearAddedNumbers,
  title,
  message,
  toggleWinningCoinsModal,
  toggleModal,
  showModal,
}) {
  const [prize, setPrize] = useState({
    win: false,
    coins: 0,
    showResult: false,
  });
  const [luckyNumber, setLuckyNumber] = useState("");

  const [msg, setMsg] = useState("");

  let messageStyle = { color: "rgba(255, 0, 0, 0.7)" };

  const extractWinNumbers = () => {
    let firstNumber = Math.floor(Math.random() * 10);
    let secondNumber = Math.floor(Math.random() * 10);

    let winNumber = firstNumber + "" + secondNumber;
    setLuckyNumber(winNumber); // to test, replace with a number you like

    let winNumArr = addedNumbers.filter((number) => number.num === winNumber);

    // we need to clear added numbers after calculating winning numbers
    clearAddedNumbers();

    return winNumArr;
  };

  const calculateCoins = (winNumArr) => {
    let totalCost = 0;
    winNumArr.map((number) => {
      totalCost += parseInt(number.cost);
      return number;
    });

    return (totalCost / 100) * 8000;
  };

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        let winningNumbers = extractWinNumbers();
        if (winningNumbers.length >= 1) {
          setPrize({
            win: true,
            coins: calculateCoins(winningNumbers),
            showResult: true,
          });
        } else {
          setPrize({ win: false, coins: 0, showResult: true });
        }
      }, 5000);
    }
  }, [showModal]);

  useEffect(() => {
    if (!prize.showResult) {
      setMsg(
        <>
          <Typical
            loop={Infinity}
            wrapper="b"
            steps={["Please wait", 2000, "Calculating...", 2000]}
          />
        </>
      );
    } else if (prize.showResult && prize.win) {
      addCoins(prize.coins);
      setMsg(<p style={{ color: "inherit" }}>Win</p>);
      setPrizeCoins(prize.coins);
    } else if (prize.showResult && !prize.win) {
      setMsg(<p style={{ color: "inherit" }}>LOOSE</p>);
    }
  }, [prize.showResult]);

  return (
    <>
      {prize.showResult && prize.win && (
        <p style={{ position: "relative" }}>
          <Confetti />
        </p>
      )}
      <Modal
        title={title}
        message={message}
        toggleModal={toggleModal}
        showModal={showModal}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {luckyNumber && <h1 style={{ fontSize: "4.5rem" }}>{luckyNumber}</h1>}
          <div
            style={{
              color: prize.win ? "green" : "red",
              fontSize: prize.showResult ? "1.5rem" : "1rem",
            }}
          >
            {msg}
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <button
            onClick={() => {
              toggleModal();
              setPrize({});
              prize.win && prize.showResult && toggleWinningCoinsModal();
            }}
            className="btn btn--confirm"
            style={{ fontSize: "0.8rem" }}
          >
            Ok
          </button>
        </div>
      </Modal>
    </>
  );
}
