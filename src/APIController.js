import { user } from "./authController";
import productSchema from "./productSchema";

export const BASE_URL = "http://127.0.0.1:5000/api";

const API_KEY = "01948e01-f358-7025-a7b2-0707db089bba";

export const BASE_HEADERS = {
  "Content-type": "application/json; charset=UTF-8",
  "x-api-key": API_KEY,
};

export function baseFetch(
  path,
  callback,
  method = "GET",
  headers = {},
  body = null
) {
  fetch(`${BASE_URL}/${path}`, {
    method: method,
    body: body != null ? JSON.stringify(body) : undefined,
    headers: {
      ...BASE_HEADERS,
      ...headers,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      callback(json.data);
    });
}

export function fetchProducts(setter, id = null) {
  if (!user()) return;

  let baseUrl = "";
  if (!id) baseUrl = "product";
  else baseUrl = `product/${id}`;

  baseFetch(baseUrl, setter, "GET", {
    Authorization: "Bearer " + user().token,
  });
}

export function fetchCategories(setter) {
  if (!user()) return;
  baseFetch("category", setter, "GET", {
    Authorization: "Bearer " + user().token,
  });
}

export function getAssetUrl(img_url, idx = null) {
  if (idx == null)
    return (
      "http://127.0.0.1:5000/" +
      (img_url != undefined ? img_url.replaceAll("\\", "/") : "")
    );
  else
    return (
      "http://127.0.0.1:5000/" +
      (img_url[idx] != undefined ? img_url[idx].replaceAll("\\", "/") : "")
    );
}
