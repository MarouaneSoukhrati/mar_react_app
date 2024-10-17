import { PokerCard } from "./Poker";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import pokerPlayerLogo from "../../Logos/pokerPlayer.svg";

export class pokerPlayer {
  constructor(name, indexer, stack, bet, hands, timer, action) {
    this.name = name;
    this.indexer = indexer;
    this.stack = stack;
    this.bet = bet;
    this.hands = hands;
    this.timer = timer;
    this.action = action;
  }
}

export function Player({
  playerClass,
  playerIndex,
  setPlayerIndex,
  playersCount,
  defaultPlayTimer,
  gameHasStarted,
  gameHasEnded,
  isPotWon,
}) {
  let playerCardsFig = [];
  playerCardsFig = playerClass.hands.map((card, index) => (
    <PokerCard
      key={playerClass.name + card.cardType + card.cardNumber + index}
      cardType={card.cardType}
      cardNumber={card.cardNumber}
      cardEmp={card.cardEmp}
    />
  ));
  let playerIsActive = playerClass.indexer === playerIndex;
  return (
    <div className="playerProfile">
      <img className="playerLogo" src={pokerPlayerLogo} alt="playerLogo" />
      <div className="playerName">{playerClass.name}</div>
      <div className="playerStack">Stack: {playerClass.stack}$</div>
      <div className="playerBet">Bet: {playerClass.bet}$</div>
      <div className="playerCards">{playerCardsFig}</div>
      {playerIsActive && (
        <Countdown
          playerClass={playerClass}
          playerIndex={playerIndex}
          setPlayerIndex={setPlayerIndex}
          playersCount={playersCount}
          defaultPlayTimer={defaultPlayTimer}
          gameHasStarted={gameHasStarted}
          gameHasEnded={gameHasEnded}
          isPotWon={isPotWon}
        />
      )}
      {playerClass.action !== null && <div>{playerClass.action}</div>}
    </div>
  );
}

function Countdown({
  playerClass,
  playerIndex,
  setPlayerIndex,
  playersCount,
  defaultPlayTimer,
  gameHasStarted,
  gameHasEnded,
  isPotWon,
}) {
  const [time, setTime] = useState(playerClass.timer);
  let isRoundOn = gameHasStarted && !gameHasEnded && !isPotWon;
  useEffect(() => {
    if (!isRoundOn) {
      return;
    } else {
      let playerTimer = setInterval(() => {
        if (playerClass.timer === 0) {
          setTime(0);
          clearInterval(playerTimer);
          setPlayerIndex((playerIndex + 1) % playersCount);
          playerClass.timer = defaultPlayTimer;
        } else {
          playerClass.timer -= 1;
          setTime(playerClass.timer);
        }
      }, 1000);
    }
  }, [
    playerClass,
    playerIndex,
    isRoundOn,
    playersCount,
    defaultPlayTimer,
    setPlayerIndex,
  ]);

  return (
    <>
      {isRoundOn && (
        <div className="playerTimerW">
          ^ Remaining Time ^
          <motion.div className="playerTimer">{time}s</motion.div>
        </div>
      )}
    </>
  );
}
