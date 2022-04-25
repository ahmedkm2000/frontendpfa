import React from 'react';
import {useAuth} from "./auth";
import Header from "./Header";
export default function ProjectForm(props){
    const { handleChange,values } = props;
    const auth = useAuth()
    return(
        <div>
            <Header/>
        <div className="container" style={{maxWidth:"500px",maxHeight:"800px",marginTop: "100px"}}>
            <h2>project</h2>
            <form onSubmit={props.nextStep}>
            <div className="container border border-secondary p-3">
                    <div className="col-sm-8">
                        <label className="form-label">Enter the name of the project</label>
                        <input type="text" className="form-control"
                               required
                               name="name"
                               onChange={handleChange}
                               value={values.name}
                        />
                    </div>
                    <div className="col-sm-8">
                        <label className="form-label">Enter the description of the project</label>
                        <textarea type="text" className="form-control"
                               required
                               name="description"
                               onChange={handleChange}
                               value={values.description}
                        />
                    </div>
                    <button type="submit"  className="btn btn-primary" >Continue</button>
            </div>
            </form>
        </div>
        </div>
    )
}