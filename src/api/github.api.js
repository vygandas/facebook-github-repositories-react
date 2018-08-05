import { API_GITHUB_URL } from '../config/api.config';
import { stringify } from 'querystring';

export const getRepositoriesApiUrl = (org = 'facebook', page = 1) =>
  `${API_GITHUB_URL}/orgs/${org}/repos?${stringify({ page })}`;

export const getRepoContributorsApiUrl = (owner, repo) =>
  `${API_GITHUB_URL}/repos/${owner}/${repo}/stats/contributors`;
