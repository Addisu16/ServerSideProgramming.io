const books = [
    {id:1,title:"The subtle art",ISBN:"978-0987654321",publishedDate:"01/01/2021",author:"Mark Manson"},
    {id:2,title: 'Sample Book 1',ISBN: '978-1234567890',publishedDate:'2023-08-06',author:'John Doe'},
    {id:3,title:'Sample Book 2',ISBN:'978-0987654321',publishedDate: '2023-08-06', author:'Jane Smith'},
    {id:4,title: 'Sample Book 3',ISBN:'978-9876543210',publishedDate:'2023-08-06',author:' Johnson'},
    {id:5,title: 'Sample Book 3',ISBN:'978-9876543210',publishedDate:'2023-08-06',author:'Michael Johnson'}
];

module.exports=class Book {
    constructor(id, title, ISBN, publishedDate, author) {
        this.id = id;
        this.title = title;
        this.ISBN = ISBN;
        this.publishedDate = publishedDate;
        this.author = author;
    }
    static getAllBooks() {
        return books;
    }

    static submit() {
        if (books.find((book) => book.id == id)) {
            throw new Error('Duplicate id Found!');
        } else {
            books.push(this);
        }

    }
    static update() {

        let bookIndex = books.findIndex(book => book.id == this.id);
        if (bookIndex > -1) {
            bookIndex.id = this.id;
            bookIndex.title = this.title;
            bookIndex.ISBN = this.ISBN;
            bookIndex.publishedDate = this.publishedDate;
            bookIndex.author = this.author;
        } else {
            books.push(this);
        }
    }

    static delete(id) {
        const indexToDelete = books.findIndex(book => book.id == id);
        if (indexToDelete > -1) {
            books.splice(index, 1);
        } else {
            throw new Error('Books Not Found !');
        }

    }

}
