import { Link } from "react-router-dom";
import React from "react";
const Error = () => {
  return (
    <section className="bg-richblack-900 flex flex-1 flex-col items-center justify-center gap-1">
      <h1 className="text-richblack-5 text-6xl font-extrabold lg:text-9xl">
        404
      </h1>
 
        <p className="text-richblack-5 text-3xl font-bold">
          Something's missing.
        </p>
        <p className="text-richblack-100 mb-5 font-light">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
   
      <Link to="/">
        <p className="bg-richblack-700 flex flex-row items-center gap-2 rounded-lg p-3 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none">
          Back to Homepage
        </p>
      </Link>
    </section>
  );
};

export default Error;
