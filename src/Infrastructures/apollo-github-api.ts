import { gql } from '@apollo/client/core';

import { fetchWeeklyContributionCount } from '../Service/fetchWeeklyContributionCount';

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

interface recentWeekContributionLog {
  loginId: string;
  contributionCount: number;
}

const WEEKLY_CONTRIBUTION_OF_ORGANIZATION_MEMBER = gql`
  query ($organizationId: String!) {
    organization(login: $organizationId) {
      membersWithRole(first: 100) {
        nodes {
          login
        }
      }
    }
  }
`;

export abstract class GitHubApiApolloClient extends BaseApolloClientImpl {
  abstract fetchWeeklyContributionsOfOrganizationMember(
    organizationId: string,
    fromAt: number,
  ): Promise<recentWeekContributionLog[]>;
}

export class GitHubApiApolloClientImpl extends GitHubApiApolloClient {
  constructor(_token: string) {
    const serverLink = 'https://api.github.com/graphql';
    const token = _token;
    const authorization = token ? `Bearer ${token}` : '';
    super(serverLink, authorization);
  }

  async fetchWeeklyContributionsOfOrganizationMember(
    organizationId: string,
    fromAt: number,
  ): Promise<recentWeekContributionLog[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await this.client.query({
      query: WEEKLY_CONTRIBUTION_OF_ORGANIZATION_MEMBER,
      variables: {
        organizationId,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const organization: Organization = data.organization;

    const requests = organization.membersWithRole.nodes.map(
      async (node): Promise<recentWeekContributionLog> => {
        const contributionCount = await fetchWeeklyContributionCount(
          node.login,
          fromAt,
        );
        return {
          loginId: node.login,
          contributionCount,
        };
      },
    );

    return Promise.all(requests);
  }
}
