import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Global variables
const currency = "gbp"
const deliveryCharge = 10

// Stripe gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order Using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Place order Using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
        name: item.name
        },
      unit_amount: item.price * 100
      },
      quantity: item.quantity
    }))

    line_items.push({
       price_data: {
        currency: currency,
        product_data: {
        name: "Delivery Charges"
        },
      unit_amount: deliveryCharge * 100
      },
      quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment"
    })

    res.json({
      success: true, session_url: session.url,
    })
  } catch (error) {
     console.error(error);
     res.json({
      success: false,
      message: error.message
     })  
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {

  const { success, userId, orderId } = req.body

  try {

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {payment: true})
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({success: true})
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({success: false})
    }
  } catch (error) {
     console.error(error);
     res.json({
      success: false,
      message: error.message
     })
  }

}

// Place order Using Razorpay Method
const placeOrderRazorpay = async (req, res) => {};

// All Orders Data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("useroders:", userId);

    if (!userId) {
      console.error("No UserId");
      return res.json({
        success: false,
        message: "No valid token found.",
      });
    }

    const orders = await orderModel.find({ userId });

    console.log(orders);

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order status for Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
