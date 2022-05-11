import React from "react";
import { Link } from "react-router-dom";
import Top from "../components/Top";
import Footer from "../components/Footer";

const Home = ({
  isLoading,
  data,
  showLogin,
  showSignUp,
  pageCount,
  page,
  setPage,
  fetchOffer,
  setLogin,
  setSignup,
  filters,
  stateToken,
  setLoginFromSell,
}) => {
  return (
    <div
      className={
        showLogin === true || showSignUp === true
          ? "container modal-active"
          : "container"
      }>
      <Top
        setLogin={setLogin}
        setSignup={setSignup}
        stateToken={stateToken}
        showLogin={showLogin}
        showSignup={showSignUp}
        setLoginFromSell={setLoginFromSell}
      />
      {isLoading === false ? (
        <p>Chargement des Offres</p>
      ) : (
        <div
          className={"container-offers"}
          onClick={() => {
            setLogin(false);
            setSignup(false);
          }}>
          {data.offers.map((offre, index) => {
            return (
              <Link
                to={`/offer/${offre._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                key={offre._id}>
                <div className="offer" onClick={() => {}}>
                  <div className="top-offer">
                    {offre.owner.account.avatar ? (
                      <img src={offre.owner.account.avatar.secure_url} alt="" />
                    ) : null}
                    <p>{offre.owner.account.username}</p>
                  </div>
                  <div className="center-offer">
                    {offre.product_image && (
                      <img src={offre.product_image.secure_url} alt="" />
                    )}
                  </div>

                  <div className="bottom-offer">
                    <span>{offre.product_price} €</span>
                    {offre.product_details.map((detail, index) => {
                      return (
                        <div key={index}>
                          {detail.TAILLE ? <p>{detail.TAILLE}</p> : null}
                          {detail.MARQUE ? <p>{detail.MARQUE}</p> : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <Footer
        pageCount={pageCount}
        page={page}
        setPage={setPage}
        fetchOffer={fetchOffer}
        isLoading={isLoading}
        filters={filters}
      />
    </div>
  );
};

export default Home;
