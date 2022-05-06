import logo_Vinted from "../assets/img/Vinted_logo.png";

// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ showLogin, setShowLogin, showSignUp, setShowSignUp }) => {
  // const [cookies, setCookies] = useState(false);
  // console.log(cookies);
  // useEffect(() => {
  // console.log(Cookies.get("connected"));
  // const checkCookie = async () => {
  //   const cookieCheck = Cookies.get("token");
  //   if (cookieCheck) {
  //     setCookies(true);
  //   }
  // };
  // checkCookie();
  // setCookies(Cookies.get("connected"));
  // }, []);
  return (
    <header>
      <div className="header-left">
        <Link to={"/"}>
          <img src={logo_Vinted} alt="logo de Vinted" />
        </Link>
        <div className="search">
          <FontAwesomeIcon icon={"magnifying-glass"} />
          <input type="text" placeholder="Recherche des articles" />
        </div>
      </div>
      <div className="header-right-container">
        <div className="login">
          {/* <Link to={"/signup"}> */}
          <button
            className="button-signup"
            onClick={() => {
              if (showLogin === true) {
                setShowLogin(false);
                setShowSignUp(!showSignUp);
              } else {
                setShowSignUp(!showSignUp);
              }
            }}>
            S'inscrire
          </button>
          {/* </Link> */}
          {/* <Link to={"/login"}> */}
          <button
            className="button-signup"
            onClick={() => {
              if (showSignUp === true) {
                setShowSignUp(false);
                setShowLogin(!showLogin);
              } else {
                setShowLogin(!showLogin);
              }
            }}>
            Se connecter
          </button>
          {/* </Link> */}
        </div>
        <div className="vendre">
          <button className="button-signup">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
