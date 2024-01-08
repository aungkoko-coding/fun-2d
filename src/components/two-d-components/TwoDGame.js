import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import Message from "../Message";
import ConfirmModal from "../modal/ConfirmModal";
import ModalOverlay from "../modal/ModalOverlay";
import Num from "./Num";
import { R, Khwe, Break, NyiKo, NatKhat, Power } from "./Calc2D";
import ErrorModal from "../modal/ErrorModal";
import AddNumbersModal from "../modal/AddedNumbersModal";
import WinnerBoard from "../modal/WinnerBoard";
import WinningCoinsModal from "../modal/WinningCoinsModal";

const TwoDGame = ({
  coins,
  extractCoins,
  addCoins,
  errorModal,
  toggleErrorModal,
  setErrorModal,
}) => {
  const [numbers, setNumbers] = useState(allNumbers());
  const [formData, setFormData] = useState({
    selectedNumbers: [],
    isR: false,
    isKhwe: false,
    isBreak: false,
    isNyiKo: false,
    isNatKhat: false,
    isPower: false,
    amount: "100 coins",
  });
  const [history, setHistory] = useState([]); // {date: "", numbers: []}

  const [addedToListNumbers, setAddedToListNumbers] = useState([]);
  const [recentAddedToListNumbers, setRecentAddedNumber] = useState([]);
  const [message, setMessage] = useState({
    type: "",
    body: "",
    important: false,
  });
  const [dropdown, setDropdown] = useState(false);

  const [confirmModal, setConfirmModal] = useState(false);
  const [addedNumbersModal, setAddedNumbersModal] = useState(false);
  const [winnerBoardModal, setWinnerBoardModal] = useState(false);
  const [prizeCoins, setPrizeCoins] = useState(0);
  const [winningCoinsModal, setWinningCoinsModal] = useState(false);

  useEffect(() => {
    let lengthOfSelectedNumbers = formData.selectedNumbers.length;
    let isR = formData.isR;
    let isKhwe = formData.isKhwe;
    let isBreak = formData.isBreak;

    if (isR && lengthOfSelectedNumbers > 2) {
      // When the user selected R option and he want to select more than two numbers,
      // we won't let this happen and will show error message. (This is totally nonsense)
      // Think, you wanna R and you selected three numbers, then how we can solve this problem
      setMessage({
        type: "error",
        body: "Please untick the R checkbox if you want to select more than two numbers!",
      });
    } else if ((isKhwe || isBreak) && !isR && !message.important) {
      // if we select the khwe option or selected numbers is less than two,
      // and unselect the R option,
      // we don't wanna show any messages
      setMessage("");
    } else if (!isKhwe && lengthOfSelectedNumbers > 2 && !isBreak) {
      // When the user did not select the khwe option, and he want to select more than two numbers,
      // we won't also let this happen and will show error message
      setMessage({
        type: "error",
        body: "Please tick Khwe checkbox to select more than two numbers",
      });
    }

    // this is additional features, you will understand after taking a while on game
    if (lengthOfSelectedNumbers < 2 && !message.important) {
      setMessage("");
    }
  }, [
    numbers,
    formData.isR,
    formData.selectedNumbers.length,
    formData.isKhwe,
    formData.isBreak,
    message.body,
    message.important,
  ]);

  useEffect(() => {
    if (recentAddedToListNumbers.length >= 1) {
      setAddedNumbersModal((addedNumbersModal) => !addedNumbersModal);
    }
  }, [recentAddedToListNumbers]);

  useEffect(() => {
    console.log(history, "History");
  }, [history]);

  // this function generate the numbers
  function allNumbers() {
    let newNumbers = [];
    for (let i = 0; i < 10; i++) {
      newNumbers.push({
        id: nanoid(),
        num: i,
        isHeld: false,
      });
    }
    return newNumbers;
  }

  // console.log(errorModal, "errorModal")
  // toggle confirm modal
  const toggleConfirmModal = () => {
    setConfirmModal((confirmModal) => !confirmModal);
  };

  const toggleAddedNumbersModal = () => {
    setAddedNumbersModal((addedNumbersModal) => !addedNumbersModal);
  };

  const toggleWinnerBoardModal = () => {
    setWinnerBoardModal((winnerBoardModal) => !winnerBoardModal);
  };

  const toggleWinningCoinsModal = () => {
    setWinningCoinsModal((winningCoinsModal) => !winningCoinsModal);
  };

  // this function will hold the numbers so that we can take selected numbers and do the necessary things
  const holdNumbers = (id) => {
    setNumbers((numbers) => {
      let lengthOfSelectedNumbers = formData.selectedNumbers.length;
      let isR = formData.isR;
      let isKhwe = formData.isKhwe;
      let isBreak = formData.isBreak;

      return numbers.map((num) => {
        if (num.id === id) {
          // we don't let you take more than two numbers if you wanna R,
          // because there can cause few problems
          // ( the reason of why we check if the lengthOfSelectedNumber >= 2, is because
          // lengthOfSelectedNumbers is updated only after the `if` condition statement )
          // To get the point, let me show some pseudo code (assume that we compare length > 2)
          /**
           * -> holdNumbers() -> check length (0 > 2(false)) -> save length to 1 (for first time call)
           * -> holdNumbers() -> check length (1 > 2(false)) -> save length to 2 (for second time call)
           * -> holdNumbers() -> check length (2 > 2(false)) -> save length to 3 (for third time call)
           * -> holdNumbers() -> check length (3 > 2(true)) -> not save length to 4 (for fourth time call)
           *  Have you ever noticed that we can select three numbers even we want to allow to select only two numbers?
           *   To solve this problem, compare the length >= 2 and let your brain think again!
           */
          if (isR && lengthOfSelectedNumbers >= 2 && !num.isHeld) {
            setMessage({
              type: "error",
              body: "Please untick the R checkbox if you want to select more than two numbers!",
            });
            return num;
          } else if (
            isKhwe ||
            isBreak ||
            lengthOfSelectedNumbers < 2 ||
            num.isHeld
          ) {
            // setMessage("");
            let modifiedNum = { ...num, isHeld: !num.isHeld };

            setSelectedNumberBasedOn(modifiedNum);
            return modifiedNum;
          } else if ((!isBreak && !isKhwe) || lengthOfSelectedNumbers >= 2) {
            setMessage({
              type: "error",
              body: "Please tick Khwe or Break checkbox to select more than two numbers!",
            });
            return num;
          }

          return num;
        } else {
          return num;
        }
      });
    });
  };

  // set the selected number based on the modified number( such as isHeld or not)
  function setSelectedNumberBasedOn(num) {
    let selectedNumbers = formData.selectedNumbers;
    let selectedNumbersIds = selectedNumbers.map((n) => n.id);

    if (!selectedNumbersIds.includes(num.id)) {
      setFormData((data) => {
        return { ...data, selectedNumbers: selectedNumbers.concat(num) };
      });
    } else {
      setFormData((data) => {
        return {
          ...data,
          selectedNumbers: selectedNumbers.filter((n) => !(num.id === n.id)),
        };
      });
    }
  }

  // console.log(formData.selectedNumbers);

  const handleFormDataChange = (event) => {
    let { type, name, checked, value } = event.target;

    if (name === "amount") {
      if (isNaN(parseInt(value))) {
        value = "100 coins";
      } else {
        value = parseInt(value) + " coins";
      }
    }

    setFormData((data) => {
      return { ...data, [name]: type === "checkbox" ? checked : value };
    });
    // console.log(event.target);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // history.push({ date: Date(), numbers: addedToListNumbers });
    // console.log(history, "History");
  };

  // this function can be used to determine whether provided num existed or not
  const checkIfAlreadyExistsInList = (num) => {
    if (addedToListNumbers.some((number) => number.num === num)) {
      return true;
    } else {
      return false;
    }
  };

  function addToHistory() {
    setAddedToListNumbers((addedToListNumbers) => [
      ...addedToListNumbers,
      ...recentAddedToListNumbers,
    ]);
    // setHistory(prevHistory => [...prevHistory, {date: Date(), numbers: addedToListNumbers}]);
  }

  async function add() {
    await addToList();
  }

  function calculateWinOrLose() {
    setHistory((prevHistory) => {
      let date = new Date();
      let formattedDate =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      let dateOfHistory = prevHistory.map((history) => history.date);
      let index = dateOfHistory.indexOf(formattedDate);

      if (index !== -1) {
        // let history = prevHistory[index];
        // prevHistory[index] = {...prevHistory[index], numbers: prevHistory[index].numbers.concat(addedToListNumbers)};
        return prevHistory.map((history) => {
          if (history.date === formattedDate) {
            return {
              ...history,
              numbers: history.numbers.concat(addedToListNumbers),
            };
          }
          return history;
        });
      } else {
        return [
          ...prevHistory,
          { date: formattedDate, numbers: addedToListNumbers },
        ];
      }
    });

    if (addedToListNumbers.length >= 1 && !errorModal.show) {
      setWinnerBoardModal((winnerBoardModal) => !winnerBoardModal);
    } else {
      setErrorModal((errorModal) => {
        return {
          ...errorModal,
          show: true,
          message: "Cannot calculate result unless you add to the list!",
        };
      });
    }
  }

  const clearAddedNumbers = () => {
    setAddedToListNumbers([]);
  };

  //console.log("added numbers in game component", addedToListNumbers);
  function addToList() {
    const {
      selectedNumbers,
      isR,
      isKhwe,
      isBreak,
      isNyiKo,
      isNatKhat,
      isPower,
      amount,
    } = formData;
    const lengthOfSelectedNumber = selectedNumbers.length;
    // console.log(selectedNumbers, "are selected numbers");

    if ((isR || isKhwe || isBreak) && lengthOfSelectedNumber === 0) {
      setErrorModal((errorModal) => {
        return {
          ...errorModal,
          show: true,
          message: "Please select at least one number!",
        };
      });
    } else if (
      !isR &&
      !isKhwe &&
      !isBreak &&
      !isNyiKo &&
      !isNatKhat &&
      !isPower &&
      lengthOfSelectedNumber === 0
    ) {
      setErrorModal((errorModal) => {
        return {
          ...errorModal,
          show: true,
          message: "Please select at least one number!",
        };
      });
    } else if (isR && lengthOfSelectedNumber > 2) {
      setErrorModal((errorModal) => {
        return {
          ...errorModal,
          show: true,
          message:
            "Please untick R checkbox! Otherwise we may or may not calculate the result correctly!",
        };
      });
    } else {
      // Normal
      if (!isR && !isKhwe && !isBreak && lengthOfSelectedNumber === 2) {
        // Normal
        const num = selectedNumbers[0].num + "" + selectedNumbers[1].num;
        console.log(checkIfAlreadyExistsInList(num));
        setRecentAddedNumber([{ num, cost: amount }]);
      } else if (!isR && !isKhwe && !isBreak && lengthOfSelectedNumber === 1) {
        const num = selectedNumbers[0].num + "" + selectedNumbers[0].num;

        setRecentAddedNumber([{ num, cost: amount }]);
      }

      // Only R
      else if (isR && lengthOfSelectedNumber === 2 && !isKhwe && !isBreak) {
        // R
        const newNumbers = R(
          selectedNumbers[0].num,
          selectedNumbers[1].num,
          amount
        );

        setRecentAddedNumber([...newNumbers]);
      } else if (isR && lengthOfSelectedNumber === 1 && !isKhwe && !isBreak) {
        const newNumbers = R(
          selectedNumbers[0].num,
          selectedNumbers[0].num,
          amount
        );

        setRecentAddedNumber([...newNumbers]);
      }

      // R and Break
      else if (isR && lengthOfSelectedNumber === 2 && !isKhwe && isBreak) {
        const newNumbers1 = R(
          selectedNumbers[0].num,
          selectedNumbers[1].num,
          amount
        );
        const newNumbers2 = Break(selectedNumbers, amount);

        setRecentAddedNumber([...newNumbers1, ...newNumbers2]);
      } else if (isR && lengthOfSelectedNumber === 1 && !isKhwe && isBreak) {
        const newNumbers1 = R(
          selectedNumbers[0].num,
          selectedNumbers[0].num,
          amount
        );
        const newNumbers2 = Break(selectedNumbers, amount);

        setRecentAddedNumber([...newNumbers1, ...newNumbers2]);
      }

      // R and Khwe
      else if (isR && isKhwe && lengthOfSelectedNumber === 2 && !isBreak) {
        // prevAddedNumbers.push({ num: num1, cost: amount }, { num: num2, cost: amount });
        const newNumArr1 = R(
          selectedNumbers[0].num,
          selectedNumbers[1].num,
          amount
        );
        // console.log(prevAddedNumbers, "Added number");
        const newNumArr2 = Khwe(selectedNumbers, amount);

        setRecentAddedNumber([...newNumArr1, ...newNumArr2]);
        // });
      } else if (isR && isKhwe && lengthOfSelectedNumber === 1 && !isBreak) {
        // prevAddedNumbers.push({ num: num1, cost: amount }, { num: num2, cost: amount });
        const newNumArr1 = R(
          selectedNumbers[0].num,
          selectedNumbers[0].num,
          amount
        );
        // console.log(prevAddedNumbers, "Added number");
        const newNumArr2 = Khwe(selectedNumbers, amount);

        setRecentAddedNumber([...newNumArr1, ...newNumArr2]);
      }

      // R, Khwe and Break
      else if (isR && isKhwe && lengthOfSelectedNumber === 2 && isBreak) {
        const newNumArr1 = R(
          selectedNumbers[0].num,
          selectedNumbers[1].num,
          amount
        );
        const newNumArr2 = Khwe(selectedNumbers, amount);
        const newNumArr3 = Break(selectedNumbers, amount);

        setRecentAddedNumber([...newNumArr1, ...newNumArr2, ...newNumArr3]);
      } else if (isR && isKhwe && lengthOfSelectedNumber === 1 && isBreak) {
        const newNumArr1 = R(
          selectedNumbers[0].num,
          selectedNumbers[0].num,
          amount
        );
        const newNumArr2 = Khwe(selectedNumbers, amount);
        const newNumArr3 = Break(selectedNumbers, amount);

        setRecentAddedNumber([...newNumArr1, ...newNumArr2, ...newNumArr3]);
      }

      // Only Khwe
      else if (!isR && isKhwe && !isBreak) {
        const newNumArr = Khwe(selectedNumbers, amount);
        setRecentAddedNumber([...newNumArr]);
      }

      // Khwe and Break
      else if (!isR && isKhwe && isBreak) {
        const newNumArr1 = Khwe(selectedNumbers, amount);
        const newNumArr2 = Break(selectedNumbers, amount);

        setRecentAddedNumber([...newNumArr1, ...newNumArr2]);
      }

      // Only Break
      else if (!isR && !isKhwe && isBreak) {
        // Break
        const newNumArr = Break(selectedNumbers, amount);
        setRecentAddedNumber([...newNumArr]);
      }

      let numArr = [];
      if (isNyiKo) {
        const newNumArr = NyiKo(amount);
        numArr.push(newNumArr);
      }

      if (isNatKhat) {
        const newNumArr = NatKhat(amount);
        numArr.push(newNumArr);
      }

      if (isPower) {
        const newNumArr = Power(amount);
        numArr.push(newNumArr);
      }

      if (numArr.length >= 1) {
        // to include the numbers which are the results of after R or Khwe or Break
        // if I didn't do this, the recent added numbers will include only the results of
        // NatKhat or NyiKo or Power
        if (!isR && !isKhwe && !isBreak) {
          setRecentAddedNumber(numArr.flat());
        } else {
          setRecentAddedNumber((prevNum) => [...prevNum, ...numArr].flat());
        }
      }
    }
  }

  return (
    <form className="two-d" onSubmit={handleSubmit}>
      <label style={{ alignSelf: "flex-end", fontSize: "0.8rem" }}>
        Amount:{" "}
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleFormDataChange}
          placeholder="100 coins"
          style={{
            width: "100px",
            fontSize: "0.8rem",
            alignSelf: "flex-end",
            padding: "2px 5px",
            borderRadius: "4px",
            outline: "none",
            textAlign: "end",
            overflow: "visible",
          }}
          list="amount-list"
          onBlur={(e) => {
            let v = e.target.value;

            if (v) {
              v = parseInt(v);
              if (!isNaN(v) && v !== 0) {
                e.target.value = v + ` coin${v === 1 ? "" : "s"}`;
                e.target.style.border = "solid 1px green";
              } else {
                e.target.value = "100 coins";
                e.target.style.border = "solid 1px red";
              }
            }
          }}
          required
        />
      </label>
      <datalist id="amount-list">
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
          (li, index) => (
            <option value={li} key={index}></option>
          )
        )}
      </datalist>
      <div className="numbers--container">
        {numbers.map(({ id, num, isHeld }) => (
          <Num
            key={id}
            value={num}
            isHeld={isHeld}
            holdNumber={() => holdNumbers(id)}
          />
        ))}
      </div>
      <div className="btn--container">
        <input
          type="submit"
          onClick={toggleConfirmModal}
          className="btn btn--confirm"
          value="Confirm"
        />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            className="dropdown--container btn"
            onClick={() => setDropdown((dropdown) => !dropdown)}
          >
            Options &gt;
            <div
              className="dropdown"
              style={{ visibility: dropdown ? "visible" : "hidden" }}
            >
              <label htmlFor="R" className="dropdown--item">
                <input
                  type="checkbox"
                  id="R"
                  name="isR"
                  checked={formData.isR}
                  onChange={handleFormDataChange}
                />
                R
              </label>

              <label htmlFor="Khwe" className="dropdown--item">
                <input
                  type="checkbox"
                  id="Khwe"
                  name="isKhwe"
                  checked={formData.isKhwe}
                  onChange={handleFormDataChange}
                />
                Khwe
              </label>

              <label htmlFor="Break" className="dropdown--item">
                <input
                  type="checkbox"
                  id="Break"
                  name="isBreak"
                  checked={formData.isBreak}
                  onChange={handleFormDataChange}
                />
                Break
              </label>

              <label htmlFor="NyiKo" className="dropdown--item">
                <input
                  type="checkbox"
                  id="NyiKo"
                  name="isNyiKo"
                  checked={formData.isNyiKo}
                  onChange={handleFormDataChange}
                />
                NyiKo
              </label>

              <label htmlFor="NatKhat" className="dropdown--item">
                <input
                  type="checkbox"
                  id="NatKhat"
                  name="isNatKhat"
                  checked={formData.isNatKhat}
                  onChange={handleFormDataChange}
                />
                NatKhat
              </label>

              <label htmlFor="Power" className="dropdown--item">
                <input
                  type="checkbox"
                  id="Power"
                  name="isPower"
                  checked={formData.isPower}
                  onChange={handleFormDataChange}
                />
                Power
              </label>
            </div>
          </div>

          <div
            className="btn"
            style={{
              border: "solid 0.6px rgb(56, 88, 56)",
              backgroundColor: "rgb(145, 218, 145)",
              color: "rgb(56, 88, 56)",
              fontWeight: "700",
            }}
            onClick={add}
          >
            Add to list
          </div>
        </div>
      </div>
      {/* {
                confirmModal &&
                <ModalOverlay toggle={confirmModal}>
                    <ConfirmModal
                        title="Confirm Voucher"
                        message="Are you sure you want to confirm?"
                        confirmNumbers={confirmNumbers}
                        toggleModal={toggleConfirmModal}
                    />
                </ModalOverlay>
            } */}
      <ModalOverlay
        toggle={confirmModal}
        render={(showModal) => (
          <ConfirmModal
            title="Confirm Voucher"
            message="Are you sure you want to confirm these numbers?"
            coins={coins}
            addedNumbers={addedToListNumbers}
            extractCoins={extractCoins}
            calculateWinOrLose={calculateWinOrLose}
            errorModal={errorModal}
            setErrorModal={setErrorModal}
            toggleModal={toggleConfirmModal}
            showModal={showModal}
          />
        )}
      />
      <ModalOverlay
        toggle={errorModal?.show}
        render={(showModal) => (
          <ErrorModal
            title={errorModal.title}
            message={errorModal.message}
            toggleModal={toggleErrorModal}
            showModal={showModal}
          />
        )}
      />
      <ModalOverlay
        toggle={addedNumbersModal}
        render={(showModal) => (
          <AddNumbersModal
            title="Add To List"
            recentAddedNumbers={recentAddedToListNumbers}
            add={addToHistory}
            toggleModal={toggleAddedNumbersModal}
            showModal={showModal}
          />
        )}
      />
      <ModalOverlay
        toggle={winnerBoardModal}
        render={(showModal) => (
          <WinnerBoard
            addCoins={addCoins}
            setPrizeCoins={setPrizeCoins}
            addedNumbers={addedToListNumbers}
            clearAddedNumbers={clearAddedNumbers}
            title="Winner or Looser"
            message="Here we will decide whether you are winner or looser!"
            toggleWinningCoinsModal={toggleWinningCoinsModal}
            toggleModal={toggleWinnerBoardModal}
            showModal={showModal}
          />
        )}
      />
      <ModalOverlay
        toggle={winningCoinsModal}
        render={(showModal) => (
          <WinningCoinsModal
            title="Congratulations!"
            message="You have received"
            rewardCoins={prizeCoins}
            toggleModal={toggleWinningCoinsModal}
            showModal={showModal}
          />
        )}
      />
      <Message type={message.type} body={message.body} />
    </form>
  );
};

export default TwoDGame;
