import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:30",
    headers: {
        "Content-type": "application/json"
    }
});