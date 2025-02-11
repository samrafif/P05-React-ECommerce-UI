import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

import { fetchProducts, getAssetUrl } from "../APIController";
import productSchema from "../productSchema";
import { numberWithCommas, abomination } from "../utils";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProd] = useState(productSchema);
  const [cartItems, setCartItems] = useLocalStorageState("items", {
    defaultValue: [],
  });

  const [activeImage, setActiveImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(
    product.variant && product.variant.length > 0 ? product.variant[0] : ""
  );
  const [expanded, setExpanded] = useState(true);

  const prevImage = () => {
    const currentIndex = product.img_urls.indexOf(activeImage);
    const newIndex =
      currentIndex === 0 ? product.img_urls.length - 1 : currentIndex - 1;
    setActiveImage(product.img_urls[newIndex]);
  };

  const nextImage = () => {
    const currentIndex = product.img_urls.indexOf(activeImage);
    const newIndex =
      currentIndex === product.img_urls.length - 1 ? 0 : currentIndex + 1;
    setActiveImage(product.img_urls[newIndex]);
  };

  useEffect(() => {
    fetchProducts(setProd, id);
  }, []);

  useEffect(() => {
    setActiveImage(product.img_urls[0]);
    console.log(product);
  }, [product]);

  return (
    <main className="p-5">
      <div className="container mx-auto">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
          {/* Image Gallery */}
          <div className="lg:col-span-3">
            <div>
              <div className="relative">
                {product.img_urls.map((url) => (
                  <div
                    key={url}
                    className={`aspect-w-3 aspect-h-2 ${
                      activeImage === url ? "" : "hidden"
                    }`}
                  >
                    <img
                      src={getAssetUrl(url)}
                      alt={product.name}
                      className="w-auto mx-auto"
                    />
                  </div>
                ))}
                <button
                  onClick={prevImage}
                  className="cursor-pointer bg-black/30 text-white absolute left-0 top-1/2 -translate-y-1/2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="cursor-pointer bg-black/30 text-white absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex mt-4 space-x-2">
                {product.img_urls.map((url) => (
                  <button
                    key={url}
                    onClick={() => setActiveImage(url)}
                    className={`cursor-pointer w-[80px] border border-gray-300 hover:border-purple-500 flex items-center justify-center ${
                      activeImage === url ? "border-purple-600" : ""
                    }`}
                  >
                    <img
                      src={getAssetUrl(url)}
                      alt={product.name}
                      className="w-auto max-auto max-h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2">
            <h1 className="text-lg font-semibold">{product.name}</h1>
            <div className="text-xl font-bold mb-6">
              IDR {numberWithCommas(product.price)}
            </div>
            {product.stock > 0 ? (
              <p className="text-green-600 mb-4">
                In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 mb-4">Out of Stock</p>
            )}

            {/* Variant Selection Picker */}
            {product.variant && product.variant.length > 0 && (
              <div className="mb-4">
                <label htmlFor="variant" className="block font-medium mb-1">
                  Select Variant:
                </label>
                <select
                  id="variant"
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  {product.variant.map((v, index) => (
                    <option key={index} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => {
                abomination(cartItems, setCartItems, {
                  ...product,
                  variant: selectedVariant,
                });
              }}
              className="bg-blue-500 py-4 text-lg flex justify-center w-full mb-6 rounded"
              disabled={product.stock === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </button>

            {/* Expandable Additional Details */}
            <div className="mb-6">
              <div
                className={`text-gray-500 wysiwyg-content ${
                  expanded ? "" : "hidden"
                }`}
              >
                <p>{product.description}</p>
                <p className="mt-4">
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category_name}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Created At:</span>{" "}
                  {product.created_at}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Updated At:</span>{" "}
                  {product.updated_at}
                </p>
              </div>
              <p className="text-right">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-purple-500 hover:text-purple-700"
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
