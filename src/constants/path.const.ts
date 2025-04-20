const AppPath = {
  home: "/",
  shop: "/shop",
  product: "/product",
  cart: "/cart",
  checkout: "/checkout",
  login: "/login",
};

export default AppPath;

export const ProtectedPaths = [AppPath.cart, AppPath.checkout] as const;
