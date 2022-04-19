import axios from "axios";
import authHeader from "./AuthHeader";

// const RESOURCE_API_BASE_URL = "http://localhost:8080/user";
const RESOURCE_API_BASE_URL = "https://cdac-project-backend.herokuapp.com/user";
class UserService {
    login(loginDetails) {
        const header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return axios.post(RESOURCE_API_BASE_URL + "/api/login", loginDetails, {
            params: loginDetails,
            headers: header
        })
    }

    updateUser(DTO){
        return axios.post(RESOURCE_API_BASE_URL + "/updateUser", DTO, {headers: authHeader()});
    }

    registerUser(userDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/add", userDTO)
    }

    bookPackage(packageDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/selectPackage", packageDTO, { headers: authHeader() })
    }

    bookRoom(roomDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/selectRoom", roomDTO, { headers: authHeader() })
    }

    bookFood(foodDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/selectFood", foodDTO, { headers: authHeader() })
    }

    getUser() {
        return axios.get(RESOURCE_API_BASE_URL + "/get", { headers: authHeader() });
    }

    getPackages() {
        return axios.get(RESOURCE_API_BASE_URL + "/getPackages", { headers: authHeader() });
    }

    getUserHistory() {
        return axios.get(RESOURCE_API_BASE_URL + "/getUsers", { headers: authHeader() });
    }

    getRooms(){
        return axios.get(RESOURCE_API_BASE_URL + "/getRooms", { headers: authHeader() });
    }

    getFoods(){
        return axios.get(RESOURCE_API_BASE_URL + "/getFoods", { headers: authHeader() });
    }

    getUserPackages(){
        return axios.get(RESOURCE_API_BASE_URL + "/getUserPackages", { headers: authHeader() });
    }

    updatePackage(packageDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/updateUserPackage", packageDTO, { headers: authHeader() })
    }

    deletePackage(){
        return axios.get(RESOURCE_API_BASE_URL + "/deleteUserPackage", { headers: authHeader() })
    }

    deleteRoom(){
        return axios.get(RESOURCE_API_BASE_URL + "/deleteUserRoom", { headers: authHeader() })
    }

    deleteFood(){
        return axios.get(RESOURCE_API_BASE_URL + "/deleteUserFood", { headers: authHeader() })
    }

    getUserRooms(){
        return axios.get(RESOURCE_API_BASE_URL + "/getUserRooms", { headers: authHeader() });
    }

    updateRoom(roomDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/updateUserRoom", roomDTO, { headers: authHeader() })
    }

    getUserFoods(){
        return axios.get(RESOURCE_API_BASE_URL + "/getUserFoods", { headers: authHeader() });
    }

    updateFood(foodDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/updateUserFood", foodDTO, { headers: authHeader() })
    }

    getBill(confirmationDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/calculateBill", confirmationDTO, { headers: authHeader() })
    }

    doPayment(confirmationDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/addConfirmation", confirmationDTO, { headers: authHeader() })
    }

    updatePassLink(requestDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/updatePassLink", requestDTO)
    }

    resetPassword(requestDTO){
        return axios.post(RESOURCE_API_BASE_URL + "/updatePassword", requestDTO)
    }
}

export default new UserService()