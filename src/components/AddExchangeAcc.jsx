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

function AddExchangeAcc() {
  function handleFormSubmission(event) {
    event.preventDefault();
  }

  return (
    <>
      <Container borderWidth="1px" p="5">
        <Heading size="lg" mb="5">
          Connect a new exchange
        </Heading>
        <form onSubmit={handleFormSubmission}>
          <Stack spacing="1">
            <FormControl>
              <FormLabel htmlFor="exchange">Exchange</FormLabel>
              <Select id="exchange">
                <option value="Bitso">Bitso</option>
                <option value="FTX">FTX</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="subAccName">Sub-account Name</FormLabel>
              <Input id="subAccName" placeholder="Optional" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="apikey">API Key</FormLabel>
              <Input id="apikey" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="apisecret">API Secret</FormLabel>
              <Input id="apisecret" />
            </FormControl>

            <Button type="submit" colorScheme="green">
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default AddExchangeAcc;
