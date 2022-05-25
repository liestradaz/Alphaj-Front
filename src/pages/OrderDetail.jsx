import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import DetailCard from "../components/DetailCard";
import {
  Flex,
  useColorModeValue,
  Wrap,
  WrapItem,
  Stack,
  Button
} from "@chakra-ui/react";
import { API_URL } from "../utils/consts";
import * as USER_HELPERS from "../utils/userToken";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const moment = require("moment");

function roundNumber(value, exp, type="round") {
  // if exp not defined or zero
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // if value not a number or exp not an integer
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

const removeStringChar = (str) => { 
  if (str.includes("/")){
    return str.replace("/","")
  } else {
    return str.replace("-","")
  }

}

function OrderDetail(props) {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const [showSensibleData, setShowSensibleData] = useState(false)

  const toggleShowButton = () => setShowSensibleData(!showSensibleData);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/trades/orders/${orderId}`, headerConfig)
      .then((response) => setOrder(response.data))
      .catch((err) => console.log(err));
  }, []);

  const headerConfig = {
    headers: {
      Authorization: USER_HELPERS.getUserToken(),
    },
  };

  return (
    <>
      <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Stack w="100%" ml={10} spacing={"9"}>
        <Button onClick={toggleShowButton}>
            {showSensibleData ? "Hide Sensible Data" : "Show Sensible Data"}
          </Button> 
          <Wrap mt={9} spacing= {{base: '30px', md: '20px', sm:"5"}} justify='center'>
            <WrapItem>
              <DetailCard label={"Symbol"} data={order ? order.symbol.toUpperCase() : ""} />
            </WrapItem>
            <WrapItem>
              <DetailCard label={"Side"} data={order ? order.side.toUpperCase() : ""} />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Contracts"}
                data={showSensibleData ? order ? roundNumber(order.contracts, -4) : "" : "****"}
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Avg Price"}
                data={order ? "$"+ roundNumber(order.avgPriceOrder, -4) : ""}
              />
            </WrapItem>
            <WrapItem>
              <DetailCard label={"Cost"} data={showSensibleData ? order ? "$"+roundNumber(order.cost, -4) : "" : "****"} />
            </WrapItem>
            <WrapItem>
              <DetailCard label={"Date"} data={order ? moment(order.date).format("MMM DD YYYY, h:mm:ss a") : ""} />
            </WrapItem>
          </Wrap>

          <TradingViewWidget
            symbol={order ? `${order.account.exchange.toUpperCase()}:${removeStringChar(order.symbol)}` : "BITSO: BTCMXN"}
            allow_symbol_change={false}
            hide_side_toolbar={false}
            theme={useColorModeValue(Themes.LIGHT, Themes.DARK)}
          />
        </Stack>
      </Flex>
    </>
  );
}

export default OrderDetail;
