import Vue from 'vue'
import axios from 'axios'
import {MessageBox} from 'element-ui'

let service = axios.create({
	timeout: 5000,
	baseURL: '/api',
})

export default ({store, redirect}) => {
	// 拦截器
	service.interceptors.request.use(
		config => {

			const token = window.localStorage.getItem('token')
			if(token){
				config.headers.common['Authorization'] = 'Bearer ' + token
			}
			return config
		},
		err => {
			return Promise.reject(err)
		}
	)
	// 响应拦截器
	service.interceptors.response.use(
		async response => {
			let { data } = response
			if(data.code == 0){

			}else if(data.code == -666){
				MessageBox.confirm('登录已过期', '过期', {
					confirmButtonText: '登录',
					showCancelButton:false,
					type:'warning'
				}).then(() => {
					localStorage.removeItem('token')
					redirect({path:'/login'})
				})
			}
			return data
		}
	)
}
Vue.prototype.$http = service

export const http = service
