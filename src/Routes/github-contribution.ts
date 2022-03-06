import express from 'express';

import { GithubContributionControllerImpl } from '../Controllers/github-contribution';
import { GitHubApiApolloClientImpl } from '../Infrastructures/apollo-github-api';
import { LineNotifyClientImpl } from '../Infrastructures/line-notify';

const router = express.Router();

const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '';
const HTTP_FROM_AT = Number(process.env.HTTP_FROM_AT) || 30;
const LINE_NOTIFY_FROM_AT = Number(process.env.LINE_NOTIFY_FROM_AT) || 30;

const githubContributionController = new GithubContributionControllerImpl(
  new GitHubApiApolloClientImpl(),
  new LineNotifyClientImpl(),
  ORGANIZATION_ID,
  HTTP_FROM_AT,
  LINE_NOTIFY_FROM_AT,
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
