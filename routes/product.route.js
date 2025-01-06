const {
  displayProduct,
  displayCart,
  displayAddup,
  displayDelete,
  displayEdit,
} = require("../controllers/product.controller");

const express = require("express");
const router = express.Router();

router.get("/product", displayProduct);
router.get("/cart", displayCart);

router.post("/addup", displayAddup);
router.post("/delete", displayDelete);
router.post("/edit", displayEdit);
module.exports = router;
