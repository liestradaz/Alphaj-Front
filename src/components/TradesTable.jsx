import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as USER_HELPERS from "../utils/userToken";
import * as utilFunction from "../utils/utilFunctions";
import NumberFormat from "react-number-format";

import ReactApexCharts from "react-apexcharts";

const moment = require("moment");

function TradesTable(props) {
  const [trades, setTrades] = useState([]);
  const [pnlState, setPnlState] = useState({});
  const [showSensibleData, setShowSensibleData] = useState(false);

  const navigate = useNavigate();

  const toggleShowButton = () => setShowSensibleData(!showSensibleData);
  const hoverBg = useColorModeValue("#AEC8CA", "#445859");

  const headerConfig = {
    headers: {
      Authorization: USER_HELPERS.getUserToken(),
    },
  };

  const handleOnCLickRow = (id) => {
    navigate(`/trades/${id}`);
  };

  useEffect(() => {
    if (props.user && headerConfig?.headers?.Authorization) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/trades`, headerConfig)
        .then((response) => {
          const sortedData = response.data
            .slice()
            .sort((a, b) => utilFunction.sortObject(b, a, "exitDate"));
          setTrades(sortedData);
        })
        .catch((err) => console.log(err));
    }
  }, [props.user, headerConfig.headers.Authorization]);

  useEffect(() => {
    if (trades.length > 0) {
      const pnlData = {};
      let prevProfit = 0;
      const sortedData = trades
        .slice()
        .sort((a, b) => utilFunction.sortObject(a, b, "exitDate"));
      sortedData.forEach((trade, idx) => {
        if (
          !Object.keys(pnlData).includes(
            moment(trade.exitDate).format("MM/DD/YY")
          )
        ) {
          pnlData[moment(trade.exitDate).format("MM/DD/YY")] =
            prevProfit + trade.profit;
        } else {
          pnlData[moment(trade.exitDate).format("MM/DD/YY")] =
            pnlData[moment(trade.exitDate).format("MM/DD/YY")] + trade.profit;
        }
        prevProfit = pnlData[moment(trade.exitDate).format("MM/DD/YY")];
      });
      setPnlState(pnlData);
    }
  }, [trades]);

  const optionsChart = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: Object.keys(pnlState),
      labels: {
        style: {
          colors: useColorModeValue("#000000", "#FFFFFF"),
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: useColorModeValue("#000000", "#FFFFFF"),
        },
        formatter: function (value) {
          return showSensibleData ? "$" + value : "****";
        },
      },
    },
  };

  const seriesChart = [
    {
      name: "series1",
      data: Object.values(pnlState),
    },
  ];

  return (
    <>
      <Button onClick={toggleShowButton}>
        {showSensibleData ? "Hide Sensible Data" : "Show Sensible Data"}
        {showSensibleData ? <ViewOffIcon ml={"2"} /> : <ViewIcon ml={"2"} />}
      </Button>

      <Box>
        <ReactApexCharts
          options={optionsChart}
          series={seriesChart}
          type="area"
          height={350}
        />
      </Box>

      <Box overflowX="scroll">
        <TableContainer>
          <Table variant="simple" size="sm" mt={5}>
            <Thead>
              <Tr>
                <Th textAlign="center">Symbol</Th>
                <Th textAlign="center">Name</Th>
                <Th textAlign="center">Exchange</Th>
                <Th textAlign="center">Type</Th>
                <Th textAlign="center">Side</Th>
                <Th textAlign="center">Contracts</Th>
                <Th textAlign="center">Entry Price</Th>
                <Th textAlign="center">Exit Price</Th>
                <Th textAlign="center">Profit</Th>
                <Th textAlign="center">Entry Date</Th>
                <Th textAlign="center">Exit Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {trades.map((trade) => {
                return (
                  <Tr
                    key={trade._id}
                    _hover={{ background: hoverBg }}
                    onClick={() => handleOnCLickRow(trade._id)}
                  >
                    <Td textAlign="center">{trade.symbol.toUpperCase()}</Td>
                    <Td textAlign="center">{trade.account.name}</Td>
                    <Td textAlign="center">{trade.account.exchange}</Td>
                    <Td textAlign="center">
                      {trade.type && trade.type.toUpperCase()}
                    </Td>
                    <Td textAlign="center">
                      {trade.side && trade.side.toUpperCase()}
                    </Td>
                    <Td textAlign="center">
                      {showSensibleData ? (
                        <NumberFormat
                          value={utilFunction.roundNumber(trade.contracts, -4)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      ) : (
                        "****"
                      )}
                    </Td>
                    <Td textAlign="center">
                      <NumberFormat
                        value={utilFunction.roundNumber(trade.avgEntry, -4)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </Td>
                    <Td textAlign="center">
                      <NumberFormat
                        value={utilFunction.roundNumber(trade.avgExit, -4)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </Td>
                    <Td textAlign="center">
                      {showSensibleData ? (
                        <NumberFormat
                          value={utilFunction.roundNumber(trade.profit, -4)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      ) : (
                        "****"
                      )}
                    </Td>
                    <Td textAlign="center">
                      {moment(trade.entryDate).format("DD/MM/YY, HH:mm")}
                    </Td>
                    <Td textAlign="center">
                      {moment(trade.exitDate).format("DD/MM/YY, HH:mm")}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default TradesTable;
