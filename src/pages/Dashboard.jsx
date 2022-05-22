import TradesTable from "../components/TradesTable";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from '../components/Navbar/Navbar';
import {
    Flex,
    Box
  } from '@chakra-ui/react';

function Dashboard(props) {
  return (
    <>
    <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Box w="100%" ml={10}>
        <TradesTable />
        </Box>
      </Flex>
    </>
  );
}

export default Dashboard;
