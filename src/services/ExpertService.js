import axios from "axios";
const EXPERT_BASE_URL = "http://localhost:8081/api/v1/experts";
class ExpertService{
    getAllExperts(){
        return axios.get(EXPERT_BASE_URL);
    }
    updateExpert(id,expert){
        return axios.put(EXPERT_BASE_URL+"/"+id,expert);
    }

}
export default new ExpertService()