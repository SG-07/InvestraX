import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="w-full h-[90vh]">
      <div className="flex flex-col items-center justify-center h-full">
        <p className="mt-[6%] text-gray-400 text-base font-light">
          You haven't placed any orders today
        </p>

        <Link
          to={"/"}
          className="mt-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-sm no-underline"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Orders;

