import React, { useState, createContext, useEffect } from "react";

export const CoinContext = createContext();

export default function CoinContextProvider(props) {
  const [coins, setCoins] = useState(localStorage.getItem("coins") || 1200);

  useEffect(() => {
    localStorage.setItem("coins", coins);
  }, [coins]);

  const addCoins = (incomeCoins) => {
    setCoins((ownedCoins) => Number(ownedCoins) + incomeCoins);
  };

  const extractCoins = (amount) => {
    setCoins((ownedCoins) => ownedCoins - amount);
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins, extractCoins }}>
      {props.children}
    </CoinContext.Provider>
  );
}
