import React, { useState, useEffect, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { GlobalContext } from "../globalContext";

import Header from "../components/Header";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  getAssetUrl,
} from "../APIController";
import prodSchema from "../productSchema";
import { useQuery } from "../utils";

const Marketplace = () => {
  const { slug } = useParams();
  const page = useQuery();

  const history = useHistory();
  const [products, setProducts] = useState([prodSchema]);
  const [productsMetadata, setProductsMetadata] = useState({});
  const [category, setCategory] = useState(null);

  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: null,
  });

  const { selectedCat, query, setSelectedCat } = useContext(GlobalContext);

  useEffect(() => {
    console.log(page.get("page"));

    if (!slug)
      fetchProducts(setProducts, null, page.get("page"), setProductsMetadata);

    if (slug) {
      fetchCategories(setCategory, slug);
      setSelectedCat(slug);
      fetchProductsByCategory(setProducts, slug, null);
    }
  }, []);

  return (
    <>
      <Header />
      {category != null && (
        <div
          style={{
            overflow: "hidden",
            height: 500,
            width: "100%",
            position: "relative",
          }}
        >
          <div className="mx-96 my-42">
            <h1 className="text-5xl font-bold text-white">{category.name}</h1>
            <p className="text-xl text-white py-2">{category.description}</p>
          </div>
          <div
            style={{
              backgroundImage: "url(" + getAssetUrl(category.img_url) + ")",
              height: 500,
              width: "100%",
              filter: "brightness(0.4)",
              backgroundPosition: "center",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          ></div>
        </div>
      )}
      <main className="p-5 flex flex-col items-center">
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
        <Pagination
          pageCount={productsMetadata.totalPages}
          currentPage={parseInt(page.get("page"))}
        />
      </main>
    </>
  );
};

export default Marketplace;
