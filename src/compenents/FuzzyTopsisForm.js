import React, {useEffect, useState} from "react";
import ProjectService from "../services/ProjectService";
import expertService from "../services/ExpertService";
export default function FuzzyTopsisForm(){
    const Styles = {
        width: '30%',
        height: '40%'
    };
    const [alternatives,setAlternatives] = useState([]);
    const [criteria,setCriteria] = useState([]);
    const [form,setForm]=useState([]);
    const [status,setStatus] = useState()
    const id_expert = localStorage.getItem("id_expert");
    const id_project = localStorage.getItem("id_project");
    var results = [];
    for (let i = 0 ; i < alternatives.length ; i++){
        results.push([])
    }
    useEffect(()=>{
       displayCriteriaAndAlternatives(id_project)
    },[])
    console.log(criteria)
    console.log(alternatives)
    function displayCriteriaAndAlternatives(id){
        ProjectService.getProjectById(id).then((res)=>{
            setAlternatives(res.data.alternatives);
            setCriteria(res.data.criteria)
        })
    }
    const onChange =  (i,index, event) => {
        event.preventDefault();
        event.persist();
        setForm(prevState => {
                return{...prevState,
                    [event.target.name]:event.target.value
                }
            }
        )
         console.log(form)
    }
    function generateSelect(index,i){
        return(
            <select
                name={index+""+i}
                onChange={(e) => onChange(i,index, e)}
            >
                <option value="3">Low </option>
                <option value="1">Very Low </option>
                <option value="5">Average</option>
                <option value="7">High</option>
                <option value="9">Very High</option>
            </select>
        )
    }

    function saveResults() {
        for(var item in form){
            var row = parseInt(item[0]);
            var col = parseInt(item[1]);
            if(parseInt(form[item])===1){
                results[row][col]=[parseInt(form[item]),parseInt(form[item]),parseInt(form[item])+2];
            }else if(parseInt(form[item])===9){
                results[row][col]=[parseInt(form[item])-2,parseInt(form[item]),parseInt(form[item])];
            }else{
                results[row][col]= [parseInt(form[item])-2,parseInt(form[item]),parseInt(form[item])+2]
            }
        }
        console.log(id_expert)
        console.log(results)
        expertService.updateExpert(id_expert,{alternativeMatrix:JSON.stringify({results})}).then((res)=>{
            console.log(res.data)
        })
    }

    return(
        <div>
       <h1>FUZZY TOPSIS METHOD</h1>
            <table className="table table-bordered" >
                <thead>
                <tr>
                    <th>-----------</th>
            {criteria.map((criterio,i)=>{
                return(
                    <th>{criterio.name}</th>
                    )})
            }
                </tr>
                </thead>
                <tbody>
                {alternatives.map((alternative,index)=>{
                    return(
                        <tr>
                        <th>{alternative.name}</th>
                            {criteria.map((criterion,i)=>{
                                return(
                                <td key={i}>{generateSelect(index,i)}</td>
                                )
                            })}
                        </tr>
                    )})
                }
                </tbody>
            </table>
            <button  className="btn btn-primary" onClick={saveResults}>Save</button>
            <table className="table table-bordered" style={Styles}>
                <thead>
                <tr>
                    <th>Expression</th>
                    <th>Coefficient</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Very Low</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td >Low </td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>Average</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>High</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>Very High</td>
                    <td>9</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}