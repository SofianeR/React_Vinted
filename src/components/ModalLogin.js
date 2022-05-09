import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ModalLogin = ({
  showLogin,
  showSignup,
  setShowLogin,
  setShowSignUp,
  setUser,
  setLoginFromSell,
  loginFromSell,
}) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: mail,
          password: password,
        }
      );
      // Cookies.set("token", response.data.token);
      setUser(response.data.token);

      setShowLogin(false);

      // alert(`Bienvenue ${response.data.account.username}`);

      if (loginFromSell === true) {
        navigate("/publish");
        setLoginFromSell(!loginFromSell);
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (showLogin) {
    return (
      <div className="modal">
        <h1>Se Connecter</h1>
        <form className="signup-form" onSubmit={login}>
          <div className="input">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="submit-login">
            <input type="submit" value={"Se connecter"} />
            <p
              onClick={() => {
                setShowLogin(!showLogin);
                setShowSignUp(!showSignup);
              }}>
              Pas encore de compte ? Inscris-toi !
            </p>
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
};
export default ModalLogin;
