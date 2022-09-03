import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



const financeApi = axios.create({
    baseURL: "http://177.71.240.27:52888"
});


financeApi.interceptors.request.use(async config => {

    const token = await AsyncStorage.getItem("authapi.token");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})

export { financeApi };
