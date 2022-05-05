import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
const Signup = () => {
  const [userName, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const signUser = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/signup",
      {
        email: mail,
        username: userName,
        password: password,
        newsletter: newsLetter,
      }
    );
  };

  return (
    <div className="signup">
      <h1>S'inscrire</h1>
      <form className="signup-form" onSubmit={signUser}>
        <div className="input">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
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
        <div className="checkbox-div">
          <input
            type="checkbox"
            onChange={(e) => {
              setNewsLetter(!newsLetter);
              console.log(newsLetter);
            }}
          />
          <p>S'inscrire à notre newletter</p>
        </div>
        <div className="warning">
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <div className="submit">
          <input type="submit" value={"S'inscrire"} />
          <Link
            to={"/signup"}
            style={{
              textDecoration: "none",
            }}>
            <p>Tu as déja un compte ? Connecte-toi</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
