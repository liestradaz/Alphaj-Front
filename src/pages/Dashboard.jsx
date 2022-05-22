import TradesTable from "../components/TradesTable";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Flex, Box, Container, useBreakpointValue } from "@chakra-ui/react";

function Dashboard(props) {
  return (
    <>
      <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Box w="100%" ml={10} >
          <Flex justifyContent="center" >
            <Container maxWidth={useBreakpointValue({ base: "max", md: "max", sm: "sm" })} >
              <TradesTable />
            </Container>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default Dashboard;
