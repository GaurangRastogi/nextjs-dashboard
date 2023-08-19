"use client";
import axios from "axios";
import React,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/navbar/navbar";
import Left from "./components/left/left";
import { FaUser, FaStar, FaIcons } from "react-icons/fa";
import { getSignature, upload } from "@/helpers/signature";

export default function Home() {


  const [user,setUser]=useState({
    username:"Gaurang",
    email:"gr@gmail.com",
    mobile:"8194177570",
    profilePhoto:""
  });
  
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };



  const handleFileChange = async (event:any) => {


    try{
      const file = event.target.files[0];
      // console.log("file",file)

      if(file){
        const {timestamp,signature}=await getSignature();

        const api_key="134449599196273";
        console.log("xyz",api_key);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key',api_key);
        formData.append('signature',signature);
        formData.append('timestamp',timestamp);
        formData.append('folder','next');

        const url=await upload(formData);
        
        const user=await axios.post('/api/uploadPhoto',{url});
        // console.log(user);
        
        getUser();
      }
    }
    catch (error: any) {
      console.log(error.message);
    }
    finally{
      event.target=null;
    }
  };


  const getUser=async()=>{
    try{
      const response=await axios.get('/api/getuser');
      setUser(response.data.user);
      console.log(user);
    }
    catch(error:any){
      console.log(error.message);
    }
  }

  const uploadPhoto=async ()=>{
    try{
      const inputId=document.getElementById("hiddenInput");
      
      inputId?.click();

      return;
    }
    catch(error:any){
      console.log(error.message);
    }
  }



  useEffect(()=>{
    getUser();
    console.log("",user.profilePhoto);
  },[]);

  return (
    <div className="flex flex-col relative">
      <Navbar  user={user.username} profile={user.profilePhoto}/>
      <div className="body flex" style={{ minHeight: "150vh" }}>
        <div className="left w-1/6">
          <Left />
        </div>

        <div className="right bg-sky-50 w-5/6 border-t-2 border-gray-300 relative">
          <div className="flex mt-20 p-4 pt-8 z-10 bg-white min-h-screen w-4/5 right-40 absolute rounded-2xl">
            <div className="right-left w-1/2">
              <div className="profile flex justify-around items-center">
                <div
                  className="p-1 image border-4 border-gray-100 rounded-full"
                  style={{ background: "rgba(255, 167, 141, 1)" }}
                >
              {
                user.profilePhoto!=="" && user.profilePhoto!=undefined?<img src={user.profilePhoto} width="150px" height="150px" className="border rounded-full"/>:<FaUser size="5em" color="#1e2875" />
                }
                </div>
                <input type="file" id="hiddenInput" onChange={handleFileChange} style={{"display":"none"}}/>
                <button className="p-2 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-3xl" onClick={uploadPhoto}>
                  Upload Photo
                </button>
              </div>

              <div className="details mt-10 mx-16 border-4 border-gray-300 rounded-xl">
                {/* name */}
                <div className="px-4 py-2 details-name-container flex flex-col">
                  <h1 className="text-xl text-gray-600 text-bold">Name</h1>

                  <div className="details-name flex justify-between items-center">
                    <h1>{user.username}</h1>
                    <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                      Edit
                    </button>
                  </div>
                </div>

                {/* email */}
                <div className="px-4 py-2 details-email-container flex flex-col">
                  <h1 className="text-xl text-gray-600 text-bold">Email</h1>

                  <div className="details-email flex justify-between items-center">
                    <h1>{user.email}</h1>
                    <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                      Edit
                    </button>
                  </div>
                </div>

                {/*mobile*/}
                <div className="px-4 py-2 details-mobile-container flex flex-col">
                  <h1 className="text-xl text-gray-600 text-bold">
                    Phone Number
                  </h1>

                  <div className="details-mobile flex justify-between items-center">
                    <h1>{user.mobile}</h1>
                    <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="about mt-10 mx-16 border-4 border-gray-300 rounded-xl">
                <div className="px-4 py-2 about-heading flex justify-between">
                  <h1 className="text-black text-2xl font-bold">
                    About
                    <span className="m-2 text-blue-950">{user.username}</span>
                  </h1>
                  <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                    Edit
                  </button>
                </div>
                <div className="px-4 py-2">
                  <p className="text-gray-700 text-justify">
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, 
                  graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century 
                  who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a 
                  type specimen book. It usually begins with: Lorem ipsum dolor sit amet, consectetur adipiscing 
                  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>

              <div className="skills mt-10 mx-16 border-4 border-gray-300 rounded-xl">
                <div className="px-4 py-2 skill-heading flex justify-between">
                  <h1 className="text-black text-2xl font-bold">Skills</h1>
                  <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                    Edit
                  </button>
                </div>

                <div className="px-4 py-4 flex flex-col">
                  <h1 className="p-2">Nextjs</h1>
                  <h1 className="p-2">Typescript</h1>
                </div>
              </div>
            </div>

            <div className="right-right w-1/2">
              <div className="professional-details mt-2 mx-16 border-4 border-gray-300 rounded-xl">
                <div className="px-4 py-2 profissional-heading flex justify-between">
                  <h1 className="text-black text-2xl font-bold">
                    Professional Details
                  </h1>
                  <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                    Edit
                  </button>
                </div>

                <div className="py-2 flex justify-around">
                  <p className="text-gray-700 text-justify w-3/4">
                    Are you stoked about all the cool stuff happening in the
                    tech world? Are you buzzing with ideas.
                  </p>
                  <div className="pr-16 relative">
                    <div className="absolute rotate-12">
                      <FaStar size="3em" color="BAE6FD" />
                      {/* "#F0F9FF"  */}
                    </div>
                    <div className="absolute -rotate-12 top-5 left-3">
                      <FaStar size="2em" color="#1e2875" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="certifications mt-10 mx-16">
                <div className="certification-heading px-4 py-2 flex justify-between">
                  <h1 className="text-black text-2xl font-bold">
                    Certifications
                  </h1>
                  <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                    Edit
                  </button>
                </div>

                <div className="mt-4 certifications-list px-4 py-2 border-4 border-gray-300 rounded-3xl">
                  <div className="certificate flex items-center">
                    <div className="icon pr-4">
                      <FaIcons size="2em" color="#FFCE10" />
                    </div>
                    <div className="name pl-32">
                      <h1 className="text-gray-700 text-2xl">Python</h1>
                      <h1>Coding Ninjas</h1>
                    </div>
                  </div>
                </div>

                <div className="mt-4 certifications-list px-4 py-2 border-4 border-gray-300 rounded-3xl">
                  <div className="certificate flex items-center">
                    <div className="icon pr-4">
                      <FaIcons size="2em" color="#FFCE10" />
                    </div>
                    <div className="name pl-32">
                      <h1 className="text-gray-700 text-2xl">Python</h1>
                      <h1>Coding Ninjas</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience mt-10 mx-16">
                <div className="experience-heading px-4 py-2 flex justify-between">
                  <h1 className="text-black text-2xl font-bold">Experience</h1>
                  <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                    Edit
                  </button>
                </div>

                <div className="mt-4 exprience-list px-4 py-2 border-4 border-gray-300 rounded-3xl">
                  <div className="experience flex flex-col">
                    <div className="px-10 py-2 first-row flex justify-between  text-xl font-bold">
                      <h1>(7 years) 2021-2023</h1>
                      <h1>Full-time</h1>
                    </div>
                    <div className="px-10 py-2 second-row flex justify-between text-gray-600 text-xl">
                      <h1>OruPhones</h1>
                      <h1>Full Stack Developer</h1>
                    </div>
                  </div>
                </div>

                <div className="mt-4 exprience-list px-4 py-2 border-4 border-gray-300 rounded-3xl">
                  <div className="experience flex flex-col">
                    <div className="px-10 py-2 first-row flex justify-between  text-xl font-bold">
                      <h1>(7 years) 2021-2023</h1>
                      <h1>Full-time</h1>
                    </div>
                    <div className="px-10 py-2 second-row flex justify-between text-gray-600 text-xl">
                      <h1>OruPhones</h1>
                      <h1>Full Stack Developer</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="education mt-10 mx-16">
                <div className="education-heading px-4 py-2 flex justify-between">
                  <h1 className="text-black text-2xl font-bold">Education</h1>
                  <button className="p-2 px-6 h-10 bg-gray-100 hover:bg-gray-300 text-gray-600 font-bold rounded-2xl">
                    Edit
                  </button>
                </div>

                <div className="mt-4 education-list px-4 py-2 border-4 border-gray-300 rounded-3xl">
                  <div className="education flex flex-col">
                    <div className="px-10 py-2 first-row flex justify-between  text-xl font-bold">
                      <h1>VIT VELLORE</h1>
                    </div>
                    <div className="px-10 py-2 second-row flex justify-between text-gray-600 text-xl">
                      <h1>2020 - 2024</h1>
                      <h1>B. Tech</h1>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-gray-700 text-justify">
                      Lorem ipsum, or lipsum as it is sometimes known, is dummy text 
                      used in laying out print, graphic or web designs. The passage is 
                      attributed to an unknown typesetter Lorem ipsum, or lipsum as it 
                      is sometimes known, is dummy text used in laying out print,
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="z-1 darkBlue bg-blue-950 rounded-2xl absolute"
            style={{ width: "100%", minHeight: "200px" }}
          >
            <h1 className="p-4 text-white text-lg">MY PROFILE</h1>
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
