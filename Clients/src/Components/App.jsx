import React, { createContext, useReducer } from 'react';
import {Switch,Route} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About ";
import Contact from "./Contact";
import Login from "./Login";
import Registration from "./Registration";
import Error from "./Error";
import Logout from "./Logout";
import {initialState,reducer} from "../reducer/UseReducer";
const userContext=createContext();


const App = () => {
    const [state,dispatch]=useReducer(reducer,initialState);
    return (<>
    <userContext.Provider value={{state,dispatch}}>

    <Navbar/>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Registration" component={Registration} />
        <Route exact path="/Logout" component={Logout} />
        <Route component={Error}/> 



    </Switch>
    
    </userContext.Provider>
    </>
        
    )
}

export default App;
export {userContext};
