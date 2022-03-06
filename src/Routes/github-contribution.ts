import express from 'express';

import { GithubContributionControllerImpl } from '../Controllers/github-contribution';
import { GitHubApiApolloClientImpl } from '../Infrastructures/apollo-github-api';
import { LineNotifyClientImpl } from '../Infrastructures/line-notify';

const router = express.Router();

const githubContributionController = new GithubContributionControllerImpl(
  new GitHubApiApolloClientImpl(),
  new LineNotifyClientImpl(),
  'Conken-NitKit',
);

router.get(
  '/weekly-contributions',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  githubContributionController.fetchWeeklyContributionsOfOrganizationMember.bind(
    githubContributionController,
  ),
);

router.get(
  '/notify/weekly-contributions',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  githubContributionController.notifyWeeklyContributionsOfOrganizationMember.bind(
    githubContributionController,
  ),
);

export const contributionRouter = router;
