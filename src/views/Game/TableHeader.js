import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FaceCard from '../FaceCard/FaceCard';

function TableHeader(props){
    const gameState = props.gameState;
    const player = props.player

    return(
        <Row className="text-center m-1 table-header">
        <h5 className="text-center">
          <span className="table-header-text">
            Round {gameState.roundNum}/{gameState.numTotalRoundsToPlay}
          </span>
        </h5>

        <Col className="p-0">
          <FaceCard
            cardNum={gameState.trumpCard}
            classString={`card-trump-lead`}
          />
          <div className="table-header-text">Trump</div>
        </Col>
        <Col className="p-0">
          <FaceCard
            cardNum={gameState.leadCard}
            classString={`card-trump-lead`}
          />
          <div className="table-header-text">Lead</div>
        </Col>
        <Col className="p-0">
          <FaceCard
            cardNum={gameState.currentWinningCard}
            classString={`card-trump-lead`}
            gameState={gameState}
          />
          <div className="table-header-text">Winning Card</div>
        </Col>
      </Row>

    )
}

export default TableHeader;