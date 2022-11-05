import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import "./game.css";
import FaceCard from "../FaceCard/FaceCard";
import PopupModal from "./PopupModal";
import useSound from 'use-sound';
import bellSfx from '../../assets/success_bell.mp3'
import MessageBar from "./MessageBar";
import Opponents from './Opponents';
import TableHeader from "./TableHeader";

function GamePlaying(props) {
  const [playYourTurnSfx] = useSound(bellSfx);
  const [playCardDisabled, setPlayCardDisabled] = useState(true);
  const [betButtonDisabled, setBetButtonDisabled] = useState(false);
  const [isLeadPlayerText, setIsLeadPlayerText] = useState("");
  const [isCurrentTurnClass, setIsCurrentTurnClass] = useState("");
  const [highlightBetClass, setHighlightBetClass] = useState("");
  const [hasAlertedPlayerToBet, setHasAlertedPlayerToBet] = useState(false);
  const [alertedSuccess, setAlertedSuccess] = useState(false);
  const [advanceButtonClass, setAdvanceButtonClass] = useState("btn-advance-pulse");
  const [advanceButtonText, setAdvanceButtonText] = useState("Play Next Trick");
  const [playerReadyForNextTurn, setPlayerReadyForNextTurn] = useState(false);
  const [cardSelected, setCardSelected] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [bet, setBet] = useState(0);

  let gameState = props.gameState;

  let players = gameState.players.slice();

  let opponents = players.filter((opponent) => {
    return opponent.socketId !== props.playerId;
  });

  let player = players.find((item) => {
    return item.socketId === props.playerId;
  });

  const handleSelectCard = (cardNum) => {
    let num;
    if (cardNum) {
      num = cardNum.length > 0 ? cardNum[0] : cardNum;

      setCardSelected(num);
      if(gameState.currentPlayerTurnId === player?.socketId){
        setPlayCardDisabled(false);
      }
    }    

  };

  const handlePlayCard = () => {
    setErrorMessage("");
    if(gameState.currentPlayerTurnId === player?.socketId){
      if (cardSelected) {
        setPlayCardDisabled(true);
        props.playCard(cardSelected);
        setCardSelected(null);
      } else {
        setErrorMessage("Select a card");
      }
  
      if (betButtonDisabled) {
        setBetButtonDisabled(false);
      }
    } else {
      setErrorMessage("It is not your turn")
    }
  };

  const handleSetBet = (bet) => {
    setErrorMessage("");
    if (bet) {
      setBet(bet);
      setBetButtonDisabled(false);
    }
  };

  const handleBet = () => {
    if (bet) {
      setErrorMessage("");
      if (bet <= gameState.numCardsToDeal) {
        setBetButtonDisabled(true);
        setHighlightBetClass("");
        setHasAlertedPlayerToBet(false);
        props.placeBet(bet);
        setBet(null);
      } else {
        setErrorMessage(`Bet is too big`);
      }
    } else {
      setErrorMessage(`Enter a bet`);
    }
  };

  const handleAdvanceTurn = () => {
    if(!playerReadyForNextTurn){
      setPlayerReadyForNextTurn(false);
      setAdvanceButtonClass("btn-advance");
      setAdvanceButtonText("Waiting...");
      setAlertedSuccess(false);
      props.advanceTurn();
    }
  }

  useEffect(() => {
    if (gameState.leadPlayerId === player?.socketId) {
      setIsLeadPlayerText("(Lead)");
    } else {
      setIsLeadPlayerText("");
    }

    //WHEN IT IS CURRENT PLAYER'S TURN
    if (gameState.currentPlayerTurnId === player?.socketId) {
      if(gameState.roundStatus === 1 && !gameState.turnOver){
        playYourTurnSfx();

        setIsCurrentTurnClass("current-player-turn");

      } else {
        setIsCurrentTurnClass("current-player-turn-betting");
      }
      setPlayCardDisabled(false);

    } else {
      setIsCurrentTurnClass("");
    }

    //WHEN IT IS TIME TO BET
    if (gameState.roundStatus === 0){
      if(!player?.hasBet && !gameState.roundOver){
        if(!hasAlertedPlayerToBet){
          playYourTurnSfx();
          setHighlightBetClass("highlight-bet");
          setHasAlertedPlayerToBet(true);
          }
      } else {
        setHighlightBetClass("");
        setHasAlertedPlayerToBet(false);
      }
    } else {
      setHighlightBetClass("");
    }

    //WHEN THE TURN IS OVER
    if(gameState.roundStatus === 2){
      if(!alertedSuccess){
        setAlertedSuccess(false);
      }
      if(!playerReadyForNextTurn){

        setIsCurrentTurnClass("");
        setAdvanceButtonClass("btn-advance-pulse");
        setAdvanceButtonText("Play Next Trick");
        }
    }

  }, [gameState, player, alertedSuccess, 
    hasAlertedPlayerToBet, playYourTurnSfx, 
    playerReadyForNextTurn]);

  return (
    <div>
      <PopupModal
        showModal={gameState?.showModal}
        opponents={opponents}
        player={player}
        gameState={gameState}
        playerId={props.playerId}
      />

      <TableHeader gameState={gameState} player={player}/>

      <MessageBar gameState={gameState}/>

      <Opponents opponents={opponents} gameState={gameState}/>

      <Row className="mt-3 text-center player-seat-row">
        <Col className={`player-seat ${isCurrentTurnClass}`}>
          <div className="player-info mb-2">
            <div>
              <small>{isLeadPlayerText}</small>
            </div>
            <div>
              <small>
                Bet: <b>{player?.tricksBet}</b>
              </small>
            </div>
            <div>
              <small>
                Tricks Won: <b>{player?.tricksWon}</b>
              </small>
            </div>
          </div>

          <div className="player-cards-row mt-1">
            {player?.cardsInHand?.map((cardNum) => {
              let classString = cardNum === cardSelected ? "active-card" : "";

              classString +=
                cardNum === player.cardPlayedThisTurn ? " card-played " : "";


              return (
                <>
                  <span
                    key={cardNum}
                    onClick={() => {
                      handleSelectCard(cardNum);
                    }}
                  >
                    <FaceCard
                      classString={`card-player card-player-hover ${classString}`}
                      cardNum={cardNum}
                      gameState={gameState}
                    ></FaceCard>
                  </span>
                </>
              );
            })}
          </div>

          <Row className={`mt-2`}>

            {gameState.roundStatus === 0 ? (
              <>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="enter bet"
                    min="0"
                    className={`${highlightBetClass}`}
                    max={gameState.numCardsToDeal}
                    onChange={(e) => {
                      handleSetBet(e.target.value);
                    }}
                  ></Form.Control>
                </Col>
                <Col>
                  <ButtonGroup className="d-flex">
                    <Button
                      className="btn-block btn-hover"
                      variant="success"
                      style={{ backgroundColor: "#346d43" }}
                      onClick={(e) => {
                        handleBet(e);
                      }}
                      disabled={betButtonDisabled}
                    >
                      Submit Bet
                    </Button>
                  </ButtonGroup>
                  <Form.Text
                    style={{ color: "#ff000092" }}
                    className="error-message"
                  >
                    {errorMessage}
                  </Form.Text>
                </Col>
              </>
            ) : gameState.roundStatus === 1 ? (
              <>
                <Col>
                  <ButtonGroup className="d-flex btn-play-card-group">
                    <Button
                      className="btn-block btn-hover"
                      variant="success"
                      style={{ backgroundColor: "#346d43" }}
                      disabled={playCardDisabled}
                      onClick={(e) => {
                        handlePlayCard(e);
                      }}
                    >
                      Play Card
                    </Button>
                  </ButtonGroup>
                  <Form.Text
                    style={{ color: "#ff000092" }}
                    className="error-message"
                  >
                    {errorMessage}
                  </Form.Text>
                </Col>
              </>
            ) : (
              <Col>
              <ButtonGroup className="d-flex btn-play-card-group">
                <Button
                  className={`btn-block ${advanceButtonClass}`}
                  variant="success"
                  style={{ backgroundColor: "#346d43" }}
                  onClick={() => {handleAdvanceTurn()}}
                >
                  {advanceButtonText}
                </Button>
              </ButtonGroup>
            </Col>
        )
          }
          </Row>

        </Col>
      </Row>
    {/* MESSAGE BOARD */}
     {/* <Col xs={6}>
      <div className="message-board">
        {gameState?.gameMessages?.map((message, count) => {
          let classString = count % 2 ? "grey-message" : "";
          return (
            <p className={`${classString}`} key={count}>
              {message}{" "}
            </p>
          );
        })}
      </div>
    </Col> */}
    </div>
  );
}

export default GamePlaying;
