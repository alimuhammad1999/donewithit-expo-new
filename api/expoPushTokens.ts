import apiClient from "./client";
import authApi from "../auth/storage";

const register = async (expoPushToken: string) => {
    const authToken = await authApi.getToken();
    const response = await apiClient.post("/expoPushTokens",
        { token: expoPushToken }, { headers: { "x-auth-token": authToken } });
    return response;
}

export default {
    register,
};