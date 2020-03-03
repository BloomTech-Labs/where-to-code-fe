import axios from 'axios'

export const axiosWithAuth = () => {
	const token = localStorage.getItem('token')

	return axios.create({
		headers: {
			// 'Content-Type': 'application/json',
			authorization: token
		},
		baseURL: 'https://hive-stack-stage-backend.herokuapp.com'
	})
}

export default axiosWithAuth
