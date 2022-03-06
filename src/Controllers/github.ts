import express from 'express';

import { GitHubApolloClient } from '../Infrastructures/apollo-github';

export class GithubControllerImpl {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private client: GitHubApolloClient,
    private organizationId: string,
  ) {}

  async fetchWeeklyContributionsOfOrganizationMember(
    _: express.Request,
    res: express.Response,
  ) {
    const { client, organizationId } = this;

    try {
      const weeklyContributions =
        await client.fetchWeeklyContributionsOfOrganizationMember(
          organizationId,
        );
      res.send({ weeklyContributions });
    } catch (error) {
      console.error(error);
    }
  }
}
