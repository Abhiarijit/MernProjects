import React,{useEffect} from "react";
import { useState } from "react";
import {useHistory} from "react-router-dom";
import "..//css-components/About.css";
import abhi from "../images/abhi.jpg.jpg";
import sinu from "../images/sinu.jpg";

const About = () => {
  const [userData,setData]=useState({});
  const history=useHistory();
  const callAboutPage=async ()=>{
    try{
      const res=await fetch("http://localhost:3000/About",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data=await res.json();
      setData(data);
            // console.log(data);
      if(!res.status===201){
        const error=new Error(res.error);
        throw error;
      }


    }catch(err){
      console.log(err);
      history.push("/Login");

    }


  }
useEffect(() => {
  callAboutPage();

},[]);
  return (
    <>
      <div className="cont">
        <form  method="GET">
        <div className="upper-personal-information">
          <div className="image">
            <img src={userData.name==="Avinash Yadav"?abhi:sinu} alt="my-img" />
          </div>
          <div className="information">
            <h6>{userData.name}</h6>
            <p style={{color:"blue"}}>{userData.work}</p>
          </div>
        </div>
 
        <div className="lower-personal-information">
          <div className="working-information">
            <div className="work-head">
              <h6>Profile Work</h6>
            </div>
            <div className="work-information">
              <ul className="list-items">
                <li className="items">YouTuber</li>
                <li className="items">Instagram</li>
                <li className="items">Abhi Technical</li>
                <li className="items">Web Developer</li>
                <li className="items">Figma</li>
                <li className="items">Software Engineer</li>
              </ul>
            </div>
          </div>
          <div className="personal-information">
            <div className="raw-personal-information">
              <ul className="list-items">
                <li className="items">Id</li>
                <li className="items">Name</li>
                <li className="items">Email</li>
                <li className="items">Phone</li>
                <li className="items">Profession</li>
              </ul>
            </div>
            <div className="accurate-personal-information">
              <ul className="list-items">
                <li className="items">{userData._id}</li>
                <li className="items">{userData.name}</li>
                <li className="items">{userData.email}</li>
                <li className="items">{userData.phone}</li>
                <li className="items">{userData.work}</li>
              </ul>
            </div>
          </div>
        </div>
        </form>
      </div>
    </>
  );
};

export default About;
