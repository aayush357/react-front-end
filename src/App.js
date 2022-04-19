import LoginComponent from './components/LoginComponent';
import { Route, Routes } from "react-router-dom";
import { About } from './components/About';
import jwt_decode from 'jwt-decode';
import { ServiceComponent } from './components/ServiceComponent';
import { ContactComponent } from './components/ContactComponent';
import { HomeComponent } from './components/HomeComponent';
import AdminLoginComponent from './components/AdminLoginComponent';
import { RegisterUserComponent } from './components/RegisterUserComponent';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/AuthService';
import { UserHomeComponent } from './components/UserComponents/Home';
import { ProfileComponent } from './components/UserComponents/Profile';
import { UserPackageComponent } from './components/UserComponents/Package';
import { UserRoomComponent } from './components/UserComponents/RoomComponent';
import { UserFoodComponent } from './components/UserComponents/FoodComponent';
import { UserModifyPackage } from './components/UserComponents/UserModifyPackage';
import { UserModifyFood } from './components/UserComponents/UserModifyFood';
import { UserModifyRoom } from './components/UserComponents/UserModifyRoom';
import { ConfirmationComponent } from './components/UserComponents/ConfirmationComponent';
import { AdminProfileComponent } from './components/AdminComponents/Profile';
import { AddPackageComponent } from './components/AdminComponents/AddPackageComponent';
import { ModifyAdminPackageComponent } from './components/AdminComponents/ModifyAdminPackageComponent';
import { AddRoomComponent } from './components/AdminComponents/AddRoomComponent';
import { AddFoodComponent } from './components/AdminComponents/AddFoodComponent';
import { ModifyAdminFoodComponent } from './components/AdminComponents/ModifyAdminFoodComponent';
import { ModifyAdminRoomComponent } from './components/AdminComponents/ModifyAdminRoomComponent';
import { HeaderComponent } from './components/HeaderComponent';
import { HeaderLogoutComponent } from './components/HeaderLogout';
import { ForgotPasswordAdminComponent } from './components/AdminComponents/ForgotPasswordAdminComponent';
import { ResetPasswordAdminComponent } from './components/AdminComponents/ResetPasswordAdminComponent';
import { ForgotPasswordUserComponent } from './components/UserComponents/ForgotPasswordUserComponent';
import { ResetPasswordUserComponent } from './components/UserComponents/ResetPasswordUserComponent';
import { TotalUsersComponent } from './components/AdminComponents/TotalUsersComponent';
import { HistoryComponent } from './components/UserComponents/HistoryComponent';
import PageNotFound from './components/PageNotFoundComponent';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      console.log(jwt_decode(user.access_token));
      setInterval(() => {
        authService.checkExpiry(navigate);
        // console.log("calling refresh" );
        // authService.refresh(navigate);
      }, 5000)
      //270000
    }
  }, [navigate]);

  return (
    <div className="App">
      {currentUser ?
        <HeaderLogoutComponent />
        :
        <HeaderComponent />
      }
      <Routes>
        <Route exact path="/" element={<HomeComponent />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/services" element={<ServiceComponent />} />
        <Route exact path="/contact" element={<ContactComponent />} />

        <Route exact path="/login" element={<LoginComponent />} />
        <Route exact path="/register" element={<RegisterUserComponent navigation={navigate} />} />
        <Route exact path="/userHome" element={<UserHomeComponent navigation={navigate} />} />
        <Route exact path="/profile" element={<ProfileComponent navigation={navigate} />} />
        <Route exact path="/packages" element={<UserPackageComponent navigation={navigate} />} />
        <Route exact path="/foods" element={<UserFoodComponent navigation={navigate} />} />
        <Route exact path="/rooms" element={<UserRoomComponent navigation={navigate} />} />
        <Route exact path="/modifyPackage" element={<UserModifyPackage navigation={navigate} />} />
        <Route exact path="/modifyRoom" element={<UserModifyRoom navigation={navigate} />} />
        <Route exact path="/modifyFood" element={<UserModifyFood navigation={navigate} />} />
        <Route exact path="/confirmation" element={<ConfirmationComponent navigation={navigate} />} />
        <Route exact path="/forgotUser" element={<ForgotPasswordUserComponent navigation={navigate} />} />
        <Route exact path="/history" element={<HistoryComponent navigation={navigate} />} />
        <Route exact path="/userReset" element={<ResetPasswordUserComponent navigation={navigate} />} />

        <Route exact path="/adminLogin" element={<AdminLoginComponent />} />
        <Route exact path="/adminHome" element={<AdminProfileComponent navigation={navigate} />} />
        <Route exact path="/adminForgotPassLink" element={<ForgotPasswordAdminComponent navigation={navigate} />} />
        <Route exact path="/adminReset" element={<ResetPasswordAdminComponent navigation={navigate} />} />
        <Route exact path="/addPackage" element={<AddPackageComponent navigation={navigate} />} />
        <Route exact path="/addRoom" element={<AddRoomComponent navigation={navigate} />} />
        <Route exact path="/addFood" element={<AddFoodComponent navigation={navigate} />} />
        <Route exact path="/modifyPackageAdmin" element={<ModifyAdminPackageComponent navigation={navigate} />} />
        <Route exact path="/modifyRoomAdmin" element={<ModifyAdminRoomComponent navigation={navigate} />} />
        <Route exact path="/modifyFoodAdmin" element={<ModifyAdminFoodComponent navigation={navigate} />} />
        <Route exact path="/totalUsers" element={<TotalUsersComponent navigation={navigate} />} />

        <Route exact path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
