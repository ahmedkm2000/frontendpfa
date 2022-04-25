import axios from "axios";
const USER_BASE_URL = "http://localhost:8081/api/v1/";
class UserService{

    register(user){
        return axios.post(USER_BASE_URL+"register",user);
    }
    login(user){
        return axios.post(USER_BASE_URL+"login",user);
    }
}
export default new UserService()