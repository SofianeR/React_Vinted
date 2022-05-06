import axios from "axios";
import { useState } from "react";

const ModalLogin = (props) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

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
      props.setUser(response.data.token);

      props.setShowLogin(false);
      alert(`Bienvenue ${response.data.account.username}`);
    } catch (error) {
      alert(error.message);
    }
  };

  if (props.showLogin) {
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

            <p>Pas encore de compte ? Inscris-toi !</p>
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
};
export default ModalLogin;
