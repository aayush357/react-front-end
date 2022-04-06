import LoginComponent from './components/LoginComponent';
import { Route, Routes } from "react-router-dom";
import { About } from './components/About';
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

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setInterval(()=>{
        console.log("aayush");
        console.log(" ");
      }, 5000);
    }
  }, []);

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
        <Route exact path="/adminLogin" element={<AdminLoginComponent />} />
        <Route exact path="/register" element={<RegisterUserComponent />} />
        <Route exact path="/userHome" element={<UserHomeComponent />} />
        <Route exact path="/profile" element={<ProfileComponent />} />
        <Route exact path="/packages" element={<UserPackageComponent />} />
        <Route exact path="/foods" element={<UserFoodComponent />} />
        <Route exact path="/rooms" element={<UserRoomComponent />} />
        <Route exact path="/modifyPackage" element={<UserModifyPackage />} />
        <Route exact path="/modifyRoom" element={<UserModifyRoom />} />
        <Route exact path="/modifyFood" element={<UserModifyFood />} />
        <Route exact path="/confirmation" element={<ConfirmationComponent />} />

        <Route exact path="/adminHome" element={<AdminProfileComponent />} />
        <Route exact path="/addPackage" element={<AddPackageComponent />} />
        <Route exact path="/addRoom" element={<AddRoomComponent />} />
        <Route exact path="/addFood" element={<AddFoodComponent />} />
        <Route exact path="/modifyPackageAdmin" element={<ModifyAdminPackageComponent />} />
        <Route exact path="/modifyRoomAdmin" element={<ModifyAdminRoomComponent />} />
        <Route exact path="/modifyFoodAdmin" element={<ModifyAdminFoodComponent navigation={navigate}/>} />
      </Routes>
      {/* <LoginComponent /> */}
    </div>
  );
}

export default App;
