import React, {useState} from "react";
import {useEffect} from "react";
import Header from "./Header";
export default function CriteriaForm(props) {
    const  [values,setValues] = useState(props.values)
    const [form, setForm] = useState([{
        name: "",
        description: "",
        value:"",
        weight:"",
        type:""
    }]);
   useEffect(async ()=>{
       localStorage.setItem("criteria",JSON.stringify(form));
   },[form])
    const handleAddCriterion = (e) => {
        e.preventDefault();
        console.log(values)
        const inputState = {
            name: "",
            description: "",
            value:"",
            weight:"",
            type:""
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
            <h2>Criteria</h2>
            <form  onSubmit={props.nextStep}>
                {form.map((item, index) => (
                    <div className="container border border-secondary p-3 " key={`item-${index}`}>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                required
                                name="name"
                                placeholder="Enter the criterion"
                                value={item.name}
                                onChange={(e) => onChange(index, e)}
                            />
                        </div>

                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                required
                                name="description"
                                placeholder="Enter the description"
                                value={item.description}
                                onChange={(e) => onChange(index, e)}
                            />
                        </div>
                        <div className="col">
                        <select
                            name="type"
                            className="form-control"
                            required
                            value={item.type}
                            onChange={(e) => onChange(index, e)}
                        >
                            <option value="benefit">Benefit </option>
                            <option value="cost">Cost </option>
                        </select>
                        </div>

                        <button
                            className="btn btn-warning"
                            onClick={(e) => handleRemoveField(e, index)}
                        >
                            -
                        </button>
                    </div>
                ))}

                <button className="btn btn-primary mt-2" onClick={handleAddCriterion}>
                    +
                </button>
                <button type="submit" className="btn btn-primary">Continue</button>
                <button  className="btn btn-dark" onClick={props.prevStep}>Back</button>
            </form>
        </div>
        </div>
    );
}

