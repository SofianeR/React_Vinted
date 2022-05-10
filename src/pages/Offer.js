import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

const Offer = ({ offer, setOffer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://apivinted.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(true);
      };
      // console.log(offer);
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
          {offer.product_details.map((detail, index) => {
            const keys = Object.keys(detail);
            // console.log(keys, detail[keys]);
            return (
              <div key={index} className="map-details">
                <div className="product_details_offer">
                  <p>{keys}</p>
                  {detail[keys] && <p>{detail[keys]}</p>}
                </div>
              </div>
            );
          })}
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
        <Link to={"/pay"}>
          <button>Acheter</button>
        </Link>
      </div>
    </div>
  );
};
export default Offer;
