import axios from "axios";
import jwt_decode from "jwt-decode";
import authHeader from "./AuthHeader";

// const RESOURCE_API_BASE_URL = "http://localhost:8080";
const RESOURCE_API_BASE_URL = "https://cdac-project-backend.herokuapp.com";

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
        localStorage.setItem("expiry", jwt_decode(response.data.access_token).exp)
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
    localStorage.removeItem("expiry");
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
  }
};

const checkExpiry = (navigate) => {
  let expiry = JSON.parse(localStorage.getItem("expiry"))
  console.log("expiry date" + expiry);
  let diff = expiry - new Date() / 1000;
  console.log(diff);
  if (diff < 30) {
    console.log("calling refresh");
    refresh(navigate);
  }
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const refresh = (navigate) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    let refreshData = {
      refreshToken: user.refresh_token
    }
    axios.post(RESOURCE_API_BASE_URL + "/api/token/refresh", refreshData, { headers: authHeader() })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("expiry", jwt_decode(response.data.access_token).exp)
        }
      }).catch(err => {
        console.log(err.response);
        localStorage.removeItem("user");
        localStorage.removeItem("expiry");
        if (err.response.status === 403) {
          navigate("/login", { state: { message: "You Have been Logged Out! Please Login Again" } });
          window.location.reload();
        }
      })
  }
}

const start= () => {
  return axios.get(RESOURCE_API_BASE_URL+"/api/start");
}

const authService = {
  login,
  logout,
  getCurrentUser,
  refresh,
  checkExpiry,
  start
};

export default authService;