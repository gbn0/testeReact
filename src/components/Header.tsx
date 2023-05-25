import homeImage from "../assets/home.svg";

function Header() {
  return (
    <>
      <button className="headerButton">
        <img src={homeImage} alt="" />
      </button>
    </>
  );
}

export default Header;
