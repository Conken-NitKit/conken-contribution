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
    private httpFromAt: number,
    private lineNotifyFromAt: number,
    private size: number,
    private messageSize: number,
  ) {}

  async fetchWeeklyContributionsOfOrganizationMember(
    _: express.Request,
    res: express.Response,
  ) {
    const { githubApiApolloClient, organizationId, httpFromAt, size } = this;

    const message = await generateMessageOfContributionRanking(
      githubApiApolloClient,
      organizationId,
      httpFromAt,
      size,
    );

    res.status(200);
    res.send(message);
  }

  async notifyWeeklyContributionsOfOrganizationMember(
    _: express.Request, // eslint-disable-line @typescript-eslint/no-unused-vars
    res: express.Response, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    const {
      githubApiApolloClient,
      lineNotifyClient,
      organizationId,
      lineNotifyFromAt,
      messageSize,
    } = this;

    const message = await generateMessageOfContributionRanking(
      githubApiApolloClient,
      organizationId,
      lineNotifyFromAt,
      messageSize,
    );
    lineNotifyClient.notifyMessage({ message: message || '' });

    res.status(200);
    res.send();
  }
}
