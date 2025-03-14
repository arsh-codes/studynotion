import { Link } from "react-router-dom";
import React from "react";

const PrivateRouteError = () => {
  return (
    <section className="bg-richblack-900 flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-richblack-5 text-5xl font-extrabold">
        Access Denied
      </h1>
      <p className="text-richblack-5 text-xl font-bold">
        You are not authorized to view this page.
      </p>
      <p className="text-richblack-100 mb-5 max-w-md font-light">
        Please log in with an authorized account to access this content.
      </p>
      <Link to="/login">
        <p className="bg-richblack-700 hover:bg-richblack-600 rounded-lg px-4 py-2 text-lg font-medium text-white shadow-lg transition">
          Go to Login
        </p>
      </Link>
    </section>
  );
};

export default PrivateRouteError;
