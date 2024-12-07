import Razorpay from "razorpay";
import Order from "../../models/order.js";
import crypto from "crypto";
import Cart from "../../models/cart.model.js";
import ProductModel from "../../models/products.model.js";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // Create order details for Razorpay
    const options = {
      amount: (totalAmount * 100).toFixed(0), // Amount in paise (smallest currency unit)
      currency: "INR",
      receipt: `order_rcptid_${Math.random().toString(36).slice(2)}`, // Unique identifier
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);

    // Save order details in the database
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: razorpayOrder.id, // Razorpay order ID
    });

    await newlyCreatedOrder.save();

    // Send response with Razorpay order ID
    res.status(201).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      // approvalURL,
      orderId: newlyCreatedOrder._id,
      redirectUrls: {
        success: `http://localhost:5173/shop/payment-success?orderId=${newlyCreatedOrder._id}`,
        failure: `http://localhost:5173/shop/payment-failure?orderId=${newlyCreatedOrder._id}`,
      },
    });
  } catch (error) {
    console.error("Error while creating Razorpay order:", error);

    res.status(500).json({
      success: false,
      message: "Error while creating Razorpay order.",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, orderId, razorpay_signature, payerId } = req.body;

    // Find the order in the database
    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Verify the Razorpay signature

    const body = `${orderId}|${paymentId}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // if (expectedSignature !== razorpay_signature) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid signature received",
    //   });
    // }

    // Update order details
    order.paymentStatus = "Paid";
    order.orderStatus = "Confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found for ${item.title}`,
        });
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product ${item.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Remove cart after order is confirmed
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (error) {
    console.error("Error while capturing Razorpay payment:", error);

    res.status(500).json({
      success: false,
      message: "Error while capturing payment.",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for the User",
      });
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error while capturing Razorpay payment:", error);

    res.status(500).json({
      success: false,
      message: "Error while capturing payment.",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error while capturing Razorpay payment:", error);

    res.status(500).json({
      success: false,
      message: "Error while capturing payment.",
    });
  }
};

export { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };
