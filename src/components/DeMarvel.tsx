import { useState, useEffect } from 'react'
import Header from './Header';
import './styles/DeMarvel.css';
import demarvelImg from '../assets/demarvel.svg'
import refreshImg from '../assets/refresh.svg'
import trashcanImg from '../assets/trashcan.svg'
import updateImg from '../assets/update.svg'
import axios from 'axios';

function DeMarvel() {
    const [users, setUsers] = useState([]);
    
    async function getUsers() {
        const users = await axios.get('http://localhost:5000/')
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
                <button onClick={getUsers} className="createBtn" >Create</button>
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
                <div className="child" key={index}>
                    <textarea spellCheck={false} className="name" cols={1} rows={1} value={user.nick}></textarea>
                    <textarea spellCheck={false} className="movie" cols={1} rows={1} value={user.gun}></textarea>
                    <textarea spellCheck={false} className="hero" cols={1} rows={1} value={user.map}></textarea>
                    <button className="updateBtn"><img src={updateImg} alt="" className="updateImg" /></button>
                    <button className="deleteBtn"><img src={trashcanImg} alt="" className="trashcanImg" /></button>
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
    )
}

export default DeMarvel;