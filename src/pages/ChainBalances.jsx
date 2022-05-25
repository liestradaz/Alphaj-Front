import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import {
  Flex,
  Box,
  Wrap,
  WrapItem,
  Text,
  Heading,
  Image,
  AspectRatio,
  Container,
  Link,
  Center,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReactDomLink } from "react-router-dom";

const DEBANK_URL = "https://openapi.debank.com";

function ChainBalances(props) {
  const [chainList, setChainList] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (props.user.walletAddress) {
      axios
        .get(
          `${DEBANK_URL}/v1/user/total_balance?id=${props.user.walletAddress}`
        )
        .then((response) => {
          setChainList(response.data.chain_list);
          setBalance(response.data.total_usd_value);
        })
        .catch((err) => console.log(err));
    } else {
      setChainList([]);
    }
  }, []);

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
          <Heading size="2xl" mb="5">
            Your Holdings
          </Heading>

          <Container
                      border={"1px"}
                      maxW="300px"
                      p={5}
                      borderRadius={"30px"}
                      mb={5}
                      textAlign="center"
                    >
          <Text fontWeight={"700"} fontSize="md">Total Balance:</Text>
          <Text>  ${balance}</Text>
          </Container>

          {chainList && chainList.length === 0 ? (
            <Center
              bg="tomato"
              h="100px"
              color="white"
              borderRadius={"30px"}
              p={50}
            >
              <VStack>
                <Text>Wallet not found. Please add one. </Text>
                <Link as={ReactDomLink} to={`/user/${props.user._id}`}>
                  {" "}
                  Go to Profile Page
                </Link>
              </VStack>
            </Center>
          ) : (
            <Wrap spacing="25px" justify="center">
              {chainList.map((chain, idx) => {
                return (
                  <WrapItem key={idx} w={"300px"} justify="center">
                    <Container
                      key={chain.id}
                      border={"1px"}
                      maxW="300px"
                      p={5}
                      borderRadius={"30px"}
                    >
                      <Flex>
                        <Box>
                          {chain.logo_url && (
                            <Image
                              src={chain.logo_url}
                              alt="Logo Image"
                              boxSize="50px"
                            />
                          )}
                        </Box>
                        <Box ml={5}>
                          <Text mt={2} fontWeight={"700"} fontSize="md">
                            {chain.name}
                          </Text>

                          <Text fontSize="md" as="em">
                            ${chain.usd_value}
                          </Text>
                        </Box>
                      </Flex>
                    </Container>
                  </WrapItem>
                );
              })}
            </Wrap>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default ChainBalances;
