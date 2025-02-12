import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

import { GlobalContext } from "./globalContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Header from "./components/Header";
import HeaderBrand from "./components/HeaderBrand";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import UserProfile from "./pages/UserProfile";

function App() {
  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: null,
  });

  const [selectedCat, setSelectedCat] = useState("all");
  const [query, setQuery] = useState("");

  return (
    <>
      <GlobalContext.Provider
        value={{ selectedCat, setSelectedCat, query, setQuery }}
      >
        {user != null && (
          <>
            <HeaderBrand />
          </>
        )}
        <Router>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/market/:slug?" exact>
            <Marketplace />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/product/:slug" exact>
            <ProductDetail />
          </Route>
          <Route path="/user" exact>
            <UserProfile />
          </Route>
        </Router>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
