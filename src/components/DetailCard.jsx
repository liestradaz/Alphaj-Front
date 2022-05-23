import {
    Flex,
    Box,
    useColorModeValue,
    Wrap,
    WrapItem,
    Center,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Stack,
    Heading
  } from "@chakra-ui/react";

function DetailCard(props){
    const { label, data } = props

    return (
        <Center w="180px" h="80px" border={"1px"} borderRadius={"30px"}>
        <Box>
          <Stat>
                      <StatLabel textAlign={"center"}>{label}</StatLabel>
                      <StatHelpText textAlign={"center"}>
                        {data}
                      </StatHelpText>
                    </Stat>
        </Box>
        </Center>
)
}

export default DetailCard