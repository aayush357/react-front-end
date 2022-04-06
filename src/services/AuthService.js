import axios from "axios";

const RESOURCE_API_BASE_URL = "http://localhost:8080";

const login = (loginDetails) => {
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return axios
    .post(RESOURCE_API_BASE_URL + "/api/login", loginDetails, {
      params: loginDetails,
      headers: header
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const refreshToken = () =>{
  
}

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;