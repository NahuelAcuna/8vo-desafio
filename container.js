const fs = require('fs')
const options = require('./options/mariadb')
//const knex = require('knex')(options)

class Contenedor {
    constructor(file) {
        //console.log('contenedor ok!')
        this.knex = require('knex')(options)
        /*this.file = file
        this.data = []
        try {
            this.read()
        } catch (error) {
            this.write()
        }*/
    }
    ifCreateTable(name) {
        this.knex.schema.hasTable('productos')
            .then(exists => {
                if (!exists) {
                    this.createTable(name)
                } else {
                    console.log('La tabla ya existe')
                }
            })
            .catch(error => console.log(error))
    }
    createTable(DBname) {
        return this.knex.schema.createTable(DBname, table => {
            table.increments('id')
            table.string('name')
            table.integer('price')
        })
            .then(console.log('tabla creada con exito'))
    }

    async getAll(DBname) {
        let table = await this.knex.from(DBname).select('*')
            .then(rows => {
                for (const row of rows) {
                    console.log(`id ${row['id']}: ${row['name']}, $${row['price']}`)
                }
                return rows
            })
        
            .catch(error => console.log(error))
        console.log(table)
        return table
    }
    save(DBname, data) {
        this.knex(DBname).insert(data)
            .then(() => console.log('Datos cargados correctamente'))
            .catch(error => console.log(error))
    }
    getById(DBname, id) {
        this.knex(DBname)
        .where('id', '=', id)
            .then(rows => {
                for (const row of rows) {
                    console.log(`id ${row['id']}: ${row['name']}, $${row['price']}`)
                }
            })
            .catch(error => console.log(error))
    }
    deleteById(DBname, id) {
        this.knex(DBname)
        .where('id', '=', id).delete()
            .then(() => console.log('Producto eliminado.'))
            .catch(error => console.log(error))
    }
    deleteAll(DBname) {
        this.knex(DBname).delete()
            .then(() => console.log('Se eliminaron todos los productos'))
            .catch(error => console.log(error))
    }

    /*
    write() {
        fs.promises.writeFile(this.file, JSON.stringify(this.data))
        .then(() => {
            console.log('Data saved!')
        })
        .catch(error => console.log(error))
    }
    read() {
        fs.promises.readFile(this.file)
        .then(data => {
            this.data = JSON.parse(data)
            //console.log('Data loaded!')
        })
        .catch(error => console.log(error))
    }
    getLastId() {
        const l = this.data.length
        if (l < 1) return 0
        return this.data[this.data.length - 1].id
    }
    save(obj) {
        const id = this.getLastId()
        this.data.push({
            ...obj, ...{id: id + 1}
        })
        this.write()
    }
    getById(id) {
        return this.data.find(p => p.id == id)
    }
    getAll() {
        return this.data
    }
    deleteById(id) {
        const idx = this.data.findIndex(p => p.id == id)
        this.data.splice(idx, 1)
        this.write()
    }
    deleteAll() {
        this.data = []
        this.write()
    }

    editById(id, campo, valor) {
        const productos = this.getAll
        //console.log(productos)
        const prodEdit = productos.find(p => p.id == id)
        //console.log(idx)
        prodEdit[campo] = valor
        //console.log(prodEdit)

    }
    */
}

module.exports = Contenedor