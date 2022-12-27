import axios from "axios";

/* let myApi = "http://localhost:3400";
// אם בכתובת למעלה לא מזהה שהריאקט עובד מהלוקאל משנה את הכתובת// איי פי איי לשרת הירקו במקרה שלנו
if(!window.location.href.includes("localhost:")){
myApi = "https://aaaaaaa";}

export const API_URL = myApi; */

const http = {

    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete
  };
  
  export default http;