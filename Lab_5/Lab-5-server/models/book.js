const { ObjectId } = require('mongodb');
const {getDb} = require('../utils/database');

module.exports = class Book {

    constructor(title, isbn, author, pushlisedDate){
        this.title = title;
        this.isbn = isbn;
        this.author = author;
        this.pushlisedDate = pushlisedDate;
    }

     static getAll(){
        const db = getDb();
        const collection = db.collection('books');
        return collection.find().toArray();
    }

    static getById(id){
        const db = getDb();
        const collection = db.collection('books');
        return collection.findOne({_id: new ObjectId(id)});
    }

    save(){
        const db = getDb();
        const collection = db.collection('books');
        return collection.insertOne(this);
    }

    update(id){
        const db = getDb();
        const collection = db.collection('books');
        return collection.updateOne({_id: new ObjectId(id)}, {$set: {title: this.title, isbn: this.isbn, author: this.author, pushlisedDate: this.pushlisedDate}});
    }

    static deleteById(id) {
        const db = getDb();
        const collection = db.collection('books');
        return collection.deleteOne({_id: new ObjectId(id)});
    }


}