import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ModalLogin from "./components/ModalLogin";
import ModalSignup from "./components/ModalSignup";

import Header from "./components/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import Search from "./components/Search";
library.add(faMagnifyingGlass, faUser);

function App() {
  // State Data => fetch and load data api
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // State Modal show hide
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  // State filter search
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState();
  const [title, setTitle] = useState("");
  const [priceMax, setPriceMax] = useState();
  const [priceMin, setPriceMin] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setArticles(response.data);
      setIsLoading(true);
    };
    fetchData();
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
        filter={filter}
        setFilter={setFilter}
        articles={articles}
        setData={setArticles}
        setIsLoading={setIsLoading}
        title={title}
        setTitle={setTitle}
        sort={sort}
        priceMin={priceMin}
        priceMax={priceMax}
      />

      <Search
        sort={sort}
        setSort={setSort}
        setPriceMax={setPriceMax}
        setPriceMin={setPriceMin}
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
    </Router>
  );
}

export default App;
