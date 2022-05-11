import { useNavigate } from "react-router-dom";
const Top = ({
  setLogin,
  setSignup,
  stateToken,
  showLogin,
  showSignup,
  setLoginFromSell,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="top-container"
      onClick={() => {
        if (showLogin === true || showSignup === true) {
          setLogin(false);
          setSignup(false);
        }
      }}>
      <div>
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button
          onClick={() => {
            if (stateToken) {
              navigate("/publish");
            } else {
              setLogin(true);
              setLoginFromSell(true);
            }
          }}>
          Commencer a vendre
        </button>
      </div>
    </div>
  );
};
export default Top;
