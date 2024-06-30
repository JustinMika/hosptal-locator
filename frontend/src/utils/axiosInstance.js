import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://localhost:2000",
});

export default axiosInstance;
