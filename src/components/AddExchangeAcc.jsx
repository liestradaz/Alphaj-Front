import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/consts";
import {
  Container,
  Stack,
  Button,
  Heading,
  Input,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import * as USER_HELPERS from "../utils/userToken";

function AddExchangeAcc() {
  const [exchange, setExchange] = useState("Bitso");
  const [name, setName] = useState("");
  const [subAcc, setSubAcc] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const navigate = useNavigate();

  const handleExchangeInput = (event) => setExchange(event.target.value);
  const handleNameInput = (event) => setName(event.target.value);
  const handleSubAccInput = (event) => setSubAcc(event.target.value);
  const handleApiKeyInput = (event) => setApiKey(event.target.value);
  const handleApiSecretInput = (event) => setApiSecret(event.target.value);

  function handleFormSubmission(event) {
    event.preventDefault();

    const newAccount = { exchange, name, subAcc, apiKey, apiSecret };

    axios
      .post(
        `${API_URL}/api/accounts`,
        { exchange, name, subAcc, apiKey, apiSecret },
        {
          headers: {
            Authorization: USER_HELPERS.getUserToken()
          },
        }
      )
      .then((res) => {
        setExchange("Bitso");
        setName("");
        setSubAcc("");
        setApiKey("");
        setApiSecret("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Container borderWidth="1px" p="5">
        <Heading size="lg" mb="5" align="center">
          Connect a new exchange
        </Heading>
        <form onSubmit={handleFormSubmission}>
          <Stack spacing="1">
            <FormControl>
              <FormLabel htmlFor="exchange">Exchange</FormLabel>
              <Select
                value={exchange}
                id="exchange"
                onChange={handleExchangeInput}
              >
                <option value="Bitso">Bitso</option>
                <option value="FTX">FTX</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                value={name}
                type="text"
                onChange={handleNameInput}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="subAccName">Sub-account Name</FormLabel>
              <Input
                id="subAccName"
                placeholder="Optional"
                value={subAcc}
                type="text"
                onChange={handleSubAccInput}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="apikey">API Key</FormLabel>
              <Input
                id="apikey"
                value={apiKey}
                type="text"
                onChange={handleApiKeyInput}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="apisecret">API Secret</FormLabel>
              <Input
                id="apisecret"
                value={apiSecret}
                type="text"
                onChange={handleApiSecretInput}
              />
            </FormControl>

            <Button type="submit" colorScheme="green">
              Add
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default AddExchangeAcc;
