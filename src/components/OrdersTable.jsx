import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/consts";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useColorModeValue
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import * as USER_HELPERS from "../utils/userToken";

const moment = require("moment")

  function roundNumber(value, exp, type="round") {
    // if exp not defined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // if value not a number or exp not an integer...
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

function OrdersTable(props){
    const [trades, setTrades] = useState([]);
    const [showSensibleData, setShowSensibleData] = useState(false)

    const navigate = useNavigate();

    const toggleShowButton = () => setShowSensibleData(!showSensibleData);

    const handleOnCLickRow = (id) => {
      navigate(`/orders/${id}`)
    }

    useEffect(() => {
      if (props.user && headerConfig?.headers?.Authorization) {
        axios
          .get(`${API_URL}/api/trades/orders`, headerConfig )
          .then((response) => setTrades(response.data))
          .catch((err) => console.log(err));
      }
      }, [props.user]);

      const headerConfig =  {
        headers: {
          Authorization: USER_HELPERS.getUserToken()
        },
      } 

      const hoverBg = useColorModeValue("#AEC8CA", "#445859")
      return (
          <>
           <Button onClick={toggleShowButton}>
            {showSensibleData ? "Hide Sensible Data" : "Show Sensible Data"}
            {showSensibleData ?  <ViewOffIcon ml={"2"}/> :  <ViewIcon ml={"2"}/>}
          </Button> 
          <TableContainer>
        <Table variant="simple" size='sm' mt={5}>
          <Thead>
            <Tr>
              <Th textAlign="center">Symbol:</Th>
              <Th textAlign="center">Account Name:</Th>
              <Th textAlign="center">Exchange:</Th>
              <Th textAlign="center">Type:</Th>
              <Th textAlign="center">Side:</Th>
              <Th textAlign="center">Contracts:</Th>
              <Th textAlign="center">Avg. Price:</Th>
              <Th textAlign="center">Cost:</Th>
              <Th textAlign="center">Date:</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trades.map((trade) => {
              return (
                <Tr key={trade._id} _hover={{background:hoverBg}} onClick={()=>handleOnCLickRow(trade._id)} >
                  <Td textAlign="center">{trade.symbol.toUpperCase()}</Td>
                  <Td textAlign="center">{trade.account.name}</Td>
                  <Td textAlign="center">{trade.account.exchange}</Td>
                  <Td textAlign="center">{trade.type.toUpperCase()}</Td>
                  <Td textAlign="center">{trade.side.toUpperCase()}</Td> 
                  <Td textAlign="center">{showSensibleData ? roundNumber(trade.contracts, -4) : "****"}</Td> 
                  <Td textAlign="center">{"$"+roundNumber(trade.avgPriceOrder, -4)}</Td> 
                  <Td textAlign="center">{showSensibleData ?  "$"+roundNumber(trade.cost, -4) : "****"}</Td> 
                  <Td textAlign="center">{moment(trade.date).format("DD/MM/YY, h:mm a, h:mm a")}</Td> 
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
          </>
      )

}

export default OrdersTable