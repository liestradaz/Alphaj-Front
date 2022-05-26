import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  Button,
} from "@chakra-ui/react";
import * as USER_HELPERS from "../utils/userToken";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import * as utilFunction from "../utils/utilFunctions";
import NumberFormat from "react-number-format";

const moment = require("moment");

const removeStringChar = (str) => {
  if (str.includes("/")) {
    return str.replace("/", "");
  } else {
    return str.replace("-", "");
  }
};

function OrderDetail(props) {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const [showSensibleData, setShowSensibleData] = useState(false);

  const toggleShowButton = () => setShowSensibleData(!showSensibleData);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/trades/orders/${orderId}`, headerConfig)
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
          <Wrap
            mt={9}
            spacing={{ base: "30px", md: "20px", sm: "5" }}
            justify="center"
          >
            <WrapItem>
              <DetailCard
                label={"Symbol"}
                data={order ? order.symbol.toUpperCase() : ""}
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Side"}
                data={order ? order.side.toUpperCase() : ""}
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Contracts"}
                data={
                  showSensibleData
                    ? order
                      ? utilFunction.roundNumber(order.contracts, -4)
                      : ""
                    : "****"
                }
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Avg Price"}
                data={
                  order ? (
                    <NumberFormat
                      value={utilFunction.roundNumber(order.avgPriceOrder, -4)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  ) : (
                    ""
                  )
                }
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Cost"}
                data={
                  showSensibleData ? (
                    order ? (
                      <NumberFormat
                        value={utilFunction.roundNumber(order.cost, -4)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    ) : (
                      ""
                    )
                  ) : (
                    "****"
                  )
                }
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Date"}
                data={
                  order
                    ? moment(order.date).format("MMM DD YYYY, h:mm:ss a")
                    : ""
                }
              />
            </WrapItem>
          </Wrap>

          <TradingViewWidget
            symbol={
              order
                ? `${order.account.exchange.toUpperCase()}:${removeStringChar(
                    order.symbol
                  )}`
                : "BITSO: BTCMXN"
            }
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
