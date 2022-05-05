import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "axios";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";

import Header from "./components/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <Header />
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
      </Routes>
    </Router>
  );
}

export default App;
