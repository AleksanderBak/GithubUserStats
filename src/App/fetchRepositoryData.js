import { Octokit } from "@octokit/core";
import config from "../config";
import fetchCommitsData from "./fetchCommitsData";

const PAGE_SIZE = 6;
const API_ENDPOINT = "GET /users/{username}/repos";

async function fetchRepositoryData(username, page) {
  const octokit = new Octokit({
    auth: config.GITHUB_AUTH_TOKEN,
  });
  try {
    const cachedData = localStorage.getItem(`${username}-${page}`);
    if (cachedData) {
      const { data, hasNextPage, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < 10 * 60 * 1000) {
        return { data: data, hasNextPage: hasNextPage, error: null };
      }
    }

    const reposData = await octokit.request(API_ENDPOINT, {
      username: username,
      page: page,
      per_page: PAGE_SIZE,
    });

    const nextPageData = await octokit.request(API_ENDPOINT, {
      username: username,
      page: page + 1,
      per_page: PAGE_SIZE,
    });

    let hasNextPage = nextPageData.data.length > 0;

    const additionalData = await fetchCommitsData(username, reposData);

    const data = [];

    additionalData.forEach((repo) => {
      data.push({
        id: repo.id,
        name: repo.name,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        commits: repo.commits,
        link: repo.html_url,
      });
    });

    localStorage.setItem(
      `${username}-${page}`,
      JSON.stringify({
        data: data,
        hasNextPage: hasNextPage,
        timestamp: Date.now(),
      })
    );
    return { data: data, hasNextPage: hasNextPage, error: null };
  } catch (error) {
    if (error.status === 404) {
      return { error: "User not found" };
    } else {
      return { error: "Unknown error occurred" };
    }
  }
}

export default fetchRepositoryData;
