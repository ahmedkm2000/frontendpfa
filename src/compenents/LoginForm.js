import React, {useEffect, useState} from 'react'
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./auth";
import projectService from "../services/ProjectService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
export default function LoginForm(){
    const Styles = {
        color: 'hsl(217, 10%, 50.8%)'
    };
    const Styles2={
        backgroundColor:'hsl(0, 0%, 96%)',

    }
    useEffect(()=>{
        document.body.style.backgroundColor = 'hsl(0, 0%, 96%)'
    },[])
    const navigate = useNavigate();
    const auth = useAuth();
    const [FormData,setFormData] = useState({
        email:"",
        password:"",
    })
    function handleChange(event){
        event.preventDefault();
        event.persist();
        setFormData(prevState => {
                return{...prevState,
                    [event.target.name]:event.target.value
                }
            }
        )
    }
    function signin(e) {
        e.preventDefault()
        UserService.login(FormData).then((res)=>{
            if(res.data.role=="user") {
                localStorage.setItem("id_user",res.data.id)
                auth.login(res.data.firstName+" "+res.data.lastName)
                navigate('/home',{replace:true})
            }else if(res.data.role=="expert"){

                            projectService.getAllProjects().then((res1)=>{
                                for(var i = 0;i<res1.data.length;i++){
                                    for(var j = 0;j<res1.data[i].experts.length;j++){
                                        if(res1.data[i].experts[j].email==res.data.email){
                                            localStorage.setItem("id_expert",res1.data[i].experts[j].id)
                                            localStorage.setItem("id_project",res1.data[i].id)
                                            auth.login(res.data.firstName+" "+res.data.lastName)
                                            navigate('/fuzzyAHP',{replace:true})
                                        }
                                }}
                            })




            }
            else {
                toast.error('Danger', { position: toast.POSITION.TOP_CENTER, autoClose:15000})

            }

        })
    }
    return(
        <div>
            <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={Styles2}>
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="my-5 display-3 fw-bold ls-tight">
                                The best offer <br />
                                <span className="text-primary">for your business</span>
                            </h1>
                            <p style={Styles}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                                quibusdam tempora at cupiditate quis eum maiores libero
                                veritatis? Dicta facilis sint aliquid ipsum atque?
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <form onSubmit={signin}>
                                        <div className="row">

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" className="form-control" name="email"
                                                   onChange={handleChange}
                                                   value={FormData.email}
                                                   required
                                            />
                                            <label className="form-label" >Email address</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" className="form-control"
                                                   name="password" onChange={handleChange} value={FormData.password}
                                                   required

                                            />
                                            <label className="form-label" >Password</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block mb-4">
                                            Log In
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}