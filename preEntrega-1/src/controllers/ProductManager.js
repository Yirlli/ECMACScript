import {promises as fs} from 'fs';
import {nanoid} from "nanoid"

class ProductManager{
    constructor(){
        this.path = 'src/models/products.json'
        
    }
    //static id = 0;
    readProduct = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }
    writeProducts = async  (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product))
    }
    addProducts = async (product) =>{
        let listProducts = await this.readProduct()
       product.id = nanoid(3)
        //product.id++
        let productAll = [... listProducts, product]
        await this.writeProducts(productAll)
        return "Producto agregado"
    }

    getProducts = async () =>{
        return await this.readProduct()
    }

    getProductById = async (id) =>{
        let productById = await this.exist(id)
        if(!productById){
            return "id no encontrado"
        } 
        return productById
    }

    exist = async(id)=>{
        let products= await this.readProduct()
        return products.find(prod => prod.id === id )
    }

    deleteProducts = async  (id) =>{
        let products = await this.readProduct()
        let productEncontrado = products.some(p => p.id === id)
        if(productEncontrado){
            let productosFiltrados = products.filter(p => p.id !== id)
            await this.writeProducts(productosFiltrados)
            return "Producto eliminado"
        }
        return "producto no encontrado"
    }

    updateProduct= async(id,product)=>{
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productOld = await this.readProduct()
        let products = [{...product, id : id}, ... productOld]
        await this.writeProducts(products)
    }
}

export default ProductManager


