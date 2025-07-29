import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

// Place order Using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId, items, address, amount, paymentMethod: 'cod', payment: false, date: Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({ success: true, message: "Order Placed"})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message})   
    }
}

// Place order Using Stripe Method
const placeOrderStripe = async (req, res) => {
    
}

// Place order Using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    
}

// All Orders Data for Admin Panel
const allOrders = async (req, res) => {
    
}

const userOrders = async (req, res) => {

    try {
        const { userId } = req.headers

        if (!userId) {
            console.error("No UserId")
            return res.json({
                success: false, message: 'No valid token found.'
            })
        }

        const orders = await orderModel({ userId })
        console.log('userId: ',userId);
        
        res.json({
            success: true, orders
        })
    } catch (error) {
        console.error(error);
        res.json({
            success: false, message: message.error
        })
    }
}

// Update Order status for Admin Panel
const updateStatus = async (req, res) => {
    
}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus }