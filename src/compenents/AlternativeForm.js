import React, {useEffect, useState} from "react";
import Header from "./Header";
export default function AlternativeForm(props){
    const [form, setForm] = useState([{
    }]);
    useEffect(async ()=>{
        localStorage.setItem("alternatives",JSON.stringify(form));
    },[form])
    const handleAddAlternative = (e) => {
        e.preventDefault();
        const inputState = {
            name: "",
            latitude: "",
            longitude:""
        };
        setForm((prev) => [...prev, inputState]);
    };
    const onChange = (index, event) => {
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
        });
    };
    const handleRemoveField = (e, index) => {
        e.preventDefault();
        setForm((prev) => prev.filter((item) => item !== prev[index]));
    };
    return (
        <div>
        <div className="container" style={{maxWidth:"500px",marginTop: "100px"}}>
            <h2>Alternatives</h2>
            <form onSubmit={props.nextStep}>
                {form.map((item, index) => (
                    <div className="container border border-secondary p-3 " key={`item-${index}`}>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                required
                                placeholder="Enter the alternative"
                                value={item.name}
                                onChange={(e) => onChange(index, e)}
                            />
                        </div>

                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="latitude"
                                required
                                placeholder="Enter the latitude"
                                value={item.latitude}
                                onChange={(e) => onChange(index, e)}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="longitude"
                                required
                                placeholder="Enter the longitude"
                                value={item.longitude}
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

                <button className="btn btn-primary mt-2" onClick={handleAddAlternative}>
                    +
                </button>
                <button  type="submit" className="btn btn-primary" >Continue</button>
                <button  className="btn btn-dark" onClick={props.prevStep}>Back</button>
            </form>
        </div>
        </div>
    );
}