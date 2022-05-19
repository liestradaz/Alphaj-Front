import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

function ExchangeAccTable() {
  function handleFormSubmission(event) {
    event.preventDefault();
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center">Exchange:</Th>
              <Th textAlign="center">Name:</Th>
              <Th textAlign="center">Sub-account Name:</Th>
              <Th textAlign="center">API Key:</Th>
              <Th textAlign="center">API Secret:</Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>FTX</Td>
              <Td>FTX Account</Td>
              <Td>Subaccount name</Td>
              <Td>HGmTe-yXOp0w1Cly9EbbprullAifc-b0AbYDqZcS</Td>
              <Td>57H1B9T2UrjHCh9o8rl9gGqdVngNtvtV6psh</Td>
              <Td>delete</Td>
            </Tr>
            <Tr>
              <Td>
                <Editable defaultValue="FTX">
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Td>
              <Td>
                <Editable defaultValue="FTX Accoun" >
                  <EditablePreview  />
                  <EditableInput />
                </Editable>
              </Td>
              <Td>
                <Editable defaultValue="Subaccount name" >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Td>
              <Td>
                <Editable defaultValue="HGmTe">
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Td>
              <Td>
                <Editable defaultValue="57H1B9T2UrjHCh9o8rl9gGqdVngNtvtV6psh">
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ExchangeAccTable;
