import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import fetch from 'cross-fetch';

export class BaseApolloClientImpl {
  public client: ApolloClient<NormalizedCacheObject>;

  constructor(serverLink: string, authorization?: string) {
    const httpLink = createHttpLink({
      uri: serverLink,
      fetch,
    });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization,
        },
      }));

      return forward(operation);
    });

    this.client = new ApolloClient({
      link: concat(authMiddleware, httpLink),
      cache: new InMemoryCache(),
    });
  }
}
