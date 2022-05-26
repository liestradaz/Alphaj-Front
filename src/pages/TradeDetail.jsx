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
import { API_URL } from "../utils/consts";
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

function TradeDetail(props) {
  const { tradeId } = useParams();
  const [trade, setTrade] = useState();
  const [showSensibleData, setShowSensibleData] = useState(false);

  const toggleShowButton = () => setShowSensibleData(!showSensibleData);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/trades/${tradeId}`, headerConfig)
      .then((response) => setTrade(response.data))
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
                data={trade ? trade.symbol.toUpperCase() : ""}
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Side"}
                data={trade ? trade.side.toUpperCase() : ""}
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Contracts"}
                data={
                  showSensibleData
                    ? trade
                      ? utilFunction.roundNumber(trade.contracts, -4)
                      : ""
                    : "****"
                }
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Avg Entry Price"}
                data={
                  trade ? (
                    <NumberFormat
                      value={utilFunction.roundNumber(trade.avgEntry, -4)}
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
                label={"Avg Exit Price"}
                data={
                  trade ? (
                    <NumberFormat
                      value={utilFunction.roundNumber(trade.avgExit, -4)}
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
                label={"Entry Date"}
                data={
                  trade
                    ? moment(trade.entryDate).format("MMM DD YYYY, h:mm:ss a")
                    : ""
                }
              />
            </WrapItem>
            <WrapItem>
              <DetailCard
                label={"Exit Date"}
                data={
                  trade
                    ? moment(trade.exitDate).format("MMM DD YYYY, h:mm:ss a")
                    : ""
                }
              />
            </WrapItem>
          </Wrap>

          <TradingViewWidget
            symbol={
              trade
                ? `${trade.account.exchange.toUpperCase()}:${removeStringChar(
                    trade.symbol
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

export default TradeDetail;
