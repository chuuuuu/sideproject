import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

type MessageRecvProps = {
  content: string;
};

export const MessageRecv: React.FC<MessageRecvProps> = ({ content }) => {
  return (
    <Flex padding={2}>
      <Box
        ml="2"
        mr="auto"
        maxWidth="400px"
        wordBreak="break-word"
        width="fit-content"
        textColor="black"
        bgColor="gray.300"
      >
        <Text padding={2}>{content}</Text>
      </Box>
    </Flex>
  );
};
