import React from 'react'
import {
    useDisclosure,
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NavHoverBox from './NavHoverBox'
import { Link as ReactDomLink } from "react-router-dom";


export default function NavItem({ icon, title, description, active, navSize, path }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex
            mt={25}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right" isOpen={isOpen}>
                <Link
                    as={ReactDomLink}
                    to={path}
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    w={navSize == "large" && "100%"}
                    onMouseEnter={onOpen} onMouseLeave={onClose}
                >
                    <MenuButton w="100%" >
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                    onMouseEnter={onOpen} onMouseLeave={onClose}
                >
                    <NavHoverBox title={title} icon={icon} description={description} />
                </MenuList>
            </Menu>
        </Flex>
    )
}