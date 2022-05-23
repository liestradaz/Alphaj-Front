import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import DetailCard from "../components/DetailCard";
import {
  Flex,
  Box,
  useColorModeValue,
  Wrap,
  WrapItem,
  Center,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { API_URL } from "../utils/consts";
import * as USER_HELPERS from "../utils/userToken";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const moment = require("moment");

const headerConfig = {
  headers: {
    Authorization: USER_HELPERS.getUserToken(),
  },
};

function OrderDetail(props) {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/trades/orders/${orderId}`, headerConfig)
      .then((response) => setOrder(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Stack w="100%" ml={10} spacing={"9"}>
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
                data={order ? order.contracts : ""}
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Avg Price"}
                data={order ? "$"+order.avgPriceOrder : ""}
              />
            </WrapItem>
            <WrapItem>
              <DetailCard label={"Cost"} data={order ? "$"+order.cost : ""} />
            </WrapItem>
            <WrapItem>
              <DetailCard label={"Date"} data={order ? moment(order.date).format("MMM DD YYYY, h:mm:ss a") : ""} />
            </WrapItem>
          </Wrap>

          <TradingViewWidget
            symbol={order ? `${order.account.exchange.toUpperCase()}:${order.symbol.replace("/","")}` : "BITSO: BTCMXN"}
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
