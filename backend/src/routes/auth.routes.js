import express from 'express'
const route = express.Router()
import { RegisterUser,LoginUser,LogoutUser,RegisterFoodPartner,LoginFoodPartner,LogoutFoodPartner } from '../controllers/auth.controller.js'

//Users ka Routes
route.post('/register',RegisterUser)
route.post('/login',LoginUser)
route.get('/logout',LogoutUser)


//FoodPartners Ka Router
route.post('/food-partner/register',RegisterFoodPartner)
route.post('/food-partner/login',LoginFoodPartner)
route.get('/food-partner/logout',LogoutFoodPartner)




export default route;


