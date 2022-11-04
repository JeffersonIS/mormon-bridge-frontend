import React, { useEffect, useState } from 'react';
import {Button, Row, Col, Form, ButtonGroup } from 'react-bootstrap';
import './game.css';
import FaceCard from '../FaceCard/FaceCard';
import PopupModal from './PopupModal';

function GamePlaying(props){
    const [playCardDisabled, setPlayCardDisabled] = useState(true);
    const [betButtonDisabled, setBetButtonDisabled] = useState(false);
    const [isLeadPlayerText, setIsLeadPlayerText] = useState('');
    const [isCurrentTurnClass, setIsCurrentTurnClass] = useState('');
    // const [isCurrentTurn, setIsCurrentTurn] = useState(false);
    const [cardSelected, setCardSelected] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [bet, setBet] = useState(0);

    let gameState = props.gameState;

    let players = gameState.players.slice();

    let opponents = players.filter((opponent) => {
        return opponent.socketId !== props.playerId;
    });

    let player = players.find((item) => {
        return item.socketId === props.playerId;
    })

    const handleSelectCard = (cardNum) => {
        let num;
        if(cardNum){
            num = cardNum.length > 0 ? cardNum[0] : cardNum

            if(gameState.currentPlayerTurnId === player.socketId){

                setCardSelected(num);
                setPlayCardDisabled(false);        
            }
        }
    }

    const handlePlayCard = () => {
        setErrorMessage('');
        if(cardSelected){
            setPlayCardDisabled(true);
            props.playCard(cardSelected);
            setCardSelected(null);
        } else {
            setErrorMessage('Select a card');
        }

        if(betButtonDisabled){
            setBetButtonDisabled(false);
        }
    }

    const handleSetBet = (bet) => {
        setErrorMessage('');

        if(bet){
            setBet(bet);
            setBetButtonDisabled(false);
        }
    }

    const handleBet = () => {
        if(bet){
            setErrorMessage('');
            if(bet <= gameState.numCardsToDeal) {
                setBetButtonDisabled(true);
                setErrorMessage('');
                props.placeBet(bet);
                setBet(null);
            } else {
                setErrorMessage(`Bet is too big`)
            }
        } else {
            setErrorMessage(`Enter a bet`)
        }
    }

    useEffect(() => {
        if(gameState.leadPlayerId === player?.socketId){
            setIsLeadPlayerText('(Lead)');
        } else{
            setIsLeadPlayerText('');
        }

        if(gameState.currentPlayerTurnId === player?.socketId){
            // setIsCurrentTurn(true);
            setIsCurrentTurnClass('current-player-turn');
            setPlayCardDisabled(false);
        } else {
            setIsCurrentTurnClass('');
            // setIsCurrentTurn(false);
        }

        if(gameState.showTurnOverModal){
            console.log('Show Turn over Modal');
        }

    }, [gameState, player])

    return(
        <div>
            <PopupModal 
                showModal={gameState?.showModal} 
                opponents={opponents} 
                player={player} 
                gameState={gameState}
                playerId={props.playerId}
            />

            <Row className='text-center m-1 table-header'>
            <h5 className='text-center'>
                <span className='table-header-text'>Round {gameState.roundNum} - {player?.name}</span>
            </h5>

                <Col xs={6} >
                    {/* <h6 className='text-center m-0'>Round {gameState.roundNum}</h6> */}
                    <div className="message-board">
                        {gameState?.gameMessages?.map((message, count) => {
                            let classString = count % 2 ? 'grey-message' : ''
                            return(
                                <p className={`${classString}`} key={count}>{message} </p>
                            )
                        })}
                    </div>
                    
                </Col>
                <Col xs={3} className="p-0" style={{marginLeft: '-4px'}}>
                    <FaceCard 
                        cardNum={gameState.trumpCard}
                        classString={`card-trump-lead`}/>                    
                    <div className='table-header-text'>Trump</div>

                </Col>
                <Col xs={3} className="p-0" >
                    <FaceCard 
                        cardNum={gameState.leadCard}
                        classString={`card-trump-lead`}
                     />
                    <div className='table-header-text'>Lead</div>
                </Col>

            </Row>

            <div className='opp-row'>
                {opponents?.map((opponent, count) => {
                    let classString = count % 2 ? 'col-right' : 'col-left'
                    let leadText = opponent.socketId === gameState.leadPlayerId ? '(Lead)' : '';
                    opponent.socketId === gameState.currentPlayerTurnId ? classString += ' current-player-turn' : classString += '';


                    return(
                        <div className={`opp-col ${classString}`} key={count}>
                            {opponent?.cardPlayedThisTurn ?
                                <FaceCard
                                classString={`facecard card-opponent`}
                                cardNum={opponent.cardPlayedThisTurn}
                                /> 
                                :
                                <FaceCard
                                classString={`facecard card-opponent`}
                                cardNum={gameState.deckStyleNum}
                                />                       
                            }
                            <div className='opponent-info'>
                                <div><b>{opponent?.name} </b><small>{leadText}</small></div>
                                {gameState.roundStatus === 0 ? 
                                    <div><small>Bet: <b>--</b></small></div>
                                :
                                    <div><small>Bet: <b>{opponent?.tricksBet}</b></small></div>
                                }
                                <div><small>Tricks: <b>{opponent?.tricksWon}</b></small></div>
                                <div><small>Points: <b>{opponent?.points}</b></small></div>
                            </div>

                        </div>
                    )
                })}
            </div>
            <Row className='mt-3 text-center player-seat-row'>
                <Col className={`player-seat ${isCurrentTurnClass}`}>
                    <div className='player-info mb-2'>
                        <div><small>{isLeadPlayerText}</small></div>
                        <div><small>Bet: <b>{player?.tricksBet}</b></small></div>
                        <div><small>Tricks Won: <b>{player?.tricksWon}</b></small></div>
                        <div><small>Points: <b>{player?.points}</b></small></div>
                    </div>    

                    <div className='player-cards-row mt-1'>
                        {player?.cardsInHand?.map((cardNum) => {
                            let classString = cardNum === cardSelected ? 'active-card' : '';

                            classString += cardNum === player.cardPlayedThisTurn ? ' card-played ' : '';
                            classString += player.socketId === gameState.currentPlayerTurnId ? ' card-player-hover' : '';

                            return(
                                <>
                                    <span key={cardNum} onClick={() => {handleSelectCard(cardNum)}}>
                                        <FaceCard 
                                            classString={`card-player ${classString}`}
                                            cardNum={cardNum}
                                        >
                                        </FaceCard>
                                    </span>
                                </>
                            )
                        })}
                    </div>

                    <Row className='mt-2'>

                        {gameState.roundStatus === 0 ? 
                            <>
                                <Col>
                                    <Form.Control 
                                    type="number"
                                    placeholder='enter bet'
                                    min="0"
                                    max={gameState.numCardsToDeal}
                                    onChange={(e) => {handleSetBet(e.target.value)}}
                                    ></Form.Control>
                                </Col>
                                <Col>
                                <ButtonGroup className='d-flex'>
                                <Button 
                                    className='btn-block btn-hover'
                                    variant="success" 
                                    style={{backgroundColor: "#346d43"}}
                                    onClick={(e) => {handleBet(e)}}
                                    disabled={betButtonDisabled}
                                    >Submit Bet</Button>                              
                                </ButtonGroup>
                                <Form.Text style={{color: '#ff000092'}} className='error-message'>{errorMessage}</Form.Text>

                                </Col>
                            </>
                            :
                            <>
                            <Col>
                            <ButtonGroup className='d-flex btn-play-card-group'>
                                <Button 
                                    className='btn-block btn-hover'
                                    variant="success" 
                                    style={{backgroundColor: "#346d43"}}
                                    disabled={playCardDisabled}
                                    onClick={(e) => {handlePlayCard(e)}}
                                >Play Card</Button>
                            </ButtonGroup>
                            <Form.Text style={{color: '#ff000092'}} className='error-message'>{errorMessage}</Form.Text>

                            </Col>
                            </>    
                        }
                    </Row>
                    {/* <input type="number"></input>
                    <button 
                        className='btn-play-card mt-2'
                        disabled={playCardDisabled}
                        onClick={(e) => {handlePlayCard(e)}}
                    >Play Card</button> */}
                </Col>
            </Row>
        </div>
    )
}

export default GamePlaying;

//Track which card is the current winner during the round

//Pause the game for 5-10 seconds when each turn ends to show who won the trick
//pause the game when the round is over for 5-10 seconds to show updated score.
//Slow the game flow down. It goes very fast

//ERROR = when a 2 of hearts is played, something breaks because a 2 of hearts is 'null'. Maybe change the card number system

//Formatting is off with the columns because the cards are either too big or the 'lead' text offsets it

//Test on mobile, maybe make cards in center bigger? - get rid of 'Mormon Bridge' on the top to create more space
//and maybe make the width of the columns stretch farter to the side for more space
//make the 'play card button' span more of the screen

//Spread the messages out and shorten them so they are better on mobile. Increase height of message board div

//Keep the pulse indicator of whos turn it is?

//Fix error messages when clicking a card when placing a bet