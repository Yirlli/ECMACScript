import {Router} from "express"
import ProductManager from "../controllers/ProductManager.js";

const Ruta = Router()
const product = new ProductManager()

Ruta.post("/", async (req, res) =>{
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

Ruta.get("/", async (req, res) =>{
    res.send(await product.getProducts())
})

Ruta.get("/:id", async (req, res) =>{
    let id = req.params.id
    res.send(await product.getProducts(id))
})

Ruta.delete("/:id", async (req,res)=>{
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})

Ruta.put("/:id", async(req,res)=>{
    let id = req.params.id
    updateProduct =  req.body
    res.send(await product.updateProduct(id,updateProduct))
})
export default Ruta