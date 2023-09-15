import {Router} from "express"
import CartManager from "../controllers/CartManager.js";

const ShoppingCartRuta = Router()
const carrito = new CartManager()

ShoppingCartRuta.post("/", async(req, res)=>{
    res.send(await carrito.addCart())
})

ShoppingCartRuta.get("/", async(req, res)=>{
    res.send(await carrito.readShoppingCart())
})

ShoppingCartRuta.get("/:id", async(req, res)=>{
    res.send(await carrito.getCarritoById(req.params.id))
})

ShoppingCartRuta.post("/:cid/products/:pid", async(req,res)=>{
    let cartId = req.params.cid
    let productId= req.params.pid
    res.send(await carrito.addProductInCart(cartId, productId))
})