import express from "express";
import {sendMessageEmail} from '../controller/sendMessage.js';

const router = express.Router();


router.post('/', (req, res) => {
    sendMessageEmail(req, res)
})

export default router;
