import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(id) {
        try{
            return await knex(this.tabla).where('id', id).select('*')
        } catch (error){
            console.log(error)
        }

        
    }

    async listarAll() {
        try{
            return await this.knex(this.tabla).select('*')
        } catch (error){
            console.log(error)
        }
    }

    async guardar(elem) {
        try{
            return await knexConnection(this.tabla).insert(elem);
        } catch (error){
            console.log(error)
        }
    }

    async actualizar(elem, id) {
        
    }



    async borrar(id) {
        
    }

    async borrarAll() {
        
    }

    async desconectar() {
        knex(config).destroy()
    }
}

export default ContenedorSQL