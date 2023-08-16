"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </main>
  );
}
