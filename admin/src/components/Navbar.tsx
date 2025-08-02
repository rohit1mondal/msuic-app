import React from "react";
import { ShieldCheck } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <div className="navbar rounded-2xl mt-3 w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg flex items-center gap-2 bg-[#212121] text-white shadow-md">
      <ShieldCheck className="w-6 h-6 text-white" />
      <p>Admin </p>
    </div>
  );
};

export default Navbar;
