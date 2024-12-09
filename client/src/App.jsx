import { Routes, Route } from "react-router";

import Home from "./pages/Home";

export default function App() {
  return (
    <div className="font flex min-h-screen w-screen bg-richblack-900">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
