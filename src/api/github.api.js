import { API_GITHUB_URL } from '../config/api.config';
import { stringify } from 'querystring';
import axios from 'axios';
import { parseHeadersForPagesCount } from '../helpers/headers';

export const getRepositoriesApiUrl = (page = 1) =>
  `${API_GITHUB_URL}/orgs/facebook/repos?${stringify({ page })}`;

export const getRepositoryDetailsApiUrl = repository =>
  `${API_GITHUB_URL}/repos/facebook/${repository}`;

export const getRepoContributorsApiUrl = repo =>
  `${API_GITHUB_URL}/repos/facebook/${repo}/stats/contributors`;

export const getAllRepositories = async () => {
  const response = await axios.get(getRepositoriesApiUrl());
  const pagesCount = parseHeadersForPagesCount(await response.headers);
  let repositories = await response.data;
  if (pagesCount > 1) {
    for (let i = 2; i <= pagesCount; i++) {
      const r = await axios.get(getRepositoriesApiUrl(i));
      repositories = repositories.concat(await r.data);
    }
  }
  return repositories.sort((a, b) => b.watchers_count - a.watchers_count);
};

export const getContributors = async repository => {
  const response = await axios.get(getRepoContributorsApiUrl(repository));
  return await response.data;
};

export const getRepository = async repository => {
  const response = await axios.get(getRepositoryDetailsApiUrl(repository));
  return await response.data;
};
