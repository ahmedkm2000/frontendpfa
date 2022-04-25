import React, {useEffect, useState} from 'react'
import UserService from "../services/UserService";
export default function RegistrationForm(){
    const Styles = {
        color: 'hsl(217, 10%, 50.8%)'
    };
    const Styles2={
        backgroundColor:'hsl(0, 0%, 96%)'
    }
    useEffect(()=>{
        document.body.style.backgroundColor = 'hsl(0, 0%, 96%)'
    },[])
    const [FormData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        role:"user"
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
    function saveUser(e) {
        e.preventDefault()
        UserService.register(FormData).then((res)=>{
            console.log("success")
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
                                        <form onSubmit={saveUser}>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" className="form-control" required
                                                        name="firstName" onChange={handleChange} value={FormData.firstName}
                                                        />
                                                        <label className="form-label" >First name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text"  className="form-control"
                                                        name="lastName" onChange={handleChange} value={FormData.lastName}
                                                               required
                                                        />
                                                        <label className="form-label" >Last name</label>
                                                    </div>
                                                </div>
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
                                                Sign up
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