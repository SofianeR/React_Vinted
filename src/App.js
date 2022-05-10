import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import ModalLogin from "./components/ModalLogin";
import ModalSignup from "./components/ModalSignup";
import Search from "./components/Search";
import CheckoutForm from "./pages/CheckoutForm";
// import Footer from "./components/Footer";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
import Test from "./test";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faUser,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faUser, faFilter);

function App() {
  // State Data => fetch and load data api
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //State info offer by id
  const [offer, setOffer] = useState();

  // State Modal show / hide
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [loginFromSell, setLoginFromSell] = useState(false);

  //State refresh fetOffer on publish
  const [refreshPublish, setRefreshPublish] = useState(false);

  // State filter fetchOffer
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState(false);
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [rangeValues, setRangeValues] = useState([0, 500]);
  const [valueForChange, setValueForChange] = useState();
  // const [priceMax, setPriceMax] = useState();
  // const [priceMin, setPriceMin] = useState();
  // const [skip, setSkip] = useState();

  // State cookie token => conditional rendering header logged
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  //Stripe
  const stripePromise = loadStripe(
    "pk_test_51KxrpWGrkvJAPROHt0wvFX7HPjiysEJLq44N2wUvycPr8ZfEJThdIInxtWU7mbgdW5lpL1jYN2QlijYuwD6x5ieF00z2hyvUPj"
  );

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

    if (title !== "") {
      newArrayFilter.push({ label: "title", value: title });
    }
    if (sort === true) {
      newArrayFilter.push({ label: "sort", value: "price-desc" });
    } else if (sort === false) {
      newArrayFilter.push({ label: "sort", value: "price-asc" });
    }
    if (rangeValues[0]) {
      newArrayFilter.push({ label: "priceMin", value: rangeValues[0] });
    }
    if (rangeValues[1]) {
      newArrayFilter.push({ label: "priceMax", value: rangeValues[1] });
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

    const API_URL = `https://apivinted.herokuapp.com/offers/${str}`;
    const response = await axios.get(API_URL);
    console.log(API_URL);

    setPageCount(Math.ceil(response.data.count / limit));

    setArticles(response.data);

    setIsLoading(true);
  };

  useEffect(() => {
    fetchOffer();
    console.log(limit);
  }, [valueForChange, sort, page, limit, refreshPublish]);

  return (
    <Router>
      <div className="App">
        <Header
          showLogin={showModalLogin}
          setShowLogin={setShowModalLogin}
          showSignUp={showModalSignUp}
          setShowSignUp={setShowModalSignUp}
          setLoginFromSell={setLoginFromSell}
          loginFromSell={loginFromSell}
          stateToken={token}
          setUser={setUser}
          setTitle={setTitle}
          fetchOffer={fetchOffer}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />

        {showFilter === true ? (
          <Search
            sort={sort}
            setSort={setSort}
            // setPriceMax={setPriceMax}
            // priceMax={priceMax}
            // setPriceMin={setPriceMin}
            // setSkip={setSkip}
            setLimit={setLimit}
            fetchOffer={fetchOffer}
            values={rangeValues}
            setValues={setRangeValues}
            setValueForChange={setValueForChange}
            valueForChange={valueForChange}
          />
        ) : null}

        <ModalLogin
          showLogin={showModalLogin}
          showSignup={showModalSignUp}
          setShowLogin={setShowModalLogin}
          setShowSignUp={setShowModalSignUp}
          setUser={setUser}
          setLoginFromSell={setLoginFromSell}
          loginFromSell={loginFromSell}
        />

        <ModalSignup
          showSignUp={showModalSignUp}
          showLogin={showModalLogin}
          setShowSignUp={setShowModalSignUp}
          setShowLogin={setShowModalLogin}
          setUser={setUser}
        />

        <Routes>
          <Route
            path="/"
            showSignUp={showModalSignUp}
            element={
              <Home
                data={articles}
                isLoading={isLoading}
                showSignUp={showModalSignUp}
                showLogin={showModalLogin}
                setLogin={setShowModalLogin}
                setSignup={setShowModalSignUp}
                pageCount={pageCount}
                page={page}
                setPage={setPage}
                fetchOffer={fetchOffer}
                filters={filters}
              />
            }
          />

          <Route
            path="/offer/:id"
            element={
              <Offer
                data={articles}
                axios={axios}
                offer={offer}
                setOffer={setOffer}
              />
            }
          />

          <Route
            path="/publish"
            element={
              <Publish
                setUser={setUser}
                token={token}
                setRefreshPublish={setRefreshPublish}
                refreshPublish={refreshPublish}
              />
            }
          />

          <Route
            path="/pay"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm offer={offer} />
              </Elements>
            }
          />

          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/modal" element={<Modal show={true} />} /> */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
