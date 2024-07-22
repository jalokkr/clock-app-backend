import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  approveOrder,
  rejectOrder,
} from "../services/orderService.js";

export async function createOrderHandler(req, res) {
  try {
    const newOrder = await createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllOrdersHandler(req, res) {
  try {
    const { orders, metrics } = await getAllOrders(req.user);
    res.json({ orders, metrics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getOrderHandler(req, res) {
  try {
    const order = await getOrderById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateOrderHandler(req, res) {
  try {
    const updatedOrder = await updateOrderById(req.params.orderId, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteOrderHandler(req, res) {
  try {
    const deletedOrder = await deleteOrderById(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function approveOrderHandler(req, res) {
  try {
    const approvedOrder = await approveOrder(req.params.orderId);
    res.json(approvedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function rejectOrderHandler(req, res) {
  try {
    const rejectedOrder = await rejectOrder(req.params.orderId);
    res.json(rejectedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
