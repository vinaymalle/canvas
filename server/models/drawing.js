import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema({
    rawData: Array
})

const Drawing = mongoose.model('Drawing', drawingSchema);

export default Drawing;