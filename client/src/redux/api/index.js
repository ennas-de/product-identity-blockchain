import axios from "axios";

const API = axios.create({
    // baseURL: "https://medscan-root-node.onrender.com/", // production
    baseURL: "http://localhost:3000/api", // development
    timeout: 5000,
    // withCredentials: true,
    withXSRFToken: true
});

// Interceptor for accessToken 

// Interceptor for refreshToken

export default API
