import logo_Vinted from "../assets/img/Vinted_logo.png";

import axios from "axios";

// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = ({
  showLogin,
  setShowLogin,
  showSignUp,
  setShowSignUp,
  stateToken,
  setUser,
  filter,
  setFilter,
  articles,
  setData,
  setIsLoading,
  sort,
  title,
  setTitle,
  priceMin,
  priceMax,
}) => {
  const search = async (e) => {
    e.preventDefault();

    setIsLoading(false);

    let str = "";
    let newArrayFilter = [];

    setFilter(newArrayFilter);
    // newArrayFilter = [...filter];

    if (title !== "") {
      newArrayFilter.push({ label: "title", value: title });
      setFilter(newArrayFilter);
    }

    if (sort) {
      if (sort === true) {
        newArrayFilter.push({ label: "sort", value: "price-desc" });
      } else {
        newArrayFilter.push({ label: "sort", value: "price-asc" });
      }
    }

    if (priceMax) {
      newArrayFilter.push({ label: "priceMax", value: priceMax });
    }
    if (priceMin) {
      newArrayFilter.push({ label: "priceMin", value: priceMin });
    }

    newArrayFilter.map((filter, index) => {
      const params = Object.values(filter);
      if (index === 0) {
        str += `?${params[0]}=${params[1]}`;
      } else {
        str += `&${params[0]}=${params[1]}`;
      }
    });

    const API_URL = `https://lereacteur-vinted-api.herokuapp.com/offers/${str}`;
    console.log(API_URL);
    const response = await axios.get(API_URL);

    setData(response.data);
    setIsLoading(true);
  };
  return (
    <header>
      <div className="header-left">
        <Link to={"/"}>
          <img src={logo_Vinted} alt="logo de Vinted" />
        </Link>
        <div className="search">
          <FontAwesomeIcon icon={"magnifying-glass"} />
          <form onSubmit={search}>
            <input
              type="text"
              placeholder="Recherche des articles"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </form>
        </div>
      </div>

      {stateToken ? (
        <div className="header-right-container">
          <div className="vendre">
            <button className="button-signup">Vends tes articles</button>
          </div>
          <div className="user-logged">
            <FontAwesomeIcon
              icon={"user"}
              size={"2x"}
              color={"#94D5DA"}
              onClick={() => {
                setUser(null);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="header-right-container">
          <div className="login">
            {/* <Link to={"/signup"}> */}
            <button
              className="button-signup"
              onClick={() => {
                if (showLogin === true) {
                  setShowLogin(false);
                  setShowSignUp(!showSignUp);
                } else {
                  setShowSignUp(!showSignUp);
                }
              }}>
              S'inscrire
            </button>
            {/* </Link> */}
            {/* <Link to={"/login"}> */}
            <button
              className="button-signup"
              onClick={() => {
                if (showSignUp === true) {
                  setShowSignUp(false);
                  setShowLogin(!showLogin);
                } else {
                  setShowLogin(!showLogin);
                }
              }}>
              Se connecter
            </button>
            {/* </Link> */}
          </div>
          <div className="vendre">
            <button className="button-signup">Vends tes articles</button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
