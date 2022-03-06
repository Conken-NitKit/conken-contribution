import { gql } from '@apollo/client/core';

import { fetchWeeklyContributionCount } from '../Service/github-crawler';

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

export abstract class GitHubApolloClient extends BaseApolloClientImpl {
  abstract fetchWeeklyContributionsOfOrganizationMember(
    organizationId: string,
  ): Promise<recentWeekContributionLog[]>;
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
