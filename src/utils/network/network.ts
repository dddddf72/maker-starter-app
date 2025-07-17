import { Network } from "@helium/http"
import { Alert } from "react-native"
import { NetworkCode } from "../enum"

// 基础地址
const baseUrl = "http://13.212.193.62:10001"

// 模块地址
const modelUrl = {
    // 用户
    user: "/user"
}

// 请求地址
export const url = {
    // 用户
    user: {
        // 发送邮箱验证码
        sendEmailCode: modelUrl.user + "/sendEmailCode",
        // 注册
        register: modelUrl.user + "/register",
        // 登入
        login: modelUrl.user + "/login",
        // 重置密码
        resetPwd: modelUrl.user + "/resetPwd",
    }
}

// 请求数据选项
export class Option {
    // 请求方法
    public method: string
    // 请求地址
    public url: string
    // 请求体数据
    public data: object
    // 请求头
    public header: object
    // 错误提示使能
    public showErrorEnable: boolean

    constructor(
        url: string, 
        data: object = {}, 
        showErrorEnable: boolean = true,
        method: string = "POST"
    ) {
        // 赋值
        this.url = url
        this.data = data,
        this.showErrorEnable = showErrorEnable
        this.method = method
        this.header = {
            "Content-Type" : "application/json"
        }
    }

    /**
     * 基本信息
     */
    info() {
        console.info("network-method", 	this.method)
        console.info("network-url", 	this.url)
        console.info("network-body",	this.data)
    }

    /**
     * 获取请求体
     * @returns 请求体
     */
    getBody() {
        return JSON.stringify(this.data)
    }

    /**
     * 获取 fetch 的 请求选项
     * @returns 请求选项
     */
    getFetchOptions() {
        return {
            method: this.method,
            headers: this.header,
            body: this.getBody()
        } as RequestInit
    }

    /**
     * 获取完整 url
     * @returns 完整url
     */
    getCompleteUrl() {
        return baseUrl + this.url
    }
}

// 网络请求操作
export const request = (option: Option) => {
    // 信息提示
    option.info()

    // 请求
    return new Promise((resolve, reject) => {
        fetch(option.getCompleteUrl(), option.getFetchOptions())
            .then((response) => response.json())
            .then((resJson) => {
                console.info("network-response", resJson)

                // 请求失败
                if (resJson.code !== NetworkCode.success) {
                    requestError(option.url)
                    // 错误提示
                    if (option.showErrorEnable) {
                        Alert.alert(
                            "warn",
                            resJson.message
                        )
                    }
                    reject(resJson)
                    return
                }

                // 请求成功，返回数据
                resolve(resJson.data)
            })
            .catch((error) => {
                console.error("network-fetch-error", error)
                requestError(option.url)
                // 标准错误构建
                let err = {
                    code: NetworkCode.netErr,
                    message: error,
                    data: null,
                    success: false
                }
                // 错误提示
                if (option.showErrorEnable) {
                    Alert.alert(
                        "warn",
                        error.message
                    )
                }
                reject(err)
            })
    })
}

/**
 * 请求错误的处理
 * @param url 请求的url，非完全url，不含baseUrl
 */
const requestError = (url: string) => {
    console.error("network-requestError", url)
}