import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import "./popup.css";

function PopupModal(props) {
  const gameState = props.gameState;
  const [scoredPlayers, setScoredPlayers] = useState(null);
  const [scoresText, setScoresText] = useState("Player Scores");

  useEffect(() => {

    if (gameState.roundOver || gameState.gameOver) {
      let scoredPlayersArray = gameState.players.sort((a, b) => {
        return a.points < b.points ? 1 : -1;
      });
      setScoredPlayers(scoredPlayersArray);
    }

    gameState.gameOver
      ? setScoresText(`${gameState.gameWinner} WINS!`)
      : setScoresText("Player Scores");
  }, [gameState, props.playerId]);

  return (
    <>
      <Modal
        show={props.showModal}
        // show={true}
        backdrop="static"
        keyboard={false}
      >
          <div className="points-row points-row m-2 mt-2 mb-2 p-3 text-center">
            <>
              <h4 className="popup-text">{scoresText}</h4>
              <Table className="points-text">
                <thead className="points-text">
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Total</th>
                    <th>Bet</th>
                    <th>Tricks Won</th>
                    <th>+ Points</th>

                  </tr>
                </thead>
                <tbody>

              {scoredPlayers?.map((person, count) => {
                let name = person.socketId === props.playerId ? "You" : person.name;
                let diff = person.tricksBetLastTurn === person.tricksWonLastTurn
                    ? 10 + person.tricksWonLastTurn
                    : person.tricksWonLastTurn;
                  
                return (
                  <tr >
                    <td >{count + 1}</td>
                    <td>{name}</td>
                    <td>{person.points}</td>
                    <td>{person.tricksBetLastTurn}</td>
                    <td>{person.tricksWonLastTurn}</td>
                    <td>(+{diff})</td>
                  </tr>
                );
              })}
            </tbody>

              </Table>
            </>
          </div>

        <div className="popup-text m-2">
          {gameState.roundOver && (
            <>
              {gameState.gameOver ? (
                <>
                  Sending Back to Waiting Room <b>{props.gameState?.timer}</b>
                </>
              ) : (
                <>
                  Starting Next Round in <b>{props.gameState?.timer}</b>
                </>
              )}
            </>
          )}
        </div>
      </Modal>

        {/* <h5 className="text-center mt-2 mb-2 popup-text">{headerText}</h5>

        <Row className="popup-card-row mb-1">
          <Col xs={3} className="p-0">
            <FaceCard
              cardNum={gameState.trumpCard}
              classString={`card-popup`}
            />
            <div className="table-text">Trump</div>
          </Col>
          <Col xs={3} className="p-0">
            <FaceCard
              cardNum={gameState.leadCardLastTurn}
              classString={`card-popup`}
            />
            <div className="table-header-text">Lead</div>
          </Col>
          <Col xs={3} className="p-0">
            <FaceCard
              cardNum={gameState.winnerCardLastTurn}
              classString={`card-popup card-winner`}
            />
            <div className="table-header-text">Winning Card</div>
          </Col>
        </Row>



        <div className="opp-row m-1">
          {props.opponents?.map((opponent, count) => {
            let classString = count % 2 ? "col-right" : "col-left";
            classString +=
              opponent.socketId === gameState.winnerLastTurnId
                ? " highlight-winner"
                : "";

            return (
              <div className={`opp-col ${classString}`} key={count}>
                <FaceCard
                  classString={`facecard card-opponent`}
                  cardNum={opponent.cardPlayedLastTurn}
                />

                <div className="opponent-info">
                  <div>
                    <b>{opponent?.name} </b>
                  </div>
                  <div>
                    <small>
                      Bet: <b>{opponent?.tricksBetLastTurn}</b>
                    </small>
                  </div>
                  <div>
                    <small>
                      Tricks: <b>{opponent?.tricksWonLastTurn}</b>
                    </small>
                  </div>
                  {gameState.roundOver ? (
                    <div>
                      <small>
                        Points: <b>{opponent?.points}</b>
                      </small>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div> */}



        {/* <Row className={`mt-3 m-1 mb-0 popup-player-row ${highlightClass}`}>
          <Col className="r popup-text mt-2 mb-2 summary-col">
            <div>
              <b>Your Play</b>
            </div>
            <div>
              <small>
                Bet: <b>{player?.tricksBetLastTurn}</b>
              </small>
            </div>
            <div>
              <small>
                Tricks: <b>{player?.tricksWonLastTurn}</b>
              </small>
            </div>
          </Col>
          <Col className=" mt-2 mb-2 l">
            <FaceCard
              classString={`facecard card-opponent`}
              cardNum={player?.cardPlayedLastTurn}
            />
          </Col>
        </Row> */}

    </>
  );
}

export default PopupModal;