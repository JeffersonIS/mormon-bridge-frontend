export const handleUnkownCode = (setEnteredCodeError) => {
    console.log('rrom doesnt exist;')
    setEnteredCodeError('This game does not exist');
}

export const handleRoomFull = (setEnteredCodeError) => {
    setEnteredCodeError('The room is full. Max 7 players allowed.');
}

export const handleGameAlreadyStarted = (setEnteredCodeError) => {
    setEnteredCodeError('Sorry, this game has already started.');
}


export const handleEnterRoom = (setShowRoom, setRoomName, roomName) => {
    setShowRoom(true);
    setRoomName(roomName)
}

export const handleRoomCode = (setShowRoom, setRoomName, roomName) => {
    if(roomName){
        setRoomName(roomName);
        setShowRoom(true);
    }
}