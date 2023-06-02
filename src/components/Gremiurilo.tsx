import { useState, useEffect } from "react";
import Header from "./Header";
import "./styles/Gremiurilo.css";
import gremiuriloImg from "../assets/gremiurilo.svg";
import refreshImg from "../assets/refresh.svg";
import trashcanImg from "../assets/trashcan.svg";
import updateImg from "../assets/update.svg";
import axios from "axios";

function Gremiurilo() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const users = await axios.get("http://localhost:5000/");
    setUsers(users.data);
  }

  async function deleteUsers(event: any) {
    let div = event;
    if(event.target.nodeName === 'BUTTON') {
        div = event.target.parentNode;
    }else {
        div = event.target.parentNode.parentNode;
    }
    
    const key = div.getAttribute('data-key');

    await axios.delete('http://localhost:5000/', {
            data: {
                id: +key,
            }
    })
    getUsers();
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
        <img src={gremiuriloImg} alt="" className="demarvel" />
      </header>
      <main>
        <div className="texts">
          <p className="nameText2">NOME</p>
          <p className="favouritePlayer">JOGADOR FAVORITO</p>
          <p className="favouriteTitle">TÍTULO FAVORITO</p>
          <button className="refreshBtn" onClick={getUsers}>
            <img src={refreshImg} alt="" className="refreshImg" />
          </button>
        </div>

        <div className="data">
          {users.map((user, index) => (
            <div className="child" key={index} data-key={user.id}>
              <textarea
                spellCheck={false}
                className="name"
                cols={1}
                rows={1}
                defaultValue={user.nick}
              ></textarea>
              <textarea
                spellCheck={false}
                className="player"
                cols={1}
                rows={1}
                defaultValue={user.gun}
              ></textarea>
              <textarea
                spellCheck={false}
                className="title"
                cols={1}
                rows={1}
                defaultValue={user.map}
              ></textarea>
              <button className="updateBtn">
                <img src={updateImg} alt="" className="updateImg" />
              </button>
              <button className="deleteBtn">
                <img onClick={deleteUsers} src={trashcanImg} alt="" className="trashcanImg" />
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

export default Gremiurilo;
