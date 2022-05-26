import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";import LoadingComponent from "./components/Loading";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import { useContext } from 'react';
import { UserContext } from "./context/user.context";

export default function App() {
  const {user, authenticate, handleLogout, setUser } = useContext(UserContext);

  /* const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let location = useLocation();

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  } */

  return (
    <div className="App">

      <Routes>
        {routes({ user, authenticate, handleLogout, setUser }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
     
    </div>
  );
}

