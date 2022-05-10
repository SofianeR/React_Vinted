import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Test = () => {
  const formData = new FormData();

  useEffect(() => {
    const fetchData = async () => {
      const newObj = [];

      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      const obj = response.data.offers;

      obj.map((item, index) => {
        delete item.owner;
        newObj.push(item);
      });

      newObj.map((item, index) => {
        if (index < 10) {
          item.product_details.map((subItem) => {
            const keys = Object.keys(subItem);
            formData.append(keys, subItem[keys]);
          });
          formData.append("title", item.product_name);
          formData.append("description", item.product_description);
          formData.append("price", item.product_price);
          formData.append("picture", item.image);
        }

        const token = Cookies.get("userToken");

        const response = axios.post(
          "https://apivinted.herokuapp.com/offer/post",

          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      });
    };
    fetchData();
  }, []);

  return <h1>TEST</h1>;
};
export default Test;
