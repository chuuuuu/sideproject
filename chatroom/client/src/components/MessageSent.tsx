import { Box, Text } from "@chakra-ui/react";
import React from "react";

type MessageSentProps = {
  content: string;
};

export const MessageSent: React.FC<MessageSentProps> = ({content}) => {
  return (
    <Box
      ml="auto"
      mr="4"
      maxWidth="400px"
      wordBreak="break-word"
      width="fit-content"
      textColor="white"
      bgColor="green.400"
      mt="2"
    >
      <Text padding={2}>{content}</Text>
    </Box>
  );
};
