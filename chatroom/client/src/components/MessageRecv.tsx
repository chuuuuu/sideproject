import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import React from "react";

type MessageRecvProps = {
  user: string;
  content: string;
};

export const MessageRecv: React.FC<MessageRecvProps> = ({ user, content }) => {
  return (
    <Flex padding={2}>
      <Circle size="10" outlineColor="gray.300" bg="gray.200">
        {user.substr(0, 3)}
      </Circle>

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
