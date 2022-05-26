import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn } from "../services/auth";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import {
  Stack,
  Button,
  Heading,
  Input,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as USER_HELPERS from "../utils/userToken";

function UserPage(props) {
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [walletAddress, setWalletAddress] = useState(props.user.walletAddress);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUsernameInput = (event) => setUsername(event.target.value);
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleWalletAddressInput = (event) =>
    setWalletAddress(event.target.value);

  function handleFormSubmission(event) {
    event.preventDefault();

    const newAccount = { username, email, walletAddress };

    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/auth/user/${props.user._id}`,
        { username, email, walletAddress },
        {
          headers: {
            Authorization: USER_HELPERS.getUserToken(),
          },
        }
      )
      .then((response) => {
        console.log("res:", response);
        setSuccess(true);
        const accessToken = USER_HELPERS.getUserToken();
        getLoggedIn(accessToken).then((res) => {
          props.setUser(res.data.user);
        });
      })
      .catch((err) => setError(true));
  }

  return (
    <>
      <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Box
          w="100%"
          ml={10}
          mt={5}
          display="flex"
          flexDir={"column"}
          alignItems="center"
        >
          <Box
            w="360px"
            p="5"
            borderWidth="1px"
            display="flex"
            flexDir={"column"}
            mt="2"
            alignItems="center"
            borderRadius={"30px"}
          >
            <Heading size="lg" mb="5">
              Profile
            </Heading>
            <form onSubmit={handleFormSubmission}>
              <Stack spacing="3">
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    value={username}
                    type="text"
                    onChange={handleUsernameInput}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    value={email}
                    type="text"
                    onChange={handleEmailInput}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="walletAddress">
                    Add Wallet Address
                  </FormLabel>
                  <Input
                    id="walletAddress"
                    value={walletAddress}
                    type="text"
                    onChange={handleWalletAddressInput}
                  />
                </FormControl>

                <Button type="submit" colorScheme="green">
                  Update
                </Button>
              </Stack>
            </form>
                {success && !error && (
                  <Alert status="success" mt={3} borderRadius="30px">
                    <AlertIcon />
                    Data updated to the server!
                  </Alert>
                )}
                {!success && error && (
                  <Alert status="error" mt={3} borderRadius="30px">
                    <AlertIcon />
                    There was an error processing your request
                  </Alert>
                )}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default UserPage;
