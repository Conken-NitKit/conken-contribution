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
      const members = await client.fetchWeeklyContributionsOfOrganizationMember(
        organizationId,
      );

      const activeMembers = members.filter(
        (members) => !!members.contributionCount,
      );
      activeMembers.sort((a, b) =>
        a.contributionCount < b.contributionCount ? 1 : -1,
      );

      const Text = activeMembers.reduce((prevText, member, idx) => {
        let nextText = prevText;
        nextText += `${idx}位: ${member.loginId}\n`;
        nextText += `contribution数: ${member.contributionCount}\n\n`;
        return nextText;
      }, '今週のランキング:\n');

      res.send(Text);
    } catch (error) {
      console.error(error);
    }
  }
}
