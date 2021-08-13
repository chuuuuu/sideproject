import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { usePostMessageMutation } from "../generated/graphql";

export type InputState = {
  content: string;
};

export type InputFieldProps = {
  inputState: InputState;
  handleInputStateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQuit: () => void;
  handleCall: () => void;
};

export const InputField: React.FC<InputFieldProps> = ({
  inputState,
  handleInputStateChange,
  handleQuit,
  handleCall,
}) => {
  const [, postMessage] = usePostMessageMutation();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      await handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputState.content.length) {
      return;
    }

    await postMessage({
      content: inputState.content,
    });

    handleInputStateChange({
      target: { name: "content", value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Flex>
      <Button colorScheme="teal" mr="2" onClick={handleQuit}>
        Quit
      </Button>
      <Input
        onKeyDown={handleKeyDown}
        name="content"
        value={inputState.content}
        onChange={handleInputStateChange}
        placeholder="type something..."
        borderColor="black"
        variant="unstyled"
        outlineColor="gray.300"
        padding="2"
      />
      <Button colorScheme="teal" onClick={handleSendMessage} ml="2">
        Send
      </Button>
      <Button colorScheme="teal" onClick={handleCall} ml="2">
        Call
      </Button>
    </Flex>
  );
};
