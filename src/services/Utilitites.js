class Utils {
    isLoggedIn(status, navigate) {
        if (status === 403) {
            navigate("/adminLogin", { state: { message: "You Have been Logged Out! Please Login Again" } })
            localStorage.removeItem("user");
            window.location.reload();
        }
    }
}

export default new Utils();