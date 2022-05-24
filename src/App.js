import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import Sidebar from "./components/Sidebar/Sidebar";
import { useContext } from 'react';
import { UserContext } from "./context/user.context";
import {
  Flex, Box
} from "@chakra-ui/react";

export default function App() {
  const {user, authenticate, handleLogout } = useContext(UserContext);

  console.log("appuser",user)
  return (
    <div className="App">
    {/* <Navbar handleLogout={handleLogout} user={user} />  */}
    
      <Routes>
        {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
     
    </div>
  );
}

