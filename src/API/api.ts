import axios from "axios";

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
    getProfile(userID: string) {
        return  instance.get(`profile/` + userID)

    }
}

export const authAPI = {
    me() {
      return  instance.get(`auth/me`)
    }
}
