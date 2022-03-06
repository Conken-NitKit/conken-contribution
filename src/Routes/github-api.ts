import express from 'express';

import { GithubControllerImpl } from '../Controllers/github-api';
import { GitHubApiApolloClientImpl } from '../Infrastructures/apollo-github-api';

const router = express.Router();

const githubController = new GithubControllerImpl(
  new GitHubApiApolloClientImpl(),
  'Conken-NitKit',
);

router.get(
  '/weekly-contributions',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  githubController.fetchWeeklyContributionsOfOrganizationMember.bind(
    githubController,
  ),
);

export const contributionRouter = router;
