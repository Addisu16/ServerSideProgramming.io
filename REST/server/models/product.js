

let products = [
    { id: 1, title: 'node.js', price: 99, description: 'Great' },
    { id: 2, title: 'react.js', price: 99, description: 'Good' },
    { id: 3, title: 'angular.js', price: 99, description: 'Excellent' },
    { id: 4, title: 'reactNative', price: 99, description: 'Fantastic' }
];

module.exports = class Product {
    constructor(id, title, price, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    static getAll() {
   
    const collection=db.collection('products');
    return collection.find().toArray();
      
    }

    static getById(id) {
        return products.find(prod=>prod.id==id);

    }
    save(){
        if(products.find(prod=>prod.id==this.id)){
            throw new Error(`Product with Id ${this.id} already exists`);
        }else{
            products.push(this);
        }
    }
    update(){
        const index=products.findIndex(prod=>prod.id==this.id);
        if(index>-1){
            products[index]=this;
        }else{
            throw new Error(`cannot find product with Id ${this.id}`);
        }

    }
    static deleteById(id){
        const index=products.findIndex(prod=>prod.id==this.id);
        if(index>-1){
            products.splice(index,1);
        }else{
            throw new Error(`cannot find product with Id ${this.id}`);
        }

    }
}