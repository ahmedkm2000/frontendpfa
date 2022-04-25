import React,{useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import CriterionService from "../services/CriterionService";
import expertService from "../services/ExpertService";
export default function FuzzyAHPForm(){
    const Styles = {
        width: '30%',
        height: '40%'
    };
    const navigate = useNavigate();
    var id_expert = localStorage.getItem("id_expert");
    const[criteria,setCriteria]=useState([]);
    const [form,setForm]=useState([]);
    useEffect(()=>{
       const id_project = localStorage.getItem("id_project");
       console.log(id_expert)
       displayCriteria(id_project)
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
      //  console.log(form)
    }

    function saveResults() {
        var results = [[],[],[],[],[],[],[],[]];
        var geometric_mean=[[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1]]
        var total = [0,0,0]
        var weight = [0,0,0,0]
        var sum = 0
        results.length =  criteria.length
        geometric_mean.length = criteria.length
        for(let i = 0;i<criteria.length;i++){
            for(let j = 0;j<criteria.length;j++){
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
            for(let k = 0 ; k < 3 ; k++){
           for(let j = 0 ; j < results.length ; j++){
                   geometric_mean[i][k] = geometric_mean[i][k] * results[i][j][k];
               }
            }
        }
        console.log(geometric_mean)
        for(let i = 0 ; i < geometric_mean.length ; i++){
            for(let j = 0 ; j < geometric_mean[i].length ; j++){
                geometric_mean[i][j]=Math.pow(geometric_mean[i][j],1/criteria.length)
            }
        }
        console.log(geometric_mean)
       for(let i = 0 ; i < geometric_mean.length ; i++){
                total[0] = total[0] + geometric_mean[i][0]
                total[1] = total[1] + geometric_mean[i][1]
                total[2] = total[2] + geometric_mean[i][2]
            }
        console.log(total)
        for(let i = 0 ; i < 3 ; i++) {
            total[i] = 1 / total[i]
        }
        total.reverse()

        for(let i = 0 ; i < geometric_mean.length ; i++){
            for(let j = 0 ; j < total.length ; j++){
                geometric_mean[i][j] = geometric_mean[i][j] * total[j]
            }
        }
        expertService.updateExpert(id_expert,{weight:JSON.stringify({geometric_mean})}).then((res)=>{
            console.log(res.data)
        })
        console.log(geometric_mean)
        navigate('/fuzzyTopsis')

      /*  for(let i = 0 ; i < geometric_mean.length ; i++){
            for(let j = 0 ; j < geometric_mean[i].length ; j++){
               weight[i] = weight[i] + geometric_mean[i][j]
            }
        }
        for(let i = 0 ; i < weight.length ; i++){
            weight[i] = weight[i] / 3
        }
       // console.log(weight)
        for(let i = 0 ; i < weight.length ; i++){
            sum = sum + weight[i]
        }
        for(let i = 0 ; i < weight.length ; i++){
            weight[i] = weight[i] / sum
        }
       // console.log(weight)
        for(let i = 0; i < criteria.length ; i++){
            criteria[i].weight = weight[i]
            CriterionService.updateCriterion(criteria[i].id,criteria[i]).then((res)=>{
               // console.log(criteria[i])
            })
        }*/

    }
    return(
        <div>
            <h1>Fuzzy AHP Method</h1>
            {criteria.map((criterio,i)=>{
                return(
                    <div>
                        <form key={criterio.id}>
                                {criteria.map((criterion,index)=>{
                                    if(criterion !== criterio && index >=i)
                                    return(
                                        <div key={criterion.id}>
                                            <label>how important is <b>{criterio.name}</b> comapred to <b>{criterion.name} ?</b></label>
                                            <select
                                            name={i+""+index}
                                            onChange={(e) => onChange(i,index, e)}
                                            >
                                                <option value="1">Equal Importance</option>
                                                <option value="3">Moderate Importance</option>
                                                <option value="5">Strong Importance</option>
                                                <option value="7">Very Strong Importance</option>
                                                <option value="9">Extreme Importance</option>
                                                <option value="1/3">Low Importance</option>
                                                <option value="1/5">Very Low Importance</option>
                                                <option value="1/7">Neglited Importance</option>
                                                <option value="1/9">Very Neglited Importance</option>

                                            </select>
                                            <hr/>
                                        </div>
                                    ) })}

                        </form>
                    </div>
                )
            })}
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
                    <td>Equal Importance</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td >Moderate Importance</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>Strong Importance</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Very Strong Importance</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>Extreme Importance</td>
                    <td>9</td>
                    </tr>
                <tr>
                    <td>Low Importance</td>
                    <td>1/3</td>
                </tr>
                <tr>
                    <td>Very Low Importance</td>
                    <td>1/5</td>
                </tr>
                <tr>
                    <td>Neglicted Importance</td>
                    <td>1/7</td>
                </tr>
                <tr>
                    <td>Very Neglicted Importance</td>
                    <td>1/9</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}