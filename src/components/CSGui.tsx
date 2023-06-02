import { useState, useEffect } from "react";
import Header from "./Header";
import "./styles/CSGui.css";
import csguiImg from "../assets/csgui.svg";
import refreshImg from "../assets/refresh.svg";
import trashcanImg from "../assets/trashcan.svg";
import updateImg from "../assets/update.svg";
import axios from "axios";

function CSGui() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const users = await axios.get("http://localhost:5000/");
    setUsers(users.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <header>
        <div className="headerButtons">
          <Header />
          <button onClick={getUsers} className="createBtn">
            Create
          </button>
        </div>
        <img src={csguiImg} alt="" className="csgui" />
      </header>
      <main>
        <div className="texts">
          <p className="nickText">NICK</p>
          <p className="favouriteGun">ARMA FAVORITA</p>
          <p className="favouriteMap">MAPA FAVORITO</p>
          <p className="favouriteSkin">SKIN FAVORITA</p>
          <button className="refreshBtn" onClick={getUsers}>
            <img src={refreshImg} alt="" className="refreshImg" />
          </button>
        </div>

        <div className="data">
          {users.map((user, index) => (
            <div className="child" key={index}>
              <textarea
                spellCheck={false}
                className="nick"
                cols={1}
                rows={1}
                value={user.nick}
              ></textarea>
              <textarea
                spellCheck={false}
                className="gun"
                cols={1}
                rows={1}
                value={user.gun}
              ></textarea>
              <textarea
                spellCheck={false}
                className="map"
                cols={1}
                rows={1}
                value={user.map}
              ></textarea>
              <textarea
                spellCheck={false}
                className="skin"
                cols={1}
                rows={1}
                value={user.skin}
              ></textarea>
              <button className="updateBtn">
                <img src={updateImg} alt="" className="updateImg" />
              </button>
              <button className="deleteBtn">
                <img src={trashcanImg} alt="" className="trashcanImg" />
              </button>
            </div>
          ))}
        </div>

        {/* <template className='template' >
                    <div className='child'>
                        <textarea className='name' cols={1} rows={1}></textarea>
                        <textarea className='movie' cols={1} rows={1}></textarea>
                        <textarea className='hero' cols={1} rows={1}></textarea>
                        <button><img src={updateImg} alt="" className="updateImg"/></button>
                        <button><img src={trashcanImg} alt="" className="trashcanImg"/></button>
                    </div>
                </template> */}
      </main>
    </>
  );
}

export default CSGui;
