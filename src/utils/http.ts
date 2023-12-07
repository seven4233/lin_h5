import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";
import { showToast } from 'vant';


const hlRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000
})

//请求拦截器
hlRequest.interceptors.request.use(config => {
    const userStore = useUserStore()
    
    if(userStore.getToken){
        config.headers['Authorization'] = userStore.getToken()
    }
    
    return config
}, err=> Promise.reject(err))

// 响应拦截器
hlRequest.interceptors.response.use(res =>{
    return res.data
}, (err) =>{
    console.log(err);
    
    if(err.response.status === 401){
        showToast('请登录后操作');
        router.push('/login')
    }
    return  err.response.data
})


export default hlRequest