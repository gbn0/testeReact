import backArrow from "../assets/backArrow.svg";
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <Link to='/' style={{display: 'inline-block'}}>
        <button className="headerButton">
          <img src={backArrow} alt="" />
        </button>
      </Link>
    </>
  );
}

export default Header;
