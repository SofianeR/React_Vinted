import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const ModalSignup = (props) => {
  const [userName, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: mail,
          username: userName,
          password: password,
          newsLetter: newsLetter,
        }
      );
      alert("Nouvel utilisateur bien enregistré");
      props.setShowSignUp(false);
    } catch (error) {
      alert(error.message);
    }
  };

  if (props.showSignUp) {
    return (
      <div className="signup">
        <h1>S'inscrire</h1>
        <form className="signup-form" onSubmit={signUp}>
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
                setNewsLetter(e.target.value);
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
              to={"/login"}
              style={{
                textDecoration: "none",
              }}>
              <p>Tu as déja un compte ? Connecte-toi</p>
            </Link>
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
};
export default ModalSignup;
