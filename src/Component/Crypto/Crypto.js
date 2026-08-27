import "../../ComponentStyle/CryptoStyle/Crypto.css";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto";

import Marquee from "../Subcomponent/Marquee";

import CreditCardLogo from "../../Logos/MoorLogo.svg";


export default function Crypto() {
  return (
    <header className="App-crypto">
      <h1 className="graphTitleBar">Buy and sell trusted Crypto :</h1>
      <div className="Crypto-Wrapper">
        <div className="InformationPart">
          <img
            src={CreditCardLogo}
            className="CreditCardLogoStyle"
            alt="CreditCard"
          ></img>
          <p>The Moorish Coin</p>
          <CryptoFormulaire />
        </div>
      </div>
      <h1 className="graphTitleBar">Explore Crypto rates :</h1>
      <CryptoCardMarquee />
      <CoinGraphics />
    </header>
  );
}

function CryptoCard({ Coin }){
  return(
      <div className="CryptoCard">
          <div className="CryptoCardWrap">
             <h3 className="CryptoCardTitle">
               {Coin.CoinName}
             </h3>
          </div>
          <img className="CryptoCardLogo" src={Coin.CoinLogo} alt="CryptoCard" />
          <div className={Coin.CoinChange > 0 ? "CryptoCardChangeGreen" : "CryptoCardChangeRed"}>
            {Coin.CoinChange > 0 ? "+" + Coin.CoinChange + "%" : Coin.CoinChange + "%"}
          </div>
      </div>
    );
}

function CryptoCardMarquee(){
  const [cryptoList, setCryptoList] = useState([]);
  const [responseValid, setResponseValid] = useState(false);
  
  let cryptoCardList = cryptoList.map((e, index) => (
    <CryptoCard key={index} Coin={{
      CoinName: e.name,
      CoinValue: e.price + "$",
      CoinLogo: e.iconUrl,
      CoinChange: e.change,
      isSelected: false
    }}/> ));
    
  useEffect(() => {
    const options = {
      headers: {
        "x-access-token":
          "coinranking0932477bb045d38988b7564f24af2967be9ffbc7e5bf9799",
      },
    };
    fetch("https://api.coinranking.com/v2/coins", options)
      .then((response) => response.json())
      .then((result) => {
        setCryptoList(result.data.coins);
        setResponseValid(true);
      });

    return () => {};
  }, []);
  
  return(
       <div className="CryptoMarquee">
          <Marquee itemsList={cryptoCardList} />
       </div>
    );
}

function Coin({ CoinName, CoinValue, CoinLogo, CoinChange, isSelected }) {
  return (
    <>
      {isSelected && (
        <motion.div
          className="coinGrSelected"
          animate={{
            scale: [1, 1.1, 1.1, 1, 1],
            rotate: [0, 0, 360, 360, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <img className="coinLogo" src={CoinLogo} alt="coinLogo">
            {Coin.Logo}
          </img>
          <div className="coinName">{CoinName}</div>
          <div className="coinValueSelected">{CoinValue}</div>
          {CoinChange > 0 ? (
            <div className="greenChange">+{CoinChange}%</div>
          ) : (
            <div className="redChange">{CoinChange}%</div>
          )}
        </motion.div>
      )}
      {!isSelected && (
        <div className="coinGr">
          <img className="coinLogo" src={CoinLogo} alt="coinLogo">
            {Coin.Logo}
          </img>
          <div className="coinName">{CoinName}</div>
          <div className="coinValue">{CoinValue}</div>
          {CoinChange > 0 ? (
            <div className="greenChange">+{CoinChange}%</div>
          ) : (
            <div className="redChange">{CoinChange}%</div>
          )}
        </div>
      )}
    </>
  );
}

function MyChart({ chartList, selectedIndex }) {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartList.map((e) => e.name),
        datasets: [
          {
            label: "Coin Price",
            data: chartList.map((e) => e.price),
            backgroundColor: chartList.map((e, index) =>
              index === selectedIndex ? "yellow" : "red"
            ),
            borderColor: "white",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
          x: {
            ticks: {
              color: chartList.map((e, index) =>
                index === selectedIndex ? "yellow" : "white"
              ),
              padding: 10,
              font: {
                size: 5, // Adjust font size
              },
            },
          },
        },
        elements: {
          point: {
            radius: chartList.map((e, index) =>
              index === selectedIndex ? 7 : 3
            ), // Adjust the point radius here
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [chartList]);

  return (
    <div className="coinsChart">
      <canvas ref={chartRef} />
    </div>
  );
}

function CoinGraphics() {
  const [graphicsList, setGraphicsList] = useState([]);
  const [sCoinIndex, setSCoinIndex] = useState(0);
  const [coinVName, setCoinVName] = useState("");
  const [responseValid, setResponseValid] = useState(false);

  let filteredGraphicsList = graphicsList.filter((el) =>
    el.name.toUpperCase().includes(coinVName.toUpperCase())
  );

  let graphicsDes = filteredGraphicsList.map((e, index) => (
    <Coin
      CoinName={e.name}
      CoinValue={e.price + "$"}
      CoinLogo={e.iconUrl}
      CoinChange={e.change}
      isSelected={index === sCoinIndex}
    />
  ));

  function handleChange(e) {
    setCoinVName(e.target.value);
  }

  useEffect(() => {
    const options = {
      headers: {
        "x-access-token":
          "coinranking0932477bb045d38988b7564f24af2967be9ffbc7e5bf9799",
      },
    };
    fetch("https://api.coinranking.com/v2/coins", options)
      .then((response) => response.json())
      .then((result) => {
        setGraphicsList(result.data.coins);
        setResponseValid(true);
      });
    const intervalId = setInterval(() => {
      setSCoinIndex(Math.floor(Math.random() * filteredGraphicsList.length));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [filteredGraphicsList.length]);

  return (
    <div className="GraphicsBackGround">
      <h1 className="graphTitleBar">Famous Crypto Prices :</h1>
      <input
        className="cryptoName"
        type="text"
        value={coinVName}
        placeholder="Search Coin name"
        onChange={handleChange}
      ></input>
      {filteredGraphicsList.length !== 0 &&
        sCoinIndex < filteredGraphicsList.length && (
          <div className="legendCoin">
            <div className="selectedCoin">
              <img
                className="selectedCoinImg"
                src={filteredGraphicsList[sCoinIndex].iconUrl}
                alt="selectedCoinLogo"
              />
              <div>{filteredGraphicsList[sCoinIndex].name}</div>
            </div>
            <div>{filteredGraphicsList[sCoinIndex].price + "$"}</div>
          </div>
        )}
      {responseValid && 
        <div>
          <MyChart
              chartList={filteredGraphicsList}
              selectedIndex={sCoinIndex}
          />
          <div className="centeredCoinL">{graphicsDes}</div>
        </div>
      }
      {!responseValid && (
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 360, 360, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            padding: "7vh",
          }}
        >
          Loading
        </motion.div>
      )}
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
