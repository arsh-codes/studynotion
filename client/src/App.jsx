import { Routes, Route } from "react-router";

import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
