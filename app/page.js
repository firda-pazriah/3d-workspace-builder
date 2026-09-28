"use client";

import { useState } from "react";

import Workspace3D from "@/components/builder/Workspace3D";

export default function Home() {
  const [workspace, setWorkspace] = useState({
    desk: null,
    chair: null,
    accessories: [],
  });

  return (
    <main className="w-screen h-screen">
      <Workspace3D />
    </main>
  );
}