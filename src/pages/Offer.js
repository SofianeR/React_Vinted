import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const Offer = () => {
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setOffer(response.data);
        setIsLoading(true);
      };

      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, [id]);
  return isLoading === false ? (
    <p>isLoading</p>
  ) : (
    <div className="offer-container">
      <div className="offer-img">
        {offer.product_image.secure_url ? (
          <img src={offer.product_image.secure_url} alt="" />
        ) : null}
      </div>
      <div className="offer-right">
        {offer.product_price ? <span>{offer.product_price} €</span> : null}

        <div className="top-description">
          <div className="product_details-left">
            <p>MARQUE</p>
            <p>TAILLE</p>
            <p>éTAT</p>
            <p>couleur</p>
            <p>EMPLACEMENT</p>
            <p>MODES de paiments</p>
          </div>
          <div className="product_details-right">
            {offer.product_details.map((detail, index) => {
              return (
                <div key={index} className="map-details">
                  {detail.MARQUE ? <p>{detail.MARQUE}</p> : null}
                  {detail.TAILLE ? <p>{detail.TAILLE}</p> : null}

                  {detail.ETAT ? <p>{detail.ETAT}</p> : null}

                  {detail.COULEUR ? <p>{detail.COULEUR}</p> : null}
                  {detail.EMPLACEMENT ? <p>{detail.MARQUE}</p> : null}
                  {detail["MODE DE PAIEMENT"] ? <p>{detail.MARQUE}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom-offer">
          {offer.product_name ? <h3>{offer.product_name}</h3> : null}
          {offer.product_description ? (
            <p>{offer.product_description}</p>
          ) : null}
        </div>
        <div className="owner">
          {offer.owner.account.avatar && (
            <img src={offer.owner.account.avatar.secure_url} alt="" />
          )}
          {offer.owner.account.username && (
            <p>{offer.owner.account.username}</p>
          )}
        </div>
        <button>Acheter</button>
      </div>
    </div>
  );
};
export default Offer;
