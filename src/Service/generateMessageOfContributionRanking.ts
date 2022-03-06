import { GitHubApiApolloClient } from '../Infrastructures/apollo-github-api';

export const generateMessageOfContributionRanking = async (
  client: GitHubApiApolloClient,
  organizationId: string,
): Promise<string | undefined> => {
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

    const title = '\n🎉 今週のランキング 🎉\n\n';
    const message = activeMembers.reduce((prevText, member, idx) => {
      let nextText = prevText;
      idx += 1;
      nextText += `${idx}位: ${member.loginId}\n`;
      nextText += `contribution数: ${member.contributionCount}\n`;
      if (idx < activeMembers.length) {
        nextText += `\n`;
      }
      return nextText;
    }, title);

    const footer =
      '▼　実装内容:\nhttps://github.com/Conken-NitKit/conken-contribution';

    return `${message}\n${footer}`;
  } catch (error) {
    console.error(error);
  }
};
