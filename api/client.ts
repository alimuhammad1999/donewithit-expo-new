import cache from '@/utility/cache';
import { create } from 'apisauce';
import { ApiResponse, } from 'apisauce';
import authApi from "../auth/storage"

const apiClient = create({
    baseURL: 'http://192.168.100.139:4000/api',
});

//<unknown, unknown>(url: string, params?: {}, axiosConfig?: AxiosRequestConfig) => Promise<ApiResponse<unknown, unknown>>
//<T, U = T>(url: string, params: {} | undefined, axiosConfig: AxiosRequestConfig<any> | undefined) => Promise<ApiOkResponse<unknown> | { ok: true; data: any; }>

const get = apiClient.get;
apiClient.get = async <T, U = T>(url: string, params?: {}, axiosConfig?: any): Promise<ApiResponse<T, U>> => {
    const response = await get(url, params, axiosConfig);
    if (response.ok) {
        cache.storeData(url, response.data);
        return response as ApiResponse<T, U>;
    }
    const data = await cache.getData(url);
    return { ok: true, data: data } as ApiResponse<T, U>;
};

// apiClient.addRequestTransform((request) => {
//     const authToken = authApi.getToken();
//     if(!authToken) return;
//         if (request.headers) request.headers["x-auth-token"] = authToken;
// });


export default apiClient;