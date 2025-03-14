import { Link } from "react-router-dom";
import React from "react";
export default function Header({ pageName }) {
  return (
    <section className="flex flex-col gap-3 p-6">
      <div className="text-richblack-300 flex flex-row gap-2">
        <Link to={"/"}>Home</Link>
        <span>/</span>
        <Link to={"/"}>Dashboard</Link>
        <span>/</span>
        <span className="text-yellow-100"> {pageName}</span>
      </div>
      <h1 className="text-richblack-5 text-3xl font-medium">{pageName}</h1>
    </section>
  );
}
