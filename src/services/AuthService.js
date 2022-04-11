import axios from "axios";
import authHeader from "./AuthHeader";

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
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.access_token) {
    let logoutData = {
      "token": user.access_token
    }
    axios.put(RESOURCE_API_BASE_URL + "/api/logout", logoutData, { headers: authHeader() })
      .then(response => {
        console.log(response.data);
      }).catch(err => {
        console.log(err.response);
      })
    localStorage.removeItem("user");
  } else {
    localStorage.removeItem("user");
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const refresh = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let refreshData = {
    refreshToken: user.refresh_token
  }
  axios.post(RESOURCE_API_BASE_URL + "/api/token/refresh", refreshData, { headers: authHeader() })
    .then(response => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    }).catch(err => {
      console.log(err.response);
      localStorage.removeItem("user");
    })
}

const authService = {
  login,
  logout,
  getCurrentUser,
  refresh
};

export default authService;