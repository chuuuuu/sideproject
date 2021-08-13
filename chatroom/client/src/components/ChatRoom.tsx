import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Message,
  useIsLeaveSubscription,
  useLeaveRoomMutation,
  useMeQuery,
  useMessageSubscription,
  useRoomQuery,
} from "../generated/graphql";
import { useForm } from "../utils/useForm";
import { useScroll } from "../utils/useScroll";
import { InputField, InputState } from "./InputField";
import { MessageRecv } from "./MessageRecv";
import { MessageSent } from "./MessageSent";

type ChatRoomProps = {
  setIsPair: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatRoom: React.FC<ChatRoomProps> = ({ setIsPair }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputState, handleInputStateChange] = useForm<InputState>({
    content: "",
  });

  const [, leaveRoom] = useLeaveRoomMutation();
  const [{ data: meData }] = useMeQuery();
  const [{ data: roomData }] = useRoomQuery();
  const [{ data: messageData }] = useMessageSubscription();
  const [{ data: isLeaveData }] = useIsLeaveSubscription();

  const boxRef = useScroll([
    roomData?.room?.messages,
    messageData?.subscribeMessage,
    isLeaveData?.subscribeIsLeave,
  ]);

  useEffect(() => {
    if (roomData?.room?.messages) {
      setMessages(roomData?.room?.messages);
    }
  }, [roomData?.room?.messages]);

  useEffect(() => {
    if (messageData?.subscribeMessage) {
      setMessages(() => {
        messages?.push(messageData?.subscribeMessage);
        return messages;
      });
    }
  }, [messageData?.subscribeMessage]);

  return (
    <Flex direction="column" align="center" w="100%">
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
          w="80%"
          height="500"
          overflowY="scroll"
          mb="2"
          ref={boxRef}
        >
          {messages?.map((message) =>
            !message ? null : message.senderId === meData?.me?.id ? (
              <MessageSent
                key={message.createdAt}
                content={message.content}
              ></MessageSent>
            ) : (
              <MessageRecv
                key={message.createdAt}
                content={message.content}
              ></MessageRecv>
            )
          )}
          {isLeaveData?.subscribeIsLeave && (
            <Box textAlign="center" textColor="gray">
              someone left the chatroom...
            </Box>
          )}
        </Box>
        <InputField
          inputState={inputState}
          handleInputStateChange={handleInputStateChange}
          handleQuit={async () => {
            await leaveRoom();
            setIsPair(false);
          }}
        />
      </Box>
    </Flex>
  );
};
