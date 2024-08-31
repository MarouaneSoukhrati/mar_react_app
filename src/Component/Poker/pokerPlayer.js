import { PokerCard } from "./Poker";
import { motion } from "framer-motion";

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
  let playerIsActive = playerClass.playerIndexer === playerIndex;
  return (
    <div className="playerProfile">
      <img className="playerLogo" src={pokerPlayerLogo} alt="playerLogo" />
      <div className="playerName">{playerClass.name}</div>
      <div className="playerStack">Stack: {playerClass.stack}$</div>
      <div className="playerBet">Bet: {playerClass.bet}$</div>
      <div className="playerCards">{playerCardsFig}</div>
      {playerIsActive && (
        <div className="playerTimerW">
          ^ Remaining Time ^
          <motion.div className="playerTimer">{playerClass.timer}s</motion.div>
          {playerClass.action !== null && <div>{playerClass.action}</div>}
        </div>
      )}
    </div>
  );
}
