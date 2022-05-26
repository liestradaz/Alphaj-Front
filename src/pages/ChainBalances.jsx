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
  Container,
  Link,
  Center,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReactDomLink, useLocation } from "react-router-dom";
import ReactApexCharts from "react-apexcharts";
import * as utilFunction from "../utils/utilFunctions";
import NumberFormat from 'react-number-format';

const DEBANK_URL = "https://openapi.debank.com";

function ChainBalances(props) {
  const [chainList, setChainList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [balanceList, setBalanceList] = useState([]);
  const [balanceListLabel, setBalanceListLabel] = useState([]);

  let location = useLocation();

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

  useEffect(() => {
    if (chainList.length > 0) {
      const usdList = [];
      const labelList = [];
      chainList.map((chain) => {
        if (chain.usd_value > 0) {
          usdList.push(chain.usd_value);
          labelList.push(chain.name);
        }
        return;
      });
      setBalanceList(usdList);
      setBalanceListLabel(labelList);
    }
  }, [chainList]);

  const optionsPieChart = {
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: balanceListLabel,
    legend: {
      labels: {
        colors: useColorModeValue("#000000", "#FFFFFF"),
    },
    },

  };

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

          <Wrap spacing={"20"} align='center' justify='center'>
            <WrapItem>
              <Center>
              <Container
                border={"1px"}
                maxW="300px"
                p={5}
                borderRadius={"30px"}
                mb={5}
                textAlign="center"

              >
                <Text fontWeight={"700"} fontSize="md">
                  Total Balance:
                </Text>
                <Text><NumberFormat value={utilFunction.roundNumber(balance, -2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Text>
              </Container>
              </Center>
            </WrapItem>
            <WrapItem>
              <Box >
                <ReactApexCharts
                  options={optionsPieChart}
                  series={balanceList}
                  type="donut"
                  width="450"
                />
              </Box>
            </WrapItem>
          </Wrap>
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
            <Wrap spacing="25px" justify="center" mt={10}>
              {chainList.map((chain, idx) => {
                if (chain.usd_value > 0) {
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
                            <NumberFormat value={utilFunction.roundNumber(chain.usd_value, -2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </Text>
                          </Box>
                        </Flex>
                      </Container>
                    </WrapItem>
                  );
                }
              })}
            </Wrap>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default ChainBalances;
