import {promises as fs} from "fs";

export default class ProductManager{
    constructor(){
        this.patch = "./productos.txt";
        this.products = []
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail,  stock, code ) => {
        
        ProductManager.id++
     
        const product = {
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
            id: ProductManager.id,
        }

        this.products.push(product)
      
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }
    getProducts = async() => {
    let productosObtenidos = await this.readProducts()
       return console.log(productosObtenidos)
    }

    getProductsById = async (id) => {
      let obtenidoId = await this.readProducts()
      console.log(obtenidoId)

      if(!obtenidoId.find(p => p.id === id)){
        console.log("Producto no encontrado")
      }else{
        console.log(obtenidoId.find(p => p.id === id))
        }

    }

    deleteProductById = async(id)=>{
        let obtenidoId = await this.readProducts()
        let productoFiltrado = obtenidoId.filter(p => p.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productoFiltrado))
        console.log("El producto ha sido eliminado")
       
    }

    updateProducts = async({id, ... updateP  }) => {
        await this.deleteProductById(id);
        let product = await this.readProducts();
        let productoModificado = [{... updateP , id}, ... product]
        await fs.writeFile(this.patch, JSON.stringify(productoModificado))
    }
}
/*
const productos = new ProductManager();
productos.addProduct("Libro", "Novela romantica", 4800, 
"https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/625453f3986326e6a6ff7a9d_6034d7d1f3e0f54abdb2b276_Jane-eyre-charlotte-bronte-editorial-alma.jpeg",
500,"AV58")
productos.addProduct("Libro", "Historia", 1800, 
"https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/625453f3986326e6a6ff7a9d_6034d7d1f3e0f54abdb2b276_Jane-eyre-charlotte-bronte-editorial-alma.jpeg",
87,"AC02")

productos.getProducts()
productos.getProductsById(3)
productos.deleteProductById(2)
productos.updateProducts("Libro", "Historia", 1800, 
"https://www.google.com/url?sa=i&url=https%3A%2F%2Fferiachilenadellibro.cl%2Fproducto%2F9789569545191-voces-de-chernobil%2F&psig=AOvVaw3HQbNkZc4OjPmmMtf0jyDe&ust=1693336639501000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJCG-tqIgIEDFQAAAAAdAAAAABAH",200,"AC02")
*/