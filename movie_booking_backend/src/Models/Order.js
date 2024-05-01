const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
    },
  ],
  paymentMethod: { type: String, required: true },
  itemsPrice: { type: Number, required: true },
  coupons: { type: String },
  totalPrice: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
},
{
    timestamps:true
});
const Order = mongoose.model('Order', orderSchema)
module.exports = Order