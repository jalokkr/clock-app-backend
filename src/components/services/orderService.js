import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export async function createOrder(orderData) {
  const order = new Order(orderData);
  return await order.save();
}

export async function getAllOrders(user) {
  let orders;
  
  if (user.role === "admin") {
    orders = await Order.find().populate("user").populate("product");
  } else {
    orders = await Order.find({ user: user.id })
      .populate("user")
      .populate("product");
  }
  
  const totalOrders = orders.length;
  const totalPending = orders.filter(order => order.status === 'pending').length;
  const totalApproved = orders.filter(order => order.status === 'approved').length;
  const totalRejected = orders.filter(order => order.status === 'rejected').length;

  return {
    orders,
    metrics: {
      totalOrders,
      totalPending,
      totalApproved,
      totalRejected,
    },
  };
}

export async function getOrderById(orderId) {
  return await Order.findById(orderId).populate("user").populate("product");
}

export async function updateOrderById(orderId, orderData) {
  return await Order.findByIdAndUpdate(orderId, orderData, { new: true })
    .populate("user")
    .populate("product");
}

export async function deleteOrderById(orderId) {
  return await Order.findByIdAndDelete(orderId);
}

export async function approveOrder(orderId) {
  const order = await Order.findById(orderId).populate("product");
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.status === "pending") {
    order.status = "approved";
    const product = order.product;
    product.quantity = String(
      Number(product.quantity) - Number(order.quantity)
    );
    await product.save();
    await order.save();
  }
  return order;
}

export async function rejectOrder(orderId) {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.status === "pending") {
    order.status = "rejected";
    await order.save();
  }
  return order;
}
