import { Routes, Route } from "react-router";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
export default function App() {
  return (
    <div className="min-h-screen w-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
