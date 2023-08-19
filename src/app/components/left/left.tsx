"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Left() {
  const [pathname,setPathName]=useState("");
  const router=useRouter();
  const profile = () => {
    router.push('/');
  };
  const connections = () => {
    router.push('/connections');
  };

  useEffect(()=>{
    const path=window.location.pathname;
    setPathName(path);
  },[])
  return (
    <div className="py-2 pl-5 flex flex-col border-t-2 border-gray-300" style={{"minHeight":"88vh"}}>
      {pathname === "/" ? (
        <div className="flex items-center">
          <FaAngleLeft color="#1A237E" />
          <p className="m-2 py-2 px-8 text-2xl text-indigo-900 border-2 rounded-lg border-indigo-900">
            My Profile
          </p>
        </div>
      ) : (
        <div className="flex items-center">
          <FaAngleLeft color="#1A237E" />
          <p
            className="px-10 py-2 text-2xl text-indigo-900 cursor-pointer"
            onClick={profile}
          >
            My Profile
          </p>
        </div>
      )}

      {pathname === "/connections" ? (
        <div className="flex items-center">
          <FaAngleLeft color="#1A237E" />
          <p className="m-2 py-2 px-4 text-2xl text-indigo-900 border-2 rounded-lg border-indigo-900">
            Connections
          </p>
        </div>
      ) : (
        <div className="flex items-center">
          <FaAngleLeft color="#1A237E" />
          <p
            className="px-10 py-2 text-2xl text-indigo-900 cursor-pointer"
            onClick={connections}
          >
            Connections
          </p>
        </div>
      )}
    </div>
  );
}
