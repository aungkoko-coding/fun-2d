import React, { useState } from "react";
import Message from "../Message";
import Modal from "./Modal";

const RewardModal = ({
  coins,
  addCoins,
  rewardCoins,
  title,
  message,
  toggleModal,
  showModal,
}) => {
  const [mal, setMal] = useState("");
  const [msg, setMsg] = useState({
    type: "",
    body: "",
  });
  // console.log(coins, "Coin in RewardModal");
  const handleChange = (event) => {
    // while user is typing, clear the msg
    if (mal) {
      setMsg("");
    }

    setMal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mal === "ma a loe Min Aung Hlaing") {
      setMsg({ type: "success", body: "Gotcha! You got the point!" });
      addCoins(rewardCoins);
      setTimeout(() => {
        toggleModal();
      }, 2000);
    } else if (mal === "") {
      setMsg({ type: "error", body: "Can't be null!" });
    } else {
      setMsg({ type: "error", body: "Wrong!" });
    }
  };

  return (
    <Modal
      title={title}
      message={message}
      toggleModal={toggleModal}
      showModal={showModal}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          columnGap: "5px",
        }}
      >
        <input
          type="text"
          style={{ width: "200px" }}
          placeholder="Say here..."
          name="mal"
          value={mal}
          onChange={handleChange}
        />
        <button className="btn btn--reward">Get</button>
      </form>
      <Message type={msg.type} body={msg.body} />
    </Modal>
  );
};

export default RewardModal;

// return (
//     <CoinContext.Consumer>{coinContext => {

//         const { addCoins } = coinContext;

//         const handleChange = (event) => {

//             // while user is typing, clear the msg
//             if(mal){
//                 setMsg("");
//             }

//             setMal(event.target.value);

//         }

//         const handleSubmit = (event) => {
//             event.preventDefault();
//             if(mal === 'ma a lol min aung hlaing'){
//                 setMsg({type: "success", body: "Gotcha! You got the point!"});
//                 addCoins(rewardCoins);
//                 setTimeout(() => {
//                     toggleModal();
//                 }, 2000);
//             }else if(mal === "") {
//                 setMsg({type: "error", body: "Can't be null!"})
//             }else {
//                 setMsg({type: "error", body: "Wrong!"})
//             }

//         }

//         return (
//             <Modal title={title} message={message} toggleModal={toggleModal} showModal={showModal}>
//                 <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'stretch', justifyContent: 'center', columnGap: '5px'}}>
//                     <input type="text" placeholder="Say here..." name="mal" value={mal} onChange={handleChange} />
//                     <button className="btn btn--reward">Get</button>
//                 </form>
//                 <Message type={msg.type} body={msg.body} />
//             </Modal>
//         )
//     }}
//     </CoinContext.Consumer>
// );
