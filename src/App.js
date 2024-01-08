import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import MetaData from "./components/MetaData";
import AwardModal from "./components/modal/AwardModal";
import ModalOverlay from "./components/modal/ModalOverlay";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import SplashScreen from "./components/SplashScreen";
import TwoDGame from "./components/two-d-components/TwoDGame";
import HowToUseModal from "./components/modal/HowToUseModal";

function App() {
  const [register, setRegister] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [firstTimeVisited, setFirstTimeVisited] = useState(false);
  const [splash, setSplash] = useState(true);
  const [coins, setCoins] = useState(getCoins());

  const [errorModal, setErrorModal] = useState({
    show: false,
    title: "Error",
    message: "",
  });
  const [howToUseModal, setHowToUseModal] = useState(false);

  useEffect(() => {
    if (splash) {
      setTimeout(() => {
        setSplash(false);
      }, 5500);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("coins", coins);
  }, [coins]);

  // determining whether user need to register or not
  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("formData"));
    if (register === undefined || register === null) {
      setRegister(true);
    } else {
      setRegister(false);
    }

    const timeOut = setTimeout(() => {
      const showedHowToUseModal = localStorage.getItem("showedHowToUseModal");
      if (!showedHowToUseModal) {
        setHowToUseModal(true);
        localStorage.setItem("showedHowToUseModal", true);
      }
    }, 6000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  // determining first time visit or not
  useEffect(() => {
    const firstTime = localStorage.getItem("firstTimeVisited") ? false : true;
    if (firstTime) {
      setFirstTimeVisited(true);
      localStorage.setItem(
        "firstTimeVisited",
        "Yes, I visited for the first time!"
      );
    } else {
      setFirstTimeVisited(false);
    }
  }, []);

  function getCoins() {
    const firstTimeVisited = localStorage.getItem("firstTimeVisited");
    if (firstTimeVisited) {
      const coins = Number(localStorage.getItem("coins"));
      return coins === 0 ? 0 : coins;
    } else {
      return Number(localStorage.getItem("coins")) || 1200;
    }
  }

  function addCoins(income) {
    setCoins((ownedCoins) => ownedCoins + income);
  }

  function extractCoins(amount) {
    if (coins >= amount) {
      setCoins((ownedCoins) => ownedCoins - amount);
    }
  }

  const toggleErrorModal = () => {
    setErrorModal((errorModal) => ({ ...errorModal, show: !errorModal.show }));
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const toggleHowToUseModal = () => {
    setHowToUseModal((howToUseModal) => !howToUseModal);
  };

  return (
    <section className="App">
      {splash ? ( // replace with "splash"
        <SplashScreen />
      ) : (
        <>
          <Navbar />
          {register ? (
            <RegisterForm setRegister={setRegister} />
          ) : (
            <main>
              <MetaData coins={coins} addCoins={addCoins} />
              <TwoDGame
                coins={coins}
                extractCoins={extractCoins}
                addCoins={addCoins}
                errorModal={errorModal}
                toggleErrorModal={toggleErrorModal}
                setErrorModal={setErrorModal}
              />
            </main>
          )}

          <ModalOverlay
            toggle={!register && firstTimeVisited && showModal}
            render={(showModal) => (
              <AwardModal
                coins={coins}
                addCoins={addCoins}
                rewardCoins={10000}
                title="Get the reward!"
                message="For the first time visit, get 10000 coins by saying 'Hooray!'"
                toggleModal={toggleModal}
                showModal={showModal}
              />
            )}
          />
          <ModalOverlay
            toggle={howToUseModal}
            render={(showModal) => (
              <HowToUseModal
                title="How to use"
                message="Here I will guide you how to use this app!"
                toggleModal={toggleHowToUseModal}
                showModal={showModal}
              />
            )}
          />
          <Footer />
        </>
      )}
    </section>
  );
}

export default App;
