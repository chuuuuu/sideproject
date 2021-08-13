import { Book } from "../components/Book";
import { getRandomAddress } from "../util/address";

const Library: React.FC = () => {
  return <Book initAddress={getRandomAddress()} />;
};

export default Library;
