import { createContext, useState, useEffect} from 'react';
import * as USER_HELPERS from "../utils/userToken";
import { getLoggedIn, logout } from "../services/auth";
import LoadingComponent from "../components/Loading";
import { useLocation } from "react-router-dom";
 
const UserContext = createContext();

function UserProviderWrapper(props) {
    const [user, setUser] = useState(null);
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
  }, [location]);

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
  }
 
    return (
      <UserContext.Provider value={{user, authenticate, handleLogout }}>
          {props.children}
      </UserContext.Provider>
    )
  } 

export { UserContext, UserProviderWrapper };