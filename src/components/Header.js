import logo_Vinted from "../assets/img/Vinted_logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-left">
        <img src={logo_Vinted} alt="logo de Vinted" />
        <div className="search">
          <FontAwesomeIcon icon={"magnifying-glass"} />
          <input type="text" placeholder="Recherche des articles" />
        </div>
      </div>
      <div className="login">
        <Link to={"/signup"}>
          <button className="button-signup">S'inscrire</button>
        </Link>
        <Link to={"/signup"}>
          <button className="button-signup">Se connecter</button>
        </Link>
      </div>
      <div className="vendre">
        <button className="button-signup">Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
