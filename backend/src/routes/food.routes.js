import express from 'express';
import multer from 'multer';
import { createFood,getFoodItems } from '../controllers/food.controller.js';
import { authFoodPartnerMiddleware,authUserMiddleware } from '../middlewares/auth.middleware.js';

const route = express.Router();


const upload = multer({ dest: 'uploads/' });

route.post('/',authFoodPartnerMiddleware, upload.single('video'),createFood);


route.get('/',authUserMiddleware,getFoodItems)

export default route;