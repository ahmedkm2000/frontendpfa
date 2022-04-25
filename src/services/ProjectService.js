import axios from "axios";
const PROJECT_BASE_URL = "http://localhost:8081/api/v1/projects";
class ProjectService{
    getAllProjects(){
        return axios.get(PROJECT_BASE_URL);
    }
    insertProject(project){
        return axios.post(PROJECT_BASE_URL,project);
    }
    getProjectById(id){
        return axios.get(PROJECT_BASE_URL+"/"+id);
    }
    updateProject(id,project){
        return axios.put(PROJECT_BASE_URL+"/"+id,project);
    }
    deleteProject(id){
        return axios.delete(PROJECT_BASE_URL+"/"+id);
    }
}
export default new ProjectService()