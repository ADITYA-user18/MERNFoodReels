import foodPartnerModel from "../models/foodpartner.model.js";
import UserModel from "../models/user.models.js";
import jwt from 'jsonwebtoken';


export const authFoodPartnerMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized , plz login Once again' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded:", decoded);
        const foodPartner = await foodPartnerModel.findById(decoded.id || decoded._id);
        if (!foodPartner) {
    console.warn('No foodPartner found with id:', decoded.id||decoded._id);
    return res.status(401).json({ message: 'Invalid token or user not found' });
}
        req.foodPartner = foodPartner
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })

    }

}



export const authUserMiddleware =  async(req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:'Unauthorized , plz login Once again'})
    }       
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded:",decoded);
        const user = await UserModel.findById(decoded.id || decoded._id);
        if(!user){
            console.warn('No user found with id:', decoded.id||decoded._id);
            return res.status(401).json({message:'Invalid token or user not found'});
        }   
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({message:'Invalid token'})     
    }
}