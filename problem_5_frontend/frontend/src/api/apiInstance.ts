import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Interceptor yêu cầu (request)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor (response)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originConfig = error.config;
        if (error.response && +error.response.status === 403) {
            try {
                const res = await axiosInstance.post('/users/refresh-token', {
                    refresh_token: localStorage.getItem('refreshToken')
                });
                if (res?.data?.data?.data) {
                    const { refreshToken, accessToken } = res?.data?.data?.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    originConfig.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originConfig); 
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
