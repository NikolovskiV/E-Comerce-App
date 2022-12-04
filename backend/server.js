import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import productRouter from './routers/productRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import dotenv from 'dotenv';


dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-db',
})
    .then(() => {
        console.log('Database Connection is ready...')
    })
    .catch((err) => {
        console.log(err);
    });


const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientId', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
})

app.listen(7000, () => {
    console.log('Backend server is running at http://localhost:7000!');
});
