import '../../ComponentStyle/PokerStyle/Poker.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SliderWithLimits from "../../Component/Subcomponent/SliderWithLimits";

import pokerPlayer from "../../Logos/pokerPlayer.svg";
import hiddenCard from "../../Logos/Poker/hiddenCard.svg";

export default function PokerGame({playersCount}){
    let pokerHands = ['High Card', 'Pair', 'Double Pair', 'Three of a Kind', 
    'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush', 'Royal Flush'];

    let countArray = [...Array(playersCount).keys()];
    let playersDeck = [1,2,3].map(e => {return {cardType:"Clubs", cardNumber: generateCards("deck")}});
    let [deckList, setdeckList] = useState(playersDeck);

    let playersNames = countArray.map(e => "Player "+e);
    let playersPot = playersNames.map(e => 10000);
    let playersBet = playersNames.map(e => 0);
    let playersCards = playersNames.map(e => [{cardType:"Clubs", cardNumber:generateCards("card1"), cardEmp:"plr"}, {cardType:"Clubs", cardNumber:generateCards("card2"), cardEmp:"plr"}])
    let playersActions = playersNames.map(e => "Call");

    let [nameList, setNameList] = useState(playersNames);
    let [potList, setPotList] = useState(playersPot);
    let [betList, setBetList] = useState(playersBet);
    let [cardList, setCardList] = useState(playersCards);
    let [ActionList, setActionList] = useState(playersActions);
    let [firstName, setFirstName] = useState("");
    
    let [playerIndex, setPlayerIndex] = useState(0);
    let [blinds, setBlinds] = useState([10,100]);

    let myPlyrName = nameList[0];
    let myPlyrPot = potList[0];
    let myPlyrBet = betList[0];
    let myPlyrCards = [{...cardList[0][0], cardEmp:"firstp"}, {...cardList[0][1], cardEmp:"firstp"}];
    let myPlyrCallCheck = myPlyrBet < Math.max(betList) ? 'Call' : 'Check';
    
    function handleFirstPersonName(){
        let newNamelist = [...nameList];
        newNamelist[0] = firstName;
        setNameList(newNamelist);
    }

    function generateCards({type}){
        switch(type){
            default: return Math.floor(Math.random() * 13) + 1;
        }
    }

    return(
        <div className='game-wrapper'>
            <div className='bench-wrapper'>
                <input className="first-p-name" type='text' placeholder='Choose your name' value={firstName} onChange={e=> setFirstName(e.target.value)}/>
                <motion.div className='name-button' onClick={handleFirstPersonName} whileHover={{scale:"1.2"}} whileTap={{scale:"0.9"}}>Submit</motion.div>
                <PlayersBench nameList={nameList} potList={potList} betList={betList} cardList={cardList} playerIndex={playerIndex}/>
            </div>
            <div className='poker-wrapper'>
                <h1 style={{color:"yellow", paddingBottom: "50px"}}>Poker Game :</h1>
                <PokerTable deckList={deckList}/>
                <SliderWithLimits
                    min={0}
                    max={myPlyrPot}/>
                <div className='controls'>
                    <motion.div className='control-button' whileHover={{scale:"1.2"}} whileTap={{scale:"0.9"}}>{myPlyrCallCheck}</motion.div>
                    <motion.div className='control-button' whileHover={{scale:"1.2"}} whileTap={{scale:"0.9"}}>Fold</motion.div>
                    <motion.div className='control-button' whileHover={{scale:"1.2"}} whileTap={{scale:"0.9"}}>Raise</motion.div>
                </div>
                <div className='firstPerson'>
                    <Player playerName={myPlyrName} playerPot={myPlyrPot} playerBet={myPlyrBet} 
                    playerCards={myPlyrCards} playerIsActive={playerIndex===0}/>
                </div>
            </div>
        </div>
    );
}

function PlayersBench({nameList, potList, betList, cardList, playerIndex, playTimer}){
    let benchFig = [];
    for(let i = 1 ; i < nameList.length ; i++){
        benchFig.push({name: nameList[i], playerPot: potList[i], playerBet: betList[i], playerCards: cardList[i]});
    }
    benchFig = benchFig.map((plr, index) => <Player key={plr.name} playerName={plr.name} playerPot={plr.playerPot} playerBet={plr.playerBet} 
                                    playerCards={plr.playerCards} playerIsActive={index===playerIndex-1} playTimer={playTimer}/>);
    return(
        <div className='playersBench'>
            {benchFig}
        </div>
    );
}

function PokerTable({deckList}){
    return(
        <div className='poker-table'>
            <Deck deckCards={deckList} />
        </div>
    );
}

function Deck({deckCards}){
    let deckFig = [];
    deckFig = deckCards.map((card,index) => <PokerCard key={card.cardType+card.cardNumber+index} cardType={card.cardType} cardNumber={card.cardNumber} cardEmp={"deck"}/>);
    return(
        <div className="Deck">
            {deckFig}
        </div>
    );
}

function Player({playerName, playerPot, playerBet, playerCards, playerIsActive}){
    let playerCardsFig = [];
    playerCardsFig = playerCards.map((card,index) => <PokerCard key={playerName+card.cardType+card.cardNumber+index} cardType={card.cardType} cardNumber={card.cardNumber} cardEmp={card.cardEmp}/>);
    
    let [playTimer, setPlayTimer] = useState(120);
    useEffect(() => {
        let timer = setInterval(() => {
          setPlayTimer((time) => {
            if (time === 0) {
              clearInterval(timer);
              return 0;
            } else return time - 1;
          });
        }, 1000);
        console.log('i fire once');
      }, []);

    return(
        <div className="playerProfile">
            <img className="playerLogo" src={pokerPlayer} alt="playerLogo"/>
            <div className="playerName">{playerName}</div>
            <div className="playerPot">Pot: {playerPot}$</div>
            <div className="playerBet">Bet: {playerBet}$</div>
            <div className='playerCards'>{playerCardsFig}</div>
            {playerIsActive && <div className='playerTimerW'>^ Remaining Time ^<motion.div className='playerTimer'>{playTimer}s</motion.div></div>}
        </div>
    );
}

function PokerCard({cardType, cardNumber, cardEmp}) {      
    return (
        <div>
            <img className={"poker-card-"+cardEmp} src={cardEmp==="plr" ? hiddenCard : require(`../../Logos/Poker/${cardType+cardNumber}.svg`)} alt="pokerCard"/>
        </div>
    );
}