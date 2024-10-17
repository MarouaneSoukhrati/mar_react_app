import "../../ComponentStyle/PokerStyle/Poker.css";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SliderWithLimits from "../../Component/Subcomponent/SliderWithLimits";
import { Player, pokerPlayer } from "./pokerPlayer";

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
let pokerCardTypes = ["Clubs", "Diamonds", "Hearts", "Spades"];
let smallBlind = 50;
let bigBlind = 100;
let defaultPlayTimer = 3;

function initialiseFirstPlayer() {
  let generatedCard1 = generateCards("hands");
  let generatedCard2 = generateCards("hands");
  let firstPlayer = new pokerPlayer(
    "Player 0",
    0,
    1000,
    smallBlind,
    [
      {
        cardType: generatedCard1[0],
        cardNumber: generatedCard1[1],
        cardEmp: "firstp",
      },
      {
        cardType: generatedCard2[0],
        cardNumber: generatedCard2[1],
        cardEmp: "firstp",
      },
    ],
    defaultPlayTimer,
    null
  );
  return firstPlayer;
}

function initialisePlayers(playersCount) {
  let playersList = [];
  for (let i = 0; i < playersCount - 1; i++) {
    let generatedCard1 = generateCards("hands");
    let generatedCard2 = generateCards("hands");
    let player = new pokerPlayer(
      "Player " + (i + 1),
      i + 1,
      1000,
      i === 0 ? bigBlind : 0,
      [
        {
          cardType: generatedCard1[0],
          cardNumber: generatedCard1[1],
          cardEmp: "plr",
        },
        {
          cardType: generatedCard2[0],
          cardNumber: generatedCard2[1],
          cardEmp: "plr",
        },
      ],
      defaultPlayTimer,
      null
    );
    playersList.push(player);
  }
  return playersList;
}

function initialiseDeck() {
  let playersDeck = [1, 2, 3].map((e) => {
    let generatedCard = generateCards("deck");
    return {
      cardType: generatedCard[0],
      cardNumber: generatedCard[1],
      cardEmp: "deck",
    };
  });
  return playersDeck;
}

let usedCards = [];

function generateCards({ type }) {
  let cardTypeSelector = Math.floor(Math.random() * 4);
  let cardNumberSelector = Math.floor(Math.random() * 13) + 1;
  let generatedCard = [pokerCardTypes[cardTypeSelector], cardNumberSelector];

  while (usedCards.includes(generatedCard)) {
    cardTypeSelector = Math.floor(Math.random() * 4);
    cardNumberSelector = Math.floor(Math.random() * 13) + 1;
    generatedCard = [pokerCardTypes[cardTypeSelector], cardNumberSelector];
  }
  usedCards.push(generatedCard);
  return generatedCard;
}

