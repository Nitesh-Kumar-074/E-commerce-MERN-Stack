import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      size : {type : String}
    },
  ],
  shippingInfo: {
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  paymentInfo: {
    id: String, // e.g., payment gateway transaction ID
    status: String,
  },
  taxAmount: { type: Number, required: true },
  shippingAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered'], default: 'processing' },
  deliveredAt: Date,
},{timestamps:true});

const Order = mongoose.model("Order",orderSchema)

export {Order}
