import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from '../components/Navbar/Navbar';
import {
    Flex,
    Box
  } from '@chakra-ui/react';
import { API_URL } from "../utils/consts";
import * as USER_HELPERS from "../utils/userToken";


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
        </Box>
      </Flex>


{/*         <!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div id="tradingview_77eda"></div>
  <div class="tradingview-widget-copyright"><a href="https://es.tradingview.com/symbols/BTCMXN/?exchange=BITSO" rel="noopener" target="_blank"><span class="blue-text">BTCMXN Gráfico</span></a> por TradingView</div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "autosize": true,
  "symbol": "BITSO:BTCMXN",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "dark",
  "style": "1",
  "locale": "es",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "allow_symbol_change": true,
  "container_id": "tradingview_77eda"
}
  );
  </script>
</div> */}


        </>
    )
}

export default OrderDetail