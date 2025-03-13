import AppRoutes from "@client/AppRoutes.jsx"; // Import the separate routes file
import FloatingDevTool from "@components/common/FloatingDevTool";
import Navbar from "@components/common/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Notification Toast */}
      <Toaster />
      <Navbar />
      <FloatingDevTool />
      {/* App Routes */}
      <AppRoutes />
    </div>
  );
}
