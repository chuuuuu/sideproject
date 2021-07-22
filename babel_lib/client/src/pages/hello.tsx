import { Box } from "@chakra-ui/react";
import { useHelloQuery } from "../generated/graphql";

const Hello: React.FC = () => {
  const [{ data }] = useHelloQuery();
  return <Box>{data?.hello}</Box>;
};

export default Hello;
