// NOTE: src/blackList.sample.ts の内容を元に src/blackList.ts を作成する。
import { GitHubApiApolloClient } from '../Infrastructures/apollo-github-api';
import { BLACK_LIST_LOGIN_IDS } from '../blackList';

export const generateMessageOfContributionRanking = async (
  client: GitHubApiApolloClient,
  organizationId: string,
  fromAt: number,
  size: number,
): Promise<string | undefined> => {
  try {
    const members = await client.fetchWeeklyContributionsOfOrganizationMember(
      organizationId,
      fromAt,
    );

    const activeMembers = members.filter((member) => {
      return (
        !!member.contributionCount &&
        !BLACK_LIST_LOGIN_IDS.includes(member.loginId) // eslint-disable-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      );
    });
    activeMembers.sort((a, b) =>
      a.contributionCount < b.contributionCount ? 1 : -1,
    );

    const displayMembers = activeMembers.slice(0, size - 1);

    const title = '\n🎉 今週のランキング 🎉\n';

    const sumContributions = displayMembers.reduce(
      (prev, member) => member.contributionCount + prev,
      0,
    );
    let firstMessage = '';
    firstMessage += `総contribution数: ${sumContributions}\n`;
    firstMessage += `計測日数: ${fromAt}日\n`;

    let message = '';

    displayMembers.forEach((member, idx) => {
      const _idx = idx + 1;
      const percent =
        Math.round((1000 * member.contributionCount) / sumContributions) / 10;
      message += `${_idx}位: ${member.loginId}\n`;
      message += `contribution数: ${member.contributionCount} (${percent}%)\n`;
      if (_idx < displayMembers.length) {
        message += `\n`;
      }
    });

    const footer =
      '▼　実装内容:\nhttps://github.com/Conken-NitKit/conken-contribution';

    return `${title}\n${firstMessage}\n${message}\n${footer}`;
  } catch (error) {
    console.error(error);
  }
};
