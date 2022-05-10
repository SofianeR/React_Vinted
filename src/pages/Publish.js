import axios from "axios";
import Cookies from "js-cookie";
import Dropzone from "react-dropzone";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [titlePublish, setTitlePublish] = useState("");
  const [descriptionPublish, setDescriptionPublish] = useState("");
  const [brandPublish, setBrandPublish] = useState("");
  const [sizePublish, setSizePublish] = useState("");
  const [colorPublish, setColorPublish] = useState("");
  const [statePublish, setStatePublish] = useState("");
  const [spotPublish, setSpotPublish] = useState("");
  const [pricePublish, setPricePublish] = useState("");
  const [exchangePublish, setExchangePublish] = useState(false);
  const [picture, setPicture] = useState([]);

  const navigate = useNavigate();

  const publishOffer = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", titlePublish);
      formData.append("description", descriptionPublish);
      formData.append("price", pricePublish);
      formData.append("condition", statePublish);
      formData.append("city", spotPublish);
      formData.append("brand", brandPublish);
      formData.append("size", sizePublish);
      formData.append("exchange", exchangePublish);
      formData.append("color", colorPublish);
      formData.append("picture", picture[0]);

      const token = Cookies.get("userToken");

      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Votre annonce a bien été ajoutée");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="container-form-publish">
      {/* <button
        onClick={() => {
          picture.map((item) => {
            console.log(Object.keys(item), item);
          });
        }}>
        CONSOLE
      </button> */}
      <div className="container-all-publish">
        <h2>Vends ton article</h2>
        <form onSubmit={publishOffer}>
          <div className="container-publish-picture">
            <div className="picture">
              {/* <input
                type="file"
                name="pictureAdd"
                onChange={(e) => {
                  setPicture(e.target.files[0]);
                }}
              /> */}
              <Dropzone
                onDrop={(acceptedFiles) => {
                  const files = [...picture];

                  acceptedFiles.map((item) => {
                    files.push(item);
                    return files;
                  });
                  setPicture(acceptedFiles);
                }}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <button>✚ Ajouter une photo</button>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
          <div className="container-publish">
            <div className="input-fields">
              <p>Titre</p>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                onChange={(e) => {
                  setTitlePublish(e.target.value);
                }}
              />
            </div>

            <div className="input-fields">
              <p>Décris ton article</p>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                placeholder="ex: porté quelquesfois, taille correctement"
                onChange={(e) => {
                  setDescriptionPublish(e.target.value);
                }}></textarea>
            </div>
          </div>
          <div className="container-publish">
            <div className="input-fields">
              <p>Marque</p>
              <input
                type="text"
                placeholder="ex: Zara"
                onChange={(e) => {
                  setBrandPublish(e.target.value);
                }}
              />
            </div>

            <div className="input-fields">
              <p>Taille</p>
              <input
                type="text"
                placeholder="ex: L/40/12"
                onChange={(e) => {
                  setSizePublish(e.target.value);
                }}
              />
            </div>

            <div className="input-fields">
              <p>Couleur</p>
              <input
                type="text"
                placeholder="ex: Fushia"
                onChange={(e) => {
                  setColorPublish(e.target.value);
                }}
              />
            </div>

            <div className="input-fields">
              <p>Etat</p>
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                onChange={(e) => {
                  setStatePublish(e.target.value);
                }}
              />
            </div>

            <div className="input-fields">
              <p>Lieu</p>
              <input
                type="text"
                placeholder="ex: Paris"
                onChange={(e) => {
                  setSpotPublish(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="container-publish">
            <div className="input-fields">
              <p>Prix</p>
              <input
                type="text"
                placeholder="ex: 0,00 €"
                onChange={(e) => {
                  setPricePublish(e.target.value);
                }}
              />
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                onChange={() => {
                  setExchangePublish(!exchangePublish);
                }}
              />
              <p>Je suis intéressé(e) par les échanges</p>
            </div>
          </div>
          <div className="submit-publish">
            <input type="submit" value={"Ajouter"} />
          </div>
        </form>
      </div>
    </div>
  ) : (
    navigate("/")
  );
};
export default Publish;
