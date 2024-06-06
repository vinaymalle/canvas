import express from 'express';
import { login, register } from '../controllers/authentication.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        await login(req, res);
    } catch (err) {
        return next(err);
    }
})

router.post('/register', async (req, res, next) => {
    try {
        await register(req, res);
    } catch (err) {
        return next(err);
    }
})

export default router;