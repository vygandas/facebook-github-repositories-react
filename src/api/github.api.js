import { API_GITHUB_URL } from '../config/api.config';
import { stringify } from 'querystring';

export const getRepositoriesApiUrl = (page = 1) =>
  `${API_GITHUB_URL}/orgs/facebook/repos?${stringify({ page })}`;

export const getRepoContributorsApiUrl = (owner, repo) =>
  `${API_GITHUB_URL}/repos/facebook/${repo}/stats/contributors`;
