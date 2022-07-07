const fs = require('fs');

class Contenedor {
    constructor(datosArchivos) {
        this.datosArchivos = datosArchivos;
        this.todosLosObjetos = this.readData(this.datosArchivos) || [];
    }
    //Se crea un ID para los productos
    async crearId() {
        try {
            this.todosLosObjetos = await this.getAll() || [];
            let rangoId = this.todosLosObjetos.length;
            this.todosLosObjetos.forEach(productos => {
                productos.id > rangoId ? rangoId = productos.id : rangoId
            })
            return rangoId + 1;
        } catch (errores) {
            console.log(errores);
        }
    }
    //Segun desafio se guarda el objeto
    async save(obj) {
        try {
            const readFile = await this.getAll();
            if (!readFile) {
                obj.id = await this.crearId();
                this.todosLosObjetos.push(obj);
                this.writeData(this.todosLosObjetos);
                return obj.id;
            }
            this.todosLosObjetos = readFile;
            obj.id = await this.crearId();
            this.todosLosObjetos.push(obj);
            this.writeData(this.todosLosObjetos);
            return obj.id;
        } catch (errores) {
            console.log(errores);
        }
    }

    async getById(id) {
        try {
            this.todosLosObjetos = await this.getAll();
            const obj = this.todosLosObjetos.find(productos => productos.id === Number(id));
            return obj ? obj : null;
        } catch (errores) {
            console.log(errores);
        }
    }

    async getAll() {
        try {
            const data = await this.readData(this.datosArchivos);
            return data;
        } catch (errores) {
            console.log(errores);
        }
    }
    //Se elimina por ID el producto
    async deleteById(id) {
        try {
            this.todosLosObjetos = await this.getAll();
            this.todosLosObjetos = this.todosLosObjetos.filter(productos => productos.id != Number(id));
            this.writeData(this.todosLosObjetos);
        } catch (errores) {
            console.log(errores);
        }
    }
    async deleteAll() {
        try {
            this.todosLosObjetos = await this.getAll();
            this.todosLosObjetos = [];
            this.writeData(this.todosLosObjetos);
        } catch (errores) {
            console.log(errores);
        }
    }
    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return data;
    }
    writeData(todosLosObjetos) {
        fs.writeFileSync(this.datosArchivos, JSON.stringify(todosLosObjetos, null, 2));
    }
}

module.exports = Contenedor;