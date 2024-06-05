import { Octokit } from "@octokit/core";
import config from "../config";

const PAGE_SIZE = 100;
const API_ENDPOINT = "GET /repos/{owner}/{repo}/commits";

async function fetchCommitsData(username, repos) {
  const octokit = new Octokit({
    auth: config.GITHUB_AUTH_TOKEN,
  });

  const reposWithAdditionalData = await Promise.all(
    repos.data.map(async (repo) => {
      try {
        const commitsData = await octokit.request(API_ENDPOINT, {
          owner: username,
          repo: repo.name,
          per_page: PAGE_SIZE,
          page: 1,
        });

        let commits;
        if (commitsData.data.length < PAGE_SIZE) {
          commits = commitsData.data.length;
        } else {
          const nextPageData = await octokit.request(API_ENDPOINT, {
            owner: username,
            repo: repo.name,
            per_page: 1,
            page: 2,
          });
          commits = nextPageData.data.length > 0 ? `${PAGE_SIZE}+` : PAGE_SIZE;
        }

        return {
          ...repo,
          commits: commits,
        };
      } catch (error) {
        return {
          ...repo,
          commits: "N/A",
        };
      }
    })
  );
  return reposWithAdditionalData;
}

export default fetchCommitsData;
