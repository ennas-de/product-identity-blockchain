import axios from "axios";

const API = axios.create({
    baseURL: "https://medscan-cb9g.onrender.com/api", // production
    // baseURL: "http://localhost:3000/api", // development
    timeout: 5000,
    // withCredentials: true,
    withXSRFToken: true
});

// Interceptor for accessToken 

// Interceptor for refreshToken

export default API
