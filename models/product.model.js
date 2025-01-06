// Product Schema
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  productname: { type: String, required: true },
  productcategory: { type: String, required: true },
  productprice: {
    type: Number,
    required: true,
  },
  productquantity: { type: Number, required: true },
  productimage: { type: String, required: true },
  productDate: { type: String, default: Date.now() },
});
//Product Model
const productModel = mongoose.model("product_collection", productSchema);
module.exports = productModel;
