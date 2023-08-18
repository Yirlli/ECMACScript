class ProductManager{
    constructor(){
        this.products = []
    }

    addProduct(title, description, price, thumbnail,  stock){
        if (!title || !description || !price || !thumbnail || stock === undefined) {
            console.log("Error: todos los campos son obligatorios.");
            return;
        }

        const productoExiste= this.products.find((product) => product.code_id === code)
        if(productoExiste){
            console.log("El code del producto ya se encuentra registrado")
            return;
        }
        const code = this.products.length +1
        const product = {
            code_id : code,
            title,
            description,
            price,
            thumbnail,
            stock
        }
        this.products.push(product)

    }
    getProducts(){
        return this.products
    }

    getProductById(code){
        const productoEncontrado = this.products.find((product) => product.code_id === code)
        if(!productoEncontrado){
            console.log("Not found")
        }else{
            console.log("Producto encontrado", productoEncontrado)
        }
    }
}

const productManager = new ProductManager()
productManager.addProduct("Libro", "Novela romantica", 4800, 
"https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/625453f3986326e6a6ff7a9d_6034d7d1f3e0f54abdb2b276_Jane-eyre-charlotte-bronte-editorial-alma.jpeg",
500) 
const products = productManager.getProducts()
productManager.getProductById(1)
console.log("Productos" , products)