import { gql } from '@apollo/client/core';

import { BaseApolloClientImpl } from './apollo-base';

interface Organization {
  membersWithRole: {
    nodes: {
      login: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
            }[];
          }[];
        };
      };
    }[];
  };
}

const WEEKLY_CONTRIBUTION_OF_ORGANIZATION_MEMBER = gql`
  query ($organizationId: String!) {
    organization(login: $organizationId) {
      membersWithRole(first: 1) {
        nodes {
          login
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    }
  }
`;

export abstract class GitHubApolloClient extends BaseApolloClientImpl {
  abstract fetchWeeklyContributionsOfOrganizationMember(
    organizationId: string,
  ): Promise<Organization>;
}

export class GitHubApolloClientImpl extends GitHubApolloClient {
  constructor() {
    const serverLink = 'https://api.github.com/graphql';
    const token = process.env.GITHUB_ACCESS_TOKEN;
    const authorization = token ? `Bearer ${token}` : '';

    super(serverLink, authorization);
  }

  async fetchWeeklyContributionsOfOrganizationMember(
    organizationId: string,
  ): Promise<Organization> {
    const result = await this.client.query({
      query: WEEKLY_CONTRIBUTION_OF_ORGANIZATION_MEMBER,
      variables: {
        organizationId,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.data;
  }
}
