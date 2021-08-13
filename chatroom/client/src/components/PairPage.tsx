import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { usePairMutation } from "../generated/graphql";

type PairPageProps = {
  setIsPair: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PairPage: React.FC<PairPageProps> = ({ setIsPair }) => {
  const [{ data: pairData, fetching }, pair] = usePairMutation();

  const handleClick = async () => {
    await pair();
  };

  useEffect(() => {
    if (pairData) {
      setIsPair(true);
    }
  }, [pairData]);

  return (
    <Flex direction="column" align="center" w="100%">
      <Text fontSize="6xl" mb="4">
        Chatroom
      </Text>
      <Button
        mx="auto"
        width="200px"
        colorScheme="teal"
        isLoading={fetching}
        onClick={handleClick}
      >
        Pair
      </Button>
    </Flex>
  );
};
