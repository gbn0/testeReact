import { Link } from 'react-router-dom'


function MyButtons() {
  return (
    <>
      <div className="buttons">
      <Link to='/demarvel'><button className="redirectButton"></button></Link>
      <Link to='/gremiurilo'><button className="redirectButton"></button></Link>
      <Link to='/csgui'><button className="redirectButton"></button></Link>
      </div>
    </>
  );
}

export default MyButtons;
