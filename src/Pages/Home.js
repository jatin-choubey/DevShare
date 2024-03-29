import { useState } from "react";
import { toast } from "react-hot-toast";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const inputHandler = (event) => {
    if (event.code === "Enter") {
      joinRoomHandler();
    }
  };

  const joinRoomHandler = () => {
    if (!roomId || !userName) {
      toast.error("RoomId & userName is required!");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };

  const createNewRoomHandler = (event) => {
    event.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("Created a New Room!");
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-Pair.png"
          alt="codePair Logo"
        />
        <h4 className="main-label">Paste invitation ROOM ID</h4>
        <div className="input-group">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={inputHandler}
          />
          <input
            type="text"
            className="inputBox"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            value={userName}
            onKeyUp={inputHandler}
          />
          <button className="btn joinBtn" onClick={joinRoomHandler}>
            JOIN
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoomHandler} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built by JASY</h4>
      </footer>
    </div>
  );
};

export default Home;
