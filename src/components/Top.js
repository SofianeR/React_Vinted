const Top = ({ setLogin, setSignup }) => {
  return (
    <div
      className="top-container"
      onClick={() => {
        setLogin(false);
        setSignup(false);
      }}>
      <div>
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button>Commencer a vendre</button>
      </div>
    </div>
  );
};
export default Top;
