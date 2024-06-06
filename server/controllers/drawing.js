import Drawing from "../models/drawing.js";

async function saveDrawing(req, res, next) {

    let rawData = req.body;
    try {
        await Drawing.findOneAndUpdate({}, { $set: { rawData } }, { upsert: true });
        return res.status(201).send({ success: true, message: 'Data updated' });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message });
    }
}

async function getDrawing(req, res, next) {

    try {
        let result = await Drawing.findOne({});
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message });
    }
}

export { saveDrawing, getDrawing };