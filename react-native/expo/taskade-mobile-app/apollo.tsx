import { ApolloClient, InMemoryCache, createHttpLink, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const httpLink = new HttpLink({
//   uri: "http://192.168.43.235:4000/"
// });
const httpLink = createHttpLink({
  uri: "http://192.168.43.235:4000/",
});


const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || "",
    }
  }
});


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
export const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  // link: authLink.concat(httpLink),
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
});


 