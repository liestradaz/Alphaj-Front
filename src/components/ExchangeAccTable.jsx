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
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import * as USER_HELPERS from "../utils/userToken";

function ExchangeAccTable() {
  const [isEdit, setIsEdit] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const navigate = useNavigate();

  const toggleEditButton = () => setIsEdit(!isEdit);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/accounts`, headerConfig )
      .then((response) => setAccounts(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/accounts`, headerConfig)
      .then((response) => setAccounts(response.data))
      .catch((err) => console.log(err));
  }, [accounts]);

  const handleDeleteButton = (accountId) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/accounts/${accountId}`, headerConfig)
      .then(() => navigate("/accounts"))
      .catch((err) => console.log(err));
  };

  const headerConfig =  {
    headers: {
      Authorization: USER_HELPERS.getUserToken()
    },
  } 

  return (
    <>
      <TableContainer>
        <Table variant="simple" size='sm' mt={5}>
          <Thead>
            <Tr>
              <Th textAlign="center">Exchange:</Th>
              <Th textAlign="center">Name:</Th>
              <Th textAlign="center">Sub-account Name:</Th>
              <Th textAlign="center">API Key:</Th>
              <Th textAlign="center">API Secret:</Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {accounts.map((acc) => {
              return (
                <Tr key={acc._id}>
                  <Td>{acc.exchange}</Td>
                  <Td>{acc.name}</Td>
                  <Td>{acc.subAcc}</Td>
                  <Td>{acc.apiKey}</Td> 
                  <Td>**********</Td>
                  <Td>
                    <IconButton
                      onClick={() => handleDeleteButton(acc._id)}
                      /* onClick={()=>console.log("clickeando")} */
                      aria-label="Delete exchange account"
                      icon={<DeleteIcon />}
                      size="sm"
                      mr="2"
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ExchangeAccTable;
