import axios from "axios";
const EMAIL_BASE_URL = "http://localhost:8081/api/v1/emails";
class EmailService{

    sendEmail(email){
        return axios.post(EMAIL_BASE_URL,email);
    }

}
export default new EmailService()