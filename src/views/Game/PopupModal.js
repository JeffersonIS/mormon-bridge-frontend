import React, {useEffect, useState} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import FaceCard from '../FaceCard/FaceCard';
import './popup.css';

function PopupModal(props) {
  const gameState = props.gameState;
  const player = props.player;
  const [headerText, setHeaderText] = useState('');
  const [scoredPlayers, setScoredPlayers] = useState(null);
  const [highlightClass, setHighlightClass] = useState('');
  const [scoresText, setScoresText] = useState('Updated');


  useEffect(() => {
    let name;
    if(gameState.winnerLastTurnId === props.playerId){
      name = "You";
      setHighlightClass('highlight-winner');
    } else {
      name = gameState.players[gameState.winnerLastTurnIndex]?.name;
      setHighlightClass('');
    }
    setHeaderText(`${name} won the trick`);

    if(gameState.roundOver || gameState.gameOver){
      let scoredPlayersArray = gameState.players.sort((a,b) => {
        return (a.points < b.points) ? 1 : -1;
      })
      setScoredPlayers(scoredPlayersArray);

    }

    gameState.gameOver ? setScoresText(`${gameState.gameWinner} WINS!`) : setScoresText('Updated Scores');

  }, [gameState, props.playerId]);

  return (
    <>
      <Modal
        show={props.showModal}
        // show={true}
        backdrop="static"
        keyboard={false}
      >
        {gameState.roundOver ?
          <div className='points-row points-row m-4 mt-2 mb-3 p-3 text-center'>
                <>
                  <h4 className='popup-text'>{scoresText}</h4>
                  {scoredPlayers?.map((person, count) => {
                    let classString = count % 2 ? 'points-col-right' : 'points-col-left';
                    let name = person.socketId === props.playerId ? 'You' : person.name;
                    let diff = person.tricksBetLastTurn === person.tricksWonLastTurn ? (10+person.tricksWonLastTurn) : person.tricksWonLastTurn;
                    return(
                      <>
                        <div className={`points-text points-col ${classString}`}>
                          <small>{name}: <b>{person.points}</b> <span className='points-text-difference'>(+{diff})</span></small>
                        </div>
                      </>
                      
                    )
                  })}
                </>
          </div>
          :
          <></>

        }
        <h5 className='text-center mt-2 mb-2 popup-text'>{headerText}</h5>
        {/* show Trum and Lead card
        check if player is winner
        show winning card */}
        <Row className='popup-card-row mb-1'>
          <Col xs={3} className="p-0">
              <FaceCard 
                  cardNum={gameState.trumpCardLastTurn}
                  classString={`card-popup`}/>                    
              <div className='table-text'>Trump</div>
          </Col>
          <Col xs={3} className="p-0">
              <FaceCard 
                  cardNum={gameState.leadCardLastTurn}
                  classString={`card-popup`}
                />
              <div className='table-header-text'>Lead</div>
          </Col>
          <Col xs={3} className="p-0">
              <FaceCard 
                  cardNum={gameState.winnerCardLastTurn}
                  classString={`card-popup card-winner`}/>                    
              <div className='table-header-text'>Winning Card</div>
          </Col>
        </Row>
        <div className='opp-row m-1'>
          {props.opponents?.map((opponent, count) => {
                      let classString = count % 2 ? 'col-right' : 'col-left';
                      classString += opponent.socketId === gameState.winnerLastTurnId ? ' highlight-winner' :  '';

                      return(
                          <div className={`opp-col ${classString}`} key={count}>
                                  <FaceCard
                                    classString={`facecard card-opponent`}
                                    cardNum={opponent.cardPlayedLastTurn}
                                  /> 

                              <div className='opponent-info'>
                                  <div><b>{opponent?.name} </b></div>
                                  <div><small>Bet: <b>{opponent?.tricksBetLastTurn}</b></small></div>
                                  <div><small>Tricks: <b>{opponent?.tricksWonLastTurn}</b></small></div>
                                  {gameState.roundOver ? 
                                  <div><small>Points: <b>{opponent?.points}</b></small></div>
                                  :
                                  <></>
                                  }
                              </div>

                          </div>
                      )
            })}
          </div>
          <Row className={`mt-3 m-1 mb-0 popup-player-row ${highlightClass}`}>
            <Col className='r popup-text mt-2 mb-2 summary-col'>
              <div><b>Your Play</b></div>
              <div><small>Bet: <b>{player?.tricksBetLastTurn}</b></small></div>
              <div><small>Tricks: <b>{player?.tricksWonLastTurn}</b></small></div>

            </Col>
            <Col className=' mt-2 mb-2 l'>
              <FaceCard
                classString={`facecard card-opponent`}
                cardNum={player?.cardPlayedLastTurn}
              />
            </Col>            
          </Row>
        <div className='popup-text m-2'>
          {gameState.roundOver && 
          <>
            {gameState.gameOver ?
             <>Sending Back to Waiting Room <b>{props.gameState?.timer}</b></>
            :
              <>Starting Next Round in <b>{props.gameState?.timer}</b></>
            }
          </>
          }
          {gameState.turnOver && <>Starting Next Turn in <b>{props.gameState?.timer}</b></>}
          
        </div>
      </Modal>
    </>
  );
}

export default PopupModal;