export default function PokerGame({ playersCount }) {
  const [playersList, setPlayersList] = useState(
    initialisePlayers(playersCount)
  );
  const [firstPlayer, setFirstPlayer] = useState(initialiseFirstPlayer());
  const [firstName, setFirstName] = useState("");
  const [playerIndex, setPlayerIndex] = useState(0);
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [isPotWon, setIsPotWon] = useState(false);
  const [deckList, setDeckList] = useState(initialiseDeck());
  const [gameHasStarted, setGameHasStarted] = useState(false);

  let currentBet = Math.max(
    ...playersList.map((plr) => plr.bet),
    firstPlayer.bet
  );
  let myPlyrCallCheck = firstPlayer.bet < currentBet ? "Call" : "Check";
  let isRoundOn = gameHasStarted && !gameHasEnded && !isPotWon;

  function handleNameForm(e) {
    e.preventDefault();
  }

  function handleFirstPersonName() {
    if (firstName === "" || firstName === "Choose another name") {
      setFirstName("Choose another name");
      return;
    }
    setFirstPlayer({ ...firstPlayer, name: firstName });
    setGameHasStarted(true);
  }

  useEffect(() => {
    if (!isRoundOn) {
      return;
    } else {
      if (playerIndex === playersCount - 1 && deckList.length === 5) {
        setIsPotWon(true);
      }
      if (playerIndex === 0 && deckList.length < 5) {
        let newDeckList = [...deckList];
        let generatedCard = generateCards("deck");
        newDeckList.push({
          cardType: generatedCard[0],
          cardNumber: generatedCard[1],
          cardEmp: "deck",
        });
        setDeckList(newDeckList);
      }
    }
  }, [deckList, playersCount, playerIndex, isRoundOn]);

  function firstPlayerHandleFold() {
    return;
  }

  function firstPlayerHandleRaise() {
    return;
  }

  function firstPlayerHandleCallOrCheck() {
    return;
  }

  return (
    <div className="game-wrapper">
      <div className="bench-wrapper">
        {!gameHasStarted && (
          <form className="gameForm" onSubmit={handleNameForm}>
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
          </form>
        )}
        <PlayersBench
          playersList={playersList}
          playerIndex={playerIndex}
          setPlayerIndex={setPlayerIndex}
          playersCount={playersCount}
          defaultPlayTimer={defaultPlayTimer}
          gameHasStarted={gameHasStarted}
          gameHasEnded={gameHasEnded}
          isPotWon={isPotWon}
        />
      </div>
      <div className="poker-wrapper">
        <h1 style={{ color: "yellow", paddingBottom: "50px" }}>
          Texas hold'em poker game :
        </h1>
        <PokerTable
          deckList={deckList}
          firstPlayer={firstPlayer}
          playersList={playersList}
          gameHasStarted={gameHasStarted}
          gameHasEnded={gameHasEnded}
          setGameHasEnded={setGameHasEnded}
          isPotWon={isPotWon}
          setIsPotWon={setIsPotWon}
        />
        {playerIndex === 0 && isRoundOn && (
          <>
            <div className="slider-wrapper">
              {true && <SliderWithLimits min={0} max={firstPlayer.stack} />}
            </div>
            <div className="controls">
              <motion.div
                className="control-button"
                whileHover={{ scale: "1.2" }}
                whileTap={{ scale: "0.9" }}
                onClick={firstPlayerHandleCallOrCheck}
              >
                {myPlyrCallCheck}
              </motion.div>
              <motion.div
                className="control-button"
                whileHover={{ scale: "1.2" }}
                whileTap={{ scale: "0.9" }}
                onClick={firstPlayerHandleFold}
              >
                Fold
              </motion.div>
              <motion.div
                className="control-button"
                whileHover={{ scale: "1.2" }}
                whileTap={{ scale: "0.9" }}
                onClick={firstPlayerHandleRaise}
              >
                Raise
              </motion.div>
            </div>
          </>
        )}
        <div className="firstPerson">
          <Player
            playerClass={firstPlayer}
            playerIndex={playerIndex}
            setPlayerIndex={setPlayerIndex}
            playersCount={playersCount}
            defaultPlayTimer={defaultPlayTimer}
            gameHasStarted={gameHasStarted}
            gameHasEnded={gameHasEnded}
            isPotWon={isPotWon}
          />
        </div>
      </div>
    </div>
  );
}

function PlayersBench({
  playersList,
  playerIndex,
  setPlayerIndex,
  playersCount,
  defaultPlayTimer,
  gameHasStarted,
  gameHasEnded,
  isPotWon,
}) {
  let benchFig = playersList.map((plr) => (
    <Player
      key={plr.name}
      playerClass={plr}
      playerIndex={playerIndex}
      setPlayerIndex={setPlayerIndex}
      playersCount={playersCount}
      defaultPlayTimer={defaultPlayTimer}
      gameHasStarted={gameHasStarted}
      gameHasEnded={gameHasEnded}
      isPotWon={isPotWon}
    />
  ));
  return <div className="playersBench">{benchFig}</div>;
}

function PokerTable({
  deckList,
  firstPlayer,
  playersList,
  gameHasStarted,
  gameHasEnded,
  setGameHasEnded,
  isPotWon,
  setIsPotWon,
}) {
  let hiddenDeck = [
    <PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"} />,
    <PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"} />,
    <PokerCard cardType={"None"} cardNumber={"None"} cardEmp={"deckH"} />,
  ];

  function handleReplay() {
    setIsPotWon(false);
    setGameHasEnded(false);
  }

  if (!gameHasStarted) {
    return (
      <div className="poker-table">
        <div className="Deck">{hiddenDeck}</div>
      </div>
    );
  } else {
    let gameWinnerIndex = 0;
    if (gameHasEnded) {
      return (
        <div className="poker-table">
          <div className="WinMessage">
            <h1>
              The winner is{" "}
              {gameWinnerIndex === 0
                ? firstPlayer.name
                : playersList[gameWinnerIndex].name}
            </h1>
            <motion.div
              className="replay-button"
              onClick={handleReplay}
              whileHover={{ scale: "1.2" }}
              whileTap={{ scale: "0.9" }}
            >
              Replay
            </motion.div>
          </div>
        </div>
      );
    } else {
      let potGains = 0; //
      let winnerIndex = 0;
      return (
        <div className="poker-table">
          {!isPotWon && <Deck deckCards={deckList} />}
          {isPotWon && (
            <div className="WinMessage">
              <h3>
                Congratulations{" "}
                <span style={{ color: "white" }}>
                  {winnerIndex === 0
                    ? firstPlayer.name
                    : playersList[winnerIndex].name}
                </span>{" "}
                you won <span style={{ color: "red" }}>{potGains}$</span> !
              </h3>
            </div>
          )}
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

export function PokerCard({ cardType, cardNumber, cardEmp }) {
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
