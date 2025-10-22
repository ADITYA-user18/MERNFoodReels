import mongoose from 'mongoose'

const FoodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    video: {
        type: String,
        required: true,
    },

    description: {
        type: String

    },

    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner'
    }
})



const foodModel = mongoose.model('food',FoodSchema)


export default foodModel;