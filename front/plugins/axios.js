import Vue from 'vue'
import axios from 'axios'

let service = axios.create({
	timeout: 5000,
	baseURL: '/api',
})
// 拦截器
service.interceptors.request.use(
	config => {
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
		return data
	}
)
Vue.prototype.$http = service

export const http = service
