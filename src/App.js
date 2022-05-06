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
library.add(faMagnifyingGlass, faUser);

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  const [token, setToken] = useState(Cookies.get("userToken") || null);
  console.log(token);

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
