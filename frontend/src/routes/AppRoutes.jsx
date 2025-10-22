import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRegister from '../components/UserRegister';
import FoodPartnerRegister from '../components/FoodPartnerRegister';
import Register from '../components/Register';
import UserLogin from '../components/UserLogin';
import FoodPartnerLogin from '../components/FoodPartnerLogin';
import Home from '../components/general/Home';
import CreateFoodPartner from '../components/food-partner/CreateFoodPartner';

const AppRoutes = () => {
  return (
      <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/register' element={<Register />} />
          <Route path='/UserRegister' element={<UserRegister />} />
          <Route path='/userLogin' element={<UserLogin />} />
          <Route path='/user/login' element={<UserLogin />} />
          <Route path='/food-partner/register' element={<FoodPartnerRegister />} />
          <Route path='/food-partner/login' element={<FoodPartnerLogin />} />
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/create-food'  element={<CreateFoodPartner/>}></Route>
      </Routes>
  );
};

export default AppRoutes;
