import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

import { GlobalContext } from "./globalContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import AuthCheck from "./components/AuthCheck";
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
            <HeaderBrand user={user} setUser={setUser} />
          </>
        )}
        <Router>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>

          <Route path="/" exact>
            <AuthCheck user={user} Component={Home} />
          </Route>
          <Route path="/market/:slug?" exact>
            <AuthCheck user={user} Component={Marketplace} />
          </Route>
          <Route path="/cart" exact>
            <AuthCheck user={user} Component={Cart} />
          </Route>
          <Route path="/product/:slug" exact>
            <AuthCheck user={user} Component={ProductDetail} />
          </Route>
          <Route path="/user" exact>
            <AuthCheck user={user} Component={UserProfile} />
          </Route>
        </Router>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
