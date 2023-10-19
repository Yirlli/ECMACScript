import mongoose from "mongoose"

const messageCollection = "message"

const messageSchema = new mongoose.Schema({
    user: {type: String, max : 100, required :true},
    message: {type: String, max: 100, required: true }
   
})

export const messageModel = mongoose.model(messageCollection,messageSchema)