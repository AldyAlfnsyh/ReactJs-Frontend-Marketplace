import { Link } from "react-router";

const Pagination = ({ data, fetchDataWithUrl }) => {
  return (
    <nav className="flex justify-center my-4">
      <ul className="flex gap-1">
        {data.prev && (
          <li className="">
            <button
              className="bg-blue-600 text-white rounded-md shadow-md p-2 py-1 w-fit"
              onClick={() => fetchDataWithUrl(data.prev)}
            >
              Previous
            </button>
          </li>
        )}
        {data.next && (
          <li className="">
            <button
              className="bg-blue-600 text-white rounded-md shadow-md p-2 py-1 w-fit"
              onClick={() => fetchDataWithUrl(data.next)}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
