import GlobalLayout from "./pages/_layout";
import Index from "./pages/index";
import CartIndex from "./pages/cart/index";
import Id from "./pages/products/[id]";
import LoginIndex from "./pages/login/login";
import CommunityPage from "./pages/community";
import SignUpPage from "./pages/login/signup";
import AdminIndex from "./pages/admin/index";
import BoardDetailPage from "./pages/community/[id]";
import WriteBoard from "./pages/community/writeBorad";
import ProductList from "./pages/products";

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <Index />, index: true },
      { path: "/cart", element: <CartIndex />, index: true },
      { path: "/products/:id", element: <Id /> },
      { path: "/product/", element: <ProductList /> },
      { path: "/:category", element: <ProductList /> },
      { path: "/login", element: <LoginIndex /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/community", element: <CommunityPage /> },
      { path: "/community/write", element: <WriteBoard /> },
      { path: "/community/:postId", element: <BoardDetailPage /> },
      // { path: "/admin", element: <AdminIndex />, index: true },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/cart" },
  { route: "/products" },
  { route: "/products/:id" },
  { route: "/products:category" },
  { route: "/login" },
  { route: "/signup" },
  { route: "/community" },
  { route: "/community/write" },
  { route: "/community/:postId" },
  { route: "/admin" },
];
