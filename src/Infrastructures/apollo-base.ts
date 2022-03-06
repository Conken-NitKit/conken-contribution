import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

export class BaseApolloClientImpl {
  public client: ApolloClient<NormalizedCacheObject>;

  constructor(serverLink: string, authorization?: string) {
    const httpLink = createHttpLink({
      uri: serverLink,
      fetch,
      fetchOptions: { method: 'GET' },
    });

    const authLink = setContext((_, { header }) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        headers: {
          ...header,
          authorization: authorization || '',
        },
      };
    });

    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }
}
