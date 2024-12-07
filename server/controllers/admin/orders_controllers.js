import Order from "../../models/order.js";

const getAllOrdersOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find({});

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

const getOrderDetailsForAdmin = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully",
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

export { getAllOrdersOfAllUser, getOrderDetailsForAdmin, updateOrderStatus };
