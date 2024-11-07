import "../../ComponentStyle/CryptoStyle/Crypto.css";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CreditCardLogo from "../../Logos/MoorLogo.svg";

export default function Crypto() {
  return (
    <header className="App-crypto">
      <h1>Buy and sell trusted Crypto</h1>
      <div className="Crypto-Wrapper">
        <div className="IntroPart">
          <h3 className="CryptoCurrPara1">
            Explore the crypto world. Buy and cell crypto coins easy and secure.
          </h3>
          <p className="CryptoCurrPara2">
            Explore the exciting world of cryptocurrency with ease. Our platform
            offers a secure and user-friendly environment. Benefit from
            lightning-fast transactions, competitive rates, and robust security
            measures. Join the crypto revolution today and start building your
            digital wealth.
          </p>
          <motion.div className="TryButton">Give it a Try</motion.div>
        </div>
        <div className="InformationPart">
          <img
            src={CreditCardLogo}
            className="CreditCardLogoStyle"
            alt="CreditCard"
          ></img>
          <CryptoFormulaire />
        </div>
      </div>
      <CoinGraphics />
    </header>
  );
}

function Coin({ CoinName, CoinValue, CoinLogo }) {
  return (
    <div className="coinGr">
      <img className="coinLogo" src={CoinLogo} alt="coinLogo">
        {Coin.Logo}
      </img>
      <div className="coinName">{CoinName}</div>
      <div className="coinValue">{CoinValue}</div>
    </div>
  );
}

function CoinGraphics() {
  const options = {
    headers: {
      "x-access-token":
        "coinranking0932477bb045d38988b7564f24af2967be9ffbc7e5bf9799",
    },
  };
  const [graphicsList, setGraphicsList] = useState([]);
  const [coinVName, setCoinVName] = useState("");

  useEffect(() => {
    fetch("https://api.coinranking.com/v2/coins", options)
      .then((response) => response.json())
      .then((result) => setGraphicsList(result.data.coins));
  }, []);

  let filteredGraphicsList = graphicsList.filter((el) =>
    el.name.toUpperCase().startsWith(coinVName.toUpperCase())
  );

  let graphicsDes = filteredGraphicsList.map((e) => (
    <Coin CoinName={e.name} CoinValue={e.price + "$"} CoinLogo={e.iconUrl} />
  ));

  function handleChange(e) {
    setCoinVName(e.target.value);
  }

  return (
    <div className="GraphicsBackGround">
      <h1 className="graphTitleBar">Famous Coins Prices:</h1>
      <input
        className="cryptoName"
        type="text"
        value={coinVName}
        placeholder="Search Coin name"
        onChange={handleChange}
      ></input>
      <div>{graphicsDes}</div>
    </div>
  );
}

function CryptoFormulaire() {
  const [formulaireTable, setFormulaireTable] = useState(["", "", "", "", ""]);
  let placeHoldersTab = [
    "Adress to*",
    "Amount (ETH)*",
    "Keyword (Gif)*",
    "Twitter @",
    "Enter a Message",
  ];
  let formulaireView = formulaireTable.map((el, index) => (
    <input
      type="text"
      value={el}
      placeholder={placeHoldersTab[index]}
      className="formulaireCase"
      onChange={(e) => handleChange(e, index)}
    />
  ));

  function handleChange(e, index) {
    let newForm = [...formulaireTable];
    newForm[index] = e.target.value;
    setFormulaireTable(newForm);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="formForm">
        <div className="InputsForm">
          {formulaireView}
          <motion.div className="SubmitButton">Send Now</motion.div>
        </div>
      </form>
    </div>
  );
}
