import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { useGetContentQuery } from "../generated/graphql";
import { getNextAddress, getPrevAddress } from "../util/address";

type BookProps = {
  initAddress: string;
};

export const Book: React.FC<BookProps> = ({ initAddress }) => {
  const [address, setAddress] = useState<string>(initAddress);

  const [{ data }] = useGetContentQuery({
    variables: {
      address,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 3500) {
      setAddress(e.target.value);
    }
  };

  const nextAddress = getNextAddress(address);
  const prevAddress = getPrevAddress(address);

  return (
    <Box>
      <NavBar />
      <Box padding={4}>
        <Textarea
          mt={4}
          value={address}
          onChange={handleInputChange}
        ></Textarea>
        <Flex>
          {prevAddress ? (
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => setAddress(() => prevAddress)}
              mt={2}
            >
              prev page
            </Button>
          ) : (
            <Button colorScheme="teal" disabled={true} size="md" mt={2}>
              prev page
            </Button>
          )}
          {nextAddress ? (
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => setAddress(() => nextAddress)}
              ml={2}
              mt={2}
            >
              next page
            </Button>
          ) : (
            <Button colorScheme="teal" size="md" disabled={true} ml={2} mt={2}>
              next page
            </Button>
          )}
        </Flex>
        <Box mt={4} whiteSpace="pre-wrap">
          {data?.getContent.data}
        </Box>
      </Box>
    </Box>
  );
};
