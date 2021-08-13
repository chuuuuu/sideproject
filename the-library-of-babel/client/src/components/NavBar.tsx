import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

type NavBarProps = {};

export const NavBar: React.FC<NavBarProps> = () => {
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="teal.300" p={2}>
      <Flex flex={1} ml="4" mr="4" align="center">
        <NextLink href="/">
          <Link>
            <Text fontSize="2xl" fontWeight="bold">
              The Library of Babel
            </Text>
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
