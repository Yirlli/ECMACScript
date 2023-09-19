import express from "express";
import Ruta from "./router/product.routes.js";
import ShoppingCartRuta from "./router/cart.routes.js";



const app = express();

const PORT = 8080;

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use("/products", Ruta)
app.use("/cart", ShoppingCartRuta)


app.listen(PORT, () =>{
    console.log(`Servidor iniciado en puerto ${PORT}`)
})