import UserModel from "../models/user.models.js";
import foodPartnerModel from "../models/foodpartner.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

       
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists, please login' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } 
        );

        res.cookie('token', token)

        
        return res.status(201).json({
            message: 'Registration successful',
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error('Error in RegisterUser:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    const CheckLoggedInUser = await UserModel.findOne({
        email: email
    })

    if (!CheckLoggedInUser) {
        res.status(400).json({ message: 'Invalid Username or Password' })
    }

    const IsValidPassword = await bcrypt.compare(password, CheckLoggedInUser.password)

    if (!IsValidPassword) {
        res.status(400).json({ message: 'Invalid Username or password' })
    }

    const token = jwt.sign(
        { id: CheckLoggedInUser._id, email: CheckLoggedInUser.email }, process.env.JWT_SECRET
    )

    res.cookie('token', token)

    res.status(200).json({
        message: 'LoggedIn Successfully', data: {
            email: CheckLoggedInUser.email
        }
    })

}


export const LogoutUser = async(req,res)=>{
    res.clearCookie('token');

    res.status(200).json({message:'LoggedOut Successfully'})


}


export const RegisterFoodPartner = async (req, res) => {
  try {
    const { name, email, password, phone, contactName, address } = req.body;

    // 1️⃣ Check if all required fields are present
    if (!name || !email || !password || !phone || !contactName || !address) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2️⃣ Check if food partner already exists
    const AccAlreadyExists = await foodPartnerModel.findOne({ email });
    if (AccAlreadyExists) {
      return res
        .status(409)
        .json({ message: "Food Partner account already exists." });
    }

    // 3️⃣ Hash password
    const HashPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new food partner
    const foodPartner = await foodPartnerModel.create({
      name,
      email,
      password: HashPassword,
      phone,
      contactName,
      address,
    });

    // 5️⃣ Generate JWT token
    const token = jwt.sign(
      { id: foodPartner._id, email: foodPartner.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    // 7️⃣ Respond success
    res.status(201).json({
      message: "Food Partner registered successfully.",
      data: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
        phone: foodPartner.phone,
        contactName: foodPartner.contactName,
        address: foodPartner.address,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error. Please try again later." });
  }
};


export const LoginFoodPartner = async(req,res)=>{
    const {email,password} = req.body;  
    const foodPartnerAcc = await foodPartnerModel.findOne({email:email})

    if (!foodPartnerAcc){
        return res.status(404).json({message:"Invalid Credentials"})
    }
    const IsValidPassword = await bcrypt.compare(password,foodPartnerAcc.password)
    if (!IsValidPassword){
        return res.status(404).json({message:"Invalid Credentials"})
    }   
    const token =  jwt.sign({id:foodPartnerAcc._id,email:foodPartnerAcc.email},process.env.JWT_SECRET)
    res.cookie('token',token)
    res.status(200).json({message:'Food Partner LoggedIn Successfully',data:{   
        name:foodPartnerAcc.name,
        email:foodPartnerAcc.email
    }})
}


export const LogoutFoodPartner = async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:'Food Partner LoggedOut Successfully'})
}


