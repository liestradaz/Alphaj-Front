import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import {
  Flex,
  Box,
  Wrap,
  WrapItem,
  Text,
  Heading,
  Image,
  AspectRatio,
  Container,
  Link,
  Center,
  VStack
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReactDomLink } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/user.context";

const DEBANK_URL = "https://openapi.debank.com";

function NftExplorer(props) {
  /* const {nftListCtx } = useContext(UserContext); */
  /* const [nftList, setNftList] = useState(nftListCtx); */
  const [nftList, setNftList] = useState([]);

/*   useEffect(() => {
    if (props.user.walletAddress){
      axios
        .get(
          `${DEBANK_URL}/v1/user/nft_list?id=${props.user.walletAddress}` 
        )
        .then((response) => {
          if (response.data.length>25){
            setNftList(response.data.slice(0,26))
          } else {
            setNftList(response.data)
          }
        })
        .catch((err) => console.log(err));
    } else {
      setNftList([])
    }
  }, []); */

  useEffect(() => {
    if (props.user.walletAddress){
      axios
        .get(
          `${DEBANK_URL}/v1/user/nft_list?id=${props.user.walletAddress}` 
        )
        .then((response) => {

          if (response.data.length>25){
            setNftList(response.data.slice(0,26))
          } else {
            setNftList(response.data)
          }
        })
        .catch((err) => console.log(err));
    } else {
      setNftList([])
    }
  }, []);


  useEffect(() => {

    if (props.user.walletAddress){
      axios
        .get(
          `${DEBANK_URL}/v1/user/nft_list?id=${props.user.walletAddress}` 
        )
        .then((response) => {

          if (response.data.length>25){
            setNftList(response.data.slice(0,26))
          } else {
            setNftList(response.data)
          }
        })
        .catch((err) => console.log(err));
    } else {
      setNftList([])
    }
  }, [nftList]);

  
 

  return (
    <>
      <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Box
          w="100%"
          ml={10}
          mt={5}
          display="flex"
          flexDir={"column"}
          alignItems="center"
        >
          <Heading size="2xl" mb="5">
            Your NFT's
          </Heading>

          {nftList.length === 0 ? (
          <Center bg='tomato' h='100px' color='white' borderRadius={"30px"} p={50}>
            <VStack>
            <Text>Wallet not found. Please add one. </Text>
            <Link as={ReactDomLink} to={`/user/${props.user._id}`}> Go to Profile Page</Link>
            </VStack>
          </Center>) : (

          <Wrap spacing="25px" justify='center'>
            {nftList.map((nft, idx) => {
              if (nft.content_type && nft.content)
                return (
                  <WrapItem key={idx} w={"300px"} justify="center">
                    <Container
                      key={nft.id}
                      border={"1px"}
                      maxW="300px"
                      p={5}
                      borderRadius={"30px"}
                    >
                      <Box>
                        {nft.content_type === "image_url" && nft.content && (
                          <AspectRatio maxW="300px" ratio={1}>
                            <Image
                              src={nft.content}
                              alt="NFT Image"
                              borderRadius={"30px"}
                            />
                          </AspectRatio>
                        )}
                        {nft.content_type === "video_url" && nft.content && (
                          <AspectRatio maxW="300px" ratio={1}>
                            <video src={nft.content} muted={true} controls />
                          </AspectRatio>
                        )}
                      </Box>

                      {nft.content_type && nft.content && (
                        <Text mt={2} fontSize="sm">
                          {nft.contract_name}
                        </Text>
                      )}
                      {nft.content_type && nft.content && (
                        <span>
                          <Link href={nft.detail_url} isExternal>
                            <ExternalLinkIcon mx="2px" />
                          </Link>
                        </span>
                      )}
                      {nft.content_type && nft.content && (
                        <Text fontSize="md" as="em">
                          {nft.name}
                        </Text>
                      )}
                      {nft.content_type && nft.content && nft.usd_price && (
                        <Text>${nft.usd_price}</Text>
                      )}
                    </Container>
                  </WrapItem>
                );
            })}
          </Wrap>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default NftExplorer;
