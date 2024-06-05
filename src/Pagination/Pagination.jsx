import { motion } from "framer-motion";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Pagination = ({ page, hasNextPage, setPage, loading }) => {
  const handleNextClick = () => {
    setPage((old) => old + 1);
  };

  const handlePrevClick = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  return (
    <div className="flex flex-row items-center justify-center align-middle bottom-5 mt-2.5">
      <div className="flex justify-end w-56">
        <motion.button
          whileHover={page === 1 ? {} : { translateX: -5 }}
          className="flex text-lg disabled:text-gray-400"
          onClick={handlePrevClick}
          disabled={page === 1 || loading}
        >
          Previous Page
          <MdNavigateBefore size={28} />
        </motion.button>
      </div>
      <div className="flex items-center justify-center w-10 px-3 py-2 m-3 text-xl font-bold text-white rounded-md bg-accent">
        <p>{page}</p>
      </div>
      <div className="flex justify-start w-56">
        <motion.button
          whileHover={hasNextPage ? { translateX: 5 } : {}}
          className="flex text-lg disabled:text-gray-400"
          onClick={handleNextClick}
          disabled={!hasNextPage || loading}
        >
          <MdNavigateNext size={28} />
          Next Page
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
