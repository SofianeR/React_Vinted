import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ModalLogin from "./components/ModalLogin";
import ModalSignup from "./components/ModalSignup";
import Search from "./components/Search";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";
library.add(faMagnifyingGlass, faUser);

function App() {
  // State Data => fetch and load data api
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // State Modal show / hide
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  // State filter fetchOffer
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState();
  const [title, setTitle] = useState("");
  const [priceMax, setPriceMax] = useState();
  const [priceMin, setPriceMin] = useState();
  const [skip, setSkip] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState();
  const [pageCount, setPageCount] = useState(1);

  // State cookie token => conditional rendering header logged
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  //Function to check if logged
  const setUser = (token) => {
    if (token !== null) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
    setToken(token);
  };

  // Function to fetchData on landing page & to fetchData with filters (Search bar)
  const fetchOffer = async () => {
    setIsLoading(false);

    let str = "";
    let newArrayFilter = [];

    // setFilter(newArrayFilter);
    // newArrayFilter = [...filter];
    if (title !== "") {
      newArrayFilter.push({ label: "title", value: title });
      // setFilter(newArrayFilter);
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

    if (limit) {
      newArrayFilter.push({ lablel: "limit", value: limit });
    } else {
      newArrayFilter.push({ lablel: "limit", value: 10 });
    }

    if (page) {
      newArrayFilter.push({ label: "page", value: page });
    }

    newArrayFilter.map((filter, index) => {
      const params = Object.values(filter);

      if (index === 0) {
        str += `?${params[0]}=${params[1]}`;
      } else {
        str += `&${params[0]}=${params[1]}`;
      }
      return str;
    });

    const API_URL = `https://lereacteur-vinted-api.herokuapp.com/offers/${str}`;
    console.log(API_URL);
    const response = await axios.get(API_URL);

    setPageCount(Math.ceil(response.data.count / limit));
    setArticles(response.data);
    setIsLoading(true);
    // setLimit(10);
  };

  useEffect(() => {
    fetchOffer();
  }, []);

  return (
    <Router>
      <Header
        showLogin={showModalLogin}
        setShowLogin={setShowModalLogin}
        showSignUp={showModalSignUp}
        setShowSignUp={setShowModalSignUp}
        stateToken={token}
        setUser={setUser}
        setTitle={setTitle}
        fetchOffer={fetchOffer}
      />

      <Search
        sort={sort}
        setSort={setSort}
        setPriceMax={setPriceMax}
        setPriceMin={setPriceMin}
        setSkip={setSkip}
        setLimit={setLimit}
      />

      <ModalLogin
        showLogin={showModalLogin}
        setShowLogin={setShowModalLogin}
        setShowSignUp={setShowModalSignUp}
        setUser={setUser}
      />

      <ModalSignup
        showSignUp={showModalSignUp}
        setShowSignUp={setShowModalSignUp}
        setShowLogin={setShowModalLogin}
        setUser={setUser}
      />

      <Routes>
        <Route
          path="/"
          element={<Home data={articles} isLoading={isLoading} />}
        />

        <Route
          path="/offer/:id"
          element={<Offer data={articles} axios={axios} />}
        />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        {/* <Route path="/modal" element={<Modal show={true} />} /> */}
      </Routes>
      <Footer
        pageCount={pageCount}
        page={page}
        setPage={setPage}
        fetchOffer={fetchOffer}
        isLoading={isLoading}
      />
    </Router>
  );
}

export default App;
