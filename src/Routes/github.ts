import express from 'express';

import { GithubControllerImpl } from '../Controllers/github';
import { GitHubApolloClientImpl } from '../Infrastructures/apollo-github';

const router = express.Router();

const githubController = new GithubControllerImpl(
  new GitHubApolloClientImpl(),
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
