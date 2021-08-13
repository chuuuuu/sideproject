import { Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { PairPage } from "../components/PairPage";
import { useLoginMutation, useRoomQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { ChatRoom } from "../components/ChatRoom";

const Index = () => {
  const [isPair, setIsPair] = useState(false);
  const [, login] = useLoginMutation();
  const [{ data: roomData }] = useRoomQuery();

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    if (roomData?.room) {
      setIsPair(true);
    }
  }, [roomData]);

  return (
    <Flex mx="auto" maxW="800px" w="100%" height="100vh" align="center">
      {isPair ? (
        <ChatRoom setIsPair={setIsPair} />
      ) : (
        <PairPage setIsPair={setIsPair} />
      )}
    </Flex>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
