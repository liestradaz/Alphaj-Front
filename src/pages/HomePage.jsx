import {
  Stack,
  Box,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  AspectRatio,
  Image,
  Link,
} from "@chakra-ui/react";
import homebg from "../media/homebg2.png";
import video from "../media/Analysis.mp4";
import { Link as ReactDomLink } from "react-router-dom";
import * as PATHS from "../utils/paths";
import Navbar from "../components/Navbar/Navbar";
import "./HomePage.css";

function HomePage(props) {
  return (
    <>
      <Navbar handleLogout={props.handleLogout} user={props.user} zIndex={1} />
      <Flex
        id="body"
        w={"full"}
        h={"87vh"}
        /* backgroundImage={homebg} 
      backgroundSize={'cover'}
      backgroundPosition={'center center'} */
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
        >
          <Box position={"absolute"} zIndex={-1} h={"100vh"}>
            <video
              id="videoBG"
              src={video}
              autoPlay
              muted={true}
              loop={true}
              poster={homebg}
            ></video>
          </Box>
          <Stack maxW={"2xl"} align={"flex-start"} spacing={2} zIndex={1}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl", sm: "2xl" })}
            >
              Track your trades.
            </Text>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl", sm: "2xl"  })}
            >
              Get a Journal.
            </Text>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl", sm: "2xl"  })}
            >
              Get your Alpha.
            </Text>
            <Stack direction={"row"} >
              {props.user ? (
                <>
                  <Link
                    to={PATHS.DASHBOARD}
                    as={ReactDomLink}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      bg={"teal"}
                      rounded={"full"}
                      color={"white"}
                      _hover={{ bg: "blue.500" }}
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={PATHS.SIGNUPPAGE}
                    as={ReactDomLink}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      bg={"blue.400"}
                      rounded={"full"}
                      color={"white"}
                      _hover={{ bg: "blue.500" }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link
                    to={PATHS.LOGINPAGE}
                    as={ReactDomLink}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      bg={"whiteAlpha.300"}
                      rounded={"full"}
                      color={"white"}
                      _hover={{ bg: "whiteAlpha.500" }}
                    >
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </>
  );
}

export default HomePage;
