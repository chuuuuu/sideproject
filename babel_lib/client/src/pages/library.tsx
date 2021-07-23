import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetContentQuery } from "../generated/graphql";
import {
  getFirstAddress,
  getNextAddress,
  getPrevAddress,
} from "../util/address";

const Library: React.FC = () => {
  const [address, setAddress] = useState<string>(getFirstAddress());

  const [{ data }] = useGetContentQuery({
    variables: {
      address,
    },
  });

  const nextAddress = getNextAddress(address);
  const prevAddress = getPrevAddress(address);

  return (
    <Box padding={4}>
      <Textarea mt={8} value={address} readOnly={true}></Textarea>
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
      <Box mt={4}>{data?.getContent.data}</Box>
    </Box>
  );
};

export default Library;
