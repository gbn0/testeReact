import Header from './Header';
import './styles/DeMarvel.css';
import demarvelImg from '../assets/demarvel.svg'
import refreshImg from '../assets/refresh.svg'

function DeMarvel() {
    return (
        <>
        <header>
            <div className="headerButtons">
                <Header />
                <button onClick={clickHandler} className="createBtn" >Create</button>
            </div>
            <img src={demarvelImg} alt="" className="demarvel"/>
        </header>
            <main>
                <div className="texts">
                <p>NOME</p>
                <p>FILME FAVORITO</p>
                <p>HERÓI FAVORITO</p>
                </div>
                <button className="refreshBtn" ><img src={refreshImg} alt="" className="refreshImg" /></button>
                <div className="data">

                </div>

                <template>
                    <div className='child'>
                        <textarea className='name' cols={1} rows={1}></textarea>
                        <textarea className='movie' cols={1} rows={1}></textarea>
                        <textarea className='hero' cols={1} rows={1}></textarea>
                        <button><img src="" alt="" /></button>
                        <button><img src="" alt="" /></button>
                    </div>
                </template>
            </main>
        </>
    )
}

function clickHandler() {

}


export default DeMarvel;