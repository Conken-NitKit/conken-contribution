import { BLACK_LIST_LOGIN_IDS } from '../Constants/user';
import { GitHubApiApolloClient } from '../Infrastructures/apollo-github-api';

export const generateMessageOfContributionRanking = async (
  client: GitHubApiApolloClient,
  organizationId: string,
  fromAt: number,
): Promise<string | undefined> => {
  try {
    const members = await client.fetchWeeklyContributionsOfOrganizationMember(
      organizationId,
      fromAt,
    );

    const activeMembers = members.filter((member) => {
      return (
        !!member.contributionCount &&
        !BLACK_LIST_LOGIN_IDS.includes(member.loginId)
      );
    });
    activeMembers.sort((a, b) =>
      a.contributionCount < b.contributionCount ? 1 : -1,
    );

    const displayMembers = activeMembers.slice(0, 14);

    const title = '\n🎉 今週のランキング 🎉\n\n';
    const message = displayMembers.reduce((prevText, member, idx) => {
      let nextText = prevText;
      idx += 1;
      nextText += `${idx}位: ${member.loginId}\n`;
      nextText += `contribution数: ${member.contributionCount}\n`;
      if (idx < displayMembers.length) {
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
