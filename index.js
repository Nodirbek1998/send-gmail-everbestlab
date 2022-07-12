import express from "express";
import bodyParser from 'body-parser';

import messageRoutes from './src/routes/message.js'


const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/api/send', messageRoutes);


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))
