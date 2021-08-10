import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { MessageSent } from "../components/MessageSent";
import { MessageRecv } from "../components/MessageRecv";
import {
  useMessagesQuery,
  useNewMessageSubscription,
} from "../generated/graphql";
import { useForm } from "../utils/useForm";
import { InputField, InputState } from "../components/InputField";

type Message = {
  id: string;
  user: string;
  content: string;
};

const Chatroom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [scrollFlag, setScrollFlag] = useState<boolean>(false);

  const boxRef = useRef<HTMLDivElement>(null);

  const [inputState, handleInputStateChange] = useForm<InputState>({
    user: "",
    content: "",
  });

  const [{ data: messagesQueryData }] = useMessagesQuery();
  const [{ data: subData }] = useNewMessageSubscription();

  useEffect(() => {  
    console.log(boxRef.current?.scrollHeight)
    if (messagesQueryData?.messages) {
      setMessages(messagesQueryData.messages);
    }
    setScrollFlag(!scrollFlag);
  }, [messagesQueryData?.messages]);

  useEffect(() => {
    console.log(boxRef.current?.scrollHeight)
    if (subData?.newMessage) {
      setMessages(() => {
        messages?.push(subData.newMessage);
        return messages;
      });
      setScrollFlag(!scrollFlag);
    }
  }, [subData?.newMessage]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current?.scrollHeight });
  }, [scrollFlag]);

  return (
    <Box
      mt={4}
      mx="auto"
      width="800px"
      backgroundColor="white"
      textColor="black"
    >
      <Box
        mt={8}
        mx="auto"
        maxW="800px"
        w="100%"
        height="500"
        overflowY="scroll"
        mb="2"
        ref={boxRef}
      >
        {messages?.map((message) =>
          !message ? null : message.user === inputState.user ? (
            <MessageSent
              key={message.id}
              content={message.content}
            ></MessageSent>
          ) : (
            <MessageRecv
              key={message.id}
              user={message.user}
              content={message.content}
            ></MessageRecv>
          )
        )}
      </Box>
      <InputField value={inputState} handleChange={handleInputStateChange} />
    </Box>
  );
};

export default Chatroom;
