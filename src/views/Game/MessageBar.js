import React, { useEffect, useState } from 'react';
import {Row, Col} from 'react-bootstrap';

function MessageBar(props){
    const gameState = props.gameState;
    const [leftText, setLeftText] = useState("");
    const [middleText, setMiddleText] = useState("Place Bets");
    const [rightText, setRightText] = useState("");
    const [classString, setClassString] = useState("message-bar-success");

    useEffect(() => {
        if(gameState.roundStatus === 1){
            if(gameState.totalBets > gameState.numCardsToDeal){
                setLeftText(`WARNING`);
                setMiddleText(`Total Bets: ${gameState.totalBets}`);
                setRightText(`Possible: ${gameState.numCardsToDeal}`);
                setClassString("message-bar-warning");
            } else if(gameState.totalBets < gameState.numCardsToDeal){
                setLeftText(`WARNING`);
                setMiddleText(`Total Bets: ${gameState.totalBets}`);
                setRightText(`Possible: ${gameState.numCardsToDeal}`);
                setClassString("message-bar-warning");
            } else if(gameState.totalBets === gameState.numCardsToDeal){
                setLeftText(``);
                setMiddleText(`Total Bets: ${gameState.totalBets}`);
                setRightText(`Possible: ${gameState.numCardsToDeal}`);
                setClassString("message-bar-success");
            }
        } else if(gameState.roundStatus === 2){
            let player = gameState.currentWinningPlayer;

            if(player){
                setClassString("message-bar-success");

                setLeftText(``);
                setMiddleText(`${player.name} won the trick`);
                setRightText(``);
            } else {
                setLeftText(``);
                setClassString("message-bar-secondary");
                setMiddleText(``);
                setRightText(``);
            }
        } else {
            setClassString("message-bar-secondary");
            setLeftText(``);
            setMiddleText(``);
            setRightText(``);
}
    }, [gameState])

    return(
        <div style={{marginTop: "-1px"}}>
        <Row className={`${classString} m-1 p-1 message-bar`}>
            {leftText && (<Col className='p-0'>{leftText}</Col>)}
            <Col className='p-0'>
                {middleText}
            </Col>
            {rightText && (<Col className='p-0'>{rightText}</Col>)}
        </Row>
        </div>
    )
}

export default MessageBar;