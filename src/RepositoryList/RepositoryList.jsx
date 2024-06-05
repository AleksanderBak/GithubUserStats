import { FaRegStar, FaExternalLinkAlt } from "react-icons/fa";
import { FaCodeFork, FaCodeCommit } from "react-icons/fa6";
import { GoIssueOpened } from "react-icons/go";
import { motion } from "framer-motion";

const ICON_SIZE = 22;

const RepositoryList = ({ repos }) => {
  const renderRepoStat = (icon, text, value) => (
    <div className="flex flex-row items-center">
      {icon}
      <span className="w-40 ml-2">{text}</span>
      {value}
    </div>
  );

  return (
    <div className="grid items-start grid-cols-2 gap-4 pt-24">
      {repos.map((repo) => (
        <div
          className="bg-repo-card border-2 rounded-xl m-5 py-3 px-6 drop-shadow-md min-w-[25rem]"
          key={repo.id}
        >
          <a href={repo.link} title="Go to repository" target="_blank">
            <motion.div
              className="absolute right-6 top-4"
              whileHover={{ translateX: 2, translateY: -2 }}
            >
              <FaExternalLinkAlt color="#3C493F" size={25} />
            </motion.div>
          </a>

          <div className="mb-2 pb-1 border-b border-b-black w-[90%]">
            <span className="text-xl font-semibold text-text_dim">
              {repo.name}
            </span>
          </div>
          <div className="flex flex-col justify-between tracking-wider text-l text-text_dim h-36">
            {renderRepoStat(
              <FaRegStar color="#8F6D45" size={ICON_SIZE} />,
              "Stars: ",
              repo.stargazers_count
            )}
            {renderRepoStat(
              <FaCodeFork color="#8F6D45" size={ICON_SIZE} />,
              "Forks: ",
              repo.forks_count
            )}
            {renderRepoStat(
              <FaCodeCommit color="#8F6D45" size={ICON_SIZE} />,
              "Commits: ",
              repo.commits > 100 ? "100+" : repo.commits
            )}
            {renderRepoStat(
              <GoIssueOpened color="#8F6D45" size={ICON_SIZE} />,
              "Opened issues: ",
              repo.open_issues_count
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
