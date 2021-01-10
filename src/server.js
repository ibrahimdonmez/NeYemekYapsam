import express from 'express';
import bodyParser from 'body-parser';
import AuthRouter from './routes';
import mongoose from 'mongoose'; 
import cors from 'cors';

const app = express();

mongoose.connect('mongodb+srv://ibrahim:ibo8757x@fooddb.dmqrl.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

AuthRouter(app);

app.get('/', (req,res) => {
    res.send("Send Api")
})

app.listen(3300, () => console.log("Çalıştı ...."))