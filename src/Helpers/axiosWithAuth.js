import axios from "axios";

const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL:  "https://hive-stack.herokuapp.com/",
        headers: {
        "Content-Type": "application/json",
        authorization: token
        }
    });
};

export default axiosWithAuth;