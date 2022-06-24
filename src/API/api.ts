import axios from "axios";
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "e6c80e96-0ef4-4b15-9961-b85ae2d16f7f"
    }
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
            .then(response => response.data);
    },
    follow(userID: number) {
        return instance.post(`follow/${userID}`)
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`)
    },
    getProfile(userID: number) {
        return profileAPI.getProfile(userID)
    }
}

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get(`profile/` + userID)
    },
    getStatus(userID: number) {
        return instance.get(`profile/status/` + userID)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile)

        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileFormDataType) {
        return instance.put(`profile`, profile)
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string | number, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login')
    },
}

export const securityApi = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}