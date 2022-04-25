import React, {useState} from "react";
import {useEffect} from "react";
import Header from "./Header";
export default function ExpertForm(props) {
    const  [values,setValues] = useState(props.values)
    const [form, setForm] = useState([{
        firstName: "",
        lastName: "",
        email:"",
    }]);
    useEffect(async ()=>{
        localStorage.setItem("experts",JSON.stringify(form));
    },[form])
    const handleAddExpert = (e) => {
        e.preventDefault();
        console.log(values)
        const inputState = {
            firstName: "",
            lastName: "",
            email:"",
        };
        setForm((prev) => [...prev, inputState]);
    };
    const onChange =  (index, event) => {
        event.preventDefault();
        event.persist();
        setForm((prev) => {
                return prev.map((item, i) => {
                    if (i !== index) {

                        return item;
                    }
                    return {
                        ...item,
                        [event.target.name]: event.target.value,

                    };
                });
            }
        );
    };
    const handleRemoveField = (e, index) => {
        e.preventDefault();
        setForm((prev) => prev.filter((item) => item !== prev[index]));
    };
    return (
        <div>
            <Header/>
        <div className="container" style={{maxWidth:"500px",marginTop: "100px"}}>
            <h2>Experts</h2>
            <form  onSubmit={props.nextStep}>
                {form.map((item, index) => (
                    <div className="container border border-secondary p-3 " key={`item-${index}`}>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                required
                                name="firstName"
                                placeholder="Enter the fist name"
                                value={item.firstName}
                                onChange={(e) => onChange(index, e)}
                            />
                        </div>

                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                required
                                name="lastName"
                                placeholder="Enter the last name"
                                value={item.lastName}
                                onChange={(e) => onChange(index, e)}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                required
                                name="email"
                                placeholder="Enter the email"
                                value={item.email}
                                onChange={(e) => onChange(index, e)}
                            />
                        </div>

                        <button
                            className="btn btn-warning"
                            onClick={(e) => handleRemoveField(e, index)}
                        >
                            -
                        </button>
                    </div>
                ))}

                <button className="btn btn-primary mt-2" onClick={handleAddExpert}>
                    +
                </button>
                <button type="submit" className="btn btn-primary">Continue</button>
                <button  className="btn btn-dark" onClick={props.prevStep}>Back</button>
            </form>
        </div>
        </div>
    );
}

