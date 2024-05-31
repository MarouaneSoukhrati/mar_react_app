import "../../ComponentStyle/PokerStyle/Poker.css";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SliderWithLimits from "../../Component/Subcomponent/SliderWithLimits";

import pokerPlayer from "../../Logos/pokerPlayer.svg";
import hiddenCard from "../../Logos/Poker/hiddenCard.svg";

function generateCards({ type }) {
  switch (type) {
    default:
      return Math.floor(Math.random() * 13) + 1;
  }
}

export default function PokerGame({ playersCount }) {
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
  let smallBlind = 10;
  let bigBlind = 100;
  let defaultPlayTimer = 5;

  let countArray = [...Array(playersCount).keys()];
  let playersDeck = [1, 2, 3].map((e) => {
    return { cardType: "Clubs", cardNumber: generateCards("deck") };
  });
  let [deckList, setdeckList] = useState(playersDeck);

  let playersNames = countArray.map((e) => "Player " + e);
  let playersStack = playersNames.map((e) => 10000);
  let playersBet = playersNames.map((e) => 0);
  let playersCards = playersNames.map((e) => [
    { cardType: "Clubs", cardNumber: generateCards("card1"), cardEmp: "plr" },
    { cardType: "Clubs", cardNumber: generateCards("card2"), cardEmp: "plr" },
  ]);
  let playersActions = playersNames.map((e) => "None");

  let [nameList, setNameList] = useState(playersNames);
  let [stackList, setStackList] = useState(playersStack);
  let [betList, setBetList] = useState(playersBet);
  let [cardList, setCardList] = useState(playersCards);
  let [ActionList, setActionList] = useState(playersActions);
  let [firstName, setFirstName] = useState("");

  let [GameHasStarted, setGameHasStarted] = useState(false);
  let [playTimer, setPlayTimer] = useState(defaultPlayTimer);
  let [playerIndex, setPlayerIndex] = useState(0);
  let [isPotWon, setIsPotWon] = useState(false);

  let [blinds, setBlinds] = useState([smallBlind, bigBlind]);

  let myPlyrName = nameList[0];
  let myPlyrStack = stackList[0];
  let myPlyrBet = betList[0];
  let myPlyrCards = [
    { ...cardList[0][0], cardEmp: "firstp" },
    { ...cardList[0][1], cardEmp: "firstp" },
  ];
  let currentBet = Math.max(betList);
  let myPlyrCallCheck = myPlyrBet < currentBet ? "Call" : "Check";

  function handleFirstPersonName() {
    if (firstName === "" || firstName === "Choose another name") {
      setFirstName("Choose another name");
      return 0;
    }
    let newNamelist = [...nameList];
    newNamelist[0] = firstName;
    setNameList(newNamelist);
    setGameHasStarted(true);
  }

  useEffect(() => {

    let timer = setInterval(() => {
      setPlayTimer((time) => {
        if (!GameHasStarted || isPotWon) {
          return defaultPlayTimer;
        }
        if (time === 0) {
          if (!isPotWon) {
            setPlayTimer(defaultPlayTimer);
          }
          setPlayerIndex((playerIndex + 1) % playersCount);
          return 0;
        } else return time - 1;
      });
    }, 1000);
    if( playerIndex === 0 && deckList.length === 5 ){
      setIsPotWon(true);
    }
    if(GameHasStarted && playerIndex === 0 && deckList.length < 5 && !isPotWon){
      let newDeckList = [...deckList];
      newDeckList.push({ cardType: "Clubs", cardNumber: generateCards("deck") });
      setdeckList(newDeckList);
    }
    return () => {
      clearInterval(timer);
    };

  }, [playerIndex, nameList]);

  return (
    <div className="game-wrapper">
      <div className="bench-wrapper">
        <input
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
        </motion.div>
        <PlayersBench
          nameList={nameList}
          stackList={stackList}
          betList={betList}
          cardList={cardList}
          playerIndex={playerIndex}
          playTimer={playTimer}
          GameHasStarted={GameHasStarted}
          isPotWon={isPotWon}
        />
      </div>
      <div className="poker-wrapper">
        <h1 style={{ color: "yellow", paddingBottom: "50px" }}>
          Texas hold'em poker game :
        </h1>
        <PokerTable deckList={deckList} GameHasStarted={GameHasStarted} isPotWon={isPotWon} setGameHasStarted={setGameHasStarted} setIsPotWon={setIsPotWon}/>
        {playerIndex === 0 && GameHasStarted && !isPotWon && (
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
            playerIsActive={GameHasStarted && !isPotWon && playerIndex === 0}
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
  GameHasStarted,
  isPotWon,
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
      playerIsActive={GameHasStarted && !isPotWon && index === playerIndex - 1}
      playTimer={playTimer}
    />
  ));
  return <div className="playersBench">{benchFig}</div>;
}

function PokerTable({ deckList, GameHasStarted, isPotWon, setGameHasStarted, setIsPotWon }) {
  let hiddenDeck = [<PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"}/>,
                    <PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"}/>,
                    <PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"}/>];
                    
  function handleReplay(){
    setIsPotWon(false);
    setGameHasStarted(false);
  }
  return (
    <div className="poker-table">
      {!GameHasStarted && <div className="Deck">{hiddenDeck}</div>}
      {GameHasStarted && !isPotWon && <Deck deckCards={deckList} />}
      {GameHasStarted && isPotWon && <div className="WinMessage"><h1>The Winner is Mar One</h1>
        <motion.div className="replay-button"           
                    onClick={handleReplay}
                    whileHover={{ scale: "1.2" }}
                    whileTap={{ scale: "0.9" }}>Replay</motion.div></div>}
    </div>
  );
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
      {playerIsActive && playTimer !== 0 && (
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
