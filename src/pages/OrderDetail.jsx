import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from '../components/Navbar/Navbar';
import {
    Flex,
    Box,
    useColorModeValue
  } from '@chakra-ui/react';
import { API_URL } from "../utils/consts";
import * as USER_HELPERS from "../utils/userToken";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';


const headerConfig =  {
    headers: {
      Authorization: USER_HELPERS.getUserToken()
    },
  } 

function OrderDetail (props){

    const { orderId } = useParams();
        const [order, setOrder] = useState([]);
console.log("params:", `${API_URL}/api/trades/orders/${orderId}` )

useEffect(() => {
    axios
      .get(`${API_URL}/api/trades/orders/${orderId}`, headerConfig )
      .then((response) => setOrder(response.data))
      .catch((err) => console.log(err));
  }, []);
console.log(order)


    return (
        <>
        <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Box w="100%" ml={10}>

        <p>{order.symbol}</p>
         <TradingViewWidget symbol="BITSO:BTCMXN" allow_symbol_change={false} hide_side_toolbar={false} theme={useColorModeValue(Themes.LIGHT, Themes.DARK)} />
        </Box>
      </Flex>
        </>
    )
}

export default OrderDetail