import axios from "axios";
import authHeader from "./AuthHeader";

// const RESOURCE_API_BASE_URL = "http://localhost:8080/admin";
const RESOURCE_API_BASE_URL = "https://cdac-project-backend.herokuapp.com/admin";

class AdminService {
    login(loginDetails) {
        const header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        // return axios.post("http://localhost:8080/api/login", loginDetails, {
        return axios.post("https://cdac-project-backend.herokuapp.com/api/login", loginDetails, {
            params: loginDetails,
            headers: header
        })
    }

    addPackage(packageDTO) {
        return axios.post(RESOURCE_API_BASE_URL + "/addpackage", packageDTO, { headers: authHeader() })
    }

    addRoom(roomDTO) {
        return axios.post(RESOURCE_API_BASE_URL + "/addroom", roomDTO, { headers: authHeader() })
    }

    addFood(foodDTO) {
        return axios.post(RESOURCE_API_BASE_URL + "/addfood", foodDTO, { headers: authHeader() })
    }

    getPackages() {
        return axios.get(RESOURCE_API_BASE_URL + "/packages", { headers: authHeader() })
    }

    getRooms() {
        return axios.get(RESOURCE_API_BASE_URL + "/rooms", { headers: authHeader() })
    }

    getConfirmation() {
        return axios.get(RESOURCE_API_BASE_URL + "/getUsers", { headers: authHeader() })
    }

    getFoods() {
        return axios.get(RESOURCE_API_BASE_URL + "/foods", { headers: authHeader() })
    }

    deleteFood(food) {
        return axios.post(RESOURCE_API_BASE_URL + "/deletefood", food, { headers: authHeader() })
    }

    deleteRoom(room) {
        return axios.post(RESOURCE_API_BASE_URL + "/deleteroom", room, { headers: authHeader() })
    }

    deletePackage(pckg) {
        return axios.post(RESOURCE_API_BASE_URL + "/deletepackage", pckg, { headers: authHeader() })
    }

    updatePackage(packageDTO) {
        return axios.post(RESOURCE_API_BASE_URL + "/updatepackage", packageDTO, { headers: authHeader() })
    }

    updateRoom(roomDTO) {
        return axios.post(RESOURCE_API_BASE_URL + "/updateroom", roomDTO, { headers: authHeader() })
    }

    updateFood(foodDTO) {
        return axios.post(RESOURCE_API_BASE_URL + "/updatefood", foodDTO, { headers: authHeader() })
    }

    updatePassLink(requestDTO) {
        return axios.post(RESOURCE_API_BASE_URL + "/updatePassLink", requestDTO)
    }

    resetPassword(requestDTO) {
        return axios.post(RESOURCE_API_BASE_URL + "/updatePassword", requestDTO)
    }
}

export default new AdminService()