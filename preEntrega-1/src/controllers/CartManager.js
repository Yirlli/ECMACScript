import {promises as fs} from 'fs';
import {nanoid} from "nanoid"
import ProductManager from './ProductManager.js';

const productList = new ProductManager()

class CartManager{
    constructor(){
        this.path = "./src/models/carts.json"
    }

    readShoppingCart = async () =>{
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeShoppingCart = async (cart) =>{
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    exist = async(id)=>{
        let cart= await this.readShoppingCart()
        return cart.find(carrito => carrito.id === id )
    }

    addCart = async () =>{
        let cartsOld = await this.readShoppingCart()
        let id = nanoid()
        let cartConcat = [{id :id, products : []}, ... cartsOld]
        await this.writeShoppingCart(cartConcat)
        return "producto agregado"
    }

    getCarritoById = async (id) =>{
        let carritoById = await this.exist(id)
        if(!carritoById){
            return "id no encontrado"
        } 
        return carritoById
    }

    addProductInCart = async(cartId, productId)=>{
        let carritoById = await this.exist(cartId)
        if(!carritoById){
            return "id no encontrado"
        }
        let productById = await productList.exist(productId)
        if(!productById){
            return "id no encontrado"
        }
        let carritoList = await this.readShoppingCart()
        let carritoFiltro = carritoList.filter(carrito => carrito.id != cartId )
        if(carritoById.products.some(prod=>prod.id === productId)){
            let productInCart = carritoById.products.find(prod=>prod.id === productId)
            productInCart.cantidad +1
            let cartsConcat = [productInCart, ...carritoFiltro]
            await this.writeShoppingCart(carritoConcat) 
            return "Se añadio otro producto al carrito de compras"
        }
       
        let carritoConcat = [{id:cartId, products: [{id:productById.id, cantidad :1}]}, ... carritoFiltro]
        await this.writeShoppingCart(carritoConcat)
        return "Producto agregado al carrito de compras"
    }
}

export default CartManager