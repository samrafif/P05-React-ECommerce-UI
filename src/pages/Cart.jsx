import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { fetchProducts, getAssetUrl } from "../APIController";

import { numberWithCommas } from "../utils";

const Cart = ({ cartItems }) => {
  const [items, setItems] = useLocalStorageState("items", {
    defaultValue: [],
  });

  const [prods, setProds] = useState([]);
  const [newProds, setNewProds] = useState([]);

  useEffect(() => {
    fetchProducts(setProds);
  }, [items]);

  useEffect(() => {
    let newProds = [];
    let newItems = {};

    for (let index = 0; index < items.length; index++) {
      const el = items[index];
      newItems[el.id] = el;
    }

    for (let index = 0; index < prods.length; index++) {
      const prod = prods[index];
      if (items.map((v, _) => v.id).indexOf(prod.id) >= 0) {
        newProds.push({
          ...prod,
          variant: newItems[prod.id].variant,
          quantity: newItems[prod.id].quantity,
        });
      }
    }
    setNewProds(newProds);
  }, [prods]);

  const calculateTotal = () => {
    return newProds
      .reduce((accum, next) => accum + next.price * next.quantity, 0)
      .toFixed(2);
  };

  const removeItemFromCart = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
      )
    );
  };

  return (
    <main className="p-5">
      <div className="container lg:w-2/3 xl:w-2/3 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart Items</h1>

        <div className="bg-white p-4 rounded-lg shadow">
          <div>
            {newProds.map((product) => (
              <div key={product.id}>
                <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="/src/product.html"
                    className="w-36 h-32 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={getAssetUrl(product.img_urls, 1)}
                      className="object-cover"
                      alt={product.name}
                    />
                  </a>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between mb-3">
                      <h3>
                        {product.name} | {product.variant}
                      </h3>
                      <span className="text-lg font-semibold">
                        IDR {numberWithCommas(product.price)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        Qty:
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="ml-3 py-1 border-gray-200 focus:border-purple-600 focus:ring-purple-600 w-16"
                        />
                      </div>
                      <button
                        onClick={() => removeItemFromCart(product.id)}
                        className="text-purple-600 hover:text-purple-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="my-5" />
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span className="text-xl">
                IDR {numberWithCommas(calculateTotal())}
              </span>
            </div>
            <p className="text-gray-500 mb-6">
              Shipping and taxes calculated at checkout.
            </p>

            <button
              type="button"
              className="bg-blue-500 text-white w-full py-3 text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
