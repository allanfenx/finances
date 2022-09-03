import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { authApi } from "../services/authApi";
import { financeApi } from "../services/financeApi";


export async function refreshToken() {
    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        return new Promise((resolve, reject) => {

            const originalRequest = error.config;

            AsyncStorage.getItem("authapi.refresh_token").then(refresh_token => {
                const response = authApi.post("refresh_token", { refresh_token }).then(({ data }) => {
                    AsyncStorage.setItem("authapi.token", data.token);
                    originalRequest.headers["Authorization"] = `Bearer ${data.token}`
                    return axios(originalRequest);
                })
                resolve(response);
            })
        })
    });
}