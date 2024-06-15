import {PokerCard} from "./Poker";
import {motion} from "framer-motion"

import pokerPlayerLogo from "../../Logos/pokerPlayer.svg";

export class pokerPlayer {
    constructor(name, indexer, stack, bet, hands, timer, action){
        this.name = name;
        this.indexer = indexer;
        this.stack = stack;
        this.bet = bet;
        this.hands = hands;
        this.timer = null;
        this.action = action;
    }
}

export function Player({
    playerName,
    playerIndexer,
    playerIndex,
    playerStack,
    playerBet,
    playerCards,
    playerTimer,
    playerAction,
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
    let playerIsActive = (playerIndexer === playerIndex );
    return (
      <div className="playerProfile">
        <img className="playerLogo" src={pokerPlayerLogo} alt="playerLogo" />
        <div className="playerName">{playerName}</div>
        <div className="playerStack">Stack: {playerStack}$</div>
        <div className="playerBet">Bet: {playerBet}$</div>
        <div className="playerCards">{playerCardsFig}</div>
        {playerIsActive && (
          <div className="playerTimerW">
            ^ Remaining Time ^
            <motion.div className="playerTimer">{playerTimer}s</motion.div>
            {playerAction !== null && <div>{playerAction}</div>}
          </div>
        )}
      </div>
    );
  }