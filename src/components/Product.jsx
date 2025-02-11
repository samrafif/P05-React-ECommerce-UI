import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { FaStar } from "react-icons/fa";

import { getAssetUrl } from "../APIController";
import { numberWithCommas } from "../utils";

import { abomination } from "../utils";

const Product = (props) => {
  const [cartItems, setCartItems] = useLocalStorageState("items", {
    defaultValue: [],
  });

  return (
    <>
      <div className="w-96 border border-1 border-gray-200 rounded-md hover:border-purple-600 transition-colors bg-white">
        <a
          href={"/product/" + props.prodInfo.slug}
          className="block overflow-hidden"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={getAssetUrl(props.prodInfo.img_urls, 1)}
            alt=""
            className="rounded-lg hover:scale-105 hover:rotate-1 transition-transform"
            style={{ height: "300px" }}
          />
        </a>
        <div className="p-4">
          <h3 className="text-lg">
            <a href={"/product/" + props.prodInfo.slug}>
              {props.prodInfo.name}
            </a>
          </h3>
          <h5 className="text-xl font-bold">
            IDR {numberWithCommas(props.prodInfo.price)}
          </h5>
          <h5
            style={{ color: "orange" }}
            className="font-bold flex items-center"
          >
            {" "}
            <FaStar></FaStar> {props.prodInfo.rating}
          </h5>
        </div>
        <div className="flex justify-between py-3 px-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              abomination(cartItems, setCartItems, props.prodInfo);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
