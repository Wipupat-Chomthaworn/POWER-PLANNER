import axios from 'axios'

const instance = axios.create({
    baseURL: `http://34.143.231.153:3000`,
    headers: {
        'Referrer-Policy': 'no-referrer', // Or any other desired policy
      },
})

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance
