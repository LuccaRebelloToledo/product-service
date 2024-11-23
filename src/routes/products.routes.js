const Product = require("../models/product")

const { Router } = require("express");

const validateToken = require("../middlewares/validate-token.middleware");

const AppError = require("../shared/errors/app-error");
const AppErrorTypes = require("../shared/errors/app-error-types");
const { CREATED, NOT_FOUND, NO_CONTENT } = require("../shared/http/http-status-code");

const productsRouter = Router();

productsRouter.get("/", validateToken, async (_req, res) => {
  const products = await Product.find();

  if(!products?.length) {
    throw new AppError(AppErrorTypes.products.notFound, NOT_FOUND);
  }

  return res.json(products);
})

productsRouter.get("/:id", validateToken, async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if(!product) {
    throw new AppError(AppErrorTypes.products.notFound, NOT_FOUND);
  }

  return res.json(product);
});

productsRouter.post("/", validateToken, async (req, res) => {
    const productData = req.body;
    
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    return res.status(CREATED).json(savedProduct);
});

productsRouter.put("/:id", validateToken, async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  const product = await Product.findByIdAndUpdate(id, productData, { new: true });

  if (!product) {
    throw new AppError(AppErrorTypes.products.notFound, NOT_FOUND);
  }

  return res.json(product);
});

productsRouter.delete("/:id", validateToken, async (req, res) => {
    const { id } = req.params;

    const removedProduct = await Product.findByIdAndDelete(id);

    if (!removedProduct){
      throw new AppError(AppErrorTypes.products.notFound, NOT_FOUND);
    }

    return res.status(NO_CONTENT).json();
});

module.exports = productsRouter