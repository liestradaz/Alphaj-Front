import { createContext, useState, useEffect} from 'react';
import * as USER_HELPERS from "../utils/userToken";
import { getLoggedIn, logout } from "../services/auth";
import LoadingComponent from "../components/Loading";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const UserContext = createContext();

const DEBANK_URL = "https://openapi.debank.com";

function UserProviderWrapper(props) {
    const [user, setUser] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [nftListCtx, setNftListCtx] = useState([]);

let location = useLocation();

//Set USer
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

/*   useEffect(()=>{
    getNftList(user)
  },[user]) */

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

  function getNftList(user){
    console.log("entramos", user)
    if (user?.walletAddress){
      console.log("entramos2", user)
      axios
        .get(
          `${DEBANK_URL}/v1/user/nft_list?id=${user.walletAddress}` 
        )
        .then((response) => {
          console.log("response", response.data.length)
          if (response.data.length>25){
            setNftListCtx(response.data.slice(0,26))
          } else {
            setNftListCtx(response.data)
          }
          })
        .catch((err) => console.log(err));
    } else {
      setNftListCtx([])
    }
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
 
    return (
      <UserContext.Provider value={{user, authenticate, handleLogout, nftListCtx }}>
          {props.children}
      </UserContext.Provider>
    )
  } 

export { UserContext, UserProviderWrapper };