import axios from "axios";
import { baseUrl } from './service.const';

export class ApiService {

    async getDashboard() {
        const {data} = await axios.get(`${baseUrl}/dashboard`);
        return data;
    }
}
