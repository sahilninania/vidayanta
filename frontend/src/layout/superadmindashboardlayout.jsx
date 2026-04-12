import { useState } from "react";
import SuperadminSidebar from "../components/superadminsidebar";
import SuperadminHeader from "../components/superadminheader";

export default function Superadminlayout({ children }) {

  const [open, setOpen] = useState(false);

  return (
    <div>

      {/* ✅ FIXED */}
      <SuperadminSidebar open={open} setOpen={setOpen} />

      <SuperadminHeader setOpen={setOpen} />

      {/* MAIN CONTENT */}
      <div className="md:ml-64 p-4">
        {children}
      </div>

    </div>
  );
}