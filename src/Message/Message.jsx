import { FaArrowUp } from "react-icons/fa6";
import { ImSpinner4 } from "react-icons/im";
import { motion } from "framer-motion";

const Message = ({ error, loading, reposUnavailable }) => {
  const showDefault = !error && !loading;
  error = loading || reposUnavailable ? null : error;

  return (
    <div className="text-text_dim h-screen text-4xl flex justify-center items-center flex-col font-bold w-[50%] text-center">
      {error && <p className="text-red-600 ">Error: {error}</p>}
      {loading && (
        <div className="flex flex-row">
          <span className="mr-3">Loading</span>
          <motion.div
            className="mt-1"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0,
            }}
          >
            <ImSpinner4 size={40} />
          </motion.div>
        </div>
      )}
      {showDefault && (
        <>
          {reposUnavailable ? (
            <p>This user does not have any public repositories</p>
          ) : (
            <>
              <FaArrowUp size={180} className="pb-24" />
              <p>
                Search for a user to see their repositories. Type in a user name
                and click "Search".
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
