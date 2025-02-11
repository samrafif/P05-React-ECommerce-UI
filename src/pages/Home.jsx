import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useHistory } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

import Product from "../components/Product";
import { fetchCategories, fetchProducts } from "../APIController";
import prodSchema from "../productSchema";

const Home = () => {
  const history = useHistory();

  const [items, setItems] = useLocalStorageState("items", {
    defaultValue: null,
  });

  const [products, setProducts] = useState([prodSchema]);
  const [categories, setCategories] = useState([]);

  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: null,
  });

  useEffect(() => {
    if (user == null) {
      history.push("/login");
    }
  }, [user]);

  useEffect(() => {
    fetchProducts(setProducts);
    fetchCategories(setCategories);
  }, []);

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-2 gap-0">
        {/* TODO: I know i should use providers or whatever, but
            I got no time
            I got no time to live
            And I can't say goodbye
            And I'm regretting having memories
            Of my friends who they used to be
            Beside me before they left me to die
          */}
        {categories.map((cat, i) => (
          <div>
            <img
              className="opacity-75 hover:opacity-100 duration-500"
              src={"http://127.0.0.1:5000/" + cat.img_url.replaceAll("\\", "/")}
              alt=""
            />
          </div>
        ))}
      </div>
      <main className="p-5">
        <a className="text-xl flex items-center gap-4 py-4" href="/market">
          See more
          <FaArrowRight></FaArrowRight>
        </a>
        <ScrollMenu>
          {products.map((prod, i) => (
            <div style={{ marginRight: "1rem" }}>
              <Product prodInfo={prod} key={i} />
            </div>
          ))}
        </ScrollMenu>
      </main>
    </>
  );
};

export default Home;
