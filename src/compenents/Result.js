import React, {useEffect , useState} from 'react';
import ProjectService from "../services/ProjectService";
import alternativeService from "../services/AlternativeService";
import {useNavigate} from "react-router-dom";
export default function Result(){
    var min=[];
    var max=[];
    var mean=[];
    var minCriteria=[];
    var maxCriteria=[];
    var meanCriteria=[];
    var minAlternatives=[];
    var maxAlternatives=[];
    var meanAlternatives=[];
    var FPISMatrix =[]
    var FNISMatrix = []
    var FPISMatrix2 =[]
    var FNISMatrix2 = []
    var sommeFPIS=[]
    var sommeFNIS=[]
    var cii=[]
    var indexes = []
    const navigate = useNavigate();
    const [projects,setProjects] = useState([]);
    const [alternatives,setAlternatives] = useState([]);
    const [project,setProject] = useState();
    const id_user = localStorage.getItem("id_user")
    useEffect(()=>{
        ProjectService.getAllProjects().then((res)=> {
            setProjects(res.data)
        },[])
    })
     function seeResults(id){
        const results=[];
        const alternativesMatrix=[];
        localStorage.setItem("id_project",id);
       ProjectService.getProjectById(id).then((res)=>{
          var criterialength = res.data.criteria.length
               var alternativesLength = res.data.alternatives.length
         // add the weight matrix of each expert to the results table
         for(var i = 0 ; i<res.data.experts.length ; i++){
             results.push(JSON.parse(res.data.experts[i].weight).geometric_mean)
             alternativesMatrix.push(JSON.parse(res.data.experts[i].alternativeMatrix).results)
         }
         for(var i = 0 ; i<results.length ; i++){
             var length = results.length
            // Initialize min,max,mean tables
             for(let k = 0 ; k < results[i].length ; k++){
                 min.push(9)
                 mean.push(0)
                 max.push(0)
              }
              for(var j = 0 ; j<results[i].length ; j++){
                  min.length = results[i].length
                  max.length=results[i].length
                  mean.length=results[i].length
                  if(results[i][j][0] < min[j]){
                      min[j] = results[i][j][0] // compare between each expert matrix and choose the min elements
                  }
                  if(results[i][j][2] > max[j]){
                      max[j] = results[i][j][2] // compare between each expert matrix and choose the max elements
                  }
                  mean[j] = mean[j] + results[i][j][1]
              }
          }

          for(let i = 0;i<mean.length;i++){
              mean[i] = mean[i]/length
          }
          var weights = [min,mean,max]
              let Tanspose=[];
              for(let i=0; i < weights[0].length;i++){
                    Tanspose.push([])
                  for(let j=0;j<weights.length;j++){
                      Tanspose[i].push(weights[j][i])
                  }
              }
               localStorage.setItem("minWeights",JSON.stringify({min:min}));
               localStorage.setItem("meanWeights",JSON.stringify({mean:mean}));
               localStorage.setItem("maxWeights",JSON.stringify({max:max}));
       // Tanspose.length=weights[0].length
          for(var i = 0 ; i < alternativesMatrix.length ; i++){
              var lengthAlternatives = alternativesMatrix.length
              // Initialize min,max,mean tables
              for(var j = 0 ; j < alternativesMatrix[i].length ; j++){
                  for(var k = 0 ; k < alternativesMatrix[i][j].length; k++){
                      if(i==0){
                      minAlternatives.push(9)
                      meanAlternatives.push(0)
                      maxAlternatives.push(0)
                      }
                     if(alternativesMatrix[i][j][k][0] < minAlternatives[j * alternativesMatrix[i][j].length + k]){
                         minAlternatives[j * alternativesMatrix[i][j].length + k] = alternativesMatrix[i][j][k][0]
                     }
                     if(alternativesMatrix[i][j][k][2] > maxAlternatives[j * alternativesMatrix[i][j].length + k]){
                          maxAlternatives[j * alternativesMatrix[i][j].length + k] = alternativesMatrix[i][j][k][2]
                      }
                     meanAlternatives[j * alternativesMatrix[i][j].length + k] += alternativesMatrix[i][j][k][1]
                  }
              }
          }
              for(let i = 0;i<meanAlternatives.length;i++){
                  meanAlternatives[i] = meanAlternatives[i]/lengthAlternatives
              }
               localStorage.setItem("minAlternatives",JSON.stringify({min:minAlternatives}));
               localStorage.setItem("meanAlternatives",JSON.stringify({mean:meanAlternatives}));
               localStorage.setItem("maxAlternatives",JSON.stringify({max:maxAlternatives}));
              for(let i = 0 ; i < criterialength;i++){
                  for(let j = 0 ; j < alternativesLength ; j++) {
                      minCriteria.push(minAlternatives[i+j*criterialength])
                      maxCriteria.push(maxAlternatives[i+j*criterialength])
                      meanCriteria.push(meanAlternatives[i+j*criterialength])
                  }
              }
               var alternativesWeight1 = [minCriteria,meanCriteria,maxCriteria]
              let TansposeAlternatives1=[];
               for(let i = 0; i < alternativesWeight1[0].length;i++){
                   TansposeAlternatives1.push([])
                   for(let j=0;j<alternativesWeight1.length;j++){
                       TansposeAlternatives1[i].push(alternativesWeight1[j][i])
                   }
               }
              for(let  i = 0 ; i < res.data.criteria.length ; i++ ){
                 if(res.data.criteria[i].type === "benefit"){
                     var cj = 0
                     for(let j = i * alternativesLength ; j < i * alternativesLength + alternativesLength ; j++){
                         if(maxCriteria[j] > cj){
                             cj = maxCriteria[j];
                         }
                     }
                     for(let k = i * alternativesLength ; k < i * alternativesLength + alternativesLength ; k++){
                         for(let p = 0 ; p < 3 ; p ++){
                             TansposeAlternatives1[k][p] = TansposeAlternatives1[k][p]/cj;
                         }
                     }
                     cj = 0
                 }
                  if(res.data.criteria[i].type === "cost"){
                      var aj = 9
                      for(let j = i * alternativesLength;j < i * alternativesLength + alternativesLength ; j++){
                          if(minCriteria[j] < aj){
                              aj = minCriteria[j];
                          }
                      }
                      for(let k = i * alternativesLength ; k < i * alternativesLength + alternativesLength ; k++){
                          for(let p = 0 ; p < 3 ; p ++){
                              TansposeAlternatives1[k][p] = aj / TansposeAlternatives1[k][p];
                          }
                      }
                      aj = 9
                  }

              }
              localStorage.setItem("normalizedMatrix",JSON.stringify({matrix:TansposeAlternatives1}))
              for(let i = 0 ; i < Tanspose.length ; i ++){
                  for(let j = i * alternativesLength ; j < i * alternativesLength + alternativesLength ; j++){
                      for(let p = 0 ; p < 3 ; p ++){
                          TansposeAlternatives1[j][p] = TansposeAlternatives1[j][p] * Tanspose[i][p]
                      }
                  }
              }
               localStorage.setItem("weightedNormalizedMatrix",JSON.stringify({matrix:TansposeAlternatives1}))

           for(let  i = 0 ; i < res.data.criteria.length ; i++ ){
               var FPIS =[0,0,0];
               var FNIS =[9,9,9]
               for(let j = i * alternativesLength ; j < i * alternativesLength + alternativesLength ; j++){
                   if(TansposeAlternatives1[j][2] > FPIS[2]){
                       FPIS = TansposeAlternatives1[j]
                   }else if (TansposeAlternatives1[j][2] == FPIS[2]){
                       if(TansposeAlternatives1[j][1] > FPIS[1]){
                           FPIS = TansposeAlternatives1[j]
                       }else if(TansposeAlternatives1[j][1] == FPIS[1]){
                           if(TansposeAlternatives1[j][0] > FPIS[0]){
                               FPIS = TansposeAlternatives1[j]
                           }
                       }
                   }
                   if(TansposeAlternatives1[j][0] <  FNIS[0]){
                       FNIS = TansposeAlternatives1[j]
                   }else if (TansposeAlternatives1[j][0] ==  FNIS[0]){
                       if(TansposeAlternatives1[j][1] <  FNIS[1]){
                           FNIS = TansposeAlternatives1[j]
                       }else if(TansposeAlternatives1[j][1] ==  FNIS[1]){
                           if(TansposeAlternatives1[j][2] <  FNIS[2]){
                               FNIS = TansposeAlternatives1[j]
                           }
                       }
                   }
                   }
               FNISMatrix.push(FNIS)
               FPISMatrix.push(FPIS)
               }
               localStorage.setItem("FNIS",JSON.stringify({matrix:FNISMatrix}))
               localStorage.setItem("FPIS",JSON.stringify({matrix:FPISMatrix}))
           for(let  i = 0 ; i < FPISMatrix.length ; i++ ){
               for(let j = i * alternativesLength ; j < i * alternativesLength + alternativesLength ; j++){
                   FPISMatrix2[j] = (Math.pow((1/3)*(Math.pow(TansposeAlternatives1[j][0]-FPISMatrix[i][0],2)+Math.pow(TansposeAlternatives1[j][1]-FPISMatrix[i][1],2)+Math.pow(TansposeAlternatives1[j][2]-FPISMatrix[i][2],2)),1/2))
                   FNISMatrix2[j] = (Math.pow((1/3)*(Math.pow(TansposeAlternatives1[j][0]-FNISMatrix[i][0],2)+Math.pow(TansposeAlternatives1[j][1]-FNISMatrix[i][1],2)+Math.pow(TansposeAlternatives1[j][2]-FNISMatrix[i][2],2)),1/2))

               }
           }

           for(let i = 0 ; i < alternativesLength;i++){
               sommeFPIS.push(0)
               for(let j = 0 ; j < criterialength ; j++){
                   sommeFPIS[i] += FPISMatrix2[i + j * alternativesLength]
               }
           }
           for(let i = 0 ; i < alternativesLength;i++){
                   sommeFNIS.push(0)
                   for(let j = 0 ; j < criterialength ; j++){
                       sommeFNIS[i] += FNISMatrix2[i + j * alternativesLength]
                   }
               }
               localStorage.setItem("positiveDistance",JSON.stringify({matrix:sommeFPIS}))
               localStorage.setItem("negativeDistance",JSON.stringify({matrix:sommeFNIS}))
               for(let  i = 0 ; i <sommeFPIS.length;i++){
                   cii[i] = (sommeFNIS[i]) / (sommeFPIS[i]+sommeFNIS[i])
               }
               for(let i = 0 ; i < cii.length ; i++){
                   indexes.push(i+1)
               }
               var cii2 = []
           for(let i = 0 ; i < cii.length ; i ++){
               cii2.push(cii[i])
           }
             for(let i = 0 ; i < cii.length ; i ++){
                  for(let j = 0 ; j < cii.length ; j ++){
                   if(cii[i + j] > cii[i]){
                       let c = cii[i]
                       cii[i] = cii[i+j]
                       cii[i + j] = c
                       let d = indexes[i]
                       indexes[i] = indexes[i+j]
                       indexes[i+j] = d
                   }
               }}
             var ranks = []
           for(let i = 0 ; i < cii2.length ; i ++){
               for(let j = 0 ; j < cii.length ; j ++){
                   if(cii2[i] == cii[j]){
                       ranks.push(j+1)
                   }
               }}
               localStorage.setItem("cii",JSON.stringify({matrix:cii2}))
               localStorage.setItem("ranks",JSON.stringify({matrix:ranks}))
               for (let i = 0 ; i<res.data.alternatives.length ; i++){
                   alternativeService.updateAlternativeByRankAndCii(res.data.alternatives[i].id,{cii:cii2[i],rank:ranks[i]}).then((res)=>{
                   })
               }
               navigate('/steps')
      }

      )}
    return(
        <div>
            <h1>results</h1>
            {projects.map((project)=>{
                if(project.id_user == id_user){
                    return(
                        <button key={project.id} onClick={()=>seeResults(project.id)}>{project.name}</button>

                    )
                }
            })}

        </div>
    )
}