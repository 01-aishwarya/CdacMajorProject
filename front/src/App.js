import logo from './logo.svg';
import './App.css';
import { AddMenu } from './components/ui/menu/AddMenu';
import {AddMeal} from './components/ui/meal/AddMeal';
import { AddCustomer } from './components/ui/customer/AddCustomer';
import { AddAddress } from './components/ui/address/AddAddress';
import { AddOrder } from './components/ui/order/AddOrder';
import { GetAllCustomerComponent } from './components/ui/customer/GetAllCustomerComponent';
import { UpdateCustomerByIdComponent } from './components/ui/customer/UpdateCustomerByIdComponent';
import { GetAllRestaurantComponent } from './components/ui/restaurant/GetAllRestaurantComponent';
import { UpdateRestaurantByIdComponent } from './components/ui/restaurant/UpdateRestaurantByIdComponent';
import { GetAllMealComponent } from './components/ui/meal/GetAllMealComponent';
import { UpdateMealByIdComponent } from './components/ui/meal/UpdateMealByIdComponent';
import { GetAllOrderComponent } from './components/ui/order/GetAllOrderComponent';
import { UpdateOrderByIdComponent } from './components/ui/order/UpdateOrderByIdComponent';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import {Home} from './components/library/Home';
import {SignUp} from './components/library/SignUp';
import {AboutUs} from './components/library/AboutUs';
import { AdminPage } from './components/ui/admin/AdminPage';
import { AddRestaurant } from './components/ui/restaurant/AddRestaurant';
import { CustomerPage } from './components/ui/customer/CustomerPage';
import { GetAllResByCity} from './components/ui/restaurant/GetAllResByCity';
import { GetMealByResId } from './components/ui/meal/GetMealByResId';

function App() {
return (
  
<>
<BrowserRouter>
<Routes>
  <Route path="" element={<Home/>}></Route>
  <Route path="/sign-up" element={<SignUp/>}></Route>
  <Route path="/about-us" element={<AboutUs/>}></Route>
  <Route path="/log-in" element={<Home/>}></Route>
  <Route path="/admin-page" element={<AdminPage/>}></Route>
  <Route path="/see-all-customers" element={<GetAllCustomerComponent/>}></Route>
  <Route path="/see-all-restaurants" element={<GetAllRestaurantComponent/>}></Route>
  <Route path="/add-customer" element={<AddCustomer/>}></Route>
  <Route path="/see-all-customers/edit-customer/:id" element={<UpdateCustomerByIdComponent/>}></Route>
  <Route path="/see-all-restaurants/update-restaurant/:id" element={<UpdateRestaurantByIdComponent/>}></Route>
  <Route path="/see-all-restaurants/add-menu/:id" element={<AddMenu/>}></Route>
  <Route path="/add-restaurant" element={<AddRestaurant/>}></Route>
  <Route path="/see-all-restaurants/add-menu/:id/add-meal/:id" element={<AddMeal/>}></Route>
  <Route path="/see-all-restaurants/add-menu/:id/view-meal/:id" element={<GetAllMealComponent/>}></Route>
  <Route path="/add-meal/:id/" element={<AddMeal/>}></Route>
  <Route path="/view-meal/:id/" element={<GetAllMealComponent/>}></Route>
  <Route path="/update-meal/:id/" element={<UpdateMealByIdComponent/>}></Route>

  <Route path="/customer-page/:id" element={<CustomerPage/>}></Route>
  <Route path="/see-res-by-location/:city/:id" element={<GetAllResByCity/>}></Route>
  
  <Route path="/view-meal-customer/:id/:cust" element={<GetMealByResId/>}></Route>
</Routes>
</BrowserRouter>


</>
  );
}

export default App;
