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

async function updateUsers(event: any) {
  let div = event;
  if(event.target.nodeName === 'BUTTON') {
      div = event.target.parentNode;
  }else {
      div = event.target.parentNode.parentNode;
  }
  
  const key = +div.getAttribute('data-key');

  const nameText = div.children[0].value.toString();
  const gunText = div.children[1].value.toString();
  const mapText = div.children[2].value.toString();
  const skinText = div.children[3].value.toString();
  
  await axios.put('http://localhost:5000/', {
      data: {
          id: key,
          nick: nameText,
          gun: gunText,
          map: mapText,
          skin: skinText
      }
  })
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
            <div className="child" key={index} data-key={user.id}>
              <textarea
                spellCheck={false}
                className="nick"
                cols={1}
                rows={1}
                defaultValue={user.nick}
              ></textarea>
              <textarea
                spellCheck={false}
                className="gun"
                cols={1}
                rows={1}
                defaultValue={user.gun}
              ></textarea>
              <textarea
                spellCheck={false}
                className="map"
                cols={1}
                rows={1}
                defaultValue={user.map}
              ></textarea>
              <textarea
                spellCheck={false}
                className="skin"
                cols={1}
                rows={1}
                defaultValue={user.skin}
              ></textarea>
              <button onClick={updateUsers} className="updateBtn">
                <img src={updateImg} alt="" className="updateImg" />
              </button>
              <button onClick={deleteUsers} className="deleteBtn">
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
