import React from 'react'
import {NavLink} from "react-router-dom"
import "../css-components/Error.css";

const Error = () => {
    return (
        <>
       <div className="error">
       <h1>404 Error Page not found</h1> 
       <NavLink to="/" >Go to Home Page</NavLink>

       </div>
        </>
        
    )
}

export default Error;
