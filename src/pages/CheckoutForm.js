import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [completed, setCompleted] = useState(false);

  const prix = offer.product_price;
  const protectionFee = prix / 10;
  const shippingFee = protectionFee * 2;
  const total = prix + protectionFee + shippingFee;

  const handleSubmitStripe = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: "id de l'acheteur",
    });
    console.log(stripeResponse);

    const stripeToken = stripeResponse.token.id;
    console.log(stripeToken);

    const response = await axios.post("https://apivinted.herokuapp.com/pay", {
      stripeToken,
    });

    response.data.status === "succeeded" && setCompleted(true);
  };

  return !completed ? (
    <div className="container-payform">
      <form onSubmit={handleSubmitStripe}>
        <div className="top-payment">
          <h4>Résumé de la commande</h4>
          <div className="details-payment">
            <div>
              <p>Commande</p>
              <p>{prix} €</p>
            </div>
            <div>
              <p>Frais de protection acheteurs</p>
              <p>{protectionFee} €</p>
            </div>
            <div>
              <p>Frais de port</p>
              <p>{shippingFee} €</p>
            </div>
          </div>
        </div>
        <div className="total-payment">
          <div>
            <span>Total</span>
            <span>{total} €</span>
          </div>
          <div>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrire "
              {offer.product_name}". Vous allez payer "{total}" (frais de
              protection et frais de port inclus).
            </p>
          </div>
        </div>
        <CardElement className="card-element" />
        <input type="submit" value={"Payer"} className={"pay-button"} />
      </form>
    </div>
  ) : (
    (setTimeout(() => {
      navigate("/");
    }, 2000),
    (<h3>Paiement effectué !</h3>))
  );
};
export default CheckoutForm;
