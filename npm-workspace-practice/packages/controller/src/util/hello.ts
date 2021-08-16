import axios from "axios";

export const hello = async () => {
  const response = await axios.get("http://localhost:4000/hello");
  console.log(response.data);
};
