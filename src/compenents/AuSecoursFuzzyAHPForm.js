import React,{useState,useEffect} from 'react';
import ProjectService from "../services/ProjectService";
import CriterionService from "../services/CriterionService";
import {Component} from "react";
import {MapContainer} from "./MapContainer";
export default function FuzzyAHPForm(){
    const [projects,setProjects] = useState([]);
    const[criteria,setCriteria]=useState([]);
    const [form,setForm]=useState([]);
    useEffect(()=>{
        ProjectService.getAllProjects().then((res=>{
            setProjects(res.data);
        }))
    },[form])
    function displayCriteria(id) {
        CriterionService.getAllCriteriaByProject(id).then((res)=>{
           setCriteria(res.data)

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

    function saveResults() {
        var results = [[],[],[],[],[],[],[],[]];
        var geometric_mean=[[1,1,1],[1,1,1],[1,1,1],[1,1,1]]
        var total = [0,0,0]
        var weight = [0,0,0,0]
        var sum = 0
        results.length =  criteria.length
        for(let i = 0;i<results.length;i++){
            for(let j = 0;j<results.length;j++){
                if(i===j){
                 results[i][j]=[1,1,1];
                }
            }
        }
        for(var item in form){
            var row = parseInt(item[0]);
            var col = parseInt(item[1]);
            if(parseInt(form[item])===1 || parseInt(form[item])===9){
                results[row][col]=[parseInt(form[item]),parseInt(form[item]),parseInt(form[item])];
                results[col][row] =[1/parseInt(form[item]),1/parseInt(form[item]),1/parseInt(form[item])];
            }else{
                results[row][col]= [parseInt(form[item])-1,parseInt(form[item]),parseInt(form[item])+1]
                results[col][row]= [1/(parseInt(form[item])+1),1/parseInt(form[item]),1/(parseInt(form[item])-1)];
            }
        }
        console.log(results)
        for(let i = 0 ; i < results.length ; i++){
            for(let k = 0 ; k < results.length-1 ; k++){
           for(let j = 0 ; j < results.length ; j++){
                   geometric_mean[i][k] = geometric_mean[i][k] * results[i][j][k];
               }
            }
        }
        for(let i = 0 ; i < 3 ; i++){
            for(let j = 0 ; j < geometric_mean[i].length ; j++){
                geometric_mean[i][j]=Math.pow(geometric_mean[i][j],1/geometric_mean.length)
            }
        }

       for(let i = 0 ; i < 3 ; i++){
            for(let j = 0 ; j < geometric_mean[i].length ; j++){
                total[i] = total[i] + geometric_mean[j][i]
            }
        }
        for(let i = 0 ; i < 3 ; i++) {
            total[i] = 1 / total[i]
        }
        total.reverse()

        for(let i = 0 ; i < geometric_mean.length ; i++){
            for(let j = 0 ; j < total.length ; j++){
                geometric_mean[i][j] = geometric_mean[i][j] * total[j]
            }
        }

        for(let i = 0 ; i < geometric_mean.length ; i++){
            for(let j = 0 ; j < geometric_mean[i].length ; j++){
               weight[i] = weight[i] + geometric_mean[i][j]
            }
        }
        for(let i = 0 ; i < weight.length ; i++){
            weight[i] = weight[i] / 3
        }
        console.log(weight)
        for(let i = 0 ; i < weight.length ; i++){
            sum = sum + weight[i]
        }
        for(let i = 0 ; i < weight.length ; i++){
            weight[i] = weight[i] / sum
        }
        console.log(weight)
        for(let i = 0; i < criteria.length ; i++){
            criteria[i].weight = weight[i]
            CriterionService.updateCriterion(criteria[i].id,criteria[i]).then((res)=>{
                console.log(criteria[i])
            })
        }

    }
    return(
        <div>
            <h1>Fuzzy AHP Method</h1>
            {projects.map(project=>{
                return(
                <button key={project.id}  onClick={()=> displayCriteria(project.id)}> {project.name} </button>
                )})}
            {criteria.map((criterio,i)=>{
                return(
                    <div>
                        <form key={criterio.id}>
                        <h2>{criterio.name}</h2>
                                {criteria.map((criterion,index)=>{
                                   // if(criterion !== criterio && index >=i)
                                    if(criterion !== criterio)
                                    return(
                                        <div key={criterion.id}>
                                            <label>{criterion.name}</label>
                                            <select
                                            name={i+""+index}
                                            onChange={(e) => onChange(i,index, e)}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                            </select>
                                        </div>
                                    ) })}
                        <hr/>
                        </form>
                    </div>

                )
            })}
            <button  className="btn btn-primary" onClick={saveResults}>Save</button>
        </div>
    )
}