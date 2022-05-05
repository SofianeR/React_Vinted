import logo_Vinted from "../assets/img/Vinted_logo.png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [cookies, setCookies] = useState(false);
  useEffect(() => {
    console.log(Cookies.get("token") === true);
    if (Cookies.get("token") !== "") {
      setCookies(true);
    }
  }, []);
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
      {cookies === false ? (
        <div className="header-right-container">
          <div className="login">
            <Link to={"/signup"}>
              <button className="button-signup">S'inscrire</button>
            </Link>
            <Link to={"/login"}>
              <button className="button-signup">Se connecter</button>
            </Link>
          </div>
          <div className="vendre">
            <button className="button-signup">Vends tes articles</button>
          </div>
        </div>
      ) : (
        <div className="header-right-container">
          <div className="vendre">
            <button className="button-signup">Vends tes articles</button>
          </div>
          <div className="user-logged">
            <FontAwesomeIcon
              icon={"user"}
              size={"2x"}
              color={"#94D5DA"}
              onClick={() => {
                Cookies.remove("token");
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
