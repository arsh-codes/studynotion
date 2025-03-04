import { Route, Routes } from "react-router";

import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar/Navbar";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}
