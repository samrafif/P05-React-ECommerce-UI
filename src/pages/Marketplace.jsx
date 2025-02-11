import React, { useState, useEffect, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../globalContext";

import Product from "../components/Product";
import productData from "../productData";
import { fetchProducts } from "../APIController";
import prodSchema from "../productSchema";

const Marketplace = () => {
  const history = useHistory();
  const [products, setProducts] = useState([prodSchema]);

  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: null,
  });

  const { selectedCat, query } = useContext(GlobalContext);

  useEffect(() => {
    if (user == null) {
      history.push("/login");
    }
  }, [user]);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  return (
    <>
      <main className="p-5">
        <div className="grid gap-8 grig-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5">
          {/* TODO: I know i should use providers or whatever, but
            I got no time
            I got no time to live
            And I can't say goodbye
            And I'm regretting having memories
            Of my friends who they used to be
            Beside me before they left me to die
          */}
          {products
            .filter(
              (prod) =>
                (selectedCat == "all"
                  ? true
                  : prod.category_name == selectedCat) &&
                prod.name.toLowerCase().indexOf(query) >= 0
            )
            .map((prod, i) => (
              <Product prodInfo={prod} key={i} />
            ))}
        </div>
      </main>
    </>
  );
};

export default Marketplace;
