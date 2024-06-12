import "../../ComponentStyle/PokerStyle/Poker.css";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SliderWithLimits from "../../Component/Subcomponent/SliderWithLimits";

import pokerPlayer from "../../Logos/pokerPlayer.svg";
import hiddenCard from "../../Logos/Poker/hiddenCard.svg";


let pokerHands = [
  "High Card",
  "Pair",
  "Double Pair",
  "Three of a Kind",
  "Straight",
  "Flush",
  "Full House",
  "Four of a Kind",
  "Straight Flush",
  "Royal Flush",
];

let pokerCardTypes = [
  "Clubs",
  "Diamonds",
  "Hearts",
  "Spades",
]

let smallBlind = 50;
let bigBlind = 100;
let defaultPlayTimer = 1;

export default function PokerGame({ playersCount }) {
  let countArray = [...Array(playersCount).keys()];  
  let playersNames = countArray.map((e) => "Player " + e);
  let playersStack = playersNames.map((e) => 10000);
  let playersBet = playersNames.map((e,index) => index === 0 ? bigBlind : (index === 1 ? smallBlind : 0));
  
  let playersDeck = [1, 2].map((e) => {
    let generatedCard = generateCards("deck");
    return { cardType: generatedCard[0], cardNumber: generatedCard[1], cardEmp: "deck" };
  });
  let playersCards = playersNames.map((e) => 
    {
      let generatedCard1 = generateCards("hands");
      let generatedCard2 = generateCards("hands");
      return [{ cardType: generatedCard1[0], cardNumber: generatedCard1[1], cardEmp: "plr" },
              { cardType: generatedCard2[0], cardNumber: generatedCard2[1], cardEmp: "plr" }]
    });

  let [nameList, setNameList] = useState(playersNames);
  let [firstName, setFirstName] = useState("");
  let [playerIndex, setPlayerIndex] = useState(0);
  let [playTimer, setPlayTimer] = useState(defaultPlayTimer);
  let [stackList, setStackList] = useState(playersStack);
  let [betList, setBetList] = useState(playersBet);
  let [deckList, setDeckList] = useState(playersDeck);
  let [cardList, setCardList] = useState(playersCards);
  let [isPotWon, setIsPotWon] = useState(false);
  
  let myPlyrName = nameList[0];
  let myPlyrStack = stackList[0];
  let myPlyrBet = betList[0];
  let myPlyrCards = [
    { ...cardList[0][0], cardEmp: "firstp" },
    { ...cardList[0][1], cardEmp: "firstp" },
  ];

  let GameHasEnded = false;  
  let currentBet = Math.max(betList);
  let myPlyrCallCheck = myPlyrBet < currentBet ? "Call" : "Check";
  let GameHasStarted = myPlyrName !== "Player 0";
  let roundIsOn = GameHasStarted && !GameHasEnded && !isPotWon;

  function handleFirstPersonName() {
    if (firstName === "" || firstName === "Choose another name") {
      setFirstName("Choose another name");
      return 0;
    }
    let newNamelist = [...nameList];
    newNamelist[0] = firstName;
    setNameList(newNamelist);
  }

  function handleNameForm(e){
    e.preventDefault();
    handleFirstPersonName();
  }

  useEffect(() => {
    let timer = setInterval(() => {
      setPlayTimer((time) => {
        if (time === 0) {
          if (roundIsOn) {
            setPlayerIndex((playerIndex + 1) % playersCount);
            return defaultPlayTimer;
          }
          return 0;
        } 
        else { 
          if(roundIsOn){
            return time - 1;
          }
          return defaultPlayTimer;
        }
      });
    }, 1000);
    if( deckList.length === 5 && playerIndex === playersCount-1 ){
      setIsPotWon(true);
      //setGameHasEnded(true);
    }
    if(roundIsOn && playerIndex === 0 && deckList.length < 5){
      let newDeckList = [...deckList];
      let generatedCard = generateCards("deck");
      newDeckList.push({ cardType: generatedCard[0], cardNumber: generatedCard[1], cardEmp: "deck" });
      setDeckList(newDeckList);
    }
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameList, playerIndex, isPotWon, GameHasEnded]);
  
  function generateCards({ type }) {
    let cardTypeSelector = Math.floor(Math.random() * 4);
    let cardNumberSelector = Math.floor(Math.random() * 13) + 1;
    let generatedCard = [pokerCardTypes[cardTypeSelector], cardNumberSelector];
    return generatedCard;
  }

  return (
    <div className="game-wrapper">
      <div className="bench-wrapper">
      {!GameHasStarted && <form onSubmit={handleNameForm}><input
          className="first-p-name"
          type="text"
          placeholder="Choose your name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <motion.div
          className="name-button"
          onClick={handleFirstPersonName}
          whileHover={{ scale: "1.2" }}
          whileTap={{ scale: "0.9" }}
        >
          Start the game
        </motion.div></form>}
        <PlayersBench
          nameList={nameList}
          stackList={stackList}
          betList={betList}
          cardList={cardList}
          playerIndex={playerIndex}
          playTimer={playTimer}
        />
      </div>
      <div className="poker-wrapper">
        <h1 style={{ color: "yellow", paddingBottom: "50px" }}>
          Texas hold'em poker game :
        </h1>
        <PokerTable betList={betList} deckList={deckList} nameList={nameList} GameHasStarted={GameHasStarted} GameHasEnded={GameHasEnded} 
                    isPotWon={isPotWon}/>
        {playerIndex === 0 && (
          <>
            <SliderWithLimits min={0} max={myPlyrStack} />
            <div className="controls">
              <motion.div
                className="control-button"
                whileHover={{ scale: "1.2" }}
                whileTap={{ scale: "0.9" }}
              >
                {myPlyrCallCheck}
              </motion.div>
              <motion.div
                className="control-button"
                whileHover={{ scale: "1.2" }}
                whileTap={{ scale: "0.9" }}
              >
                Fold
              </motion.div>
              <motion.div
                className="control-button"
                whileHover={{ scale: "1.2" }}
                whileTap={{ scale: "0.9" }}
              >
                Raise
              </motion.div>
            </div>
          </>
        )}
        <div className="firstPerson">
          <Player
            playerName={myPlyrName}
            playerStack={myPlyrStack}
            playerBet={myPlyrBet}
            playerCards={myPlyrCards}
            playerIsActive={playerIndex === 0}
            playTimer={playTimer}
          />
        </div>
      </div>
    </div>
  );
}

