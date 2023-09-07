import express from "express";
import ProductManager from "../components/ProductManager.js";

//creamos el servidor
const app = express();
app.use(express.urlencoded({extended: true}));
const productos = new ProductManager();
const readProducts = productos.readProducts()

app.get("/products", async (req, res) =>{
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)
    let listaProductos = await readProducts
    let productLimit = listaProductos.slice(0,limit)
    res.send(productLimit )
})

app.get("/products/:id", async (req,res)=>{
    let id = parseInt(req.params.id)
    let listaProductos = await readProducts
    let productById = listaProductos.find(p => p.id === id)
    res.send(productById)

})

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Express por local hos ${server.address().port}`)
} )

server.on("error", (error) =>console.log(`Error en el servidor ${error}`))