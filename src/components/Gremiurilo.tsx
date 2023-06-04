import { useState, useEffect } from "react";
import Header from "./Header";
import "./styles/Gremiurilo.css";
import gremiuriloImg from "../assets/gremiurilo.svg";
import refreshImg from "../assets/refresh.svg";
import trashcanImg from "../assets/trashcan.svg";
import updateImg from "../assets/update.svg";
import checkImg from '../assets/correct.png'
import cancelImg from '../assets/delete.png'
import axios from "axios";

function Gremiurilo() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  async function getUsers() {
    const users = await axios.get("http://localhost:3000/");
    setUsers(users.data);
  }

  function createNewUser() {
    setNewUser({id: 1});
}

async function postUser(event: any) {
    let div = event;
    if(event.target.nodeName === 'BUTTON') {
        div = event.target.parentNode;
    }else {
        div = event.target.parentNode.parentNode;
    }

    const nameText = div.children[0].value.toString();
    const jogadorText = div.children[1].value.toString();
    const tituloText = div.children[2].value.toString();

    if(!nameText || !jogadorText || !tituloText) {
        alert('É necessário preencher todos os campos!');
        return;
    }

    await axios.post('http://localhost:8000/', {
        data: {
            nome: nameText,
            jogadorFavorito: jogadorText,
            TituloFavorito: tituloText
        }
    })

    getUsers();
    setNewUser({});

}

function stopCreate() {
    setNewUser({});
}


  async function deleteUsers(event: any) {
    let div = event;
    if(event.target.nodeName === 'BUTTON') {
        div = event.target.parentNode;
    }else {
        div = event.target.parentNode.parentNode;
    }
    
    const key = div.getAttribute('data-key');

    await axios.delete('http://localhost:3000/', {
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

  console.log(div.children);

  const nameText = div.children[0].value.toString();
  const jogadorText = div.children[1].value.toString();
  const tituloText = div.children[2].value.toString();
  
  await axios.put('http://localhost:8000/', {
      data: {
          id: key,
          nome: nameText,
          jogadorFavorito: jogadorText,
          tituloFavorito: tituloText,
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
                defaultValue={user.nome}
              ></textarea>
              <textarea
                spellCheck={false}
                className="player"
                cols={1}
                rows={1}
                defaultValue={user.jogadorFavorito}
              ></textarea>
              <textarea
                spellCheck={false}
                className="title"
                cols={1}
                rows={1}
                defaultValue={user.tituloFavorito}
              ></textarea>
              <button className="updateBtn">
                <img src={updateImg} alt="" className="updateImg" />
              </button>
              <button className="deleteBtn">
                <img onClick={deleteUsers} src={trashcanImg} alt="" className="trashcanImg" />
              </button>
            </div>
          ))}
          {Object.keys(newUser).length === 0 ? null : (
                    <div className="child">
                        <textarea spellCheck={false} className="name" cols={1} rows={1} defaultValue={''}></textarea>
                        <textarea spellCheck={false} className="movie" cols={1} rows={1} defaultValue={''}></textarea>
                        <textarea spellCheck={false} className="hero" cols={1} rows={1} defaultValue={''}></textarea>
                        <button className="updateBtn" onClick={postUser}>
                        <img src={checkImg} alt="" className="updateImg" />
                        </button>
                        <button className="deleteBtn" onClick={stopCreate}>
                        <img src={cancelImg} alt="" className="trashcanImg" />
                        </button>
                    </div>
                )}
        </div>
      </main>
    </>
  );
}

export default Gremiurilo;
