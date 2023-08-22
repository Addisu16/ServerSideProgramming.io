
const getDB=require('../utils/database');


const products = [
    { id: 1, title: "Node", description: "Excellent", price: 300 },
    { id: 2, title: "Wap", description: "Great", price: 500 },
    { id: 3, title: "Async", description: "Good", price: 400 },
];

module.exports = class Products {
    constructor(id, title, description, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }
    static async getAll() {
        const db=await getDB();
        const collection=db.collection('products');
        return await collection.find().toArray();
   

    }
    static save() {
        const savedProd = products.find(prod => prod.id == this.id);

        if (savedProd) {
            throw new Error(`Duplicate ID is Found ${this.id}`);
        } else {
            products.push(this);
        }



    }

    static finById(id) {

        let findById = products.find(prod => prod.id == id)
        if (findById !== undefined) {
            return findById;
        } else {
            console.log('Item Not Found');
            return null;
        }
    }

    update() {
        let findProd = products.findIndex(prod => prod.id == this.id);

        if (findProd > -1) {
            products[findProd] = this;
        } else {
            throw new Error(`There is no product found with this ${this.id}`);
        }

    }
    deleteById(id) {
        const findIndex = products.find(prod => prod.id == id);

        if (findIndex > -1) {
            products.splice(findIndex, 1);
        } else {
            throw new Error(`There is no product found with this ${this.id}`);
        }
    }


}


