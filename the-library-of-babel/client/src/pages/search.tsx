import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { useGetAddressQuery } from "../generated/graphql";

const Search: React.FC = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [contentDisplay, setContentDisplay] = useState<string>("");
  const [contentSearch, setContentSearch] = useState<string>("");
  const [{ data }] = useGetAddressQuery({
    variables: {
      content: contentSearch,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 1500) {
      setContentDisplay(e.target.value);
    }
  };

  const handleSearch = () => {
    setIsSearch(true);
    setContentSearch(contentDisplay);
  };

  return (
    <Box>
      <NavBar />
      <Box padding={4}>
        <Flex mt={4}>
          <Textarea
            placeholder="search in library"
            value={contentDisplay}
            onChange={handleInputChange}
          ></Textarea>
          <Button onClick={handleSearch} m="auto" colorScheme="teal" ml={4}>
            Search
          </Button>
        </Flex>
        {data?.getAddress.data && isSearch && (
          <Box>
            <Box mt={2} fontSize={24}>
              Address:
            </Box>
            <Textarea
              mt={2}
              readOnly={true}
              value={data?.getAddress.data}
            ></Textarea>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Search;
