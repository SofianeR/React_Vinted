import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
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
      Cookies.set("token", response.data.token);
      // Cookies.set("connected", true);
      navigate("/");
    } catch (error) {
      alert("Erreur de login ou mot de passe");
    }
  };
  return (
    <div className="signup">
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
          <Link
            to={"/signup"}
            style={{
              textDecoration: "none",
            }}>
            <p>Pas encore de compte ? Inscris-toi !</p>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
