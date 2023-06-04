import { useState, useEffect } from 'react'
import Header from './Header';
import './styles/DeMarvel.css';
import demarvelImg from '../assets/demarvel.svg'
import refreshImg from '../assets/refresh.svg'
import trashcanImg from '../assets/trashcan.svg'
import updateImg from '../assets/update.svg'
import checkImg from '../assets/correct.png'
import cancelImg from '../assets/delete.png'
import axios from 'axios';

function DeMarvel() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({});
    
    async function getUsers() {
        const users = await axios.get('http://localhost:8000/')
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
        const movieText = div.children[1].value.toString();
        const heroText = div.children[2].value.toString();

        if(!nameText || !heroText || !movieText) {
            alert('É necessário preencher todos os campos!');
            return;
        }

        await axios.post('http://localhost:8000/', {
            data: {
                nome: nameText,
                fav_movie: movieText,
                fav_char: heroText
            }
        })

        getUsers();

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

        await axios.delete('http://localhost:8000/', {
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
        const movieText = div.children[1].value.toString();
        const heroText = div.children[2].value.toString();
        
        await axios.put('http://localhost:8000/', {
            data: {
                id: key,
                nome: nameText,
                fav_movie: movieText,
                fav_char: heroText,
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
                <button onClick={createNewUser} className="createBtn" >Create</button>
            </div>
            <img src={demarvelImg} alt="" className="demarvel"/>
        </header>
            <main>
                <div className="texts">
                <p className="nameText">NOME</p>
                <p className="favouriteMovie">FILME FAVORITO</p>
                <p className="favouriteHero">HERÓI FAVORITO</p>
                <button className="refreshBtn" onClick={getUsers} ><img src={refreshImg} alt="" className="refreshImg" /></button>
                </div>
                
                <div className="data">
                {users.map((user, index) => (
                <div className="child" key={index} data-key={user.id}>
                    <textarea spellCheck={false} className="name" cols={1} rows={1} defaultValue={user.nome}></textarea>
                    <textarea spellCheck={false} className="movie" cols={1} rows={1} defaultValue={user.fav_movie}></textarea>
                    <textarea spellCheck={false} className="hero" cols={1} rows={1} defaultValue={user.fav_char}></textarea>
                    <button className="updateBtn" onClick={updateUsers}><img src={updateImg} alt="" className="updateImg" /></button>
                    <button className="deleteBtn" onClick={deleteUsers}><img src={trashcanImg} alt="" className="trashcanImg" /></button>
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
    )
}

export default DeMarvel;