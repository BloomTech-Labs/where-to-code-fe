import axios from "axios";

const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL:  "https://hive-stack-stage-backend.herokuapp.com/" || "http://localhost:3000",
        headers: {
        "Content-Type": "application/json",
        authorization: token
        }
    });
};

export default axiosWithAuth;