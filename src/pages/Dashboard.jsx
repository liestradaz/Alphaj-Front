import TradesTable from "../components/TradesTable";
import OrdersTable from "../components/OrdersTable";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import {
  Flex,
  Box,
  Container,
  useBreakpointValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

function Dashboard(props) {
  return (
    <>
      <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Box w="100%" ml={10}>
          <Flex justifyContent="center">
            <Tabs align='center' variant='soft-rounded' mt="5">
              <TabList>
                <Tab>Margin</Tab>
                <Tab>Spot</Tab>
              </TabList>

              <TabPanels>
               {/*  Tab for Margin orders */}
                <TabPanel>
                <Container
                    maxWidth={useBreakpointValue({
                      base: "max",
                      md: "max",
                      sm: "sm",
                    })}
                    overflowX={"auto"}
                  >
                    <TradesTable user={props.user} />
                  </Container>
                </TabPanel>
               {/*  Tab for Spot Trades */}
                <TabPanel>
                  <Container
                    maxWidth={useBreakpointValue({
                      base: "max",
                      md: "max",
                      sm: "sm",
                    })}
                    
                  >
                    <OrdersTable user={props.user} />
                  </Container>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default Dashboard;
