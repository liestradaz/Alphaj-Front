import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import ProtectedPage from "../pages/ProtectedPage";
import ExchangeAccount from "../pages/exchanges";
import Dashboard from "../pages/Dashboard";
import OrderDetail from "../pages/OrderDetail";
import NftExplorer from "../pages/NftExplorer";
import UserPage from "../pages/UserPage";
import * as PATHS from "../utils/paths";

const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },
    {
      path: PATHS.LOGINPAGE,
      element: <Login {...props} />,
    },
    {
      path: PATHS.USERPAGE,
      element: user ? (
        <UserPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.EXCHANGEACCOUNT,
      element: user ? (
        <ExchangeAccount {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.DASHBOARD,
      element: user ? (
        <Dashboard {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.ORDERDETAIL,
      element: user ? (
        <OrderDetail {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.NFTEXPLORER,
      element: user ? (
        <NftExplorer {...props} />
      ) : (
        <Navigate to={PATHS.NFTEXPLORER} replace />
      ),
    },
    {
      path: PATHS.PROTECTEDPAGE,
      element: user ? (
        <ProtectedPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
  ];
};

export default routes;
