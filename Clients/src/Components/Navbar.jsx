import React, { useContext } from 'react';
import {NavLink} from "react-router-dom";
import Logo from "../images/abhi.jpg.jpg";
import { userContext } from './App';


const Navbar = () => {
  const {state,dispatch}=useContext(userContext);
  const RenderMenu=()=>{
    if(state){
      return (
      <>
       <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/About">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Contact">Contact</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Registration">Registration</NavLink>
      </li>
      
      </>
      )
    }
    else{
      return (
        <>
        <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/About">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Contact">Contact</NavLink>
      </li>
      <li className="nav-item">
      
        <NavLink className="nav-link" to="/Logout">Logout</NavLink>
      </li>
        
        </>
      )
    }
  }
    return (
       <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  {/* <a className="navbar-brand" href="#">Navbar</a>
   */}
   <img src={Logo} className="logo" alt="logo-images"/>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <RenderMenu/>
  

      </ul>
 
  </div>
</nav>
       
       </>
    )
}

export default Navbar;