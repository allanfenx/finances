import axios from "axios";

export const registerApi = axios.create({
    baseURL: "http://177.71.240.27:60587"
});