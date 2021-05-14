import { HttpLink } from "apollo-link-http";
import { withData } from "next-apollo";

const API_URL = process.env.MY_TRAINER_BACKEND || "http://localhost:1337";

const config = {
  link: new HttpLink({
    uri: `${API_URL}/graphql`, // Server URL (must be absolute)
  })
};
export default withData(config);
