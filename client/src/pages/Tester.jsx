import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { setLoading } from "../Redux/slices/authSlice";

export default function Tester() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleLoadingSwitch() {
    dispatch(setLoading(!loading)); // Toggle loading state
  }

  return (
    <section className="bg-richblack-900 flex flex-1 flex-col items-center justify-center gap-1">
      {" "}
      <button
        onClick={handleLoadingSwitch}
        className="border-richblack-700 bg-richblack-800 text-richblack-100 w-fit rounded-lg border px-3 py-2 text-center font-medium active:scale-[97%]"
      >
        {loading ? "Stop Loading" : "Start Loading"}
      </button>
    </section>
  );
}
