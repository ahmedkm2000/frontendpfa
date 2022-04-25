import React, {useEffect} from 'react';
import {useState} from "react";
import CriteriaForm from "./CriteriaForm";
import AlternativeForm from "./AlternativeForm";
import ProjectForm from "./ProjectForm";
import Success from "./Success";
import ExpertForm from "./ExpertForm";
export default function Home(){
    useEffect(()=>{
        document.body.style.backgroundColor = 'hsl(100, 100%, 100%)'
    },[])
    const [step,setStep]=useState(1);
    const [formData,setFormData] = useState({
        name:"",
        description:"",
        id_user:0,
        criteria:[{
            name:"",
            description:"",
            value:"",
            weight:""
        }],
        alternatives:[{
            name:"",
            latitude:"",
            longitude:""
        }],
        experts:[{
            firstName: "",
            lastName: "",
            email:"",
        }]

    })
    function nextStep (){
        setStep(prevState => prevState + 1)
    };

    // Go back to prev step
    function prevStep (){
       setStep(prevState => prevState - 1)
    };

    // Handle fields change
    function handleChange(event){
        setFormData(prevState => {
                return{...prevState,
                    [event.target.name]:event.target.value
                }
            }
        )
    }

    function handle(criteria) {
        setFormData(prevState => {
                return{...prevState,
                        criteria:criteria
                }
            }
        )
    }

    switch (step) {
        case 1:
            return (
                <ProjectForm
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={formData}
                />
            );
        case 2:
            return (
                <CriteriaForm
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    values={formData}
                />
            );
        case 3:
            return (
                <AlternativeForm
                    nextStep={nextStep}
                    prevStep={prevStep}
                    values={formData}
                />
            );
        case 4:
            return (
                <ExpertForm
                    nextStep={nextStep}
                    prevStep={prevStep}
                    values={formData}
                />
            );
        case 5:
            return (
                <Success
                    nextStep={nextStep}
                    prevStep={prevStep}
                    values={formData}
                />
            );
        default:
            (console.log('This is a multi-step form built with React.'))
    }


}