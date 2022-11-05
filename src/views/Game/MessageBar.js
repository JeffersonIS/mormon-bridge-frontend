import React, { useEffect, useState } from 'react';
import {Row, Col} from 'react-bootstrap';

function MessageBar(props){
    const gameState = props.gameState;
    const [leftText, setLeftText] = useState("");
    const [middleText, setMiddleText] = useState("Place Bets");
    const [rightText, setRightText] = useState("");
    const [classString, setClassString] = useState("success-bar-row");

    useEffect(() => {
        if(gameState.roundStatus === 1){
            if(gameState.totalBets > gameState.numCardsToDeal){
                setLeftText(`WARNING`);
                setMiddleText(`Total Bets: ${gameState.totalBets}`);
                setRightText(`Possible: ${gameState.numCardsToDeal}`);
                setClassString("warning-bar-row");
            } else if(gameState.totalBets < gameState.numCardsToDeal){
                setLeftText(`WARNING`);
                setMiddleText(`Total Bets: ${gameState.totalBets}`);
                setRightText(`Possible: ${gameState.numCardsToDeal}`);
                setClassString("warning-bar-row");
            } else if(gameState.totalBets === gameState.numCardsToDeal){
                setLeftText(``);
                setMiddleText(`Total Bets: ${gameState.totalBets}`);
                setRightText(`Possible: ${gameState.numCardsToDeal}`);
                setClassString("success-bar-row");
            }
        } else if(gameState.roundStatus === 2){
            setClassString("success-bar-row");
            let player = gameState.currentWinningPlayer;

            if(player){
                setLeftText(``);
                setMiddleText(`${player.name} won the trick`);
                setRightText(``);
            } else {
                setLeftText(``);
                setMiddleText(`Good Luck`);
                setRightText(``);
            }
        } else {
            setClassString("success-bar-row");
            setLeftText(``);
            setMiddleText(`Good Luck`);
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