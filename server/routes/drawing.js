import express from 'express';
import { saveDrawing, getDrawing } from '../controllers/drawing.js';

const router = express.Router();

router.get('', async (req, res, next) => {
    try {
        await getDrawing(req, res, next);
    } catch (err) {
        return next(err);
    }
})

router.post('', async (req, res, next) => {
    try {
        await saveDrawing(req, res, next);
    } catch (err) {
        return next(err);
    }
})

export default router;