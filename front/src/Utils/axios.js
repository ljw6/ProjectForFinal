import axios from 'axios'
import filter from "./filter";

export const Axios = axios.create({
    baseURL: '/api',//后端服务端口
})

Axios.interceptors.request.use(config=>{
        if (config.method === 'post'){
            const formData = new FormData()
            Object.keys(config.data).forEach(key => formData.append(key,config.data[key]))
            config.data = formData
        }

        let token = filter.getLocalStorage('authorization');
        if (token){
            config.headers.Authorization= "Bearer "+token;
        }
        return config
    },
    error => {
        alert("传参错误")
        return Promise.reject(error)
    })
