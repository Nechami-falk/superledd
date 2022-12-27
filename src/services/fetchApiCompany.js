import axios from "axios";
import apiUrl  from '../config.json';

async function fetchCompanies(){
    const {data} = await axios.get(`${apiUrl.apiUrl}/companies`);
    return data
}

export default fetchCompanies;