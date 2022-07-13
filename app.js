import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

import messageRoutes from './src/routes/message.js'


const app = express();
const PORT = 5000;

app.use(
    cors({
        origin: "*"
    })
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/send', messageRoutes);

app.get('/', (req, res) => res.send("Hello"));


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
