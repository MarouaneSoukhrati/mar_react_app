import { PokerCard } from "./Poker";
import { motion } from "framer-motion";

import pokerPlayerLogo from "../../Logos/pokerPlayer.svg";
import { useEffect } from "react";
import { useState } from "react";

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

export function Player({ playerClass, playerIndex }) {
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
      {playerIsActive && <Countdown playerClass={playerClass} />}
      {playerClass.action !== null && <div>{playerClass.action}</div>}
    </div>
  );
}

function Countdown({ playerClass }) {
  const [time, setTime] = useState(playerClass.timer);
  useEffect(() => {
    let playerTimer = setInterval(() => {
      if (playerClass.timer === 0) {
        setTime(0);
        clearInterval(playerTimer);
      } else {
        playerClass.timer -= 1;
        setTime(playerClass.timer);
      }
    }, 1000);
    return () => clearInterval(playerTimer);
  }, [playerClass]);

  return (
    <div className="playerTimerW">
      ^ Remaining Time ^<motion.div className="playerTimer">{time}s</motion.div>
    </div>
  );
}
