import { baseFetch } from "./APIController";
import { user } from "./authController";

export function updateCartWithProduct(params) {
  baseFetch(
    "cart",
    () => null,
    "POST",
    {
      Authorization: "Bearer " + user().token,
    },
    { productId: 0, quantity: 0, variant: 0 }
  );
}
