import React, { useState, useEffect, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { GlobalContext } from "../globalContext";

import Product from "../components/Product";
import { fetchCategories, fetchProducts, getAssetUrl } from "../APIController";
import prodSchema from "../productSchema";
import { useQuery } from "../utils";

const Marketplace = () => {
  const { slug } = useParams();
  const page = useQuery();

  const history = useHistory();
  const [products, setProducts] = useState([prodSchema]);
  const [category, setCategory] = useState({});

  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: null,
  });

  const { selectedCat, query, setSelectedCat } = useContext(GlobalContext);

  useEffect(() => {
    if (user == null) {
      history.push("/login");
    }
  }, [user]);

  useEffect(() => {
    console.log(page.get("page"));
    fetchProducts(setProducts, null, page.get("page"));

    if (slug) {
      fetchCategories(setCategory, slug);
      setSelectedCat(slug);
    }
  }, []);

  return (
    <>
      {slug != null && (
        <img
          style={{
            height: 500,
            width: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
          src={getAssetUrl(category.img_url)}
        />
      )}
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
                  : prod.category_slug == selectedCat) &&
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
