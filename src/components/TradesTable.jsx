import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import * as USER_HELPERS from "../utils/userToken";
const moment = require("moment")

const headerConfig =  {
    headers: {
      Authorization: USER_HELPERS.getUserToken()
    },
  } 

function TradesTable(){
    const [trades, setTrades] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`${API_URL}/api/trades/orders`, headerConfig )
          .then((response) => setTrades(response.data))
          .catch((err) => console.log(err));
      }, []);


      return (
          <>
          <TableContainer>
        <Table variant="simple" size='sm' mt={5}>
          <Thead>
            <Tr>
              <Th textAlign="center">Symbol:</Th>
              <Th textAlign="center">Exchange:</Th>
              <Th textAlign="center">Type:</Th>
              <Th textAlign="center">Side:</Th>
              <Th textAlign="center">Contracts:</Th>
              <Th textAlign="center">Avg. Price:</Th>
              <Th textAlign="center">Cost:</Th>
              <Th textAlign="center">Date:</Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {trades.map((trade) => {
              return (
                <Tr key={trade._id}>
                  <Td textAlign="center">{trade.symbol}</Td>
                  <Td textAlign="center">{trade.account}</Td>
                  <Td textAlign="center">{trade.type}</Td>
                  <Td textAlign="center">{trade.side}</Td> 
                  <Td textAlign="center">{trade.contracts}</Td> 
                  <Td textAlign="center">{trade.avgPriceOrder}</Td> 
                  <Td textAlign="center">{trade.cost}</Td> 
                  <Td textAlign="center">{moment(trade.date).format("MMMM D YYYY, h:mm:ss a")}</Td> 
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
          </>
      )

}

export default TradesTable