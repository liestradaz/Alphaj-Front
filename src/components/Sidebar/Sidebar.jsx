import React, { useState, useEffect } from "react";
import {
  Flex,
  Link,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Button,
  Icon,
  useMediaQuery 
} from "@chakra-ui/react";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon, StarIcon } from "@chakra-ui/icons";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineApi, AiOutlineUser, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import NavItem from "./NavItem";
import { Link as ReactDomLink } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

export default function Sidebar(props) {
  const [navSize, changeNavSize] = useState("large");
  const [isLargerThan1280] = useMediaQuery('(min-width: 1000px)')

  useEffect(() => {
    isLargerThan1280 ? changeNavSize("large") : changeNavSize("small")
    
  }, [isLargerThan1280]);


  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(255, 255, 255, 0.5)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Flex my={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              {props.user ? props.user.username: "User"}
            </Heading>
            <Text color="gray"></Text>
          </Flex>
        </Flex>
        
        <Divider display={navSize == "small" ? "none" : "flex"} />

        <NavItem
          navSize={navSize}
          icon={MdOutlineDashboard}
          title="Dashboard"
          description="This is where Users can check their transactions and get some metrics."
          path={PATHS.DASHBOARD}
        />
        <NavItem
          navSize={navSize}
          icon={AiOutlineUser}
          title="Profile"
          description="User page information."
          path={`/user/${props.user._id}`}
        />
        <NavItem
          navSize={navSize}
          icon={AiOutlineApi}
          title="Accounts"
          description="The place where Users add their APIs credentials to pull data from different exchanges."
          path={PATHS.EXCHANGEACCOUNT}
        />

        <NavItem
          navSize={navSize}
          icon={StarIcon}
          title="NFTs"
          description="The place where Users can check their NFTs holdings."
          path={PATHS.NFTEXPLORER}
        />

        <IconButton
          background="none"
          mt={0}
          _hover={{ background: "none" }}
          icon={navSize === "small" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
      </Flex>

      <Flex justifyContent="center">
        {props.user ? (
          <>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={props.handleLogout}
            >
              {navSize == "large" ? "Logout" : ""}
              <Icon as={BiLogOut} />
            </Button>
          </>
        ) : (
          <>
          <Flex flexDir="column">
            <Link to={PATHS.SIGNUPPAGE} className="authLink" as={ReactDomLink}>
              <Button colorScheme='teal'><AiOutlineUserAdd/> {navSize == "large" ? "Signup" : ""}</Button>
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink" as={ReactDomLink}>
              <Button colorScheme='teal'><AiOutlineLogin/> {navSize == "large" ? "Log In" : ""}</Button>
            </Link>
            </Flex>
          </>
        )}
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >

        <Flex mt={4} align="center">
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
