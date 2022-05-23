import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
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
  Heading,
  Image,
  AspectRatio,
  Container,
  Link
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'


const DEBANK_URL = "https://openapi.debank.com";

function NftExplorer(props) {
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${DEBANK_URL}/v1/user/nft_list?id=0xf922fbe5782705868cb8d78b0cf9228cdecd7ef5`
      )
      .then((response) => setNftList(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Navbar handleLogout={props.handleLogout} user={props.user} />
      <Flex>
        <Sidebar handleLogout={props.handleLogout} user={props.user} />
        <Box w="100%" ml={10} mt={5} display='flex' flexDir={"column"} alignItems='center'>
          <Heading size="2xl" mb="5">Your NFT's</Heading>
          <Wrap spacing='30px'>
      {nftList.map((nft) => {
        if (nft.content_type && nft.content) return (
            <WrapItem w={"300px"} justify='center'>
              <Container key={nft.id} border={"1px"} maxW="300px" p={5} borderRadius={"30px"}>
                <Box>
                  {nft.content_type === "image_url" && nft.content && (
                    <AspectRatio maxW="300px" ratio={1}>
                      <Image src={nft.content} alt="NFT Image" borderRadius={"30px"} />
                    </AspectRatio>
                  )}
                  {nft.content_type === "video_url" && nft.content && (
                    <AspectRatio maxW="300px" ratio={1}>
                      <video src={nft.content} muted={true} controls />
                    </AspectRatio>
                  )}
                </Box>

                {nft.content_type && nft.content && (
                  <Text mt={2} fontSize='sm'>{nft.contract_name}</Text>
                  )}
                  {nft.content_type && nft.content && <span><Link href={nft.detail_url} isExternal><ExternalLinkIcon mx='2px' /></Link></span>}
                {nft.content_type && nft.content && <Text fontSize='md' as='em'>{nft.name}</Text>}
                {nft.content_type && nft.content && nft.usd_price && (
                  <Text>${nft.usd_price}</Text>
                )}

              </Container>
            </WrapItem>
          
          
          );
        })}
        </Wrap>
        </Box>
        </Flex>
    </>
  );
}

export default NftExplorer;
