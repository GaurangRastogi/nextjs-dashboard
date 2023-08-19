"use client";

import React, { useEffect } from "react";
import { FaRegBell, FaUser, FaAngleDown } from "react-icons/fa";
import Image from "next/image";

export default function Navbar({user,profile}:any) {

  useEffect(()=>{
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[profile]);
  

  return (
    <div className="py-4 px-10 flex items-center justify-between">
      <div className="px-4 py-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="text-3xl text-gray-600 font-sans font-medium">Dashboard</p>
      </div>

      <div className="flex items-center">
        <FaRegBell size="2em" color="#1E2875" />

        <div className="ml-4 flex items-center px-4 py-1 border border-gray-300 rounded-lg shadow-lg">
          <div
            className="m-2 border rounded-lg"
            style={{ background: "rgba(255, 167, 141, 1)" }}
          >
             {profile!=="" && profile!=undefined?<Image src={profile} alt={user} width={50} height={50} className="border rounded-xl"/>:<FaUser size="2em" color="#1e2875" />}

          </div>

          <div className="flex flex-col mr-10">
            <p className="text-xl text-indigo-900">Welcome Back</p>
            <p className="text-2xl text-indigo-900 font-medium">
              {user}
            </p>
          </div>
          <FaAngleDown size={"1.5em"} color="#1e2875" />
        </div>
      </div>
    </div>
  );
}
