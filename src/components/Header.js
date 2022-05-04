import logo_Vinted from "../assets/img/Vinted_logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>
      <div className="vendre">
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
