import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Button, Form, Row, Table } from "react-bootstrap";
import "./game.css";

function Game(props) {
  const linkToCopy = `https://mormonbridge.netlify.app/${props.roomName}`;
  // const linkToCopy = `http://localhost:3000/${props.roomName}`;
  const [copiedClass, setCopiedClass] = useState("");

  const copyToClipboard = () => {
    setCopiedClass("copied");
    copy(linkToCopy);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h4 className=" mt-3">
          Welcome {props.playerName}
          <br></br>
          <span className="font-300">Room Code: {props.roomName}</span>
        </h4>
        <div className="m-3"></div>
        <Form.Text>
          Once all players have entered the room, you can start the game.
        </Form.Text>

        <div className="m-2"></div>
        <Button
          onClick={() => {
            copyToClipboard();
          }}
          className={`${copiedClass} game-link btn-hover`}
          style={{ backgroundColor: "#346d43" }}
          variant="success"
          size="sm"
        >
          Copy Game Link
        </Button>
        <div className="copied-confirmation-text"> {copiedClass}</div>
      </div>
      <Row className="mt-5">
        <Table striped>
          <thead>
            <tr>
              <th>Players Waiting</th>
            </tr>
          </thead>
          <tbody>
            {props.players?.map((player, count) => {
              return (
                <tr key={count}>
                  <td>{player.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <Row className="text-center">
        {props.players?.length > 1 ? (
          <>
            <Button
              onClick={() => props.startGame()}
              className="mt-5 mb-4 btn-hover"
              style={{ backgroundColor: "#346d43" }}
              variant="success"
              size="lg"
            >
              Start Game
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled
              onClick={() => props.startGame()}
              className="mt-5 mb-4 btn-hover"
              style={{ backgroundColor: "#346d43" }}
              variant="success"
              size="lg"
            >
              Start Game
            </Button>
          </>
        )}
      </Row>
    </div>
  );
}

export default Game;
