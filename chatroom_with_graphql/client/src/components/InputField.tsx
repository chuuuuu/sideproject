import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { usePostMessageMutation } from "../generated/graphql";

export type InputState = {
  user: string;
  content: string;
};

export type InputFieldProps = {
  value: InputState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  handleChange,
}) => {
  const [, postMessage] = usePostMessageMutation();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      await handleClick();
    }
  };

  const handleClick = async () => {
    await postMessage({
      user: value.user,
      content: value.content,
    });

    handleChange({
      target: { name: "content", value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Flex>
      <Input
        name="user"
        value={value.user}
        onChange={handleChange}
        placeholder="username"
        borderColor="black"
        variant="unstyled"
        bgColor="white"
        outlineColor="gray.300"
        padding="2"
        width="40"
        mr="4"
      />
      <Input
        onKeyDown={handleKeyDown}
        name="content"
        value={value.content}
        onChange={handleChange}
        placeholder="type a message..."
        borderColor="black"
        variant="unstyled"
        outlineColor="gray.300"
        padding="2"
      />
      <Button colorScheme="teal" onClick={handleClick} ml="2">
        Send
      </Button>
    </Flex>
  );
};
