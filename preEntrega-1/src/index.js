import express from "express";
import Ruta from "./router/product.routes";
import ShppingCartRuta from "./router/cart.routes";



const app = express();

const PORT = 8080;

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use("/products", Ruta)
app.use("/cart", ShppingCartRuta)


app.listen(PORT, () =>{
    console.log(`Servidor iniciado en puerto ${PORT}`)
})