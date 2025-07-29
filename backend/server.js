import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoutes.js';

// App configurations
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors()); // Corrected usage of cors
connectDB();
connectCloudinary();

// API endpoint
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send(`API Working well on port: ${port}`); // Using template literals
});

const server = app.listen(port, () => {
    console.log(`App started on PORT: ${port}`);
});

// Optional: Error handling for server start
server.on('error', (error) => {
    console.error('Server error:', error);
});
