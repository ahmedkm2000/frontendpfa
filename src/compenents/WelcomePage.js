import React from 'react';
import {useAuth} from "./auth";
import Header from "./Header";
export default function WelcomePage(){
    const auth = useAuth()
    return(
        <div>
            <Header/>
            <div>
            <h1>Welcome {auth.user}</h1>
            </div>
        </div>
    )
}