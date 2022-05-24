import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { UserProviderWrapper } from "./context/user.context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProviderWrapper>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      </UserProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
