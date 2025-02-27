import swal from "sweetalert";
import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getIdxIfProdInCart = (cart, prod) => {
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    if (item.id == prod.id) {
      return i;
    }
  }
};

export const abomination = (cart, setCart, prodInfo) => {
  swal("Added to Cart!", `${prodInfo.name} Added to cart!`, "success");
  let idx = getIdxIfProdInCart(cart, prodInfo);
  if (idx != undefined) {
    cart[idx].quantity += 1;
  } else {
    cart.push({ id: prodInfo.id, quantity: 1, variant: prodInfo.variant });
  }
  setCart(cart);
};

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
