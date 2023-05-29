import homeImage from "../assets/home.svg";
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
    <Link to='/'>
      <button className="headerButton">
        <img src={homeImage} alt="" />
      </button>
      </Link>
    </>
  );
}

export default Header;
