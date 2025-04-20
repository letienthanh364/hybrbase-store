const AppPath = {
  home: "/",
  shop: "/shop",
  product: "/product",
  cart: "/cart",
  login: "/login",
};

export default AppPath;

export const ProtectedPaths = [AppPath.cart] as const;
