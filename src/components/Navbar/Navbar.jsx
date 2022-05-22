import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Icon,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FcCandleSticks } from "react-icons/fc";
import { Link as ReactDomLink } from "react-router-dom";
import * as PATHS from "../../utils/paths";

export default function Navbar(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("#AEC8CA", "gray.900")} px={4}>
        <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
          <Box display={"flex"} alignItems={"center"}>
            <Icon as={FcCandleSticks} mr={2} />
            <Link as={ReactDomLink} to="/" style={{ textDecoration: "none" }}>
              <Text fontSize="2xl">AlphaJ</Text>
            </Link>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Flex justifyContent="center">
                {props.user ? (
                  <>
                    <Button colorScheme="teal" onClick={props.handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Flex gap="2">
                      <Link
                        to={PATHS.SIGNUPPAGE}
                        className="authLink"
                        as={ReactDomLink}
                      >
                        <Button colorScheme="teal">Signup</Button>
                      </Link>
                      <Link
                        to={PATHS.LOGINPAGE}
                        className="authLink"
                        as={ReactDomLink}
                      >
                        <Button colorScheme="teal">Log In</Button>
                      </Link>
                    </Flex>
                  </>
                )}
              </Flex>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size="sm" src="avatar-1.jpg" />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size="sm" src="avatar-1.jpg" />
                  </Center>
                  <br />
                  <Center>
                    <p>{props.user ? props.user.username : "User"}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
