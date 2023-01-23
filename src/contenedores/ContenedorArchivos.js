import { promises as fs } from 'fs'

class ContenedorArchivos {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        const posicion = this.productos.findIndex(e =>e.id == id )
        if(posicion == -1){
            return ({error: 'producto no encontrado'})
        }else{
            return (this.productos[posicion]) 
        }
    }

    async listarAll() {
        return this.productos

    }

    async guardar(elem) {
        let products = this.productos
        let id = 0
        this.productos.length == 0 ? (id=1) : (id=products[products.length-1].id + 1);
        const nuevoProducto = {...prod, id}
        this.productos.push(nuevoProducto)
        return('producto guardado')
    }

    async actualizar(elem, id) {
        const posicion = this.productos.findIndex(e =>e.id == id )
        if(posicion >= 0){
        this.productos[posicion] = prod
        return('producto actualizado')
        }else{
            return({error:'producto no encontrado'})
        }
    }

    async borrar(id) {
        const posicion = this.productos.findIndex(e =>e.id == id )
        if(posicion == -1){
            return({error: 'producto no encontrado'})
        }else{

          const productoEliminado = this.productos.splice(posicion, 1)
          return({producto:productoEliminado})
        }
    }

    async borrarAll() {
        
    }
}

export default ContenedorArchivos