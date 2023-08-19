"use client";
import axios from "axios";
import React,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/navbar";
import Left from "../components/left/left";
import { FaRegWindowClose, FaUser} from "react-icons/fa";

export default function Connections() {
  const router = useRouter();

  const [connection,setConnection]=useState([]);
  const [nonConnection,setNonConnection]=useState([]);

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };




  const getConnection=async()=>{

    try{
      const friends=await axios.get('/api/getconnection');
      

      const ids={ids:friends.data.connection};

      const response=await axios.post('/api/getdetailsofuser',ids);

      
      const connection=response.data.detail;
      
      setConnection(connection);

    }
    catch(error:any){
      console.log(error.message);
    }
  }
  
  const getNonConnection=async()=>{
    const nonfriends=await axios.get('/api/getnonconnection');
      

    const ids={ids:nonfriends.data.nonConnection};

    const response=await axios.post('/api/getdetailsofuser',ids);

    const nonconnection=response.data.detail;
    
    setNonConnection(nonconnection);
  }


  useEffect(()=>{
    getConnection();
    getNonConnection();
    
  },[]);

  return (
    <div className="flex flex-col relative">
      <Navbar />
      <div className="body flex" style={{ minHeight: "150vh" }}>
        <div className="left w-1/6">
          <Left />
        </div>

        <div className="right bg-sky-50 w-5/6 border-t-2 border-gray-300 relative">
          <div className="mt-20 p-4 pt-8 z-10 bg-white min-h-screen w-4/5 right-40 absolute rounded-2xl">
            <div className="connected m-4 flex flex-wrap">
              <div className="m-4 p-2 profile flex justify-around items-center  border-4 border-gray-300 rounded-xl">
                <div className="friend-detail">
                  <h1 className="text-xl font-bold">Gaurang Rastogi</h1>
                  <h1 className="text-gray-600">Full Stack Developer</h1>
                  <h1 className="text-gray-700">@OruPhones</h1>
                  <button className="p-2 px-10 mt-8 h-10 bg-violet-300 hover:bg-violet-400 text-black-600 font-bold rounded-3xl">
                    Remove
                  </button>
                </div>
                <div
                  className="p-4 image border-4 border-gray-100 rounded-full"
                  style={{ background: "rgba(255, 167, 141, 1)" }}
                >
                  <FaUser size="5em" color="#1e2875" />
                </div>
              </div>

              <div className="m-4 p-2 profile flex justify-around items-center  border-4 border-gray-300 rounded-xl">
                <div className="friend-detail">
                  <h1 className="text-xl font-bold">Gaurang Rastogi</h1>
                  <h1 className="text-gray-600">Full Stack Developer</h1>
                  <h1 className="text-gray-700">@OruPhones</h1>
                  <button className="p-2 px-10 mt-8 h-10 bg-violet-300 hover:bg-violet-400 text-black-600 font-bold rounded-3xl">
                    Remove
                  </button>
                </div>
                <div
                  className="p-4 image border-4 border-gray-100 rounded-full"
                  style={{ background: "rgba(255, 167, 141, 1)" }}
                >
                  <FaUser size="5em" color="#1e2875" />
                </div>
              </div>
            </div>

            <h1 className="mt-40 text-4xl text-gray-700">
              People You can also connect
            </h1>

            <div className="m-4 connect flex flex-wrap">

              <div className="m-4 p-2 profile flex justify-around items-center  border-4 border-gray-300 rounded-xl">
                <div className="friend-detail">
                  <h1 className="text-xl font-bold">Gaurang Rastogi</h1>
                  <h1 className="text-gray-600">Full Stack Developer</h1>
                  <h1 className="text-gray-700">@OruPhones</h1>
                  <button className="p-2 px-10 mt-8 h-10 bg-violet-300 hover:bg-violet-400 text-black-600 font-bold rounded-3xl">
                    Connect
                  </button>
                </div>
                <div
                  className="p-4 image border-4 border-gray-100 rounded-full"
                  style={{ background: "rgba(255, 167, 141, 1)" }}
                >
                  <FaUser size="5em" color="#1e2875" />
                </div>
              </div>

              <div className="m-4 p-2 profile flex justify-around items-center  border-4 border-gray-300 rounded-xl">
                <div className="friend-detail">
                  <h1 className="text-xl font-bold">Gaurang Rastogi</h1>
                  <h1 className="text-gray-600">Full Stack Developer</h1>
                  <h1 className="text-gray-700">@OruPhones</h1>
                  <button className="p-2 px-10 mt-8 h-10 bg-violet-300 hover:bg-violet-400 text-black-600 font-bold rounded-3xl">
                    Connect
                  </button>
                </div>
                <div
                  className="p-4 image border-4 border-gray-100 rounded-full"
                  style={{ background: "rgba(255, 167, 141, 1)" }}
                >
                  <FaUser size="5em" color="#1e2875" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="z-1 darkBlue bg-blue-950 rounded-2xl absolute"
            style={{ width: "100%", minHeight: "200px" }}
          >
            <h1 className="p-4 text-white text-lg">My Connections</h1>
          </div>
        </div>
      </div>

      <button
        className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-5 left-28"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
