import React, { useEffect } from 'react';
import FaceCard from '../FaceCard/FaceCard';

function Opponents(props){
    const gameState = props.gameState;

    useEffect(() => {

    }, [gameState])

    return(
        <div className="opp-row">
        {props.opponents?.map((opponent, count) => {

          let classString = count % 2 ? "col-right" : "col-left";
          let leadText = opponent.socketId === gameState.leadPlayerId ? "(Lead)" : "";

          if(gameState.roundStatus === 1 && opponent.socketId === gameState.currentPlayerTurnId){
            classString += " current-player-turn";
          } else if(gameState.roundStatus === 2){
            classString += ""
          }else if(opponent.socketId === gameState.currentPlayerTurnId){
            classString += " current-player-turn-betting"
          } 

          return (
            <div className={`opp-col ${classString}`} key={count}>
              {opponent?.cardPlayedThisTurn ? (
                <FaceCard
                  classString={`facecard card-opponent`}
                  cardNum={opponent.cardPlayedThisTurn}
                  gameState={gameState}
                />
              ) : (
                <FaceCard
                  classString={`facecard card-opponent`}
                  cardNum={gameState.deckStyleNum}
                />
              )}
              <div className="opponent-info">
                <div>
                  <b>{opponent?.name} </b>
                  <small>{leadText}</small>
                </div>
                {gameState.roundStatus === 0 ? (
                  <div>
                    <small>
                      Bet: <b>--</b>
                    </small>
                  </div>
                ) : (
                  <div>
                    <small>
                      Bet: <b>{opponent?.tricksBet}</b>
                    </small>
                  </div>
                )}
                <div>
                  <small>
                    Tricks: <b>{opponent?.tricksWon}</b>
                  </small>
                </div>
                {/* <div>
                  <small>
                    Points: <b>{opponent?.points}</b>
                  </small>
                </div> */}
              </div>
            </div>
          );
        })}        
        </div>
    )
}

export default Opponents;