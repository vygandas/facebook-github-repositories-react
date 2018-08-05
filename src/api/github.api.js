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

/**
 * Collect all repositories of Facebook organisation.
 * If it has more than one page loop and collect all pages.
 */
export const getAllRepositories = async () => {
  const response = await axios.get(getRepositoriesApiUrl());
  const pagesCount = parseHeadersForPagesCount(await response.headers);
  let repositories = await response.data;
  // If we find in headers that there're more than 1 page we have to call
  // API more times to get data from all existing pages.
  if (pagesCount > 1) {
    for (let i = 2; i <= pagesCount; i++) {
      const r = await axios.get(getRepositoriesApiUrl(i));
      repositories = repositories.concat(await r.data);
    }
  }
  return repositories.sort((a, b) => b.watchers_count - a.watchers_count);
};

/**
 * Get contributors list of repository.
 * @param {string} repository name of repository
 */
export const getContributors = async (
  repository,
  count = 0,
  maxRetryCount = 5
) => {
  const response = await axios.get(getRepoContributorsApiUrl(repository));
  let data = await response.data;
  // Sometimes API returns not "200 OK" but "202 Accepted" status code.
  // That means that we have no data in a response and no error.
  // Retrying helps.
  if (count < maxRetryCount && !(data instanceof Array)) {
    return getContributors(repository, ++count);
  }
  return data;
};

/**
 * Get repository info object.
 * @param {*} repository name of repository
 */
export const getRepository = async repository => {
  const response = await axios.get(getRepositoryDetailsApiUrl(repository));
  return await response.data;
};
