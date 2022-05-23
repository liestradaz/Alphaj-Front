import { useState } from "react";
import AddExchangeAcc from "../components/AddExchangeAcc";
import ExchangeAccTable from "../components/ExchangeAccTable";
import { Flex, Button, Heading, Wrap, WrapItem, Box, Container, useBreakpointValue  } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from '../components/Navbar/Navbar';

function ExchangeAccount(props) {
  const [showButton, setShowButton] = useState(false);

  const toggleShowButton = () => setShowButton(!showButton);

  return (
    <>
    <Navbar handleLogout={props.handleLogout} user={props.user} />
    <Flex >
    <Sidebar handleLogout={props.handleLogout} user={props.user} />
    <Box w="100%" ml={10}>
      <Flex justifyContent="center" >
        <Box display='flex' flexDir={"column"} mt='2' alignItems='center'>
          <Heading size="2xl" mb="5" >
            Exchange Accounts
          </Heading>
          <Button onClick={toggleShowButton}>
            {showButton ? "Hide" : "Add Exchange"}
          </Button>
    
          <Wrap spacing="30px" justify="center">
            <WrapItem>{showButton && <AddExchangeAcc />}</WrapItem>
            <WrapItem>
            <Container maxWidth={useBreakpointValue({ base: "max", md: "max", sm: "md" })} >
              <ExchangeAccTable />
            </Container>
            </WrapItem>
          </Wrap>
        </Box>

      </Flex>
      </Box>
      </Flex>
    </>
  );
}

export default ExchangeAccount;
