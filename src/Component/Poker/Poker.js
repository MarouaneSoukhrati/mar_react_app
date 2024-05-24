import '../../ComponentStyle/PokerStyle/Poker.css';
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SliderWithLimits from "../../Component/Subcomponent/SliderWithLimits";


import marouaneLogo from "../../Logos/marouane-logo.svg";

export default function PokerGame({playersCount=4}){
    return(
        <div className='game-wrapper'>
            <PlayersBench/>
            <div className='poker-wrapper'>
                <h1 style={{color:"yellow", paddingBottom: "50px"}}>Poker Game :</h1>
                <PokerTable playersCount={playersCount}/>
                <SliderWithLimits
                    min={0}
                    max={1000}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}/>
                <div className='controls'>
                    <motion.div className='control-button' whileHover={{scale:"1.2"}} whileTap={{scale:"0.9"}}>Call</motion.div>
                    <motion.div className='control-button' whileHover={{scale:"1.2"}} whileTap={{scale:"0.9"}}>Fold</motion.div>
                    <motion.div className='control-button' whileHover={{scale:"1.2"}} whileTap={{scale:"0.9"}}>Raise</motion.div>
                </div>
                <div className='firstPerson'>
                    <Player playerName={"Marouane"} playerPot={"100"} playerBet={"10"}/>
                    <div className='firstPersonCards'>
                        <PokerCard cardType={"Clubs"} cardNumber={1} cardEmp={"firstp"}/>
                        <PokerCard cardType={"Clubs"} cardNumber={1} cardEmp={"firstp"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PlayersBench(){
    return(
        <div className='playersBench'>
            <h3 className='BenchPlayerTitle'>Players:</h3>
            <Player playerName={"Marouane"} playerPot={"100"} playerBet={"10"}/>
            <Player playerName={"Marouane"} playerPot={"100"} playerBet={"10"}/>
            <Player playerName={"Marouane"} playerPot={"100"} playerBet={"10"}/>
            <Player playerName={"Marouane"} playerPot={"100"} playerBet={"10"}/>
        </div>
    );
}

function PokerTable({playersCount}){
    let countArray = [...Array(playersCount).keys()];
    
    let playersNames = countArray.map(e => "Player" + e);
    let playersPot = playersNames.map(e => 50000);
    let playersBet = playersNames.map(e => 0);
    let playersCards = playersNames.map(e => [{cardType:"Clubs", cardNumber:1}, {cardType:"Clubs", cardNumber:1}])
    let playersDeck = [1,2,3].map(e => {return {cardType:"Clubs", cardNumber:e}})
    
    let [potList, setPotList] = useState(playersPot);
    let [betList, setBetList] = useState(playersBet);
    let [cardList, setCardList] = useState(playersCards);
    let [deckList, setdeckList] = useState(playersDeck);

    return(
        <div className='poker-table'>
            <Deck2 deckCards={deckList} />
        </div>
    );
}

function Deck({deckCards}){
    let deckFig = [];
    for( const card in deckCards ){
        deckFig.push(<PokerCard cardType={card.cardType} cardNumber={card.cardNumber} cardEmp={"deck"}/>);
    }
    return(
        <div className="Deck">
            {deckFig}
        </div>
    );
}

function Deck2(){
    return(
        <div className="Deck">
            <PokerCard cardType={"Clubs"} cardNumber={1} cardEmp={"deck"}/>
            <PokerCard cardType={"Hearts"} cardNumber={'K'} cardEmp={"deck"}/>
            <PokerCard cardType={"Clubs"} cardNumber={7} cardEmp={"deck"}/>
        </div>
    );
}

function Player({playerName, playerPot, playerBet}){
    return(
        <div className="playerProfile">
            <img className="playerLogo" src={marouaneLogo} alt="playerLogo"/>
            <div className="playerName">{playerName}</div>
            <div className="playerPot">Pot: {playerPot}$</div>
            <div className="playerBet">Bet: {playerBet}$</div>
        </div>
    );
}

function PokerCard({cardType, cardNumber, cardEmp}) {      
    return (
        <div>
            <img className={"poker-card-"+cardEmp} src={require(`../../Logos/Poker/${cardType+cardNumber}.svg`)} alt="pokerCard"/>
        </div>
    );
}