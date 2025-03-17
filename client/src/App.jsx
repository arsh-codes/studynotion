import AppRoutes from "./AppRoutes";
import FloatingDevTool from "@components/common/FloatingDevTool";
import Navbar from "@components/common/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col select-none">
      {/* Notification Toast */}
      <Toaster />
      <Navbar />
      <FloatingDevTool />
      <AppRoutes />
    </div>
  );
}
