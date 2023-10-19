import mongoose from "mongoose"

const productCollection = "product"

const productSchema = new mongoose.Schema({
   description: {type: String, max : 100, required :true},
   image: {type: String, max: 100, required: true },
   price: {type: Number, required: true},
   stock: {type: Number, required: true}
   
})

export const productModel = mongoose.model(productCollection,productSchema)