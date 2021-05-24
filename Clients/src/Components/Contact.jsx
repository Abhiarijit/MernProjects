import React,{useState,useEffect} from "react";
import "../css-components/Contact.css";
import Phone from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";
import Home from "@material-ui/icons/Home";

const Contact = () => {
  const [userData,setData]=useState({
    name:"",
    email:"",
    phone:"",
    message:""
  });
  const callContactPage=async ()=>{
    try{
      const res=await fetch("http://localhost:3000/getData",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      });
      const data=await res.json();
      setData({...userData,name:data.name,email:data.email,phone:data.phone});
            // console.log(data);
      if(!res.status===201){
        const error=new Error(res.error);
        throw error;
      }

 
    }catch(err){
      console.log(err);

    }


  }
useEffect(() => {
  callContactPage();

},[]);
const inpHandler=(e)=>{
  const name=e.target.name;
  const value=e.target.value;
  setData({...userData,[name]:value});
}
const FormSubmit=async (e)=>{
  e.preventDefault();
  const {name,email,phone,message}=userData;
  const res=await fetch("http://localhost:3000/Contact",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,phone,message})
  });
  const sendData=await res.json();
  if(!sendData){
    console.log("message will not send");

  }else{
    alert("messages are send");
    setData({...userData,message:""})
  }

}

  return (
    <>
      <div className="container">
        <div className="my-datas">
          <div className="my-data">
            <span>
              <Phone />
            </span>
            <h5>Phone 9369758477</h5>
          </div>
          <div className="my-data">
            <span>
              <Email />
            </span>
            <h5>Email abhiarijit2019@gmail.com</h5>
          </div>
          <div className="my-data">
            <span>
              <Home />
            </span>
            <h5>Address UP Mirzapur Gorakhi </h5>
          </div>
        </div>
        <div className="users-datas">
          <h2>Get in touch</h2>
          <form method="POST" className="form">
            <div className="form-group">
              <input
                type="text"
                className="inp-text"
                placeholder="Your name"
                name="name"
                autoComplete="off"
                value={userData.name} onChange={inpHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="inp-mail"
                placeholder="Your email"
                name="email"
                autoComplete="off"
                value={userData.email} onChange={inpHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="inp-num"
                placeholder="Phone"
                name="phone"
                autoComplete="off"
                value={userData.phone} onChange={inpHandler}
              />
            </div>
            <div className="textarea-group">
             <textarea placeholder="Message" name="message" onChange={inpHandler}>

             </textarea>
            </div>
            <div className="form-submit"> 
              <button
              onClick={FormSubmit}
                type="submit"
                className="inp-submit"
              >Send Message</button>
            </div>
         
          
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
