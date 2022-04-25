import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "./auth";
export const RequireAuth = ({children}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(()=>{
      if(!auth.user){
          navigate('/login')
      }
  },[])
  return children
}
