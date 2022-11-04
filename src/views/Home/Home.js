import React, {useState, useEffect} from 'react'
import {Button, Form, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import { handleUnkownCode, handleRoomFull,
    handleEnterRoom, handleRoomCode,
    handleGameAlreadyStarted,
} from './home-utils';
import GameWaiting from '../Game/GameWaiting';
import GamePlaying from '../Game/GamePlaying';
import { useParams } from 'react-router-dom';
import './home.css';

const socket = io.connect("https://mormon-bridge-backend.herokuapp.com/")

function WelcomePage(){
    const params = useParams();
    //Player State
    const [playerName, setPlayerName] = useState("");
    const [playerId, setPlayerId] = useState("");
    const [playerNameError, setPlayerNameError] = useState("");
    
    //Room State
    const [roomName, setRoomName] = useState("");
    const [showRoom, setShowRoom] = useState(false);
    const [enteredRoomName, setEnteredRoomName] = useState("");
    const [enteredCodeError, setEnteredCodeError] = useState("");
    const [numRounds, setNumRounds] = useState(null);
    const [numRoundsError, setNumRoundsError] = useState("");

    //Game State
    const [gameState, setGameState] = useState({});

    //button handlers
    const newGame = () => {
        if(!playerName){
            setPlayerNameError('Please enter a player name');
            return;
        }
        if(playerName.length >= 10){
            setPlayerNameError('Name must be 9 or less characters');
            setEnteredCodeError('');
            return;
        }
        if(!numRounds){
            setNumRoundsError('Please enter number of rounds');
            return;
        }
        setPlayerNameError('');
        socket.emit('newGame', playerName, numRounds);
    }

    const joinGame = () => {
        console.log(enteredRoomName, playerName)
        if(!playerName){
            setPlayerNameError('Please enter a player name');
            setEnteredCodeError('');
            return;
        }

        if(playerName.length >= 10){
            setPlayerNameError('Name must be 9 or less characters');
            setEnteredCodeError('');
            return;
        }

        if(!enteredRoomName){
            setPlayerNameError('');
            setEnteredCodeError('Please enter a game code');
            return;
        }

        setPlayerNameError("");
        setEnteredRoomName("");
        let req = {playerName: playerName, roomName: enteredRoomName}
        socket.emit('joinGame', req);
    }

    const startGame = () => {
        socket.emit('startGame', roomName);
    }

    const handleGameState = (gameState) => {
        setGameState(gameState);
    }

    const handleSendId = (id) => {
        console.log('player id', id)
        setPlayerId(id);
    }

    const handlePlaceBet = (bet) => {
        socket.emit('placeBet', bet, roomName, playerId);
    }

    const handlePlayCard = (card) => {
        socket.emit('playCard', card, roomName, playerId)
    }

    useEffect(() => {
        console.log('use effect setting game state', gameState);
        setGameState(gameState);
    }, [gameState]);

    useEffect(() => {
        if(params.roomCode){
            setEnteredRoomName(params.roomCode);
        }
    }, [params]);

    //Socket Listeners
    socket.on('roomCode', (roomName) => handleRoomCode(setShowRoom, setRoomName, roomName));
    socket.on('unkownCode', () => {handleUnkownCode(setEnteredCodeError)});
    socket.on('roomFull', () => {handleRoomFull(setEnteredCodeError)});
    socket.on('enterRoom', (roomName, id) => handleEnterRoom(setShowRoom, setRoomName, roomName));
    socket.on('gameState', handleGameState);
    socket.on('sendId', handleSendId);
    socket.on('gameAlreadyStarted', () => handleGameAlreadyStarted(setEnteredCodeError))

    return(
        <div className='app-container mt-1'>
            {!showRoom ? 
            <>
                <h3 className='text-center mt-3 mb-2'>Mormon Bridge</h3>
                <div className='container'>
                <Form >
                    <Form.Group className='text-center'>
                        <Row className='m-1'>
                            <Form.Text>Welcome! To play, enter your name and start a new game, or enter your name, enter a game code you received from a friend and join an existing game.</Form.Text>
                            <Form.Control onChange={(e) => {setPlayerName(e.target.value)}}  className='mt-5 mb-1' placeholder='Enter name'/>
                            <Form.Text style={{color: 'red'}}>{playerNameError}</Form.Text><br></br>
                            <Form.Control onChange={(e) => {setNumRounds(e.target.value)}} type="number" className='mt-2' placeholder="Number of Rounds" />   
                            <Form.Text className="text-muted">The number of rounds you will play up to. <br></br>(If 6, you'll deal up to 6 cards, then back to 1.)</Form.Text>
                            <Form.Text style={{color: 'red'}}>{numRoundsError}</Form.Text><br></br>
                            <Button onClick={() => newGame()} className='mb-4 mt-2 btn-hover' style={{backgroundColor: "#346d43"}} variant='success'>Start New Game</Button>
                        </Row>
                        <Row>
                            <h4>- OR -</h4>
                        </Row>
                        <Row className='m-3 mt-3'>
                            {/* <Form.Control onChange={(e) => {setPlayerName(e.target.value)}}  className='mt-3 mb-1' placeholder='Enter name'/> */}
                            <Form.Control value={enteredRoomName} onChange={(e) => {setEnteredRoomName(e.target.value)}} className='mt-3 mb-1' placeholder='Enter game code'/>
                            <Form.Text style={{color: 'red'}}>{enteredCodeError}</Form.Text><br></br>
                            <Button onClick={() => joinGame()} className='mb-4 mt-2 btn-hover' style={{backgroundColor: "#346d43"}} variant='success'>Join Existing Game</Button>
                        </Row>
                    </Form.Group>
                </Form>
                </div>    
            </>            
            :
            <div className='container'>
                {gameState.gameStatus === 0 ? 
                    <>
                        <GameWaiting
                            playerName={playerName}
                            roomName={roomName}
                            players={gameState.players}
                            startGame={startGame}
                        />
                    </>
                    : gameState.gameStatus === 1 ? //Playing the Game
                    <>
                        <GamePlaying 
                            placeBet={(bet) => {handlePlaceBet(bet)}}
                            playCard={(card) => {handlePlayCard(card)}}
                            roundStatus={gameState.roundStatus}
                            gameState={gameState}
                            playerId={playerId}
                        />
                    </>
                    :
                    <>
                    <div>Game Over</div>
                    </>
                }
            </div>
        }

        </div>
    )
}

export default WelcomePage;