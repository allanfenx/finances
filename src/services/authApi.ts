import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const authApi = axios.create({
    baseURL: "http://177.71.240.27:58587"
});

authApi.interceptors.request.use(async config => {

    const token = await AsyncStorage.getItem("authapi.token");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})

export { authApi };