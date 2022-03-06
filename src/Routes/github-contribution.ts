import express from 'express';

import { GithubContributionControllerImpl } from '../Controllers/github-contribution';
import { GitHubApiApolloClientImpl } from '../Infrastructures/apollo-github-api';
import { LineNotifyClientImpl } from '../Infrastructures/line-notify';

const router = express.Router();

// NOTE: .env.sample の内容を元に .env を作成する。
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN || '';
const LINE_NOTICE_TOKEN = process.env.LINE_NOTICE_TOKEN || '';
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '';
const HTTP_FROM_AT = Number(process.env.HTTP_FROM_AT) || 30;
const LINE_NOTIFY_FROM_AT = Number(process.env.LINE_NOTIFY_FROM_AT) || 30;
const MAX_SIZE = Number(process.env.MAX_SIZE) || 0;
const MAX_LINE_MESSAGE_SIZE = Number(process.env.MAX_LINE_MESSAGE_SIZE) || 0;

const githubContributionController = new GithubContributionControllerImpl(
  new GitHubApiApolloClientImpl(GITHUB_ACCESS_TOKEN),
  new LineNotifyClientImpl(LINE_NOTICE_TOKEN),
  ORGANIZATION_ID,
  HTTP_FROM_AT,
  LINE_NOTIFY_FROM_AT,
  MAX_SIZE,
  MAX_LINE_MESSAGE_SIZE,
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
