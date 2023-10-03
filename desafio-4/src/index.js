import express from "express"
import ProductRouter from "./router/product.routes.js"
import CartRouter from "./router/carts.routes.js"

import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import ProductManager from "./controllers/ProductManager.js"
import {Server} from "socket.io" //nuevo
import viewsRouter from "./router/views.routes.js"


const app = express ()
const PORT = 8080
const httpServer = app.listen(PORT,()=> console.log("Listen puerto 8080"))
const product = new ProductManager


const SocketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.set("views", __dirname+"/views")
app.use("/", viewsRouter)





//static
app.use("/", express.static(__dirname + "/public"))

app.get("/realtimeproducts", (req, res)=> {
    res.render("realTimeProducts")
})


SocketServer.on("connection", (socket) => {
    console.log(`Usuario ${socket.id}`);

    socket.on("addProduct", async (productData) => {
        console.log('Datos del producto recibidos en el servidor:', productData)
        const result = await product.addProducts(productData);

        if (result === "Producto Agregado") {
            SocketServer.emit("productAdded", productData);
        }
    });
});


app.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
        title: "Express Avanzado / Handlebars",
        products : allProducts
    })
})

app.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let prod = await product.getProductsById(id)
    res.render("prod", {
        title: "Express Avanzado / Handlebars",
        products : prod
    })
})


app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)
