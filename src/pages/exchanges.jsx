import { useState } from "react";
import AddExchangeAcc from "../components/AddExchangeAcc";
import ExchangeAccTable from "../components/ExchangeAccTable";
import {
  Button,
  Heading,
  Wrap,
  WrapItem,
  Box,
} from "@chakra-ui/react";

function ExchangeAccount() {
  const [showButton, setShowButton] = useState(false);

  const toggleShowButton = () => setShowButton(!showButton);

  return (
    <>
      <Heading size="2xl" mb="5">
        Exchange Accounts
      </Heading>
      <Button onClick={toggleShowButton}>
        {showButton ? "Hide" : "Add Exchange"}
      </Button>

      <Wrap spacing="30px" justify="center">
        <WrapItem>{showButton && <AddExchangeAcc />}</WrapItem>

        <WrapItem >
          <ExchangeAccTable />
        </WrapItem>
      </Wrap>
    </>
  );
}

export default ExchangeAccount;
