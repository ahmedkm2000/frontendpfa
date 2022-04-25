import React from 'react'
import { Document, Packer, Paragraph, TextRun } from 'docx';
import {useEffect,useState} from "react";
import { saveAs } from "file-saver";
import ProjectService from "../services/ProjectService";
import BarChart from "./BarChart";
export default function DetailCalcul(){
    function saveDocumentToFile(doc, fileName) {
    const packer = new Packer();
    const mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        packer.toBlob(doc).then(blob => {
        const docblob = blob.slice(0, blob.size, mimeType);
        saveAs(docblob, fileName);
    });
    }
    function generateWordDocument(event) {
    event.preventDefault();
    let doc = new Document();
    saveDocumentToFile(doc, "New Document.docx");
}
    const [projectInfo,setprojectInfo] = useState([]);
    var minWeights = JSON.parse(localStorage.getItem("minWeights")).min;
    var meanWeights = JSON.parse(localStorage.getItem("meanWeights")).mean;
    var maxWeights = JSON.parse(localStorage.getItem("maxWeights")).max;
    var minAlternatives = JSON.parse(localStorage.getItem("minAlternatives")).min;
    var meanAlternatives = JSON.parse(localStorage.getItem("meanAlternatives")).mean;
    var maxAlternatives = JSON.parse(localStorage.getItem("maxAlternatives")).max;
    var normalizedMatrix = JSON.parse(localStorage.getItem("normalizedMatrix")).matrix;
    var WeightedNormalizedMatrix = JSON.parse(localStorage.getItem("weightedNormalizedMatrix")).matrix;
    var FNIS = JSON.parse(localStorage.getItem("FNIS")).matrix;
    var FPIS = JSON.parse(localStorage.getItem("FPIS")).matrix;
    var DistanceFNIS = JSON.parse(localStorage.getItem("negativeDistance")).matrix;
    var DistanceFPIS = JSON.parse(localStorage.getItem("positiveDistance")).matrix;
    var cii = JSON.parse(localStorage.getItem("cii")).matrix;
    var ranks = JSON.parse(localStorage.getItem("ranks")).matrix;
    const criteriaLength = projectInfo.criteria!=undefined ? projectInfo.criteria.length:"";
    const alternativesLength = projectInfo.alternatives!=undefined ? projectInfo.alternatives.length:"";
    const expertsLenght = projectInfo.experts!=undefined ? projectInfo.experts.length:"";
    const state = {
        labels:projectInfo.alternatives!=undefined ?projectInfo.alternatives.map((alternative)=>{
            return(alternative.name)
        }):"",
        datasets: [
            {
                label: 'Cii',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: cii
            }
        ]
    }
    useEffect(() =>{
        const id = localStorage.getItem("id_project");
        ProjectService.getProjectById(id).then((res)=>{
            setprojectInfo(res.data);
        })
    },[])
    return(
        <div>
            <div className="App">
                <button onClick={generateWordDocument}>Generate Word Document</button>
            </div>
            <div className="card">
                <div className="card-header">
                   Project Info
                </div>
                <div className="card-body">
                    <p className="card-text">project Name: <b>{projectInfo.name}</b></p>
                    <p className="card-text">number of criteria: <b>{criteriaLength}</b></p>
                    <p className="card-text">number of alternatives: <b>{alternativesLength}</b></p>
                    <p className="card-text">number of experts: <b>{expertsLenght}</b></p>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                   Result
                </div>
                <div className="card-body">
                  <p>Fuzzy TOPSIS proposed by Hwang and Yoon in 1981 is a popular and widely used method for multi-criteria decision making (MCDM) used to rank the alternative in a fuzzy environment.</p>
                   <h6>The Steps of the Fuzzy TOPSIS Method :</h6>
                    <h6>Step 1: Create a decision matrix</h6>
                    <p>In this study there are {criteriaLength} criteria and {alternativesLength} alternatives that are ranked based on FUZZY TOPSIS method. The table below shows the type of criterion and weight assigned to each criterion.</p>
                    <h6>Characteristics of Criteria</h6>
                    <table className="table table-bordered" >
                        <thead>
                        <tr>
                            <th>name</th>
                            <th>type</th>
                            <th>weight</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectInfo.criteria!=undefined ?projectInfo.criteria.map((criterion,index)=>{
                            return(
                            <tr>
                                <td>{criterion.name}</td>
                                <td>{criterion.type}</td>
                                <td>({minWeights[index]} , {meanWeights[index]} , {maxWeights[index]})</td>
                            </tr>
                            )
                        }):""}
                        </tbody>
                    </table>
                    <p>The alternatives in terms of various criteria are evaluated and the results of the decision matrix are shown as follows. Note that if multiple experts participate in the evaluation, then the matrix below represents the arithmetic mean of all experts.</p>
                    <h6>Decision Matrix</h6>
                    <table className="table table-bordered" >
                        <thead>
                        <tr>
                            <th></th>
                            {projectInfo.criteria!=undefined ?projectInfo.criteria.map((criterio,i)=>{
                                return(
                                    <th>{criterio.name}</th>
                                )}):""}
                        </tr>
                        </thead>
                        <tbody>
                        {projectInfo.alternatives!=undefined ?projectInfo.alternatives.map((alternative,index)=>{
                            return(
                                <tr>
                                    <th>{alternative.name}</th>
                                    {projectInfo.criteria.map((criterion,i)=>{
                                        return(
                                            <td>({minAlternatives[i+index*criteriaLength]} , {meanAlternatives[i+index*criteriaLength]} , {maxAlternatives[i+index*criteriaLength]})</td>
                                        )
                                    })}
                                </tr>
                            )}):""}
                        </tbody>
                    </table>
                    <h6>Step 2: Create the normalized decision matrix</h6>
                    <p>Based on the positive and negative ideal solutions, a normalized decision matrix can be calculated by the following relation:</p>
                    <table className="table table-bordered" >
                        <thead>
                        <tr>
                            <th></th>
                            {projectInfo.criteria!=undefined ?projectInfo.criteria.map((criterio,i)=>{
                                return(
                                    <th>{criterio.name}</th>
                                )}):""}
                        </tr>
                        </thead>
                        <tbody>
                        {projectInfo.alternatives!=undefined ?projectInfo.alternatives.map((alternative,index)=>{
                            return(
                                <tr>
                                    <th>{alternative.name}</th>
                                    {projectInfo.criteria.map((criterion,i)=>{
                                        return(
                                            <td>({normalizedMatrix[i+index*criteriaLength][0].toFixed(2)} , {normalizedMatrix[i+index*criteriaLength][1].toFixed(2)} , {normalizedMatrix[i+index*criteriaLength][2].toFixed(2)})</td>
                                        )
                                    })}
                                </tr>
                            )}):""}
                        </tbody>
                    </table>
                    <h6>Step 3: Create the weighted normalized decision matrix</h6>
                    <p>Considering the different weights of each criterion, the weighted normalized decision matrix can be calculated by multiplying the weight of each criterion in the normalized fuzzy decision matrix, according to the following formula.</p>
                    <table className="table table-bordered" >
                        <thead>
                        <tr>
                            <th></th>
                            {projectInfo.criteria!=undefined ?projectInfo.criteria.map((criterio,i)=>{
                                return(
                                    <th>{criterio.name}</th>
                                )}):""}
                        </tr>
                        </thead>
                        <tbody>
                        {projectInfo.alternatives!=undefined ?projectInfo.alternatives.map((alternative,index)=>{
                            return(
                                <tr>
                                    <th>{alternative.name}</th>
                                    {projectInfo.criteria.map((criterion,i)=>{
                                        return(
                                            <td>({WeightedNormalizedMatrix[i+index*criteriaLength][0].toFixed(2)} , {WeightedNormalizedMatrix[i+index*criteriaLength][1].toFixed(2)} , {WeightedNormalizedMatrix[i+index*criteriaLength][2].toFixed(2)})</td>
                                        )
                                    })}
                                </tr>
                            )}):""}
                        </tbody>
                    </table>
                    <h6>Step 4: Determine the fuzzy positive ideal solution (FPIS, A*) and the fuzzy negative ideal solution (  )</h6>
                    <p>The positive and negative ideal solutions are shown in the table below.</p>
                    <table className="table table-bordered" >
                        <thead>
                        <tr>
                            <th></th>
                            <th>Positive ideal</th>
                            <th>Negative ideal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectInfo.criteria!=undefined ?projectInfo.criteria.map((criterion,index)=>{
                            return(
                                <tr>
                                    <th>{criterion.name}</th>
                                    <td>({FPIS[index][0].toFixed(2)} , {FPIS[index][1].toFixed(2)} , {FPIS[index][2].toFixed(2)})</td>
                                    <td>({FNIS[index][0].toFixed(2)} , {FNIS[index][1].toFixed(2)} , {FNIS[index][2].toFixed(2)})</td>

                                </tr>
                            )}):""}
                        </tbody>
                    </table>
                    <h6>Step 5: Calculate the distance between each alternative and the fuzzy positive ideal solution  and the distance between each alternative and the fuzzy negative ideal solution</h6>
                    <p> The distance between each alternative and FPIS and the distance between each alternative and FNIS are respectively calculated as follows:</p>
                    <table className="table table-bordered" >
                        <thead>
                        <tr>
                            <th></th>
                            <th>Distance From Positive ideal</th>
                            <th>Distance From Negative ideal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectInfo.alternatives!=undefined ?projectInfo.alternatives.map((alternative,index)=>{
                            return(
                                <tr>
                                    <th>{alternative.name}</th>
                                    <td>{DistanceFPIS[index]}</td>
                                    <td>{DistanceFNIS[index]}</td>
                                </tr>
                            )}):""}
                        </tbody>
                    </table>
                    <h6>Step 6: Calculate the closeness coefficient and rank the alternatives</h6>
                    <p>The closeness coefficient of each alternative can be calculated as follows :</p>
                    <p>The best alternative is closest to the FPIS and farthest to the FNIS. The closeness coefficient of each alternative and the ranking order of it are shown in the table below.</p>
                    <table className="table table-bordered" >
                        <thead>
                        <tr>
                            <th></th>
                            <th>Ci</th>
                            <th>Rank</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectInfo.alternatives!=undefined ?projectInfo.alternatives.map((alternative,index)=>{
                            return(
                                <tr>
                                    <th>{alternative.name}</th>
                                    <td>{cii[index]}</td>
                                    <td>{ranks[index]}</td>
                                </tr>
                            )}):""}
                        </tbody>
                    </table>
                    <p>The following graph shows the closeness coefficient of each alternative.</p>
                     <BarChart state={state}/>
                </div>
            </div>
        </div>
    )
}