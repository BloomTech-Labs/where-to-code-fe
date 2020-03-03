import axios from 'axios'

export const axiosWithAuth = () => {
	const token = localStorage.getItem('token')

<<<<<<< HEAD
	return axios.create({
		headers: {
			// 'Content-Type': 'application/json',
			authorization: token
		},
		baseURL: 'https://hive-stack-stage-backend.herokuapp.com'
	})
}
=======
    return axios.create({
        baseURL:  "https://hive-stack-stage-backend.herokuapp.com/" || "http://localhost:3000",
        headers: {
        "Content-Type": "application/json",
        authorization: token
        }
    });
};
>>>>>>> 2a0463c67f53ba9034bebbc8e0612b30f9a68f7d

export default axiosWithAuth
