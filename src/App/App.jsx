import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RepositoryList from "../RepositoryList/RepositoryList";
import Message from "../Message/Message";
import Pagination from "../Pagination/Pagination";
import fetchRepositoryData from "./fetchRepositoryData";

const App = () => {
  const [searchUser, setSearchUser] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [repos, setRepos] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const changeInput = (e) => {
    setInputValue(e.target.value);
  };

  const getData = async () => {
    setLoading(true);
    setError(null);
    setRepos(null);
    if (!searchUser) {
      setLoading(false);
      setError("Please enter a username");
      return;
    }
    const repoData = await fetchRepositoryData(searchUser, page);
    if (repoData.error) {
      setError(repoData.error);
      setLoading(false);
      return;
    }
    setRepos(repoData.data);
    setHasNextPage(repoData.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      getData();
    }
  }, [searchUser, page]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-main_bg">
      <div className="fixed top-0 z-50 flex items-center justify-center w-full h-20 p-12 shadow-sm bg-top-bar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setSearchUser(inputValue);
          }}
        >
          <input
            type="text"
            className="w-64 px-3 py-2 mx-5 text-xl leading-tight text-gray-700 bg-gray-100 border rounded appearance-none border-accent_main focus:outline-none focus:bg-white"
            onChange={changeInput}
            placeholder="Type in a user name"
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#3C493F",
              color: "#F0F7F4",
            }}
            style={{
              color: "#3C493F",
              backgroundColor: "#F0F7F4",
            }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 1 }}
            type="submit"
            className="px-10 py-2 mx-5 text-xl font-semibold rounded"
          >
            Search
          </motion.button>
        </form>
      </div>

      {repos?.length > 0 ? (
        <div className="flex flex-col items-center">
          <RepositoryList repos={repos} />
          <Pagination
            page={page}
            hasNextPage={hasNextPage}
            setPage={setPage}
            loading={loading}
          />
        </div>
      ) : (
        <Message
          error={error}
          loading={loading}
          reposUnavailable={repos?.length === 0}
        />
      )}
    </div>
  );
};

export default App;
