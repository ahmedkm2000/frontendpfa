import axios from "axios";
const CRITERION_BASE_URL = "http://localhost:8081/api/v1/criteria";
class CriterionService{
    getAllCriteria(){
        return axios.get(CRITERION_BASE_URL);
    }
    getAllCriteriaByProject(id){
        return axios.get(CRITERION_BASE_URL+"/project/"+id);
    }
    insertCriterion(criteria){
        return axios.post(CRITERION_BASE_URL,criteria);
    }
    getCriterionById(id){
        return axios.get(CRITERION_BASE_URL+"/"+id);
    }
    updateCriterion(id,criteria){
        return axios.put(CRITERION_BASE_URL+"/"+id,criteria);
    }
    deleteCriterion(id){
        return axios.delete(CRITERION_BASE_URL+"/"+id);
    }
}
export default new CriterionService()