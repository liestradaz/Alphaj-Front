import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/consts";
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
} from "@chakra-ui/react";
import * as USER_HELPERS from "../utils/userToken";

function UserPage(props) {
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [walletAddress, setWalletAddress] = useState(props.user.walletAddress);

  const handleUsernameInput = (event) => setUsername(event.target.value);
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleWalletAddressInput = (event) =>
    setWalletAddress(event.target.value);

  function handleFormSubmission(event) {
    event.preventDefault();

    const newAccount = { username, email, walletAddress };

    axios
      .put(
        `${API_URL}/api/auth/user/${props.user._id}`,
        { username, email, walletAddress },
        {
          headers: {
            Authorization: USER_HELPERS.getUserToken(),
          },
        }
      )
      .then(() => {

      })
      .catch((err) => console.log(err));
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
          <Box w="360px" p="5" borderWidth="1px" display='flex' flexDir={"column"} mt='2' alignItems='center' borderRadius={"30px"}>
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
                  <FormLabel htmlFor="walletAddress">Add Wallet Address</FormLabel>
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
            </Box>
        </Box>
      </Flex>
    </>
  );
}

export default UserPage;
