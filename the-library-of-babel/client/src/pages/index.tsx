import { Flex, Text, Box, Link } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/NavBar";
import NextLink from "next/link";

const Index = () => {
  return (
    <Box>
      <NavBar />
      <Box mt="8">
        <Flex direction="column" align="center" w="100%">
          <Box mt="4">
            <NextLink href="/browse">
              <Link>
                <Text fontSize="2xl">Browse</Text>
              </Link>
            </NextLink>
          </Box>
          <Box mt="4">
            <NextLink href="/search">
              <Link>
                <Text fontSize="2xl">Search</Text>
              </Link>
            </NextLink>
          </Box>
          <Box mt="4">
            <NextLink href="/random">
              <Link>
                <Text fontSize="2xl">Random</Text>
              </Link>
            </NextLink>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Index;
