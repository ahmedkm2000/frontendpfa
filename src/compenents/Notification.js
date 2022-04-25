import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function Notification(props){
    if(props.type=="succes"){
   const notifySuccess = ()=>{
        toast.success('successful', { position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
    }
    }else{
     const notifyError = ()=>{
    toast.warning('Danger', { position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
    }
    }

}
export default Notification;