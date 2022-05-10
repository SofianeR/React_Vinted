import { useState } from "react";

import axios from "axios";

const ModalSignup = (props) => {
  const [userName, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: mail,
          username: userName,
          password: password,
          newsLetter: newsLetter,
        }
      );

      props.setUser(response.data.token);

      // alert(
      //   `Nouvel utilisateur bien enregistré :
      //   Bienvenue ${response.data.account.username}`
      // );

      props.setShowSignUp(false);
    } catch (error) {
      alert(error.message);
    }
  };

  if (props.showSignUp) {
    return (
      <div className="modal-container-signup">
        <div className="modal-signup">
          <h1>S'inscrire</h1>
          <form className="modal-signup-form" onSubmit={signUp}>
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
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </div>
            <div className="submit">
              <input type="submit" value={"S'inscrire"} />

              <p
                onClick={() => {
                  props.setShowSignUp(false);
                  props.setShowLogin(true);
                }}>
                Tu as déja un compte ? Connecte-toi
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default ModalSignup;
