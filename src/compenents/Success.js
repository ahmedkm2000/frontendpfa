import React, {useEffect,useState} from "react";
import ProjectService from "../services/ProjectService";
import EmailService from "../services/EmailService";
import UserService from "../services/UserService";
export default function Success(props){
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 5;
    var password = "";
    function generatePassword(){
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
        }

    }
    useEffect(()=>{
        const project = props.values
        const id = localStorage.getItem("id_user");
        console.log(id)
        const criteria = localStorage.getItem("criteria")
        const alternatives = localStorage.getItem("alternatives")
        const experts = JSON.parse(localStorage.getItem("experts"))
        project.id_user = id
        project.criteria = JSON.parse(criteria)
        project.alternatives = JSON.parse(alternatives)
        project.experts = experts
        ProjectService.insertProject(project).then((res)=> {
            for( var i = 0;i<experts.length;i++){
                generatePassword();
                UserService.register({
                    firstName:experts[i].firstName,
                    lastName:experts[i].lastName,
                    email:experts[i].email,
                    password:password,
                    role:"expert"
                }).then((res)=>{
                    console.log("success")
                })
                const message = {
                    receiver: experts[i].email,
                    object:"Questionnaire",
                    text:"bonjour Mr/Mlle "+experts[i].firstName+" "+experts[i].lastName+" ! on vous invite a répondre au questionaire suivant:http://localhost:3000/map \n pour s'authentifier vous aurez besoin de saisir votre adress mail et le mots de passe suivant : "+ password +"\n Cordialment"
                }
                EmailService.sendEmail(message).then((res)=>{
                },[])

            }
        })
    },[])


    return(
        <div>
            <h1>Success</h1>
        </div>
    )
}