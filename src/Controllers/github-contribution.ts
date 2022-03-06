import express from 'express';

import { GitHubApiApolloClient } from '../Infrastructures/apollo-github-api';
import { LineNotifyClient } from '../Infrastructures/line-notify';
import { generateMessageOfContributionRanking } from '../Service/generateMessageOfContributionRanking';

export class GithubContributionControllerImpl {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private githubApiApolloClient: GitHubApiApolloClient,
    private lineNotifyClient: LineNotifyClient,
    private organizationId: string,
  ) {}

  async fetchWeeklyContributionsOfOrganizationMember(
    _: express.Request,
    res: express.Response,
  ) {
    const { githubApiApolloClient, organizationId } = this;
    const message = await generateMessageOfContributionRanking(
      githubApiApolloClient,
      organizationId,
    );
    res.send(message);
  }

  async notifyWeeklyContributionsOfOrganizationMember(
    _: express.Request, // eslint-disable-line @typescript-eslint/no-unused-vars
    __: express.Response, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    const { githubApiApolloClient, lineNotifyClient, organizationId } = this;
    const message = await generateMessageOfContributionRanking(
      githubApiApolloClient,
      organizationId,
    );
    lineNotifyClient.notifyMessage({ message: message || '' });
  }
}
