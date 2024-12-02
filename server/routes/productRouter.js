import express from "express"
import { Product } from "../controllers/product.Controller.js"

const ProductRouter = express()

ProductRouter.route('/getProducts').get(Product)

export default ProductRouter