import demarvelImg from '../assets/demarvel.svg'
import gremiuriloImg from '../assets/gremiurilo.svg'
import csguiImg from '../assets/csgui.svg'
import { Link } from 'react-router-dom'


function MyButtons() {
  return (
    <>
      <div className="buttons">
      <Link to='/demarvel' style={{display: 'inline-block'}}><button className="redirectButton"><img src={demarvelImg} alt="" /></button></Link>
      <Link to='/gremiurilo' style={{display: 'inline-block'}}><button className="redirectButton"><img src={gremiuriloImg} alt="" /></button></Link>
      <Link to='/csgui' style={{display: 'inline-block'}}><button className="redirectButton"><img src={csguiImg} alt="" /></button></Link>
      </div>
    </>
  );
}

export default MyButtons;
