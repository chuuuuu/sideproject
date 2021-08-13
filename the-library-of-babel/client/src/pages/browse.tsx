import { Book } from "../components/Book";
import { getFirstAddress } from "../util/address";

const Library: React.FC = () => {
  return <Book initAddress={getFirstAddress()} />;
};

export default Library;
