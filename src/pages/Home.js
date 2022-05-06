import React from "react";
import { Link } from "react-router-dom";
import Top from "../components/Top";

const Home = ({ isLoading, data }) => {
  return (
    <div className="container">
      <Top />
      {isLoading === false ? (
        <p>Chargement des Offres</p>
      ) : (
        <div className="container-offers">
          <input type="checkbox" />
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
                    <img src={offre.product_image.secure_url} alt="" />
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
    </div>
  );
};

export default Home;
