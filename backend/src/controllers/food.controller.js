import path from 'path';
import fs from 'fs';
import foodModel from '../models/food.model.js';
import { uploadFile } from '../services/storage.service.js';
import { v4 as uuidv4 } from 'uuid';

export const createFood = async (req, res) => {
    const tempFilePath = req.file ? req.file.path : null;

    try {

        if (!req.file) {
            return res.status(400).json({ message: 'Bad Request: A video file is required.' });
        }
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Validation failed: Path `name` is required." });
        }
        const readableStream = fs.createReadStream(tempFilePath);
        const uniqueFileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
        const fileUploadResult = await uploadFile(readableStream, uniqueFileName);
        const newFood = new foodModel({
            name,
            description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner.id,
        });
        const savedFood = await newFood.save();
        res.status(201).json({
            message: 'Food item created successfully!',
            data: savedFood,
        });

    } catch (error) {
        console.error('Error creating food item:', error);
        res.status(500).json({ message: error.message || 'An internal server error occurred.' });
    } finally {

        if (tempFilePath) {
            fs.unlink(tempFilePath, (err) => {
                if (err) console.error("Failed to delete temporary file:", tempFilePath, err);
            });
        }
    }
};



export const getFoodItems = async(req,res)=>{
    const foodItems = await foodModel.find({})

    res.status(200).json({message:'food items fetched successfully',data:foodItems})


}