function PlayersBench({
  nameList,
  stackList,
  betList,
  cardList,
  playerIndex,
  playTimer,
}) {
  let benchFig = [];
  for (let i = 1; i < nameList.length; i++) {
    benchFig.push({
      name: nameList[i],
      playerStack: stackList[i],
      playerBet: betList[i],
      playerCards: cardList[i],
    });
  }
  benchFig = benchFig.map((plr, index) => (
    <Player
      key={plr.name}
      playerName={plr.name}
      playerStack={plr.playerStack}
      playerBet={plr.playerBet}
      playerCards={plr.playerCards}
      playerIsActive={index === playerIndex - 1}
      playTimer={playTimer}
    />
  ));
  return <div className="playersBench">{benchFig}</div>;
}

function PokerTable({ deckList, betList, nameList, GameHasStarted, GameHasEnded, isPotWon }) {
  let hiddenDeck = [<PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"}/>,
                    <PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"}/>,
                    <PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"}/>];

  function handleReplay(){
    isPotWon = false;
    GameHasEnded = false;
  }

  if(!GameHasStarted){
    return (
      <div className="poker-table">
        <div className="Deck">{hiddenDeck}</div>
      </div>
    );    
  }
  else{
    if(GameHasEnded){
      return (
        <div className="poker-table">
          <div className="WinMessage">
            <h1>The winner is Mar One</h1>
            <motion.div className="replay-button"           
                        onClick={handleReplay}
                        whileHover={{ scale: "1.2" }}
                        whileTap={{ scale: "0.9" }}>Replay
            </motion.div>
          </div>
        </div>
      );
    }
    else{
      let potGains = betList.reduce((a, b) => a + b, 0);
      let winnerIndex = 0;
      return (
        <div className="poker-table">
          {!isPotWon && <Deck deckCards={deckList} />}
          {isPotWon && <div className="WinMessage"><h3>Congratulations {nameList[winnerIndex]} you won {potGains}$</h3></div>}
        </div>
      );
    }
  }
}

function Deck({ deckCards }) {
  let deckFig = [];
  deckFig = deckCards.map((card, index) => (
    <PokerCard
      key={card.cardType + card.cardNumber + index}
      cardType={card.cardType}
      cardNumber={card.cardNumber}
      cardEmp={"deck"}
    />
  ));
  return <div className="Deck">{deckFig}</div>;
}

function Player({
  playerName,
  playerStack,
  playerBet,
  playerCards,
  playerIsActive,
  playTimer,
}) {
  let playerCardsFig = [];
  playerCardsFig = playerCards.map((card, index) => (
    <PokerCard
      key={playerName + card.cardType + card.cardNumber + index}
      cardType={card.cardType}
      cardNumber={card.cardNumber}
      cardEmp={card.cardEmp}
    />
  ));
  return (
    <div className="playerProfile">
      <img className="playerLogo" src={pokerPlayer} alt="playerLogo" />
      <div className="playerName">{playerName}</div>
      <div className="playerStack">Stack: {playerStack}$</div>
      <div className="playerBet">Bet: {playerBet}$</div>
      <div className="playerCards">{playerCardsFig}</div>
      {playerIsActive && (
        <div className="playerTimerW">
          ^ Remaining Time ^
          <motion.div className="playerTimer">{playTimer}s</motion.div>
        </div>
      )}
    </div>
  );
}

function PokerCard({ cardType, cardNumber, cardEmp }) {
  return (
    <div>
      <img
        className={"poker-card-" + cardEmp}
        src={
          cardEmp === "plr" || cardEmp === "deckH"
            ? hiddenCard
            : require(`../../Logos/Poker/${cardType + cardNumber}.svg`)
        }
        alt="pokerCard"
      />
    </div>
  );
}
