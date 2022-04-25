import axios from "axios";
const ALTERNATIVE_BASE_URL = "http://localhost:8081/api/v1/alternatives";
class AlternativeService{
    getAllAlternatives(){
        return axios.get(ALTERNATIVE_BASE_URL);
    }
    insertAlternative(alternative){
        return axios.post(ALTERNATIVE_BASE_URL,alternative);
    }
    getAlternativeById(id){
        return axios.get(ALTERNATIVE_BASE_URL+"/"+id);
    }
    updateAlternative(id,alternative){
        return axios.put(ALTERNATIVE_BASE_URL+"/"+id,alternative);
    }
    updateAlternativeByRankAndCii(id,alternative){
        return axios.put(ALTERNATIVE_BASE_URL+"/cii/"+id,alternative);
    }
    deleteAlternative(id){
        return axios.delete(ALTERNATIVE_BASE_URL+"/"+id);
    }
}
export default new AlternativeService()