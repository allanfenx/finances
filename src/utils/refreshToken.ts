import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../services/authApi";
import { financeApi } from "../services/financeApi";


export async function AcessRefreshToken() {
    financeApi.interceptors.response.use(response => {
        return response;
    }, error => {
        return new Promise((resolve, reject) => {
            const originalRequest = error.config;

            if (error.response.status == 401 && error.config && !error.config._retry) {
                error._retry = true;

                AsyncStorage.getItem("authapi.refresh_token").then(refresh_token => {
                    const response = authApi.post("refresh_token", { refresh_token }).then(({ data }) => {
                        AsyncStorage.setItem("authapi.refresh_token", data.refresh_token.id);
                        AsyncStorage.setItem("authapi.token", data.token);
                        originalRequest.headers["Authorization"] = `Bearer ${data.token}`
                        return financeApi(originalRequest);
                    })
                    resolve(response);
                })
            } else {
                reject(error)
            }
        })
    });
}